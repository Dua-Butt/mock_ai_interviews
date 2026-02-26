// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useRouter, useParams } from 'next/navigation';
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Navbar } from '@/components/dashboard/navbar';
// // // // import { useApp } from '@/lib/context-supabase';
// // // // import { getInterviewResults } from '@/lib/interview-results';
// // // // import { InterviewResult } from '@/types';
// // // // import { Trophy, Home, PlusCircle, TrendingUp, MessageSquare, Loader2, CheckCircle, AlertCircle, Star, Award, Target } from 'lucide-react';

// // // // // Helper function to get performance level without showing exact score
// // // // function getPerformanceLevel(score: number | null) {
// // // //   if (score === null || score === 0) {
// // // //     return {
// // // //       level: 'needs-practice',
// // // //       label: 'Needs Practice',
// // // //       color: 'text-orange-400',
// // // //       bgColor: 'bg-orange-500/20',
// // // //       borderColor: 'border-orange-500/30',
// // // //       icon: Target,
// // // //       message: 'Keep practicing! Every interview makes you better.',
// // // //       emoji: '📚'
// // // //     };
// // // //   }

// // // //   if (score >= 80) {
// // // //     return {
// // // //       level: 'excellent',
// // // //       label: 'Excellent',
// // // //       color: 'text-green-400',
// // // //       bgColor: 'bg-green-500/20',
// // // //       borderColor: 'border-green-500/30',
// // // //       icon: Trophy,
// // // //       message: 'Outstanding performance! You\'re ready for this role.',
// // // //       emoji: '🏆'
// // // //     };
// // // //   } else if (score >= 60) {
// // // //     return {
// // // //       level: 'good',
// // // //       label: 'Good',
// // // //       color: 'text-blue-400',
// // // //       bgColor: 'bg-blue-500/20',
// // // //       borderColor: 'border-blue-500/30',
// // // //       icon: Award,
// // // //       message: 'Great effort! Review the feedback to improve further.',
// // // //       emoji: '⭐'
// // // //     };
// // // //   } else if (score >= 40) {
// // // //     return {
// // // //       level: 'fair',
// // // //       label: 'Fair',
// // // //       color: 'text-yellow-400',
// // // //       bgColor: 'bg-yellow-500/20',
// // // //       borderColor: 'border-yellow-500/30',
// // // //       icon: Star,
// // // //       message: 'You\'re on the right track. Focus on the improvement areas.',
// // // //       emoji: '💪'
// // // //     };
// // // //   } else {
// // // //     return {
// // // //       level: 'needs-practice',
// // // //       label: 'Needs Practice',
// // // //       color: 'text-orange-400',
// // // //       bgColor: 'bg-orange-500/20',
// // // //       borderColor: 'border-orange-500/30',
// // // //       icon: Target,
// // // //       message: 'Keep practicing! Review the feedback and try again.',
// // // //       emoji: '📚'
// // // //     };
// // // //   }
// // // // }

// // // // // Question performance indicator without exact score
// // // // function getQuestionPerformance(score: number | null) {
// // // //   if (score === null || score === 0) {
// // // //     return {
// // // //       label: 'Incomplete',
// // // //       icon: '⚪',
// // // //       color: 'text-gray-400'
// // // //     };
// // // //   } else if (score >= 80) {
// // // //     return {
// // // //       label: 'Strong',
// // // //       icon: '🟢',
// // // //       color: 'text-green-400'
// // // //     };
// // // //   } else if (score >= 60) {
// // // //     return {
// // // //       label: 'Good',
// // // //       icon: '🔵',
// // // //       color: 'text-blue-400'
// // // //     };
// // // //   } else if (score >= 40) {
// // // //     return {
// // // //       label: 'Fair',
// // // //       icon: '🟡',
// // // //       color: 'text-yellow-400'
// // // //     };
// // // //   } else {
// // // //     return {
// // // //       label: 'Needs Work',
// // // //       icon: '🟠',
// // // //       color: 'text-orange-400'
// // // //     };
// // // //   }
// // // // }

// // // // export default function InterviewResultsPage() {
// // // //   const router = useRouter();
// // // //   const params = useParams();
// // // //   const { isAuthenticated, interviews, isLoading } = useApp();
// // // //   const [results, setResults] = useState<InterviewResult | null>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const interview = interviews.find(i => i.id === params.id);

// // // //   useEffect(() => {
// // // //     if (!isLoading && !isAuthenticated) {
// // // //       router.push('/auth/login');
// // // //       return;
// // // //     }

// // // //     if (!isLoading && isAuthenticated) {
// // // //       loadResults();
// // // //     }
// // // //   }, [isAuthenticated, isLoading, router]);

// // // //   const loadResults = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const data = await getInterviewResults(params.id as string);
// // // //       console.log('📊 Loaded results:', data);
// // // //       setResults(data);
// // // //     } catch (error) {
// // // //       console.error('Error loading results:', error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   if (isLoading || loading) {
// // // //     return (
// // // //       <div className="min-h-screen gradient-bg">
// // // //         <Navbar />
// // // //         <div className="container mx-auto px-4 py-8">
// // // //           <div className="flex items-center justify-center min-h-[400px]">
// // // //             <div className="text-center">
// // // //               <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-500" />
// // // //               <p className="text-muted-foreground">Loading your results...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!isAuthenticated) {
// // // //     return null;
// // // //   }

// // // //   if (!interview || interview.status !== 'completed' || !results) {
// // // //     return (
// // // //       <div className="min-h-screen gradient-bg">
// // // //         <Navbar />
// // // //         <div className="container mx-auto px-4 py-8">
// // // //           <Card className="max-w-2xl mx-auto">
// // // //             <CardContent className="pt-6 text-center">
// // // //               <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
// // // //               <h2 className="text-2xl font-bold mb-2">Results Not Available</h2>
// // // //               <p className="text-muted-foreground mb-6">
// // // //                 This interview hasn&apos;t been completed yet or results are still being processed.
// // // //               </p>
// // // //               <Button onClick={() => router.push('/dashboard')}>
// // // //                 Back to Dashboard
// // // //               </Button>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const { interview: interviewData, answers } = results;
// // // //   const performance = getPerformanceLevel(interviewData.score);
// // // //   const PerformanceIcon = performance.icon;

// // // //   return (
// // // //     <div className="min-h-screen gradient-bg">
// // // //       <Navbar />

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         <div className="max-w-4xl mx-auto">
// // // //           {/* Performance Badge Card */}
// // // //           <Card className={`mb-8 ${performance.bgColor} ${performance.borderColor} border-2`}>
// // // //             <CardContent className="pt-12 pb-12 text-center">
// // // //               <div className="flex justify-center mb-4">
// // // //                 <div className={`w-32 h-32 rounded-full ${performance.bgColor} flex items-center justify-center`}>
// // // //                   <PerformanceIcon className={`w-16 h-16 ${performance.color}`} />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="text-6xl mb-4">{performance.emoji}</div>
// // // //               <h1 className="text-4xl font-bold mb-2">{performance.label} Performance!</h1>
// // // //               <p className="text-lg text-muted-foreground mb-2">
// // // //                 {performance.message}
// // // //               </p>
// // // //               <p className="text-muted-foreground">
// // // //                 {interviewData.jobRole} at {interviewData.company || 'your target company'}
// // // //               </p>
// // // //               <div className="mt-4 text-sm text-muted-foreground">
// // // //                 Completed on {interviewData.completedAt?.toLocaleDateString()} at {interviewData.completedAt?.toLocaleTimeString()}
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Overall Feedback */}
// // // //           {interviewData.overall_feedback && (
// // // //             <Card className="mb-8">
// // // //               <CardHeader>
// // // //                 <CardTitle className="flex items-center gap-2">
// // // //                   <MessageSquare className="w-5 h-5" />
// // // //                   Overall Feedback
// // // //                 </CardTitle>
// // // //               </CardHeader>
// // // //               <CardContent>
// // // //                 <p className="text-foreground leading-relaxed">
// // // //                   {interviewData.overall_feedback}
// // // //                 </p>
// // // //               </CardContent>
// // // //             </Card>
// // // //           )}

// // // //           {/* Strengths & Improvements */}
// // // //           {(interviewData.strengths && interviewData.strengths.length > 0) ||
// // // //            (interviewData.improvements && interviewData.improvements.length > 0) ? (
// // // //             <div className="grid md:grid-cols-2 gap-6 mb-8">
// // // //               {/* Strengths */}
// // // //               {interviewData.strengths && interviewData.strengths.length > 0 && (
// // // //                 <Card className="border-green-500/20">
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center gap-2 text-green-500">
// // // //                       <CheckCircle className="w-5 h-5" />
// // // //                       What You Did Well
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <ul className="space-y-2">
// // // //                       {interviewData.strengths.map((strength, index) => (
// // // //                         <li key={index} className="flex items-start gap-2 text-sm">
// // // //                           <span className="text-green-500 mt-0.5">✓</span>
// // // //                           <span>{strength}</span>
// // // //                         </li>
// // // //                       ))}
// // // //                     </ul>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               )}

// // // //               {/* Improvements */}
// // // //               {interviewData.improvements && interviewData.improvements.length > 0 && (
// // // //                 <Card className="border-orange-500/20">
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center gap-2 text-orange-500">
// // // //                       <TrendingUp className="w-5 h-5" />
// // // //                       Growth Opportunities
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <ul className="space-y-2">
// // // //                       {interviewData.improvements.map((improvement, index) => (
// // // //                         <li key={index} className="flex items-start gap-2 text-sm">
// // // //                           <span className="text-orange-500 mt-0.5">→</span>
// // // //                           <span>{improvement}</span>
// // // //                         </li>
// // // //                       ))}
// // // //                     </ul>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               )}
// // // //             </div>
// // // //           ) : null}

// // // //           {/* Question Breakdown */}
// // // //           <Card className="mb-8">
// // // //             <CardHeader>
// // // //               <CardTitle className="flex items-center gap-2">
// // // //                 <TrendingUp className="w-5 h-5" />
// // // //                 Question-by-Question Analysis
// // // //               </CardTitle>
// // // //               <CardDescription>
// // // //                 Detailed feedback on each of your responses
// // // //               </CardDescription>
// // // //             </CardHeader>
// // // //             <CardContent className="space-y-6">
// // // //               {answers.length > 0 ? (
// // // //                 answers.map((answer) => {
// // // //                   const questionPerf = getQuestionPerformance(answer.score);

// // // //                   return (
// // // //                     <div key={answer.id} className="border-b last:border-0 pb-6 last:pb-0">
// // // //                       <div className="flex items-start justify-between mb-3">
// // // //                         <div className="flex-1">
// // // //                           <div className="flex items-center gap-2 mb-1">
// // // //                             <span className="text-xs text-muted-foreground">
// // // //                               Question {answer.question_index + 1}
// // // //                             </span>
// // // //                             <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
// // // //                               {answer.question_category}
// // // //                             </span>
// // // //                           </div>
// // // //                           <h4 className="font-semibold text-white">{answer.question_text}</h4>
// // // //                         </div>
// // // //                         <div className={`ml-4 flex items-center gap-2 ${questionPerf.color}`}>
// // // //                           <span className="text-2xl">{questionPerf.icon}</span>
// // // //                           <span className="font-semibold">{questionPerf.label}</span>
// // // //                         </div>
// // // //                       </div>

// // // //                       {/* User's Answer */}
// // // //                       <div className="mb-3">
// // // //                         <div className="text-sm font-medium text-muted-foreground mb-1">
// // // //                           Your Answer:
// // // //                         </div>
// // // //                         <p className="text-sm bg-muted p-3 rounded-md">
// // // //                           {answer.user_answer || 'No answer provided'}
// // // //                         </p>
// // // //                       </div>

// // // //                       {/* AI Feedback */}
// // // //                       {answer.feedback && (
// // // //                         <div className="mb-3">
// // // //                           <div className="text-sm font-medium text-muted-foreground mb-1">
// // // //                             Feedback:
// // // //                           </div>
// // // //                           <p className="text-sm text-foreground">
// // // //                             {answer.feedback}
// // // //                           </p>
// // // //                         </div>
// // // //                       )}

// // // //                       {/* Strengths & Improvements for this answer */}
// // // //                       <div className="grid md:grid-cols-2 gap-4 mt-3">
// // // //                         {answer.strengths && answer.strengths.length > 0 && (
// // // //                           <div>
// // // //                             <div className="text-xs font-medium text-green-400 mb-1">
// // // //                               What Worked:
// // // //                             </div>
// // // //                             <ul className="text-xs space-y-1">
// // // //                               {answer.strengths.map((strength, i) => (
// // // //                                 <li key={i} className="flex items-start gap-1">
// // // //                                   <span className="text-green-500">✓</span>
// // // //                                   <span className="text-muted-foreground">{strength}</span>
// // // //                                 </li>
// // // //                               ))}
// // // //                             </ul>
// // // //                           </div>
// // // //                         )}

// // // //                         {answer.improvements && answer.improvements.length > 0 && (
// // // //                           <div>
// // // //                             <div className="text-xs font-medium text-orange-400 mb-1">
// // // //                               Next Steps:
// // // //                             </div>
// // // //                             <ul className="text-xs space-y-1">
// // // //                               {answer.improvements.map((improvement, i) => (
// // // //                                 <li key={i} className="flex items-start gap-1">
// // // //                                   <span className="text-orange-500">→</span>
// // // //                                   <span className="text-muted-foreground">{improvement}</span>
// // // //                                 </li>
// // // //                               ))}
// // // //                             </ul>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   );
// // // //                 })
// // // //               ) : (
// // // //                 <p className="text-center text-muted-foreground py-8">
// // // //                   No detailed answers available for this interview.
// // // //                 </p>
// // // //               )}
// // // //             </CardContent>
// // // //           </Card>

// // // //           {/* Action Buttons */}
// // // //           <div className="grid md:grid-cols-2 gap-4">
// // // //             <Button
// // // //               variant="outline"
// // // //               className="w-full gap-2"
// // // //               size="lg"
// // // //               onClick={() => router.push('/dashboard')}
// // // //             >
// // // //               <Home className="w-5 h-5" />
// // // //               Back to Dashboard
// // // //             </Button>
// // // //             <Button
// // // //               className="w-full gap-2"
// // // //               size="lg"
// // // //               onClick={() => router.push('/interview/create')}
// // // //             >
// // // //               <PlusCircle className="w-5 h-5" />
// // // //               Practice Again
// // // //             </Button>
// // // //           </div>

// // // //           {/* Tips */}
// // // //           <Card className="mt-8 bg-purple-500/10 border-purple-500/20">
// // // //             <CardHeader>
// // // //               <CardTitle className="text-lg">Keep Growing 🌱</CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <ul className="space-y-2 text-sm text-muted-foreground">
// // // //                 <li className="flex items-start gap-2">
// // // //                   <span className="text-purple-500 mt-0.5">•</span>
// // // //                   <span>Every interview is a learning opportunity - focus on growth, not perfection</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-2">
// // // //                   <span className="text-purple-500 mt-0.5">•</span>
// // // //                   <span>Review the feedback and practice the areas marked for improvement</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-2">
// // // //                   <span className="text-purple-500 mt-0.5">•</span>
// // // //                   <span>Use the STAR method for behavioral questions to structure your answers</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-2">
// // // //                   <span className="text-purple-500 mt-0.5">•</span>
// // // //                   <span>Practice regularly - consistency is key to improvement</span>
// // // //                 </li>
// // // //               </ul>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // //new code





// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useRouter, useParams } from 'next/navigation';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Navbar } from '@/components/dashboard/navbar';
// // // import { useApp } from '@/lib/context-supabase';
// // // import { getInterviewResults } from '@/lib/interview-results';
// // // import { InterviewResult } from '@/types';
// // // import {
// // //   Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
// // //   AlertCircle, Loader2, Target, Award, Star, Zap,
// // //   Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
// // // } from 'lucide-react';

// // // // ─── SKILL STAGE ─────────────────────────────────────────────────────────────
// // // function getSkillStage(score: number | null) {
// // //   if (score === null || score === 0) return {
// // //     stage: 'Unrated',
// // //     level: 0,
// // //     emoji: '⚪',
// // //     color: 'text-gray-400',
// // //     bg: 'bg-gray-500/10',
// // //     border: 'border-gray-500/20',
// // //     bar: 'bg-gray-500',
// // //     icon: Target,
// // //     tagline: 'Complete an interview to get your stage.',
// // //     description: 'No evaluation available yet.',
// // //   };
// // //   if (score >= 90) return {
// // //     stage: 'Expert',
// // //     level: 5,
// // //     emoji: '🏆',
// // //     color: 'text-yellow-400',
// // //     bg: 'bg-yellow-500/10',
// // //     border: 'border-yellow-500/30',
// // //     bar: 'bg-yellow-400',
// // //     icon: Trophy,
// // //     tagline: 'You are interview-ready at an expert level.',
// // //     description: 'Exceptional performance. You demonstrate mastery of the domain with depth, clarity and confidence.',
// // //   };
// // //   if (score >= 75) return {
// // //     stage: 'Advanced',
// // //     level: 4,
// // //     emoji: '⭐',
// // //     color: 'text-blue-400',
// // //     bg: 'bg-blue-500/10',
// // //     border: 'border-blue-500/30',
// // //     bar: 'bg-blue-400',
// // //     icon: Award,
// // //     tagline: 'Strong candidate — minor polish needed.',
// // //     description: 'You show strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
// // //   };
// // //   if (score >= 60) return {
// // //     stage: 'Proficient',
// // //     level: 3,
// // //     emoji: '💡',
// // //     color: 'text-green-400',
// // //     bg: 'bg-green-500/10',
// // //     border: 'border-green-500/30',
// // //     bar: 'bg-green-400',
// // //     icon: Zap,
// // //     tagline: 'Solid foundation — keep building.',
// // //     description: 'You have a clear grasp of core concepts and communicate them reasonably well. Focused practice will elevate you significantly.',
// // //   };
// // //   if (score >= 40) return {
// // //     stage: 'Developing',
// // //     level: 2,
// // //     emoji: '📈',
// // //     color: 'text-orange-400',
// // //     bg: 'bg-orange-500/10',
// // //     border: 'border-orange-500/30',
// // //     bar: 'bg-orange-400',
// // //     icon: Star,
// // //     tagline: 'On the right path — needs more depth.',
// // //     description: 'You show awareness of the topics but answers need more structure, specifics, and confidence. Consistent practice will make a big difference.',
// // //   };
// // //   return {
// // //     stage: 'Beginner',
// // //     level: 1,
// // //     emoji: '🌱',
// // //     color: 'text-red-400',
// // //     bg: 'bg-red-500/10',
// // //     border: 'border-red-500/30',
// // //     bar: 'bg-red-400',
// // //     icon: Brain,
// // //     tagline: 'Early stage — great time to build habits.',
// // //     description: 'This is the starting point. Focus on learning frameworks, practicing out loud, and studying real examples.',
// // //   };
// // // }

// // // // ─── CATEGORY ICON ───────────────────────────────────────────────────────────
// // // function getCategoryIcon(name: string) {
// // //   const n = name.toLowerCase();
// // //   if (n.includes('technical') || n.includes('problem')) return Code;
// // //   if (n.includes('behavioral') || n.includes('communication')) return Users;
// // //   if (n.includes('star')) return MessageSquare;
// // //   return Brain;
// // // }

// // // // ─── STAGE BAR ───────────────────────────────────────────────────────────────
// // // function StageBar({ level }: { level: number }) {
// // //   const stages = ['Beginner', 'Developing', 'Proficient', 'Advanced', 'Expert'];
// // //   return (
// // //     <div className="flex items-center gap-1 mt-4">
// // //       {stages.map((s, i) => (
// // //         <div key={s} className="flex-1 flex flex-col items-center gap-1">
// // //           <div className={`h-2 w-full rounded-full transition-all duration-500 ${i < level ? 'bg-purple-500' : 'bg-white/10'}`} />
// // //           <span className={`text-[10px] ${i < level ? 'text-purple-400' : 'text-gray-600'}`}>{s}</span>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // // ─── SEGMENT METER (no numbers) ──────────────────────────────────────────────
// // // function SegmentMeter({ score, stage }: { score: number | null; stage: ReturnType<typeof getSkillStage> }) {
// // //   const total = 12;
// // //   const filled = score ? Math.round((score / 100) * total) : 0;

// // //   const segmentColor = (i: number) => {
// // //     if (i >= filled) return 'bg-white/5';
// // //     if (filled <= 4) return 'bg-red-500';
// // //     if (filled <= 6) return 'bg-orange-400';
// // //     if (filled <= 9) return 'bg-green-400';
// // //     return 'bg-yellow-400';
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center gap-3 py-2">
// // //       <div className="flex items-end gap-1.5 h-16">
// // //         {Array.from({ length: total }).map((_, i) => {
// // //           const height = 16 + (i / (total - 1)) * 44;
// // //           return (
// // //             <div
// // //               key={i}
// // //               className={`w-5 rounded-sm transition-all duration-500 ${segmentColor(i)}`}
// // //               style={{
// // //                 height: `${height}px`,
// // //                 transitionDelay: `${i * 60}ms`,
// // //                 opacity: i < filled ? 1 : 0.15,
// // //               }}
// // //             />
// // //           );
// // //         })}
// // //       </div>
// // //       <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>
// // //         {stage.stage}
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// // // export default function InterviewResultsPage() {
// // //   const router = useRouter();
// // //   const params = useParams();
// // //   const { isAuthenticated, interviews, isLoading } = useApp();
// // //   const [results, setResults] = useState<InterviewResult | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const interview = interviews.find(i => i.id === params.id);

// // //   useEffect(() => {
// // //     if (!isLoading && !isAuthenticated) {
// // //       router.push('/auth/login');
// // //       return;
// // //     }
// // //     if (!isLoading && isAuthenticated) loadResults();
// // //   }, [isAuthenticated, isLoading]);

// // //   const loadResults = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await getInterviewResults(params.id as string);
// // //       setResults(data);
// // //     } catch (e) {
// // //       console.error('Error loading results:', e);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (isLoading || loading) {
// // //     return (
// // //       <div className="min-h-screen gradient-bg">
// // //         <Navbar />
// // //         <div className="flex items-center justify-center min-h-[60vh]">
// // //           <div className="text-center space-y-3">
// // //             <Loader2 className="w-12 h-12 animate-spin mx-auto text-purple-500" />
// // //             <p className="text-muted-foreground">Loading your results...</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAuthenticated) return null;

// // //   if (!interview || interview.status !== 'completed' || !results) {
// // //     return (
// // //       <div className="min-h-screen gradient-bg">
// // //         <Navbar />
// // //         <div className="container mx-auto px-4 py-8">
// // //           <Card className="max-w-2xl mx-auto">
// // //             <CardContent className="pt-8 pb-8 text-center space-y-4">
// // //               <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
// // //               <h2 className="text-2xl font-bold">Results Not Available</h2>
// // //               <p className="text-muted-foreground">
// // //                 This interview hasn&apos;t been completed yet or results are still being processed.
// // //               </p>
// // //               <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const { interview: interviewData } = results;
// // //   const stage = getSkillStage(interviewData.score);
// // //   const StageIcon = stage.icon;

// // //   // Category results from Groq evaluation
// // //   const categoryResults: {
// // //     name: string;
// // //     score: number;
// // //     feedback: string;
// // //     strengths: string[];
// // //     improvements: string[];
// // //   }[] = (interviewData as any).category_results || [];

// // //   const hiringRec: string = (interviewData as any).hiring_recommendation || '';

// // //   // Hiring recommendation color
// // //   const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
// // //     : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
// // //     : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
// // //     : 'text-red-400 bg-red-500/10 border-red-500/30';

// // //   return (
// // //     <div className="min-h-screen gradient-bg">
// // //       <Navbar />

// // //       <div className="container mx-auto px-4 py-10">
// // //         <div className="max-w-3xl mx-auto space-y-6">

// // //           {/* ── HERO CARD ── */}
// // //           <Card className={`${stage.bg} ${stage.border} border-2`}>
// // //             <CardContent className="pt-10 pb-8 text-center space-y-4">
// // //               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
// // //                 <StageIcon className="w-4 h-4" />
// // //                 {stage.stage} Level
// // //               </div>

// // //               <div className="text-5xl">{stage.emoji}</div>
// // //               <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
// // //               <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>

// // //               <SegmentMeter score={interviewData.score} stage={stage} />

// // //               <StageBar level={stage.level} />

// // //               <p className="text-sm text-muted-foreground pt-2">
// // //                 {interviewData.jobRole}
// // //                 {interviewData.company ? ` · ${interviewData.company}` : ''}
// // //                 {' · '}{interviewData.interviewType}
// // //                 {' · '}{interviewData.difficulty}
// // //               </p>

// // //               {/* Hiring recommendation badge */}
// // //               {hiringRec && (
// // //                 <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
// // //                   <BadgeCheck className="w-4 h-4" />
// // //                   Hiring Recommendation: {hiringRec}
// // //                 </div>
// // //               )}
// // //             </CardContent>
// // //           </Card>

// // //           {/* ── OVERALL FEEDBACK ── */}
// // //           {interviewData.overall_feedback && (
// // //             <Card className="border-purple-500/20">
// // //               <CardHeader>
// // //                 <CardTitle className="flex items-center gap-2 text-purple-300">
// // //                   <Brain className="w-5 h-5" />
// // //                   AI Interview Analysis
// // //                 </CardTitle>
// // //               </CardHeader>
// // //               <CardContent className="space-y-5">
// // //                 {/* Analysis paragraph */}
// // //                 <p className="text-foreground leading-relaxed text-[15px]">
// // //                   {interviewData.overall_feedback}
// // //                 </p>

// // //                 {/* Improvements needed */}
// // //                 {interviewData.improvements?.length > 0 && (
// // //                   <div className="border-t border-white/5 pt-4">
// // //                     <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
// // //                       <TrendingUp className="w-4 h-4" />
// // //                       Areas That Need Improvement
// // //                     </p>
// // //                     <ul className="space-y-2">
// // //                       {interviewData.improvements.map((imp, i) => (
// // //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2">
// // //                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
// // //                           {imp}
// // //                         </li>
// // //                       ))}
// // //                     </ul>
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           )}

// // //           {/* ── CATEGORY RESULTS (by interview type) ── */}
// // //           {categoryResults.length > 0 && (
// // //             <div className="space-y-4">
// // //               <h2 className="text-lg font-bold text-white flex items-center gap-2">
// // //                 <TrendingUp className="w-5 h-5 text-purple-400" />
// // //                 Performance by Category
// // //               </h2>

// // //               {categoryResults.map((cat, i) => {
// // //                 const catStage = getSkillStage(cat.score);
// // //                 const CatIcon = getCategoryIcon(cat.name);
// // //                 return (
// // //                   <Card key={i} className={`${catStage.bg} ${catStage.border} border`}>
// // //                     <CardContent className="pt-5 pb-5">
// // //                       <div className="flex items-center justify-between mb-3">
// // //                         <div className="flex items-center gap-2">
// // //                           <CatIcon className={`w-5 h-5 ${catStage.color}`} />
// // //                           <span className="font-semibold text-white">{cat.name}</span>
// // //                         </div>
// // //                         <div className={`flex items-center gap-2 text-sm font-bold ${catStage.color}`}>
// // //                           <span>{catStage.emoji}</span>
// // //                           <span>{catStage.stage}</span>
// // //                           <span className="text-white/40">·</span>
// // //                           <span>{cat.score}/100</span>
// // //                         </div>
// // //                       </div>

// // //                       {/* Score bar */}
// // //                       <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
// // //                         <div
// // //                           className={`h-1.5 rounded-full transition-all duration-700 ${catStage.bar}`}
// // //                           style={{ width: `${cat.score}%` }}
// // //                         />
// // //                       </div>

// // //                       <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>

// // //                       <div className="grid md:grid-cols-2 gap-4">
// // //                         {cat.strengths?.length > 0 && (
// // //                           <div>
// // //                             <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
// // //                               <CheckCircle className="w-3 h-3" /> Strengths
// // //                             </p>
// // //                             <ul className="space-y-1">
// // //                               {cat.strengths.map((s, j) => (
// // //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
// // //                                   <span className="text-green-500 mt-0.5">✓</span>{s}
// // //                                 </li>
// // //                               ))}
// // //                             </ul>
// // //                           </div>
// // //                         )}
// // //                         {cat.improvements?.length > 0 && (
// // //                           <div>
// // //                             <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
// // //                               <TrendingUp className="w-3 h-3" /> To Improve
// // //                             </p>
// // //                             <ul className="space-y-1">
// // //                               {cat.improvements.map((imp, j) => (
// // //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
// // //                                   <ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
// // //                                 </li>
// // //                               ))}
// // //                             </ul>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 );
// // //               })}
// // //             </div>
// // //           )}

// // //           {/* ── OVERALL STRENGTHS & IMPROVEMENTS ── */}
// // //           {((interviewData.strengths?.length > 0) || (interviewData.improvements?.length > 0)) && (
// // //             <div className="grid md:grid-cols-2 gap-4">
// // //               {interviewData.strengths?.length > 0 && (
// // //                 <Card className="border-green-500/20">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center gap-2 text-green-400 text-base">
// // //                       <CheckCircle className="w-4 h-4" /> What You Did Well
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <ul className="space-y-2">
// // //                       {interviewData.strengths.map((s, i) => (
// // //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
// // //                           <span className="text-green-500 mt-0.5">✓</span>{s}
// // //                         </li>
// // //                       ))}
// // //                     </ul>
// // //                   </CardContent>
// // //                 </Card>
// // //               )}
// // //               {interviewData.improvements?.length > 0 && (
// // //                 <Card className="border-orange-500/20">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center gap-2 text-orange-400 text-base">
// // //                       <TrendingUp className="w-4 h-4" /> Growth Opportunities
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <ul className="space-y-2">
// // //                       {interviewData.improvements.map((imp, i) => (
// // //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
// // //                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
// // //                         </li>
// // //                       ))}
// // //                     </ul>
// // //                   </CardContent>
// // //                 </Card>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── WHAT'S NEXT ── */}
// // //           <Card className="bg-purple-500/10 border-purple-500/20">
// // //             <CardHeader>
// // //               <CardTitle className="text-base text-purple-300 flex items-center gap-2">
// // //                 <Zap className="w-4 h-4" /> What To Do Next
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ul className="space-y-2 text-sm text-gray-300">
// // //                 {stage.level <= 2 && (
// // //                   <>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Study the STAR method and practice it with 3 real examples from your experience</li>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Do a mock interview daily for the next 2 weeks</li>
// // //                   </>
// // //                 )}
// // //                 {stage.level === 3 && (
// // //                   <>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Focus on adding more specific metrics and outcomes to your answers</li>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Practice technical deep-dives to strengthen weak spots</li>
// // //                   </>
// // //                 )}
// // //                 {stage.level >= 4 && (
// // //                   <>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> You are close to top performance — refine delivery and pacing</li>
// // //                     <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Practice with harder difficulty settings to sharpen your edge</li>
// // //                   </>
// // //                 )}
// // //                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Re-interview in the same category to track your progress</li>
// // //                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span> Review the category feedback above and work on the top improvement point</li>
// // //               </ul>
// // //             </CardContent>
// // //           </Card>

// // //           {/* ── ACTIONS ── */}
// // //           <div className="grid md:grid-cols-2 gap-4 pb-8">
// // //             <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => router.push('/dashboard')}>
// // //               <Home className="w-5 h-5" /> Back to Dashboard
// // //             </Button>
// // //             <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => router.push('/interview/create')}>
// // //               <PlusCircle className="w-5 h-5" /> Practice Again
// // //             </Button>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, useParams } from 'next/navigation';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Navbar } from '@/components/dashboard/navbar';
// // import { useApp } from '@/lib/context-supabase';
// // import { getInterviewResults, evaluateAndSaveResults } from '@/lib/interview-results';
// // import { InterviewResult } from '@/types';
// // import {
// //   Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
// //   AlertCircle, Loader2, Target, Award, Star, Zap,
// //   Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
// // } from 'lucide-react';

// // function getSkillStage(score: number | null) {
// //   if (score === null || score === 0) return {
// //     stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
// //     bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
// //     icon: Target, tagline: 'Evaluating your interview...', description: '',
// //   };
// //   if (score >= 90) return {
// //     stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
// //     bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
// //     icon: Trophy, tagline: 'You are interview-ready at an expert level.',
// //     description: 'Exceptional performance. You demonstrate mastery of the domain with depth, clarity and confidence.',
// //   };
// //   if (score >= 75) return {
// //     stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
// //     bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
// //     icon: Award, tagline: 'Strong candidate — minor polish needed.',
// //     description: 'You show strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
// //   };
// //   if (score >= 60) return {
// //     stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
// //     bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
// //     icon: Zap, tagline: 'Solid foundation — keep building.',
// //     description: 'You have a clear grasp of core concepts and communicate them reasonably well. Focused practice will elevate you significantly.',
// //   };
// //   if (score >= 40) return {
// //     stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
// //     bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
// //     icon: Star, tagline: 'On the right path — needs more depth.',
// //     description: 'You show awareness of the topics but answers need more structure, specifics, and confidence.',
// //   };
// //   return {
// //     stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
// //     bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
// //     icon: Brain, tagline: 'Early stage — great time to build habits.',
// //     description: 'This is the starting point. Focus on learning frameworks, practicing out loud, and studying real examples.',
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
// //   const segmentColor = (i: number) => {
// //     if (i >= filled) return 'bg-white/5';
// //     if (filled <= 4) return 'bg-red-500';
// //     if (filled <= 6) return 'bg-orange-400';
// //     if (filled <= 9) return 'bg-green-400';
// //     return 'bg-yellow-400';
// //   };
// //   return (
// //     <div className="flex flex-col items-center gap-3 py-2">
// //       <div className="flex items-end gap-1.5 h-16">
// //         {Array.from({ length: total }).map((_, i) => {
// //           const height = 16 + (i / (total - 1)) * 44;
// //           return (
// //             <div key={i} className={`w-5 rounded-sm transition-all duration-500 ${segmentColor(i)}`}
// //               style={{ height: `${height}px`, transitionDelay: `${i * 60}ms`, opacity: i < filled ? 1 : 0.15 }} />
// //           );
// //         })}
// //       </div>
// //       <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>{stage.stage}</p>
// //     </div>
// //   );
// // }

// // export default function InterviewResultsPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { isAuthenticated, interviews, isLoading, updateInterview } = useApp();
// //   const [results, setResults] = useState<InterviewResult | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [evaluating, setEvaluating] = useState(false);
// //   const [evalStep, setEvalStep] = useState('');

// //   const interview = interviews.find(i => i.id === params.id);

// //   useEffect(() => {
// //     if (!isLoading && !isAuthenticated) {
// //       router.push('/auth/login');
// //       return;
// //     }
// //     if (!isLoading && isAuthenticated) loadAndEvaluate();
// //   }, [isAuthenticated, isLoading]);

// //   const loadAndEvaluate = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getInterviewResults(params.id as string);
// //       if (!data) { setLoading(false); return; }

// //       const interviewData = data.interview as any;

// //       // If status is 'processing' — conversation JSON saved but Groq hasn't run yet
// //       if (interviewData.status === 'processing' && interviewData.conversation_json?.length > 0) {
// //         setLoading(false);
// //         setEvaluating(true);
// //         setEvalStep('🤖 Groq AI is reading your conversation...');

// //         console.log('📤 Triggering Groq evaluation from results page...');

// //         try {
// //           const evalResult = await evaluateAndSaveResults(
// //             interviewData.id,
// //             interviewData.conversation_json,
// //             interviewData.interviewType,
// //             interviewData.jobRole,
// //             interviewData.difficulty
// //           );

// //           setEvalStep('✅ Done! Loading your results...');

// //           // Update local interview status
// //           await updateInterview(interviewData.id, { status: 'completed' });

// //           // Reload results from DB now that evaluation is saved
// //           const freshData = await getInterviewResults(params.id as string);
// //           setResults(freshData);
// //         } catch (e) {
// //           console.error('Evaluation on results page failed:', e);
// //           // Still show whatever is in DB
// //           setResults(data);
// //         } finally {
// //           setEvaluating(false);
// //         }
// //       } else {
// //         // Already completed — just show results
// //         setResults(data);
// //         setLoading(false);
// //       }
// //     } catch (e) {
// //       console.error('Error loading results:', e);
// //       setLoading(false);
// //     }
// //   };

// //   // ── LOADING STATE ──────────────────────────────────────────────────────────
// //   if (isLoading || loading) {
// //     return (
// //       <div className="min-h-screen gradient-bg">
// //         <Navbar />
// //         <div className="flex items-center justify-center min-h-[60vh]">
// //           <div className="text-center space-y-3">
// //             <Loader2 className="w-12 h-12 animate-spin mx-auto text-purple-500" />
// //             <p className="text-muted-foreground">Loading your interview...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ── GROQ EVALUATING STATE ─────────────────────────────────────────────────
// //   if (evaluating) {
// //     return (
// //       <div className="min-h-screen gradient-bg">
// //         <Navbar />
// //         <div className="flex items-center justify-center min-h-[60vh]">
// //           <div className="text-center space-y-5 max-w-sm mx-auto px-4">
// //             <div className="relative w-24 h-24 mx-auto">
// //               <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
// //               <Brain className="w-10 h-10 text-purple-400 absolute inset-0 m-auto" />
// //             </div>
// //             <h2 className="text-xl font-bold text-white">Generating Your Results</h2>
// //             <p className="text-sm text-purple-300 animate-pulse">{evalStep}</p>
// //             <p className="text-xs text-muted-foreground">
// //               Groq AI is analyzing your full conversation and generating personalized feedback...
// //             </p>
// //             <div className="flex justify-center gap-1 pt-2">
// //               {[0,1,2].map(i => (
// //                 <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
// //                   style={{ animationDelay: `${i * 0.15}s` }} />
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) return null;

// //   if (!results) {
// //     return (
// //       <div className="min-h-screen gradient-bg">
// //         <Navbar />
// //         <div className="container mx-auto px-4 py-8">
// //           <Card className="max-w-2xl mx-auto">
// //             <CardContent className="pt-8 pb-8 text-center space-y-4">
// //               <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
// //               <h2 className="text-2xl font-bold">Results Not Available</h2>
// //               <p className="text-muted-foreground">This interview hasn't been completed yet or results are still being processed.</p>
// //               <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { interview: interviewData } = results;
// //   const stage = getSkillStage(interviewData.score);
// //   const StageIcon = stage.icon;
// //   const categoryResults: any[] = (interviewData as any).category_results || [];
// //   const hiringRec: string = (interviewData as any).hiring_recommendation || '';

// //   const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
// //     : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
// //     : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
// //     : hiringRec === 'No' ? 'text-red-400 bg-red-500/10 border-red-500/30' : '';

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />
// //       <div className="container mx-auto px-4 py-10">
// //         <div className="max-w-3xl mx-auto space-y-6">

// //           {/* ── HERO ── */}
// //           <Card className={`${stage.bg} ${stage.border} border-2`}>
// //             <CardContent className="pt-10 pb-8 text-center space-y-4">
// //               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
// //                 <StageIcon className="w-4 h-4" />{stage.stage} Level
// //               </div>
// //               <div className="text-5xl">{stage.emoji}</div>
// //               <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
// //               {stage.description && <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>}
// //               <SegmentMeter score={interviewData.score} stage={stage} />
// //               <StageBar level={stage.level} />
// //               <p className="text-sm text-muted-foreground pt-2">
// //                 {interviewData.jobRole}{interviewData.company ? ` · ${interviewData.company}` : ''} · {interviewData.interviewType} · {interviewData.difficulty}
// //               </p>
// //               {hiringRec && (
// //                 <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
// //                   <BadgeCheck className="w-4 h-4" />Hiring Recommendation: {hiringRec}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* ── AI ANALYSIS ── */}
// //           {interviewData.overall_feedback && (
// //             <Card className="border-purple-500/20">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 text-purple-300">
// //                   <Brain className="w-5 h-5" />AI Interview Analysis
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-5">
// //                 <p className="text-foreground leading-relaxed text-[15px]">{interviewData.overall_feedback}</p>
// //                 {interviewData.improvements?.length > 0 && (
// //                   <div className="border-t border-white/5 pt-4">
// //                     <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
// //                       <TrendingUp className="w-4 h-4" />Areas That Need Improvement
// //                     </p>
// //                     <ul className="space-y-2">
// //                       {interviewData.improvements.map((imp: string, i: number) => (
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

// //           {/* ── CATEGORIES ── */}
// //           {categoryResults.length > 0 && (
// //             <div className="space-y-4">
// //               <h2 className="text-lg font-bold text-white flex items-center gap-2">
// //                 <TrendingUp className="w-5 h-5 text-purple-400" />Performance by Category
// //               </h2>
// //               {categoryResults.map((cat, i) => {
// //                 const catStage = getSkillStage(cat.score);
// //                 const CatIcon = getCategoryIcon(cat.name);
// //                 return (
// //                   <Card key={i} className={`${catStage.bg} ${catStage.border} border`}>
// //                     <CardContent className="pt-5 pb-5">
// //                       <div className="flex items-center justify-between mb-3">
// //                         <div className="flex items-center gap-2">
// //                           <CatIcon className={`w-5 h-5 ${catStage.color}`} />
// //                           <span className="font-semibold text-white">{cat.name}</span>
// //                         </div>
// //                         <div className={`flex items-center gap-2 text-sm font-bold ${catStage.color}`}>
// //                           <span>{catStage.emoji}</span><span>{catStage.stage}</span>
// //                         </div>
// //                       </div>
// //                       <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
// //                         <div className={`h-1.5 rounded-full transition-all duration-700 ${catStage.bar}`} style={{ width: `${cat.score}%` }} />
// //                       </div>
// //                       <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>
// //                       <div className="grid md:grid-cols-2 gap-4">
// //                         {cat.strengths?.length > 0 && (
// //                           <div>
// //                             <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
// //                               <CheckCircle className="w-3 h-3" />Strengths
// //                             </p>
// //                             <ul className="space-y-1">
// //                               {cat.strengths.map((s: string, j: number) => (
// //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
// //                                   <span className="text-green-500 mt-0.5">✓</span>{s}
// //                                 </li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}
// //                         {cat.improvements?.length > 0 && (
// //                           <div>
// //                             <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
// //                               <TrendingUp className="w-3 h-3" />To Improve
// //                             </p>
// //                             <ul className="space-y-1">
// //                               {cat.improvements.map((imp: string, j: number) => (
// //                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
// //                                   <ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
// //                                 </li>
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

// //           {/* ── STRENGTHS & IMPROVEMENTS ── */}
// //           {(interviewData.strengths?.length > 0 || interviewData.improvements?.length > 0) && (
// //             <div className="grid md:grid-cols-2 gap-4">
// //               {interviewData.strengths?.length > 0 && (
// //                 <Card className="border-green-500/20">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2 text-green-400 text-base">
// //                       <CheckCircle className="w-4 h-4" />What You Did Well
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {interviewData.strengths.map((s: string, i: number) => (
// //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
// //                           <span className="text-green-500 mt-0.5">✓</span>{s}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //               {interviewData.improvements?.length > 0 && (
// //                 <Card className="border-orange-500/20">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2 text-orange-400 text-base">
// //                       <TrendingUp className="w-4 h-4" />Growth Opportunities
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {interviewData.improvements.map((imp: string, i: number) => (
// //                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
// //                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //             </div>
// //           )}

// //           {/* ── WHAT'S NEXT ── */}
// //           <Card className="bg-purple-500/10 border-purple-500/20">
// //             <CardHeader>
// //               <CardTitle className="text-base text-purple-300 flex items-center gap-2">
// //                 <Zap className="w-4 h-4" />What To Do Next
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <ul className="space-y-2 text-sm text-gray-300">
// //                 {stage.level <= 2 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Study the STAR method and practice with 3 real examples from your experience</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Do a mock interview daily for the next 2 weeks</li>
// //                 </>}
// //                 {stage.level === 3 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Focus on adding specific metrics and outcomes to your answers</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice technical deep-dives to strengthen weak spots</li>
// //                 </>}
// //                 {stage.level >= 4 && <>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>You are close to top performance — refine delivery and pacing</li>
// //                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice with harder difficulty settings to sharpen your edge</li>
// //                 </>}
// //                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Re-interview in the same category to track your progress</li>
// //               </ul>
// //             </CardContent>
// //           </Card>

// //           {/* ── ACTIONS ── */}
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
// import { getInterviewResults, evaluateAndSaveResults } from '@/lib/interview-results';
// import { InterviewResult } from '@/types';
// import {
//   Trophy, Home, PlusCircle, TrendingUp, CheckCircle,
//   AlertCircle, Loader2, Target, Award, Star, Zap,
//   Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
// } from 'lucide-react';

// function getSkillStage(score: number | null) {
//   if (score === null || score === 0) return {
//     stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
//     bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
//     icon: Target, tagline: 'Evaluating your interview...', description: '',
//   };
//   if (score >= 90) return {
//     stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
//     bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
//     icon: Trophy, tagline: 'You are interview-ready at an expert level.',
//     description: 'Exceptional performance. You demonstrate mastery of the domain with depth, clarity and confidence.',
//   };
//   if (score >= 75) return {
//     stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
//     bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
//     icon: Award, tagline: 'Strong candidate — minor polish needed.',
//     description: 'You show strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
//   };
//   if (score >= 60) return {
//     stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
//     bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
//     icon: Zap, tagline: 'Solid foundation — keep building.',
//     description: 'You have a clear grasp of core concepts and communicate them reasonably well. Focused practice will elevate you significantly.',
//   };
//   if (score >= 40) return {
//     stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
//     bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
//     icon: Star, tagline: 'On the right path — needs more depth.',
//     description: 'You show awareness of the topics but answers need more structure, specifics, and confidence.',
//   };
//   return {
//     stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
//     bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
//     icon: Brain, tagline: 'Early stage — great time to build habits.',
//     description: 'This is the starting point. Focus on learning frameworks, practicing out loud, and studying real examples.',
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
//   const segmentColor = (i: number) => {
//     if (i >= filled) return 'bg-white/5';
//     if (filled <= 4) return 'bg-red-500';
//     if (filled <= 6) return 'bg-orange-400';
//     if (filled <= 9) return 'bg-green-400';
//     return 'bg-yellow-400';
//   };
//   return (
//     <div className="flex flex-col items-center gap-3 py-2">
//       <div className="flex items-end gap-1.5 h-16">
//         {Array.from({ length: total }).map((_, i) => {
//           const height = 16 + (i / (total - 1)) * 44;
//           return (
//             <div key={i} className={`w-5 rounded-sm transition-all duration-500 ${segmentColor(i)}`}
//               style={{ height: `${height}px`, transitionDelay: `${i * 60}ms`, opacity: i < filled ? 1 : 0.15 }} />
//           );
//         })}
//       </div>
//       <p className={`text-sm font-semibold tracking-widest uppercase ${stage.color}`}>{stage.stage}</p>
//     </div>
//   );
// }

// export default function InterviewResultsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { isAuthenticated, interviews, isLoading, updateInterview } = useApp();
//   const [results, setResults] = useState<InterviewResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [evaluating, setEvaluating] = useState(false);
//   const [evalStep, setEvalStep] = useState('');

//   const interview = interviews.find(i => i.id === params.id);

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     if (!isLoading && isAuthenticated) loadAndEvaluate();
//   }, [isAuthenticated, isLoading]);

//   const loadAndEvaluate = async () => {
//     try {
//       setLoading(true);
//       const data = await getInterviewResults(params.id as string);
//       if (!data) { setLoading(false); return; }

//       const interviewData = data.interview as any;

//       // If status is 'processing' — conversation JSON saved but Groq hasn't run yet
//       if (interviewData.status === 'processing' && interviewData.conversation_json?.length > 0) {
//         setLoading(false);
//         setEvaluating(true);
//         setEvalStep('🤖 Claude AI is reading your conversation...');

//         console.log('📤 Triggering Groq evaluation from results page...');

//         try {
//           const evalResult = await evaluateAndSaveResults(
//             interviewData.id,
//             interviewData.conversation_json,
//             interviewData.interviewType,
//             interviewData.jobRole,
//             interviewData.difficulty
//           );

//           setEvalStep('✅ Done! Loading your results...');

//           // Update local interview status
//           await updateInterview(interviewData.id, { status: 'completed' });

//           // Reload results from DB now that evaluation is saved
//           const freshData = await getInterviewResults(params.id as string);
//           setResults(freshData);
//         } catch (e) {
//           console.error('Evaluation on results page failed:', e);
//           // Still show whatever is in DB
//           setResults(data);
//         } finally {
//           setEvaluating(false);
//         }
//       } else {
//         // Already completed — just show results
//         setResults(data);
//         setLoading(false);
//       }
//     } catch (e) {
//       console.error('Error loading results:', e);
//       setLoading(false);
//     }
//   };

//   // ── LOADING STATE ──────────────────────────────────────────────────────────
//   if (isLoading || loading) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center space-y-3">
//             <Loader2 className="w-12 h-12 animate-spin mx-auto text-purple-500" />
//             <p className="text-muted-foreground">Loading your interview...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── GROQ EVALUATING STATE ─────────────────────────────────────────────────
//   if (evaluating) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center space-y-5 max-w-sm mx-auto px-4">
//             <div className="relative w-24 h-24 mx-auto">
//               <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
//               <Brain className="w-10 h-10 text-purple-400 absolute inset-0 m-auto" />
//             </div>
//             <h2 className="text-xl font-bold text-white">Generating Your Results</h2>
//             <p className="text-sm text-purple-300 animate-pulse">{evalStep}</p>
//             <p className="text-xs text-muted-foreground">
//               Claude AI is analyzing your full conversation and generating personalized feedback...
//             </p>
//             <div className="flex justify-center gap-1 pt-2">
//               {[0,1,2].map(i => (
//                 <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
//                   style={{ animationDelay: `${i * 0.15}s` }} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   if (!results) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <Card className="max-w-2xl mx-auto">
//             <CardContent className="pt-8 pb-8 text-center space-y-4">
//               <AlertCircle className="w-14 h-14 mx-auto text-yellow-500" />
//               <h2 className="text-2xl font-bold">Results Not Available</h2>
//               <p className="text-muted-foreground">This interview hasn't been completed yet or results are still being processed.</p>
//               <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   const { interview: interviewData } = results;
//   const stage = getSkillStage(interviewData.score);
//   const StageIcon = stage.icon;
//   const categoryResults: any[] = (interviewData as any).category_results || [];
//   const hiringRec: string = (interviewData as any).hiring_recommendation || '';

//   const recColor = hiringRec === 'Strong Yes' ? 'text-green-400 bg-green-500/10 border-green-500/30'
//     : hiringRec === 'Yes' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
//     : hiringRec === 'Maybe' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
//     : hiringRec === 'No' ? 'text-red-400 bg-red-500/10 border-red-500/30' : '';

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />
//       <div className="container mx-auto px-4 py-10">
//         <div className="max-w-3xl mx-auto space-y-6">

//           {/* ── HERO ── */}
//           <Card className={`${stage.bg} ${stage.border} border-2`}>
//             <CardContent className="pt-10 pb-8 text-center space-y-4">
//               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${stage.bg} ${stage.border} ${stage.color}`}>
//                 <StageIcon className="w-4 h-4" />{stage.stage} Level
//               </div>
//               <div className="text-5xl">{stage.emoji}</div>
//               <h1 className="text-3xl font-bold text-white">{stage.tagline}</h1>
//               {stage.description && <p className="text-muted-foreground max-w-xl mx-auto">{stage.description}</p>}
//               <SegmentMeter score={interviewData.score} stage={stage} />
//               <StageBar level={stage.level} />
//               <p className="text-sm text-muted-foreground pt-2">
//                 {interviewData.jobRole}{interviewData.company ? ` · ${interviewData.company}` : ''} · {interviewData.interviewType} · {interviewData.difficulty}
//               </p>
//               {hiringRec && (
//                 <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border ${recColor}`}>
//                   <BadgeCheck className="w-4 h-4" />Hiring Recommendation: {hiringRec}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* ── AI ANALYSIS ── */}
//           {interviewData.overall_feedback && (
//             <Card className="border-purple-500/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-purple-300">
//                   <Brain className="w-5 h-5" />AI Interview Analysis
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5">
//                 <p className="text-foreground leading-relaxed text-[15px]">{interviewData.overall_feedback}</p>
//                 {interviewData.improvements?.length > 0 && (
//                   <div className="border-t border-white/5 pt-4">
//                     <p className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
//                       <TrendingUp className="w-4 h-4" />Areas That Need Improvement
//                     </p>
//                     <ul className="space-y-2">
//                       {interviewData.improvements.map((imp: string, i: number) => (
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

//           {/* ── CATEGORIES ── */}
//           {categoryResults.length > 0 && (
//             <div className="space-y-4">
//               <h2 className="text-lg font-bold text-white flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-purple-400" />Performance by Category
//               </h2>
//               {categoryResults.map((cat, i) => {
//                 const catStage = getSkillStage(cat.score);
//                 const CatIcon = getCategoryIcon(cat.name);
//                 return (
//                   <Card key={i} className={`${catStage.bg} ${catStage.border} border`}>
//                     <CardContent className="pt-5 pb-5">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <CatIcon className={`w-5 h-5 ${catStage.color}`} />
//                           <span className="font-semibold text-white">{cat.name}</span>
//                         </div>
//                         <div className={`flex items-center gap-2 text-sm font-bold ${catStage.color}`}>
//                           <span>{catStage.emoji}</span><span>{catStage.stage}</span>
//                         </div>
//                       </div>
//                       <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
//                         <div className={`h-1.5 rounded-full transition-all duration-700 ${catStage.bar}`} style={{ width: `${cat.score}%` }} />
//                       </div>
//                       <p className="text-sm text-gray-300 mb-4 leading-relaxed">{cat.feedback}</p>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         {cat.strengths?.length > 0 && (
//                           <div>
//                             <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
//                               <CheckCircle className="w-3 h-3" />Strengths
//                             </p>
//                             <ul className="space-y-1">
//                               {cat.strengths.map((s: string, j: number) => (
//                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
//                                   <span className="text-green-500 mt-0.5">✓</span>{s}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                         {cat.improvements?.length > 0 && (
//                           <div>
//                             <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
//                               <TrendingUp className="w-3 h-3" />To Improve
//                             </p>
//                             <ul className="space-y-1">
//                               {cat.improvements.map((imp: string, j: number) => (
//                                 <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5">
//                                   <ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
//                                 </li>
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

//           {/* ── STRENGTHS & IMPROVEMENTS ── */}
//           {(interviewData.strengths?.length > 0 || interviewData.improvements?.length > 0) && (
//             <div className="grid md:grid-cols-2 gap-4">
//               {interviewData.strengths?.length > 0 && (
//                 <Card className="border-green-500/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-green-400 text-base">
//                       <CheckCircle className="w-4 h-4" />What You Did Well
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {interviewData.strengths.map((s: string, i: number) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
//                           <span className="text-green-500 mt-0.5">✓</span>{s}
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}
//               {interviewData.improvements?.length > 0 && (
//                 <Card className="border-orange-500/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-orange-400 text-base">
//                       <TrendingUp className="w-4 h-4" />Growth Opportunities
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {interviewData.improvements.map((imp: string, i: number) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
//                           <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           )}

//           {/* ── WHAT'S NEXT ── */}
//           <Card className="bg-purple-500/10 border-purple-500/20">
//             <CardHeader>
//               <CardTitle className="text-base text-purple-300 flex items-center gap-2">
//                 <Zap className="w-4 h-4" />What To Do Next
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2 text-sm text-gray-300">
//                 {stage.level <= 2 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Study the STAR method and practice with 3 real examples from your experience</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Do a mock interview daily for the next 2 weeks</li>
//                 </>}
//                 {stage.level === 3 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Focus on adding specific metrics and outcomes to your answers</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice technical deep-dives to strengthen weak spots</li>
//                 </>}
//                 {stage.level >= 4 && <>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>You are close to top performance — refine delivery and pacing</li>
//                   <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Practice with harder difficulty settings to sharpen your edge</li>
//                 </>}
//                 <li className="flex items-start gap-2"><span className="text-purple-400">→</span>Re-interview in the same category to track your progress</li>
//               </ul>
//             </CardContent>
//           </Card>

//           {/* ── ACTIONS ── */}
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
  AlertCircle, Loader2, Target, Award, Star, Zap,
  Brain, Users, Code, MessageSquare, BadgeCheck, ChevronRight
} from 'lucide-react';

function getSkillStage(score: number | null) {
  if (!score || score === 0) return {
    stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
    bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
    icon: Target, tagline: 'No score available.', description: '',
  };
  if (score >= 90) return {
    stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
    bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
    icon: Trophy, tagline: 'You are interview-ready at an expert level.',
    description: 'Exceptional performance. You demonstrate mastery with depth, clarity and confidence.',
  };
  if (score >= 75) return {
    stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
    bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
    icon: Award, tagline: 'Strong candidate — minor polish needed.',
    description: 'Strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
  };
  if (score >= 60) return {
    stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
    bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
    icon: Zap, tagline: 'Solid foundation — keep building.',
    description: 'Clear grasp of core concepts with reasonable communication. Focused practice will elevate you significantly.',
  };
  if (score >= 40) return {
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
  const { isAuthenticated, isLoading } = useApp();
  const [results, setResults] = useState<InterviewResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push('/auth/login'); return; }
    if (!isLoading && isAuthenticated) loadResults();
  }, [isAuthenticated, isLoading]);

  const loadResults = async () => {
    try {
      // Poll until status = completed (max 10 tries, 2s apart)
      // This handles the case where we redirect before DB write finishes
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
      setLoading(false);
    }
  };

  if (isLoading || loading) return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
            <Brain className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" />
          </div>
          <p className="text-white font-semibold">Generating your results...</p>
          <p className="text-muted-foreground text-sm">Claude AI is evaluating your interview</p>
          <div className="flex justify-center gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) return null;

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
                  <Brain className="w-5 h-5" />Claude AI Interview Analysis
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
                            <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Strengths</p>
                            <ul className="space-y-1">
                              {cat.strengths.map((s: string, j: number) => (
                                <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {cat.improvements?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" />To Improve</p>
                            <ul className="space-y-1">
                              {cat.improvements.map((imp: string, j: number) => (
                                <li key={j} className="text-xs text-gray-400 flex items-start gap-1.5"><ChevronRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
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
                  <CardHeader><CardTitle className="flex items-center gap-2 text-green-400 text-base"><CheckCircle className="w-4 h-4" />What You Did Well</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(iv as any).strengths.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-green-500 mt-0.5">✓</span>{s}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {(iv as any).improvements?.length > 0 && (
                <Card className="border-orange-500/20">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-orange-400 text-base"><TrendingUp className="w-4 h-4" />Growth Opportunities</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(iv as any).improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />{imp}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* WHAT'S NEXT */}
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader><CardTitle className="text-base text-purple-300 flex items-center gap-2"><Zap className="w-4 h-4" />What To Do Next</CardTitle></CardHeader>
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