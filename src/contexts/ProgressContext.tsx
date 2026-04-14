import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  startedAt: string;
  lastAccessedAt: string;
}

interface ProgressState {
  progress: Record<string, CourseProgress>;
  completeLesson: (courseId: string, lessonId: string) => void;
  saveQuizScore: (courseId: string, quizId: string, score: number) => void;
  getCourseProgress: (courseId: string) => number;
  getCompletedCourseIds: () => string[];
  totalLessonsCompleted: number;
  totalQuizzesTaken: number;
  averageScore: number;
}

const ProgressContext = createContext<ProgressState | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, CourseProgress>>(() => {
    const saved = localStorage.getItem("learning-progress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("learning-progress", JSON.stringify(progress));
  }, [progress]);

  const ensureCourse = (courseId: string): CourseProgress => {
    return progress[courseId] || {
      courseId,
      completedLessons: [],
      quizScores: {},
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    };
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setProgress(prev => {
      const cp = ensureCourse(courseId);
      if (cp.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        [courseId]: {
          ...cp,
          completedLessons: [...cp.completedLessons, lessonId],
          lastAccessedAt: new Date().toISOString(),
        },
      };
    });
  };

  const saveQuizScore = (courseId: string, quizId: string, score: number) => {
    setProgress(prev => {
      const cp = ensureCourse(courseId);
      return {
        ...prev,
        [courseId]: {
          ...cp,
          quizScores: { ...cp.quizScores, [quizId]: score },
          lastAccessedAt: new Date().toISOString(),
        },
      };
    });
  };

  const getCourseProgress = (courseId: string): number => {
    const cp = progress[courseId];
    if (!cp) return 0;
    // Simple: lessons completed out of a max (we'll compute against actual course data elsewhere)
    return cp.completedLessons.length;
  };

  const getCompletedCourseIds = (): string[] => {
    return Object.keys(progress).filter(id => (progress[id]?.completedLessons.length || 0) >= 3);
  };

  const totalLessonsCompleted = Object.values(progress).reduce((sum, cp) => sum + cp.completedLessons.length, 0);
  const allScores = Object.values(progress).flatMap(cp => Object.values(cp.quizScores));
  const totalQuizzesTaken = allScores.length;
  const averageScore = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  return (
    <ProgressContext.Provider value={{ progress, completeLesson, saveQuizScore, getCourseProgress, getCompletedCourseIds, totalLessonsCompleted, totalQuizzesTaken, averageScore }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
