'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Mail, KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // STEP 1: Send OTP to email
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase!.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });
      if (error) throw error;
      setStep('otp');
    } catch (error: any) {
      if (error.status === 429 || error.message?.includes('rate')) {
        setError('Too many attempts. Please wait a few minutes and try again.');
      } else {
        setError('Failed to send code. Make sure this email is registered.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Send code + new password to our API route (server-side, no context conflict)
  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setIsLoading(true);
    try {
      // Call our server-side API route — no client context interference
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: otp, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      setStep('success');
      setTimeout(() => router.push('/auth/login'), 2500);

    } catch (error: any) {
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">

        {/* STEP 1 — Enter Email */}
        {step === 'email' && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email — we'll send you a verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-500">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? 'Sending Code...' : <><Mail className="w-4 h-4" />Send Verification Code</>}
                </Button>
                <div className="text-center">
                  <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-white flex items-center justify-center gap-1 transition-colors">
                    <ArrowLeft className="w-3 h-3" /> Back to Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {/* STEP 2 — Enter Code + New Password */}
        {step === 'otp' && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Enter the code sent to
                <span className="block text-purple-400 font-medium mt-1">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyAndReset} className="space-y-4">

                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="12345678"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    required
                    disabled={isLoading}
                    maxLength={8}
                    className="text-center text-2xl tracking-[0.4em] font-bold"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Check your inbox and spam folder
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <p className={`text-xs ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                      {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-500">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading || otp.length < 6 || password !== confirmPassword || password.length < 6}
                >
                  {isLoading ? 'Resetting Password...' : <><KeyRound className="w-4 h-4" />Verify & Reset Password</>}
                </Button>

                <div className="flex justify-between text-sm">
                  <button type="button"
                    onClick={() => { setStep('email'); setError(''); setOtp(''); }}
                    className="text-purple-400 hover:text-purple-300 hover:underline">
                    Resend code
                  </button>
                  <button type="button"
                    onClick={() => { setStep('email'); setError(''); setOtp(''); setPassword(''); setConfirmPassword(''); }}
                    className="text-muted-foreground hover:text-white transition-colors">
                    Start over
                  </button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h3 className="font-semibold text-white text-xl">Password Updated!</h3>
            <p className="text-sm text-muted-foreground">Your password has been reset successfully.</p>
            <p className="text-xs text-purple-400 animate-pulse">Redirecting to login...</p>
          </CardContent>
        )}

        {/* Step progress dots */}
        {step !== 'success' && (
          <div className="flex justify-center gap-2 pb-6">
            {(['email', 'otp'] as const).map((s, i) => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${
                (['email', 'otp'] as const).indexOf(step) >= i ? 'w-8 bg-purple-500' : 'w-4 bg-white/10'
              }`} />
            ))}
          </div>
        )}

      </Card>
    </div>
  );
}