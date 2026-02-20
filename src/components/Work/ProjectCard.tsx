"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/data/projects'
import { useAudience } from '@/components/Audience/AudienceProvider'

type ProjectCardProps = Pick<PortfolioProject, 'title' | 'category' | 'imageUrl' | 'imageFit' | 'logoUrl' | 'year' | 'slug'>

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    category,
    imageUrl,
    imageFit = 'cover',
    logoUrl,
    year,
    slug
}) => {
    const { audience } = useAudience()
    const isContainImage = imageFit === 'contain'

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Link
                href={{
                    pathname: `/projects/${slug}`,
                    query: { audience }
                }}
                className="group relative block aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                {/* Project Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className={[
                            isContainImage ? 'object-contain p-6 sm:p-8 md:p-10' : 'object-cover',
                            isContainImage ? 'group-hover:scale-105 opacity-95 group-hover:opacity-100' : 'group-hover:scale-110 opacity-60 group-hover:opacity-100',
                            'transition-transform duration-700 ease-out'
                        ].join(' ')}
                    />
                </div>

                {/* Liquid Glass Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Cyan Hover Glow */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Content Layer */}
                <div className="absolute inset-0 z-20 p-5 sm:p-6 md:p-8 flex flex-col justify-end">
                    {logoUrl && (
                        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 md:top-8 md:left-8 rounded-xl border border-white/20 bg-white/90 p-2 sm:p-2.5 shadow-[0_10px_30px_rgba(2,6,23,0.35)] backdrop-blur-md">
                            <Image
                                src={logoUrl}
                                alt={`${title} logo`}
                                width={96}
                                height={28}
                                className="h-5 sm:h-6 w-auto object-contain"
                            />
                        </div>
                    )}
                    <div className="flex justify-between items-end gap-3">
                        <div>
                            <span className="text-accent text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.2em] uppercase mb-2 block opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                {category}
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-white drop-shadow-lg leading-tight">
                                {title}
                            </h3>
                        </div>
                        <span className="text-white/40 font-sans text-xs sm:text-sm pb-1">
                            {year}
                        </span>
                    </div>

                    {/* Decorative Line Reveal on Hover */}
                    <div className="w-0 group-hover:w-full h-[1px] bg-accent/50 mt-4 transition-all duration-700 ease-in-out" />
                </div>
            </Link>
        </motion.article>
    )
}
