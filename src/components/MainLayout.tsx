"use client"

import React, { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { SideNav } from '@/components/SideNav/SideNav'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'work', 'projects', 'proofs', 'about', 'faq', 'contact']

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const activeSection = useActiveSection(SECTIONS)
    const { scrollY } = useScroll()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Reveal SideNav only after the Hero animation phase (e.g. 3500px scroll)
    const sideNavOpacity = useTransform(scrollY, [3500, 3800], [0, 1])

    useEffect(() => {
        if (pathname !== '/') {
            return
        }

        if (!activeSection) {
            return
        }

        const currentHash = window.location.hash.replace('#', '')
        if (currentHash === activeSection) {
            return
        }

        const query = searchParams.toString()
        const nextUrl = `${pathname}${query ? `?${query}` : ''}#${activeSection}`
        window.history.replaceState(null, '', nextUrl)
    }, [activeSection, pathname, searchParams])

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
