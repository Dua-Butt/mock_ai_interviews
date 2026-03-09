'use client';

import Link from 'next/link';
import { Zap, ArrowLeft, Shield, Database, Eye, Lock, UserCheck, Bell, Trash2, Globe } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    title: 'Information We Collect',
    items: [
      'Account information: name, email address, and password (encrypted)',
      'Interview data: job roles, responses, scores, and AI-generated feedback',
      'Usage data: pages visited, features used, and session duration',
      'Device information: browser type, operating system, and IP address',
    ],
  },
  {
    icon: Database,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    title: 'How We Use Your Information',
    items: [
      'To provide and improve the AI Mock Interview service',
      'To generate personalized interview questions and feedback',
      'To track your progress and show performance analytics',
      'To send service-related emails and important updates',
      'To ensure platform security and prevent fraud',
    ],
  },
  {
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    title: 'Data Security',
    items: [
      'All data is encrypted in transit using TLS/SSL',
      'Passwords are hashed using industry-standard bcrypt encryption',
      'We use Supabase with row-level security for database access',
      'Regular security audits and vulnerability assessments are performed',
      'We never store raw audio recordings — only transcribed text',
    ],
  },
  {
    icon: UserCheck,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    title: 'Data Sharing',
    items: [
      'We do not sell your personal data to third parties',
      'AI processing is done via secured API providers (e.g. Groq, Anthropic)',
      'We may share data with law enforcement if legally required',
      'Anonymized, aggregated data may be used for research and improvement',
    ],
  },
  {
    icon: Bell,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    title: 'Cookies & Tracking',
    items: [
      'We use essential cookies to keep you logged in',
      'No advertising or cross-site tracking cookies are used',
      'Analytics are privacy-respecting and do not identify individuals',
      'You can clear cookies at any time in your browser settings',
    ],
  },
  {
    icon: Lock,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    title: 'Your Rights',
    items: [
      'Access: request a copy of all data we hold about you',
      'Correction: update inaccurate personal information at any time',
      'Deletion: permanently delete your account and all associated data',
      'Portability: export your interview history in a readable format',
      'Opt-out: unsubscribe from non-essential communications anytime',
    ],
  },
  {
    icon: Trash2,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    title: 'Data Retention',
    items: [
      'Account data is retained as long as your account is active',
      'Interview data is kept for 2 years to support progress tracking',
      'Deleted accounts are permanently purged within 30 days',
      'Backup copies are cleared on a 90-day rolling basis',
    ],
  },
  {
    icon: Globe,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    title: 'International Users',
    items: [
      'Data may be stored and processed in the United States',
      'We comply with GDPR requirements for users in the European Union',
      'We comply with applicable data protection laws in all regions we operate',
      'By using the platform, you consent to cross-border data transfers',
    ],
  },
];

export default function PrivacyPage() {
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 shadow-xl shadow-emerald-500/30 mb-6">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
            Last updated: January 2026
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Your privacy matters. Here's exactly what data we collect, how we use it, and how we protect it.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className={`rounded-2xl border ${section.border} ${section.bg} backdrop-blur-sm p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl ${section.bg} border ${section.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-white/20 font-mono">0{i + 1}</span>
                      <h2 className={`text-base font-bold ${section.color}`}>{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-white/60">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.color.replace('text-', 'bg-')}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center space-y-2">
          <p className="text-sm text-white/30 leading-relaxed">
            Have a privacy concern or request?{' '}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact our team
            </Link>
            {' '}— we respond within 48 hours.
          </p>
          <p className="text-xs text-white/20">
            AI Mock Interview · Privacy Team · privacy@aimockinterview.com
          </p>
        </div>
      </div>
    </main>
  );
}