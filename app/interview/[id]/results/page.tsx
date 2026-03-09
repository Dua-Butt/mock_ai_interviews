// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, useParams } from 'next/navigation';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Navbar } from '@/components/dashboard/navbar';
// // import { useApp } from '@/lib/context-supabase';
// // import { getInterviewResults } from '@/lib/interview-results';
// // import { InterviewResult } from '@/types';
// // import {
// //   Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
// //   AlertCircle, Loader2, Target, Award, Star, Zap,
// //   Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
// // } from 'lucide-react';

// // function getSkillStage(score: number | null) {
// //   if (!score || score === 0) return {
// //     stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
// //     bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
// //     icon: Target, tagline: 'No score available.', description: '',
// //   };
// //   if (score >= 85) return {
// //     stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
// //     bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
// //     icon: Trophy, tagline: 'You are interview-ready at an expert level.',
// //     description: 'Exceptional performance. You demonstrate mastery with depth, clarity and confidence.',
// //   };
// //   if (score >= 60) return {
// //     stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
// //     bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
// //     icon: Award, tagline: 'Strong candidate — minor polish needed.',
// //     description: 'Strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
// //   };
// //   if (score >= 50) return {
// //     stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
// //     bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
// //     icon: Zap, tagline: 'Solid foundation — keep building.',
// //     description: 'Clear grasp of core concepts with reasonable communication. Focused practice will elevate you significantly.',
// //   };
// //   if (score >= 15) return {
// //     stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
// //     bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
// //     icon: Star, tagline: 'On the right path — needs more depth.',
// //     description: 'Awareness of topics but answers need more structure, specifics, and confidence.',
// //   };
// //   return {
// //     stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
// //     bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
// //     icon: Brain, tagline: 'Early stage — great time to build habits.',
// //     description: 'Focus on learning frameworks, practicing out loud, and studying real examples.',
// //   };
// // }

// // function getCategoryIcon(name: string) {
// //   const n = name.toLowerCase();
// //   if (n.includes('technical') || n.includes('problem')) return Code;
// //   if (n.includes('behavioral') || n.includes('communication')) return Users;
// //   if (n.includes('star')) return MessageSquare;
// //   return Brain;
// // }

// // function StageBar({ level }: { level: number }) {
// //   const stages = ['Beginner', 'Developing', 'Proficient', 'Advanced', 'Expert'];
// //   return (
// //     <div className="flex items-center gap-1 mt-4">
// //       {stages.map((s, i) => (
// //         <div key={s} className="flex-1 flex flex-col items-center gap-1">
// //           <div className={`h-2 w-full rounded-full transition-all duration-500 ${i < level ? 'bg-purple-500' : 'bg-white/10'}`} />
// //           <span className={`text-[10px] ${i < level ? 'text-purple-400' : 'text-gray-600'}`}>{s}</span>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function SegmentMeter({ score, stage }: { score: number | null; stage: ReturnType<typeof getSkillStage> }) {
// //   const total = 12;
// //   const filled = score ? Math.round((score / 100) * total) : 0;
// //   const segColor = (i: number) => {
// //     if (i >= filled) return 'bg-white/5';
// //     if (filled <= 4) return 'bg-red-500';
// //     if (filled <= 6) return 'bg-orange-400';
// //     if (filled <= 9) return 'bg-green-400';
// //     return 'bg-yellow-400';
// //   };
// //   return (
// //     <div className="flex flex-col items-center gap-3 py-2">
// //       <div className="flex items-end gap-1.5 h-16">
// //         {Array.from({ length: total }).map((_, i) => (
// //           <div key={i}
// //             className={`w-5 rounded-sm transition-all duration-500 ${segColor(i)}`}
// //             style={{ height: `${16 + (i / (total - 1)) * 44}px`, transitionDelay: `${i * 60}ms`, opacity: i < filled ? 1 : 0.15 }}
// //           />
// //         ))}
// //       </div>
// //       <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>{stage.stage}</p>
// //     </div>
// //   );
// // }

// // export default function InterviewResultsPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { isAuthenticated, isLoading } = useApp();
// //   const [results, setResults] = useState<InterviewResult | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!isLoading && !isAuthenticated) { router.push('/auth/login'); return; }
// //     if (!isLoading && isAuthenticated) loadResults();
// //   }, [isAuthenticated, isLoading]);

// //   const loadResults = async () => {
// //     try {
// //       // Poll until status = completed (max 10 tries, 2s apart)
// //       // This handles the case where we redirect before DB write finishes
// //       let data = null;
// //       for (let attempt = 0; attempt < 10; attempt++) {
// //         data = await getInterviewResults(params.id as string);
// //         const status = (data?.interview as any)?.status;
// //         if (status === 'completed') break;
// //         console.log(`⏳ Waiting for results... attempt ${attempt + 1}, status: ${status}`);
// //         await new Promise(r => setTimeout(r, 2000));
// //       }
// //       setResults(data);
// //     } catch (e) {
// //       console.error('Error loading results:', e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (isLoading || loading) return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center space-y-4">
// //           <div className="relative w-20 h-20 mx-auto">
// //             <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
// //             <Brain className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" />
// //           </div>
// //           <p className="text-white font-semibold">Generating your results...</p>
// //           <p className="text-muted-foreground text-sm">Claude AI is evaluating your interview</p>
// //           <div className="flex justify-center gap-1">
// //             {[0,1,2].map(i => (
// //               <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
// //                 style={{ animationDelay: `${i * 0.15}s` }} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (!isAuthenticated) return null;

// //   if (!results) return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />
// //       <div className="container mx-auto px-4 py-8">
// //         <Card className="max-w-2xl mx-auto">
// //           <CardContent className="pt-8 pb-8 text-center space-y-4">
// //             <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
// //             <h2 className="text-2xl font-bold">Results Not Available</h2>
// //             <p className="text-muted-foreground">This interview hasn't been completed yet.</p>
// //             <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );

// //   const { interview: iv } = results;
// //   const stage = getSkillStage(iv.score);
// //   const StageIcon = stage.icon;
// //   const cats: any[] = (iv as any).category_results || [];
// //   const hiringRec: string = (iv as any).hiring_recommendation || '';
// //   const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
// //     : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
// //     : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
// //     : 'text-red-400 bg-red-500/10 border-red-500/30';

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />
// //       <div className="container mx-auto px-4 py-10">
// //         <div className="max-w-3xl mx-auto space-y-6">

// //           {/* HERO */}
// //           <Card className={`${stage.bg} ${stage.border} border-2`}>
// //             <CardContent className="pt-10 pb-8 text-center space-y-4">
// //               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
// //                 <StageIcon className="w-4 h-4" />{stage.stage} Level
// //               </div>
// //               <div className="text-5xl">{stage.emoji}</div>
// //               <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
// //               {stage.description && <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>}
// //               <SegmentMeter score={iv.score} stage={stage} />
// //               <StageBar level={stage.level} />
// //               <p className="text-sm text-muted-foreground pt-2">
// //                 {iv.jobRole}{(iv as any).company ? ` · ${(iv as any).company}` : ''} · {(iv as any).interviewType} · {(iv as any).difficulty}
// //               </p>
// //               {hiringRec && (
// //                 <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
// //                   <BadgeCheck className="w-4 h-4" />Hiring Recommendation: {hiringRec}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* AI ANALYSIS */}
// //           {(iv as any).overall_feedback && (
// //             <Card className="border-purple-500/20">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 text-purple-300">
// //                   <Brain className="w-5 h-5" />Claude AI Interview Analysis
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-5">
// //                 <p className="text-foreground leading-relaxed text-[15px]">{(iv as any).overall_feedback}</p>
// //                 {(iv as any).improvements?.length > 0 && (
// //                   <div className="border-t border-white/5 pt-4">
// //                     <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
// //                       <TrendingUp className="w-4 h-4" />Areas That Need Improvement
// //                     </p>
// //                     <ul className="space-y-2">
// //                       {(iv as any).improvements.map((imp: string, i: number) => (
// //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2">
// //                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           )}

// //           {/* CATEGORIES */}
// //           {cats.length > 0 && (
// //             <div className="space-y-4">
// //               <h2 className="text-lg font-bold text-white flex items-center gap-2">
// //                 <TrendingUp className="w-5 h-5 text-purple-400" />Performance by Category
// //               </h2>
// //               {cats.map((cat, i) => {
// //                 const cs = getSkillStage(cat.score);
// //                 const CatIcon = getCategoryIcon(cat.name);
// //                 return (
// //                   <Card key={i} className={`${cs.bg} ${cs.border} border`}>
// //                     <CardContent className="pt-5 pb-5">
// //                       <div className="flex items-center justify-between mb-3">
// //                         <div className="flex items-center gap-2">
// //                           <CatIcon className={`w-5 h-5 ${cs.color}`} />
// //                           <span className="font-semibold text-white">{cat.name}</span>
// //                         </div>
// //                         <div className={`flex items-center gap-2 text-sm font-bold ${cs.color}`}>
// //                           <span>{cs.emoji}</span><span>{cs.stage}</span>
// //                         </div>
// //                       </div>
// //                       <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
// //                         <div className={`h-1.5 rounded-full ${cs.bar}`} style={{ width: `${cat.score}%` }} />
// //                       </div>
// //                       <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>
// //                       <div className="grid md:grid-cols-2 gap-4">
// //                         {cat.strengths?.length > 0 && (
// //                           <div>
// //                             <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Strengths</p>
// //                             <ul className="space-y-1">
// //                               {cat.strengths.map((s: string, j: number) => (
// //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}
// //                         {cat.improvements?.length > 0 && (
// //                           <div>
// //                             <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" />To Improve</p>
// //                             <ul className="space-y-1">
// //                               {cat.improvements.map((imp: string, j: number) => (
// //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 );
// //               })}
// //             </div>
// //           )}

// //           {/* STRENGTHS & IMPROVEMENTS */}
// //           {((iv as any).strengths?.length > 0 || (iv as any).improvements?.length > 0) && (
// //             <div className="grid md:grid-cols-2 gap-4">
// //               {(iv as any).strengths?.length > 0 && (
// //                 <Card className="border-green-500/20">
// //                   <CardHeader><CardTitle className="flex items-center gap-2 text-green-400 text-base"><CheckCircle className="w-4 h-4" />What You Did Well</CardTitle></CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {(iv as any).strengths.map((s: string, i: number) => (
// //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //               {(iv as any).improvements?.length > 0 && (
// //                 <Card className="border-orange-500/20">
// //                   <CardHeader><CardTitle className="flex items-center gap-2 text-orange-400 text-base"><TrendingUp className="w-4 h-4" />Growth Opportunities</CardTitle></CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {(iv as any).improvements.map((imp: string, i: number) => (
// //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //             </div>
// //           )}

// //           {/* WHAT'S NEXT */}
// //           <Card className="bg-purple-500/10 border-purple-500/20">
// //             <CardHeader><CardTitle className="text-base text-purple-300 flex items-center gap-2"><Zap className="w-4 h-4" />What To Do Next</CardTitle></CardHeader>
// //             <CardContent>
// //               <ul className="space-y-2 text-sm text-gray-300">
// //                 {stage.level <= 2 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Study the STAR method and practice with 3 real examples from your experience</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Do a mock interview daily for the next 2 weeks</li>
// //                 </>}
// //                 {stage.level === 3 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Add specific metrics and outcomes to your answers</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice technical deep-dives to strengthen weak spots</li>
// //                 </>}
// //                 {stage.level >= 4 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>You are close to top performance — refine delivery and pacing</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice with harder difficulty settings</li>
// //                 </>}
// //                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Re-interview in the same category to track your progress</li>
// //               </ul>
// //             </CardContent>
// //           </Card>

// //           {/* ACTIONS */}
// //           <div className="grid md:grid-cols-2 gap-4 pb-8">
// //             <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => router.push('/dashboard')}>
// //               <Home className="w-5 h-5" />Back to Dashboard
// //             </Button>
// //             <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => router.push('/interview/create')}>
// //               <PlusCircle className="w-5 h-5" />Practice Again
// //             </Button>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { getInterviewResults } from '@/lib/interview-results';
// import { InterviewResult } from '@/types';
// import {
//   Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
//   AlertCircle, Loader2, Target, Award, Star, Zap,
//   Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
// } from 'lucide-react';

// function getSkillStage(score: number | null) {
//   if (!score || score === 0) return {
//     stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
//     bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
//     icon: Target, tagline: 'No score available.', description: '',
//   };
//   if (score >= 85) return {
//     stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
//     bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
//     icon: Trophy, tagline: 'You are interview-ready at an expert level.',
//     description: 'Exceptional performance. You demonstrate mastery with depth, clarity and confidence.',
//   };
//   if (score >= 60) return {
//     stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
//     bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
//     icon: Award, tagline: 'Strong candidate — minor polish needed.',
//     description: 'Strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
//   };
//   if (score >= 50) return {
//     stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
//     bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
//     icon: Zap, tagline: 'Solid foundation — keep building.',
//     description: 'Clear grasp of core concepts with reasonable communication. Focused practice will elevate you significantly.',
//   };
//   if (score >= 15) return {
//     stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
//     bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
//     icon: Star, tagline: 'On the right path — needs more depth.',
//     description: 'Awareness of topics but answers need more structure, specifics, and confidence.',
//   };
//   return {
//     stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
//     bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
//     icon: Brain, tagline: 'Early stage — great time to build habits.',
//     description: 'Focus on learning frameworks, practicing out loud, and studying real examples.',
//   };
// }

// function getCategoryIcon(name: string) {
//   const n = name.toLowerCase();
//   if (n.includes('technical') || n.includes('problem')) return Code;
//   if (n.includes('behavioral') || n.includes('communication')) return Users;
//   if (n.includes('star')) return MessageSquare;
//   return Brain;
// }

// function StageBar({ level }: { level: number }) {
//   const stages = ['Beginner', 'Developing', 'Proficient', 'Advanced', 'Expert'];
//   return (
//     <div className="flex items-center gap-1 mt-4">
//       {stages.map((s, i) => (
//         <div key={s} className="flex-1 flex flex-col items-center gap-1">
//           <div className={`h-2 w-full rounded-full transition-all duration-500 ${i < level ? 'bg-purple-500' : 'bg-white/10'}`} />
//           <span className={`text-[10px] ${i < level ? 'text-purple-400' : 'text-gray-600'}`}>{s}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// function SegmentMeter({ score, stage }: { score: number | null; stage: ReturnType<typeof getSkillStage> }) {
//   const total = 12;
//   const filled = score ? Math.round((score / 100) * total) : 0;
//   const segColor = (i: number) => {
//     if (i >= filled) return 'bg-white/5';
//     if (filled <= 4) return 'bg-red-500';
//     if (filled <= 6) return 'bg-orange-400';
//     if (filled <= 9) return 'bg-green-400';
//     return 'bg-yellow-400';
//   };
//   return (
//     <div className="flex flex-col items-center gap-3 py-2">
//       <div className="flex items-end gap-1.5 h-16">
//         {Array.from({ length: total }).map((_, i) => (
//           <div key={i}
//             className={`w-5 rounded-sm transition-all duration-500 ${segColor(i)}`}
//             style={{ height: `${16 + (i / (total - 1)) * 44}px`, transitionDelay: `${i * 60}ms`, opacity: i < filled ? 1 : 0.15 }}
//           />
//         ))}
//       </div>
//       <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>{stage.stage}</p>
//     </div>
//   );
// }

// export default function InterviewResultsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { isAuthenticated, isLoading } = useApp();
//   const [results, setResults] = useState<InterviewResult | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) { router.push('/auth/login'); return; }
//     if (!isLoading && isAuthenticated) loadResults();
//   }, [isAuthenticated, isLoading]);

//   const loadResults = async () => {
//     try {
//       // Poll until status = completed (max 10 tries, 2s apart)
//       // This handles the case where we redirect before DB write finishes
//       let data = null;
//       for (let attempt = 0; attempt < 10; attempt++) {
//         data = await getInterviewResults(params.id as string);
//         const status = (data?.interview as any)?.status;
//         if (status === 'completed') break;
//         console.log(`⏳ Waiting for results... attempt ${attempt + 1}, status: ${status}`);
//         await new Promise(r => setTimeout(r, 2000));
//       }
//       setResults(data);
//     } catch (e) {
//       console.error('Error loading results:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading || loading) return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center space-y-4">
//           <div className="relative w-20 h-20 mx-auto">
//             <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
//             <Brain className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" />
//           </div>
//           <p className="text-white font-semibold">Generating your results...</p>
//           <p className="text-muted-foreground text-sm">AI is evaluating your interview</p>
//           <div className="flex justify-center gap-1">
//             {[0,1,2].map(i => (
//               <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (!isAuthenticated) return null;

//   if (!results) return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <Card className="max-w-2xl mx-auto">
//           <CardContent className="pt-8 pb-8 text-center space-y-4">
//             <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
//             <h2 className="text-2xl font-bold">Results Not Available</h2>
//             <p className="text-muted-foreground">This interview hasn't been completed yet.</p>
//             <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   const { interview: iv } = results;
//   const stage = getSkillStage(iv.score);
//   const StageIcon = stage.icon;
//   const cats: any[] = (iv as any).category_results || [];
//   const hiringRec: string = (iv as any).hiring_recommendation || '';
//   const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
//     : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
//     : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
//     : 'text-red-400 bg-red-500/10 border-red-500/30';

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
//       <div className="container mx-auto px-4 py-10">
//         <div className="max-w-3xl mx-auto space-y-6">

//           {/* HERO */}
//           <Card className={`${stage.bg} ${stage.border} border-2`}>
//             <CardContent className="pt-10 pb-8 text-center space-y-4">
//               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
//                 <StageIcon className="w-4 h-4" />{stage.stage} Level
//               </div>
//               <div className="text-5xl">{stage.emoji}</div>
//               <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
//               {stage.description && <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>}
//               <SegmentMeter score={iv.score} stage={stage} />
//               <StageBar level={stage.level} />
//               <p className="text-sm text-muted-foreground pt-2">
//                 {iv.jobRole}{(iv as any).company ? ` · ${(iv as any).company}` : ''} · {(iv as any).interviewType} · {(iv as any).difficulty}
//               </p>
//               {hiringRec && (
//                 <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
//                   <BadgeCheck className="w-4 h-4" />Hiring Recommendation: {hiringRec}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* AI ANALYSIS */}
//           {(iv as any).overall_feedback && (
//             <Card className="border-purple-500/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-purple-300">
//                   <Brain className="w-5 h-5" />AI Interview Analysis
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5">
//                 <p className="text-foreground leading-relaxed text-[15px]">{(iv as any).overall_feedback}</p>
//                 {(iv as any).improvements?.length > 0 && (
//                   <div className="border-t border-white/5 pt-4">
//                     <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
//                       <TrendingUp className="w-4 h-4" />Areas That Need Improvement
//                     </p>
//                     <ul className="space-y-2">
//                       {(iv as any).improvements.map((imp: string, i: number) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2">
//                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* CATEGORIES */}
//           {cats.length > 0 && (
//             <div className="space-y-4">
//               <h2 className="text-lg font-bold text-white flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-purple-400" />Performance by Category
//               </h2>
//               {cats.map((cat, i) => {
//                 const cs = getSkillStage(cat.score);
//                 const CatIcon = getCategoryIcon(cat.name);
//                 return (
//                   <Card key={i} className={`${cs.bg} ${cs.border} border`}>
//                     <CardContent className="pt-5 pb-5">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <CatIcon className={`w-5 h-5 ${cs.color}`} />
//                           <span className="font-semibold text-white">{cat.name}</span>
//                         </div>
//                         <div className={`flex items-center gap-2 text-sm font-bold ${cs.color}`}>
//                           <span>{cs.emoji}</span><span>{cs.stage}</span>
//                         </div>
//                       </div>
//                       <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
//                         <div className={`h-1.5 rounded-full ${cs.bar}`} style={{ width: `${cat.score}%` }} />
//                       </div>
//                       <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         {cat.strengths?.length > 0 && (
//                           <div>
//                             <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Strengths</p>
//                             <ul className="space-y-1">
//                               {cat.strengths.map((s: string, j: number) => (
//                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                         {cat.improvements?.length > 0 && (
//                           <div>
//                             <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" />To Improve</p>
//                             <ul className="space-y-1">
//                               {cat.improvements.map((imp: string, j: number) => (
//                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           )}

//           {/* STRENGTHS & IMPROVEMENTS */}
//           {((iv as any).strengths?.length > 0 || (iv as any).improvements?.length > 0) && (
//             <div className="grid md:grid-cols-2 gap-4">
//               {(iv as any).strengths?.length > 0 && (
//                 <Card className="border-green-500/20">
//                   <CardHeader><CardTitle className="flex items-center gap-2 text-green-400 text-base"><CheckCircle className="w-4 h-4" />What You Did Well</CardTitle></CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {(iv as any).strengths.map((s: string, i: number) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}
//               {(iv as any).improvements?.length > 0 && (
//                 <Card className="border-orange-500/20">
//                   <CardHeader><CardTitle className="flex items-center gap-2 text-orange-400 text-base"><TrendingUp className="w-4 h-4" />Growth Opportunities</CardTitle></CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {(iv as any).improvements.map((imp: string, i: number) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           )}

//           {/* WHAT'S NEXT */}
//           <Card className="bg-purple-500/10 border-purple-500/20">
//             <CardHeader><CardTitle className="text-base text-purple-300 flex items-center gap-2"><Zap className="w-4 h-4" />What To Do Next</CardTitle></CardHeader>
//             <CardContent>
//               <ul className="space-y-2 text-sm text-gray-300">
//                 {stage.level <= 2 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Study the STAR method and practice with 3 real examples from your experience</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Do a mock interview daily for the next 2 weeks</li>
//                 </>}
//                 {stage.level === 3 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Add specific metrics and outcomes to your answers</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice technical deep-dives to strengthen weak spots</li>
//                 </>}
//                 {stage.level >= 4 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>You are close to top performance — refine delivery and pacing</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice with harder difficulty settings</li>
//                 </>}
//                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Re-interview in the same category to track your progress</li>
//               </ul>
//             </CardContent>
//           </Card>

//           {/* ACTIONS */}
//           <div className="grid md:grid-cols-2 gap-4 pb-8">
//             <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => router.push('/dashboard')}>
//               <Home className="w-5 h-5" />Back to Dashboard
//             </Button>
//             <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => router.push('/interview/create')}>
//               <PlusCircle className="w-5 h-5" />Practice Again
//             </Button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import { getInterviewResults } from '@/lib/interview-results';
import { InterviewResult } from '@/types';
import {
  Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
  AlertCircle, Target, Award, Star, Zap,
  Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
} from 'lucide-react';

function getSkillStage(score: number | null) {
  if (!score || score === 0) return {
    stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
    bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
    icon: Target, tagline: 'No score available.', description: '',
  };
  if (score >= 85) return {
    stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
    bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
    icon: Trophy, tagline: 'You are interview-ready at an expert level.',
    description: 'Exceptional performance. You demonstrate mastery with depth, clarity and confidence.',
  };
  if (score >= 60) return {
    stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
    bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
    icon: Award, tagline: 'Strong candidate — minor polish needed.',
    description: 'Strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
  };
  if (score >= 50) return {
    stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
    bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
    icon: Zap, tagline: 'Solid foundation — keep building.',
    description: 'Clear grasp of core concepts with reasonable communication. Focused practice will elevate you significantly.',
  };
  if (score >= 15) return {
    stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
    bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
    icon: Star, tagline: 'On the right path — needs more depth.',
    description: 'Awareness of topics but answers need more structure, specifics, and confidence.',
  };
  return {
    stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
    bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
    icon: Brain, tagline: 'Early stage — great time to build habits.',
    description: 'Focus on learning frameworks, practicing out loud, and studying real examples.',
  };
}

function getCategoryIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('technical') || n.includes('problem')) return Code;
  if (n.includes('behavioral') || n.includes('communication')) return Users;
  if (n.includes('star')) return MessageSquare;
  return Brain;
}

function StageBar({ level }: { level: number }) {
  const stages = ['Beginner', 'Developing', 'Proficient', 'Advanced', 'Expert'];
  return (
    <div className="flex items-center gap-1 mt-4">
      {stages.map((s, i) => (
        <div key={s} className="flex-1 flex flex-col items-center gap-1">
          <div className={`h-2 w-full rounded-full transition-all duration-500 ${i < level ? 'bg-purple-500' : 'bg-white/10'}`} />
          <span className={`text-[10px] ${i < level ? 'text-purple-400' : 'text-gray-600'}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function SegmentMeter({ score, stage }: { score: number | null; stage: ReturnType<typeof getSkillStage> }) {
  const total = 12;
  const filled = score ? Math.round((score / 100) * total) : 0;
  const segColor = (i: number) => {
    if (i >= filled) return 'bg-white/5';
    if (filled <= 4) return 'bg-red-500';
    if (filled <= 6) return 'bg-orange-400';
    if (filled <= 9) return 'bg-green-400';
    return 'bg-yellow-400';
  };
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="flex items-end gap-1.5 h-16">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i}
            className={`w-5 rounded-sm transition-all duration-500 ${segColor(i)}`}
            style={{ height: `${16 + (i / (total - 1)) * 44}px`, transitionDelay: `${i * 60}ms`, opacity: i < filled ? 1 : 0.15 }}
          />
        ))}
      </div>
      <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>{stage.stage}</p>
    </div>
  );
}

export default function InterviewResultsPage() {
  const router = useRouter();
  const params = useParams();

  // ✅ FIX: Pull `user` directly — isAuthenticated depends on !isLoading so it's safer
  const { user, isLoading } = useApp();

  const [results, setResults] = useState<InterviewResult | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Still waiting for auth to resolve — do nothing yet
    if (isLoading) return;

    // Auth resolved and no user — redirect to login
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // ✅ User is confirmed — safe to query DB
    loadResults();
  }, [user, isLoading]); // ← depend on user + isLoading, NOT isAuthenticated

  const loadResults = async () => {
    try {
      // Poll until status = completed (max 10 tries, 2s apart)
      let data = null;
      for (let attempt = 0; attempt < 10; attempt++) {
        data = await getInterviewResults(params.id as string);
        const status = (data?.interview as any)?.status;
        if (status === 'completed') break;
        console.log(`⏳ Waiting for results... attempt ${attempt + 1}, status: ${status}`);
        await new Promise(r => setTimeout(r, 2000));
      }
      setResults(data);
    } catch (e) {
      console.error('Error loading results:', e);
    } finally {
      setPageLoading(false);
    }
  };

  // Show spinner while auth OR results are loading
  if (isLoading || pageLoading) return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
            <Brain className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" />
          </div>
          <p className="text-white font-semibold">Generating your results...</p>
          <p className="text-muted-foreground text-sm">AI is evaluating your interview</p>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Auth resolved but no user (redirect in progress)
  if (!user) return null;

  if (!results) return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold">Results Not Available</h2>
            <p className="text-muted-foreground">This interview hasn't been completed yet.</p>
            <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const { interview: iv } = results;
  const stage = getSkillStage(iv.score);
  const StageIcon = stage.icon;
  const cats: any[] = (iv as any).category_results || [];
  const hiringRec: string = (iv as any).hiring_recommendation || '';
  const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
    : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    : 'text-red-400 bg-red-500/10 border-red-500/30';

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* HERO */}
          <Card className={`${stage.bg} ${stage.border} border-2`}>
            <CardContent className="pt-10 pb-8 text-center space-y-4">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
                <StageIcon className="w-4 h-4" />{stage.stage} Level
              </div>
              <div className="text-5xl">{stage.emoji}</div>
              <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
              {stage.description && <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>}
              <SegmentMeter score={iv.score} stage={stage} />
              <StageBar level={stage.level} />
              <p className="text-sm text-muted-foreground pt-2">
                {iv.jobRole}{(iv as any).company ? ` · ${(iv as any).company}` : ''} · {(iv as any).interviewType} · {(iv as any).difficulty}
              </p>
              {hiringRec && (
                <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
                  <BadgeCheck className="w-4 h-4" />Hiring Recommendation: {hiringRec}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI ANALYSIS */}
          {(iv as any).overall_feedback && (
            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Brain className="w-5 h-5" />AI Interview Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-foreground leading-relaxed text-[15px]">{(iv as any).overall_feedback}</p>
                {(iv as any).improvements?.length > 0 && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />Areas That Need Improvement
                    </p>
                    <ul className="space-y-2">
                      {(iv as any).improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2">
                          <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* CATEGORIES */}
          {cats.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />Performance by Category
              </h2>
              {cats.map((cat, i) => {
                const cs = getSkillStage(cat.score);
                const CatIcon = getCategoryIcon(cat.name);
                return (
                  <Card key={i} className={`${cs.bg} ${cs.border} border`}>
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CatIcon className={`w-5 h-5 ${cs.color}`} />
                          <span className="font-semibold text-white">{cat.name}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-bold ${cs.color}`}>
                          <span>{cs.emoji}</span><span>{cs.stage}</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
                        <div className={`h-1.5 rounded-full ${cs.bar}`} style={{ width: `${cat.score}%` }} />
                      </div>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {cat.strengths?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />Strengths
                            </p>
                            <ul className="space-y-1">
                              {cat.strengths.map((s: string, j: number) => (
                                <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
                                  <span className="text-green-500 mt-0.5">✓</span>{s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {cat.improvements?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />To Improve
                            </p>
                            <ul className="space-y-1">
                              {cat.improvements.map((imp: string, j: number) => (
                                <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
                                  <ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* STRENGTHS & IMPROVEMENTS */}
          {((iv as any).strengths?.length > 0 || (iv as any).improvements?.length > 0) && (
            <div className="grid md:grid-cols-2 gap-4">
              {(iv as any).strengths?.length > 0 && (
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400 text-base">
                      <CheckCircle className="w-4 h-4" />What You Did Well
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(iv as any).strengths.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-green-500 mt-0.5">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {(iv as any).improvements?.length > 0 && (
                <Card className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-400 text-base">
                      <TrendingUp className="w-4 h-4" />Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(iv as any).improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* WHAT'S NEXT */}
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-base text-purple-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />What To Do Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                {stage.level <= 2 && <>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Study the STAR method and practice with 3 real examples from your experience</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Do a mock interview daily for the next 2 weeks</li>
                </>}
                {stage.level === 3 && <>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Add specific metrics and outcomes to your answers</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice technical deep-dives to strengthen weak spots</li>
                </>}
                {stage.level >= 4 && <>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>You are close to top performance — refine delivery and pacing</li>
                  <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice with harder difficulty settings</li>
                </>}
                <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Re-interview in the same category to track your progress</li>
              </ul>
            </CardContent>
          </Card>

          {/* ACTIONS */}
          <div className="grid md:grid-cols-2 gap-4 pb-8">
            <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => router.push('/dashboard')}>
              <Home className="w-5 h-5" />Back to Dashboard
            </Button>
            <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => router.push('/interview/create')}>
              <PlusCircle className="w-5 h-5" />Practice Again
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}