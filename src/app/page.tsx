"use client"

import React, { useRef } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'

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

  return (
    <div className="flex flex-col items-center justify-center selection:bg-accent/30">
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative w-full min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Scroll Animation Layer (Bottom) */}
          <div className="absolute inset-0 w-full h-full">
            <HeroScrollCanvas imageUrls={HERO_FRAMES} scrollProgress={smoothProgress} />
          </div>

          {/* Text Layer (Top) - Hidden for now as requested */}
          {/* 
          <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
            <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.05] text-white">
              Designing for <span className="text-accent italic">Usage</span>.
              <br />
              Coding for <span className="text-accent">Impact</span>.
            </h1>
            <p className="max-w-xl text-lg md:text-2xl font-sans text-white/70 leading-relaxed mx-auto font-light">
              Alexis — Web Full-stack Developer & UX Designer. I build scalable applications 
              by prioritizing how humans actually use them.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
              <a 
                href="#work" 
                className="px-10 py-4 bg-accent text-slate-950 font-sans font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                View Work
              </a>
              <a 
                href="#about" 
                className="px-10 py-4 border border-white/10 font-sans font-medium rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              >
                My Story
              </a>
            </div>
          </div> 
          */}
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="w-full min-h-screen py-32 px-4 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-20 text-center">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map(i => (
              <div key={i} className="aspect-video rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 italic">
                Case Study {i} (TDD Implementation Pending)
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full min-h-screen py-32 px-4 flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">About</h2>
          <p className="text-xl font-sans text-foreground/70 leading-relaxed mb-8">
            Graduated from WebAcademy by Epitech, I've developed a product-first mindset
            that bridges the gap between technical excellence and visual sensitivity.
          </p>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-serif italic text-accent text-2xl">
              "I do not design applications based on feature lists. I design them based on how users will actually use them."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full min-h-screen py-32 px-4 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8">Let's build something <span className="text-accent">meaningful</span>.</h2>
          <p className="text-xl font-sans text-foreground/60 mb-12">
            Available for full-time roles and high-impact freelance projects.
          </p>
          <a
            href="mailto:hello@alexis.dev"
            className="text-3xl md:text-5xl font-serif italic text-accent hover:underline underline-offset-8 transition-all"
          >
            hello@alexis.dev
          </a>
        </div>
      </section>
    </div>
  )
}
