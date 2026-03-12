// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Image from 'next/image';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
// import { evaluateAndComplete } from '@/lib/interview-results';
// import {
//   Phone, PhoneOff, Mic, Send, SkipForward,
//   Loader2, Zap, Brain, MessageSquare, Info,
//   Briefcase, BarChart2, Layers
// } from 'lucide-react';

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
//   const interviewRef = useRef<any>(null);
//   const seenMessagesRef = useRef<Set<string>>(new Set());

//   const interview = interviews.find(i => i.id === params.id);

//   useEffect(() => { if (interview) interviewRef.current = interview; }, [interview]);
//   useEffect(() => { if (interview && !progressLoaded) setProgressLoaded(true); }, [interview, progressLoaded]);
//   useEffect(() => {
//     if (interview && interview.status === 'pending') {
//       updateInterview(interview.id, { status: 'in-progress' });
//     }
//   }, [interview]);
//   useEffect(() => { conversationRef.current = conversation; }, [conversation]);

//   const isCallActiveRef2 = useRef(false);
//   const callStatusRef = useRef<string>('idle');
//   useEffect(() => { isCallActiveRef2.current = isCallActive; }, [isCallActive]);
//   useEffect(() => { callStatusRef.current = callStatus; }, [callStatus]);

//   useEffect(() => {
//     window.history.pushState(null, '', window.location.href);
//     const handlePopState = async () => {
//       const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
//       if (callActive) {
//         window.history.pushState(null, '', window.location.href);
//         setSubtitles('Ending interview...');
//         setIsCallActive(false);
//         setCallStatus('ended');
//         try { await stopInterviewCall(); } catch (e) {}
//         setTimeout(() => completeRef.current(), 800);
//       } else { router.back(); }
//     };
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
//       if (callActive) { e.preventDefault(); e.returnValue = 'Your interview is in progress.'; }
//     };
//     window.addEventListener('popstate', handlePopState);
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   useEffect(() => {
//     const vapi = getVapiClient();
//     if (!vapi) return;
//     const farewellTriggeredRef = { current: false };
//     const FAREWELL_WORDS = ['goodbye','good bye','bye bye','bye','see you','see ya','have a good day','have a great day','take care',"that's all","i'm done",'i am done','end the call','end call','finish the interview','finish interview','thank you goodbye','thanks goodbye'];
//     const isFarewell = (text: string) => { const lower = text.toLowerCase().trim(); return FAREWELL_WORDS.some(word => lower.includes(word)); };
//     const triggerFarewell = async () => {
//       if (farewellTriggeredRef.current) return;
//       farewellTriggeredRef.current = true;
//       setSubtitles('👋 Goodbye! Ending call...');
//       setIsCallActive(false);
//       await new Promise(r => setTimeout(r, 1500));
//       try { await stopInterviewCall(); } catch (e) { setCallStatus('ended'); setSubtitles(''); setTimeout(() => completeRef.current(), 500); }
//     };
//     const addMessage = (role: 'user' | 'assistant', content: string) => {
//       if (!content || content.trim().length < 3) return;
//       const trimmed = content.trim();
//       const hash = `${role}:${trimmed.toLowerCase().replace(/\s+/g, ' ').substring(0, 80)}`;
//       if (seenMessagesRef.current.has(hash)) return;
//       seenMessagesRef.current.add(hash);
//       conversationRef.current = [...conversationRef.current, { role, content: trimmed }];
//       setConversation([...conversationRef.current]);
//     };
//     const handleCallStart = () => { setIsCallActive(true); setCallStatus('active'); setAnswerSubmitted(false); setConversation([]); conversationRef.current = []; seenMessagesRef.current.clear(); farewellTriggeredRef.current = false; };
//     const handleCallEnd = () => { setIsCallActive(false); setCallStatus('ended'); setIsSpeaking(false); setSubtitles(''); setTimeout(() => completeRef.current(), 1500); };
//     const handleSpeechStart = () => setIsSpeaking(true);
//     const handleSpeechEnd = () => setIsSpeaking(false);
//     const handleMessage = (message: any) => {
//       if (message.type === 'conversation-update' && message.conversation) {
//         const latest = message.conversation[message.conversation.length - 1];
//         if (!latest?.content) return;
//         const role = latest.role === 'user' ? 'user' : 'assistant';
//         if (role === 'user' && isFarewell(latest.content)) { triggerFarewell(); return; }
//         addMessage(role, latest.content); return;
//       }
//       if (message.type === 'transcript') {
//         const role = message.role === 'user' ? 'user' : 'assistant';
//         const text = message.transcript || '';
//         if (!text) return;
//         if (role === 'user' && isFarewell(text)) { triggerFarewell(); return; }
//         setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
//       }
//     };
//     const handleTranscript = (data: any) => {
//       if (!data?.transcript) return;
//       const role = data.role === 'user' ? 'user' : 'assistant';
//       if (role === 'user' && isFarewell(data.transcript)) { triggerFarewell(); return; }
//       setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
//     };
//     const handleError = (error: any) => { console.error('Vapi error:', error); if (!isProcessingRef.current) { setCallStatus('idle'); setIsCallActive(false); } };
//     vapi.on('call-start', handleCallStart); vapi.on('call-end', handleCallEnd);
//     vapi.on('speech-start', handleSpeechStart); vapi.on('speech-end', handleSpeechEnd);
//     vapi.on('message', handleMessage); vapi.on('transcript', handleTranscript); vapi.on('error', handleError);
//     return () => {
//       vapi.off('call-start', handleCallStart); vapi.off('call-end', handleCallEnd);
//       vapi.off('speech-start', handleSpeechStart); vapi.off('speech-end', handleSpeechEnd);
//       vapi.off('message', handleMessage); vapi.off('transcript', handleTranscript); vapi.off('error', handleError);
//     };
//   }, []);

//   if (!isAuthenticated || !interview) return null;

//   const currentQuestion = interview.questions?.[0];

//   const handleCompleteInterview = async () => {
//     if (isProcessingRef.current) return;
//     setIsProcessing(true); isProcessingRef.current = true;
//     const currentInterview = interviewRef.current;
//     if (!currentInterview) { router.push('/dashboard'); return; }
//     const interviewId = currentInterview.id;
//     const fullConversation = [...conversationRef.current];
//     if (typedAnswer.trim()) fullConversation.push({ role: 'user', content: typedAnswer.trim() });
//     try { await evaluateAndComplete(interviewId, fullConversation, currentInterview.interviewType, currentInterview.jobRole, currentInterview.difficulty); } catch (e) { console.error('evaluateAndComplete failed:', e); }
//     router.push(`/interview/${interviewId}/results`);
//   };
//   completeRef.current = handleCompleteInterview;

//   const handleStartCall = async () => {
//     try {
//       setCallStatus('connecting'); setSubtitles(''); setTypedAnswer(''); setAnswerSubmitted(false); setConversation([]); conversationRef.current = [];
//       await startInterviewCall({ jobRole: interview.jobRole, company: interview.company, interviewType: interview.interviewType, difficulty: interview.difficulty, currentQuestion: currentQuestion?.question || '', questionCategory: currentQuestion?.category || '', questions: interview.questions || [], questionCount: (interview as any).numberOfQuestions || interview.questions?.length || 3 });
//     } catch (error) { console.error('Failed to start call:', error); setCallStatus('idle'); }
//   };

//   const handleEndCall = async () => {
//     try { await stopInterviewCall(); setSubtitles(''); } catch (error) { console.error('Failed to end call:', error); }
//   };

//   const handleSkipQuestion = () => {
//     const vapi = getVapiClient();
//     const skipMsg: ConversationMessage = { role: 'user', content: 'skip' };
//     conversationRef.current = [...conversationRef.current, skipMsg];
//     setConversation(prev => [...prev, skipMsg]);
//     if (vapi && isCallActive) {
//       try { (vapi as any).send({ type: 'add-message', message: { role: 'user', content: 'Please skip this question and move to the next one.' } }); } catch (e) {}
//     }
//     setSubtitles('Skipped — moving to next question...');
//   };

//   const handleSubmitTypedAnswer = () => {
//     if (!typedAnswer.trim()) return;
//     const vapi = getVapiClient();
//     if (vapi && isCallActive) {
//       try { (vapi as any).send({ type: 'add-message', message: { role: 'user', content: typedAnswer.trim() } }); } catch (e) {}
//     }
//     const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
//     setConversation(prev => [...prev, msg]);
//     conversationRef.current = [...conversationRef.current, msg];
//     setSubtitles(`You (typed): ${typedAnswer.trim()}`);
//     setAnswerSubmitted(true); setTypedAnswer('');
//   };

//   const typeColor = interview.interviewType === 'technical' ? 'text-blue-400' : interview.interviewType === 'behavioral' ? 'text-emerald-400' : 'text-purple-400';
//   const diffColor = interview.difficulty === 'easy' ? 'text-emerald-400' : interview.difficulty === 'hard' ? 'text-red-400' : 'text-amber-400';

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar onNavigate={async (href, action) => {
//         const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
//         if (callActive) {
//           setSubtitles('Ending interview...'); setIsCallActive(false); setCallStatus('ended');
//           try { await stopInterviewCall(); } catch (e) {}
//           setTimeout(async () => { await completeRef.current(); if (action) await action(); }, 800);
//         } else { if (action) await action(); else router.push(href); }
//       }} />

//       {/* Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="dashboard-orb orb-1" /><div className="dashboard-orb orb-2" />
//       </div>
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.008]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

//       <div className="relative z-10 container mx-auto px-4 py-10 max-w-2xl">

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
//               <Brain className="w-6 h-6 text-white" />
//             </div>
//             {isCallActive && (
//               <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#080614] animate-pulse" />
//             )}
//           </div>
//           <div>
//             <h1 className="text-2xl font-black text-white">{interview.jobRole}</h1>
//             <div className="flex items-center gap-2 text-xs mt-0.5">
//               <span className="text-white/40">{interview.company || 'Interview Practice'}</span>
//               <span className="text-white/20">·</span>
//               <span className={`capitalize font-medium ${typeColor}`}>{interview.interviewType}</span>
//               <span className="text-white/20">·</span>
//               <span className={`capitalize font-medium ${diffColor}`}>{interview.difficulty}</span>
//             </div>
//           </div>
//         </div>

//         {/* Main call card */}
//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.07] backdrop-blur-sm p-8 mb-5">

//           {/* Status */}
//           <div className="text-center mb-8">
//             {callStatus === 'idle' && (
//               <p className="text-white/40 text-sm">Click the button below to start your AI voice interview</p>
//             )}
//             {callStatus === 'connecting' && (
//               <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
//                 <Loader2 className="w-4 h-4 animate-spin" /> Connecting to AI Interviewer…
//               </div>
//             )}
//             {callStatus === 'active' && (
//               <div className="space-y-1">
//                 <div className="flex items-center justify-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//                   <span className="text-green-400 text-sm font-medium">Interview in Progress</span>
//                 </div>
//                 {isSpeaking && (
//                   <div className="flex items-center justify-center gap-1.5 text-xs text-green-400/70">
//                     <Mic className="w-3 h-3" /> Listening…
//                   </div>
//                 )}
//               </div>
//             )}
//             {callStatus === 'ended' && (
//               <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
//                 {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {isProcessing ? 'AI is evaluating your interview…' : 'Interview ended'}
//               </div>
//             )}
//           </div>

//           {/* Call button */}
//           <div className="flex flex-col items-center gap-4">
//             {/* Rings animation when active */}
//             <div className="relative flex items-center justify-center">
//               {isCallActive && (
//                 <>
//                   <div className="absolute w-44 h-44 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
//                   <div className="absolute w-36 h-36 rounded-full border border-green-500/10 animate-ping" style={{ animationDuration: '2.5s' }} />
//                 </>
//               )}
//               {callStatus === 'connecting' && (
//                 <div className="absolute w-44 h-44 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '1.5s' }} />
//               )}

//               {!isCallActive ? (
//                 <button
//                   onClick={handleStartCall}
//                   disabled={callStatus === 'connecting' || isProcessing}
//                   className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
//                 >
//                   <Phone className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleEndCall}
//                   disabled={isProcessing}
//                   className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 flex items-center justify-center group"
//                 >
//                   <PhoneOff className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
//                 </button>
//               )}
//             </div>

//             <p className="text-xs text-white/30">
//               {isCallActive ? 'Click to end — results generate automatically' : callStatus === 'connecting' ? 'Please wait…' : 'Start voice interview'}
//             </p>

//             {isCallActive && (
//               <button
//                 onClick={handleSkipQuestion}
//                 className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
//               >
//                 <SkipForward className="w-3.5 h-3.5" /> Skip this question
//               </button>
//             )}
//           </div>

//           {/* Subtitles */}
//           {(callStatus === 'active' || callStatus === 'ended') && (
//             <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.07] px-5 py-4 min-h-[56px] flex items-center justify-center">
//               {subtitles ? (
//                 <p className="text-center text-white/80 text-sm leading-relaxed">{subtitles}</p>
//               ) : (
//                 <p className="text-center text-white/20 text-xs italic">
//                   {callStatus === 'active' ? 'Waiting for speech…' : 'Conversation ended'}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Message counter */}
//           {conversation.length > 0 && (
//             <div className="mt-3 flex justify-center">
//               <span className="flex items-center gap-1.5 text-xs text-purple-400/70 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
//                 <MessageSquare className="w-3 h-3" />
//                 {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Typed answer card */}
//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.07] backdrop-blur-sm p-6 mb-5">
//           <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
//             <Send className="w-3.5 h-3.5 text-purple-400" /> Type your answer (optional)
//           </label>
//           <textarea
//             value={typedAnswer}
//             onChange={e => setTypedAnswer(e.target.value)}
//             onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); handleSubmitTypedAnswer(); } }}
//             placeholder="Type your answer here… Press Ctrl+Enter to submit"
//             rows={4}
//             disabled={isProcessing}
//             className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none disabled:opacity-50"
//           />
//           {isCallActive && (
//             <button
//               onClick={handleSubmitTypedAnswer}
//               disabled={!typedAnswer.trim() || isProcessing}
//               className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <Send className="w-4 h-4" /> Submit Answer to AI
//             </button>
//           )}
//           {answerSubmitted && (
//             <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Answer sent to AI!
//             </p>
//           )}
//         </div>

//         {/* How it works */}
//         <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <Info className="w-4 h-4 text-blue-400" />
//             <h3 className="text-sm font-semibold text-blue-300">How It Works</h3>
//           </div>
//           <ul className="space-y-2.5">
//             {[
//               { icon: Phone, text: <>Start the call — AI conducts your <strong className="text-white/70 capitalize">{interview.interviewType}</strong> interview</> },
//               { icon: Mic, text: 'Speak freely — the full conversation is recorded' },
//               { icon: PhoneOff, text: 'End the call — saved instantly, AI evaluates on the results page' },
//               { icon: BarChart2, text: 'Results show your skill stage and AI feedback by category' },
//             ].map(({ icon: Icon, text }, i) => (
//               <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
//                 <Icon className="w-3.5 h-3.5 text-blue-400/60 flex-shrink-0 mt-0.5" />
//                 <span>{text}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// }





'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import { getVapiClient, startInterviewCall, stopInterviewCall } from '@/lib/vapi';
import { evaluateAndComplete } from '@/lib/interview-results';
import {
  Phone, PhoneOff, Mic, Send, SkipForward,
  Loader2, Zap, Brain, MessageSquare, Info,
  Briefcase, BarChart2, Layers
} from 'lucide-react';

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
  const seenMessagesRef = useRef<Set<string>>(new Set());

  const interview = interviews.find(i => i.id === params.id);

  useEffect(() => { if (interview) interviewRef.current = interview; }, [interview]);
  useEffect(() => { if (interview && !progressLoaded) setProgressLoaded(true); }, [interview, progressLoaded]);
  useEffect(() => {
    if (interview && interview.status === 'pending') {
      updateInterview(interview.id, { status: 'in-progress' });
    }
  }, [interview]);
  useEffect(() => { conversationRef.current = conversation; }, [conversation]);

  const isCallActiveRef2 = useRef(false);
  const callStatusRef = useRef<string>('idle');
  useEffect(() => { isCallActiveRef2.current = isCallActive; }, [isCallActive]);
  useEffect(() => { callStatusRef.current = callStatus; }, [callStatus]);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = async () => {
      const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
      if (callActive) {
        window.history.pushState(null, '', window.location.href);
        setSubtitles('Ending interview...');
        setIsCallActive(false);
        setCallStatus('ended');
        try { await stopInterviewCall(); } catch (e) {}
        setTimeout(() => completeRef.current(), 800);
      } else { router.back(); }
    };
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
      if (callActive) { e.preventDefault(); e.returnValue = 'Your interview is in progress.'; }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const vapi = getVapiClient();
    if (!vapi) return;
    const farewellTriggeredRef = { current: false };
    const FAREWELL_WORDS = ['goodbye','good bye','bye bye','bye','see you','see ya','have a good day','have a great day','take care',"that's all","i'm done",'i am done','end the call','end call','finish the interview','finish interview','thank you goodbye','thanks goodbye'];
    const isFarewell = (text: string) => { const lower = text.toLowerCase().trim(); return FAREWELL_WORDS.some(word => lower.includes(word)); };
    const triggerFarewell = async () => {
      if (farewellTriggeredRef.current) return;
      farewellTriggeredRef.current = true;
      setSubtitles('👋 Goodbye! Ending call...');
      setIsCallActive(false);
      await new Promise(r => setTimeout(r, 1500));
      try { await stopInterviewCall(); } catch (e) { setCallStatus('ended'); setSubtitles(''); setTimeout(() => completeRef.current(), 500); }
    };
    const addMessage = (role: 'user' | 'assistant', content: string) => {
      if (!content || content.trim().length < 3) return;
      const trimmed = content.trim();
      const hash = `${role}:${trimmed.toLowerCase().replace(/\s+/g, ' ').substring(0, 80)}`;
      if (seenMessagesRef.current.has(hash)) return;
      seenMessagesRef.current.add(hash);
      conversationRef.current = [...conversationRef.current, { role, content: trimmed }];
      setConversation([...conversationRef.current]);
    };
    const handleCallStart = () => { setIsCallActive(true); setCallStatus('active'); setAnswerSubmitted(false); setConversation([]); conversationRef.current = []; seenMessagesRef.current.clear(); farewellTriggeredRef.current = false; };
    const handleCallEnd = () => { setIsCallActive(false); setCallStatus('ended'); setIsSpeaking(false); setSubtitles(''); setTimeout(() => completeRef.current(), 1500); };
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleMessage = (message: any) => {
      if (message.type === 'conversation-update' && message.conversation) {
        const latest = message.conversation[message.conversation.length - 1];
        if (!latest?.content) return;
        const role = latest.role === 'user' ? 'user' : 'assistant';
        if (role === 'user' && isFarewell(latest.content)) { triggerFarewell(); return; }
        addMessage(role, latest.content); return;
      }
      if (message.type === 'transcript') {
        const role = message.role === 'user' ? 'user' : 'assistant';
        const text = message.transcript || '';
        if (!text) return;
        if (role === 'user' && isFarewell(text)) { triggerFarewell(); return; }
        setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${text}`);
      }
    };
    const handleTranscript = (data: any) => {
      if (!data?.transcript) return;
      const role = data.role === 'user' ? 'user' : 'assistant';
      if (role === 'user' && isFarewell(data.transcript)) { triggerFarewell(); return; }
      setSubtitles(`${role === 'user' ? 'You' : 'AI'}: ${data.transcript}`);
    };
    const handleError = (error: any) => { console.error('Vapi error:', error); if (!isProcessingRef.current) { setCallStatus('idle'); setIsCallActive(false); } };
    vapi.on('call-start', handleCallStart); vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart); vapi.on('speech-end', handleSpeechEnd);
    vapi.on('message', handleMessage); vapi.on('transcript', handleTranscript); vapi.on('error', handleError);
    return () => {
      vapi.off('call-start', handleCallStart); vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart); vapi.off('speech-end', handleSpeechEnd);
      vapi.off('message', handleMessage); vapi.off('transcript', handleTranscript); vapi.off('error', handleError);
    };
  }, []);

  if (!isAuthenticated || !interview) return null;

  const currentQuestion = interview.questions?.[0];

  const handleCompleteInterview = async () => {
    if (isProcessingRef.current) return;
    setIsProcessing(true); isProcessingRef.current = true;
    const currentInterview = interviewRef.current;
    if (!currentInterview) { router.push('/dashboard'); return; }
    const interviewId = currentInterview.id;
    const fullConversation = [...conversationRef.current];
    if (typedAnswer.trim()) fullConversation.push({ role: 'user', content: typedAnswer.trim() });
    try { await evaluateAndComplete(interviewId, fullConversation, currentInterview.interviewType, currentInterview.jobRole, currentInterview.difficulty); } catch (e) { console.error('evaluateAndComplete failed:', e); }
    router.push(`/interview/${interviewId}/results`);
  };
  completeRef.current = handleCompleteInterview;

  const handleStartCall = async () => {
    try {
      setCallStatus('connecting'); setSubtitles(''); setTypedAnswer(''); setAnswerSubmitted(false); setConversation([]); conversationRef.current = [];
      await startInterviewCall({ jobRole: interview.jobRole, company: interview.company, interviewType: interview.interviewType, difficulty: interview.difficulty, currentQuestion: currentQuestion?.question || '', questionCategory: currentQuestion?.category || '', questions: interview.questions || [], questionCount: (interview as any).numberOfQuestions || interview.questions?.length || 3 });
    } catch (error) { console.error('Failed to start call:', error); setCallStatus('idle'); }
  };

  const handleEndCall = async () => {
    try { await stopInterviewCall(); setSubtitles(''); } catch (error) { console.error('Failed to end call:', error); }
  };

  const handleSkipQuestion = () => {
    const vapi = getVapiClient();
    const skipMsg: ConversationMessage = { role: 'user', content: 'skip' };
    conversationRef.current = [...conversationRef.current, skipMsg];
    setConversation(prev => [...prev, skipMsg]);
    if (vapi && isCallActive) {
      try { (vapi as any).send({ type: 'add-message', message: { role: 'user', content: 'Please skip this question and move to the next one.' } }); } catch (e) {}
    }
    setSubtitles('Skipped — moving to next question...');
  };

  const handleSubmitTypedAnswer = () => {
    if (!typedAnswer.trim()) return;
    const vapi = getVapiClient();
    if (vapi && isCallActive) {
      try { (vapi as any).send({ type: 'add-message', message: { role: 'user', content: typedAnswer.trim() } }); } catch (e) {}
    }
    const msg: ConversationMessage = { role: 'user', content: typedAnswer.trim() };
    setConversation(prev => [...prev, msg]);
    conversationRef.current = [...conversationRef.current, msg];
    setSubtitles(`You (typed): ${typedAnswer.trim()}`);
    setAnswerSubmitted(true); setTypedAnswer('');
  };

  const typeColor = interview.interviewType === 'technical' ? 'text-blue-400' : interview.interviewType === 'behavioral' ? 'text-emerald-400' : 'text-purple-400';
  const diffColor = interview.difficulty === 'easy' ? 'text-emerald-400' : interview.difficulty === 'hard' ? 'text-red-400' : 'text-amber-400';

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar onNavigate={async (href, action) => {
        const callActive = isCallActiveRef2.current || callStatusRef.current === 'connecting' || callStatusRef.current === 'active';
        if (callActive) {
          setSubtitles('Ending interview...'); setIsCallActive(false); setCallStatus('ended');
          try { await stopInterviewCall(); } catch (e) {}
          setTimeout(async () => { await completeRef.current(); if (action) await action(); }, 800);
        } else { if (action) await action(); else router.push(href); }
      }} />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="dashboard-orb orb-1" /><div className="dashboard-orb orb-2" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.008]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-10 max-w-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {isCallActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#080614] animate-pulse" />
            )}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{interview.jobRole}</h1>
            <div className="flex items-center gap-2 text-xs mt-0.5">
              <span className="text-white/40">{interview.company || 'Interview Practice'}</span>
              <span className="text-white/20">·</span>
              <span className={`capitalize font-medium ${typeColor}`}>{interview.interviewType}</span>
              <span className="text-white/20">·</span>
              <span className={`capitalize font-medium ${diffColor}`}>{interview.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Main call card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.07] backdrop-blur-sm p-8 mb-5">

          {/* Status */}
          <div className="text-center mb-8">
            {callStatus === 'idle' && (
              <p className="text-white/40 text-sm">Click the button below to start your AI voice interview</p>
            )}
            {callStatus === 'connecting' && (
              <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Connecting to AI Interviewer…
              </div>
            )}
            {callStatus === 'active' && (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Interview in Progress</span>
                </div>
                {isSpeaking && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-green-400/70">
                    <Mic className="w-3 h-3" /> Listening…
                  </div>
                )}
              </div>
            )}
            {callStatus === 'ended' && (
              <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                {isProcessing ? 'AI is evaluating your interview…' : 'Interview ended'}
              </div>
            )}
          </div>

          {/* Call button */}
          <div className="flex flex-col items-center gap-4">
            {/* Rings animation when active */}
            <div className="relative flex items-center justify-center">
              {isCallActive && (
                <>
                  <div className="absolute w-44 h-44 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-36 h-36 rounded-full border border-green-500/10 animate-ping" style={{ animationDuration: '2.5s' }} />
                </>
              )}
              {callStatus === 'connecting' && (
                <div className="absolute w-44 h-44 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '1.5s' }} />
              )}

              {!isCallActive ? (
                <button
                  onClick={handleStartCall}
                  disabled={callStatus === 'connecting' || isProcessing}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
                >
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleEndCall}
                  disabled={isProcessing}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 flex items-center justify-center group"
                >
                  <PhoneOff className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>

            <p className="text-xs text-white/30">
              {isCallActive ? 'Click to end — results generate automatically' : callStatus === 'connecting' ? 'Please wait…' : 'Start voice interview'}
            </p>

            {isCallActive && (
              <button
                onClick={handleSkipQuestion}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" /> Skip this question
              </button>
            )}
          </div>

          {/* Subtitles */}
          {(callStatus === 'active' || callStatus === 'ended') && (
            <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.07] px-5 py-4 min-h-[56px] flex items-center justify-center">
              {subtitles ? (
                <p className="text-center text-white/80 text-sm leading-relaxed">{subtitles}</p>
              ) : (
                <p className="text-center text-white/20 text-xs italic">
                  {callStatus === 'active' ? 'Waiting for speech…' : 'Conversation ended'}
                </p>
              )}
            </div>
          )}

          {/* Message counter */}
          {conversation.length > 0 && (
            <div className="mt-3 flex justify-center">
              <span className="flex items-center gap-1.5 text-xs text-purple-400/70 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                <MessageSquare className="w-3 h-3" />
                {conversation.length} message{conversation.length !== 1 ? 's' : ''} recorded
              </span>
            </div>
          )}
        </div>

        {/* Typed answer card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.07] backdrop-blur-sm p-6 mb-5">
          <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-purple-400" /> Type your answer (optional)
          </label>
          <textarea
            value={typedAnswer}
            onChange={e => setTypedAnswer(e.target.value)}
            onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); handleSubmitTypedAnswer(); } }}
            placeholder="Type your answer here… Press Ctrl+Enter to submit"
            rows={4}
            disabled={isProcessing}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none disabled:opacity-50"
          />
          {isCallActive && (
            <button
              onClick={handleSubmitTypedAnswer}
              disabled={!typedAnswer.trim() || isProcessing}
              className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" /> Submit Answer to AI
            </button>
          )}
          {answerSubmitted && (
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Answer sent to AI!
            </p>
          )}
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-blue-300">How It Works</h3>
          </div>
          <ul className="space-y-2.5">
            {[
              { icon: Phone, text: <>Start the call — AI conducts your <strong className="text-white/70 capitalize">{interview.interviewType}</strong> interview</> },
              { icon: Mic, text: 'Speak freely — the full conversation is recorded' },
              { icon: PhoneOff, text: 'End the call — saved instantly, AI evaluates on the results page' },
              { icon: BarChart2, text: 'Results show your skill stage and AI feedback by category' },
            ].map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/40">
                <Icon className="w-3.5 h-3.5 text-blue-400/60 flex-shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}