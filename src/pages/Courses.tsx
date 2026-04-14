import { useState } from "react";
import { courses, categories } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TTSButton } from "@/components/TTSButton";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("all");

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    const matchDiff = difficulty === "all" || c.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const pageDescription = `Browse ${courses.length} courses designed for dyslexic learners. All courses feature audio narration and visual learning.`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Courses</h1>
            <TTSButton text={pageDescription} />
          </div>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-2 mb-6">
          {["all", "beginner", "intermediate", "advanced"].map(d => (
            <Button
              key={d}
              variant={difficulty === d ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDifficulty(d)}
              className="capitalize"
            >
              {d === "all" ? "All Levels" : d}
            </Button>
          ))}
        </div>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-2">No courses found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
