"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface UseImageSequenceOptions {
    preload?: boolean
    priorityCount?: number
    streamChunkSize?: number
    streamDelayMs?: number
}

export const useImageSequence = (
    imageUrls: string[],
    {
        preload = true,
        priorityCount = 8,
        streamChunkSize = 6,
        streamDelayMs = 120
    }: UseImageSequenceOptions = {}
) => {
    const [images, setImages] = useState<(HTMLImageElement | null)[]>([])
    const [loadedCount, setLoadedCount] = useState(0)
    const [priorityLoadedCount, setPriorityLoadedCount] = useState(0)
    const loadedCountRef = useRef(0)
    const priorityLoadedCountRef = useRef(0)

    const normalizedPriorityCount = useMemo(
        () => Math.max(1, Math.min(priorityCount, imageUrls.length || 1)),
        [priorityCount, imageUrls.length]
    )

    useEffect(() => {
        if (!preload || imageUrls.length === 0) {
            loadedCountRef.current = 0
            priorityLoadedCountRef.current = 0
            const resetTimeoutId = setTimeout(() => {
                setImages([])
                setLoadedCount(0)
                setPriorityLoadedCount(0)
            }, 0)
            return () => clearTimeout(resetTimeoutId)
        }

        let isCancelled = false
        let initTimeoutId: ReturnType<typeof setTimeout> | null = null
        let timeoutId: ReturnType<typeof setTimeout> | null = null
        const frameBuffer: (HTMLImageElement | null)[] = Array(imageUrls.length).fill(null)
        loadedCountRef.current = 0
        priorityLoadedCountRef.current = 0
        initTimeoutId = setTimeout(() => {
            if (isCancelled) return
            setImages(frameBuffer)
            setLoadedCount(0)
            setPriorityLoadedCount(0)
        }, 0)

        const markLoaded = (index: number, img: HTMLImageElement | null) => {
            if (isCancelled) return

            frameBuffer[index] = img
            loadedCountRef.current += 1
            setLoadedCount(loadedCountRef.current)

            if (index < normalizedPriorityCount) {
                priorityLoadedCountRef.current += 1
                setPriorityLoadedCount(priorityLoadedCountRef.current)
            }

            setImages([...frameBuffer])
        }

        const loadFrameAtIndex = (index: number) => {
            const img = new Image()
            img.decoding = 'async'
            img.src = imageUrls[index]
            img.onload = () => markLoaded(index, img)
            img.onerror = () => markLoaded(index, null)
        }

        for (let i = 0; i < normalizedPriorityCount; i += 1) {
            loadFrameAtIndex(i)
        }

        let nextBackgroundIndex = normalizedPriorityCount

        const scheduleBackgroundStream = () => {
            if (isCancelled || nextBackgroundIndex >= imageUrls.length) return

            const end = Math.min(nextBackgroundIndex + streamChunkSize, imageUrls.length)
            for (let i = nextBackgroundIndex; i < end; i += 1) {
                loadFrameAtIndex(i)
            }
            nextBackgroundIndex = end

            if (nextBackgroundIndex < imageUrls.length) {
                timeoutId = setTimeout(scheduleBackgroundStream, streamDelayMs)
            }
        }

        timeoutId = setTimeout(scheduleBackgroundStream, streamDelayMs)

        return () => {
            isCancelled = true
            if (initTimeoutId) {
                clearTimeout(initTimeoutId)
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [imageUrls, preload, normalizedPriorityCount, streamChunkSize, streamDelayMs])

    const getFrame = useCallback((progress: number) => {
        if (images.length === 0) return null

        const clampedProgress = Math.min(1, Math.max(0, progress))
        const frameIndex = Math.min(
            images.length - 1,
            Math.floor(clampedProgress * images.length)
        )

        if (images[frameIndex]) return images[frameIndex]

        for (let offset = 1; offset < images.length; offset += 1) {
            const backward = frameIndex - offset
            if (backward >= 0 && images[backward]) {
                return images[backward]
            }

            const forward = frameIndex + offset
            if (forward < images.length && images[forward]) {
                return images[forward]
            }
        }

        return null
    }, [images])

    const isReady = priorityLoadedCount >= normalizedPriorityCount || loadedCount > 0
    const isFullyLoaded = loadedCount === imageUrls.length && imageUrls.length > 0

    return {
        getFrame,
        loadedCount,
        priorityLoadedCount,
        totalCount: imageUrls.length,
        isReady,
        isLoaded: isFullyLoaded
    }
}
