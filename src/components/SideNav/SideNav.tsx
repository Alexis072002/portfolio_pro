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
            className="fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-6 py-8 px-3 rounded-full backdrop-blur-xl backdrop-blur-3xl bg-white/5 bg-black/40 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]"
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
                                scale: isActive ? 1.3 : 1,
                                backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.15)'
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-accent shadow-[0_0_15px_rgba(56,189,248,0.6)]' : 'bg-white/15'}`}
                        />

                        {/* Tooltip Label */}
                        <span className="absolute left-12 px-4 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/5 text-[10px] font-sans tracking-[0.2em] font-medium text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none capitalize translate-x-4 group-hover:translate-x-0">
                            {id}
                        </span>
                    </a>
                )
            })}
        </nav>
    )
}
