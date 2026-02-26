// // // // // 'use client';

// // // // // import { useEffect, useState, useRef } from 'react';
// // // // // import { useRouter, useParams } from 'next/navigation';
// // // // // import Image from 'next/image';
// // // // // import { Card, CardContent } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Navbar } from '@/components/dashboard/navbar';
// // // // // import { useApp } from '@/lib/context-supabase';
// // // // // import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// // // // // import { saveInterviewAnswer, evaluateAnswer, updateAnswerEvaluation, completeInterview } from '@/lib/interview-results';
// // // // // import { CheckCircle, MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

// // // // // export default function InterviewSessionPage() {
// // // // //   const router = useRouter();
// // // // //   const params = useParams();
// // // // //   const { isAuthenticated, interviews, updateInterview } = useApp();
// // // // //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // // //   const [answer, setAnswer] = useState('');
// // // // //   const [answers, setAnswers] = useState<string[]>([]);
// // // // //   const [isCallActive, setIsCallActive] = useState(false);
// // // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // // //   const [transcript, setTranscript] = useState('');
// // // // //   const [subtitles, setSubtitles] = useState('');
// // // // //   const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
// // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // //   const [progressLoaded, setProgressLoaded] = useState(false);
// // // // //   const [answerSubmitted, setAnswerSubmitted] = useState(false);
// // // // //   const transcriptEndRef = useRef<HTMLDivElement>(null);
// // // // //   const completeQuestionRef = useRef<() => Promise<void>>(async () => {});

// // // // //   const interview = interviews.find(i => i.id === params.id);

// // // // //   useEffect(() => {
// // // // //     transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   }, [transcript]);

// // // // //   useEffect(() => {
// // // // //     if (interview && !progressLoaded) {
// // // // //       if (interview.currentQuestionIndex !== undefined && interview.currentQuestionIndex > 0) {
// // // // //         setCurrentQuestionIndex(interview.currentQuestionIndex);
// // // // //       }
// // // // //       if (interview.answersProgress && interview.answersProgress.length > 0) {
// // // // //         setAnswers(interview.answersProgress);
// // // // //       }
// // // // //       setProgressLoaded(true);
// // // // //     }
// // // // //   }, [interview, progressLoaded]);

// // // // //   useEffect(() => {
// // // // //     if (interview && interview.status === 'pending') {
// // // // //       updateInterview(interview.id, { status: 'in-progress' });
// // // // //     }
// // // // //   }, [interview]);

// // // // //   useEffect(() => {
// // // // //     const vapi = getVapiClient();
// // // // //     if (!vapi) return;

// // // // //     const handleCallStart = () => {
// // // // //       setIsCallActive(true);
// // // // //       setCallStatus('active');
// // // // //       setAnswerSubmitted(false);
// // // // //     };

// // // // //     const handleCallEnd = () => {
// // // // //       setIsCallActive(false);
// // // // //       setCallStatus('ended');
// // // // //       setIsSpeaking(false);
// // // // //       setSubtitles('');
// // // // //       // Auto-complete interview when call ends, small delay to let final transcript settle
// // // // //       setTimeout(() => {
// // // // //         completeQuestionRef.current();
// // // // //       }, 1500);
// // // // //     };

// // // // //     const handleSpeechStart = () => setIsSpeaking(true);
// // // // //     const handleSpeechEnd = () => setIsSpeaking(false);

// // // // //     const handleMessage = (message: any) => {
// // // // //       console.log('📨 Vapi message:', JSON.stringify(message, null, 2));

// // // // //       if (message.type === 'transcript') {
// // // // //         const speaker = message.role === 'user' ? 'You' : 'AI';
// // // // //         const text = message.transcript || '';
// // // // //         if (!text) return;
// // // // //         if (message.transcriptType === 'partial') {
// // // // //           setSubtitles(`${speaker}: ${text}`);
// // // // //         } else if (message.transcriptType === 'final') {
// // // // //           const line = `${speaker}: ${text}`;
// // // // //           setSubtitles(line);
// // // // //           setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //         }
// // // // //         return;
// // // // //       }

// // // // //       if (message.type === 'conversation-update' && message.messages) {
// // // // //         const last = message.messages[message.messages.length - 1];
// // // // //         if (last && last.content) {
// // // // //           const speaker = last.role === 'user' ? 'You' : 'AI';
// // // // //           const line = `${speaker}: ${last.content}`;
// // // // //           setSubtitles(line);
// // // // //           setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //         }
// // // // //         return;
// // // // //       }

// // // // //       if (message.role === 'user' && message.content) {
// // // // //         const line = 'You: ' + message.content;
// // // // //         setSubtitles(line);
// // // // //         setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //       } else if (message.role === 'assistant' && message.content) {
// // // // //         const line = 'AI: ' + message.content;
// // // // //         setSubtitles(line);
// // // // //         setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //       }
// // // // //     };

// // // // //     const handleTranscript = (data: any) => {
// // // // //       console.log('📝 Vapi transcript event:', JSON.stringify(data, null, 2));
// // // // //       if (data?.transcript) {
// // // // //         const speaker = data.role === 'user' ? 'You' : 'AI';
// // // // //         setSubtitles(`${speaker}: ${data.transcript}`);
// // // // //         if (data.transcriptType === 'final') {
// // // // //           const line = `${speaker}: ${data.transcript}`;
// // // // //           setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //         }
// // // // //       }
// // // // //     };

// // // // //     const handleError = (error: any) => {
// // // // //       console.error('Vapi error:', error);
// // // // //       setCallStatus('idle');
// // // // //       setIsCallActive(false);
// // // // //     };

// // // // //     vapi.on('call-start', handleCallStart);
// // // // //     vapi.on('call-end', handleCallEnd);
// // // // //     vapi.on('speech-start', handleSpeechStart);
// // // // //     vapi.on('speech-end', handleSpeechEnd);
// // // // //     vapi.on('message', handleMessage);
// // // // //     vapi.on('transcript', handleTranscript);
// // // // //     vapi.on('error', handleError);

// // // // //     return () => {
// // // // //       vapi.off('call-start', handleCallStart);
// // // // //       vapi.off('call-end', handleCallEnd);
// // // // //       vapi.off('speech-start', handleSpeechStart);
// // // // //       vapi.off('speech-end', handleSpeechEnd);
// // // // //       vapi.off('message', handleMessage);
// // // // //       vapi.off('transcript', handleTranscript);
// // // // //       vapi.off('error', handleError);
// // // // //     };
// // // // //   }, []);

// // // // //   if (!isAuthenticated || !interview) return null;

// // // // //   const currentQuestion = interview.questions[currentQuestionIndex];
// // // // //   const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

// // // // //   // Save answer & complete interview when call ends
// // // // //   const handleCompleteQuestion = async () => {
// // // // //     setIsProcessing(true);
// // // // //     try {
// // // // //       const combinedAnswer = [transcript.trim(), answer.trim()].filter(Boolean).join('\n\n') || 'No answer provided';
// // // // //       const newAnswers = [...answers, combinedAnswer];
// // // // //       setAnswers(newAnswers);

// // // // //       await saveInterviewAnswer(
// // // // //         interview.id,
// // // // //         currentQuestionIndex,
// // // // //         currentQuestion.question,
// // // // //         currentQuestion.category,
// // // // //         combinedAnswer,
// // // // //         combinedAnswer
// // // // //       );

// // // // //       const evaluation = await evaluateAnswer(
// // // // //         currentQuestion.question,
// // // // //         currentQuestion.category,
// // // // //         combinedAnswer,
// // // // //         interview.jobRole,
// // // // //         interview.difficulty
// // // // //       );

// // // // //       await updateAnswerEvaluation(interview.id, currentQuestionIndex, evaluation);

// // // // //       setAnswer('');
// // // // //       setTranscript('');
// // // // //       setSubtitles('');
// // // // //       setAnswerSubmitted(false);

// // // // //       // Always complete interview when call ends
// // // // //       await completeInterview(interview.id);
// // // // //       await updateInterview(interview.id, {
// // // // //         status: 'completed',
// // // // //         currentQuestionIndex: undefined,
// // // // //         answersProgress: undefined,
// // // // //       });
// // // // //       router.push(`/interview/${interview.id}/results`);

// // // // //     } catch (error) {
// // // // //       console.error('❌ Error completing interview:', error);
// // // // //       alert('Failed to save answer. Please try again.');
// // // // //     } finally {
// // // // //       setIsProcessing(false);
// // // // //     }
// // // // //   };

// // // // //   // Keep ref in sync so useEffect can call it
// // // // //   completeQuestionRef.current = handleCompleteQuestion;

// // // // //   const handleStartCall = async () => {
// // // // //     try {
// // // // //       setCallStatus('connecting');
// // // // //       setTranscript('');
// // // // //       setSubtitles('');
// // // // //       setAnswer('');
// // // // //       setAnswerSubmitted(false);
// // // // //       await startInterviewCall({
// // // // //         jobRole: interview.jobRole,
// // // // //         company: interview.company,
// // // // //         interviewType: interview.interviewType,
// // // // //         difficulty: interview.difficulty,
// // // // //         currentQuestion: currentQuestion.question,
// // // // //         questionCategory: currentQuestion.category,
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error('Failed to start call:', error);
// // // // //       setCallStatus('idle');
// // // // //     }
// // // // //   };

// // // // //   const handleEndCall = async () => {
// // // // //     try {
// // // // //       await stopInterviewCall();
// // // // //       setSubtitles('');
// // // // //     } catch (error) {
// // // // //       console.error('Failed to end call:', error);
// // // // //     }
// // // // //   };

// // // // //   // Send typed answer directly to the Vapi AI agent during the call
// // // // //   const handleSubmitTypedAnswer = () => {
// // // // //     if (!answer.trim()) return;
// // // // //     const vapi = getVapiClient();
// // // // //     if (vapi && isCallActive) {
// // // // //       try {
// // // // //         // Vapi's send method injects a message into the conversation
// // // // //         (vapi as any).send({
// // // // //           type: 'add-message',
// // // // //           message: {
// // // // //             role: 'user',
// // // // //             content: answer.trim(),
// // // // //           },
// // // // //         });
// // // // //       } catch (e) {
// // // // //         console.warn('vapi.send failed:', e);
// // // // //       }
// // // // //     }
// // // // //     // Add to local transcript too
// // // // //     const line = `You (typed): ${answer.trim()}`;
// // // // //     setSubtitles(line);
// // // // //     setTranscript(prev => prev + (prev ? '\n\n' : '') + line);
// // // // //     setAnswerSubmitted(true);
// // // // //     setAnswer('');
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen gradient-bg">
// // // // //       <Navbar />

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         <div className="max-w-3xl mx-auto">

// // // // //           {/* Simple header — no question counter */}
// // // // //           <div className="mb-6 flex items-center gap-3">
// // // // //             <Image
// // // // //               src="/robot.png"
// // // // //               alt="AI Interviewer"
// // // // //               width={40}
// // // // //               height={40}
// // // // //               className="rounded-full"
// // // // //             />
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
// // // // //               <p className="text-sm text-muted-foreground">
// // // // //                 {interview.company || 'Interview Practice'}
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>

// // // // //           <Card className="mb-6 border-purple-500/20">
// // // // //             <CardContent className="pt-6">
// // // // //               <div className="space-y-4">

// // // // //                 {/* Phone button */}
// // // // //                 <div className="flex flex-col items-center justify-center py-8 space-y-4">
// // // // //                   <div className="text-center">
// // // // //                     {callStatus === 'idle' && (
// // // // //                       <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>
// // // // //                     )}
// // // // //                     {callStatus === 'connecting' && (
// // // // //                       <p className="text-sm text-blue-400">Connecting...</p>
// // // // //                     )}
// // // // //                     {callStatus === 'active' && (
// // // // //                       <div className="space-y-2">
// // // // //                         <p className="text-sm text-green-400">Call Active</p>
// // // // //                         {isSpeaking && (
// // // // //                           <div className="flex items-center justify-center gap-2">
// // // // //                             <Mic className="w-4 h-4 text-green-400 animate-pulse" />
// // // // //                             <span className="text-xs text-green-400">Listening...</span>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     )}
// // // // //                     {callStatus === 'ended' && (
// // // // //                       <p className="text-sm text-gray-400">Call Ended</p>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   {!isCallActive ? (
// // // // //                     <Button
// // // // //                       onClick={handleStartCall}
// // // // //                       disabled={callStatus === 'connecting' || isProcessing}
// // // // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
// // // // //                     >
// // // // //                       <Phone className="w-12 h-12" />
// // // // //                     </Button>
// // // // //                   ) : (
// // // // //                     <Button
// // // // //                       onClick={handleEndCall}
// // // // //                       disabled={isProcessing}
// // // // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
// // // // //                     >
// // // // //                       <PhoneOff className="w-12 h-12" />
// // // // //                     </Button>
// // // // //                   )}

// // // // //                   <p className="text-xs text-muted-foreground">
// // // // //                     {isCallActive ? 'Click to end call' : 'Start voice interview with AI'}
// // // // //                   </p>
// // // // //                 </div>

// // // // //                 {/* Live subtitle */}
// // // // //                 {(callStatus === 'active' || callStatus === 'ended') && (
// // // // //                   <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
// // // // //                     {subtitles ? (
// // // // //                       <p className="text-center text-white text-sm font-medium">{subtitles}</p>
// // // // //                     ) : (
// // // // //                       <p className="text-center text-muted-foreground text-xs italic">
// // // // //                         {callStatus === 'active' ? 'Waiting for speech...' : 'Conversation ended'}
// // // // //                       </p>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Typed answer box */}
// // // // //                 <div>
// // // // //                   <label className="text-sm font-medium text-gray-300 mb-2 block">
// // // // //                     Or type your answer (optional):
// // // // //                   </label>
// // // // //                   <textarea
// // // // //                     value={answer}
// // // // //                     onChange={(e) => setAnswer(e.target.value)}
// // // // //                     onKeyDown={(e) => {
// // // // //                       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
// // // // //                         e.preventDefault();
// // // // //                         handleSubmitTypedAnswer();
// // // // //                       }
// // // // //                     }}
// // // // //                     placeholder="Type your answer and click 'Submit Answer to AI' (or press Ctrl+Enter)..."
// // // // //                     className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
// // // // //                     disabled={isProcessing}
// // // // //                   />

// // // // //                   {/* Submit typed answer to AI — only visible during active call */}
// // // // //                   {isCallActive && (
// // // // //                     <Button
// // // // //                       onClick={handleSubmitTypedAnswer}
// // // // //                       disabled={!answer.trim() || isProcessing}
// // // // //                       className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
// // // // //                     >
// // // // //                       <Send className="w-4 h-4" />
// // // // //                       Submit Answer to AI
// // // // //                     </Button>
// // // // //                   )}

// // // // //                   {answerSubmitted && (
// // // // //                     <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI agent!</p>
// // // // //                   )}
// // // // //                 </div>



// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {/* Tips */}
// // // // //           <Card className="bg-blue-500/10 border-blue-500/20">
// // // // //             <CardContent className="pt-6">
// // // // //               <div className="flex items-start gap-3">
// // // // //                 <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
// // // // //                 <div className="text-sm text-gray-300">
// // // // //                   <strong className="text-white">Interview Tips:</strong>
// // // // //                   <ul className="mt-2 space-y-1 list-disc list-inside">
// // // // //                     <li>Start the call — the AI will ask your question verbally</li>
// // // // //                     <li>Speak your answer, or type below and press <strong>Submit Answer to AI</strong></li>
// // // // //                     <li>Press <strong>Ctrl+Enter</strong> to quickly submit a typed answer</li>
// // // // //                     <li>End the call when done, then click <strong>Next Question</strong></li>
// // // // //                     {answers.length > 0 && (
// // // // //                       <li className="text-green-400">✅ Progress is automatically saved!</li>
// // // // //                     )}
// // // // //                   </ul>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           {answers.length > 0 && (
// // // // //             <div className="mt-4 text-center text-sm text-muted-foreground">
// // // // //               ✅ You've answered {answers.length} question{answers.length !== 1 ? 's' : ''} so far
// // // // //             </div>
// // // // //           )}

// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // 'use client';

// // // // import { useEffect, useState, useRef } from 'react';
// // // // import { useRouter, useParams } from 'next/navigation';
// // // // import Image from 'next/image';
// // // // import { Card, CardContent } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Navbar } from '@/components/dashboard/navbar';
// // // // import { useApp } from '@/lib/context-supabase';
// // // // import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// // // // import { saveInterviewAnswer, completeInterview } from '@/lib/interview-results';
// // // // import { MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

// // // // interface ConversationMessage {
// // // //   role: 'user' | 'assistant';
// // // //   content: string;
// // // // }

// // // // export default function InterviewSessionPage() {
// // // //   const router = useRouter();
// // // //   const params = useParams();
// // // //   const { isAuthenticated, interviews, updateInterview } = useApp();

// // // //   const [isCallActive, setIsCallActive] = useState(false);
// // // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // // //   const [subtitles, setSubtitles] = useState('');
// // // //   const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
// // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // //   const [progressLoaded, setProgressLoaded] = useState(false);
// // // //   const [typedAnswer, setTypedAnswer] = useState('');
// // // //   const [answerSubmitted, setAnswerSubmitted] = useState(false);

// // // //   // Full conversation log — sent to Groq for evaluation
// // // //   const [conversation, setConversation] = useState<ConversationMessage[]>([]);
// // // //   const conversationRef = useRef<ConversationMessage[]>([]);

// // // //   const completeRef = useRef<() => Promise<void>>(async () => {});

// // // //   const interview = interviews.find(i => i.id === params.id);

// // // //   useEffect(() => {
// // // //     if (interview && !progressLoaded) {
// // // //       setProgressLoaded(true);
// // // //     }
// // // //   }, [interview, progressLoaded]);

// // // //   useEffect(() => {
// // // //     if (interview && interview.status === 'pending') {
// // // //       updateInterview(interview.id, { status: 'in-progress' });
// // // //     }
// // // //   }, [interview]);

// // // //   // Keep conversationRef in sync with state
// // // //   useEffect(() => {
// // // //     conversationRef.current = conversation;
// // // //   }, [conversation]);

// // // //   useEffect(() => {
// // // //     const vapi = getVapiClient();
// // // //     if (!vapi) return;

// // // //     const handleCallStart = () => {
// // // //       setIsCallActive(true);
// // // //       setCallStatus('active');
// // // //       setAnswerSubmitted(false);
// // // //       setConversation([]);
// // // //       conversationRef.current = [];
// // // //     };

// // // //     const handleCallEnd = () => {
// // // //       setIsCallActive(false);
// // // //       setCallStatus('ended');
// // // //       setIsSpeaking(false);
// // // //       setSubtitles('');
// // // //       // Auto-complete with 1.5s delay to let final transcript settle
// // // //       setTimeout(() => {
// // // //         completeRef.current();
// // // //       }, 1500);
// // // //     };

// // // //     const handleSpeechStart = () => setIsSpeaking(true);
// // // //     const handleSpeechEnd = () => setIsSpeaking(false);

// // // //     const handleMessage = (message: any) => {
// // // //       console.log('📨 Vapi message:', JSON.stringify(message, null, 2));

// // // //       if (message.type === 'transcript') {
// // // //         const speaker = message.role === 'user' ? 'You' : 'AI';
// // // //         const text = message.transcript || '';
// // // //         if (!text) return;

// // // //         if (message.transcriptType === 'partial') {
// // // //           setSubtitles(`${speaker}: ${text}`);
// // // //         } else if (message.transcriptType === 'final') {
// // // //           setSubtitles(`${speaker}: ${text}`);
// // // //           // Add to conversation log
// // // //           const msg: ConversationMessage = {
// // // //             role: message.role === 'user' ? 'user' : 'assistant',
// // // //             content: text,
// // // //           };
// // // //           setConversation(prev => [...prev, msg]);
// // // //           conversationRef.current = [...conversationRef.current, msg];
// // // //         }
// // // //         return;
// // // //       }

// // // //       if (message.type === 'conversation-update' && message.messages) {
// // // //         const last = message.messages[message.messages.length - 1];
// // // //         if (last?.content) {
// // // //           const speaker = last.role === 'user' ? 'You' : 'AI';
// // // //           setSubtitles(`${speaker}: ${last.content}`);
// // // //           const msg: ConversationMessage = {
// // // //             role: last.role === 'user' ? 'user' : 'assistant',
// // // //             content: last.content,
// // // //           };
// // // //           setConversation(prev => [...prev, msg]);
// // // //           conversationRef.current = [...conversationRef.current, msg];
// // // //         }
// // // //         return;
// // // //       }

// // // //       if (message.role === 'user' && message.content) {
// // // //         setSubtitles('You: ' + message.content);
// // // //         const msg: ConversationMessage = { role: 'user', content: message.content };
// // // //         setConversation(prev => [...prev, msg]);
// // // //         conversationRef.current = [...conversationRef.current, msg];
// // // //       } else if (message.role === 'assistant' && message.content) {
// // // //         setSubtitles('AI: ' + message.content);
// // // //         const msg: ConversationMessage = { role: 'assistant', content: message.content };
// // // //         setConversation(prev => [...prev, msg]);
// // // //         conversationRef.current = [...conversationRef.current, msg];
// // // //       }
// // // //     };

// // // //     const handleTranscript = (data: any) => {
// // // //       if (data?.transcript) {
// // // //         const speaker = data.role === 'user' ? 'You' : 'AI';
// // // //         setSubtitles(`${speaker}: ${data.transcript}`);
// // // //         if (data.transcriptType === 'final') {
// // // //           const msg: ConversationMessage = {
// // // //             role: data.role === 'user' ? 'user' : 'assistant',
// // // //             content: data.transcript,
// // // //           };
// // // //           setConversation(prev => [...prev, msg]);
// // // //           conversationRef.current = [...conversationRef.current, msg];
// // // //         }
// // // //       }
// // // //     };

// // // //     const handleError = (error: any) => {
// // // //       console.error('Vapi error:', error);
// // // //       setCallStatus('idle');
// // // //       setIsCallActive(false);
// // // //     };

// // // //     vapi.on('call-start', handleCallStart);
// // // //     vapi.on('call-end', handleCallEnd);
// // // //     vapi.on('speech-start', handleSpeechStart);
// // // //     vapi.on('speech-end', handleSpeechEnd);
// // // //     vapi.on('message', handleMessage);
// // // //     vapi.on('transcript', handleTranscript);
// // // //     vapi.on('error', handleError);

// // // //     return () => {
// // // //       vapi.off('call-start', handleCallStart);
// // // //       vapi.off('call-end', handleCallEnd);
// // // //       vapi.off('speech-start', handleSpeechStart);
// // // //       vapi.off('speech-end', handleSpeechEnd);
// // // //       vapi.off('message', handleMessage);
// // // //       vapi.off('transcript', handleTranscript);
// // // //       vapi.off('error', handleError);
// // // //     };
// // // //   }, []);

// // // //   if (!isAuthenticated || !interview) return null;

// // // //   const currentQuestion = interview.questions[0];

// // // //   // Auto-complete: save conversation + evaluate with Groq + redirect to results
// // // //   const handleCompleteInterview = async () => {
// // // //     setIsProcessing(true);
// // // //     try {
// // // //       const fullConversation = conversationRef.current;

// // // //       // Add typed answer to conversation if present
// // // //       if (typedAnswer.trim()) {
// // // //         fullConversation.push({ role: 'user', content: typedAnswer.trim() });
// // // //       }

// // // //       console.log('💾 Saving conversation as answer...');
// // // //       const conversationText = fullConversation
// // // //         .map(m => `${m.role === 'user' ? 'Candidate' : 'AI'}: ${m.content}`)
// // // //         .join('\n\n');

// // // //       await saveInterviewAnswer(
// // // //         interview.id,
// // // //         0,
// // // //         'Full Interview Conversation',
// // // //         interview.interviewType,
// // // //         conversationText,
// // // //         conversationText
// // // //       );

// // // //       console.log('🤖 Sending full conversation to Groq for evaluation...');
// // // //       await completeInterview(
// // // //         interview.id,
// // // //         fullConversation,          // ← full conversation JSON
// // // //         interview.interviewType,   // ← behavioral / technical / mixed
// // // //         interview.jobRole,
// // // //         interview.difficulty
// // // //       );

// // // //       await updateInterview(interview.id, {
// // // //         status: 'completed',
// // // //         currentQuestionIndex: undefined,
// // // //         answersProgress: undefined,
// // // //       });

// // // //       console.log('✅ Interview completed! Redirecting to results...');
// // // //       router.push(`/interview/${interview.id}/results`);

// // // //     } catch (error) {
// // // //       console.error('❌ Error completing interview:', error);
// // // //       alert('Failed to save interview. Please try again.');
// // // //     } finally {
// // // //       setIsProcessing(false);
// // // //     }
// // // //   };

// // // //   // Keep ref in sync
// // // //   completeRef.current = handleCompleteInterview;

// // // //   const handleStartCall = async () => {
// // // //     try {
// // // //       setCallStatus('connecting');
// // // //       setSubtitles('');
// // // //       setTypedAnswer('');
// // // //       setAnswerSubmitted(false);
// // // //       setConversation([]);
// // // //       conversationRef.current = [];
// // // //       await startInterviewCall({
// // // //         jobRole: interview.jobRole,
// // // //         company: interview.company,
// // // //         interviewType: interview.interviewType,
// // // //         difficulty: interview.difficulty,
// // // //         currentQuestion: currentQuestion?.question || '',
// // // //         questionCategory: currentQuestion?.category || '',
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Failed to start call:', error);
// // // //       setCallStatus('idle');
// // // //     }
// // // //   };

// // // //   const handleEndCall = async () => {
// // // //     try {
// // // //       await stopInterviewCall();
// // // //       setSubtitles('');
// // // //     } catch (error) {
// // // //       console.error('Failed to end call:', error);
// // // //     }
// // // //   };

// // // //   // Submit typed answer to Vapi agent during call
// // // //   const handleSubmitTypedAnswer = () => {
// // // //     if (!typedAnswer.trim()) return;
// // // //     const vapi = getVapiClient();
// // // //     if (vapi && isCallActive) {
// // // //       try {
// // // //         (vapi as any).send({
// // // //           type: 'add-message',
// // // //           message: { role: 'user', content: typedAnswer.trim() },
// // // //         });
// // // //       } catch (e) {
// // // //         console.warn('vapi.send failed:', e);
// // // //       }
// // // //     }
// // // //     // Add to conversation log
// // // //     const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
// // // //     setConversation(prev => [...prev, msg]);
// // // //     conversationRef.current = [...conversationRef.current, msg];
// // // //     setSubtitles(`You (typed): ${typedAnswer.trim()}`);
// // // //     setAnswerSubmitted(true);
// // // //     setTypedAnswer('');
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen gradient-bg">
// // // //       <Navbar />

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         <div className="max-w-3xl mx-auto">

// // // //           {/* Header */}
// // // //           <div className="mb-6 flex items-center gap-3">
// // // //             <Image src="/robot.png" alt="AI Interviewer" width={40} height={40} className="rounded-full" />
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
// // // //               <p className="text-sm text-muted-foreground">
// // // //                 {interview.company || 'Interview Practice'} · {interview.interviewType} · {interview.difficulty}
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <Card className="mb-6 border-purple-500/20">
// // // //             <CardContent className="pt-6">
// // // //               <div className="space-y-4">

// // // //                 {/* Phone button */}
// // // //                 <div className="flex flex-col items-center justify-center py-8 space-y-4">
// // // //                   <div className="text-center">
// // // //                     {callStatus === 'idle' && (
// // // //                       <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>
// // // //                     )}
// // // //                     {callStatus === 'connecting' && (
// // // //                       <p className="text-sm text-blue-400">Connecting...</p>
// // // //                     )}
// // // //                     {callStatus === 'active' && (
// // // //                       <div className="space-y-2">
// // // //                         <p className="text-sm text-green-400">Call Active</p>
// // // //                         {isSpeaking && (
// // // //                           <div className="flex items-center justify-center gap-2">
// // // //                             <Mic className="w-4 h-4 text-green-400 animate-pulse" />
// // // //                             <span className="text-xs text-green-400">Listening...</span>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     )}
// // // //                     {callStatus === 'ended' && (
// // // //                       <div className="space-y-1">
// // // //                         <p className="text-sm text-gray-400">Call Ended</p>
// // // //                         {isProcessing && (
// // // //                           <p className="text-xs text-purple-400 animate-pulse">
// // // //                             🤖 Groq AI is evaluating your interview...
// // // //                           </p>
// // // //                         )}
// // // //                       </div>
// // // //                     )}
// // // //                   </div>

// // // //                   {!isCallActive ? (
// // // //                     <Button
// // // //                       onClick={handleStartCall}
// // // //                       disabled={callStatus === 'connecting' || isProcessing}
// // // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
// // // //                     >
// // // //                       <Phone className="w-12 h-12" />
// // // //                     </Button>
// // // //                   ) : (
// // // //                     <Button
// // // //                       onClick={handleEndCall}
// // // //                       disabled={isProcessing}
// // // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
// // // //                     >
// // // //                       <PhoneOff className="w-12 h-12" />
// // // //                     </Button>
// // // //                   )}

// // // //                   <p className="text-xs text-muted-foreground">
// // // //                     {isCallActive ? 'Click to end call — interview will auto-complete' : 'Start voice interview with AI'}
// // // //                   </p>
// // // //                 </div>

// // // //                 {/* Live subtitle */}
// // // //                 {(callStatus === 'active' || callStatus === 'ended') && (
// // // //                   <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
// // // //                     {subtitles ? (
// // // //                       <p className="text-center text-white text-sm font-medium">{subtitles}</p>
// // // //                     ) : (
// // // //                       <p className="text-center text-muted-foreground text-xs italic">
// // // //                         {callStatus === 'active' ? 'Waiting for speech...' : isProcessing ? 'Evaluating...' : 'Conversation ended'}
// // // //                       </p>
// // // //                     )}
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Conversation count indicator */}
// // // //                 {conversation.length > 0 && (
// // // //                   <p className="text-xs text-center text-purple-400">
// // // //                     💬 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded in conversation
// // // //                   </p>
// // // //                 )}

// // // //                 {/* Typed answer */}
// // // //                 <div>
// // // //                   <label className="text-sm font-medium text-gray-300 mb-2 block">
// // // //                     Or type your answer (optional):
// // // //                   </label>
// // // //                   <textarea
// // // //                     value={typedAnswer}
// // // //                     onChange={(e) => setTypedAnswer(e.target.value)}
// // // //                     onKeyDown={(e) => {
// // // //                       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
// // // //                         e.preventDefault();
// // // //                         handleSubmitTypedAnswer();
// // // //                       }
// // // //                     }}
// // // //                     placeholder="Type your answer and click 'Submit to AI' or press Ctrl+Enter..."
// // // //                     className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
// // // //                     disabled={isProcessing}
// // // //                   />

// // // //                   {isCallActive && (
// // // //                     <Button
// // // //                       onClick={handleSubmitTypedAnswer}
// // // //                       disabled={!typedAnswer.trim() || isProcessing}
// // // //                       className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
// // // //                     >
// // // //                       <Send className="w-4 h-4" />
// // // //                       Submit Answer to AI
// // // //                     </Button>
// // // //                   )}

// // // //                   {answerSubmitted && (
// // // //                     <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI agent!</p>
// // // //                   )}
// // // //                 </div>

// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Tips */}
// // // //           <Card className="bg-blue-500/10 border-blue-500/20">
// // // //             <CardContent className="pt-6">
// // // //               <div className="flex items-start gap-3">
// // // //                 <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
// // // //                 <div className="text-sm text-gray-300">
// // // //                   <strong className="text-white">How it works:</strong>
// // // //                   <ul className="mt-2 space-y-1 list-disc list-inside">
// // // //                     <li>Start the call — Claude AI will conduct your <strong>{interview.interviewType}</strong> interview</li>
// // // //                     <li>Speak your answers — the full conversation is recorded</li>
// // // //                     <li>End the call — Groq AI evaluates your <strong>{interview.interviewType}</strong> performance</li>
// // // //                     <li>Results are generated based on your interview type, not individual questions</li>
// // // //                   </ul>
// // // //                 </div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }





// // // 'use client';

// // // import { useEffect, useState, useRef } from 'react';
// // // import { useRouter, useParams } from 'next/navigation';
// // // import Image from 'next/image';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Navbar } from '@/components/dashboard/navbar';
// // // import { useApp } from '@/lib/context-supabase';
// // // import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// // // import { saveInterviewAnswer, completeInterview } from '@/lib/interview-results';
// // // import { MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

// // // interface ConversationMessage {
// // //   role: 'user' | 'assistant';
// // //   content: string;
// // // }

// // // export default function InterviewSessionPage() {
// // //   const router = useRouter();
// // //   const params = useParams();
// // //   const { isAuthenticated, interviews, updateInterview } = useApp();

// // //   const [isCallActive, setIsCallActive] = useState(false);
// // //   const [isSpeaking, setIsSpeaking] = useState(false);
// // //   const [subtitles, setSubtitles] = useState('');
// // //   const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const isProcessingRef = useRef(false);
// // //   const [progressLoaded, setProgressLoaded] = useState(false);
// // //   const [typedAnswer, setTypedAnswer] = useState('');
// // //   const [answerSubmitted, setAnswerSubmitted] = useState(false);
// // //   const [processingStep, setProcessingStep] = useState('');

// // //   const [conversation, setConversation] = useState<ConversationMessage[]>([]);
// // //   const conversationRef = useRef<ConversationMessage[]>([]);
// // //   const completeRef = useRef<() => Promise<void>>(async () => {});

// // //   const interview = interviews.find(i => i.id === params.id);

// // //   useEffect(() => {
// // //     if (interview && !progressLoaded) setProgressLoaded(true);
// // //   }, [interview, progressLoaded]);

// // //   useEffect(() => {
// // //     if (interview && interview.status === 'pending') {
// // //       updateInterview(interview.id, { status: 'in-progress' });
// // //     }
// // //   }, [interview]);

// // //   useEffect(() => {
// // //     conversationRef.current = conversation;
// // //   }, [conversation]);

// // //   useEffect(() => {
// // //     const vapi = getVapiClient();
// // //     if (!vapi) return;

// // //     const handleCallStart = () => {
// // //       setIsCallActive(true);
// // //       setCallStatus('active');
// // //       setAnswerSubmitted(false);
// // //       setConversation([]);
// // //       conversationRef.current = [];
// // //     };

// // //     const handleCallEnd = () => {
// // //       setIsCallActive(false);
// // //       setCallStatus('ended');
// // //       setIsSpeaking(false);
// // //       setSubtitles('');
// // //       setTimeout(() => completeRef.current(), 1500);
// // //     };

// // //     const handleSpeechStart = () => setIsSpeaking(true);
// // //     const handleSpeechEnd = () => setIsSpeaking(false);

// // //     const addToConversation = (role: 'user' | 'assistant', content: string) => {
// // //       if (!content || content.trim().length < 2) return;
// // //       const msg: ConversationMessage = { role, content: content.trim() };
// // //       setConversation(prev => [...prev, msg]);
// // //       conversationRef.current = [...conversationRef.current, msg];
// // //     };

// // //     const handleMessage = (message: any) => {
// // //       if (message.type === 'transcript') {
// // //         const role = message.role === 'user' ? 'user' : 'assistant';
// // //         const text = message.transcript || '';
// // //         if (!text) return;
// // //         if (message.transcriptType === 'partial') {
// // //           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
// // //         } else if (message.transcriptType === 'final') {
// // //           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
// // //           addToConversation(role, text);
// // //         }
// // //         return;
// // //       }
// // //       if (message.type === 'conversation-update' && message.messages) {
// // //         const last = message.messages[message.messages.length - 1];
// // //         if (last?.content) {
// // //           addToConversation(last.role === 'user' ? 'user' : 'assistant', last.content);
// // //           setSubtitles(`${last.role === 'user' ? 'You' : 'AI'}: ${last.content}`);
// // //         }
// // //         return;
// // //       }
// // //       if (message.role === 'user' && message.content) {
// // //         addToConversation('user', message.content);
// // //         setSubtitles('You: ' + message.content);
// // //       } else if (message.role === 'assistant' && message.content) {
// // //         addToConversation('assistant', message.content);
// // //         setSubtitles('AI: ' + message.content);
// // //       }
// // //     };

// // //     const handleTranscript = (data: any) => {
// // //       if (data?.transcript) {
// // //         const role = data.role === 'user' ? 'user' : 'assistant';
// // //         setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
// // //         if (data.transcriptType === 'final') addToConversation(role, data.transcript);
// // //       }
// // //     };

// // //     const handleError = (error: any) => {
// // //       console.error('Vapi error:', error);
// // //       // Ignore errors that fire after call ends naturally (e.g. "Meeting has ended")
// // //       // Only reset state if we haven't started processing results yet
// // //       if (!isProcessingRef.current) {
// // //         setCallStatus('idle');
// // //         setIsCallActive(false);
// // //       }
// // //     };

// // //     vapi.on('call-start', handleCallStart);
// // //     vapi.on('call-end', handleCallEnd);
// // //     vapi.on('speech-start', handleSpeechStart);
// // //     vapi.on('speech-end', handleSpeechEnd);
// // //     vapi.on('message', handleMessage);
// // //     vapi.on('transcript', handleTranscript);
// // //     vapi.on('error', handleError);

// // //     return () => {
// // //       vapi.off('call-start', handleCallStart);
// // //       vapi.off('call-end', handleCallEnd);
// // //       vapi.off('speech-start', handleSpeechStart);
// // //       vapi.off('speech-end', handleSpeechEnd);
// // //       vapi.off('message', handleMessage);
// // //       vapi.off('transcript', handleTranscript);
// // //       vapi.off('error', handleError);
// // //     };
// // //   }, []);

// // //   if (!isAuthenticated || !interview) return null;

// // //   const currentQuestion = interview.questions?.[0];

// // //   const handleCompleteInterview = async () => {
// // //     if (isProcessing) return;
// // //     setIsProcessing(true);
// // //     isProcessingRef.current = true;

// // //     const interviewId = interview.id;
// // //     const fullConversation = [...conversationRef.current];

// // //     // Add any typed answer to conversation
// // //     if (typedAnswer.trim()) {
// // //       fullConversation.push({ role: 'user', content: typedAnswer.trim() });
// // //     }

// // //     try {
// // //       setProcessingStep('Saving your answers...');
// // //       const conversationText = fullConversation
// // //         .map(m => `${m.role === 'user' ? 'Candidate' : 'AI'}: ${m.content}`)
// // //         .join('\n\n');

// // //       await saveInterviewAnswer(
// // //         interviewId, 0,
// // //         'Full Interview Conversation',
// // //         interview.interviewType,
// // //         conversationText,
// // //         conversationText
// // //       );
// // //     } catch (e) {
// // //       console.error('Save answer failed (continuing):', e);
// // //     }

// // //     try {
// // //       setProcessingStep('Groq AI is evaluating your interview...');
// // //       await completeInterview(
// // //         interviewId,
// // //         fullConversation,
// // //         interview.interviewType,
// // //         interview.jobRole,
// // //         interview.difficulty
// // //       );
// // //     } catch (e) {
// // //       console.error('Complete interview failed (continuing to redirect):', e);
// // //     }

// // //     try {
// // //       await updateInterview(interviewId, {
// // //         status: 'completed',
// // //         currentQuestionIndex: undefined,
// // //         answersProgress: undefined,
// // //       });
// // //     } catch (e) {
// // //       console.error('updateInterview failed (continuing to redirect):', e);
// // //     }

// // //     // ALWAYS redirect — no matter what failed above
// // //     console.log('✅ Redirecting to results...');
// // //     router.push(`/interview/${interviewId}/results`);
// // //   };

// // //   completeRef.current = handleCompleteInterview;

// // //   const handleStartCall = async () => {
// // //     try {
// // //       setCallStatus('connecting');
// // //       setSubtitles('');
// // //       setTypedAnswer('');
// // //       setAnswerSubmitted(false);
// // //       setConversation([]);
// // //       conversationRef.current = [];
// // //       await startInterviewCall({
// // //         jobRole: interview.jobRole,
// // //         company: interview.company,
// // //         interviewType: interview.interviewType,
// // //         difficulty: interview.difficulty,
// // //         currentQuestion: currentQuestion?.question || '',
// // //         questionCategory: currentQuestion?.category || '',
// // //       });
// // //     } catch (error) {
// // //       console.error('Failed to start call:', error);
// // //       setCallStatus('idle');
// // //     }
// // //   };

// // //   const handleEndCall = async () => {
// // //     try {
// // //       await stopInterviewCall();
// // //       setSubtitles('');
// // //     } catch (error) {
// // //       console.error('Failed to end call:', error);
// // //     }
// // //   };

// // //   const handleSubmitTypedAnswer = () => {
// // //     if (!typedAnswer.trim()) return;
// // //     const vapi = getVapiClient();
// // //     if (vapi && isCallActive) {
// // //       try {
// // //         (vapi as any).send({
// // //           type: 'add-message',
// // //           message: { role: 'user', content: typedAnswer.trim() },
// // //         });
// // //       } catch (e) {
// // //         console.warn('vapi.send failed:', e);
// // //       }
// // //     }
// // //     const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
// // //     setConversation(prev => [...prev, msg]);
// // //     conversationRef.current = [...conversationRef.current, msg];
// // //     setSubtitles(`You (typed): ${typedAnswer.trim()}`);
// // //     setAnswerSubmitted(true);
// // //     setTypedAnswer('');
// // //   };

// // //   return (
// // //     <div className="min-h-screen gradient-bg">
// // //       <Navbar />
// // //       <div className="container mx-auto px-4 py-8">
// // //         <div className="max-w-3xl mx-auto">

// // //           {/* Header */}
// // //           <div className="mb-6 flex items-center gap-3">
// // //             <Image src="/robot.png" alt="AI Interviewer" width={40} height={40} className="rounded-full" />
// // //             <div>
// // //               <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
// // //               <p className="text-sm text-muted-foreground">
// // //                 {interview.company || 'Interview Practice'} · {interview.interviewType} · {interview.difficulty}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <Card className="mb-6 border-purple-500/20">
// // //             <CardContent className="pt-6">
// // //               <div className="space-y-4">

// // //                 {/* Phone button */}
// // //                 <div className="flex flex-col items-center justify-center py-8 space-y-4">
// // //                   <div className="text-center">
// // //                     {callStatus === 'idle' && (
// // //                       <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>
// // //                     )}
// // //                     {callStatus === 'connecting' && (
// // //                       <p className="text-sm text-blue-400">Connecting...</p>
// // //                     )}
// // //                     {callStatus === 'active' && (
// // //                       <div className="space-y-2">
// // //                         <p className="text-sm text-green-400">Call Active</p>
// // //                         {isSpeaking && (
// // //                           <div className="flex items-center justify-center gap-2">
// // //                             <Mic className="w-4 h-4 text-green-400 animate-pulse" />
// // //                             <span className="text-xs text-green-400">Listening...</span>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     )}
// // //                     {callStatus === 'ended' && (
// // //                       <div className="space-y-1">
// // //                         <p className="text-sm text-gray-400">Call Ended</p>
// // //                         {isProcessing && (
// // //                           <p className="text-xs text-purple-400 animate-pulse">
// // //                             🤖 {processingStep}
// // //                           </p>
// // //                         )}
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {!isCallActive ? (
// // //                     <Button
// // //                       onClick={handleStartCall}
// // //                       disabled={callStatus === 'connecting' || isProcessing}
// // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
// // //                     >
// // //                       <Phone className="w-12 h-12" />
// // //                     </Button>
// // //                   ) : (
// // //                     <Button
// // //                       onClick={handleEndCall}
// // //                       disabled={isProcessing}
// // //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
// // //                     >
// // //                       <PhoneOff className="w-12 h-12" />
// // //                     </Button>
// // //                   )}

// // //                   <p className="text-xs text-muted-foreground">
// // //                     {isCallActive ? 'Click to end call — results will auto-generate' : 'Start voice interview with AI'}
// // //                   </p>
// // //                 </div>

// // //                 {/* Live subtitle */}
// // //                 {(callStatus === 'active' || callStatus === 'ended') && (
// // //                   <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
// // //                     {isProcessing ? (
// // //                       <div className="flex items-center gap-2">
// // //                         <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
// // //                         <p className="text-center text-purple-300 text-sm">{processingStep}</p>
// // //                       </div>
// // //                     ) : subtitles ? (
// // //                       <p className="text-center text-white text-sm font-medium">{subtitles}</p>
// // //                     ) : (
// // //                       <p className="text-center text-muted-foreground text-xs italic">
// // //                         {callStatus === 'active' ? 'Waiting for speech...' : 'Conversation ended'}
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 )}

// // //                 {/* Conversation count */}
// // //                 {conversation.length > 0 && (
// // //                   <p className="text-xs text-center text-purple-400">
// // //                     💬 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
// // //                   </p>
// // //                 )}

// // //                 {/* Typed answer */}
// // //                 <div>
// // //                   <label className="text-sm font-medium text-gray-300 mb-2 block">
// // //                     Or type your answer (optional):
// // //                   </label>
// // //                   <textarea
// // //                     value={typedAnswer}
// // //                     onChange={(e) => setTypedAnswer(e.target.value)}
// // //                     onKeyDown={(e) => {
// // //                       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
// // //                         e.preventDefault();
// // //                         handleSubmitTypedAnswer();
// // //                       }
// // //                     }}
// // //                     placeholder="Type your answer and click 'Submit to AI' or press Ctrl+Enter..."
// // //                     className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
// // //                     disabled={isProcessing}
// // //                   />
// // //                   {isCallActive && (
// // //                     <Button
// // //                       onClick={handleSubmitTypedAnswer}
// // //                       disabled={!typedAnswer.trim() || isProcessing}
// // //                       className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
// // //                     >
// // //                       <Send className="w-4 h-4" />
// // //                       Submit Answer to AI
// // //                     </Button>
// // //                   )}
// // //                   {answerSubmitted && (
// // //                     <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI agent!</p>
// // //                   )}
// // //                 </div>

// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Tips */}
// // //           <Card className="bg-blue-500/10 border-blue-500/20">
// // //             <CardContent className="pt-6">
// // //               <div className="flex items-start gap-3">
// // //                 <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
// // //                 <div className="text-sm text-gray-300">
// // //                   <strong className="text-white">How it works:</strong>
// // //                   <ul className="mt-2 space-y-1 list-disc list-inside">
// // //                     <li>Start the call — Claude AI conducts your <strong>{interview.interviewType}</strong> interview</li>
// // //                     <li>Speak your answers — the full conversation is recorded</li>
// // //                     <li>End the call — Groq AI evaluates your performance automatically</li>
// // //                     <li>Results show your skill level and detailed feedback by category</li>
// // //                   </ul>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }







// // 'use client';

// // import { useEffect, useState, useRef } from 'react';
// // import { useRouter, useParams } from 'next/navigation';
// // import Image from 'next/image';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Navbar } from '@/components/dashboard/navbar';
// // import { useApp } from '@/lib/context-supabase';
// // import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// // import { saveConversationAndRedirect } from '@/lib/interview-results';
// // import { MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

// // interface ConversationMessage {
// //   role: 'user' | 'assistant';
// //   content: string;
// // }

// // export default function InterviewSessionPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { isAuthenticated, interviews, updateInterview } = useApp();

// //   const [isCallActive, setIsCallActive] = useState(false);
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [subtitles, setSubtitles] = useState('');
// //   const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const isProcessingRef = useRef(false);
// //   const [typedAnswer, setTypedAnswer] = useState('');
// //   const [answerSubmitted, setAnswerSubmitted] = useState(false);
// //   const [progressLoaded, setProgressLoaded] = useState(false);

// //   const conversationRef = useRef<ConversationMessage[]>([]);
// //   const [conversation, setConversation] = useState<ConversationMessage[]>([]);
// //   const completeRef = useRef<() => Promise<void>>(async () => {});

// //   const interview = interviews.find(i => i.id === params.id);

// //   useEffect(() => {
// //     if (interview && !progressLoaded) setProgressLoaded(true);
// //   }, [interview, progressLoaded]);

// //   useEffect(() => {
// //     if (interview && interview.status === 'pending') {
// //       updateInterview(interview.id, { status: 'in-progress' });
// //     }
// //   }, [interview]);

// //   useEffect(() => {
// //     conversationRef.current = conversation;
// //   }, [conversation]);

// //   useEffect(() => {
// //     const vapi = getVapiClient();
// //     if (!vapi) return;

// //     const handleCallStart = () => {
// //       setIsCallActive(true);
// //       setCallStatus('active');
// //       setAnswerSubmitted(false);
// //       setConversation([]);
// //       conversationRef.current = [];
// //     };

// //     const handleCallEnd = () => {
// //       setIsCallActive(false);
// //       setCallStatus('ended');
// //       setIsSpeaking(false);
// //       setSubtitles('');
// //       // Trigger completion after short delay to catch final transcript
// //       setTimeout(() => completeRef.current(), 1500);
// //     };

// //     const handleSpeechStart = () => setIsSpeaking(true);
// //     const handleSpeechEnd = () => setIsSpeaking(false);

// //     const addMessage = (role: 'user' | 'assistant', content: string) => {
// //       if (!content || content.trim().length < 2) return;
// //       const msg: ConversationMessage = { role, content: content.trim() };
// //       setConversation(prev => [...prev, msg]);
// //       conversationRef.current = [...conversationRef.current, msg];
// //     };

// //     const handleMessage = (message: any) => {
// //       if (message.type === 'transcript') {
// //         const role = message.role === 'user' ? 'user' : 'assistant';
// //         const text = message.transcript || '';
// //         if (!text) return;
// //         if (message.transcriptType === 'partial') {
// //           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
// //         } else if (message.transcriptType === 'final') {
// //           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
// //           addMessage(role, text);
// //         }
// //         return;
// //       }
// //       if (message.type === 'conversation-update' && message.messages) {
// //         const last = message.messages[message.messages.length - 1];
// //         if (last?.content) {
// //           const role = last.role === 'user' ? 'user' : 'assistant';
// //           addMessage(role, last.content);
// //           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${last.content}`);
// //         }
// //         return;
// //       }
// //       if (message.role === 'user' && message.content) {
// //         addMessage('user', message.content);
// //         setSubtitles('You: ' + message.content);
// //       } else if (message.role === 'assistant' && message.content) {
// //         addMessage('assistant', message.content);
// //         setSubtitles('AI: ' + message.content);
// //       }
// //     };

// //     const handleTranscript = (data: any) => {
// //       if (data?.transcript) {
// //         const role = data.role === 'user' ? 'user' : 'assistant';
// //         setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
// //         if (data.transcriptType === 'final') addMessage(role, data.transcript);
// //       }
// //     };

// //     const handleError = (error: any) => {
// //       console.error('Vapi error:', error);
// //       if (!isProcessingRef.current) {
// //         setCallStatus('idle');
// //         setIsCallActive(false);
// //       }
// //     };

// //     vapi.on('call-start', handleCallStart);
// //     vapi.on('call-end', handleCallEnd);
// //     vapi.on('speech-start', handleSpeechStart);
// //     vapi.on('speech-end', handleSpeechEnd);
// //     vapi.on('message', handleMessage);
// //     vapi.on('transcript', handleTranscript);
// //     vapi.on('error', handleError);

// //     return () => {
// //       vapi.off('call-start', handleCallStart);
// //       vapi.off('call-end', handleCallEnd);
// //       vapi.off('speech-start', handleSpeechStart);
// //       vapi.off('speech-end', handleSpeechEnd);
// //       vapi.off('message', handleMessage);
// //       vapi.off('transcript', handleTranscript);
// //       vapi.off('error', handleError);
// //     };
// //   }, []);

// //   if (!isAuthenticated || !interview) return null;

// //   const currentQuestion = interview.questions?.[0];

// //   // ── MAIN COMPLETION FUNCTION ──────────────────────────────────────────────
// //   // Just saves JSON to DB and redirects instantly — NO waiting for Groq
// //   const handleCompleteInterview = async () => {
// //     if (isProcessingRef.current) return;
// //     setIsProcessing(true);
// //     isProcessingRef.current = true;

// //     const interviewId = interview.id;
// //     const fullConversation = [...conversationRef.current];

// //     if (typedAnswer.trim()) {
// //       fullConversation.push({ role: 'user', content: typedAnswer.trim() });
// //     }

// //     console.log(`💾 Saving ${fullConversation.length} messages as JSON to DB...`);

// //     try {
// //       // Save conversation JSON + mark as 'processing' — instant Supabase write
// //       await saveConversationAndRedirect(
// //         interviewId,
// //         fullConversation,
// //         interview.interviewType,
// //         interview.jobRole,
// //         interview.difficulty
// //       );
// //     } catch (e) {
// //       console.error('Save failed (still redirecting):', e);
// //     }

// //     // Redirect immediately — results page handles Groq evaluation
// //     console.log('✅ Saved! Redirecting to results...');
// //     router.push(`/interview/${interviewId}/results`);
// //   };

// //   completeRef.current = handleCompleteInterview;

// //   const handleStartCall = async () => {
// //     try {
// //       setCallStatus('connecting');
// //       setSubtitles('');
// //       setTypedAnswer('');
// //       setAnswerSubmitted(false);
// //       setConversation([]);
// //       conversationRef.current = [];
// //       await startInterviewCall({
// //         jobRole: interview.jobRole,
// //         company: interview.company,
// //         interviewType: interview.interviewType,
// //         difficulty: interview.difficulty,
// //         currentQuestion: currentQuestion?.question || '',
// //         questionCategory: currentQuestion?.category || '',
// //       });
// //     } catch (error) {
// //       console.error('Failed to start call:', error);
// //       setCallStatus('idle');
// //     }
// //   };

// //   const handleEndCall = async () => {
// //     try {
// //       await stopInterviewCall();
// //       setSubtitles('');
// //     } catch (error) {
// //       console.error('Failed to end call:', error);
// //     }
// //   };

// //   const handleSubmitTypedAnswer = () => {
// //     if (!typedAnswer.trim()) return;
// //     const vapi = getVapiClient();
// //     if (vapi && isCallActive) {
// //       try {
// //         (vapi as any).send({
// //           type: 'add-message',
// //           message: { role: 'user', content: typedAnswer.trim() },
// //         });
// //       } catch (e) {
// //         console.warn('vapi.send failed:', e);
// //       }
// //     }
// //     const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
// //     setConversation(prev => [...prev, msg]);
// //     conversationRef.current = [...conversationRef.current, msg];
// //     setSubtitles(`You (typed): ${typedAnswer.trim()}`);
// //     setAnswerSubmitted(true);
// //     setTypedAnswer('');
// //   };

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-3xl mx-auto">

// //           <div className="mb-6 flex items-center gap-3">
// //             <Image src="/robot.png" alt="AI Interviewer" width={40} height={40} className="rounded-full" />
// //             <div>
// //               <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
// //               <p className="text-sm text-muted-foreground">
// //                 {interview.company || 'Interview Practice'} · {interview.interviewType} · {interview.difficulty}
// //               </p>
// //             </div>
// //           </div>

// //           <Card className="mb-6 border-purple-500/20">
// //             <CardContent className="pt-6">
// //               <div className="space-y-4">

// //                 <div className="flex flex-col items-center justify-center py-8 space-y-4">
// //                   <div className="text-center">
// //                     {callStatus === 'idle' && <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>}
// //                     {callStatus === 'connecting' && <p className="text-sm text-blue-400">Connecting...</p>}
// //                     {callStatus === 'active' && (
// //                       <div className="space-y-2">
// //                         <p className="text-sm text-green-400">Call Active</p>
// //                         {isSpeaking && (
// //                           <div className="flex items-center justify-center gap-2">
// //                             <Mic className="w-4 h-4 text-green-400 animate-pulse" />
// //                             <span className="text-xs text-green-400">Listening...</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}
// //                     {callStatus === 'ended' && (
// //                       <div className="space-y-1">
// //                         <p className="text-sm text-gray-400">Call Ended</p>
// //                         {isProcessing && (
// //                           <div className="flex items-center justify-center gap-2">
// //                             <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
// //                             <p className="text-xs text-purple-400">Saving your interview...</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>

// //                   {!isCallActive ? (
// //                     <Button
// //                       onClick={handleStartCall}
// //                       disabled={callStatus === 'connecting' || isProcessing}
// //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
// //                     >
// //                       <Phone className="w-12 h-12" />
// //                     </Button>
// //                   ) : (
// //                     <Button
// //                       onClick={handleEndCall}
// //                       disabled={isProcessing}
// //                       className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
// //                     >
// //                       <PhoneOff className="w-12 h-12" />
// //                     </Button>
// //                   )}

// //                   <p className="text-xs text-muted-foreground">
// //                     {isCallActive ? 'Click to end — results generate automatically' : 'Start voice interview with AI'}
// //                   </p>
// //                 </div>

// //                 {/* Live subtitle */}
// //                 {(callStatus === 'active' || callStatus === 'ended') && (
// //                   <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
// //                     {subtitles ? (
// //                       <p className="text-center text-white text-sm font-medium">{subtitles}</p>
// //                     ) : (
// //                       <p className="text-center text-muted-foreground text-xs italic">
// //                         {callStatus === 'active' ? 'Waiting for speech...' : 'Conversation ended'}
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {conversation.length > 0 && (
// //                   <p className="text-xs text-center text-purple-400">
// //                     💬 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
// //                   </p>
// //                 )}

// //                 <div>
// //                   <label className="text-sm font-medium text-gray-300 mb-2 block">
// //                     Or type your answer (optional):
// //                   </label>
// //                   <textarea
// //                     value={typedAnswer}
// //                     onChange={(e) => setTypedAnswer(e.target.value)}
// //                     onKeyDown={(e) => {
// //                       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
// //                         e.preventDefault();
// //                         handleSubmitTypedAnswer();
// //                       }
// //                     }}
// //                     placeholder="Type your answer and click 'Submit to AI' or press Ctrl+Enter..."
// //                     className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
// //                     disabled={isProcessing}
// //                   />
// //                   {isCallActive && (
// //                     <Button
// //                       onClick={handleSubmitTypedAnswer}
// //                       disabled={!typedAnswer.trim() || isProcessing}
// //                       className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
// //                     >
// //                       <Send className="w-4 h-4" />
// //                       Submit Answer to AI
// //                     </Button>
// //                   )}
// //                   {answerSubmitted && <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI!</p>}
// //                 </div>

// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="bg-blue-500/10 border-blue-500/20">
// //             <CardContent className="pt-6">
// //               <div className="flex items-start gap-3">
// //                 <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
// //                 <div className="text-sm text-gray-300">
// //                   <strong className="text-white">How it works:</strong>
// //                   <ul className="mt-2 space-y-1 list-disc list-inside">
// //                     <li>Start the call — Claude AI conducts your <strong>{interview.interviewType}</strong> interview</li>
// //                     <li>Speak freely — the full conversation is recorded</li>
// //                     <li>End the call — saved instantly, Groq evaluates on the results page</li>
// //                     <li>Results show your skill stage and AI feedback by category</li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Image from 'next/image';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// import { evaluateAndComplete } from '@/lib/interview-results';
// import { MessageSquare, Phone, PhoneOff, Mic, Loader2, Send } from 'lucide-react';

// interface ConversationMessage {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function InterviewSessionPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { isAuthenticated, interviews, updateInterview } = useApp();

//   const [isCallActive, setIsCallActive] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [subtitles, setSubtitles] = useState('');
//   const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const isProcessingRef = useRef(false);
//   const [typedAnswer, setTypedAnswer] = useState('');
//   const [answerSubmitted, setAnswerSubmitted] = useState(false);
//   const [progressLoaded, setProgressLoaded] = useState(false);

//   const conversationRef = useRef<ConversationMessage[]>([]);
//   const [conversation, setConversation] = useState<ConversationMessage[]>([]);
//   const completeRef = useRef<() => Promise<void>>(async () => {});

//   const interview = interviews.find(i => i.id === params.id);

//   useEffect(() => {
//     if (interview && !progressLoaded) setProgressLoaded(true);
//   }, [interview, progressLoaded]);

//   useEffect(() => {
//     if (interview && interview.status === 'pending') {
//       updateInterview(interview.id, { status: 'in-progress' });
//     }
//   }, [interview]);

//   useEffect(() => {
//     conversationRef.current = conversation;
//   }, [conversation]);

//   useEffect(() => {
//     const vapi = getVapiClient();
//     if (!vapi) return;

//     const handleCallStart = () => {
//       setIsCallActive(true);
//       setCallStatus('active');
//       setAnswerSubmitted(false);
//       setConversation([]);
//       conversationRef.current = [];
//     };

//     const handleCallEnd = () => {
//       setIsCallActive(false);
//       setCallStatus('ended');
//       setIsSpeaking(false);
//       setSubtitles('');
//       // Trigger completion after short delay to catch final transcript
//       setTimeout(() => completeRef.current(), 1500);
//     };

//     const handleSpeechStart = () => setIsSpeaking(true);
//     const handleSpeechEnd = () => setIsSpeaking(false);

//     const addMessage = (role: 'user' | 'assistant', content: string) => {
//       if (!content || content.trim().length < 2) return;
//       const trimmed = content.trim();

//       // Deduplicate — skip if last message from same role has same/similar content
//       const current = conversationRef.current;
//       if (current.length > 0) {
//         const last = current[current.length - 1];
//         if (last.role === role && (
//           last.content === trimmed ||
//           last.content.includes(trimmed) ||
//           trimmed.includes(last.content)
//         )) return;
//       }

//       const msg: ConversationMessage = { role, content: trimmed };
//       conversationRef.current = [...current, msg];
//       setConversation([...conversationRef.current]);
//     };

//     const handleMessage = (message: any) => {
//       // Only handle transcript finals here — ignore conversation-update to avoid duplicates
//       if (message.type === 'transcript' && message.transcriptType === 'final') {
//         const role = message.role === 'user' ? 'user' : 'assistant';
//         const text = message.transcript || '';
//         if (text) {
//           setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
//           addMessage(role, text);
//         }
//       } else if (message.type === 'transcript' && message.transcriptType === 'partial') {
//         const role = message.role === 'user' ? 'user' : 'assistant';
//         setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${message.transcript || ''}`);
//       }
//       // Ignore conversation-update and other message types to prevent duplicates
//     };

//     const handleTranscript = (data: any) => {
//       // Only show subtitle — addMessage handled in handleMessage above
//       if (data?.transcript) {
//         const role = data.role === 'user' ? 'user' : 'assistant';
//         setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
//       }
//     };

//     const handleError = (error: any) => {
//       console.error('Vapi error:', error);
//       if (!isProcessingRef.current) {
//         setCallStatus('idle');
//         setIsCallActive(false);
//       }
//     };

//     vapi.on('call-start', handleCallStart);
//     vapi.on('call-end', handleCallEnd);
//     vapi.on('speech-start', handleSpeechStart);
//     vapi.on('speech-end', handleSpeechEnd);
//     vapi.on('message', handleMessage);
//     vapi.on('transcript', handleTranscript);
//     vapi.on('error', handleError);

//     return () => {
//       vapi.off('call-start', handleCallStart);
//       vapi.off('call-end', handleCallEnd);
//       vapi.off('speech-start', handleSpeechStart);
//       vapi.off('speech-end', handleSpeechEnd);
//       vapi.off('message', handleMessage);
//       vapi.off('transcript', handleTranscript);
//       vapi.off('error', handleError);
//     };
//   }, []);

//   if (!isAuthenticated || !interview) return null;

//   const currentQuestion = interview.questions?.[0];

//   const handleCompleteInterview = async () => {
//     if (isProcessingRef.current) return;
//     setIsProcessing(true);
//     isProcessingRef.current = true;

//     const interviewId = interview.id;
//     const fullConversation = [...conversationRef.current];
//     if (typedAnswer.trim()) {
//       fullConversation.push({ role: 'user', content: typedAnswer.trim() });
//     }

//     console.log(`🤖 Evaluating ${fullConversation.length} messages with Claude...`);

//     // Evaluate directly with Claude + save results only (no conversation stored)
//     await evaluateAndComplete(
//       interviewId,
//       fullConversation,
//       interview.interviewType,
//       interview.jobRole,
//       interview.difficulty
//     );

//     // Redirect — results are already saved
//     router.push(`/interview/${interviewId}/results`);
//   };

//   completeRef.current = handleCompleteInterview;

//   const handleStartCall = async () => {
//     try {
//       setCallStatus('connecting');
//       setSubtitles('');
//       setTypedAnswer('');
//       setAnswerSubmitted(false);
//       setConversation([]);
//       conversationRef.current = [];
//       await startInterviewCall({
//         jobRole: interview.jobRole,
//         company: interview.company,
//         interviewType: interview.interviewType,
//         difficulty: interview.difficulty,
//         currentQuestion: currentQuestion?.question || '',
//         questionCategory: currentQuestion?.category || '',
//       });
//     } catch (error) {
//       console.error('Failed to start call:', error);
//       setCallStatus('idle');
//     }
//   };

//   const handleEndCall = async () => {
//     try {
//       await stopInterviewCall();
//       setSubtitles('');
//     } catch (error) {
//       console.error('Failed to end call:', error);
//     }
//   };

//   const handleSubmitTypedAnswer = () => {
//     if (!typedAnswer.trim()) return;
//     const vapi = getVapiClient();
//     if (vapi && isCallActive) {
//       try {
//         (vapi as any).send({
//           type: 'add-message',
//           message: { role: 'user', content: typedAnswer.trim() },
//         });
//       } catch (e) {
//         console.warn('vapi.send failed:', e);
//       }
//     }
//     const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
//     setConversation(prev => [...prev, msg]);
//     conversationRef.current = [...conversationRef.current, msg];
//     setSubtitles(`You (typed): ${typedAnswer.trim()}`);
//     setAnswerSubmitted(true);
//     setTypedAnswer('');
//   };

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-3xl mx-auto">

//           <div className="mb-6 flex items-center gap-3">
//             <Image src="/robot.png" alt="AI Interviewer" width={40} height={40} className="rounded-full" />
//             <div>
//               <h1 className="text-2xl font-bold">{interview.jobRole}</h1>
//               <p className="text-sm text-muted-foreground">
//                 {interview.company || 'Interview Practice'} · {interview.interviewType} · {interview.difficulty}
//               </p>
//             </div>
//           </div>

//           <Card className="mb-6 border-purple-500/20">
//             <CardContent className="pt-6">
//               <div className="space-y-4">

//                 <div className="flex flex-col items-center justify-center py-8 space-y-4">
//                   <div className="text-center">
//                     {callStatus === 'idle' && <p className="text-sm text-muted-foreground">Click to start voice interview with AI</p>}
//                     {callStatus === 'connecting' && <p className="text-sm text-blue-400">Connecting...</p>}
//                     {callStatus === 'active' && (
//                       <div className="space-y-2">
//                         <p className="text-sm text-green-400">Call Active</p>
//                         {isSpeaking && (
//                           <div className="flex items-center justify-center gap-2">
//                             <Mic className="w-4 h-4 text-green-400 animate-pulse" />
//                             <span className="text-xs text-green-400">Listening...</span>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {callStatus === 'ended' && (
//                       <div className="space-y-1">
//                         <p className="text-sm text-gray-400">Call Ended</p>
//                         {isProcessing && (
//                           <div className="flex items-center justify-center gap-2">
//                             <div className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
//                             <p className="text-xs text-purple-400">Claude AI is evaluating your interview...</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {!isCallActive ? (
//                     <Button
//                       onClick={handleStartCall}
//                       disabled={callStatus === 'connecting' || isProcessing}
//                       className="w-32 h-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
//                     >
//                       <Phone className="w-12 h-12" />
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={handleEndCall}
//                       disabled={isProcessing}
//                       className="w-32 h-32 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
//                     >
//                       <PhoneOff className="w-12 h-12" />
//                     </Button>
//                   )}

//                   <p className="text-xs text-muted-foreground">
//                     {isCallActive ? 'Click to end — results generate automatically' : 'Start voice interview with AI'}
//                   </p>
//                 </div>

//                 {/* Live subtitle */}
//                 {(callStatus === 'active' || callStatus === 'ended') && (
//                   <div className="rounded-lg border border-purple-500/30 bg-black/40 p-4 min-h-[60px] flex items-center justify-center">
//                     {subtitles ? (
//                       <p className="text-center text-white text-sm font-medium">{subtitles}</p>
//                     ) : (
//                       <p className="text-center text-muted-foreground text-xs italic">
//                         {callStatus === 'active' ? 'Waiting for speech...' : 'Conversation ended'}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {conversation.length > 0 && (
//                   <p className="text-xs text-center text-purple-400">
//                     💬 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
//                   </p>
//                 )}

//                 <div>
//                   <label className="text-sm font-medium text-gray-300 mb-2 block">
//                     Or type your answer (optional):
//                   </label>
//                   <textarea
//                     value={typedAnswer}
//                     onChange={(e) => setTypedAnswer(e.target.value)}
//                     onKeyDown={(e) => {
//                       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
//                         e.preventDefault();
//                         handleSubmitTypedAnswer();
//                       }
//                     }}
//                     placeholder="Type your answer and click 'Submit to AI' or press Ctrl+Enter..."
//                     className="w-full min-h-[100px] p-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//                     disabled={isProcessing}
//                   />
//                   {isCallActive && (
//                     <Button
//                       onClick={handleSubmitTypedAnswer}
//                       disabled={!typedAnswer.trim() || isProcessing}
//                       className="mt-2 w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                     >
//                       <Send className="w-4 h-4" />
//                       Submit Answer to AI
//                     </Button>
//                   )}
//                   {answerSubmitted && <p className="text-xs text-green-400 mt-1">✅ Answer sent to AI!</p>}
//                 </div>

//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-blue-500/10 border-blue-500/20">
//             <CardContent className="pt-6">
//               <div className="flex items-start gap-3">
//                 <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//                 <div className="text-sm text-gray-300">
//                   <strong className="text-white">How it works:</strong>
//                   <ul className="mt-2 space-y-1 list-disc list-inside">
//                     <li>Start the call — Claude AI conducts your <strong>{interview.interviewType}</strong> interview</li>
//                     <li>Speak freely — the full conversation is recorded</li>
//                     <li>End the call — saved instantly, Groq evaluates on the results page</li>
//                     <li>Results show your skill stage and AI feedback by category</li>
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//         </div>
//       </div>
//     </div>
//   );
// }








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

    const addMessage = (role: 'user' | 'assistant', content: string) => {
      if (!content || content.trim().length < 2) return;
      const trimmed = content.trim();
      const current = conversationRef.current;
      if (current.length > 0) {
        const last = current[current.length - 1];
        if (last.role === role && (
          last.content === trimmed ||
          last.content.includes(trimmed) ||
          trimmed.includes(last.content)
        )) return;
      }
      const msg: ConversationMessage = { role, content: trimmed };
      conversationRef.current = [...current, msg];
      setConversation([...conversationRef.current]);
    };

    const handleMessage = (message: any) => {
      if (message.type === 'transcript') {
        const role = message.role === 'user' ? 'user' : 'assistant';
        const text = message.transcript || '';
        if (!text) return;

        // Check farewell on EVERY user transcript — partial or final
        if (role === 'user' && isFarewell(text)) {
          triggerFarewell();
          return;
        }

        if (message.transcriptType === 'final') {
          setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
          addMessage(role, text);
        } else if (message.transcriptType === 'partial') {
          setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
        }
      }
    };

    const handleTranscript = (data: any) => {
      if (!data?.transcript) return;
      const role = data.role === 'user' ? 'user' : 'assistant';
      const text = data.transcript;

      // Also check farewell on transcript event (Vapi fires both)
      if (role === 'user' && isFarewell(text)) {
        triggerFarewell();
        return;
      }
      setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
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