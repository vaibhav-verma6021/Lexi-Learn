import { Volume2, VolumeX } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";

interface TTSButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
}

export function TTSButton({ text, className = "", size = "sm" }: TTSButtonProps) {
  const { speak, stopSpeaking, isSpeaking } = useAccessibility();

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleClick}
      className={`gap-2 ${className}`}
      aria-label={isSpeaking ? "Stop reading aloud" : "Read aloud"}
    >
      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      {size !== "icon" && (isSpeaking ? "Stop" : "Listen")}
    </Button>
  );
}
