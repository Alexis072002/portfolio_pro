"use client"

import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useSpring, motion, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'
import { ProjectCarousel } from '@/components/Work/ProjectCarousel'
import { PORTFOLIO_PROJECTS } from '@/data/projects'

const TECH_STACK = [
  { name: "Next.js", color: "text-white" },
  { name: "React", color: "text-accent" },
  { name: "NestJS", color: "text-emerald-400" },
  { name: "TypeScript", color: "text-white/70" },
  { name: "TailwindCSS", color: "text-sky-400" },
  { name: "PostgreSQL", color: "text-white/60" }
]

const SERVICES = [
  {
    title: "Landing Pages Premium",
    description: "Fast, responsive, conversion-driven pages for product launches and campaigns.",
    scope: "Next.js + animations + SEO",
    price: "From EUR 900"
  },
  {
    title: "React Frontend Revamp",
    description: "UI/UX revamp of an existing product with a maintainable component architecture.",
    scope: "React/Next + lightweight design system",
    price: "From EUR 1400"
  },
  {
    title: "Full-stack Web App",
    description: "Complete web app with a Next.js frontend and NestJS API for concrete business goals.",
    scope: "Next.js + NestJS + DB",
    price: "Custom quote"
  }
]

const CLIENT_PROOFS = [
  { value: "<24h", label: "Average response time" },
  { value: "JS/TS", label: "Primary stack" },
  { value: "100%", label: "Mobile and tablet responsive" }
]

const RECRUITER_PROOFS = [
  { value: "React/Next", label: "Frontend specialization" },
  { value: "NestJS", label: "Full-stack capability" },
  { value: "Available", label: "Fast onboarding" }
]

const RECRUITER_HIGHLIGHTS = [
  {
    title: "Profile",
    description: "I am a junior frontend/full-stack JavaScript developer, targeting a full-time role with immediate frontend impact."
  },
  {
    title: "Core skills",
    description: "React, Next.js, TypeScript and Tailwind on the frontend, plus NestJS for APIs and full-stack collaboration."
  },
  {
    title: "Team value",
    description: "I deliver readable, maintainable interfaces, communicate clearly, and ramp up quickly in demanding product environments."
  }
]

const RECRUITER_STACK = ["React", "Next.js", "TypeScript", "NestJS", "TailwindCSS"]

const RECRUITER_FACTS = [
  { label: "Role target", value: "Full-time Frontend / Full-stack" },
  { label: "Level", value: "Junior profile" },
  { label: "Availability", value: "Available now" }
]

const FAQ_CLIENT = [
  {
    q: "What types of projects can you handle?",
    a: "Conversion landing pages, React/Next frontend revamps, and full-stack JavaScript web apps depending on your scope."
  },
  {
    q: "What does a typical collaboration look like?",
    a: "Goal alignment, prioritized deliverables, and short iterations with regular progress updates."
  },
  {
    q: "How should I estimate project budget?",
    a: "Budget depends on complexity and expected quality level. The form helps create a first estimate before the first call."
  },
  {
    q: "How fast can we start?",
    a: "I can usually start quickly based on workload. The timeline is confirmed after a short scoping call."
  }
]

const FAQ_RECRUITER = [
  {
    q: "What type of role are you currently looking for?",
    a: "I am looking for a full-time Frontend or Full-stack JavaScript role, with a strong focus on React and Next.js."
  },
  {
    q: "Which areas can you handle independently?",
    a: "Frontend feature development, API integration, component refactoring, and UX/performance optimization."
  },
  {
    q: "What is your strongest stack?",
    a: "JavaScript/TypeScript, React, Next.js and Tailwind, with NestJS for backend needs."
  },
  {
    q: "When are you available for a hiring process?",
    a: "Available immediately for HR screening, technical interviews, and a fast start date."
  }
]

const HERO_FRAMES = Array.from({ length: 80 }, (_, i) =>
  `/assets/hero/frames/Pushing_in_on_1080p_202602061407_${i.toString().padStart(3, '0')}.jpg`
)

const AVAILABLE_FROM = "Available now"

type Audience = 'recruiter' | 'client'

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean
    effectiveType?: string
  }
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [audience, setAudience] = useState<Audience>('client')
  const [isLowDataMode, setIsLowDataMode] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    need: "",
    budget: "",
    timeline: ""
  })
  const [formFeedback, setFormFeedback] = useState("")

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection
    const saveData = Boolean(nav.connection?.saveData)
    const lowNetwork = /(^|-)2g/.test(nav.connection?.effectiveType ?? "")
    setIsLowDataMode(saveData || lowNetwork)
  }, [])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 260 : 100,
    damping: prefersReducedMotion ? 45 : 30,
    restDelta: 0.001
  })

  const textOpacity = useTransform(
    smoothProgress,
    prefersReducedMotion ? [0, 0.01] : [0.88, 1],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const textY = useTransform(
    smoothProgress,
    prefersReducedMotion ? [0, 0.01] : [0.88, 1],
    prefersReducedMotion ? [0, 0] : [40, 0]
  )

  // Intro title: visible only on the first 8 hero frames.
  const frameStep = 1 / (HERO_FRAMES.length - 1)
  const glitchPeak = 0.95 * frameStep
  const glitchEnd = 2.2 * frameStep
  const introRevealStart = 0.6 * frameStep
  const introHold = 6 * frameStep
  const introEnd = 8 * frameStep

  const introTitleOpacity = useTransform(
    smoothProgress,
    [0, introRevealStart, introHold, introEnd],
    [0, 1, 1, 0]
  )
  const introTitleX = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [-48, 0, 0, -48]
  )
  const introTitleBlur = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [10, 0, 0, 10]
  )
  const introTitleFilter = useMotionTemplate`blur(${introTitleBlur}px)`

  // One-shot glitch during text reveal for accessibility.
  const glitchOpacity = useTransform(
    smoothProgress,
    [0, 0.65 * glitchPeak, glitchPeak, glitchEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [0.92, 0.35, 0.96, 0]
  )
  const glitchLeftX = useTransform(
    smoothProgress,
    [0, glitchPeak, glitchEnd],
    prefersReducedMotion ? [0, 0, 0] : [-18, 10, 0]
  )
  const glitchRightX = useTransform(
    smoothProgress,
    [0, glitchPeak, glitchEnd],
    prefersReducedMotion ? [0, 0, 0] : [16, -8, 0]
  )
  const glitchScanOpacity = useTransform(
    smoothProgress,
    [0, 0.8 * glitchPeak, glitchEnd],
    prefersReducedMotion ? [0, 0, 0] : [0.75, 0.95, 0]
  )
  const glitchScanY = useTransform(
    smoothProgress,
    [0, glitchPeak, glitchEnd],
    prefersReducedMotion ? [0, 0, 0] : [-24, 10, 52]
  )

  const audienceLabel = audience === 'client' ? 'client' : 'recruiter'
  const introRoleLine = audience === 'client' ? '- Freelance Web Developer' : '- Junior Frontend / Full-stack Developer'
  const introAudiencePitch = audience === 'client'
    ? "Portfolio designed for client acquisition and fast execution."
    : "Portfolio designed for full-time frontend/full-stack hiring."
  const heroPitch = audience === 'client'
    ? "I build fast, maintainable web experiences aligned with your product goals."
    : "I am available to join your frontend/full-stack team with a strong JavaScript mindset."
  const primaryCtaLabel = audience === 'client' ? 'View services' : 'View profile'
  const secondaryCtaLabel = audience === 'client' ? 'Discuss your project' : 'Schedule an interview'
  const workTitle = audience === 'client'
    ? <>Freelance <span className="text-accent italic">services</span></>
    : <>About <span className="text-accent italic">me</span></>
  const workSubtitle = audience === 'client'
    ? 'Lean service offers focused on acquisition and conversion'
    : 'Snapshot of my junior profile for a full-time frontend/full-stack role'
  const proofs = audience === 'client' ? CLIENT_PROOFS : RECRUITER_PROOFS
  const faqItems = audience === 'client' ? FAQ_CLIENT : FAQ_RECRUITER
  const aboutEyebrow = audience === 'client' ? 'Positioning // Freelance offer' : 'Positioning // Full-time application'
  const aboutTitle = audience === 'client'
    ? <>React / Next for <span className="text-accent italic">client acquisition</span>,<br />NestJS for robust delivery.</>
    : <>React / Next <span className="text-accent italic">as core focus</span>,<br />NestJS for full-stack contribution.</>
  const aboutParagraphs = audience === 'client'
    ? [
      "I help teams turn requirements into fast, clear and result-oriented web experiences.",
      "My approach is simple: clear scope, clean execution, transparent follow-up and maintainable deliverables."
    ]
    : [
      "I am a junior frontend/full-stack JavaScript developer, focused on React/Next to deliver reliable and scalable interfaces.",
      "My goal is to join a product team full-time, contribute quickly on frontend scope, and grow into broader full-stack ownership."
    ]
  const formDescription = audience === 'client'
    ? "Share your context, budget and timeline. I will get back to you quickly."
    : "Share role context and team expectations. I will get back to you quickly."
  const messagePlaceholder = audience === 'client'
    ? "Context, goals, stack and expectations..."
    : "Role context, stack, team setup and next steps..."
  const submitLabel = audience === 'client' ? 'Send request' : 'Request an interview'
  const projectsIntro = audience === 'client'
    ? "Preview of the final case study format to help you visualize collaboration."
    : "Preview of the final project format shared during hiring conversations."
  const projectsPlaceholderText = audience === 'client'
    ? "These cards are placeholders to preview the final experience. Detailed case studies will be published progressively."
    : "These cards are placeholders to preview the final experience. Detailed case studies will be published for upcoming interviews."

  const handleAudienceChange = (nextAudience: Audience) => {
    setAudience(nextAudience)
    setFormFeedback("")
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Contact ${audienceLabel} - ${contactForm.name}`)
    const bodyLines = [
      "Hello Alexis,",
      "",
      `Name: ${contactForm.name}`,
      `Email: ${contactForm.email}`
    ]

    if (audience === 'client') {
      bodyLines.push(`Budget: ${contactForm.budget || 'Not specified'}`)
      bodyLines.push(`Timeline: ${contactForm.timeline || 'Not specified'}`)
    }

    bodyLines.push("")
    bodyLines.push(audience === 'client' ? "Project context:" : "Hiring context:")
    bodyLines.push(contactForm.need)

    const body = encodeURIComponent(bodyLines.join('\r\n'))

    window.location.href = `mailto:hello@alexis.dev?subject=${subject}&body=${body}`
    setFormFeedback("Message prepared. Your email client is opening.")
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Alexis Dezeque - Freelance Web Developer",
    areaServed: "France",
    serviceType: ["Frontend Development", "Full-stack Development", "React/Next Revamp"],
    founder: {
      "@type": "Person",
      name: "Alexis Dezeque"
    },
    url: "https://alexis.dev",
    email: "hello@alexis.dev"
  }

  return (
    <div className="flex flex-col items-center justify-center selection:bg-accent/30 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleAudienceChange('recruiter')}
            className="text-center py-3 rounded-xl bg-accent text-slate-950 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            I am hiring
          </button>
          <button
            type="button"
            onClick={() => handleAudienceChange('client')}
            className="text-center py-3 rounded-xl border border-white/20 text-white text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            I need a freelancer
          </button>
        </div>
      </div>

      <section ref={heroRef} id="hero" className="relative w-full min-h-[380vh] md:min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <HeroScrollCanvas
              imageUrls={HERO_FRAMES}
              scrollProgress={smoothProgress}
              reduceMotion={Boolean(prefersReducedMotion)}
              lowDataMode={isLowDataMode}
            />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-2 p-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => handleAudienceChange('recruiter')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'recruiter' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              I am hiring
            </button>
            <button
              type="button"
              onClick={() => handleAudienceChange('client')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'client' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              I need a freelancer
            </button>
          </div>

          <motion.div
            style={{
              opacity: introTitleOpacity,
              x: introTitleX,
              filter: introTitleFilter
            }}
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none max-w-[85vw] sm:max-w-[70vw] md:max-w-[52vw] lg:max-w-[45vw]"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10 sm:w-14 bg-accent/80" />
              <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white/70">Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_0_30px_rgba(2,6,23,0.95)]">
              <span className="relative inline-block">
                <motion.span
                  style={{ opacity: glitchOpacity, x: glitchLeftX }}
                  className="absolute inset-0 text-accent/85 mix-blend-screen pointer-events-none select-none"
                  aria-hidden
                >
                  Alexis Dezeque
                  <span className="block italic">{introRoleLine}</span>
                </motion.span>
                <motion.span
                  style={{ opacity: glitchOpacity, x: glitchRightX }}
                  className="absolute inset-0 text-sky-200/70 mix-blend-screen pointer-events-none select-none"
                  aria-hidden
                >
                  Alexis Dezeque
                  <span className="block italic">{introRoleLine}</span>
                </motion.span>
                <span>Alexis Dezeque</span>
                <span className="block text-accent italic">{introRoleLine}</span>
              </span>
            </h1>
            <motion.div
              style={{ opacity: glitchScanOpacity, y: glitchScanY }}
              className="absolute left-0 right-0 top-0 h-6 pointer-events-none bg-gradient-to-r from-transparent via-accent/90 to-transparent blur-[0.8px]"
              aria-hidden
            />
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-[44ch] leading-relaxed">
              {introAudiencePitch}
            </p>
          </motion.div>

          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 pointer-events-none">
            <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-lg">
              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/60">Available</p>
              <p className="text-sm sm:text-base text-white font-semibold">{AVAILABLE_FROM}</p>
            </div>
          </div>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif font-medium tracking-tighter mb-6 md:mb-8 leading-[1.05] text-white drop-shadow-[0_0_40px_rgba(2,6,23,0.9)]">
              React / Next.js
              <br />
              &amp; Full-stack <span className="text-accent">JavaScript</span>.
            </h2>
            <p className="max-w-2xl text-base sm:text-lg md:text-2xl font-sans text-white leading-relaxed mx-auto font-medium mb-10 md:mb-12 drop-shadow-[0_0_30px_rgba(2,6,23,0.8)]">
              {heroPitch}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pointer-events-auto w-full sm:w-auto max-w-sm sm:max-w-none">
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 bg-accent text-slate-950 font-sans font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {primaryCtaLabel}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 border border-white/15 font-sans font-medium rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {secondaryCtaLabel}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold mb-5 md:mb-6 text-white">
              {workTitle}
            </h2>
            <p className="text-white/40 font-sans tracking-[0.18em] uppercase text-[11px] sm:text-sm">
              {workSubtitle}
            </p>
          </div>

          {audience === 'client' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {SERVICES.map((service) => (
                <article key={service.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
                  <h3 className="text-white text-2xl font-serif mb-3">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-5">{service.description}</p>
                  <p className="text-accent text-sm tracking-[0.12em] uppercase mb-2">{service.scope}</p>
                  <p className="text-white/85 text-sm">{service.price}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
              <article className="lg:col-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
                <p className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-accent mb-5">
                  Junior Candidate
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                  Alexis Dezeque
                </h3>
                <p className="mt-2 text-white/70 text-sm md:text-base">
                  Frontend / Full-stack JavaScript Developer
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {RECRUITER_STACK.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {RECRUITER_FACTS.map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                      <span className="text-white/50 text-xs uppercase tracking-[0.14em]">{fact.label}</span>
                      <span className="text-white text-sm">{fact.value}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-slate-950 text-sm font-semibold hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Schedule a call
                </a>
              </article>

              <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
                {RECRUITER_HIGHLIGHTS.map((item, index) => (
                  <article
                    key={item.title}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 md:p-8 min-h-[230px] ${index === 2 ? 'xl:col-span-2' : ''}`}
                  >
                    <div className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-accent/75 to-transparent opacity-70 pointer-events-none" />
                    <div className="absolute -top-16 right-0 w-44 h-44 bg-accent/15 blur-[85px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <h3 className="text-white text-2xl md:text-[2rem] leading-tight font-serif mb-4 mt-1">{item.title}</h3>
                    <p className="text-white/75 leading-relaxed text-sm md:text-base max-w-[56ch]">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="projects" className="w-full py-20 md:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
              Portfolio <span className="text-accent italic">projects</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm sm:text-base max-w-3xl mx-auto">
              {projectsIntro}
            </p>
          </div>

          <ProjectCarousel projects={PORTFOLIO_PROJECTS} />

          <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-5 text-center">
            <p className="text-white/70">
              {projectsPlaceholderText}
            </p>
          </div>
        </div>
      </section>

      <section id="proofs" className="w-full py-20 md:py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {proofs.map((proof) => (
              <div key={proof.label} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 text-center">
                <p className="text-4xl md:text-5xl text-accent font-serif mb-2">{proof.value}</p>
                <p className="text-white/70 tracking-[0.12em] uppercase text-xs md:text-sm">{proof.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[700px] md:h-[700px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
            <div>
              <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-6">{aboutEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-8 md:mb-10 text-white leading-tight tracking-tight">
                {aboutTitle}
              </h2>
              <div className="space-y-5 text-base md:text-lg font-sans text-white/70 leading-relaxed font-light max-w-xl">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, rotate: 1.5 }}
                  className="aspect-square rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md group hover:border-accent/30 transition-colors duration-500"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110 ${tech.color} drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center`}>
                    <span className="text-xl sm:text-2xl font-serif">{tech.name.slice(0, 1)}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.15em] uppercase text-white/40 group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
              FAQ <span className="text-accent italic">{audience === 'client' ? 'freelance' : 'hiring'}</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm sm:text-base">
              {audience === 'client'
                ? 'Clear answers to scope and start collaboration quickly.'
                : 'The key points recruiters typically need about my profile and availability.'}
            </p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 group">
                <summary className="cursor-pointer list-none text-white font-medium pr-8">
                  {item.q}
                </summary>
                <p className="text-white/70 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 flex items-center justify-center bg-black relative">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 text-white leading-tight">
                {audience === 'client'
                  ? <>Let&apos;s discuss your <span className="text-accent">project</span>.</>
                  : <>Let&apos;s discuss your <span className="text-accent">hiring process</span>.</>}
              </h2>
              <p className="text-base sm:text-lg font-sans text-white/60 mb-8 tracking-[0.08em] uppercase">
                React / Next / NestJS // {AVAILABLE_FROM}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                <a
                  href="https://calendly.com/alexis-dev/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-slate-950 font-semibold hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Calendly
                </a>
                <a
                  href="mailto:hello@alexis.dev"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Direct email
                </a>
                <a
                  href="https://github.com/Alexis072002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-8">
              <h3 className="text-white text-2xl font-serif mb-2">Quick form</h3>
              <p className="text-white/60 text-sm mb-6">
                {formDescription}
              </p>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">Name</span>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">Email</span>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    placeholder="you@email.com"
                  />
                </label>
                {audience === 'client' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/50">Budget</span>
                      <select
                        value={contactForm.budget}
                        onChange={(event) => setContactForm((prev) => ({ ...prev, budget: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <option value="">Not specified</option>
                        <option value="500-1000">500 - 1000 EUR</option>
                        <option value="1000-2500">1000 - 2500 EUR</option>
                        <option value="2500+">2500+ EUR</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/50">Timeline</span>
                      <select
                        value={contactForm.timeline}
                        onChange={(event) => setContactForm((prev) => ({ ...prev, timeline: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <option value="">Not specified</option>
                        <option value="ASAP">ASAP</option>
                        <option value="2-4 weeks">2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                      </select>
                    </label>
                  </div>
                )}
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                    {audience === 'client' ? 'Message' : 'Role context'}
                  </span>
                  <textarea
                    value={contactForm.need}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, need: event.target.value }))}
                    required
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y"
                    placeholder={messagePlaceholder}
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent text-slate-950 font-semibold py-3.5 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {submitLabel}
                </button>
                <p role="status" aria-live="polite" className="text-sm text-white/60 min-h-5">
                  {formFeedback}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
