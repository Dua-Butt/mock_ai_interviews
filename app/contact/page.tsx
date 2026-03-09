'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Zap, Mail, MessageSquare, User, Send, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    topic: '',
    name: '',
    email: '',
    subject: '',
    details: '',
  });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.details) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch (e) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>

      {/* Grid overlay */}
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

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-xl shadow-purple-500/30 mb-6">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Contact the Help Team</h1>
          <p className="text-white/40 text-base">We usually respond within 24 hours.</p>
        </div>

        {submitted ? (
          /* Success state */
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm p-12 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
            <p className="text-white/50">Thanks for reaching out, {form.name}. We'll get back to you at {form.email} soon.</p>
            <Link href="/"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40">
              Back to Home
            </Link>
          </div>
        ) : (
          /* Form */
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-6">

            {/* Topic */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">What can we help you with?</label>
              <select
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff40' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
              >
                <option value="" className="bg-[#0d0b1f]">Select a topic…</option>
                <option value="account" className="bg-[#0d0b1f]">Account & Billing</option>
                <option value="technical" className="bg-[#0d0b1f]">Technical Issue</option>
                <option value="interview" className="bg-[#0d0b1f]">Interview Feature</option>
                <option value="feedback" className="bg-[#0d0b1f]">General Feedback</option>
                <option value="other" className="bg-[#0d0b1f]">Other</option>
              </select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Your name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Khan"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> E-mail address
              </label>
              <input
                type="email"
                placeholder="e.g. sarah@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Subject</label>
              <input
                type="text"
                placeholder="Brief summary of your issue"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> Details
              </label>
              <textarea
                rows={5}
                placeholder="Please describe your question or issue in detail…"
                value={form.details}
                onChange={e => setForm({ ...form, details: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email || !form.subject || !form.details}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? 'Sending…' : 'Submit'}
            </button>

          </div>
        )}
      </div>
    </main>
  );
}