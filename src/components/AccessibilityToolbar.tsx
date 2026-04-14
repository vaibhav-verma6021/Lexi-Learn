import { Sun, Moon, Type, Minus, Plus } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";

const fontSizes = ["sm", "md", "lg", "xl"] as const;

export function AccessibilityToolbar() {
  const { fontSize, darkMode, toggleDarkMode, setFontSize } = useAccessibility();

  const currentIndex = fontSizes.indexOf(fontSize);

  const decrease = () => {
    if (currentIndex > 0) setFontSize(fontSizes[currentIndex - 1]);
  };

  const increase = () => {
    if (currentIndex < fontSizes.length - 1) setFontSize(fontSizes[currentIndex + 1]);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Font size controls */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1">
        <Type className="h-4 w-4 text-muted-foreground" />
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={decrease} disabled={currentIndex === 0}>
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-xs font-medium uppercase text-muted-foreground w-6 text-center">{fontSize}</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={increase} disabled={currentIndex === fontSizes.length - 1}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Dark mode toggle */}
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
