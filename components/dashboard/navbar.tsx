// // // 'use client';

// // // import Link from 'next/link';
// // // import Image from 'next/image';
// // // import { useRouter } from 'next/navigation';
// // // import { Button } from '@/components/ui/button';
// // // import { useApp } from '@/lib/context-supabase';
// // // import { LogOut, Home, PlusCircle, User } from 'lucide-react';

// // // export function Navbar() {
// // //   const router = useRouter();
// // //   const { user, logout } = useApp();

// // //   const handleLogout = async () => {
// // //     await logout();
// // //     router.push('/');
// // //   };

// // //   return (
// // //     <nav className="border-b bg-card">
// // //       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// // //         <div className="flex items-center gap-8">
// // //           <Link href="/dashboard" className="flex items-center gap-3">
// // //             <Image
// // //               src="/logo.svg"
// // //               alt="Logo"
// // //               width={32}
// // //               height={32}
// // //               className="w-8 h-8"
// // //             />
// // //             <span className="text-2xl font-bold gradient-text">AI Mock Interview</span>
// // //           </Link>
// // //           <div className="flex gap-4">
// // //             <Link href="/dashboard">
// // //               <Button variant="ghost" className="gap-2">
// // //                 <Home className="w-4 h-4" />
// // //                 Dashboard
// // //               </Button>
// // //             </Link>
// // //             <Link href="/interview/create">
// // //               <Button variant="ghost" className="gap-2">
// // //                 <PlusCircle className="w-4 h-4" />
// // //                 New Interview
// // //               </Button>
// // //             </Link>
// // //           </div>
// // //         </div>
// // //         <div className="flex items-center gap-4">
// // //           <div className="flex items-center gap-2">
// // //             <Image
// // //               src="/user-avatar.png"
// // //               alt="User"
// // //               width={32}
// // //               height={32}
// // //               className="w-8 h-8 rounded-full"
// // //             />
// // //             <span className="text-sm text-muted-foreground">{user?.name}</span>
// // //           </div>
// // //           <Button variant="outline" onClick={handleLogout} className="gap-2">
// // //             <LogOut className="w-4 h-4" />
// // //             Logout
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }






// // 'use client';

// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { useRouter } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { useApp } from '@/lib/context-supabase';
// // import { LogOut, Home, PlusCircle } from 'lucide-react';

// // export function Navbar() {
// //   const router = useRouter();
// //   const { user, logout } = useApp();

// //   const handleLogout = async () => {
// //     await logout();
// //     router.push('/');
// //   };

// //   return (
// //     <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm">
// //       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //         <div className="flex items-center gap-8">
// //           <Link href="/dashboard" className="flex items-center gap-3">
// //             <Image src="/logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
// //             <span className="text-2xl font-bold gradient-text">AI Mock Interview</span>
// //           </Link>
// //           <div className="flex gap-4">
// //             <Link href="/dashboard">
// //               <Button variant="ghost" className="gap-2">
// //                 <Home className="w-4 h-4" />
// //                 Dashboard
// //               </Button>
// //             </Link>
// //             <Link href="/interview/create">
// //               <Button variant="ghost" className="gap-2">
// //                 <PlusCircle className="w-4 h-4" />
// //                 New Interview
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <div className="flex items-center gap-2">
// //             <Image src="/user-avatar.png" alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
// //             <span className="text-sm text-muted-foreground">{user?.name}</span>
// //           </div>
// //           <Button variant="outline" onClick={handleLogout} className="gap-2">
// //             <LogOut className="w-4 h-4" />
// //             Logout
// //           </Button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }





// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useApp } from '@/lib/context-supabase';
// import { LogOut, Home, PlusCircle } from 'lucide-react';

// interface NavbarProps {
//   // When provided, ALL navigation (including logout) goes through this handler first
//   // Used by session page to end the call before leaving
//   onNavigate?: (href: string, action?: () => Promise<void>) => void;
// }

// export function Navbar({ onNavigate }: NavbarProps) {
//   const router = useRouter();
//   const { user, logout } = useApp();

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//   };

//   // Intercept link clicks when onNavigate is provided
//   const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
//     if (onNavigate) {
//       e.preventDefault();
//       onNavigate(href);
//     }
//   };

//   // Intercept logout when onNavigate is provided
//   const handleLogoutClick = () => {
//     if (onNavigate) {
//       onNavigate('/auth/login', handleLogout);
//     } else {
//       handleLogout();
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-8">

//           {/* Logo */}
//           <Link href="/dashboard" onClick={handleLinkClick('/dashboard')} className="flex items-center gap-3">
//             <Image src="/logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
//             <span className="text-2xl font-bold gradient-text">AI Mock Interview</span>
//           </Link>

//           {/* Nav links */}
//           <div className="flex gap-4">
//             <Link href="/dashboard" onClick={handleLinkClick('/dashboard')}>
//               <Button variant="ghost" className="gap-2">
//                 <Home className="w-4 h-4" />
//                 Dashboard
//               </Button>
//             </Link>
//             <Link href="/interview/create" onClick={handleLinkClick('/interview/create')}>
//               <Button variant="ghost" className="gap-2">
//                 <PlusCircle className="w-4 h-4" />
//                 New Interview
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* User + Logout */}
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Image src="/user-avatar.png" alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
//             <span className="text-sm text-muted-foreground">{user?.name}</span>
//           </div>
//           <Button variant="outline" onClick={handleLogoutClick} className="gap-2">
//             <LogOut className="w-4 h-4" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// }





'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/context-supabase';
import { LogOut, LayoutDashboard, PlusCircle, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onNavigate?: (href: string, action?: () => Promise<void>) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useApp();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const handleLogoutClick = () => {
    if (onNavigate) {
      onNavigate('/auth/login', handleLogout);
    } else {
      handleLogout();
    }
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/interview/create', label: 'New Interview', icon: PlusCircle },
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrollY > 20 ? 'rgba(8, 6, 20, 0.90)' : 'rgba(8, 6, 20, 0.60)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrollY > 20
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(255,255,255,0.03)',
        boxShadow: scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* ── Logo — identical to landing page ── */}
        <Link
          href="/dashboard"
          onClick={handleLinkClick('/dashboard')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Mock Interview
          </span>
        </Link>

        {/* ── Nav links — same pill style as landing page ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick(href)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── User + Logout ── */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-white/50 max-w-[140px] truncate">
            {user?.name}
          </span>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}