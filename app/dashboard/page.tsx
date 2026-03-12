// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { PlusCircle, Clock, CheckCircle, TrendingUp, Calendar, Trash2, Loader2, Zap, BarChart3, Target } from 'lucide-react';

// export default function DashboardPage() {
//   const router = useRouter();
//   const { user, interviews, isAuthenticated, isLoading, deleteInterview } = useApp();
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);
//   const [loadingTimedOut, setLoadingTimedOut] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ✅ Safety net: if isLoading is stuck for > 3s, force-check auth
//   useEffect(() => {
//     if (!isLoading) return;
//     const timer = setTimeout(() => setLoadingTimedOut(true), 3000);
//     return () => clearTimeout(timer);
//   }, [isLoading]);

//   // ✅ FIX: Wait for auth to resolve before rendering (but never wait more than 3s)
//   if (!mounted || (isLoading && !loadingTimedOut)) {
//     return (
//       <div className="min-h-screen gradient-bg flex flex-col items-center justify-center gap-4">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Zap className="w-6 h-6 text-purple-400" />
//           </div>
//         </div>
//         <p className="text-purple-300/70 text-sm font-medium tracking-widest uppercase animate-pulse">
//           Loading Dashboard…
//         </p>
//       </div>
//     );
//   }

//   // ✅ FIX: Redirect to login instead of returning blank null
//   if (!isAuthenticated) {
//     router.push('/auth/login');
//     return null;
//   }

//   const completedInterviews = interviews.filter(i => i.status === 'completed');
//   const pendingInterviews = interviews.filter(i => i.status === 'pending');
//   const inProgressInterviews = interviews.filter(i => i.status === 'in-progress');
//   const averageScore =
//     completedInterviews.length > 0
//       ? Math.round(
//           completedInterviews.reduce((sum, i) => sum + (i.score || 0), 0) /
//             completedInterviews.length
//         )
//       : 0;

//   const handleDelete = async (e: React.MouseEvent, interviewId: string) => {
//     e.stopPropagation();
//     if (!confirm('Are you sure you want to delete this interview? This action cannot be undone.'))
//       return;
//     try {
//       setDeletingId(interviewId);
//       await deleteInterview(interviewId);
//     } catch (error) {
//       console.error('Error deleting interview:', error);
//       alert('Failed to delete interview. Please try again.');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const stats = [
//     {
//       label: 'Total Interviews',
//       value: interviews.length,
//       icon: <Calendar className="h-5 w-5" />,
//       color: 'from-violet-500 to-purple-600',
//       bg: 'bg-violet-500/10',
//       iconColor: 'text-violet-400',
//       delay: '100ms',
//     },
//     {
//       label: 'Completed',
//       value: completedInterviews.length,
//       icon: <CheckCircle className="h-5 w-5" />,
//       color: 'from-emerald-500 to-green-600',
//       bg: 'bg-emerald-500/10',
//       iconColor: 'text-emerald-400',
//       delay: '200ms',
//     },
//     {
//       label: 'Pending',
//       value: pendingInterviews.length,
//       icon: <Clock className="h-5 w-5" />,
//       color: 'from-amber-500 to-orange-500',
//       bg: 'bg-amber-500/10',
//       iconColor: 'text-amber-400',
//       delay: '300ms',
//     },
//     {
//       label: 'Avg. Score',
//       value: `${averageScore}%`,
//       icon: <TrendingUp className="h-5 w-5" />,
//       color: 'from-sky-500 to-blue-600',
//       bg: 'bg-sky-500/10',
//       iconColor: 'text-sky-400',
//       delay: '400ms',
//     },
//   ];

//   return (
//     <div className="min-h-screen gradient-bg">
//       {/* Sticky Navbar */}
//       <Navbar />

//       {/* Background Orbs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="dashboard-orb orb-1" />
//         <div className="dashboard-orb orb-2" />
//         <div className="dashboard-orb orb-3" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">

//         {/* ── Header ── */}
//         <div className="mb-10 dashboard-fade-in-up">
//           <div className="flex items-center gap-3 mb-1">
//             <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
//               Welcome back, {user?.name}!
//             </h1>
//           </div>
//           <p className="text-muted-foreground text-base ml-5 pl-0.5">
//             Track your interview performance and keep practicing.
//           </p>
//         </div>

//         {/* ── Stats Grid ── */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {stats.map((stat) => (
//             <div
//               key={stat.label}
//               className="dashboard-scale-in"
//               style={{ animationDelay: stat.delay }}
//             >
//               <Card className="relative overflow-hidden border-white/5 bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10">
//                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} blur-2xl -z-10`} />
//                 <CardContent className="p-5">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
//                       {stat.label}
//                     </span>
//                     <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center ${stat.iconColor}`}>
//                       {stat.icon}
//                     </div>
//                   </div>
//                   <div className="text-3xl font-bold text-white">{stat.value}</div>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>

//         {/* ── Quick Action Banner ── */}
//         <Card
//           className="mb-8 border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md dashboard-fade-in overflow-hidden relative"
//           style={{ animationDelay: '500ms' }}
//         >
//           {/* decorative grid */}
//           <div className="absolute inset-0 opacity-5"
//             style={{
//               backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
//               backgroundSize: '32px 32px',
//             }}
//           />
//           <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 relative">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <Target className="w-5 h-5 text-purple-400" />
//                 <h3 className="text-lg font-bold text-white">Ready for your next interview?</h3>
//               </div>
//               <p className="text-muted-foreground text-sm">
//                 Create a new AI-powered mock interview and start practicing now.
//               </p>
//             </div>
//             <Link href="/interview/create">
//               <Button
//                 size="lg"
//                 className="shrink-0 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group font-semibold"
//               >
//                 <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
//                 New Interview
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>

//         {/* ── Interviews List ── */}
//         <div className="dashboard-slide-up" style={{ animationDelay: '600ms' }}>
//           <div className="flex items-center justify-between mb-5">
//             <div className="flex items-center gap-2">
//               <BarChart3 className="w-5 h-5 text-purple-400" />
//               <h2 className="text-xl font-bold text-white">Your Interviews</h2>
//               {interviews.length > 0 && (
//                 <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
//                   {interviews.length}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="grid gap-3">
//             {interviews.length === 0 ? (
//               <Card className="border-dashed border-white/10 bg-white/[0.05] backdrop-blur-sm">
//                 <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
//                   <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
//                     <PlusCircle className="w-7 h-7 text-purple-400" />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-white font-medium mb-1">No interviews yet</p>
//                     <p className="text-muted-foreground text-sm">Create your first mock interview to get started</p>
//                   </div>
//                   <Link href="/interview/create">
//                     <Button variant="outline" className="gap-2 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all">
//                       <PlusCircle className="w-4 h-4" />
//                       Create First Interview
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ) : (
//               interviews.map((interview, index) => (
//                 <Card
//                   key={interview.id}
//                   className="border-white/5 bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.06] transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-500/50 active:border-purple-500 active:shadow-purple-500/30 active:shadow-lg dashboard-fade-in-right"
//                   style={{ animationDelay: `${700 + index * 80}ms` }}
//                   onClick={() => {
//                     if (interview.status === 'completed') {
//                       router.push(`/interview/${interview.id}/results`);
//                     } else {
//                       router.push(`/interview/${interview.id}/session`);
//                     }
//                   }}
//                 >
//                   <CardContent className="p-5">
//                     <div className="flex items-start justify-between gap-4">
//                       {/* Left: info */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-1 flex-wrap">
//                           <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
//                             {interview.jobRole}
//                           </h3>
//                           <StatusBadge status={interview.status} />
//                         </div>
//                         <p className="text-sm text-muted-foreground mb-3">{interview.company}</p>
//                         <div className="flex flex-wrap gap-2 text-xs text-white/40">
//                           <span className="capitalize bg-white/5 px-2 py-0.5 rounded-full">
//                             {interview.interviewType}
//                           </span>
//                           <span className="capitalize bg-white/5 px-2 py-0.5 rounded-full">
//                             {interview.difficulty}
//                           </span>
//                           <span className="bg-white/5 px-2 py-0.5 rounded-full">
//                             {interview.questions.length} Qs
//                           </span>
//                         </div>
//                       </div>

//                       {/* Right: actions */}
//                       <div className="flex items-center gap-2 shrink-0">
//                         {interview.status === 'completed' ? (
//                           <Link href={`/interview/${interview.id}/results`} onClick={e => e.stopPropagation()}>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-white/70 hover:text-white transition-all text-xs"
//                             >
//                               View Results
//                             </Button>
//                           </Link>
//                         ) : (
//                           <Link href={`/interview/${interview.id}/session`} onClick={e => e.stopPropagation()}>
//                             <Button
//                               size="sm"
//                               className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-sm text-xs"
//                             >
//                               {interview.status === 'in-progress' ? 'Continue' : 'Start'}
//                             </Button>
//                           </Link>
//                         )}
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={e => handleDelete(e, interview.id)}
//                           disabled={deletingId === interview.id}
//                           className="w-8 h-8 hover:bg-red-500/20 hover:text-red-400 text-white/30 transition-all"
//                           title="Delete interview"
//                         >
//                           {deletingId === interview.id ? (
//                             <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-3.5 w-3.5" />
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Helper Component ── */
// function StatusBadge({ status }: { status: string }) {
//   const map: Record<string, { label: string; className: string }> = {
//     completed: {
//       label: '✓ Completed',
//       className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
//     },
//     'in-progress': {
//       label: '⏸ In Progress',
//       className: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
//     },
//     pending: {
//       label: '⏳ Pending',
//       className: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
//     },
//   };

//   const config = map[status] ?? { label: status, className: 'bg-white/10 text-white/50' };

//   return (
//     <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.className}`}>
//       {config.label}
//     </span>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/dashboard/navbar';
import { useApp } from '@/lib/context-supabase';
import { PlusCircle, Clock, CheckCircle, TrendingUp, Calendar, Trash2, Loader2, Zap, BarChart3, Target } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, interviews, isAuthenticated, isLoading, deleteInterview } = useApp();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Safety net: if isLoading is stuck for > 3s, force-check auth
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setLoadingTimedOut(true), 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // ✅ FIX: Wait for auth to resolve before rendering (but never wait more than 3s)
  if (!mounted || (isLoading && !loadingTimedOut)) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <p className="text-purple-300/70 text-sm font-medium tracking-widest uppercase animate-pulse">
          Loading Dashboard…
        </p>
      </div>
    );
  }

  // ✅ FIX: Redirect to login instead of returning blank null
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const completedInterviews = interviews.filter(i => i.status === 'completed');
  const pendingInterviews = interviews.filter(i => i.status === 'pending');
  const inProgressInterviews = interviews.filter(i => i.status === 'in-progress');
  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce((sum, i) => sum + (i.score || 0), 0) /
            completedInterviews.length
        )
      : 0;

  const handleDelete = async (e: React.MouseEvent, interviewId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this interview? This action cannot be undone.'))
      return;
    try {
      setDeletingId(interviewId);
      await deleteInterview(interviewId);
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Failed to delete interview. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    {
      label: 'Total Interviews',
      value: interviews.length,
      icon: <Calendar className="h-5 w-5" />,
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
      delay: '100ms',
    },
    {
      label: 'Completed',
      value: completedInterviews.length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      delay: '200ms',
    },
    {
      label: 'Pending',
      value: pendingInterviews.length,
      icon: <Clock className="h-5 w-5" />,
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      delay: '300ms',
    },
    {
      label: 'Avg. Score',
      value: `${averageScore}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'from-sky-500 to-blue-600',
      bg: 'bg-sky-500/10',
      iconColor: 'text-sky-400',
      delay: '400ms',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="dashboard-orb orb-1" />
        <div className="dashboard-orb orb-2" />
        <div className="dashboard-orb orb-3" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-10 max-w-6xl">

        {/* ── Header ── */}
        <div className="mb-10 dashboard-fade-in-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h1>
          </div>
          <p className="text-muted-foreground text-base ml-5 pl-0.5">
            Track your interview performance and keep practicing.
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="dashboard-scale-in"
              style={{ animationDelay: stat.delay }}
            >
              <Card className="relative overflow-hidden border-white/5 bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} blur-2xl -z-10`} />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                      {stat.label}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center ${stat.iconColor}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* ── Quick Action Banner ── */}
        <Card
          className="mb-8 border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md dashboard-fade-in overflow-hidden relative"
          style={{ animationDelay: '500ms' }}
        >
          {/* decorative grid */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 relative">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Ready for your next interview?</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Create a new AI-powered mock interview and start practicing now.
              </p>
            </div>
            <Link href="/interview/create">
              <Button
                size="lg"
                className="shrink-0 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group font-semibold"
              >
                <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                New Interview
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* ── Interviews List ── */}
        <div className="dashboard-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Your Interviews</h2>
              {interviews.length > 0 && (
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                  {interviews.length}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-3">
            {interviews.length === 0 ? (
              <Card className="border-dashed border-white/10 bg-white/[0.05] backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <PlusCircle className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">No interviews yet</p>
                    <p className="text-muted-foreground text-sm">Create your first mock interview to get started</p>
                  </div>
                  <Link href="/interview/create">
                    <Button variant="outline" className="gap-2 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all">
                      <PlusCircle className="w-4 h-4" />
                      Create First Interview
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              interviews.map((interview, index) => (
                <Card
                  key={interview.id}
                  className="border-white/5 bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.06] transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-500/50 active:border-purple-500 active:shadow-purple-500/30 active:shadow-lg dashboard-fade-in-right"
                  style={{ animationDelay: `${700 + index * 80}ms` }}
                  onClick={() => {
                    if (interview.status === 'completed') {
                      router.push(`/interview/${interview.id}/results`);
                    } else {
                      router.push(`/interview/${interview.id}/session`);
                    }
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                            {interview.jobRole}
                          </h3>
                          <StatusBadge status={interview.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{interview.company}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-white/40">
                          <span className="capitalize bg-white/5 px-2 py-0.5 rounded-full">
                            {interview.interviewType}
                          </span>
                          <span className="capitalize bg-white/5 px-2 py-0.5 rounded-full">
                            {interview.difficulty}
                          </span>
                          <span className="bg-white/5 px-2 py-0.5 rounded-full">
                            {interview.questions.length} Qs
                          </span>
                        </div>
                      </div>

                      {/* Right: actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {interview.status === 'completed' ? (
                          <Link href={`/interview/${interview.id}/results`} onClick={e => e.stopPropagation()}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-white/70 hover:text-white transition-all text-xs"
                            >
                              View Results
                            </Button>
                          </Link>
                        ) : (
                          <Link href={`/interview/${interview.id}/session`} onClick={e => e.stopPropagation()}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-sm text-xs"
                            >
                              {interview.status === 'in-progress' ? 'Continue' : 'Start'}
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={e => handleDelete(e, interview.id)}
                          disabled={deletingId === interview.id}
                          className="w-8 h-8 hover:bg-red-500/20 hover:text-red-400 text-white/30 transition-all"
                          title="Delete interview"
                        >
                          {deletingId === interview.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Component ── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    completed: {
      label: '✓ Completed',
      className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    },
    'in-progress': {
      label: '⏸ In Progress',
      className: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    },
    pending: {
      label: '⏳ Pending',
      className: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    },
  };

  const config = map[status] ?? { label: status, className: 'bg-white/10 text-white/50' };

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}