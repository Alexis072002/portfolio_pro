"use client"

import { useState, useEffect } from 'react'

export const useImageSequence = (
    imageUrls: string[],
    preload: boolean = true
) => {
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [loadedCount, setLoadedCount] = useState(0)

    useEffect(() => {
        if (!preload) return

        const loadedImages: HTMLImageElement[] = []
        let count = 0

        imageUrls.forEach((url, index) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                count++
                setLoadedCount(count)
                if (count === imageUrls.length) {
                    // All images loaded
                }
            }
            loadedImages[index] = img
        })

        setImages(loadedImages)
    }, [imageUrls, preload])

    const getFrame = (progress: number) => {
        if (images.length === 0) return null
        const frameIndex = Math.min(
            images.length - 1,
            Math.floor(progress * images.length)
        )
        return images[frameIndex]
    }

    return { getFrame, loadedCount, totalCount: imageUrls.length, isLoaded: loadedCount === imageUrls.length }
}
