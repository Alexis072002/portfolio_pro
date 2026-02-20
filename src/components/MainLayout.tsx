"use client"

import React, { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { SideNav } from '@/components/SideNav/SideNav'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'work', 'projects', 'proofs', 'about', 'faq', 'contact']

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const activeSection = useActiveSection(SECTIONS)
    const { scrollY } = useScroll()
    const [isSideNavVisible, setIsSideNavVisible] = useState(false)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsSideNavVisible(latest >= 3500)
    })

    useEffect(() => {
        if (window.location.pathname !== '/') {
            return
        }

        if (!activeSection) {
            return
        }

        const currentHash = window.location.hash.replace('#', '')
        if (currentHash === activeSection) {
            return
        }

        const nextUrl = `${window.location.pathname}${window.location.search}#${activeSection}`
        window.history.replaceState(null, '', nextUrl)
    }, [activeSection])

    return (
        <>
            {isSideNavVisible ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <SideNav sections={SECTIONS} activeSection={activeSection} />
                </motion.div>
            ) : null}
            <main className="relative z-10 flex-grow">
                {children}
            </main>
        </>
    )
}
