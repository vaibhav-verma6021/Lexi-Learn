import { Link } from "react-router-dom";
import { Course } from "@/data/courses";
import { useProgress } from "@/contexts/ProgressContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TTSButton } from "@/components/TTSButton";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { progress } = useProgress();
  const cp = progress[course.id];
  const completedCount = cp?.completedLessons.length || 0;
  const progressPercent = Math.round((completedCount / course.lessons.length) * 100);

  const difficultyColor = {
    beginner: "bg-success/20 text-success",
    intermediate: "bg-warning/20 text-warning",
    advanced: "bg-destructive/20 text-destructive",
  };

  return (
    <Link to={`/courses/${course.id}`} className="group block">
      <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
        {/* Icon & category */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{course.image}</span>
          <TTSButton text={`${course.title}. ${course.shortDescription}`} size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="secondary" className="text-xs">{course.category}</Badge>
          <Badge className={`text-xs border-0 ${difficultyColor[course.difficulty]}`}>{course.difficulty}</Badge>
          <span className="text-xs text-muted-foreground">{course.duration}</span>
        </div>

        {/* Progress */}
        {completedCount > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedCount}/{course.lessons.length} lessons</span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}
      </div>
    </Link>
  );
}
