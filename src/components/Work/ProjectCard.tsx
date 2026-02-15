"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/data/projects'

type ProjectCardProps = Pick<PortfolioProject, 'title' | 'category' | 'imageUrl' | 'year' | 'slug'>

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, imageUrl, year, slug }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Link
                href={`/projects/${slug}`}
                className="group relative block aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Ouvrir le projet ${title}`}
            >
                {/* Project Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                </div>

                {/* Liquid Glass Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Cyan Hover Glow */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Content Layer */}
                <div className="absolute inset-0 z-20 p-5 sm:p-6 md:p-8 flex flex-col justify-end">
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
