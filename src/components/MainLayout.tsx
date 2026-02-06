"use client"

import React from 'react'
import { SideNav } from '@/components/SideNav/SideNav'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'work', 'about', 'contact']

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const activeSection = useActiveSection(SECTIONS)

    return (
        <>
            <SideNav sections={SECTIONS} activeSection={activeSection} />
            <main className="relative z-10 flex-grow">
                {children}
            </main>
        </>
    )
}
