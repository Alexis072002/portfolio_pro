"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import type { PortfolioProject } from '@/data/projects'

interface ProjectCarouselProps {
    projects: PortfolioProject[]
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const viewportRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState({ left: 0, right: 0 })
    const [sidePadding, setSidePadding] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const [step, setStep] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const x = useMotionValue(0)

    // Physics-based smoothing for the drag
    const springX = useSpring(x, { stiffness: 300, damping: 30 })

    const clampIndex = useCallback((index: number) => {
        if (projects.length === 0) {
            return 0
        }
        return Math.max(0, Math.min(projects.length - 1, index))
    }, [projects.length])

    const animateToIndex = useCallback((index: number) => {
        const safeIndex = clampIndex(index)
        setActiveIndex(safeIndex)
        animate(x, sidePadding - (safeIndex * step), {
            type: "spring",
            stiffness: 300,
            damping: 30
        })
    }, [clampIndex, sidePadding, step, x])

    useEffect(() => {
        const updateConstraints = () => {
            if (!containerRef.current || !viewportRef.current) {
                return
            }

            const viewportWidth = viewportRef.current.offsetWidth
            const nextCardWidth =
                viewportWidth >= 1024
                    ? 600
                    : viewportWidth >= 768
                        ? 560
                        : viewportWidth >= 640
                            ? Math.round(viewportWidth * 0.74)
                            : Math.round(viewportWidth * 0.8)
            const nextGap = Number.parseFloat(window.getComputedStyle(containerRef.current).gap || '0')
            const nextStep = nextCardWidth + (Number.isNaN(nextGap) ? 0 : nextGap)
            const nextSidePadding = Math.max(0, (viewportWidth - nextCardWidth) / 2)
            const maxRight = nextSidePadding
            const minLeft = nextSidePadding - Math.max(0, (projects.length - 1) * nextStep)

            setCardWidth(nextCardWidth)
            setStep(nextStep)
            setSidePadding(nextSidePadding)
            setConstraints({ left: minLeft, right: maxRight })
            x.set(nextSidePadding - (clampIndex(activeIndex) * nextStep))
        }

        updateConstraints()
        window.addEventListener('resize', updateConstraints)
        return () => window.removeEventListener('resize', updateConstraints)
    }, [projects.length, activeIndex, clampIndex, x])

    const handleScroll = (direction: 'next' | 'prev') => {
        const nextIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1
        animateToIndex(nextIndex)
    }

    const handleDragEnd = () => {
        if (step <= 0) {
            return
        }
        const nextIndex = Math.round((sidePadding - x.get()) / step)
        animateToIndex(nextIndex)
    }

    return (
        <section
            aria-label="Project Carousel"
            role="region"
            className="relative w-full overflow-hidden"
        >
            {/* Draggable Area */}
            <div
                ref={viewportRef}
                className="relative left-1/2 w-screen -translate-x-1/2 sm:left-0 sm:w-full sm:translate-x-0 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            >
                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragConstraints={constraints}
                    onDragEnd={handleDragEnd}
                    style={{ x: springX }}
                    className="flex gap-5 sm:gap-7 md:gap-10 py-10 md:py-10"
                >
                    {projects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            data-carousel-card
                            className="flex-shrink-0"
                            style={{ width: cardWidth || undefined }}
                        >
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Premium Cyan Controls */}
            <div className="flex items-center justify-center gap-5 sm:gap-7 md:gap-10 mt-10 md:mt-12">
                <button
                    onClick={() => handleScroll('prev')}
                    className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/5 flex items-center justify-center hover:border-accent/40 bg-white/[0.02] backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    aria-label="Previous project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-accent group-hover:-translate-x-1 transition-all">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="hidden sm:flex gap-2">
                    {projects.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    ))}
                </div>

                <button
                    onClick={() => handleScroll('next')}
                    className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/5 flex items-center justify-center hover:border-accent/40 bg-white/[0.02] backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                    aria-label="Next project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-accent group-hover:translate-x-1 transition-all">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    )
}
