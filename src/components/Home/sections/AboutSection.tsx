import React from 'react'
import { motion } from 'framer-motion'

interface TechStackItem {
  name: string
  glyph: string
  ring: string
  tone: string
}

interface AboutSectionProps {
  aboutEyebrow: string
  aboutTitle: React.ReactNode
  aboutParagraphs: string[]
  techStack: ReadonlyArray<TechStackItem>
  prefersReducedMotion: boolean
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  aboutEyebrow,
  aboutTitle,
  aboutParagraphs,
  techStack,
  prefersReducedMotion
}) => {
  return (
    <section id="about" className="w-full pt-28 pb-24 md:pt-32 md:pb-28 px-5 sm:px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[700px] md:h-[700px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-7">{aboutEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-9 md:mb-10 text-white leading-tight tracking-tight">
              {aboutTitle}
            </h2>
            <div className="space-y-5 text-base md:text-lg font-sans text-white/70 leading-relaxed font-light max-w-xl">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-5 md:gap-6">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, rotate: 1.5 }}
                  className="aspect-square rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md group hover:border-accent/30 transition-colors duration-500"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110 rounded-2xl border ${tech.ring} bg-black/35 ${tech.tone} drop-shadow-[0_0_15px_rgba(14,165,233,0.25)] flex items-center justify-center`}>
                    <span className="text-base sm:text-lg font-semibold tracking-wide">{tech.glyph}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.15em] uppercase text-white/40 group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/alexis-dezeque-935446175/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/15 bg-white/[0.02] text-white/80 hover:text-accent hover:border-accent/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.5 18.5h2.9V9.9H5.5v8.6Zm4.8-8.6h2.78v1.17h.04c.39-.74 1.33-1.52 2.73-1.52 2.92 0 3.46 1.92 3.46 4.41v4.54h-2.9v-4.02c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.04-1.55 2.12v4.1h-2.9V9.9Z" />
                </svg>
              </a>
              <a
                href="https://github.com/Alexis072002?tab=overview&from=2024-12-01&to=2024-12-31"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/15 bg-white/[0.02] text-white/80 hover:text-accent hover:border-accent/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M12 .5a12 12 0 0 0-3.8 23.38c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.38-1.33-1.74-1.33-1.74-1.1-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.3 3.5 1 .1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.92 0-1.31.46-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23.67 1.65.25 2.88.13 3.18.77.84 1.22 1.9 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
