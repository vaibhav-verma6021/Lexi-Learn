import { Link } from "react-router-dom";
import { BookOpen, Headphones, Eye, Sparkles, BarChart3, Shield, ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TTSButton } from "@/components/TTSButton";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";

const features = [
  { icon: Headphones, title: "Audio-First Learning", description: "Every lesson has audio narration so you can learn by listening instead of reading." },
  { icon: Eye, title: "Dyslexia-Friendly Design", description: "Carefully chosen fonts, colors, and spacing designed for comfortable reading." },
  { icon: Sparkles, title: "Interactive Quizzes", description: "Fun quizzes with instant feedback to test understanding without pressure." },
  { icon: BarChart3, title: "Progress Tracking", description: "Visual dashboard showing your learning journey and achievements." },
  { icon: Shield, title: "Safe & Supportive", description: "A judgment-free space where every learner can progress at their own pace." },
  { icon: Volume2, title: "Text-to-Speech", description: "Click any 'Listen' button to hear content read aloud to you." },
];

const heroText = "Learning should be accessible to everyone. LexiLearn is built specifically for dyslexic students, with audio-first lessons, friendly visuals, and a supportive learning experience.";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Designed for Dyslexic Learners ✨
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Learn Your Way,{" "}
              <span className="text-primary">At Your Pace</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {heroText}
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <TTSButton text={heroText} size="default" />
              <Link to="/courses">
                <Button size="lg" className="gap-2">
                  Explore Courses <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Why LexiLearn?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Built from the ground up with accessibility in mind</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Popular Courses</h2>
              <p className="text-muted-foreground">Start your learning journey today</p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Join thousands of students who are already learning their way with LexiLearn.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="gap-2">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">LexiLearn</span>
            <span>• Accessible learning for everyone</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 LexiLearn. Built with ❤️ for dyslexic learners.</p>
        </div>
      </footer>
    </div>
  );
}
