'use client';

import { useState } from 'react';
import { CustomSignIn } from '@/components/auth/CustomSignIn';
import { CustomSignUp } from '@/components/auth/CustomSignUp';

/**
 * Blue-themed authentication hub with split layout inspired by the provided mock.
 */
export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const renderTabButton = (
    label: string,
    tab: 'signin' | 'signup',
    variant: 'desktop' | 'mobile',
  ) => {
    const isActive = activeTab === tab;

    if (variant === 'desktop') {
      return (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`w-full rounded-full px-6 py-3 text-sm font-semibold tracking-[0.35em] transition-all ${
            isActive
              ? 'bg-white text-blue-700 shadow-lg shadow-blue-500/40'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {label}
        </button>
      );
    }

    return (
      <button
        key={tab}
        type="button"
        onClick={() => setActiveTab(tab)}
        className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white shadow'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020a3a]">
      <div className="flex min-h-screen w-full flex-col overflow-hidden md:flex-row">
        {/* Decorative gradient panel */}
        <aside className="relative hidden w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#030617] via-[#0b1c3c] to-[#143d86] p-10 text-white md:flex md:w-2/5">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -left-24 h-64 w-64 rounded-3xl bg-blue-500/30 blur-3xl" />
            <div className="absolute top-32 -left-16 h-72 w-72 -rotate-6 rounded-3xl bg-blue-400/25 blur-3xl" />
            <div className="absolute bottom-[-4rem] left-10 h-80 w-80 rotate-12 rounded-3xl bg-indigo-500/30 blur-3xl" />
            <div className="absolute top-24 right-[-30%] h-[420px] w-[420px] rotate-12 rounded-[160px] bg-gradient-to-br from-blue-500/40 to-cyan-400/30 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-blue-100">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
              Trusted by 20k+ cloud learners
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold leading-tight">
                Master cloud certifications with an AI-powered study copilot.
              </h2>
              <p className="text-sm text-blue-100/85 leading-relaxed">
                Cloud Practice Test delivers adaptive prep for AWS, Azure, and Google Cloud. Unlock curated question banks, targeted revision plans, and deep analytics that keep your momentum strong until exam day.
              </p>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/30">
                  <svg className="h-5 w-5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Exam-like simulations</p>
                  <p className="text-xs text-blue-100/70">Timed practice sets calibrated to official blueprints.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/30">
                  <svg className="h-5 w-5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real-time coaching</p>
                  <p className="text-xs text-blue-100/70">AI feedback pinpoints weak topics and suggests next steps.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/30">
                  <svg className="h-5 w-5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2m4 0h2a2 2 0 012 2v2m0 4v-2m0 0h-2a2 2 0 01-2-2v-2m0 0V9a2 2 0 00-2-2H9m4-4H7a2 2 0 00-2 2v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Team-ready insights</p>
                  <p className="text-xs text-blue-100/70">Share dashboards and study paths with peers or cohorts.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-white">92%</p>
                <p className="text-xs text-blue-100/70">Pass rate across learners</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-white">+38%</p>
                <p className="text-xs text-blue-100/70">Average score improvement</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200/70">Learner spotlight</p>
              <p className="mt-2 text-sm text-blue-100/85">“Cloud Practice Test kept me laser-focused on the topics that mattered. I cleared my AWS Professional exam on the first attempt.”</p>
              <p className="mt-3 text-xs font-medium text-blue-200/80">— Priya S., Cloud Solutions Architect</p>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex justify-end">
            <div className="flex gap-3 rounded-full bg-white/10 p-2 backdrop-blur-sm">
              {renderTabButton('LOGIN', 'signin', 'desktop')}
              {renderTabButton('SIGNUP', 'signup', 'desktop')}
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <section className="relative z-10 flex w-full flex-1 flex-col justify-center bg-white px-6 py-10 sm:px-10 md:w-3/5 md:py-12">
          <div className="mb-8 flex justify-center md:hidden">
            <div className="inline-flex w-full max-w-sm rounded-full bg-slate-100 p-1">
              {renderTabButton('Sign In', 'signin', 'mobile')}
              {renderTabButton('Sign Up', 'signup', 'mobile')}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            {activeTab === 'signin' ? (
              <CustomSignIn key="signin" onSwitchToSignUp={() => setActiveTab('signup')} />
            ) : (
              <CustomSignUp key="signup" onSwitchToSignIn={() => setActiveTab('signin')} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
