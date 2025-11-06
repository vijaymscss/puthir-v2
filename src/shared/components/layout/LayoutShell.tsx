'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import { AnimatedBackground } from '@/features/home/components/AnimatedBackground';

const NAVBAR_EXCLUDED_PREFIXES = ['/auth'];

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const hideNavbar = pathname
    ? NAVBAR_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
    : false;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {!hideNavbar && <AnimatedBackground className="hidden md:block" />}
      {!hideNavbar && <Navbar />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
