"use client"

import React, { useRef, useEffect, useCallback } from 'react'
import { MotionValue, useTransform } from 'framer-motion'
import { useImageSequence } from '@/hooks/useImageSequence'
import Image from 'next/image'

interface HeroScrollCanvasProps {
    imageUrls: string[]
    scrollProgress: MotionValue<number>
    reduceMotion?: boolean
    lowDataMode?: boolean
}

export const HeroScrollCanvas: React.FC<HeroScrollCanvasProps> = ({
    imageUrls,
    scrollProgress,
    reduceMotion = false,
    lowDataMode = false
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const currentProgressRef = useRef(0)
    const lastFrameIndexRef = useRef(-1)

    // Map scroll progress to image sequence
    const { getFrame, isReady } = useImageSequence(imageUrls, {
        priorityCount: lowDataMode ? 1 : 8,
        streamChunkSize: lowDataMode ? 2 : 6,
        streamDelayMs: lowDataMode ? 220 : 120
    })

    // Use the passed motion value to trigger re-renders or updates
    const progress = useTransform(scrollProgress, [0, 1], [0, 1])

    const drawFrame = useCallback((progressValue: number, force: boolean = false) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx || imageUrls.length === 0) return

        const clampedProgress = Math.min(1, Math.max(0, progressValue))
        const frameIndex = Math.min(
            imageUrls.length - 1,
            Math.floor(clampedProgress * imageUrls.length)
        )

        if (!force && frameIndex === lastFrameIndexRef.current) return

        const img = getFrame(clampedProgress)
        if (!img) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Small overscan avoids thin seams on some browsers/DPIs.
        const overscan = 1.03
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * overscan
        const drawWidth = img.width * scale
        const drawHeight = img.height * scale
        const x = (canvas.width - drawWidth) / 2
        const y = (canvas.height - drawHeight) / 2
        ctx.drawImage(img, x, y, drawWidth, drawHeight)

        lastFrameIndexRef.current = frameIndex
    }, [getFrame, imageUrls.length])

    // Keep canvas dimensions synced with viewport size for better mobile/tablet fidelity.
    useEffect(() => {
        const updateCanvasSize = () => {
            const wrapper = wrapperRef.current
            const canvas = canvasRef.current
            if (!wrapper || !canvas) return

            const rect = wrapper.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            const width = Math.max(1, Math.floor(rect.width * dpr))
            const height = Math.max(1, Math.floor(rect.height * dpr))

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
                lastFrameIndexRef.current = -1
            }
        }

        updateCanvasSize()
        if (isReady) {
            drawFrame(currentProgressRef.current, true)
        }

        if (typeof ResizeObserver === 'undefined') {
            const onResize = () => {
                updateCanvasSize()
                if (isReady) {
                    drawFrame(currentProgressRef.current, true)
                }
            }

            window.addEventListener('resize', onResize)
            return () => window.removeEventListener('resize', onResize)
        }

        const observer = new ResizeObserver(() => {
            updateCanvasSize()
            if (isReady) {
                drawFrame(currentProgressRef.current, true)
            }
        })

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current)
        }

        return () => observer.disconnect()
    }, [isReady, drawFrame])

    useEffect(() => {
        if (!isReady) return

        if (reduceMotion || lowDataMode) {
            currentProgressRef.current = 0
            drawFrame(0, true)
            return
        }

        drawFrame(currentProgressRef.current, true)

        const unsubscribe = progress.on("change", (latest) => {
            currentProgressRef.current = latest
            drawFrame(latest)
        })

        return () => unsubscribe()
    }, [isReady, progress, drawFrame, reduceMotion, lowDataMode])

    return (
        <div ref={wrapperRef} className="w-full h-full relative overflow-hidden">
            {lowDataMode ? (
                <Image
                    src={imageUrls[0]}
                    alt="Hero frame"
                    fill
                    priority
                    className="object-cover opacity-100"
                />
            ) : (
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover opacity-100"
                />
            )}
            {!isReady && !lowDataMode && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <p className="text-foreground/40 font-sans italic animate-pulse">
                        Preloading Cinematic Frames...
                    </p>
                </div>
            )}
        </div>
    )
}
