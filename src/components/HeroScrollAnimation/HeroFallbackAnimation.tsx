"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const HeroFallbackAnimation: React.FC = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    // 3D Rotation based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360])
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])

    return (
        <div ref={ref} className="h-[200vh] w-full relative flex items-center justify-center pointer-events-none">
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.div
                    style={{ rotateX, rotateY, scale }}
                    className="w-48 h-48 md:w-64 md:h-64 border-2 border-accent/20 bg-accent/5 backdrop-blur-xl rounded-3xl overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.2)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                    <span className="text-accent font-serif italic text-4xl select-none">A.</span>
                </motion.div>

                {/* Ambient Lights */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />
            </div>
        </div>
    )
}
