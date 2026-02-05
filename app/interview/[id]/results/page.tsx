// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, useParams } from 'next/navigation';
// // import Link from 'next/link';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Navbar } from '@/components/dashboard/navbar';
// // import { useApp } from '@/lib/context-supabase';
// // import { getInterviewResults } from '@/lib/interview-results';
// // import { InterviewResult } from '@/types';
// // import { Trophy, Home, PlusCircle, TrendingUp, MessageSquare, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// // export default function InterviewResultsPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { isAuthenticated, interviews, isLoading } = useApp();
// //   const [results, setResults] = useState<InterviewResult | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   const interview = interviews.find(i => i.id === params.id);

// //   useEffect(() => {
// //     // Hnadled in protected route
// //     // if (!isLoading && !isAuthenticated) {
// //     //   router.push('/auth/login');
// //     //   return;

// //     // }
// //     if (interview && interview.status === 'completed') {
// //       loadResults();
// //     } else {
// //       setLoading(false);
// //     }
// // //   }, [isAuthenticated, interview, router]);

// //   }, [interview]);

// //   const loadResults = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getInterviewResults(params.id as string);
// //       console.log('📊 Loaded results:', data);
// //       setResults(data);
// //     } catch (error) {
// //       console.error('Error loading results:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!isAuthenticated) {
// //     return null;
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen gradient-bg">
// //         <Navbar />
// //         <div className="container mx-auto px-4 py-8">
// //           <div className="flex items-center justify-center min-h-[400px]">
// //             <div className="text-center">
// //               <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-500" />
// //               <p className="text-muted-foreground">Loading your results...</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!interview || interview.status !== 'completed' || !results) {
// //     return (
// //       <div className="min-h-screen gradient-bg">
// //         <Navbar />
// //         <div className="container mx-auto px-4 py-8">
// //           <Card className="max-w-2xl mx-auto">
// //             <CardContent className="pt-6 text-center">
// //               <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
// //               <h2 className="text-2xl font-bold mb-2">Results Not Available</h2>
// //               <p className="text-muted-foreground mb-6">
// //                 This interview hasn&apos;t been completed yet or results are still being processed.
// //               </p>
// //               <Link href="/dashboard">
// //                 <Button>Back to Dashboard</Button>
// //               </Link>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { interview: interviewData, answers } = results;
// //   const score = interviewData.score || 0;

// //   const scoreColor =
// //     score >= 80 ? 'text-green-500' :
// //     score >= 60 ? 'text-yellow-500' :
// //     'text-red-500';

// //   const performanceMessage =
// //     score >= 80 ? 'Excellent Performance!' :
// //     score >= 60 ? 'Good Job!' :
// //     'Keep Practicing!';

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />

// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-4xl mx-auto">
// //           {/* Score Card */}
// //           <Card className="mb-8 card-gradient">
// //             <CardContent className="pt-12 pb-12 text-center">
// //               <div className="flex justify-center mb-4">
// //                 <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center">
// //                   <Trophy className="w-16 h-16 text-yellow-500" />
// //                 </div>
// //               </div>
// //               <h1 className="text-4xl font-bold mb-2">{performanceMessage}</h1>
// //               <div className={`text-7xl font-bold mb-4 ${scoreColor}`}>
// //                 {score}%
// //               </div>
// //               <p className="text-muted-foreground text-lg">
// //                 {interviewData.jobRole} at {interviewData.company || 'your target company'}
// //               </p>
// //               <div className="mt-4 text-sm text-muted-foreground">
// //                 Completed on {interviewData.completedAt?.toLocaleDateString()} at {interviewData.completedAt?.toLocaleTimeString()}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Overall Feedback */}
// //           {interviewData.overall_feedback && (
// //             <Card className="mb-8">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <MessageSquare className="w-5 h-5" />
// //                   Overall Feedback
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <p className="text-foreground leading-relaxed">
// //                   {interviewData.overall_feedback}
// //                 </p>
// //               </CardContent>
// //             </Card>
// //           )}

// //           {/* Strengths & Improvements */}
// //           {(interviewData.strengths && interviewData.strengths.length > 0) ||
// //            (interviewData.improvements && interviewData.improvements.length > 0) ? (
// //             <div className="grid md:grid-cols-2 gap-6 mb-8">
// //               {/* Strengths */}
// //               {interviewData.strengths && interviewData.strengths.length > 0 && (
// //                 <Card className="border-green-500/20">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2 text-green-500">
// //                       <CheckCircle className="w-5 h-5" />
// //                       Key Strengths
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {interviewData.strengths.map((strength, index) => (
// //                         <li key={index} className="flex items-start gap-2 text-sm">
// //                           <span className="text-green-500 mt-0.5">✓</span>
// //                           <span>{strength}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* Improvements */}
// //               {interviewData.improvements && interviewData.improvements.length > 0 && (
// //                 <Card className="border-orange-500/20">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2 text-orange-500">
// //                       <TrendingUp className="w-5 h-5" />
// //                       Areas for Improvement
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <ul className="space-y-2">
// //                       {interviewData.improvements.map((improvement, index) => (
// //                         <li key={index} className="flex items-start gap-2 text-sm">
// //                           <span className="text-orange-500 mt-0.5">→</span>
// //                           <span>{improvement}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               )}
// //             </div>
// //           ) : null}

// //           {/* Question Breakdown */}
// //           <Card className="mb-8">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <TrendingUp className="w-5 h-5" />
// //                 Question-by-Question Analysis
// //               </CardTitle>
// //               <CardDescription>
// //                 Detailed feedback on each of your responses
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               {answers.length > 0 ? (
// //                 answers.map((answer) => {
// //                   const answerScore = answer.score || 0;
// //                   const answerScoreColor =
// //                     answerScore >= 80 ? 'text-green-500' :
// //                     answerScore >= 60 ? 'text-yellow-500' :
// //                     answerScore === 0 ? 'text-gray-500' :
// //                     'text-red-500';

// //                   return (
// //                     <div key={answer.id} className="border-b last:border-0 pb-6 last:pb-0">
// //                       <div className="flex items-start justify-between mb-3">
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <span className="text-xs text-muted-foreground">
// //                               Question {answer.question_index + 1}
// //                             </span>
// //                             <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
// //                               {answer.question_category}
// //                             </span>
// //                           </div>
// //                           <h4 className="font-semibold text-white">{answer.question_text}</h4>
// //                         </div>
// //                         <div className={`ml-4 text-2xl font-bold ${answerScoreColor} flex items-center gap-2`}>
// //                           {answerScore === 0 ? (
// //                             <XCircle className="w-6 h-6" />
// //                           ) : (
// //                             `${answerScore}%`
// //                           )}
// //                         </div>
// //                       </div>

// //                       {/* User's Answer */}
// //                       <div className="mb-3">
// //                         <div className="text-sm font-medium text-muted-foreground mb-1">
// //                           Your Answer:
// //                         </div>
// //                         <p className="text-sm bg-muted p-3 rounded-md">
// //                           {answer.user_answer || 'No answer provided'}
// //                         </p>
// //                       </div>

// //                       {/* AI Feedback */}
// //                       {answer.feedback && (
// //                         <div className="mb-3">
// //                           <div className="text-sm font-medium text-muted-foreground mb-1">
// //                             Feedback:
// //                           </div>
// //                           <p className="text-sm text-foreground">
// //                             {answer.feedback}
// //                           </p>
// //                         </div>
// //                       )}

// //                       {/* Strengths & Improvements for this answer */}
// //                       <div className="grid md:grid-cols-2 gap-4 mt-3">
// //                         {answer.strengths && answer.strengths.length > 0 && (
// //                           <div>
// //                             <div className="text-xs font-medium text-green-400 mb-1">
// //                               Strengths:
// //                             </div>
// //                             <ul className="text-xs space-y-1">
// //                               {answer.strengths.map((strength, i) => (
// //                                 <li key={i} className="flex items-start gap-1">
// //                                   <span className="text-green-500">✓</span>
// //                                   <span className="text-muted-foreground">{strength}</span>
// //                                 </li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}

// //                         {answer.improvements && answer.improvements.length > 0 && (
// //                           <div>
// //                             <div className="text-xs font-medium text-orange-400 mb-1">
// //                               Improvements:
// //                             </div>
// //                             <ul className="text-xs space-y-1">
// //                               {answer.improvements.map((improvement, i) => (
// //                                 <li key={i} className="flex items-start gap-1">
// //                                   <span className="text-orange-500">→</span>
// //                                   <span className="text-muted-foreground">{improvement}</span>
// //                                 </li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //               ) : (
// //                 <p className="text-center text-muted-foreground py-8">
// //                   No detailed answers available for this interview.
// //                 </p>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* Action Buttons */}
// //           <div className="grid md:grid-cols-2 gap-4">
// //             <Button
// //               variant="outline"
// //               className="w-full gap-2"
// //               size="lg"
// //               onClick={() => router.push('/dashboard')}
// //             >
// //               <Home className="w-5 h-5" />
// //               Back to Dashboard
// //             </Button>
// //             <Button
// //               className="w-full gap-2"
// //               size="lg"
// //               onClick={() => router.push('/interview/create')}
// //             >
// //               <PlusCircle className="w-5 h-5" />
// //               Practice Again
// //             </Button>
// //           </div>

// //           {/* Tips */}
// //           <Card className="mt-8 bg-purple-500/10 border-purple-500/20">
// //             <CardHeader>
// //               <CardTitle className="text-lg">Tips for Improvement</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <ul className="space-y-2 text-sm text-muted-foreground">
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-purple-500 mt-0.5">•</span>
// //                   <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-purple-500 mt-0.5">•</span>
// //                   <span>Provide specific examples from your experience to back up your claims</span>
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-purple-500 mt-0.5">•</span>
// //                   <span>Take a moment to think before answering - it&apos;s okay to pause</span>
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-purple-500 mt-0.5">•</span>
// //                   <span>Practice regularly to build confidence and improve your communication skills</span>
// //                 </li>
// //               </ul>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { getInterviewResults } from '@/lib/interview-results';
// import { InterviewResult } from '@/types';
// import { Trophy, Home, PlusCircle, TrendingUp, MessageSquare, Loader2, CheckCircle, AlertCircle, Star, Award, Target } from 'lucide-react';

// // Helper function to get performance level without showing exact score
// function getPerformanceLevel(score: number | null) {
//   if (score === null || score === 0) {
//     return {
//       level: 'needs-practice',
//       label: 'Needs Practice',
//       color: 'text-orange-400',
//       bgColor: 'bg-orange-500/20',
//       borderColor: 'border-orange-500/30',
//       icon: Target,
//       message: 'Keep practicing! Every interview makes you better.',
//       emoji: '📚'
//     };
//   }

//   if (score >= 80) {
//     return {
//       level: 'excellent',
//       label: 'Excellent',
//       color: 'text-green-400',
//       bgColor: 'bg-green-500/20',
//       borderColor: 'border-green-500/30',
//       icon: Trophy,
//       message: 'Outstanding performance! You\'re ready for this role.',
//       emoji: '🏆'
//     };
//   } else if (score >= 60) {
//     return {
//       level: 'good',
//       label: 'Good',
//       color: 'text-blue-400',
//       bgColor: 'bg-blue-500/20',
//       borderColor: 'border-blue-500/30',
//       icon: Award,
//       message: 'Great effort! Review the feedback to improve further.',
//       emoji: '⭐'
//     };
//   } else if (score >= 40) {
//     return {
//       level: 'fair',
//       label: 'Fair',
//       color: 'text-yellow-400',
//       bgColor: 'bg-yellow-500/20',
//       borderColor: 'border-yellow-500/30',
//       icon: Star,
//       message: 'You\'re on the right track. Focus on the improvement areas.',
//       emoji: '💪'
//     };
//   } else {
//     return {
//       level: 'needs-practice',
//       label: 'Needs Practice',
//       color: 'text-orange-400',
//       bgColor: 'bg-orange-500/20',
//       borderColor: 'border-orange-500/30',
//       icon: Target,
//       message: 'Keep practicing! Review the feedback and try again.',
//       emoji: '📚'
//     };
//   }
// }

// // Question performance indicator without exact score
// function getQuestionPerformance(score: number | null) {
//   if (score === null || score === 0) {
//     return {
//       label: 'Incomplete',
//       icon: '⚪',
//       color: 'text-gray-400'
//     };
//   } else if (score >= 80) {
//     return {
//       label: 'Strong',
//       icon: '🟢',
//       color: 'text-green-400'
//     };
//   } else if (score >= 60) {
//     return {
//       label: 'Good',
//       icon: '🔵',
//       color: 'text-blue-400'
//     };
//   } else if (score >= 40) {
//     return {
//       label: 'Fair',
//       icon: '🟡',
//       color: 'text-yellow-400'
//     };
//   } else {
//     return {
//       label: 'Needs Work',
//       icon: '🟠',
//       color: 'text-orange-400'
//     };
//   }
// }

// export default function InterviewResultsPage() {
//   const router = useRouter();
//   const params = useParams();
// //   const { isAuthenticated, interviews } = useApp();
//   const { isAuthenticated, interviews, isLoading } = useApp();
//   const [results, setResults] = useState<InterviewResult | null>(null);
//   const [loading, setLoading] = useState(true);

//   const interview = interviews.find(i => i.id === params.id);

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push('/auth/login');
//     }

// //       useEffect(() => {
// //     if (!isLoading && !isAuthenticated) {
// //       router.push('/auth/login'); // redirect if not authenticated
// //     }
// //   }, [isAuthenticated, isLoading, router]);

//     if (interview && interview.status === 'completed') {
//       loadResults();
//     }
//     else {
//         loadResults();
//     //   setLoading(false);
//     }
//   }, [isAuthenticated, isLoading, router]);

//   const loadResults = async () => {
//     try {
//       setLoading(true);
//       const data = await getInterviewResults(params.id as string);
//       console.log('📊 Loaded results:', data);
//       setResults(data);
//     } catch (error) {
//       console.error('Error loading results:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isAuthenticated) {
//     return null;
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-500" />
//               <p className="text-muted-foreground">Loading your results...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!interview || interview.status !== 'completed' || !results) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <Card className="max-w-2xl mx-auto">
//             <CardContent className="pt-6 text-center">
//               <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
//               <h2 className="text-2xl font-bold mb-2">Results Not Available</h2>
//               <p className="text-muted-foreground mb-6">
//                 This interview hasn&apos;t been completed yet or results are still being processed.
//               </p>
//               <Button onClick={() => router.push('/dashboard')}>
//                 Back to Dashboard
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   const { interview: interviewData, answers } = results;
//   const performance = getPerformanceLevel(interviewData.score);
//   const PerformanceIcon = performance.icon;

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />

//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Performance Badge Card */}
//           <Card className={`mb-8 ${performance.bgColor} ${performance.borderColor} border-2`}>
//             <CardContent className="pt-12 pb-12 text-center">
//               <div className="flex justify-center mb-4">
//                 <div className={`w-32 h-32 rounded-full ${performance.bgColor} flex items-center justify-center`}>
//                   <PerformanceIcon className={`w-16 h-16 ${performance.color}`} />
//                 </div>
//               </div>
//               <div className="text-6xl mb-4">{performance.emoji}</div>
//               <h1 className="text-4xl font-bold mb-2">{performance.label} Performance!</h1>
//               <p className="text-lg text-muted-foreground mb-2">
//                 {performance.message}
//               </p>
//               <p className="text-muted-foreground">
//                 {interviewData.jobRole} at {interviewData.company || 'your target company'}
//               </p>
//               <div className="mt-4 text-sm text-muted-foreground">
//                 Completed on {interviewData.completedAt?.toLocaleDateString()} at {interviewData.completedAt?.toLocaleTimeString()}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Overall Feedback */}
//           {interviewData.overall_feedback && (
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MessageSquare className="w-5 h-5" />
//                   Overall Feedback
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-foreground leading-relaxed">
//                   {interviewData.overall_feedback}
//                 </p>
//               </CardContent>
//             </Card>
//           )}

//           {/* Strengths & Improvements */}
//           {(interviewData.strengths && interviewData.strengths.length > 0) ||
//            (interviewData.improvements && interviewData.improvements.length > 0) ? (
//             <div className="grid md:grid-cols-2 gap-6 mb-8">
//               {/* Strengths */}
//               {interviewData.strengths && interviewData.strengths.length > 0 && (
//                 <Card className="border-green-500/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-green-500">
//                       <CheckCircle className="w-5 h-5" />
//                       What You Did Well
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {interviewData.strengths.map((strength, index) => (
//                         <li key={index} className="flex items-start gap-2 text-sm">
//                           <span className="text-green-500 mt-0.5">✓</span>
//                           <span>{strength}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Improvements */}
//               {interviewData.improvements && interviewData.improvements.length > 0 && (
//                 <Card className="border-orange-500/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-orange-500">
//                       <TrendingUp className="w-5 h-5" />
//                       Growth Opportunities
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {interviewData.improvements.map((improvement, index) => (
//                         <li key={index} className="flex items-start gap-2 text-sm">
//                           <span className="text-orange-500 mt-0.5">→</span>
//                           <span>{improvement}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           ) : null}

//           {/* Question Breakdown */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 Question-by-Question Analysis
//               </CardTitle>
//               <CardDescription>
//                 Detailed feedback on each of your responses
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {answers.length > 0 ? (
//                 answers.map((answer) => {
//                   const questionPerf = getQuestionPerformance(answer.score);

//                   return (
//                     <div key={answer.id} className="border-b last:border-0 pb-6 last:pb-0">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="text-xs text-muted-foreground">
//                               Question {answer.question_index + 1}
//                             </span>
//                             <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
//                               {answer.question_category}
//                             </span>
//                           </div>
//                           <h4 className="font-semibold text-white">{answer.question_text}</h4>
//                         </div>
//                         <div className={`ml-4 flex items-center gap-2 ${questionPerf.color}`}>
//                           <span className="text-2xl">{questionPerf.icon}</span>
//                           <span className="font-semibold">{questionPerf.label}</span>
//                         </div>
//                       </div>

//                       {/* User's Answer */}
//                       <div className="mb-3">
//                         <div className="text-sm font-medium text-muted-foreground mb-1">
//                           Your Answer:
//                         </div>
//                         <p className="text-sm bg-muted p-3 rounded-md">
//                           {answer.user_answer || 'No answer provided'}
//                         </p>
//                       </div>

//                       {/* AI Feedback */}
//                       {answer.feedback && (
//                         <div className="mb-3">
//                           <div className="text-sm font-medium text-muted-foreground mb-1">
//                             Feedback:
//                           </div>
//                           <p className="text-sm text-foreground">
//                             {answer.feedback}
//                           </p>
//                         </div>
//                       )}

//                       {/* Strengths & Improvements for this answer */}
//                       <div className="grid md:grid-cols-2 gap-4 mt-3">
//                         {answer.strengths && answer.strengths.length > 0 && (
//                           <div>
//                             <div className="text-xs font-medium text-green-400 mb-1">
//                               What Worked:
//                             </div>
//                             <ul className="text-xs space-y-1">
//                               {answer.strengths.map((strength, i) => (
//                                 <li key={i} className="flex items-start gap-1">
//                                   <span className="text-green-500">✓</span>
//                                   <span className="text-muted-foreground">{strength}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {answer.improvements && answer.improvements.length > 0 && (
//                           <div>
//                             <div className="text-xs font-medium text-orange-400 mb-1">
//                               Next Steps:
//                             </div>
//                             <ul className="text-xs space-y-1">
//                               {answer.improvements.map((improvement, i) => (
//                                 <li key={i} className="flex items-start gap-1">
//                                   <span className="text-orange-500">→</span>
//                                   <span className="text-muted-foreground">{improvement}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-center text-muted-foreground py-8">
//                   No detailed answers available for this interview.
//                 </p>
//               )}
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <Button
//               variant="outline"
//               className="w-full gap-2"
//               size="lg"
//               onClick={() => router.push('/dashboard')}
//             >
//               <Home className="w-5 h-5" />
//               Back to Dashboard
//             </Button>
//             <Button
//               className="w-full gap-2"
//               size="lg"
//               onClick={() => router.push('/interview/create')}
//             >
//               <PlusCircle className="w-5 h-5" />
//               Practice Again
//             </Button>
//           </div>

//           {/* Tips */}
//           <Card className="mt-8 bg-purple-500/10 border-purple-500/20">
//             <CardHeader>
//               <CardTitle className="text-lg">Keep Growing 🌱</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li className="flex items-start gap-2">
//                   <span className="text-purple-500 mt-0.5">•</span>
//                   <span>Every interview is a learning opportunity - focus on growth, not perfection</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-purple-500 mt-0.5">•</span>
//                   <span>Review the feedback and practice the areas marked for improvement</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-purple-500 mt-0.5">•</span>
//                   <span>Use the STAR method for behavioral questions to structure your answers</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-purple-500 mt-0.5">•</span>
//                   <span>Practice regularly - consistency is key to improvement</span>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import { getInterviewResults } from '@/lib/interview-results';
import { InterviewResult } from '@/types';
import { Trophy, Home, PlusCircle, TrendingUp, MessageSquare, Loader2, CheckCircle, AlertCircle, Star, Award, Target } from 'lucide-react';

// Helper function to get performance level without showing exact score
function getPerformanceLevel(score: number | null) {
  if (score === null || score === 0) {
    return {
      level: 'needs-practice',
      label: 'Needs Practice',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      icon: Target,
      message: 'Keep practicing! Every interview makes you better.',
      emoji: '📚'
    };
  }

  if (score >= 80) {
    return {
      level: 'excellent',
      label: 'Excellent',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      icon: Trophy,
      message: 'Outstanding performance! You\'re ready for this role.',
      emoji: '🏆'
    };
  } else if (score >= 60) {
    return {
      level: 'good',
      label: 'Good',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      icon: Award,
      message: 'Great effort! Review the feedback to improve further.',
      emoji: '⭐'
    };
  } else if (score >= 40) {
    return {
      level: 'fair',
      label: 'Fair',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
      icon: Star,
      message: 'You\'re on the right track. Focus on the improvement areas.',
      emoji: '💪'
    };
  } else {
    return {
      level: 'needs-practice',
      label: 'Needs Practice',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      icon: Target,
      message: 'Keep practicing! Review the feedback and try again.',
      emoji: '📚'
    };
  }
}

// Question performance indicator without exact score
function getQuestionPerformance(score: number | null) {
  if (score === null || score === 0) {
    return {
      label: 'Incomplete',
      icon: '⚪',
      color: 'text-gray-400'
    };
  } else if (score >= 80) {
    return {
      label: 'Strong',
      icon: '🟢',
      color: 'text-green-400'
    };
  } else if (score >= 60) {
    return {
      label: 'Good',
      icon: '🔵',
      color: 'text-blue-400'
    };
  } else if (score >= 40) {
    return {
      label: 'Fair',
      icon: '🟡',
      color: 'text-yellow-400'
    };
  } else {
    return {
      label: 'Needs Work',
      icon: '🟠',
      color: 'text-orange-400'
    };
  }
}

export default function InterviewResultsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, interviews, isLoading } = useApp();
  const [results, setResults] = useState<InterviewResult | null>(null);
  const [loading, setLoading] = useState(true);

  const interview = interviews.find(i => i.id === params.id);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!isLoading && isAuthenticated) {
      loadResults();
    }
  }, [isAuthenticated, isLoading, router]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const data = await getInterviewResults(params.id as string);
      console.log('📊 Loaded results:', data);
      setResults(data);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-500" />
              <p className="text-muted-foreground">Loading your results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!interview || interview.status !== 'completed' || !results) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Results Not Available</h2>
              <p className="text-muted-foreground mb-6">
                This interview hasn&apos;t been completed yet or results are still being processed.
              </p>
              <Button onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { interview: interviewData, answers } = results;
  const performance = getPerformanceLevel(interviewData.score);
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Performance Badge Card */}
          <Card className={`mb-8 ${performance.bgColor} ${performance.borderColor} border-2`}>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-32 h-32 rounded-full ${performance.bgColor} flex items-center justify-center`}>
                  <PerformanceIcon className={`w-16 h-16 ${performance.color}`} />
                </div>
              </div>
              <div className="text-6xl mb-4">{performance.emoji}</div>
              <h1 className="text-4xl font-bold mb-2">{performance.label} Performance!</h1>
              <p className="text-lg text-muted-foreground mb-2">
                {performance.message}
              </p>
              <p className="text-muted-foreground">
                {interviewData.jobRole} at {interviewData.company || 'your target company'}
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                Completed on {interviewData.completedAt?.toLocaleDateString()} at {interviewData.completedAt?.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>

          {/* Overall Feedback */}
          {interviewData.overall_feedback && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Overall Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {interviewData.overall_feedback}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Strengths & Improvements */}
          {(interviewData.strengths && interviewData.strengths.length > 0) ||
           (interviewData.improvements && interviewData.improvements.length > 0) ? (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              {interviewData.strengths && interviewData.strengths.length > 0 && (
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-500">
                      <CheckCircle className="w-5 h-5" />
                      What You Did Well
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {interviewData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Improvements */}
              {interviewData.improvements && interviewData.improvements.length > 0 && (
                <Card className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-500">
                      <TrendingUp className="w-5 h-5" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {interviewData.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-0.5">→</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}

          {/* Question Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Question-by-Question Analysis
              </CardTitle>
              <CardDescription>
                Detailed feedback on each of your responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {answers.length > 0 ? (
                answers.map((answer) => {
                  const questionPerf = getQuestionPerformance(answer.score);

                  return (
                    <div key={answer.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">
                              Question {answer.question_index + 1}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
                              {answer.question_category}
                            </span>
                          </div>
                          <h4 className="font-semibold text-white">{answer.question_text}</h4>
                        </div>
                        <div className={`ml-4 flex items-center gap-2 ${questionPerf.color}`}>
                          <span className="text-2xl">{questionPerf.icon}</span>
                          <span className="font-semibold">{questionPerf.label}</span>
                        </div>
                      </div>

                      {/* User's Answer */}
                      <div className="mb-3">
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Your Answer:
                        </div>
                        <p className="text-sm bg-muted p-3 rounded-md">
                          {answer.user_answer || 'No answer provided'}
                        </p>
                      </div>

                      {/* AI Feedback */}
                      {answer.feedback && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            Feedback:
                          </div>
                          <p className="text-sm text-foreground">
                            {answer.feedback}
                          </p>
                        </div>
                      )}

                      {/* Strengths & Improvements for this answer */}
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {answer.strengths && answer.strengths.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-green-400 mb-1">
                              What Worked:
                            </div>
                            <ul className="text-xs space-y-1">
                              {answer.strengths.map((strength, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-green-500">✓</span>
                                  <span className="text-muted-foreground">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {answer.improvements && answer.improvements.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-orange-400 mb-1">
                              Next Steps:
                            </div>
                            <ul className="text-xs space-y-1">
                              {answer.improvements.map((improvement, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-orange-500">→</span>
                                  <span className="text-muted-foreground">{improvement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No detailed answers available for this interview.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              size="lg"
              onClick={() => router.push('/dashboard')}
            >
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Button>
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => router.push('/interview/create')}
            >
              <PlusCircle className="w-5 h-5" />
              Practice Again
            </Button>
          </div>

          {/* Tips */}
          <Card className="mt-8 bg-purple-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-lg">Keep Growing 🌱</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Every interview is a learning opportunity - focus on growth, not perfection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Review the feedback and practice the areas marked for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Use the STAR method for behavioral questions to structure your answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Practice regularly - consistency is key to improvement</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


//new code