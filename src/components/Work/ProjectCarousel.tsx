"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion'
import { ProjectCard } from './ProjectCard'

interface Project {
    title: string
    category: string
    imageUrl: string
    year: string
}

interface ProjectCarouselProps {
    projects: Project[]
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState({ left: 0, right: 0 })
    const x = useMotionValue(0)

    // Physics-based smoothing for the drag
    const springX = useSpring(x, { stiffness: 300, damping: 30 })

    useEffect(() => {
        const updateConstraints = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.parentElement?.offsetWidth || 0
                const contentWidth = containerRef.current.scrollWidth
                setConstraints({ left: -(contentWidth - containerWidth + 64), right: 0 })
            }
        }

        updateConstraints()
        window.addEventListener('resize', updateConstraints)
        return () => window.removeEventListener('resize', updateConstraints)
    }, [projects])

    const handleScroll = (direction: 'next' | 'prev') => {
        const currentX = x.get()
        const step = window.innerWidth > 768 ? 640 : 350
        const targetX = direction === 'next' ? currentX - step : currentX + step

        animate(x, Math.max(constraints.left, Math.min(0, targetX)), {
            type: "spring",
            stiffness: 300,
            damping: 30
        })
    }

    return (
        <section
            aria-label="Project Carousel"
            role="region"
            className="relative w-full overflow-visible"
        >
            {/* Draggable Area */}
            <div className="relative overflow-visible cursor-grab active:cursor-grabbing">
                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragConstraints={constraints}
                    style={{ x: springX }}
                    className="flex gap-8 md:gap-12 py-10"
                >
                    {projects.map((project, index) => (
                        <div key={`${project.title}-${index}`} className="flex-shrink-0 w-[85vw] md:w-[600px]">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                    {/* Extra space at the end to allow for full scrolling */}
                    <div className="flex-shrink-0 w-16" />
                </motion.div>
            </div>

            {/* Premium Cyan Controls */}
            <div className="flex items-center justify-center gap-10 mt-12">
                <button
                    onClick={() => handleScroll('prev')}
                    className="group w-16 h-16 rounded-full border border-white/5 flex items-center justify-center hover:border-accent/40 bg-white/[0.02] backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    aria-label="Previous project"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-accent group-hover:-translate-x-1 transition-all">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    ))}
                </div>

                <button
                    onClick={() => handleScroll('next')}
                    className="group w-16 h-16 rounded-full border border-white/5 flex items-center justify-center hover:border-accent/40 bg-white/[0.02] backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                    aria-label="Next project"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-accent group-hover:translate-x-1 transition-all">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    )
}
