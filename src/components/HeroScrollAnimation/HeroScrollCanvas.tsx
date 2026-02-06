"use client"

import React, { useRef, useEffect } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { useImageSequence } from '@/hooks/useImageSequence'

interface HeroScrollCanvasProps {
    imageUrls: string[]
    scrollProgress: MotionValue<number>
}

export const HeroScrollCanvas: React.FC<HeroScrollCanvasProps> = ({ imageUrls, scrollProgress }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Map scroll progress to image sequence
    const { getFrame, isLoaded } = useImageSequence(imageUrls)

    // Use the passed motion value to trigger re-renders or updates
    const progress = useTransform(scrollProgress, [0, 1], [0, 1])

    useEffect(() => {
        if (!isLoaded) return

        let lastFrameIndex = -1

        const unsubscribe = progress.on("change", (latest) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            // Calculate current frame index based on progress
            const frameIndex = Math.min(
                imageUrls.length - 1,
                Math.floor(latest * imageUrls.length)
            )

            // Only redraw if the frame has actually changed
            if (frameIndex !== lastFrameIndex) {
                const img = getFrame(latest)
                if (img) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                    const x = (canvas.width - img.width * scale) / 2
                    const y = (canvas.height - img.height * scale) / 2
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
                    lastFrameIndex = frameIndex
                }
            }
        })

        return () => unsubscribe()
    }, [isLoaded, getFrame, progress, imageUrls.length])

    // Initial draw
    useEffect(() => {
        if (isLoaded && canvasRef.current) {
            const img = getFrame(0)
            if (img) {
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
                    const x = (canvas.width - img.width * scale) / 2
                    const y = (canvas.height - img.height * scale) / 2
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
                }
            }
        }
    }, [isLoaded, getFrame])

    return (
        <div className="w-full h-full relative">
            <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-100"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <p className="text-foreground/40 font-sans italic animate-pulse">
                        Preloading Cinematic Assets...
                    </p>
                </div>
            )}
        </div>
    )
}
