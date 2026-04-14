import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { courses, getRecommendations } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Progress } from "@/components/ui/progress";
import { TTSButton } from "@/components/TTSButton";
import { BookOpen, Trophy, Brain, TrendingUp, Sparkles } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { progress, totalLessonsCompleted, totalQuizzesTaken, averageScore, getCompletedCourseIds } = useProgress();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><span className="animate-spin text-2xl">⏳</span></div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  const activeCourses = Object.keys(progress).map(id => courses.find(c => c.id === id)).filter(Boolean) as typeof courses;
  const recommendations = getRecommendations(getCompletedCourseIds());

  const dashboardSummary = `Welcome back ${user?.name}. You have completed ${totalLessonsCompleted} lessons and taken ${totalQuizzesTaken} quizzes with an average score of ${averageScore}%.`;

  const stats = [
    { icon: BookOpen, label: "Lessons Done", value: totalLessonsCompleted, color: "text-primary" },
    { icon: Brain, label: "Quizzes Taken", value: totalQuizzesTaken, color: "text-secondary" },
    { icon: Trophy, label: "Avg Score", value: `${averageScore}%`, color: "text-warning" },
    { icon: TrendingUp, label: "Active Courses", value: activeCourses.length, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {user?.name} {user?.avatar}
            </h1>
            <TTSButton text={dashboardSummary} />
          </div>
          <p className="text-muted-foreground">Track your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
              <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Active courses */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Your Courses</h2>
          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">You haven't started any courses yet</p>
              <Link to="/courses"><Button>Browse Courses</Button></Link>
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-warning" />
              <h2 className="text-xl font-bold text-foreground">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
