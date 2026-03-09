'use client';

import Link from 'next/link';
import { Zap, ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, XCircle, Scale } from 'lucide-react';

const sections = [
  {
    icon: CheckCircle,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    title: 'Acceptance of Terms',
    content: `By accessing or using AI Mock Interview ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time, and continued use of the platform constitutes your acceptance of any changes.`,
  },
  {
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    title: 'Use of the Platform',
    content: `AI Mock Interview is provided for personal, non-commercial interview practice. You agree to use the platform lawfully, honestly, and in a way that does not harm other users or third parties. You may not attempt to reverse-engineer, scrape, or exploit the platform's AI systems.`,
  },
  {
    icon: Shield,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    title: 'Account Responsibilities',
    content: `You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration. You are responsible for all activity that occurs under your account. Notify us immediately if you suspect unauthorized use of your account.`,
  },
  {
    icon: Scale,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    title: 'Intellectual Property',
    content: `All content on the platform, including AI-generated questions, feedback, and UI elements, is owned by or licensed to AI Mock Interview. Your interview responses remain your property. You grant us a limited license to process your responses solely to deliver the service. You may not reproduce or redistribute platform content.`,
  },
  {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    title: 'Disclaimers',
    content: `AI Mock Interview is an educational practice tool. We do not guarantee job placement or interview success. AI feedback is generated automatically and may not be perfect. The platform is provided "as is" without warranties of any kind, express or implied.`,
  },
  {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, AI Mock Interview shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid us in the past 12 months.`,
  },
  {
    icon: FileText,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    title: 'Termination',
    content: `We may suspend or terminate your account at any time for violations of these terms, without prior notice. You may delete your account at any time. Upon termination, your right to use the platform ceases immediately. Provisions that by their nature should survive termination will remain in effect.`,
  },
  {
    icon: Scale,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    title: 'Governing Law',
    content: `These terms are governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through binding arbitration. If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
        style={{ background: 'rgba(8, 6, 20, 0.90)' }}>
        <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Mock Interview
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-xl shadow-purple-500/30 mb-6">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
            Last updated: January 2026
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Please read these terms carefully before using the AI Mock Interview platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`rounded-2xl border ${section.border} ${section.bg} backdrop-blur-sm p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl ${section.bg} border ${section.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-white/20 font-mono">0{i + 1}</span>
                      <h2 className={`text-base font-bold ${section.color}`}>{section.title}</h2>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-white/30 leading-relaxed">
            Questions about these terms?{' '}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact our team
            </Link>
            {' '}and we'll be happy to help.
          </p>
        </div>
      </div>
    </main>
  );
}