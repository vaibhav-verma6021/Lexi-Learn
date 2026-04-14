import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TTSButton } from "@/components/TTSButton";
import { User, Mail, Shield, BookOpen, Brain, Trophy } from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { totalLessonsCompleted, totalQuizzesTaken, averageScore } = useProgress();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><span className="animate-spin text-2xl">⏳</span></div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  const profileSummary = `${user.name}'s profile. Role: ${user.role}. ${totalLessonsCompleted} lessons completed, ${totalQuizzesTaken} quizzes taken, average score ${averageScore}%.`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <TTSButton text={profileSummary} />
        </div>

        {/* Avatar & info */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6 text-center">
          <span className="text-6xl block mb-3">{user.avatar}</span>
          <h2 className="text-xl font-bold text-card-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="inline-block mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">{user.role}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-card-foreground">{totalLessonsCompleted}</p>
            <p className="text-xs text-muted-foreground">Lessons</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Brain className="h-5 w-5 mx-auto mb-1 text-secondary" />
            <p className="text-lg font-bold text-card-foreground">{totalQuizzesTaken}</p>
            <p className="text-xs text-muted-foreground">Quizzes</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Trophy className="h-5 w-5 mx-auto mb-1 text-warning" />
            <p className="text-lg font-bold text-card-foreground">{averageScore}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
        </div>

        {/* Actions */}
        <Button variant="destructive" onClick={() => logout()} className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
