// // 'use client';

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { useApp } from '@/lib/context-supabase';

// // export default function SignupPage() {
// //   const router = useRouter();
// //   const { signup } = useApp();
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError('');

// //     try {
// //       await signup(email, password, name);
// //       router.push('/dashboard');
// //     } catch (error: any) {
// //       console.error('Signup error:', error);
// //       setError(error.message || 'Failed to create account. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="space-y-1">
// //           <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
// //           <CardDescription className="text-center">
// //             Enter your details to get started with AI Mock Interviews
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="name">Full Name</Label>
// //               <Input
// //                 id="name"
// //                 type="text"
// //                 placeholder="John Doe"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <Label htmlFor="password">Password</Label>
// //               <Input
// //                 id="password"
// //                 type="password"
// //                 placeholder="••••••••"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             {error && (
// //               <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-500">
// //                 {error}
// //               </div>
// //             )}
// //             <Button type="submit" className="w-full" disabled={isLoading}>
// //               {isLoading ? 'Creating account...' : 'Sign Up'}
// //             </Button>
// //           </form>
// //           <div className="mt-4 text-center text-sm">
// //             <span className="text-muted-foreground">Already have an account? </span>
// //             <Link href="/auth/login" className="text-primary hover:underline">
// //               Sign in
// //             </Link>
// //           </div>
// //           <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm text-blue-300">
// //             <p className="font-semibold mb-1">⚠️ Database Setup Required:</p>
// //             <p>Make sure you've run the SQL schema in Supabase first!</p>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }




// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useApp } from '@/lib/context-supabase';
// import { Eye, EyeOff } from 'lucide-react';

// export default function SignupPage() {
//   const router = useRouter();
//   const { signup } = useApp();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       await signup(email, password, name);
//       router.push('/dashboard');
//     } catch (error: any) {
//       console.error('Signup error:', error);
//       setError(error.message || 'Failed to create account. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
//           <CardDescription className="text-center">
//             Enter your details to get started with AI Mock Interviews
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>
//             {error && (
//               <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-500">
//                 {error}
//               </div>
//             )}
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? 'Creating account...' : 'Sign Up'}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             <span className="text-muted-foreground">Already have an account? </span>
//             <Link href="/auth/login" className="text-primary hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context-supabase';
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signup(email, password, name);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Mock Interview
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-600/20 border border-purple-500/20 mb-4">
              <UserPlus className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Create Account</h1>
            <p className="text-sm text-white/40">Start practicing interviews with AI today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Full Name
              </label>
              <input
                type="text"
                placeholder="Sarah Khan"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      password.length >= i * 2
                        ? password.length >= 8
                          ? 'bg-emerald-500'
                          : password.length >= 6
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                        : 'bg-white/10'
                    }`} />
                  ))}
                  <span className="text-xs text-white/30 ml-1">
                    {password.length >= 8 ? 'Strong' : password.length >= 6 ? 'Fair' : 'Weak'}
                  </span>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        {/* Bottom links */}
        <p className="text-center text-xs text-white/20 mt-6">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="hover:text-white/40 transition-colors underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:text-white/40 transition-colors underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}