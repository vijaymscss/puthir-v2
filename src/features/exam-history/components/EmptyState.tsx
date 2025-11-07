import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

export function EmptyState() {
  return (
    <Card className="border-2 border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
      <CardContent className="p-16 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">
          Ready to Start Learning?
        </h3>
        <p className="text-gray-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
          Your exam history will appear here. Take your first quiz to begin tracking your progress and achievements.
        </p>
        <Link href="/quiz-setup">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            🚀 Start Your First Quiz
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
