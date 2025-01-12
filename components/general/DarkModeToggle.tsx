"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Optional helper for classnames

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const modes = [
    { label: "Light", icon: <Sun className="h-4 w-4" />, value: "light" },
    { label: "Dark", icon: <Moon className="h-4 w-4" />, value: "dark" },
    { label: "System", icon: <Monitor className="h-4 w-4" />, value: "system" },
  ];

  return (
    <div className="flex justify-center items-center space-x-1 bg-secondary/50 rounded-lg p-1">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setTheme(mode.value)}
          className={cn(
            "flex items-center justify-center px-2 py-1 rounded-md transition-colors",
            theme === mode.value
              ? "bg-primary text-black dark:text-white"
              : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          )}
          aria-label={`Set theme to ${mode.label}`}
        >
          {mode.icon}
          <span className="sr-only">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
