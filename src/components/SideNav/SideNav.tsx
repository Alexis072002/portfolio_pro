"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LanguageSwitcher } from '@/components/Language/LanguageSwitcher'
import { useLanguage } from '@/components/Language/LanguageProvider'

interface SideNavProps {
    sections: string[]
    activeSection: string
}

export const SideNav: React.FC<SideNavProps> = ({ sections, activeSection }) => {
    const { language } = useLanguage()
    const [isCollapsed, setIsCollapsed] = useState(true)
    const sectionLabels: Record<string, string> = language === 'fr'
        ? {
            hero: 'hero',
            work: 'profil',
            projects: 'projets',
            proofs: 'workflow IA',
            about: 'stack',
            faq: 'faq',
            contact: 'contact'
        }
        : {
            hero: 'hero',
            work: 'profile',
            projects: 'projects',
            proofs: 'ai workflow',
            about: 'stack',
            faq: 'faq',
            contact: 'contact'
        }

    return (
        <div className="fixed left-3 xl:left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center">
            <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? 'Open section navigation' : 'Collapse section navigation'}
                aria-expanded={!isCollapsed}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                {isCollapsed ? '>' : '<'}
            </button>

            {!isCollapsed ? (
                <nav
                    role="navigation"
                    className="ml-2 flex flex-col items-center gap-6 py-8 px-2.5 rounded-full backdrop-blur-xl bg-white/5 bg-black/40 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]"
                >
                    <LanguageSwitcher orientation="vertical" />
                    {sections.map((id) => {
                        const isActive = activeSection === id

                        return (
                            <a
                                key={id}
                                href={`#${id}`}
                                className="group relative flex items-center justify-center w-4 h-4"
                                aria-label={`Go to ${id} section`}
                            >
                                {/* Glowing Dot */}
                                <motion.div
                                    data-testid={`nav-dot-${id}`}
                                    animate={{
                                        scale: isActive ? 1.3 : 1,
                                        backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.15)'
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-accent shadow-[0_0_15px_rgba(56,189,248,0.6)]' : 'bg-white/15'}`}
                                />

                                {/* Tooltip Label */}
                                <span className="absolute left-12 px-4 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/5 text-[10px] font-sans tracking-[0.2em] font-medium text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none capitalize translate-x-4 group-hover:translate-x-0">
                                    {sectionLabels[id] ?? id}
                                </span>
                            </a>
                        )
                    })}
                </nav>
            ) : null}
        </div>
    )
}
