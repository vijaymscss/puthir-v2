'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * SSO Callback page for handling OAuth redirects from Clerk
 * Automatically redirects to home after successful authentication
 */
export default function SSOCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after OAuth callback is processed
    const timer = setTimeout(() => {
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm text-center">
          {/* Loading indicator */}
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
          </div>

          {/* Text */}
          <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Completing Sign In
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Redirecting you to your dashboard...
            </p>
          </div>

          {/* Decorative message */}
          <p className="text-sm text-gray-500 dark:text-gray-500 animate-pulse">
            Please wait while we complete your authentication
          </p>
        </div>
      </div>
    </div>
  );
}
