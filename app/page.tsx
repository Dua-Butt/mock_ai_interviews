// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, Mic, Brain, TrendingUp, Star, Zap, Shield, ChevronRight } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// const stats = [
//   { value: "50K+", label: "Interviews Completed" },
//   { value: "94%", label: "Success Rate" },
//   { value: "200+", label: "Job Roles Covered" },
//   { value: "4.9★", label: "User Rating" },
// ];

// const features = [
//   {
//     icon: Mic,
//     color: "from-violet-600 to-purple-700",
//     glow: "shadow-purple-500/30",
//     title: "Voice Interviews",
//     desc: "Practice with AI voice agents that simulate real interview scenarios with natural, flowing conversations.",
//   },
//   {
//     icon: Brain,
//     color: "from-blue-600 to-cyan-700",
//     glow: "shadow-blue-500/30",
//     title: "AI-Powered Feedback",
//     desc: "Receive instant, detailed feedback on your answers — scored by category, with strengths and improvements.",
//   },
//   {
//     icon: TrendingUp,
//     color: "from-emerald-600 to-green-700",
//     glow: "shadow-emerald-500/30",
//     title: "Track Progress",
//     desc: "Monitor your improvement over time with rich analytics, skill stages, and hiring recommendations.",
//   },
//   {
//     icon: Zap,
//     color: "from-amber-500 to-orange-600",
//     glow: "shadow-amber-500/30",
//     title: "Instant Generation",
//     desc: "AI generates tailored questions for any role, difficulty, and interview type in seconds.",
//   },
//   {
//     icon: Shield,
//     color: "from-rose-600 to-pink-700",
//     glow: "shadow-rose-500/30",
//     title: "Any Role, Any Level",
//     desc: "From intern to senior — beginner to expert difficulty. Hundreds of industries supported.",
//   },
//   {
//     icon: Star,
//     color: "from-indigo-600 to-violet-700",
//     glow: "shadow-indigo-500/30",
//     title: "Expert Evaluation",
//     desc: "Get a hiring recommendation: Strong Yes, Yes, Maybe, or No — just like a real hiring panel.",
//   },
// ];

// const steps = [
//   {
//     number: "01",
//     title: "Create Your Interview",
//     desc: "Pick your job role, company, difficulty, and interview type. AI crafts tailored questions instantly.",
//     accent: "text-purple-400",
//     bar: "bg-purple-500",
//   },
//   {
//     number: "02",
//     title: "Practice with AI Voice",
//     desc: "Have a real conversation with our AI interviewer. Speak naturally — just like a real interview.",
//     accent: "text-blue-400",
//     bar: "bg-blue-500",
//   },
//   {
//     number: "03",
//     title: "Get Instant Feedback",
//     desc: "Receive a full performance breakdown: score, skill stage, strengths, improvements, and a hiring verdict.",
//     accent: "text-emerald-400",
//     bar: "bg-emerald-500",
//   },
// ];

// const testimonials = [
//   {
//     name: "Sarah K.",
//     role: "Software Engineer @ Google",
//     text: "I went from bombing every interview to landing my dream job at Google. The AI feedback was incredibly specific.",
//     stars: 5,
//   },
//   {
//     name: "Ahmed R.",
//     role: "Product Manager @ Meta",
//     text: "The behavioral interview practice was exactly what I needed. The STAR method coaching is unmatched.",
//     stars: 5,
//   },
//   {
//     name: "Priya M.",
//     role: "Data Scientist @ Amazon",
//     text: "Practicing 10 minutes a day for 3 weeks gave me the confidence to ace my final round. Worth every second.",
//     stars: 5,
//   },
// ];

// export default function Home() {
//   const featuresRef = useRef<HTMLDivElement>(null);
//   const howItWorksRef = useRef<HTMLDivElement>(null);
//   const statsRef = useRef<HTMLDivElement>(null);
//   const testimonialsRef = useRef<HTMLDivElement>(null);
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-in");
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
//     );

//     const selectors = [".feature-card", ".step-item", ".stat-item", ".testimonial-card"];
//     selectors.forEach((sel) => {
//       document.querySelectorAll(sel).forEach((el) => observer.observe(el));
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <main className="min-h-screen gradient-bg relative overflow-x-hidden">
//       {/* ── Grain overlay ── */}
//       <div
//         className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//           backgroundRepeat: "repeat",
//           backgroundSize: "128px",
//         }}
//       />

//       {/* ── Background orbs ── */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div
//           className="floating-orb orb-1"
//           style={{ transform: `translateY(${scrollY * 0.15}px)` }}
//         />
//         <div
//           className="floating-orb orb-2"
//           style={{ transform: `translateY(${scrollY * -0.1}px)` }}
//         />
//         <div
//           className="floating-orb orb-3"
//           style={{ transform: `translateY(${scrollY * 0.08}px)` }}
//         />
//         {/* Extra ambient orbs */}
//         <div
//           className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
//           style={{
//             background: "radial-gradient(circle, #3b82f6, transparent)",
//             top: "60%",
//             right: "-10%",
//             transform: `translateY(${scrollY * -0.12}px)`,
//           }}
//         />
//       </div>

//       {/* ── Background grid ── */}
//       <div
//         className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
//           backgroundSize: "48px 48px",
//         }}
//       />

//       {/* ══════════════════════════════════════
//           NAVBAR
//       ══════════════════════════════════════ */}
//       <nav
//         className="sticky top-0 z-50 transition-all duration-300"
//         style={{
//           background:
//             scrollY > 40
//               ? "rgba(8, 6, 20, 0.85)"
//               : "transparent",
//           backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
//           borderBottom:
//             scrollY > 40 ? "1px solid rgba(255,255,255,0.05)" : "none",
//         }}
//       >
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
//               <Zap className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold gradient-text">AI Mock Interview</span>
//           </Link>
//           <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
//             <a href="#features" className="hover:text-white transition-colors">Features</a>
//             <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
//             <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/auth/login"
//               className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               href="/auth/signup"
//               className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105"
//             >
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10">

//         {/* ══════════════════════════════════════
//             HERO
//         ══════════════════════════════════════ */}
//         <section className="container mx-auto px-6 pt-20 pb-32 text-center">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8 fade-in-down">
//             <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
//             AI-Powered Mock Interview Platform
//           </div>

//           {/* Headline */}
//           <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight fade-in-up animation-delay-200">
//             <span className="gradient-text">Master Your</span>
//             <br />
//             <span className="text-white">Interview Skills</span>
//             <br />
//             <span className="gradient-text">with AI</span>
//           </h1>

//           <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto fade-in-up animation-delay-400 leading-relaxed">
//             Practice real-time interviews with AI voice agents. Get instant, detailed feedback
//             and transform your confidence before the big day.
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up animation-delay-600">
//             <Link
//               href="/auth/signup"
//               className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-base font-semibold shadow-xl hover:shadow-purple-500/40 hover:scale-105 group"
//             >
//               Start Practicing Free
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//             <Link
//               href="/auth/login"
//               className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-base font-medium"
//             >
//               Sign In
//               <ChevronRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Hero visual */}
//           <div className="relative mt-20 max-w-3xl mx-auto fade-in-up animation-delay-600">
//             {/* Glow behind card */}
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl rounded-3xl" />
//             <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl">
//               {/* Mock interview UI */}
//               <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-500/70" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
//                 <div className="w-3 h-3 rounded-full bg-green-500/70" />
//                 <span className="ml-3 text-xs text-white/30 font-mono">AI Mock Interview · Live Session</span>
//               </div>
//               <div className="p-8 space-y-4 text-left">
//                 <div className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <Brain className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
//                     <p className="text-sm text-white/80 leading-relaxed">
//                       Tell me about a time you led a project under tight deadlines. How did you handle the pressure?
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 justify-end">
//                   <div className="bg-purple-600/20 border border-purple-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
//                     <p className="text-sm text-purple-200/80 leading-relaxed">
//                       Sure! In my last role, I led a 3-person team to deliver a critical feature within 2 weeks…
//                     </p>
//                   </div>
//                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white/60">
//                     U
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 pt-2">
//                   <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
//                     <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
//                   </div>
//                   <div className="flex items-center gap-1.5 text-xs text-white/40">
//                     <Mic className="w-3.5 h-3.5 text-purple-400" />
//                     <span>Listening…</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             STATS
//         ══════════════════════════════════════ */}
//         <section ref={statsRef} className="container mx-auto px-6 pb-24">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {stats.map((stat, i) => (
//               <div
//                 key={stat.label}
//                 className="stat-item opacity-0 text-center rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] transition-all duration-300"
//                 style={{ animationDelay: `${i * 100}ms` }}
//               >
//                 <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
//                 <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             FEATURES
//         ══════════════════════════════════════ */}
//         <section id="features" className="container mx-auto px-6 pb-32">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
//               Everything you need
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
//               Built for <span className="gradient-text">Interview Success</span>
//             </h2>
//             <p className="text-gray-400 max-w-xl mx-auto">
//               Every feature designed to turn nervous candidates into confident hires.
//             </p>
//           </div>

//           <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
//             {features.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <div
//                   key={f.title}
//                   className="feature-card opacity-0 group rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-7 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
//                   style={{ animationDelay: `${i * 80}ms` }}
//                 >
//                   <div
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
//                   <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             HOW IT WORKS
//         ══════════════════════════════════════ */}
//         <section id="how-it-works" className="container mx-auto px-6 pb-32">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
//                 Simple 3-step process
//               </div>
//               <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
//                 How It <span className="gradient-text">Works</span>
//               </h2>
//               <p className="text-gray-400 max-w-xl mx-auto">
//                 From setup to feedback in under 30 minutes. No setup required.
//               </p>
//             </div>

//             <div ref={howItWorksRef} className="space-y-5">
//               {steps.map((step, i) => (
//                 <div
//                   key={step.number}
//                   className="step-item opacity-0 flex items-start gap-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-7 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
//                   style={{ animationDelay: `${i * 120}ms` }}
//                 >
//                   <div className="flex-shrink-0">
//                     <div className={`text-4xl font-black ${step.accent} opacity-30 group-hover:opacity-60 transition-opacity leading-none`}>
//                       {step.number}
//                     </div>
//                     <div className={`h-1 w-8 rounded-full ${step.bar} mt-2 opacity-40 group-hover:opacity-100 transition-opacity`} />
//                   </div>
//                   <div className="pt-1">
//                     <h4 className={`text-xl font-bold text-white mb-2 group-hover:${step.accent} transition-colors`}>
//                       {step.title}
//                     </h4>
//                     <p className="text-gray-400 leading-relaxed">{step.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             TESTIMONIALS
//         ══════════════════════════════════════ */}
//         <section id="testimonials" className="container mx-auto px-6 pb-32">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
//               Real results
//             </div>
//             <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
//               Loved by <span className="gradient-text">Job Seekers</span>
//             </h2>
//           </div>

//           <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
//             {testimonials.map((t, i) => (
//               <div
//                 key={t.name}
//                 className="testimonial-card opacity-0 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
//                 style={{ animationDelay: `${i * 100}ms` }}
//               >
//                 <div className="flex gap-0.5 mb-4">
//                   {Array.from({ length: t.stars }).map((_, j) => (
//                     <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-300 leading-relaxed mb-5">"{t.text}"</p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
//                     {t.name[0]}
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold text-white">{t.name}</div>
//                     <div className="text-xs text-white/40">{t.role}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             CTA BANNER
//         ══════════════════════════════════════ */}
//         <section className="container mx-auto px-6 pb-24">
//           <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-purple-900/60" />
//             <div className="absolute inset-0 border border-purple-500/20 rounded-3xl" />
//             <div
//               className="absolute inset-0 opacity-5"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
//                 backgroundSize: "32px 32px",
//               }}
//             />
//             {/* Glows */}
//             <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

//             <div className="relative text-center px-8 py-20">
//               <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
//                 Ready to Ace Your
//                 <span className="gradient-text"> Next Interview?</span>
//               </h2>
//               <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
//                 Join thousands of candidates who landed their dream jobs with AI Mock Interview.
//               </p>
//               <Link
//                 href="/auth/signup"
//                 className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-purple-500/40 hover:scale-105 group"
//               >
//                 Start for Free
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//               <p className="text-white/30 text-sm mt-4">No credit card required · Free forever</p>
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════
//             FOOTER
//         ══════════════════════════════════════ */}
//         <footer className="border-t border-white/5 container mx-auto px-6 py-10">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
//                 <Zap className="w-4 h-4 text-white" />
//               </div>
//               <span className="font-bold gradient-text">AI Mock Interview</span>
//             </div>
//             <p className="text-white/20 text-sm">© 2025 AI Mock Interview. All rights reserved.</p>
//             <div className="flex gap-6 text-sm text-white/30">
//               <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
//               <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
//               <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
//             </div>
//           </div>
//         </footer>

//       </div>

//       {/* ── Global animate-in styles ── */}
//       <style jsx global>{`
//         .feature-card,
//         .step-item,
//         .stat-item,
//         .testimonial-card {
//           transform: translateY(24px);
//           transition: opacity 0.6s ease, transform 0.6s ease;
//         }
//         .animate-in {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//         }
//         .fade-in-down {
//           animation: fadeInDown 0.7s ease forwards;
//         }
//         .fade-in-up {
//           animation: fadeInUp 0.7s ease forwards;
//           opacity: 0;
//         }
//         .animation-delay-200 { animation-delay: 200ms; }
//         .animation-delay-400 { animation-delay: 400ms; }
//         .animation-delay-600 { animation-delay: 600ms; }
//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </main>
//   );
// }





"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic, Brain, TrendingUp, Star, Zap, Shield, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "50K+", label: "Interviews Completed" },
  { value: "94%", label: "Success Rate" },
  { value: "200+", label: "Job Roles Covered" },
  { value: "4.9★", label: "User Rating" },
];

const features = [
  {
    icon: Mic,
    color: "from-violet-600 to-purple-700",
    glow: "shadow-purple-500/30",
    title: "Voice Interviews",
    desc: "Practice with AI voice agents that simulate real interview scenarios with natural, flowing conversations.",
  },
  {
    icon: Brain,
    color: "from-blue-600 to-cyan-700",
    glow: "shadow-blue-500/30",
    title: "AI-Powered Feedback",
    desc: "Receive instant, detailed feedback on your answers — scored by category, with strengths and improvements.",
  },
  {
    icon: TrendingUp,
    color: "from-emerald-600 to-green-700",
    glow: "shadow-emerald-500/30",
    title: "Track Progress",
    desc: "Monitor your improvement over time with rich analytics, skill stages, and hiring recommendations.",
  },
  {
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/30",
    title: "Instant Generation",
    desc: "AI generates tailored questions for any role, difficulty, and interview type in seconds.",
  },
  {
    icon: Shield,
    color: "from-rose-600 to-pink-700",
    glow: "shadow-rose-500/30",
    title: "Any Role, Any Level",
    desc: "From intern to senior — beginner to expert difficulty. Hundreds of industries supported.",
  },
  {
    icon: Star,
    color: "from-indigo-600 to-violet-700",
    glow: "shadow-indigo-500/30",
    title: "Expert Evaluation",
    desc: "Get a hiring recommendation: Strong Yes, Yes, Maybe, or No — just like a real hiring panel.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Interview",
    desc: "Pick your job role, company, difficulty, and interview type. AI crafts tailored questions instantly.",
    accent: "text-purple-400",
    bar: "bg-purple-500",
  },
  {
    number: "02",
    title: "Practice with AI Voice",
    desc: "Have a real conversation with our AI interviewer. Speak naturally — just like a real interview.",
    accent: "text-blue-400",
    bar: "bg-blue-500",
  },
  {
    number: "03",
    title: "Get Instant Feedback",
    desc: "Receive a full performance breakdown: score, skill stage, strengths, improvements, and a hiring verdict.",
    accent: "text-emerald-400",
    bar: "bg-emerald-500",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Software Engineer @ Google",
    text: "I went from bombing every interview to landing my dream job at Google. The AI feedback was incredibly specific.",
    stars: 5,
  },
  {
    name: "Ahmed R.",
    role: "Product Manager @ Meta",
    text: "The behavioral interview practice was exactly what I needed. The STAR method coaching is unmatched.",
    stars: 5,
  },
  {
    name: "Priya M.",
    role: "Data Scientist @ Amazon",
    text: "Practicing 10 minutes a day for 3 weeks gave me the confidence to ace my final round. Worth every second.",
    stars: 5,
  },
];

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    const selectors = [".feature-card", ".step-item", ".stat-item", ".testimonial-card"];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* ── Grain overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Background orbs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="floating-orb orb-1"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="floating-orb orb-2"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div
          className="floating-orb orb-3"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
        {/* Extra ambient orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "60%",
            right: "-10%",
            transform: `translateY(${scrollY * -0.12}px)`,
          }}
        />
      </div>

      {/* ── Background grid ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ══════════════════════════════════════
          STICKY NAVBAR — matches dashboard navbar style
      ══════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 20 ? "rgba(8, 6, 20, 0.90)" : "rgba(8, 6, 20, 0.30)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrollY > 20
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(255,255,255,0.03)",
          boxShadow: scrollY > 20 ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">

          {/* Logo — identical to dashboard navbar */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">AI Mock Interview</span>
          </Link>

          {/* Center anchor links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "#features", label: "Features" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#testimonials", label: "Reviews" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      <div className="relative z-10">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8 fade-in-down">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            AI-Powered Mock Interview Platform
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight fade-in-up animation-delay-200">
            <span className="gradient-text">Master Your</span>
            <br />
            <span className="text-white">Interview Skills</span>
            <br />
            <span className="gradient-text">with AI</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto fade-in-up animation-delay-400 leading-relaxed">
            Practice real-time interviews with AI voice agents. Get instant, detailed feedback
            and transform your confidence before the big day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up animation-delay-600">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-base font-semibold shadow-xl hover:shadow-purple-500/40 hover:scale-105 group"
            >
              Start Practicing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-base font-medium"
            >
              Sign In
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero visual */}
          <div className="relative mt-20 max-w-3xl mx-auto fade-in-up animation-delay-600">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Mock interview UI */}
              <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-white/30 font-mono">AI Mock Interview · Live Session</span>
              </div>
              <div className="p-8 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                    <p className="text-sm text-white/80 leading-relaxed">
                      Tell me about a time you led a project under tight deadlines. How did you handle the pressure?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-purple-600/20 border border-purple-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                    <p className="text-sm text-purple-200/80 leading-relaxed">
                      Sure! In my last role, I led a 3-person team to deliver a critical feature within 2 weeks…
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white/60">
                    U
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Mic className="w-3.5 h-3.5 text-purple-400" />
                    <span>Listening…</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <section ref={statsRef} className="container mx-auto px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item opacity-0 text-center rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            FEATURES
        ══════════════════════════════════════ */}
        <section id="features" className="container mx-auto px-6 pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
              Everything you need
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Built for <span className="gradient-text">Interview Success</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every feature designed to turn nervous candidates into confident hires.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="feature-card opacity-0 group rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-7 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg ${f.glow} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section id="how-it-works" className="container mx-auto px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
                Simple 3-step process
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                From setup to feedback in under 30 minutes. No setup required.
              </p>
            </div>

            <div ref={howItWorksRef} className="space-y-5">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="step-item opacity-0 flex items-start gap-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-7 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`text-4xl font-black ${step.accent} opacity-30 group-hover:opacity-60 transition-opacity leading-none`}>
                      {step.number}
                    </div>
                    <div className={`h-1 w-8 rounded-full ${step.bar} mt-2 opacity-40 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <div className="pt-1">
                    <h4 className={`text-xl font-bold text-white mb-2 group-hover:${step.accent} transition-colors`}>
                      {step.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════ */}
        <section id="testimonials" className="container mx-auto px-6 pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
              Real results
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Loved by <span className="gradient-text">Job Seekers</span>
            </h2>
          </div>

          <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="testimonial-card opacity-0 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="container mx-auto px-6 pb-24">
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-purple-900/60" />
            <div className="absolute inset-0 border border-purple-500/20 rounded-3xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Glows */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="relative text-center px-8 py-20">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Ace Your
                <span className="gradient-text"> Next Interview?</span>
              </h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                Join thousands of candidates who landed their dream jobs with AI Mock Interview.
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-purple-500/40 hover:scale-105 group"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <p className="text-white/30 text-sm mt-4">No credit card required · Free forever</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="border-t border-white/5 container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold gradient-text">AI Mock Interview</span>
            </div>
            <p className="text-white/20 text-sm">© 2026 AI Mock Interview. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/30">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
            </div>
          </div>
        </footer>

      </div>

      {/* ── Global animate-in styles ── */}
      <style jsx global>{`
        .feature-card,
        .step-item,
        .stat-item,
        .testimonial-card {
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .fade-in-down {
          animation: fadeInDown 0.7s ease forwards;
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease forwards;
          opacity: 0;
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}