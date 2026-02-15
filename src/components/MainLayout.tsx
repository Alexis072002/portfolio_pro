"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SideNav } from '@/components/SideNav/SideNav'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'work', 'about', 'process', 'standards', 'contact']

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const activeSection = useActiveSection(SECTIONS)
    const { scrollY } = useScroll()

    // Reveal SideNav only after the Hero animation phase (e.g. 3500px scroll)
    const sideNavOpacity = useTransform(scrollY, [3500, 3800], [0, 1])

    return (
        <>
            <motion.div style={{ opacity: sideNavOpacity }}>
                <SideNav sections={SECTIONS} activeSection={activeSection} />
            </motion.div>
            <main className="relative z-10 flex-grow">
                {children}
            </main>
        </>
    )
}
