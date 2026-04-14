import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { courses } from "@/data/courses";
import { useProgress } from "@/contexts/ProgressContext";
import { TTSButton } from "@/components/TTSButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowLeft, BookOpen, Clock, PlayCircle, Headphones, Sparkles } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const { progress, completeLesson, saveQuizScore } = useProgress();
  const [activeTab, setActiveTab] = useState<"lessons" | "quiz">("lessons");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Course not found</p>
          <Link to="/courses"><Button>Back to Courses</Button></Link>
        </div>
      </div>
    );
  }

  const cp = progress[course.id];
  const completedLessons = cp?.completedLessons || [];
  const progressPercent = Math.round((completedLessons.length / course.lessons.length) * 100);

  const typeIcon = { video: PlayCircle, audio: Headphones, interactive: Sparkles };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const correct = course.quizzes.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
    const score = Math.round((correct / course.quizzes.length) * 100);
    course.quizzes.forEach(q => {
      saveQuizScore(course.id, q.id, quizAnswers[q.id] === q.correctAnswer ? 100 : 0);
    });
  };

  const quizScore = quizSubmitted
    ? Math.round((course.quizzes.filter(q => quizAnswers[q.id] === q.correctAnswer).length / course.quizzes.length) * 100)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </Link>

        {/* Header */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{course.image}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline" className="capitalize">{course.difficulty}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">{course.title}</h1>
              <div className="flex items-center gap-2">
                <TTSButton text={course.description} />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedLessons.length}/{course.lessons.length} lessons completed</span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button variant={activeTab === "lessons" ? "default" : "outline"} onClick={() => setActiveTab("lessons")} className="gap-2">
            <BookOpen className="h-4 w-4" /> Lessons ({course.lessons.length})
          </Button>
          <Button variant={activeTab === "quiz" ? "default" : "outline"} onClick={() => setActiveTab("quiz")} className="gap-2">
            <Sparkles className="h-4 w-4" /> Quiz ({course.quizzes.length})
          </Button>
        </div>

        {/* Lessons */}
        {activeTab === "lessons" && (
          <div className="space-y-4">
            {course.lessons.map((lesson, i) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const Icon = typeIcon[lesson.type];
              return (
                <div key={lesson.id} className={`rounded-xl border p-5 transition-all ${isCompleted ? "border-success/30 bg-success/5" : "border-border bg-card"}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isCompleted ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground uppercase">{lesson.type} • {lesson.duration}</span>
                      </div>
                      <h3 className="font-semibold text-card-foreground mb-2">Lesson {i + 1}: {lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{lesson.content}</p>
                      <div className="flex items-center gap-2">
                        <TTSButton text={`${lesson.title}. ${lesson.content}`} />
                        {!isCompleted && (
                          <Button size="sm" variant="secondary" onClick={() => completeLesson(course.id, lesson.id)}>
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quiz */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {quizSubmitted && quizScore !== null && (
              <div className={`rounded-xl p-6 text-center ${quizScore >= 70 ? "bg-success/10 border border-success/30" : "bg-warning/10 border border-warning/30"}`}>
                <p className="text-2xl font-bold mb-1">{quizScore}%</p>
                <p className="text-sm text-muted-foreground">
                  {quizScore >= 70 ? "Great job! You passed! 🎉" : "Keep practicing! You can try again. 💪"}
                </p>
              </div>
            )}
            {course.quizzes.map((quiz, qi) => {
              const userAnswer = quizAnswers[quiz.id];
              return (
                <div key={quiz.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-primary">Question {qi + 1}</span>
                    <TTSButton text={`Question ${qi + 1}: ${quiz.question}. Options: ${quiz.options.join(", ")}`} size="icon" />
                  </div>
                  <p className="font-semibold text-card-foreground mb-4">{quiz.question}</p>
                  <div className="space-y-2">
                    {quiz.options.map((opt, oi) => {
                      let optClass = "border-border hover:border-primary/50";
                      if (quizSubmitted) {
                        if (oi === quiz.correctAnswer) optClass = "border-success bg-success/10";
                        else if (oi === userAnswer && oi !== quiz.correctAnswer) optClass = "border-destructive bg-destructive/10";
                      } else if (userAnswer === oi) {
                        optClass = "border-primary bg-primary/10";
                      }
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [quiz.id]: oi }))}
                          className={`w-full text-left rounded-lg border p-3 text-sm transition-colors ${optClass}`}
                          disabled={quizSubmitted}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {!quizSubmitted && (
              <Button
                size="lg"
                className="w-full"
                disabled={Object.keys(quizAnswers).length < course.quizzes.length}
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </Button>
            )}
            {quizSubmitted && (
              <Button variant="outline" className="w-full" onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
