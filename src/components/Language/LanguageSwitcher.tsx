"use client"

import React from "react"
import { useLanguage } from "@/components/Language/LanguageProvider"

interface LanguageSwitcherProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  orientation = "horizontal"
}) => {
  const { language, setLanguage } = useLanguage()
  const isVertical = orientation === "vertical"
  const containerClassName = isVertical
    ? "inline-flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-black/50 p-1 backdrop-blur-lg"
    : "inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-lg"
  const buttonClassName = isVertical
    ? "rounded-xl w-8 h-8 text-base leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    : "rounded-full px-3 py-1 text-base leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"

  return (
    <div
      className={`${containerClassName} ${className}`}
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`${buttonClassName} ${language === "en" ? "bg-accent text-slate-950 font-semibold" : "text-white/85 hover:text-white"}`}
        aria-label="Switch language to English"
        aria-pressed={language === "en"}
        title="English"
      >
        <span aria-hidden>🇬🇧</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`${buttonClassName} ${language === "fr" ? "bg-accent text-slate-950 font-semibold" : "text-white/85 hover:text-white"}`}
        aria-label="Switch language to French"
        aria-pressed={language === "fr"}
        title="Français"
      >
        <span aria-hidden>🇫🇷</span>
      </button>
    </div>
  )
}
