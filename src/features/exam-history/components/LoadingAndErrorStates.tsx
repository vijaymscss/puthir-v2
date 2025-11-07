import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export function LoadingState() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Loading Exam History
          </h2>
          <p className="text-muted-foreground">Fetching your quiz results...</p>
        </div>
      </div>
    </main>
  );
}

export function AuthRequiredState() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-blue-500 text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Authentication Required
        </h2>
        <p className="text-muted-foreground mb-6">
          Please sign in to view your exam history.
        </p>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    </main>
  );
}

export function ErrorState({ error }: { error?: string }) {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Error Loading History
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || "Failed to load exam history"}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    </main>
  );
}

export function InitialLoadingState() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </main>
  );
}
