import { cn } from '@/lib/utils';

type AnimatedBackgroundProps = {
  /**
   * Choose a preset layout for background elements.
   * "auth" softens the palette for authentication screens.
   */
  variant?: 'default' | 'auth';
  className?: string;
};

export function AnimatedBackground({ variant = 'default', className }: AnimatedBackgroundProps) {
  const isAuth = variant === 'auth';

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div
        className={cn(
          'absolute aspect-square w-[70vw] max-w-3xl translate-x-[-10%] rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-indigo-500/20 blur-3xl animate-soft-glow',
          isAuth ? '-top-[35vh] left-1/2 -translate-x-1/2 md:-top-[28vh]' : '-top-[38vh] left-[-10%] md:left-[2%]',
        )}
      />

      <div
        className={cn(
          'absolute aspect-square w-[55vw] max-w-2xl rounded-full bg-gradient-to-tr from-violet-500/15 via-purple-500/10 to-emerald-400/10 blur-3xl animate-soft-drift',
          isAuth ? 'bottom-[-32vh] right-1/2 translate-x-1/2 md:bottom-[-26vh]' : 'bottom-[-40vh] right-[-15%] md:right-[5%]',
        )}
      />

      <div
        className={cn(
          'absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_55%)] mix-blend-screen animate-gradient-slow',
          isAuth ? 'opacity-60' : 'opacity-40',
        )}
      />
    </div>
  );
}
