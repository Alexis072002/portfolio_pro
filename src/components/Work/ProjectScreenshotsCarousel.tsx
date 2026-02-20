"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'

interface ProjectScreenshotsCarouselProps {
    title: string
    imageUrls: string[]
    language?: 'en' | 'fr'
}

export const ProjectScreenshotsCarousel: React.FC<ProjectScreenshotsCarouselProps> = ({
    title,
    imageUrls,
    language = 'en'
}) => {
    const images = useMemo(() => imageUrls.filter(Boolean), [imageUrls])
    const [activeIndex, setActiveIndex] = useState(0)

    if (images.length === 0) {
        return null
    }

    const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
    const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length)

    return (
        <section className="mt-10 md:mt-14">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl md:text-2xl font-serif">
                    {language === 'fr' ? 'Captures du projet' : 'Project screenshots'}
                </h2>
                <p className="text-white/50 text-xs tracking-[0.14em] uppercase">
                    {activeIndex + 1} / {images.length}
                </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="relative aspect-[16/9] bg-black/35">
                    <Image
                        src={images[activeIndex]}
                        alt={`${title} screenshot ${activeIndex + 1}`}
                        fill
                        className="object-contain p-3 sm:p-4"
                        sizes="(max-width: 768px) 100vw, 960px"
                        priority={activeIndex === 0}
                    />
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous screenshot"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 bg-black/55 backdrop-blur-md text-white hover:border-accent/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next screenshot"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 bg-black/55 backdrop-blur-md text-white hover:border-accent/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {images.map((imageUrl, index) => (
                        <button
                            type="button"
                            key={imageUrl}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to screenshot ${index + 1}`}
                            className={`relative aspect-[16/10] rounded-lg border overflow-hidden bg-black/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${index === activeIndex ? 'border-accent/60' : 'border-white/10 hover:border-white/25'}`}
                        >
                            <Image
                                src={imageUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="140px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </section>
    )
}
