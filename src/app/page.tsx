"use client"

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useScroll, useSpring, motion, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'
import { ProjectCarousel } from '@/components/Work/ProjectCarousel'
import { PORTFOLIO_PROJECTS, PROJECT_TAGS } from '@/data/projects'

const TECH_STACK = [
  { name: "Next.js", color: "text-white" },
  { name: "React", color: "text-accent" },
  { name: "Vue", color: "text-emerald-400" },
  { name: "Symfony", color: "text-white/60" },
  { name: "TailwindCSS", color: "text-sky-400" }
]

const PROCESS_STEPS = [
  {
    title: "01. Comprendre",
    description: "Je clarifie le besoin, le contexte produit, puis je priorise les taches utiles pour l equipe."
  },
  {
    title: "02. Construire",
    description: "Je developpe des interfaces maintenables et des features full-stack avec une logique claire."
  },
  {
    title: "03. Ameliorer",
    description: "Je teste, je corrige, puis j optimise les performances et l accessibilite en continu."
  }
]

const ENGINEERING_STANDARDS = [
  "TypeScript strict, composants reutilisables et conventions claires",
  "Performance front: image strategy, lazy loading, Core Web Vitals",
  "Accessibilite: navigation clavier, contrastes et reduced motion",
  "Tests unitaires et verification continue avant merge"
]

const HERO_FRAMES = Array.from({ length: 80 }, (_, i) =>
  `/assets/hero/frames/Pushing_in_on_1080p_202602061407_${i.toString().padStart(3, '0')}.jpg`
)

const AVAILABLE_FROM = "Disponible des maintenant"

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean
    effectiveType?: string
  }
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeTag, setActiveTag] = useState("All")
  const [isLowDataMode, setIsLowDataMode] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    need: ""
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

  const filteredProjects = useMemo(
    () => activeTag === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) => project.tags.includes(activeTag)),
    [activeTag]
  )

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 260 : 100,
    damping: prefersReducedMotion ? 45 : 30,
    restDelta: 0.001
  })

  const textOpacity = useTransform(
    smoothProgress,
    prefersReducedMotion ? [0, 0.01] : [0.95, 1],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const textY = useTransform(
    smoothProgress,
    prefersReducedMotion ? [0, 0.01] : [0.95, 1],
    prefersReducedMotion ? [0, 0] : [60, 0]
  )
  const textScale = useTransform(
    smoothProgress,
    prefersReducedMotion ? [0, 0.01] : [0.95, 1],
    prefersReducedMotion ? [1, 1] : [0.9, 1]
  )

  const frameStep = 1 / (HERO_FRAMES.length - 1)
  const introPeak = 2 * frameStep
  const introHold = 6 * frameStep
  const introEnd = 8 * frameStep

  const introTitleOpacity = useTransform(
    smoothProgress,
    [0, introPeak, introHold, introEnd],
    [0, 1, 1, 0]
  )
  const introTitleX = useTransform(
    smoothProgress,
    [0, introPeak, introHold, introEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [-48, 0, 0, -48]
  )
  const introTitleBlur = useTransform(
    smoothProgress,
    [0, introPeak, introHold, introEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [10, 0, 0, 10]
  )
  const introTitleFilter = useMotionTemplate`blur(${introTitleBlur}px)`

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Prise de contact recrutement - ${contactForm.name}`)
    const body = encodeURIComponent(
      `Bonjour Alexis,%0D%0A%0D%0ANom: ${contactForm.name}%0D%0AEmail: ${contactForm.email}%0D%0A%0D%0AMessage:%0D%0A${contactForm.need}`
    )

    window.location.href = `mailto:hello@alexis.dev?subject=${subject}&body=${body}`
    setFormFeedback("Message prepare. Ton client mail est en train de s ouvrir.")
  }

  return (
    <div className="flex flex-col items-center justify-center selection:bg-accent/30 font-sans">
      {/* Mobile Thumb Actions */}
      <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-2 grid grid-cols-2 gap-2">
          <a
            href="#work"
            className="text-center py-3 rounded-xl bg-accent text-slate-950 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="text-center py-3 rounded-xl border border-white/20 text-white text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Me contacter
          </a>
        </div>
      </div>

      {/* Hero Section */}
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

          {/* Intro Name Layer (Top-Left) - Only first 8 frames */}
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
              Alexis Dezeque
              <span className="block text-accent italic">- Junior Dev Front-end / Full-stack</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-[44ch] leading-relaxed">
              Portfolio de projets techniques pour rejoindre une equipe produit en tant que developpeur junior.
            </p>
          </motion.div>

          {/* Top-right value nugget */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 pointer-events-none">
            <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-lg">
              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/60">Disponible des</p>
              <p className="text-sm sm:text-base text-white font-semibold">{AVAILABLE_FROM}</p>
            </div>
          </div>

          {/* Main Hero Message */}
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale
            }}
            className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif font-medium tracking-tighter mb-6 md:mb-8 leading-[1.05] text-white drop-shadow-[0_0_40px_rgba(2,6,23,0.9)]">
              Front-end propre.
              <br />
              Full-stack <span className="text-accent">solide</span>.
            </h2>
            <p className="max-w-xl text-base sm:text-lg md:text-2xl font-sans text-white leading-relaxed mx-auto font-medium mb-10 md:mb-12 drop-shadow-[0_0_30px_rgba(2,6,23,0.8)]">
              Je suis developpeur web junior. J aime construire des interfaces reactives,
              maintenir du code propre et progresser en equipe sur des projets concrets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pointer-events-auto w-full sm:w-auto max-w-sm sm:max-w-none">
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 bg-accent text-slate-950 font-sans font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 border border-white/15 font-sans font-medium rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Profil & Contact
              </a>
              <a
                href="/Alexis-Dezeque-CV.pdf"
                download
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 border border-accent/50 font-sans font-medium rounded-full hover:bg-accent/10 transition-all duration-300 text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Telecharger CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold mb-5 md:mb-6 text-white">
              Selected <span className="text-accent italic">Work</span>
            </h2>
            <p className="text-white/40 font-sans tracking-[0.18em] uppercase text-[11px] sm:text-sm">
              Featured Case Studies // 2024-2026
            </p>
          </motion.div>

          <div className="mb-8 md:mb-10 flex flex-wrap gap-2 md:gap-3 justify-center">
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`px-4 py-2 rounded-full text-xs md:text-sm tracking-[0.12em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${activeTag === tag
                  ? 'bg-accent text-slate-950 font-semibold'
                  : 'bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-accent/40'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative">
            <ProjectCarousel projects={filteredProjects} />
          </div>

          <div className="mt-12 md:mt-20 text-center">
            <p className="text-white/20 font-sans tracking-[0.2em] uppercase text-[10px]">
              Drag pour explorer // Clique une carte pour la page projet detaillee
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 flex items-center bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[700px] md:h-[700px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-6">About Me // Identity</p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-8 md:mb-10 text-white leading-tight tracking-tight">
                From <span className="text-accent italic">Curiosity</span> to <span className="text-accent">Creation</span>
              </h2>
              <div className="space-y-5 md:space-y-6 text-base md:text-lg font-sans text-white/70 leading-relaxed font-light max-w-xl">
                <p>
                  Je n ai pas commence directement dans le dev. C est en pratiquant que j ai realise que
                  <span className="text-white italic"> coder est mon meilleur moyen de creer</span>.
                  Deux ans de formation intensive a <span className="text-accent">Web@cademy</span> m ont permis de structurer ma methode.
                </p>
                <p>
                  Aujourd hui, je me specialise dans l ecosysteme <span className="text-white font-medium">JavaScript</span>,
                  avec une orientation Front-end forte et de bonnes bases Full-stack.
                  J apprecie autant la structure de Symfony que la souplesse de Next.js.
                </p>
                <p>
                  Mon objectif est clair: rejoindre une equipe en tant que
                  <span className="text-white italic"> developpeur junior front-end / full-stack</span>,
                  continuer a apprendre vite, et livrer du code utile au produit.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -10, rotate: 2 }}
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

      {/* Process Section */}
      <section id="process" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14">
            <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-4">Process // Workflow</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium text-white leading-tight">
              Ma methode de travail en <span className="text-accent italic">equipe tech</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-serif mb-4">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Standards Section */}
      <section id="standards" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl md:rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
              <div>
                <p className="text-accent font-sans tracking-[0.2em] uppercase text-xs mb-4">Trust // Engineering</p>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium text-white leading-tight mb-6">
                  Standards de code que j applique au <span className="text-accent">quotidien</span>.
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                  Meme en profil junior, je travaille avec une base solide pour livrer
                  des features lisibles, testables et stables.
                </p>
              </div>
              <ul className="space-y-3">
                {ENGINEERING_STANDARDS.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/85 text-sm md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 flex items-center justify-center bg-black relative">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 text-white leading-tight">
                Envie d echanger pour un <span className="text-accent">poste junior</span> ?
              </h2>
              <p className="text-base sm:text-lg font-sans text-white/60 mb-8 tracking-[0.08em] uppercase">
                Front-end / Full-stack // {AVAILABLE_FROM}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-slate-950 font-semibold hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  LinkedIn
                </a>
                <a
                  href="/Alexis-Dezeque-CV.pdf"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Telecharger mon CV
                </a>
              </div>
            </motion.div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-8">
              <h3 className="text-white text-2xl font-serif mb-2">Me contacter</h3>
              <p className="text-white/60 text-sm mb-6">
                Pour une opportunite junior, une alternance, un stage ou un CDI.
              </p>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">Nom</span>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    placeholder="Ton nom"
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
                    placeholder="toi@email.com"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">Message</span>
                  <textarea
                    value={contactForm.need}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, need: event.target.value }))}
                    required
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y"
                    placeholder="Contexte du poste, stack, equipe, disponibilite..."
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent text-slate-950 font-semibold py-3.5 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Envoyer un message
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
