"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SideNavProps {
    sections: string[]
    activeSection: string
}

export const SideNav: React.FC<SideNavProps> = ({ sections, activeSection }) => {
    return (
        <nav
            role="navigation"
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 py-8 px-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
        >
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
                                scale: isActive ? 1.2 : 1,
                                backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.2)',
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive
                                ? 'bg-accent shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                                : 'bg-white/20 group-hover:bg-white/40'
                                }`}
                        />

                        {/* Tooltip Label */}
                        <span className="absolute left-10 px-3 py-1 rounded-md bg-white/5 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none capitalize">
                            {id}
                        </span>
                    </a>
                )
            })}
        </nav>
    )
}
