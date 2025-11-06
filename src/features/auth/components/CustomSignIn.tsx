'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useTheme } from 'next-themes';
import Image from 'next/image';

/**
 * Custom Clerk Sign-in component with Tailwind CSS styling
 * Provides email/password authentication and OAuth providers
 */
export function CustomSignIn({ onSwitchToSignUp }: { onSwitchToSignUp?: () => void }) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔵 Sign-in button clicked');
    
    if (!isLoaded) {
      console.log('❌ Clerk not loaded yet');
      return;
    }
    
    if (!signIn) {
      console.log('❌ signIn object is undefined');
      return;
    }

    console.log('✅ Starting sign-in process...', { email });
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        strategy: 'password',
        identifier: email,
        password: password,
      });

      console.log('📦 Sign-in result:', result.status);

      if (result.status === 'complete') {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
        }
        console.log('✅ Sign-in complete, redirecting...');
        router.push('/');
      } else {
        console.log('⚠️ Sign-in incomplete:', result.status);
        setError('Sign-in incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('❌ Sign-in error:', err);
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your email and password.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    if (!isLoaded || !signIn) return;

    setIsLoading(true);
    setError('');

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (err: any) {
      console.error(`OAuth error for ${provider}:`, err);
      const providerName = provider === 'oauth_google' ? 'Google' : provider === 'oauth_facebook' ? 'Facebook' : 'Apple';
      setError(err.errors?.[0]?.message || `Failed to sign in with ${providerName}. Please make sure it's enabled in your account settings.`);
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[160px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Sign-in card */}
        <div className="rounded-3xl border border-slate-100 bg-white/95 p-8 shadow-xl shadow-blue-200/50 backdrop-blur-sm transition-shadow duration-300">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-20 items-center justify-center gap-2" suppressHydrationWarning>
              <Image
                src='/cpt_logo_light.png'
                alt="Cloud Practice Test"
                width={90}
                height={90}
                priority
              /> 
              <div className='text-left'>
              <p className='font-bold text-2xl text-blue-900'>Cloud Practice Test</p>
              <p className='text-sm text-slate-500'>The product of Cloud-V</p>
              </div>
            </div>
            <div className="space-y-1 mt-5">
              <h2 className="text-xl font-semibold text-slate-500">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500">
                Sign in to manage your cloud practice journey.
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-pulse-scale" suppressHydrationWarning>
              <p className="text-sm text-red-800 dark:text-red-300 font-medium" suppressHydrationWarning>
                {error}
              </p>
            </div>
          )}

          {/* Email/Password form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {/* Email input */}
            <div className="space-y-2 animate-fade-in-up pt-5" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password input */}
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 transition hover:text-blue-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M15.171 13.576l1.414 1.414A10.025 10.025 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l1.414 1.414A7.971 7.971 0 0110 5c3.59 0 6.761 1.816 8.171 4.576z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign-in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#2563ff] via-[#5a3dff] to-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5a3dff]/40 transition hover:scale-[1.02] hover:shadow-[#5a3dff]/60 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={(e) => {
                console.log('🟢 Native button clicked!');
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                '🔐 Sign in & Start'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm py-5">
              <span className="px-3 bg-white text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('oauth_google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              title="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="hidden sm:inline text-sm">Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('oauth_facebook')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              title="Sign in with Facebook"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="hidden sm:inline text-sm">Facebook</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('oauth_apple')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              title="Sign in with Apple"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.97-.06 1.93-.25 2.85-.2 1.63.11 2.74.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.04-2.75 2.13z" />
              </svg>
              <span className="hidden sm:inline text-sm">Apple</span>
            </button>
          </div>

          {/* Sign-up link */}
          <p className="text-center text-sm text-slate-500 pt-2">
            Don't have an account?{' '}
            {onSwitchToSignUp ? (
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Sign up
              </button>
            ) : (
              <Link
                href="/sign-up"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign up
              </Link>
            )}
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="font-medium text-blue-600 underline-offset-4 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-blue-600 underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
