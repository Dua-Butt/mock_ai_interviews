
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Navbar } from '@/components/dashboard/navbar';
// import { useApp } from '@/lib/context-supabase';
// import { PlusCircle, Clock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

// export default function DashboardPage() {
//   const router = useRouter();
//   const { user, interviews, isAuthenticated, isLoading } = useApp();

//   if (!isAuthenticated) {
//     return null;
//   }

//   const completedInterviews = interviews.filter(i => i.status === 'completed');
//   const pendingInterviews = interviews.filter(i => i.status === 'pending');
//   const averageScore = completedInterviews.length > 0
//     ? Math.round(completedInterviews.reduce((sum, i) => sum + (i.score || 0), 0) / completedInterviews.length)
//     : 0;

//   return (
//     <div className="min-h-screen gradient-bg relative overflow-hidden">
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="dashboard-orb orb-1"></div>
//         <div className="dashboard-orb orb-2"></div>
//         <div className="dashboard-orb orb-3"></div>
//       </div>

//       <div className="relative z-10">
//         <Navbar />

//         <div className="container mx-auto px-4 py-8">
//           {/* Welcome Section - Animated */}
//           <div className="mb-8 dashboard-fade-in-up">
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
//               Welcome back, {user?.name}! 👋
//             </h1>
//             <p className="text-muted-foreground text-lg">Track your progress and continue practicing</p>
//           </div>

//           {/* Stats Grid - Staggered Animation */}
//           <div className="grid md:grid-cols-4 gap-6 mb-8">
//             <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '100ms' }}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
//                 <div className="dashboard-icon-float">
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold dashboard-number-pop">{interviews.length}</div>
//               </CardContent>
//             </Card>

//             <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '200ms' }}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Completed</CardTitle>
//                 <div className="dashboard-icon-float" style={{ animationDelay: '0.2s' }}>
//                   <CheckCircle className="h-4 w-4 text-green-500" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.2s' }}>{completedInterviews.length}</div>
//               </CardContent>
//             </Card>

//             <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '300ms' }}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Pending</CardTitle>
//                 <div className="dashboard-icon-float" style={{ animationDelay: '0.4s' }}>
//                   <Clock className="h-4 w-4 text-yellow-500" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.4s' }}>{pendingInterviews.length}</div>
//               </CardContent>
//             </Card>

//             <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '400ms' }}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Average Score</CardTitle>
//                 <div className="dashboard-icon-float" style={{ animationDelay: '0.6s' }}>
//                   <TrendingUp className="h-4 w-4 text-blue-500" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.6s' }}>{averageScore}%</div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Action - Pulse Animation */}
//           <Card className="mb-8 card-gradient dashboard-fade-in border-purple-500/20 backdrop-blur-sm" style={{ animationDelay: '500ms' }}>
//             <CardContent className="flex items-center justify-between p-6">
//               <div className="dashboard-slide-in-left">
//                 <h3 className="text-xl font-bold mb-1">Ready for your next interview?</h3>
//                 <p className="text-muted-foreground">Create a new mock interview and start practicing</p>
//               </div>
//               <Link href="/interview/create" className="dashboard-slide-in-right">
//                 <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 dashboard-button-pulse group">
//                   <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
//                   Create Interview
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>

//           {/* Recent Interviews - Slide Up */}
//           <div className="dashboard-slide-up" style={{ animationDelay: '600ms' }}>
//             <h2 className="text-2xl font-bold mb-4 dashboard-text-glow">Your Interviews</h2>
//             <div className="grid gap-4">
//               {interviews.length === 0 ? (
//                 <Card className="dashboard-fade-in border-border/50 backdrop-blur-sm bg-card/50">
//                   <CardContent className="flex flex-col items-center justify-center py-12">
//                     <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 dashboard-bounce-gentle">
//                       <PlusCircle className="w-8 h-8 text-purple-500" />
//                     </div>
//                     <p className="text-muted-foreground mb-4">No interviews yet</p>
//                     <Link href="/interview/create">
//                       <Button className="gap-2 dashboard-shimmer group">
//                         <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
//                         Create Your First Interview
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               ) : (
//                 interviews.map((interview, index) => (
//                   <Card
//                     key={interview.id}
//                     className="dashboard-interview-card border-border/50 backdrop-blur-sm bg-card/50 dashboard-fade-in-right"
//                     style={{ animationDelay: `${700 + index * 100}ms` }}
//                     onClick={() => {
//                       if (interview.status === 'completed') {
//                         router.push(`/interview/${interview.id}/results`);
//                       } else if (interview.status === 'pending') {
//                         router.push(`/interview/${interview.id}/session`);
//                       }
//                     }}
//                   >
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle className="text-white dashboard-title-hover">
//                             {interview.jobRole}
//                           </CardTitle>
//                           <CardDescription>{interview.company}</CardDescription>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {interview.status === 'completed' && interview.score && (
//                             <div className={`px-3 py-1 rounded-full text-sm font-medium dashboard-badge-pulse ${
//                               interview.score >= 80 ? 'bg-green-500/20 text-green-500' :
//                               interview.score >= 60 ? 'bg-blue-500/20 text-blue-500' :
//                               'bg-orange-500/20 text-orange-500'
//                             }`}>
//                               {interview.score}%
//                             </div>
//                           )}
//                           <div className={`px-3 py-1 rounded-full text-sm font-medium dashboard-status-badge ${
//                             interview.status === 'completed'
//                               ? 'bg-green-500/20 text-green-500'
//                               : interview.status === 'in-progress'
//                               ? 'bg-blue-500/20 text-blue-500'
//                               : 'bg-yellow-500/20 text-yellow-500'
//                           }`}>
//                             {interview.status === 'completed' ? '✓ Completed' :
//                              interview.status === 'in-progress' ? '⏸ In Progress' :
//                              '⏳ Pending'}
//                           </div>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center justify-between">
//                         <div className="flex gap-4 text-sm text-muted-foreground">
//                           <span className="capitalize">{interview.interviewType} Interview</span>
//                           <span>•</span>
//                           <span className="capitalize">{interview.difficulty} Level</span>
//                           <span>•</span>
//                           <span>{interview.questions.length} Questions</span>
//                         </div>
//                         <div className="flex gap-2">
//                           {interview.status === 'pending' && (
//                             <Link href={`/interview/${interview.id}/session`} onClick={(e) => e.stopPropagation()}>
//                               <Button className="dashboard-button-glow">Start Interview</Button>
//                             </Link>
//                           )}
//                           {interview.status === 'completed' && (
//                             <Link href={`/interview/${interview.id}/results`} onClick={(e) => e.stopPropagation()}>
//                               <Button variant="outline" className="dashboard-button-outline-glow">View Results</Button>
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
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
import { PlusCircle, Clock, CheckCircle, TrendingUp, Calendar, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, interviews, isAuthenticated, isLoading, deleteInterview } = useApp();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return null;
  }

  const completedInterviews = interviews.filter(i => i.status === 'completed');
  const pendingInterviews = interviews.filter(i => i.status === 'pending');
  const averageScore = completedInterviews.length > 0
    ? Math.round(completedInterviews.reduce((sum, i) => sum + (i.score || 0), 0) / completedInterviews.length)
    : 0;

  const handleDelete = async (e: React.MouseEvent, interviewId: string) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      return;
    }

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

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="dashboard-orb orb-1"></div>
        <div className="dashboard-orb orb-2"></div>
        <div className="dashboard-orb orb-3"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section - Animated */}
          <div className="mb-8 dashboard-fade-in-up">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">Track your progress and continue practicing</p>
          </div>

          {/* Stats Grid - Staggered Animation */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '100ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <div className="dashboard-icon-float">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-number-pop">{interviews.length}</div>
              </CardContent>
            </Card>

            <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '200ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <div className="dashboard-icon-float" style={{ animationDelay: '0.2s' }}>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.2s' }}>{completedInterviews.length}</div>
              </CardContent>
            </Card>

            <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '300ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <div className="dashboard-icon-float" style={{ animationDelay: '0.4s' }}>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.4s' }}>{pendingInterviews.length}</div>
              </CardContent>
            </Card>

            <Card className="dashboard-scale-in dashboard-card-hover border-border/50 backdrop-blur-sm bg-card/50" style={{ animationDelay: '400ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <div className="dashboard-icon-float" style={{ animationDelay: '0.6s' }}>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-number-pop" style={{ animationDelay: '0.6s' }}>{averageScore}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Action - Pulse Animation */}
          <Card className="mb-8 card-gradient dashboard-fade-in border-purple-500/20 backdrop-blur-sm" style={{ animationDelay: '500ms' }}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="dashboard-slide-in-left">
                <h3 className="text-xl font-bold mb-1">Ready for your next interview?</h3>
                <p className="text-muted-foreground">Create a new mock interview and start practicing</p>
              </div>
              <Link href="/interview/create" className="dashboard-slide-in-right">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 dashboard-button-pulse group">
                  <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Interview
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Interviews - Slide Up */}
          <div className="dashboard-slide-up" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-4 dashboard-text-glow">Your Interviews</h2>
            <div className="grid gap-4">
              {interviews.length === 0 ? (
                <Card className="dashboard-fade-in border-border/50 backdrop-blur-sm bg-card/50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 dashboard-bounce-gentle">
                      <PlusCircle className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-muted-foreground mb-4">No interviews yet</p>
                    <Link href="/interview/create">
                      <Button className="gap-2 dashboard-shimmer group">
                        <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        Create Your First Interview
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                interviews.map((interview, index) => (
<Card
  key={interview.id}
  className="dashboard-interview-card border-border/50 backdrop-blur-sm bg-card/50 dashboard-fade-in-right cursor-pointer"
  style={{ animationDelay: `${700 + index * 100}ms` }}
  onClick={() => {
    if (interview.status === 'completed') {
      router.push(`/interview/${interview.id}/results`);
    } else {
      // For both 'pending' and 'in-progress', go to session
      router.push(`/interview/${interview.id}/session`);
    }
  }}
>
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle className="text-white dashboard-title-hover">
          {interview.jobRole}
        </CardTitle>
        <CardDescription>{interview.company}</CardDescription>
      </div>
      <div className="flex items-center gap-2">
        {interview.status === 'completed' && interview.score && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium dashboard-badge-pulse ${
            interview.score >= 80 ? 'bg-green-500/20 text-green-500' :
            interview.score >= 60 ? 'bg-blue-500/20 text-blue-500' :
            'bg-orange-500/20 text-orange-500'
          }`}>
            {interview.score}%
          </div>
        )}
        <div className={`px-3 py-1 rounded-full text-sm font-medium dashboard-status-badge ${
          interview.status === 'completed'
            ? 'bg-green-500/20 text-green-500'
            : interview.status === 'in-progress'
            ? 'bg-blue-500/20 text-blue-500'
            : 'bg-yellow-500/20 text-yellow-500'
        }`}>
          {interview.status === 'completed' ? '✓ Completed' :
           interview.status === 'in-progress' ? '⏸ In Progress' :
           '⏳ Pending'}
        </div>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-between">
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="capitalize">{interview.interviewType} Interview</span>
        <span>•</span>
        <span className="capitalize">{interview.difficulty} Level</span>
        <span>•</span>
        <span>{interview.questions.length} Questions</span>
      </div>
      <div className="flex gap-2">
        {(interview.status === 'pending' || interview.status === 'in-progress') && (
          <Link href={`/interview/${interview.id}/session`} onClick={(e) => e.stopPropagation()}>
            <Button className="dashboard-button-glow">
              {interview.status === 'in-progress' ? 'Continue' : 'Start Interview'}
            </Button>
          </Link>
        )}
        {interview.status === 'completed' && (
          <Link href={`/interview/${interview.id}/results`} onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" className="dashboard-button-outline-glow">View Results</Button>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleDelete(e, interview.id)}
          disabled={deletingId === interview.id}
          className="hover:bg-red-500/20 hover:text-red-500 transition-colors"
          title="Delete interview"
        >
          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}