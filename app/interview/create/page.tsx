// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Navbar } from '@/components/dashboard/navbar';
// // import { useApp } from '@/lib/context-supabase';
// // import { Sparkles, Loader2 } from 'lucide-react';

// // export default function CreateInterviewPage() {
// //   const router = useRouter();
// //   const { isAuthenticated, isLoading: authLoading, addInterview } = useApp();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [info, setInfo] = useState('');

// //   const [formData, setFormData] = useState({
// //     jobRole: '',
// //     company: '',
// //     interviewType: 'mixed' as 'technical' | 'behavioral' | 'mixed',
// //     difficulty: 'medium' as 'easy' | 'medium' | 'hard',
// //     numberOfQuestions: 5,
// //   });

// //   useEffect(() => {
// //     if (!authLoading && !isAuthenticated) {
// //       router.push('/auth/login');
// //     }
// //   }, [isAuthenticated, authLoading, router]);

// //   if (authLoading || !isAuthenticated) {
// //     return (
// //       <div className="min-h-screen gradient-bg flex items-center justify-center">
// //         <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
// //       </div>
// //     );
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError('');
// //     setInfo('');

// //     try {
// //       console.log('🚀 Starting question generation with:', formData);

// //       // Call AI API to generate questions
// //       const response = await fetch('/api/generate-questions', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       console.log('📡 Response status:', response.status);

// //       // Parse response
// //       const responseData = await response.json();
// //       console.log('📥 Full API Response:', responseData);

// //       // Check if response is OK
// //       if (!response.ok) {
// //         const errorMessage = responseData.details || responseData.error || 'Failed to generate questions';
// //         console.error('❌ API Error:', errorMessage);
// //         throw new Error(errorMessage);
// //       }

// //       // Destructure the response
// //       const { questions, usedFallback, message } = responseData;

// //       console.log('📊 Questions received:', questions);

// //       // Show info message if fallback was used
// //       if (usedFallback && message) {
// //         setInfo(message);
// //         console.log('⚠️ Using fallback questions:', message);
// //       } else {
// //         console.log('✅ AI generated questions successfully');
// //       }

// //       // Validate questions exist and is an array
// //       if (!questions || !Array.isArray(questions) || questions.length === 0) {
// //         throw new Error('No valid questions received from API');
// //       }

// //       console.log('✅ Questions validation passed:', questions.length, 'questions');

// //       // Format questions with IDs
// //       const formattedQuestions = questions.map((q: any, i: number) => ({
// //         id: `q${i + 1}`,
// //         question: q.question || '',
// //         category: q.category || 'General',
// //       }));

// //       console.log('📝 Formatted questions:', formattedQuestions);

// //       // Create interview with generated questions
// //       await addInterview({
// //         ...formData,
// //         questions: formattedQuestions,
// //         status: 'pending',
// //       });

// //       console.log('✅ Interview created successfully');

// //       // Navigate to dashboard
// //       router.push('/dashboard');

// //     } catch (err: any) {
// //       console.error('❌ Error creating interview:', err);
// //       setError(err.message || 'Failed to create interview. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen gradient-bg">
// //       <Navbar />

// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-2xl mx-auto">
// //           <div className="mb-8 animate-fadeIn">
// //             <h1 className="text-4xl font-bold mb-2">Create New Interview</h1>
// //             <p className="text-muted-foreground">
// //               Customize your mock interview with AI-generated questions
// //             </p>
// //           </div>

// //           <Card className="animate-slideUp">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Sparkles className="w-5 h-5 text-purple-500" />
// //                 Interview Details
// //               </CardTitle>
// //               <CardDescription>
// //                 Tell us about the position you're preparing for
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 {error && (
// //                   <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-shake">
// //                     <p className="text-sm text-red-400">❌ {error}</p>
// //                   </div>
// //                 )}

// //                 {info && (
// //                   <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 animate-fadeIn">
// //                     <p className="text-sm text-blue-400">ℹ️ {info}</p>
// //                   </div>
// //                 )}

// //                 <div className="space-y-2">
// //                   <Label htmlFor="jobRole">Job Role</Label>
// //                   <Input
// //                     id="jobRole"
// //                     placeholder="e.g. Senior Frontend Developer"
// //                     value={formData.jobRole}
// //                     onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="company">Company (Optional)</Label>
// //                   <Input
// //                     id="company"
// //                     placeholder="e.g. Google"
// //                     value={formData.company}
// //                     onChange={(e) => setFormData({ ...formData, company: e.target.value })}
// //                     disabled={isLoading}
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Interview Type</Label>
// //                   <div className="grid grid-cols-3 gap-3">
// //                     {['technical', 'behavioral', 'mixed'].map((type) => (
// //                       <button
// //                         key={type}
// //                         type="button"
// //                         disabled={isLoading}
// //                         onClick={() => setFormData({ ...formData, interviewType: type as any })}
// //                         className={`p-4 rounded-lg border-2 transition-all ${
// //                           formData.interviewType === type
// //                             ? 'border-purple-500 bg-purple-500/10 scale-105'
// //                             : 'border-border hover:border-purple-300 hover:scale-105'
// //                         } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                       >
// //                         <div className="font-medium capitalize">{type}</div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Difficulty Level</Label>
// //                   <div className="grid grid-cols-3 gap-3">
// //                     {['easy', 'medium', 'hard'].map((level) => (
// //                       <button
// //                         key={level}
// //                         type="button"
// //                         disabled={isLoading}
// //                         onClick={() => setFormData({ ...formData, difficulty: level as any })}
// //                         className={`p-4 rounded-lg border-2 transition-all ${
// //                           formData.difficulty === level
// //                             ? 'border-purple-500 bg-purple-500/10 scale-105'
// //                             : 'border-border hover:border-purple-300 hover:scale-105'
// //                         } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                       >
// //                         <div className="font-medium capitalize">{level}</div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="numberOfQuestions">Number of Questions</Label>
// //                   <Input
// //                     id="numberOfQuestions"
// //                     type="number"
// //                     min="3"
// //                     max="10"
// //                     value={formData.numberOfQuestions}
// //                     onChange={(e) => setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })}
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                   <p className="text-sm text-muted-foreground">Choose between 3-10 questions</p>
// //                 </div>

// //                 <div className="flex gap-3">
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     onClick={() => router.push('/dashboard')}
// //                     className="flex-1 hover-lift"
// //                     disabled={isLoading}
// //                   >
// //                     Cancel
// //                   </Button>
// //                   <Button
// //                     type="submit"
// //                     disabled={isLoading}
// //                     className="flex-1 gap-2 hover-lift"
// //                   >
// //                     {isLoading ? (
// //                       <>
// //                         <Loader2 className="w-4 h-4 animate-spin" />
// //                         Generating Questions...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Sparkles className="w-4 h-4" />
// //                         Create Interview
// //                       </>
// //                     )}
// //                   </Button>
// //                 </div>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import {
//   Sparkles, Loader2, Briefcase, Building2, Code2,
//   Users, Shuffle, Zap, Target, Flame, ChevronRight
// } from 'lucide-react';

// const interviewTypes = [
//   {
//     value: 'technical', label: 'Technical', icon: Code2,
//     desc: 'Coding, system design & problem solving',
//     color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30',
//     activeBg: 'bg-blue-500/10', activeBorder: 'border-blue-500/60',
//     activeText: 'text-blue-300', dot: 'bg-blue-400',
//   },
//   {
//     value: 'behavioral', label: 'Behavioral', icon: Users,
//     desc: 'STAR method, leadership & soft skills',
//     color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30',
//     activeBg: 'bg-emerald-500/10', activeBorder: 'border-emerald-500/60',
//     activeText: 'text-emerald-300', dot: 'bg-emerald-400',
//   },
//   {
//     value: 'mixed', label: 'Mixed', icon: Shuffle,
//     desc: 'Best of both — technical & behavioral',
//     color: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/30',
//     activeBg: 'bg-purple-500/10', activeBorder: 'border-purple-500/60',
//     activeText: 'text-purple-300', dot: 'bg-purple-400',
//   },
// ];

// const difficultyLevels = [
//   {
//     value: 'easy', label: 'Easy', icon: Zap,
//     desc: 'Entry level · Foundational questions',
//     activeBg: 'bg-emerald-500/10', activeBorder: 'border-emerald-500/60',
//     activeText: 'text-emerald-300', dot: 'bg-emerald-400',
//   },
//   {
//     value: 'medium', label: 'Medium', icon: Target,
//     desc: 'Mid level · Real interview difficulty',
//     activeBg: 'bg-amber-500/10', activeBorder: 'border-amber-500/60',
//     activeText: 'text-amber-300', dot: 'bg-amber-400',
//   },
//   {
//     value: 'hard', label: 'Hard', icon: Flame,
//     desc: 'Senior level · Challenging & in-depth',
//     activeBg: 'bg-red-500/10', activeBorder: 'border-red-500/60',
//     activeText: 'text-red-300', dot: 'bg-red-400',
//   },
// ];

// export default function CreateInterviewPage() {
//   const router = useRouter();
//   const { isAuthenticated, isLoading: authLoading, addInterview } = useApp();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [info, setInfo] = useState('');
//   const [formData, setFormData] = useState({
//     jobRole: '',
//     company: '',
//     interviewType: 'mixed' as 'technical' | 'behavioral' | 'mixed',
//     difficulty: 'medium' as 'easy' | 'medium' | 'hard',
//     numberOfQuestions: 5,
//   });

//   useEffect(() => {
//     if (!authLoading && !isAuthenticated) router.push('/auth/login');
//   }, [isAuthenticated, authLoading, router]);

//   if (authLoading || !isAuthenticated) {
//     return (
//       <div className="min-h-screen gradient-bg flex items-center justify-center">
//         <div className="relative">
//           <div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
//           <Sparkles className="w-5 h-5 text-purple-400 absolute inset-0 m-auto" />
//         </div>
//       </div>
//     );
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setInfo('');
//     try {
//       const response = await fetch('/api/generate-questions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const responseData = await response.json();
//       if (!response.ok) throw new Error(responseData.details || responseData.error || 'Failed to generate questions');
//       const { questions, usedFallback, message } = responseData;
//       if (usedFallback && message) setInfo(message);
//       if (!questions || !Array.isArray(questions) || questions.length === 0) throw new Error('No valid questions received from API');
//       const formattedQuestions = questions.map((q: any, i: number) => ({
//         id: `q${i + 1}`, question: q.question || '', category: q.category || 'General',
//       }));
//       await addInterview({ ...formData, questions: formattedQuestions, status: 'pending' });
//       router.push('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Failed to create interview. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Navbar />

//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="dashboard-orb orb-1" /><div className="dashboard-orb orb-2" />
//       </div>
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

//       <div className="relative z-10 container mx-auto px-4 py-10 max-w-2xl">

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />
//             <h1 className="text-3xl font-black text-white">Create New Interview</h1>
//           </div>
//           <p className="text-white/40 ml-4 pl-0.5 text-sm">AI will generate tailored questions for your target role</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {error && (
//             <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex gap-2">
//               <span>❌</span>{error}
//             </div>
//           )}
//           {info && (
//             <div className="px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 flex gap-2">
//               <span>ℹ️</span>{info}
//             </div>
//           )}

//           {/* Position Details */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 space-y-4">
//             <div className="flex items-center gap-2 mb-1">
//               <Briefcase className="w-4 h-4 text-purple-400" />
//               <h2 className="text-sm font-semibold text-white/80">Position Details</h2>
//             </div>
//             <div className="space-y-2">
//               <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Job Role *</label>
//               <input type="text" placeholder="e.g. Senior Frontend Developer"
//                 value={formData.jobRole} onChange={e => setFormData({ ...formData, jobRole: e.target.value })}
//                 required disabled={isLoading}
//                 className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50" />
//             </div>
//             <div className="space-y-2">
//               <label className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-1">
//                 <Building2 className="w-3 h-3" /> Company <span className="text-white/25 normal-case font-normal ml-1">(optional)</span>
//               </label>
//               <input type="text" placeholder="e.g. Google, Meta, Startup…"
//                 value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
//                 disabled={isLoading}
//                 className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50" />
//             </div>
//           </div>

//           {/* Interview Type */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Shuffle className="w-4 h-4 text-purple-400" />
//               <h2 className="text-sm font-semibold text-white/80">Interview Type</h2>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {interviewTypes.map(type => {
//                 const Icon = type.icon;
//                 const isActive = formData.interviewType === type.value;
//                 return (
//                   <button key={type.value} type="button" disabled={isLoading}
//                     onClick={() => setFormData({ ...formData, interviewType: type.value as any })}
//                     className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? `${type.activeBorder} ${type.activeBg}` : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
//                   >
//                     <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow-md ${isActive ? type.glow : ''} transition-shadow`}>
//                       <Icon className="w-4 h-4 text-white" />
//                     </div>
//                     <div className={`text-sm font-bold mb-1 ${isActive ? type.activeText : 'text-white/70'}`}>{type.label}</div>
//                     <div className="text-xs text-white/30 leading-tight">{type.desc}</div>
//                     {isActive && <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${type.dot}`} />}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Difficulty */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Target className="w-4 h-4 text-purple-400" />
//               <h2 className="text-sm font-semibold text-white/80">Difficulty Level</h2>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {difficultyLevels.map(level => {
//                 const isActive = formData.difficulty === level.value;
//                 return (
//                   <button key={level.value} type="button" disabled={isLoading}
//                     onClick={() => setFormData({ ...formData, difficulty: level.value as any })}
//                     className={`p-4 rounded-xl border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? `${level.activeBorder} ${level.activeBg}` : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className={`w-2 h-2 rounded-full ${isActive ? level.dot : 'bg-white/20'}`} />
//                       <span className={`text-sm font-bold ${isActive ? level.activeText : 'text-white/60'}`}>{level.label}</span>
//                     </div>
//                     <div className="text-xs text-white/30 leading-tight">{level.desc}</div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Questions slider */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-4 h-4 text-purple-400" />
//                 <h2 className="text-sm font-semibold text-white/80">Number of Questions</h2>
//               </div>
//               <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                 {formData.numberOfQuestions}
//               </span>
//             </div>
//             <input type="range" min="3" max="10" value={formData.numberOfQuestions}
//               onChange={e => setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })}
//               disabled={isLoading}
//               className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-50"
//               style={{ background: `linear-gradient(to right, #7c3aed ${((formData.numberOfQuestions - 3) / 7) * 100}%, rgba(255,255,255,0.1) ${((formData.numberOfQuestions - 3) / 7) * 100}%)` }}
//             />
//             <div className="flex justify-between text-xs text-white/25 mt-2">
//               <span>3 min</span>
//               <span>~{formData.numberOfQuestions * 3}–{formData.numberOfQuestions * 5} mins</span>
//               <span>10 max</span>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/40">
//             <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
//             <span>
//               Generating <strong className="text-white/60">{formData.numberOfQuestions}</strong>{' '}
//               <strong className="text-white/60">{formData.interviewType}</strong> questions at{' '}
//               <strong className="text-white/60">{formData.difficulty}</strong> difficulty
//               {formData.jobRole && <> for <strong className="text-white/60">{formData.jobRole}</strong></>}
//               {formData.company && <> at <strong className="text-white/60">{formData.company}</strong></>}
//             </span>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pb-8">
//             <button type="button" onClick={() => router.push('/dashboard')} disabled={isLoading}
//               className="flex-1 px-6 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200 text-sm font-medium disabled:opacity-40">
//               Cancel
//             </button>
//             <button type="submit" disabled={isLoading || !formData.jobRole}
//               className="flex-[2] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group">
//               {isLoading ? (
//                 <><Loader2 className="w-4 h-4 animate-spin" />Generating Questions…</>
//               ) : (
//                 <><Sparkles className="w-4 h-4" />Create Interview<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import {
  Sparkles, Loader2, Briefcase, Building2, Code2,
  Users, Shuffle, Zap, Target, Flame, ChevronRight
} from 'lucide-react';

const interviewTypes = [
  {
    value: 'technical', label: 'Technical', icon: Code2,
    desc: 'Coding, system design & problem solving',
    color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30',
    activeBg: 'bg-blue-500/10', activeBorder: 'border-blue-500/60',
    activeText: 'text-blue-300', dot: 'bg-blue-400',
  },
  {
    value: 'behavioral', label: 'Behavioral', icon: Users,
    desc: 'STAR method, leadership & soft skills',
    color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30',
    activeBg: 'bg-emerald-500/10', activeBorder: 'border-emerald-500/60',
    activeText: 'text-emerald-300', dot: 'bg-emerald-400',
  },
  {
    value: 'mixed', label: 'Mixed', icon: Shuffle,
    desc: 'Best of both — technical & behavioral',
    color: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/30',
    activeBg: 'bg-purple-500/10', activeBorder: 'border-purple-500/60',
    activeText: 'text-purple-300', dot: 'bg-purple-400',
  },
];

const difficultyLevels = [
  {
    value: 'easy', label: 'Easy', icon: Zap,
    desc: 'Entry level · Foundational questions',
    activeBg: 'bg-emerald-500/10', activeBorder: 'border-emerald-500/60',
    activeText: 'text-emerald-300', dot: 'bg-emerald-400',
  },
  {
    value: 'medium', label: 'Medium', icon: Target,
    desc: 'Mid level · Real interview difficulty',
    activeBg: 'bg-amber-500/10', activeBorder: 'border-amber-500/60',
    activeText: 'text-amber-300', dot: 'bg-amber-400',
  },
  {
    value: 'hard', label: 'Hard', icon: Flame,
    desc: 'Senior level · Challenging & in-depth',
    activeBg: 'bg-red-500/10', activeBorder: 'border-red-500/60',
    activeText: 'text-red-300', dot: 'bg-red-400',
  },
];

export default function CreateInterviewPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, addInterview } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({
    jobRole: '',
    company: '',
    interviewType: 'mixed' as 'technical' | 'behavioral' | 'mixed',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    numberOfQuestions: 5,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/auth/login');
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <Sparkles className="w-5 h-5 text-purple-400 absolute inset-0 m-auto" />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.details || responseData.error || 'Failed to generate questions');
      const { questions, usedFallback, message } = responseData;
      if (usedFallback && message) setInfo(message);
      if (!questions || !Array.isArray(questions) || questions.length === 0) throw new Error('No valid questions received from API');
      const formattedQuestions = questions.map((q: any, i: number) => ({
        id: `q${i + 1}`, question: q.question || '', category: q.category || 'General',
      }));
      await addInterview({ ...formData, questions: formattedQuestions, status: 'pending' });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="dashboard-orb orb-1" /><div className="dashboard-orb orb-2" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.008]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 container mx-auto px-4 py-10 max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />
            <h1 className="text-3xl font-black text-white">Create New Interview</h1>
          </div>
          <p className="text-white/40 ml-4 pl-0.5 text-sm">AI will generate tailored questions for your target role</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex gap-2">
              <span>❌</span>{error}
            </div>
          )}
          {info && (
            <div className="px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 flex gap-2">
              <span>ℹ️</span>{info}
            </div>
          )}

          {/* Position Details */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.06] backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white/80">Position Details</h2>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Job Role *</label>
              <input type="text" placeholder="e.g. Senior Frontend Developer"
                value={formData.jobRole} onChange={e => setFormData({ ...formData, jobRole: e.target.value })}
                required disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Company <span className="text-white/25 normal-case font-normal ml-1">(optional)</span>
              </label>
              <input type="text" placeholder="e.g. Google, Meta, Startup…"
                value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50" />
            </div>
          </div>

          {/* Interview Type */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.06] backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shuffle className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white/80">Interview Type</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {interviewTypes.map(type => {
                const Icon = type.icon;
                const isActive = formData.interviewType === type.value;
                return (
                  <button key={type.value} type="button" disabled={isLoading}
                    onClick={() => setFormData({ ...formData, interviewType: type.value as any })}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? `${type.activeBorder} ${type.activeBg}` : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow-md ${isActive ? type.glow : ''} transition-shadow`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className={`text-sm font-bold mb-1 ${isActive ? type.activeText : 'text-white/70'}`}>{type.label}</div>
                    <div className="text-xs text-white/30 leading-tight">{type.desc}</div>
                    {isActive && <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${type.dot}`} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.06] backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white/80">Difficulty Level</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {difficultyLevels.map(level => {
                const isActive = formData.difficulty === level.value;
                return (
                  <button key={level.value} type="button" disabled={isLoading}
                    onClick={() => setFormData({ ...formData, difficulty: level.value as any })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? `${level.activeBorder} ${level.activeBg}` : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${isActive ? level.dot : 'bg-white/20'}`} />
                      <span className={`text-sm font-bold ${isActive ? level.activeText : 'text-white/60'}`}>{level.label}</span>
                    </div>
                    <div className="text-xs text-white/30 leading-tight">{level.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions slider */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.06] backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-white/80">Number of Questions</h2>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {formData.numberOfQuestions}
              </span>
            </div>
            <input type="range" min="3" max="10" value={formData.numberOfQuestions}
              onChange={e => setFormData({ ...formData, numberOfQuestions: parseInt(e.target.value) })}
              disabled={isLoading}
              className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-50"
              style={{ background: `linear-gradient(to right, #7c3aed ${((formData.numberOfQuestions - 3) / 7) * 100}%, rgba(255,255,255,0.1) ${((formData.numberOfQuestions - 3) / 7) * 100}%)` }}
            />
            <div className="flex justify-between text-xs text-white/25 mt-2">
              <span>3 min</span>
              <span>~{formData.numberOfQuestions * 3}–{formData.numberOfQuestions * 5} mins</span>
              <span>10 max</span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.06] text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span>
              Generating <strong className="text-white/60">{formData.numberOfQuestions}</strong>{' '}
              <strong className="text-white/60">{formData.interviewType}</strong> questions at{' '}
              <strong className="text-white/60">{formData.difficulty}</strong> difficulty
              {formData.jobRole && <> for <strong className="text-white/60">{formData.jobRole}</strong></>}
              {formData.company && <> at <strong className="text-white/60">{formData.company}</strong></>}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-8">
            <button type="button" onClick={() => router.push('/dashboard')} disabled={isLoading}
              className="flex-1 px-6 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200 text-sm font-medium disabled:opacity-40">
              Cancel
            </button>
            <button type="submit" disabled={isLoading || !formData.jobRole}
              className="flex-[2] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group">
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Generating Questions…</>
              ) : (
                <><Sparkles className="w-4 h-4" />Create Interview<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}