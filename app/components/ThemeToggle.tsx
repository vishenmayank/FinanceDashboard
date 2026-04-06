"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggleTheme}
      className="w-full sm:w-auto"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle color mode"}
    >
      {mounted && theme === "dark" ? <Sun /> : <Moon />}
      <span>{mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}</span>
    </Button>
  );
}
