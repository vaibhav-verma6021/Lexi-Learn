import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityState {
  fontSize: "sm" | "md" | "lg" | "xl";
  darkMode: boolean;
  toggleDarkMode: () => void;
  setFontSize: (size: "sm" | "md" | "lg" | "xl") => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityState | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<"sm" | "md" | "lg" | "xl">(() => {
    return (localStorage.getItem("a11y-fontSize") as any) || "md";
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("a11y-darkMode") === "true";
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("a11y-darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-(sm|md|lg|xl)/g, "")
      .trim();
    document.documentElement.classList.add(`font-size-${fontSize}`);
    localStorage.setItem("a11y-fontSize", fontSize);
  }, [fontSize]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const setFontSize = (size: "sm" | "md" | "lg" | "xl") => setFontSizeState(size);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider value={{ fontSize, darkMode, toggleDarkMode, setFontSize, speak, stopSpeaking, isSpeaking }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
