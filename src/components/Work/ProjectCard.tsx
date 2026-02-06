"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProjectCardProps {
    title: string
    category: string
    imageUrl: string
    year: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, imageUrl, year }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors duration-500"
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
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            {category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-white drop-shadow-lg leading-tight">
                            {title}
                        </h3>
                    </div>
                    <span className="text-white/40 font-sans text-sm pb-1">
                        {year}
                    </span>
                </div>

                {/* Decorative Line Reveal on Hover */}
                <div className="w-0 group-hover:w-full h-[1px] bg-accent/50 mt-4 transition-all duration-700 ease-in-out" />
            </div>
        </motion.div>
    )
}
