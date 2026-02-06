"use client"

import React, { useRef } from 'react'
import { useScroll, useSpring, motion, useTransform } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'
import { ProjectCarousel } from '@/components/Work/ProjectCarousel'

const PROJECTS = [
  {
    title: "Astraeus Core",
    category: "AI Infrastructure / UI",
    imageUrl: "/assets/hero/frames/Pushing_in_on_1080p_202602061407_079.jpg",
    year: "2026"
  },
  {
    title: "Lumina OS",
    category: "Spatial Computing / OS",
    imageUrl: "/assets/hero/frames/Pushing_in_on_1080p_202602061407_060.jpg",
    year: "2025"
  },
  {
    title: "Chronos VR",
    category: "Interactive Design / VR",
    imageUrl: "/assets/hero/frames/Pushing_in_on_1080p_202602061407_040.jpg",
    year: "2024"
  },
  {
    title: "Nebula Engine",
    category: "Graphics / WebGL",
    imageUrl: "/assets/hero/frames/Pushing_in_on_1080p_202602061407_020.jpg",
    year: "2023"
  }
]

const TECH_STACK = [
  { name: "Next.js", color: "text-white" },
  { name: "React", color: "text-accent" },
  { name: "Vue", color: "text-emerald-400" },
  { name: "Symfony", color: "text-white/60" },
  { name: "TailwindCSS", color: "text-sky-400" }
]

const HERO_FRAMES = Array.from({ length: 80 }, (_, i) =>
  `/assets/hero/frames/Pushing_in_on_1080p_202602061407_${i.toString().padStart(3, '0')}.jpg`
)

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  })

  // Physics-based smoothing for the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mapping scroll progress to text entry (pop off effect)
  // Reveals only at the absolute end of the scroll sequence (95-100%)
  // Strictly tied to scroll progress (0 opacity before 95% scroll)
  const textOpacity = useTransform(smoothProgress, [0.95, 1], [0, 1])
  const textY = useTransform(smoothProgress, [0.95, 1], [60, 0])
  const textScale = useTransform(smoothProgress, [0.95, 1], [0.9, 1])

  return (
    <div className="flex flex-col items-center justify-center selection:bg-accent/30 font-sans">
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative w-full min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Scroll Animation Layer (Bottom) */}
          <div className="absolute inset-0 w-full h-full">
            <HeroScrollCanvas imageUrls={HERO_FRAMES} scrollProgress={smoothProgress} />
          </div>

          {/* Text Layer (Top) - Pops off as the helmet animation finishes */}
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale
            }}
            className="relative z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none"
          >
            <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tighter mb-8 leading-[1.05] text-white drop-shadow-[0_0_40px_rgba(2,6,23,0.9)]">
              Designing for <span className="text-accent italic">Usage</span>.
              <br />
              Coding for <span className="text-accent">Impact</span>.
            </h1>
            <p className="max-w-xl text-lg md:text-2xl font-sans text-white leading-relaxed mx-auto font-medium mb-12 drop-shadow-[0_0_30px_rgba(2,6,23,0.8)]">
              Alexis — Web Full-stack Developer & UX Designer. I build scalable applications
              by prioritizing how humans actually use them.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
              <a
                href="#work"
                className="px-10 py-4 bg-accent text-slate-950 font-sans font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                View Work
              </a>
              <a
                href="#about"
                className="px-10 py-4 border border-white/10 font-sans font-medium rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm text-white"
              >
                My Story
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="w-full min-h-screen py-32 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-white">
              Selected <span className="text-accent italic">Work</span>
            </h2>
            <p className="text-white/40 font-sans tracking-widest uppercase text-sm">
              Featured Case Studies // 2024-2026
            </p>
          </motion.div>

          <div className="relative">
            <ProjectCarousel projects={PROJECTS} />
          </div>

          <div className="mt-24 text-center">
            <p className="text-white/20 font-sans tracking-widest uppercase text-[10px]">
              Drag to explore // More industrial designs in progress
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full min-h-screen py-32 px-4 flex items-center bg-black relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-6">About Me // Identity</p>
              <h2 className="text-5xl md:text-7xl font-serif font-medium mb-10 text-white leading-tight tracking-tight">
                From <span className="text-accent italic">Curiosity</span> to <span className="text-accent">Creation</span>
              </h2>
              <div className="space-y-6 text-lg font-sans text-white/70 leading-relaxed font-light max-w-xl">
                <p>
                  I didn't always know I'd be a developer. It took a nudge from my brother to realize that
                  <span className="text-white italic"> code was the ultimate creative outlet</span>.
                  After two intensive years at <span className="text-accent">Web@cademy</span>, I transformed that curiosity into a professional skillset.
                </p>
                <p>
                  Today, I specialize in the <span className="text-white font-medium">JavaScript ecosystem</span>.
                  I love the challenge of Symfony’s structure as much as the freedom of Next.js.
                  For me, development is like music: it requires rhythm, structure, and a bit of soul.
                </p>
                <p>
                  Whether I’m collaborating with a team on a large-scale project or tackling a solo build,
                  I bring the same energy I put into my <span className="text-white italic">music</span> and my <span className="text-white italic">gaming</span>:
                  a drive for excellence and a love for the craft.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Tech Stack Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, rotate: 2 }}
                  className="aspect-square rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center p-6 backdrop-blur-md group hover:border-accent/30 transition-colors duration-500"
                >
                  <div className={`w-16 h-16 mb-4 transition-transform duration-500 group-hover:scale-110 ${tech.color} drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center`}>
                    {tech.name === "Next.js" && (
                      <svg viewBox="0 0 128 128" className="w-10 h-10 fill-current">
                        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.8-2.9 31-8L51 57.1V95H39V33h12l48.2 62.4c6.1-8.5 9.8-18.9 9.8-31.4 0-35.3-28.7-64-64-64zm43.3 35.7v24.2l-10-13.3c3.7-3.9 7-8.2 10-10.9zm-43.3-8.8c.1 0 .1 0 0 0z" />
                      </svg>
                    )}
                    {tech.name === "React" && (
                      <svg viewBox="-11.5 -10.2 23 20.4" className="w-12 h-12 stroke-current fill-none" strokeWidth="1">
                        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                        <g>
                          <ellipse rx="11" ry="4.2" />
                          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                      </svg>
                    )}
                    {tech.name === "Vue" && (
                      <svg viewBox="0 0 256 221" className="w-10 h-10 fill-current">
                        <path d="M204.8 0H256L128 220.8 0 0h51.2L128 132.5 204.8 0z" fill="#41B883" />
                        <path d="M0 0l128 220.8L256 0h-51.2L128 132.5 51.2 0H0z" fill="#41B883" />
                        <path d="M51.2 0L128 132.5 204.8 0h-38.4l-38.4 66.2L89.6 0H51.2z" fill="#35495E" />
                      </svg>
                    )}
                    {tech.name === "Symfony" && (
                      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                        <path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zm0 2c5.5 0 10 4.5 10 10 0 5.5-4.5 10-10 10-5.5 0-10-4.5-10-10 0-5.5 4.5-10 10-10zm-.3 3.6c-1.3 0-2.3 1-2.3 2.1s1 2.1 2.3 2.1c.4 0 .8-.1 1.1-.3l.1-.1.4 1.2c-.5.4-1.1.6-1.8.6-2.1 0-3.6-1.5-3.6-3.6s1.6-3.6 3.6-3.6c.9 0 1.7.3 2.3.9l-1 .9c-.3-.2-.7-.3-1.1-.3zm4.2 0h-2l1.6 4.3H14l.3 1.2h2l-2 5.5h1.2l2.3-6.7h1.4l-.3-1.2h-1.4l.7-1.8c.1-.2.2-.4.4-.4.1 0 .2 0 .2.1l.3-.8c-.4-.4-.8-.4-1.2-.4z" />
                      </svg>
                    )}
                    {tech.name === "TailwindCSS" && (
                      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.15em] uppercase text-white/40 group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                className="aspect-square rounded-3xl border border-dashed border-white/10 flex items-center justify-center"
              >
                <span className="text-xs text-white/10 italic font-serif tracking-widest uppercase">Explore</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full min-h-screen py-32 px-4 flex items-center justify-center bg-black relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-12 text-white leading-tight">
              Let's build something <span className="text-accent">legendary</span>.
            </h2>
            <p className="text-xl font-sans text-white/40 mb-16 tracking-widest uppercase">
              Available for high-impact collaborations // 2026
            </p>
            <div className="group relative inline-block">
              <a
                href="mailto:hello@alexis.dev"
                className="text-4xl md:text-6xl font-serif italic text-accent transition-all duration-500 hover:text-white"
              >
                hello@alexis.dev
              </a>
              <div className="w-0 group-hover:w-full h-1 bg-accent absolute -bottom-4 left-0 transition-all duration-500" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
