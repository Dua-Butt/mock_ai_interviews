'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
import { evaluateAndComplete } from '@/lib/interview-results';
import { MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function InterviewSessionPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, interviews, updateInterview } = useApp();

  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [subtitles, setSubtitles] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const conversationRef = useRef<ConversationMessage[]>([]);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const completeRef = useRef<() => Promise<void>>(async () => {});
  const interviewRef = useRef<any>(null);
  const seenMessagesRef = useRef<Set<string>>(new Set()); // persists — prevents duplicates

  const interview = interviews.find(i => i.id === params.id);

  // Keep interviewRef always up to date
  useEffect(() => {
    if (interview) interviewRef.current = interview;
  }, [interview]);

  useEffect(() => {
    if (interview && !progressLoaded) setProgressLoaded(true);
  }, [interview, progressLoaded]);

  useEffect(() => {
    if (interview && interview.status === 'pending') {
      updateInterview(interview.id, { status: 'in-progress' });
    }
  }, [interview]);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    const vapi = getVapiClient();
    if (!vapi) return;

    const farewellTriggeredRef = { current: false };

    const FAREWELL_WORDS = [
      'goodbye', 'good bye', 'bye bye', 'bye',
      'see you', 'see ya',
      'have a good day', 'have a great day',
      'take care', "that's all",
      "i'm done", 'i am done',
      'end the call', 'end call',
      'finish the interview', 'finish interview',
      'thank you goodbye', 'thanks goodbye',
    ];

    const isFarewell = (text: string) => {
      const lower = text.toLowerCase().trim();
      return FAREWELL_WORDS.some(word => lower.includes(word));
    };

    const triggerFarewell = async () => {
      if (farewellTriggeredRef.current) return;
      farewellTriggeredRef.current = true;
      console.log('👋 Farewell detected — ending call in 1.5s...');
      setSubtitles('👋 Goodbye! Ending call...');
      setIsCallActive(false); // Hide end button immediately
      await new Promise(r => setTimeout(r, 1500));
      try {
        await stopInterviewCall();
      } catch (e) {
        // If stopInterviewCall fails, manually trigger completion
        console.warn('stopInterviewCall failed — triggering completion manually');
        setCallStatus('ended');
        setSubtitles('');
        setTimeout(() => completeRef.current(), 500);
      }
    };

    const handleCallStart = () => {
      setIsCallActive(true);
      setCallStatus('active');
      setAnswerSubmitted(false);
      setConversation([]);
      conversationRef.current = [];
      seenMessagesRef.current.clear(); // reset dedup set for new call
      farewellTriggeredRef.current = false;
    };

    const handleCallEnd = () => {
      setIsCallActive(false);
      setCallStatus('ended');
      setIsSpeaking(false);
      setSubtitles('');
      setTimeout(() => completeRef.current(), 1500);
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    // ── MESSAGE CAPTURE ────────────────────────────────────────────────
    // SINGLE SOURCE: conversation-update only saves messages
    // transcript/handleTranscript = subtitles + farewell ONLY, never saves
    // seenMessagesRef is a persistent ref — survives re-renders unlike local Set

    const addMessage = (role: 'user' | 'assistant', content: string) => {
      if (!content || content.trim().length < 3) return;
      const trimmed = content.trim();
      const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ').substring(0, 80);
      const hash = `${role}:${normalized}`;
      if (seenMessagesRef.current.has(hash)) return; // deduplicate
      seenMessagesRef.current.add(hash);
      conversationRef.current = [...conversationRef.current, { role, content: trimmed }];
      setConversation([...conversationRef.current]);
      console.log(`💬 [${conversationRef.current.length}] Saved [${role}]: ${trimmed.substring(0, 50)}`);
    };

    const handleMessage = (message: any) => {
      // ✅ ONLY conversation-update saves messages — fires once per turn
      if (message.type === 'conversation-update' && message.conversation) {
        const latest = message.conversation[message.conversation.length - 1];
        if (!latest?.content) return;
        const role = latest.role === 'user' ? 'user' : 'assistant';
        if (role === 'user' && isFarewell(latest.content)) { triggerFarewell(); return; }
        addMessage(role, latest.content);
        return;
      }
      // ✅ transcript = subtitles only, NEVER saves
      if (message.type === 'transcript') {
        const role = message.role === 'user' ? 'user' : 'assistant';
        const text = message.transcript || '';
        if (!text) return;
        if (role === 'user' && isFarewell(text)) { triggerFarewell(); return; }
        setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
      }
    };

    const handleTranscript = (data: any) => {
      // ✅ subtitles + farewell ONLY — never saves messages
      if (!data?.transcript) return;
      const role = data.role === 'user' ? 'user' : 'assistant';
      if (role === 'user' && isFarewell(data.transcript)) { triggerFarewell(); return; }
      setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
    };

    const handleError = (error: any) => {
      console.error('Vapi error:', error);
      if (!isProcessingRef.current) {
        setCallStatus('idle');
        setIsCallActive(false);
      }
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('message', handleMessage);
    vapi.on('transcript', handleTranscript);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('message', handleMessage);
      vapi.off('transcript', handleTranscript);
      vapi.off('error', handleError);
    };
  }, []);

  if (!isAuthenticated || !interview) return null;

  const currentQuestion = interview.questions?.[0];

  const handleCompleteInterview = async () => {
    if (isProcessingRef.current) return;
    setIsProcessing(true);
    isProcessingRef.current = true;

    // Use ref to avoid stale closure
    const currentInterview = interviewRef.current;
    if (!currentInterview) {
      console.error('No interview data — redirecting anyway');
      router.push('/dashboard');
      return;
    }

    const interviewId = currentInterview.id;
    const fullConversation = [...conversationRef.current];
    if (typedAnswer.trim()) {
      fullConversation.push({ role: 'user', content: typedAnswer.trim() });
    }

    console.log(`🤖 Evaluating ${fullConversation.length} messages with Claude...`);

    try {
      await evaluateAndComplete(
        interviewId,
        fullConversation,
        currentInterview.interviewType,
        currentInterview.jobRole,
        currentInterview.difficulty
      );
    } catch (e) {
      console.error('evaluateAndComplete failed (still redirecting):', e);
    }

    // ALWAYS redirect no matter what
    console.log('✅ Redirecting to results...');
    router.push(`/interview/${interviewId}/results`);
  };

  completeRef.current = handleCompleteInterview;

  const handleStartCall = async () => {
    try {
      setCallStatus('connecting');
      setSubtitles('');
      setTypedAnswer('');
      setAnswerSubmitted(false);
      setConversation([]);
      conversationRef.current = [];
      await startInterviewCall({
        jobRole: interview.jobRole,
        company: interview.company,
        interviewType: interview.interviewType,
        difficulty: interview.difficulty,
        currentQuestion: currentQuestion?.question || '',
        questionCategory: currentQuestion?.category || '',
        questions: interview.questions || [],
        questionCount: (interview as any).numberOfQuestions || interview.questions?.length || 3,
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('idle');
    }
  };

  const handleEndCall = async () => {
    try {
      await stopInterviewCall();
      setSubtitles('');
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleSkipQuestion = () => {
    const vapi = getVapiClient();
    // Record skip as user answer so evaluation knows they skipped
    const skipMsg: ConversationMessage = { role: 'user', content: 'skip' };
    conversationRef.current = [...conversationRef.current, skipMsg];
    setConversation(prev => [...prev, skipMsg]);
    // Tell the AI interviewer to move to next question
    if (vapi && isCallActive) {
      try {
        (vapi as any).send({
          type: 'add-message',
          message: { role: 'user', content: 'Please skip this question and move to the next one.' },
        });
      } catch (e) {
        console.warn('skip send failed:', e);
      }
    }
    setSubtitles('Skipped — moving to next question...');
  };

  const handleSubmitTypedAnswer = () => {
    if (!typedAnswer.trim()) return;
    const vapi = getVapiClient();
    if (vapi && isCallActive) {
      try {
        (vapi as any).send({
          type: 'add-message',
          message: { role: 'user', content: typedAnswer.trim() },
        });
      } catch (e) {
        console.warn('vapi.send failed:', e);
      }
    }
    const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
    setConversation(prev => [...prev, msg]);
    conversationRef.current = [...conversationRef.current, msg];
    setSubtitles(`You (typed): ${typedAnswer.trim()}`);
    setAnswerSubmitted(true);
    setTypedAnswer('');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">

          <div className="mb-6 flex items-center gap-3">
            <Image src="/robot.png" alt="AI Interviewer" width={40} height={40} className="rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
              <p className="text-sm text-muted-foreground">
                {interview.company || 'Interview Practice'} · {interview.interviewType} · {interview.difficulty}
              </p>
            </div>
          </div>

          <Card className="mb-6 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="space-y-4">

                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="text-center">
                    {callStatus === 'idle' && <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>}
                    {callStatus === 'connecting' && <p className="text-sm text-blue-400">Connecting...</p>}
                    {callStatus === 'active' && (
                      <div className="space-y-2">
                        <p className="text-sm text-green-400">Call Active</p>
                        {isSpeaking && (
                          <div className="flex items-center justify-center gap-2">
                            <Mic className="w-4 h-4 text-green-400 animate-pulse" />
                            <span className="text-xs text-green-400">Listening...</span>
                          </div>
                        )}
                      </div>
                    )}
                    {callStatus === 'ended' && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400">Call Ended</p>
                        {isProcessing && (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                            <p className="text-xs text-purple-400">Claude AI is evaluating your interview...</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!isCallActive ? (
                    <Button
                      onClick={handleStartCall}
                      disabled={callStatus === 'connecting' || isProcessing}
                      className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                    >
                      <Phone className="w-12 h-12" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEndCall}
                      disabled={isProcessing}
                      className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                    >
                      <PhoneOff className="w-12 h-12" />
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {isCallActive ? 'Click to end — results generate automatically' : 'Start voice interview with AI'}
                  </p>

                  {/* Skip button — only shows during active call */}
                  {isCallActive && (
                    <button
                      onClick={handleSkipQuestion}
                      className="text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors"
                    >
                      ⏭ Skip this question
                    </button>
                  )}
                </div>

                {/* Live subtitle */}
                {(callStatus === 'active' || callStatus === 'ended') && (
                  <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
                    {subtitles ? (
                      <p className="text-center text-white text-sm font-medium">{subtitles}</p>
                    ) : (
                      <p className="text-center text-muted-foreground text-xs italic">
                        {callStatus === 'active' ? 'Waiting for speech...' : 'Conversation ended'}
                      </p>
                    )}
                  </div>
                )}

                {conversation.length > 0 && (
                  <p className="text-xs text-center text-purple-400">
                    💬 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
                  </p>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Or type your answer (optional):
                  </label>
                  <textarea
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmitTypedAnswer();
                      }
                    }}
                    placeholder="Type your answer and click 'Submit to AI' or press Ctrl+Enter..."
                    className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    disabled={isProcessing}
                  />
                  {isCallActive && (
                    <Button
                      onClick={handleSubmitTypedAnswer}
                      disabled={!typedAnswer.trim() || isProcessing}
                      className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                      Submit Answer to AI
                    </Button>
                  )}
                  {answerSubmitted && <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI!</p>}
                </div>

              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <strong className="text-white">How it works:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Start the call — Claude AI conducts your <strong>{interview.interviewType}</strong> interview</li>
                    <li>Speak freely — the full conversation is recorded</li>
                    <li>End the call — saved instantly, Groq evaluates on the results page</li>
                    <li>Results show your skill stage and AI feedback by category</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}