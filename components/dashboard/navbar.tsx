// 'use client';

// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useApp } from '@/lib/context-supabase';
// import { LogOut, LayoutDashboard, PlusCircle, Zap } from 'lucide-react';
// import { useEffect, useState } from 'react';

// interface NavbarProps {
//   onNavigate?: (href: string, action?: () => Promise<void>) => void;
// }

// export function Navbar({ onNavigate }: NavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, logout } = useApp();
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     router.push('/');
//   };

//   const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
//     if (onNavigate) {
//       e.preventDefault();
//       onNavigate(href);
//     }
//   };

//   const handleLogoutClick = () => {
//     if (onNavigate) {
//       onNavigate('/auth/login', handleLogout);
//     } else {
//       handleLogout();
//     }
//   };

//   const navLinks = [
//     { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { href: '/interview/create', label: 'New Interview', icon: PlusCircle },
//   ];

//   return (
//     <nav
//       className="sticky top-0 z-50 transition-all duration-300"
//       style={{
//         background: scrollY > 20 ? 'rgba(8, 6, 20, 0.90)' : 'rgba(8, 6, 20, 0.60)',
//         backdropFilter: 'blur(20px)',
//         WebkitBackdropFilter: 'blur(20px)',
//         borderBottom: scrollY > 20
//           ? '1px solid rgba(255,255,255,0.06)'
//           : '1px solid rgba(255,255,255,0.03)',
//         boxShadow: scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
//       }}
//     >
//       <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">

//         {/* ── Logo — identical to landing page ── */}
//         <Link
//           href="/dashboard"
//           onClick={handleLinkClick('/dashboard')}
//           className="flex items-center gap-2.5 group"
//         >
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
//             <Zap className="w-4 h-4 text-white" />
//           </div>
//           <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//             AI Mock Interview
//           </span>
//         </Link>

//         {/* ── Nav links — same pill style as landing page ── */}
//         <div className="hidden md:flex items-center gap-1">
//           {navLinks.map(({ href, label, icon: Icon }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 onClick={handleLinkClick(href)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   isActive
//                     ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
//                     : 'text-white/60 hover:text-white hover:bg-white/5'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 {label}
//               </Link>
//             );
//           })}
//         </div>

//         {/* ── User + Logout ── */}
//         <div className="flex items-center gap-3">
//           <span className="hidden sm:block text-sm text-white/50 max-w-[140px] truncate">
//             {user?.name}
//           </span>
//           <button
//             onClick={handleLogoutClick}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>
//         </div>

//       </div>
//     </nav>
//   );
// }




'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/context-supabase';
import { LogOut, LayoutDashboard, PlusCircle, Zap, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onNavigate?: (href: string, action?: () => Promise<void>) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useApp();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleLogout = async () => {
    try { await logout(); } catch (e) {}
    router.push('/auth/login');
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (onNavigate) { e.preventDefault(); onNavigate(href); }
  };

  const handleLogoutClick = async () => {
    setMenuOpen(false);
    if (onNavigate) { onNavigate('/auth/login', handleLogout); }
    else { await handleLogout(); }
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/interview/create', label: 'New Interview', icon: PlusCircle },
  ];

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 20 ? 'rgba(8, 6, 20, 0.95)' : 'rgba(8, 6, 20, 0.70)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <Link href="/dashboard" onClick={handleLinkClick('/dashboard')} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Mock Interview
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} onClick={handleLinkClick(href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />{label}
                </Link>
              );
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-white/50 max-w-[140px] truncate">{user?.name}</span>
            <button onClick={handleLogoutClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105"
            >
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06]" style={{ background: 'rgba(8,6,20,0.98)' }}>
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {/* User name */}
              {user?.name && (
                <div className="px-3 py-2 text-xs text-white/30 border-b border-white/5 mb-1">
                  Signed in as <span className="text-white/60 font-medium">{user.name}</span>
                </div>
              )}
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link key={href} href={href} onClick={handleLinkClick(href)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-purple-500/15 text-purple-300' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />{label}
                  </Link>
                );
              })}
              <button onClick={handleLogoutClick}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-1"
              >
                <LogOut className="w-4 h-4" />Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}