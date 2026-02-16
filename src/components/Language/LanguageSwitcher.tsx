"use client"

import React from "react"
import { useLanguage } from "@/components/Language/LanguageProvider"

interface LanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-lg ${className}`}
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${language === "en" ? "bg-accent text-slate-950 font-semibold" : "text-white/75 hover:text-white"}`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${language === "fr" ? "bg-accent text-slate-950 font-semibold" : "text-white/75 hover:text-white"}`}
        aria-pressed={language === "fr"}
      >
        FR
      </button>
    </div>
  )
}
