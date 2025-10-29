'use client';

import { useState } from 'react';
import { CustomSignIn } from '@/components/auth/CustomSignIn';
import { CustomSignUp } from '@/components/auth/CustomSignUp';
import { AnimatedBackground } from '@/components/app/AnimatedBackground';

/**
 * Minimal authentication hub with tabbed Sign In / Sign Up views
 * atop a subtle animated backdrop.
 */
export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      <AnimatedBackground variant="auth" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 inline-flex w-full rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === 'signin'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === 'signup'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div>
              {activeTab === 'signin' ? (
                <CustomSignIn key="signin" />
              ) : (
                <CustomSignUp key="signup" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
