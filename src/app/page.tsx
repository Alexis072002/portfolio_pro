"use client"

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useScroll, useSpring, motion, useTransform, useMotionTemplate, useReducedMotion, useMotionValue, animate } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'
import { ProjectCarousel } from '@/components/Work/ProjectCarousel'
import { PORTFOLIO_PROJECTS } from '@/data/projects'
import { useLanguage, type Language } from '@/components/Language/LanguageProvider'
import { LanguageSwitcher } from '@/components/Language/LanguageSwitcher'

const TECH_STACK = [
  { name: "Next.js", glyph: "N", ring: "border-white/20", tone: "text-white" },
  { name: "Python", glyph: "Py", ring: "border-yellow-300/30", tone: "text-yellow-200" },
  { name: "React", glyph: "R", ring: "border-sky-300/30", tone: "text-accent" },
  { name: "NestJS", glyph: "Ne", ring: "border-rose-300/30", tone: "text-rose-200" },
  { name: "TypeScript", glyph: "TS", ring: "border-blue-300/30", tone: "text-blue-200" },
  { name: "TailwindCSS", glyph: "Tw", ring: "border-cyan-300/30", tone: "text-cyan-200" },
  { name: "PostgreSQL", glyph: "Pg", ring: "border-indigo-300/30", tone: "text-indigo-200" }
]

const SERVICES_BY_LANGUAGE: Record<Language, Array<{ title: string; description: string; scope: string; price: string }>> = {
  en: [
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
  ],
  fr: [
    {
      title: "Landing pages premium",
      description: "Pages rapides, responsives et orientées conversion pour lancements produit et campagnes.",
      scope: "Next.js + animations + SEO",
      price: "A partir de 900 EUR"
    },
    {
      title: "Refonte frontend React",
      description: "Refonte UI/UX d’un produit existant avec une architecture de composants maintenable.",
      scope: "React/Next + design system léger",
      price: "A partir de 1400 EUR"
    },
    {
      title: "Application web full-stack",
      description: "Application complète avec frontend Next.js et API NestJS pour des objectifs métier concrets.",
      scope: "Next.js + NestJS + DB",
      price: "Sur devis"
    }
  ]
}

const AI_TOOLS_FAVORITES_BY_LANGUAGE: Record<Language, Array<{ tool: string; type: string; logoSrc: string; reason: string }>> = {
  en: [
    {
      tool: "Antigravity",
      type: "IDE",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=antigravity.dev",
      reason: "More intuitive than Cursor, cleaner UX, and supercharged with the Google ecosystem (Nano Banana, Veo 3.1, Gemini). It makes me significantly more productive."
    },
    {
      tool: "Claude",
      type: "Code AI",
      logoSrc: "https://cdn.simpleicons.org/anthropic/FFFFFF",
      reason: "Excellent reasoning and strong business logic understanding. It analyzes existing code deeply and keeps architecture consistency."
    },
    {
      tool: "Gemini",
      type: "Generative AI",
      logoSrc: "https://cdn.simpleicons.org/googlegemini/8ab4f8",
      reason: "Very high context capacity (1M+ tokens), ideal for large codebases and long multi-file sessions."
    },
    {
      tool: "Nano Banana Pro",
      type: "Image AI",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=labs.google",
      reason: "Highly realistic image quality, precise prompt understanding, and very low hallucination rate."
    },
    {
      tool: "Veo 3.1",
      type: "Video AI",
      logoSrc: "https://cdn.simpleicons.org/googledeepmind/FFFFFF",
      reason: "Best-in-class text-to-video with sound right now. Very powerful, simple to use, and reliable with structured prompts."
    },
    {
      tool: "Flow",
      type: "Video AI",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=labs.google",
      reason: "Great for transition videos between images, accurate prompt understanding, low hallucinations, and multiple video outputs per prompt."
    }
  ],
  fr: [
    {
      tool: "Antigravity",
      type: "IDE",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=antigravity.dev",
      reason: "Plus intuitif que Cursor, UX plus claire, et boosté par l’écosystème Google (Nano Banana, Veo 3.1, Gemini). Je suis nettement plus productif avec."
    },
    {
      tool: "Claude",
      type: "IA code",
      logoSrc: "https://cdn.simpleicons.org/anthropic/FFFFFF",
      reason: "Excellent raisonnement et bonne logique métier. Il analyse très bien le code existant et respecte la cohérence d’architecture."
    },
    {
      tool: "Gemini",
      type: "IA générative",
      logoSrc: "https://cdn.simpleicons.org/googlegemini/8ab4f8",
      reason: "Très grande capacité de contexte (1M+ tokens), idéale pour les grosses bases de code et les sessions longues multi-fichiers."
    },
    {
      tool: "Nano Banana Pro",
      type: "IA image",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=labs.google",
      reason: "Qualité d’image très réaliste, compréhension précise du prompt, et très faible taux d’hallucination."
    },
    {
      tool: "Veo 3.1",
      type: "IA vidéo",
      logoSrc: "https://cdn.simpleicons.org/googledeepmind/FFFFFF",
      reason: "Référence actuelle en text-to-video avec son. Puissant, simple à prendre en main, et fiable avec des prompts structurés."
    },
    {
      tool: "Flow",
      type: "IA vidéo",
      logoSrc: "https://www.google.com/s2/favicons?sz=128&domain=labs.google",
      reason: "Très efficace pour les vidéos de transition entre images, bonne compréhension du prompt, peu d’hallucinations, et sorties multiples par prompt."
    }
  ]
}

const AI_QUALITY_GUARDRAILS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
    "Architecture first: I define structure, boundaries, and implementation strategy before generation.",
    "Rules before output: strict coding standards, naming conventions, and reusable patterns.",
    "Verification loop: generated code is always reviewed, tested, and refactored before merge."
  ],
  fr: [
    "Architecture d’abord : je définis la structure, les limites et la stratégie d’implémentation avant toute génération.",
    "Règles avant output : standards de code stricts, conventions de nommage et patterns réutilisables.",
    "Boucle de vérification : le code généré est toujours relu, testé et refactoré avant merge."
  ]
}

const HUMAN_LED_AI_EXECUTION_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
    "AI as workforce: AI accelerates boilerplate, research, and draft implementations.",
    "I stay the brain: I make product decisions, tradeoffs, and final technical choices.",
    "Final ownership: I validate maintainability, business logic, and production readiness."
  ],
  fr: [
    "L’IA comme main-d’œuvre : elle accélère le boilerplate, la recherche et les premières implémentations.",
    "Je reste le cerveau : je prends les décisions produit, les compromis et les choix techniques finaux.",
    "Responsabilité finale : je valide la maintenabilité, la logique métier et la readiness de production."
  ]
}

const RECRUITER_HIGHLIGHTS_BY_LANGUAGE: Record<Language, Array<{ title: string; description: string }>> = {
  en: [
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
  ],
  fr: [
    {
      title: "Présentation",
      description: "Je suis développeur junior frontend/full-stack JavaScript, en recherche d’un poste CDI avec impact rapide côté frontend."
    },
    {
      title: "Compétences clés",
      description: "React, Next.js, TypeScript et Tailwind côté frontend, avec NestJS pour les API et la contribution full-stack."
    },
    {
      title: "Valeur en équipe",
      description: "Je livre des interfaces lisibles et maintenables, je communique clairement et je monte vite en autonomie en environnement produit exigeant."
    }
  ]
}

const RECRUITER_STACK = ["React", "Next.js", "TypeScript", "NestJS", "TailwindCSS"]

const RECRUITER_FACTS_BY_LANGUAGE: Record<Language, Array<{ label: string; value: string }>> = {
  en: [
    { label: "Role target", value: "Full-time Frontend / Full-stack" },
    { label: "Level", value: "Junior profile" },
    { label: "Availability", value: "Available now" }
  ],
  fr: [
    { label: "Poste ciblé", value: "CDI Frontend / Full-stack" },
    { label: "Niveau", value: "Profil junior" },
    { label: "Disponibilité", value: "Disponible maintenant" }
  ]
}

const FAQ_CLIENT_BY_LANGUAGE: Record<Language, Array<{ q: string; a: string }>> = {
  en: [
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
  ],
  fr: [
    {
      q: "Quels types de projets pouvez-vous prendre en charge ?",
      a: "Landing pages orientées conversion, refontes frontend React/Next, et applications web full-stack JavaScript selon votre besoin."
    },
    {
      q: "Comment se déroule une collaboration type ?",
      a: "Alignement des objectifs, livrables priorisés, puis itérations courtes avec points d’avancement réguliers."
    },
    {
      q: "Comment estimer le budget d’un projet ?",
      a: "Le budget dépend de la complexité et du niveau de qualité attendu. Le formulaire permet une première estimation avant l’échange."
    },
    {
      q: "Sous quel délai pouvez-vous démarrer ?",
      a: "Je peux généralement démarrer rapidement selon la charge en cours. Le planning est confirmé après un court cadrage."
    }
  ]
}

const FAQ_RECRUITER_BY_LANGUAGE: Record<Language, Array<{ q: string; a: string }>> = {
  en: [
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
  ],
  fr: [
    {
      q: "Quel type de poste recherchez-vous actuellement ?",
      a: "Je recherche un poste CDI Frontend ou Full-stack JavaScript, avec un fort focus React et Next.js."
    },
    {
      q: "Quels périmètres pouvez-vous gérer en autonomie ?",
      a: "Développement de features frontend, intégration API, refactor de composants, et optimisation UX/performance."
    },
    {
      q: "Quelle est votre stack principale ?",
      a: "JavaScript/TypeScript, React, Next.js et Tailwind, avec NestJS pour les besoins backend."
    },
    {
      q: "Quand êtes-vous disponible pour un process de recrutement ?",
      a: "Disponible immédiatement pour échange RH, entretien technique et démarrage rapide."
    }
  ]
}

const HERO_FRAMES = Array.from({ length: 80 }, (_, i) =>
  `/assets/hero/frames/Pushing_in_on_1080p_202602061407_${i.toString().padStart(3, '0')}.jpg`
)

const PROFILE_PHOTO_SRC = "/assets/pictures/me.png"
const AUDIENCE_STORAGE_KEY = "portfolio_audience_mode"
const CONTACT_EMAIL = "alexis.dezeque@outlook.com"

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
  const { language } = useLanguage()
  const [audience, setAudience] = useState<Audience>('client')
  const [isLowDataMode, setIsLowDataMode] = useState(false)
  const [profilePhotoAvailable, setProfilePhotoAvailable] = useState(true)
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

  useEffect(() => {
    try {
      const storedAudience = window.localStorage.getItem(AUDIENCE_STORAGE_KEY)
      if (storedAudience === 'client' || storedAudience === 'recruiter') {
        setAudience(storedAudience)
      }
    } catch {
      // Ignore storage access issues and keep default mode.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(AUDIENCE_STORAGE_KEY, audience)
    } catch {
      // Ignore storage write issues.
    }
  }, [audience])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 260 : 100,
    damping: prefersReducedMotion ? 45 : 30,
    restDelta: 0.001
  })
  const introGlitchProgress = useMotionValue(prefersReducedMotion ? 1 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      introGlitchProgress.set(1)
      return
    }

    introGlitchProgress.set(0)
    const controls = animate(introGlitchProgress, 1, {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    })

    return () => controls.stop()
  }, [prefersReducedMotion, introGlitchProgress])

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
  const introRevealStart = 0.0001
  const introHold = 6 * frameStep
  const introEnd = 8 * frameStep

  const introTitleOpacity = useTransform(
    smoothProgress,
    [0, introRevealStart, introHold, introEnd],
    [1, 1, 1, 0]
  )
  const introTitleX = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    [0, 0, 0, prefersReducedMotion ? 0 : -48]
  )
  const introTitleBlur = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    [0, 0, 0, prefersReducedMotion ? 0 : 10]
  )
  const introTitleFilter = useMotionTemplate`blur(${introTitleBlur}px)`

  // One-shot glitch that launches immediately on page load.
  const glitchOpacity = useTransform(
    introGlitchProgress,
    [0, 0.22, 0.52, 0.78, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : [0.95, 0.35, 0.88, 0.16, 0]
  )
  const glitchLeftX = useTransform(
    introGlitchProgress,
    [0, 0.4, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [-18, 8, -5, 0]
  )
  const glitchRightX = useTransform(
    introGlitchProgress,
    [0, 0.4, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [16, -9, 5, 0]
  )
  const glitchScanOpacity = useTransform(
    introGlitchProgress,
    [0, 0.15, 0.65, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [0.82, 0.95, 0.45, 0]
  )
  const glitchScanY = useTransform(
    introGlitchProgress,
    [0, 0.55, 1],
    prefersReducedMotion ? [0, 0, 0] : [-30, 8, 58]
  )

  const audienceLabel = audience === 'client'
    ? 'client'
    : (language === 'fr' ? 'recruteur' : 'recruiter')
  const audienceRecruiterToggleLabel = language === 'fr' ? 'Je recrute' : 'I am hiring'
  const audienceClientToggleLabel = language === 'fr' ? 'Je cherche un freelance' : 'I need a freelancer'
  const availableLabel = language === 'fr' ? 'Disponible' : 'Available'
  const availableNowLabel = language === 'fr' ? 'Disponible maintenant' : 'Available now'
  const services = SERVICES_BY_LANGUAGE[language]
  const aiToolsFavorites = AI_TOOLS_FAVORITES_BY_LANGUAGE[language]
  const aiQualityGuardrails = AI_QUALITY_GUARDRAILS_BY_LANGUAGE[language]
  const humanLedAiExecution = HUMAN_LED_AI_EXECUTION_BY_LANGUAGE[language]
  const recruiterHighlights = RECRUITER_HIGHLIGHTS_BY_LANGUAGE[language]
  const recruiterFacts = RECRUITER_FACTS_BY_LANGUAGE[language]
  const faqItems = audience === 'client' ? FAQ_CLIENT_BY_LANGUAGE[language] : FAQ_RECRUITER_BY_LANGUAGE[language]
  const introRoleLine = audience === 'client'
    ? (language === 'fr' ? '- Développeur web freelance' : '- Freelance Web Developer')
    : (language === 'fr' ? '- Développeur full-stack créatif' : '- Creative Full-stack Developer')
  const introAudiencePitch = audience === 'client'
    ? (language === 'fr'
      ? "Portfolio conçu pour l'acquisition client et une exécution rapide."
      : "Portfolio designed for client acquisition and fast execution.")
    : (language === 'fr'
      ? "Je développe des applications web responsives et performantes, avec un focus sur l’expérience utilisateur et la qualité du code. Je recherche actuellement une opportunité en CDI pour concrétiser des idées créatives dans une équipe passionnée."
      : "I craft responsive, high-performance web applications with a focus on user experience and clean code. I am currently looking for a full-time opportunity to bring creative ideas to life within a passionate team.")
  const heroTitle = audience === 'client'
    ? (language === 'fr'
      ? <>React / Next.js<br />&amp; <span className="text-accent">JavaScript</span> full-stack.</>
      : <>React / Next.js<br />&amp; Full-stack <span className="text-accent">JavaScript</span>.</>)
    : (language === 'fr'
      ? <>Créer des applications scalables avec<br /><span className="text-accent">React &amp; Next.JS</span></>
      : <>Building scalable Project with<br /><span className="text-accent">React &amp; Next.JS</span></>)
  const heroPitch = audience === 'client'
    ? (language === 'fr'
      ? "Je conçois des expériences web rapides et maintenables, alignées avec vos objectifs produit."
      : "I build fast, maintainable web experiences aligned with your product goals.")
    : (language === 'fr'
      ? "Spécialisé dans l’écosystème JavaScript moderne. Je crée des expériences web accessibles et pixel-perfect, et je suis prêt à rejoindre votre équipe dès aujourd’hui."
      : "Specialized in the modern JavaScript ecosystem. I build accessible, pixel-perfect web experiences and I am ready to join your team today.")
  const primaryCtaLabel = audience === 'client'
    ? (language === 'fr' ? 'Voir mes services' : 'View services')
    : (language === 'fr' ? 'Voir le profil' : 'View profile')
  const secondaryCtaLabel = audience === 'client'
    ? (language === 'fr' ? 'Discuter de votre projet' : 'Discuss your project')
    : (language === 'fr' ? 'Planifier un entretien' : 'Schedule an interview')
  const introCtaLabel = audience === 'client'
    ? (language === 'fr' ? 'Démarrer un projet' : 'Start a project')
    : (language === 'fr' ? 'Me contacter' : 'Contact me')
  const workTitle = audience === 'client'
    ? (language === 'fr'
      ? <>Services <span className="text-accent italic">freelance</span></>
      : <>Freelance <span className="text-accent italic">services</span></>)
    : (language === 'fr'
      ? <>À propos de <span className="text-accent italic">moi</span></>
      : <>About <span className="text-accent italic">me</span></>)
  const workSubtitle = audience === 'client'
    ? (language === 'fr'
      ? 'Offres ciblées, conçues pour l’acquisition et la conversion'
      : 'Lean service offers focused on acquisition and conversion')
    : (language === 'fr'
      ? 'Aperçu de mon profil junior pour un poste frontend/full-stack en CDI'
      : 'Snapshot of my junior profile for a full-time frontend/full-stack role')
  const aboutEyebrow = audience === 'client'
    ? (language === 'fr' ? 'Positionnement // Offre freelance' : 'Positioning // Freelance offer')
    : (language === 'fr' ? 'Positionnement // Candidature CDI' : 'Positioning // Full-time application')
  const aboutTitle = audience === 'client'
    ? (language === 'fr'
      ? <>React / Next pour <span className="text-accent italic">l’acquisition client</span>,<br />NestJS pour une exécution robuste.</>
      : <>React / Next for <span className="text-accent italic">client acquisition</span>,<br />NestJS for robust delivery.</>)
    : (language === 'fr'
      ? <>React / Next en <span className="text-accent italic">priorité</span>,<br />NestJS pour le full-stack.</>
      : <>React / Next <span className="text-accent italic">first</span>,<br />NestJS for full-stack.</>)
  const aboutParagraphs = audience === 'client'
    ? (language === 'fr'
      ? [
        "J’aide les équipes à transformer leurs besoins en expériences web rapides, claires et orientées résultats.",
        "Mon approche est simple : cadrage clair, exécution propre, suivi transparent et livrables maintenables."
      ]
      : [
        "I help teams turn requirements into fast, clear and result-oriented web experiences.",
        "My approach is simple: clear scope, clean execution, transparent follow-up and maintainable deliverables."
      ])
    : (language === 'fr'
      ? [
        "Je suis développeur junior frontend/full-stack JavaScript, avec un focus React/Next pour livrer des interfaces fiables et scalables.",
        "Je développe au quotidien avec des assistants IA pour aller plus vite, tout en conservant la qualité du code et la maintenabilité.",
        "Mon objectif est de rejoindre une équipe produit en CDI, contribuer rapidement sur le périmètre frontend, puis élargir vers plus de responsabilités full-stack."
      ]
      : [
        "I am a junior frontend/full-stack JavaScript developer, focused on React/Next to deliver reliable and scalable interfaces.",
        "I build daily with AI copilots and modern assistant tools to ship faster while keeping code quality and maintainability high.",
        "My goal is to join a product team full-time, contribute quickly on frontend scope, and grow into broader full-stack ownership."
      ])
  const formDescription = audience === 'client'
    ? (language === 'fr'
      ? "Partagez votre contexte, votre budget et votre délai. Je vous réponds rapidement."
      : "Share your context, budget and timeline. I will get back to you quickly.")
    : (language === 'fr'
      ? "Partagez le contexte du poste et les attentes de votre équipe. Je vous réponds rapidement."
      : "Share role context and team expectations. I will get back to you quickly.")
  const messagePlaceholder = audience === 'client'
    ? (language === 'fr'
      ? "Contexte, objectifs, stack et attentes..."
      : "Context, goals, stack and expectations...")
    : (language === 'fr'
      ? "Contexte du poste, stack, organisation équipe et prochaines étapes..."
      : "Role context, stack, team setup and next steps...")
  const submitLabel = audience === 'client'
    ? (language === 'fr' ? 'Envoyer la demande' : 'Send request')
    : (language === 'fr' ? "Demander un entretien" : 'Request an interview')
  const projectsIntro = audience === 'client'
    ? (language === 'fr'
      ? "Aperçu du format final des case studies pour vous projeter dans une future collaboration."
      : "Preview of the final case study format to help you visualize collaboration.")
    : (language === 'fr'
      ? "Aperçu du format final des projets, utilisé pendant les échanges de recrutement."
      : "Preview of the final project format shared during hiring conversations.")
  const renderProfileAvatar = ({
    wrapperClassName,
    imageClassName,
    initialsClassName
  }: {
    wrapperClassName: string
    imageClassName: string
    initialsClassName?: string
  }) => (
    <span className={`relative overflow-hidden shrink-0 border border-white/20 bg-black/60 ${wrapperClassName}`}>
      <span className={`absolute inset-0 flex items-center justify-center text-white/70 font-semibold tracking-wide ${initialsClassName ?? 'text-xs'}`}>
        AD
      </span>
      {profilePhotoAvailable && (
        <Image
          src={PROFILE_PHOTO_SRC}
          alt="Alexis Dezeque portrait"
          fill
          sizes="(max-width: 768px) 64px, 96px"
          className={imageClassName}
          onError={() => setProfilePhotoAvailable(false)}
        />
      )}
    </span>
  )

  const handleAudienceChange = (nextAudience: Audience) => {
    setAudience(nextAudience)
    setFormFeedback("")
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subjectPrefix = language === 'fr' ? 'Contact' : 'Contact'
    const subject = encodeURIComponent(`${subjectPrefix} ${audienceLabel} - ${contactForm.name}`)
    const bodyLines = [
      language === 'fr' ? "Bonjour Alexis," : "Hello Alexis,",
      "",
      `${language === 'fr' ? 'Nom' : 'Name'}: ${contactForm.name}`,
      `${language === 'fr' ? 'Email' : 'Email'}: ${contactForm.email}`
    ]

    if (audience === 'client') {
      bodyLines.push(`${language === 'fr' ? 'Budget' : 'Budget'}: ${contactForm.budget || (language === 'fr' ? 'Non précisé' : 'Not specified')}`)
      bodyLines.push(`${language === 'fr' ? 'Délai' : 'Timeline'}: ${contactForm.timeline || (language === 'fr' ? 'Non précisé' : 'Not specified')}`)
    }

    bodyLines.push("")
    bodyLines.push(audience === 'client'
      ? (language === 'fr' ? 'Contexte projet :' : 'Project context:')
      : (language === 'fr' ? 'Contexte recrutement :' : 'Hiring context:'))
    bodyLines.push(contactForm.need)

    const body = encodeURIComponent(bodyLines.join('\r\n'))

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setFormFeedback(language === 'fr'
      ? "Message préparé. Votre client email s'ouvre."
      : "Message prepared. Your email client is opening.")
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
    email: CONTACT_EMAIL
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
            className={`text-center py-3 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${audience === 'recruiter' ? 'bg-accent text-slate-950' : 'border border-white/20 text-white'}`}
          >
            {audienceRecruiterToggleLabel}
          </button>
          <button
            type="button"
            onClick={() => handleAudienceChange('client')}
            className={`text-center py-3 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${audience === 'client' ? 'bg-accent text-slate-950' : 'border border-white/20 text-white'}`}
          >
            {audienceClientToggleLabel}
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

          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30">
            <LanguageSwitcher />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-2 p-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => handleAudienceChange('recruiter')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'recruiter' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              {audienceRecruiterToggleLabel}
            </button>
            <button
              type="button"
              onClick={() => handleAudienceChange('client')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'client' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              {audienceClientToggleLabel}
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
              <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white/70">
                {language === 'fr' ? 'Portfolio' : 'Portfolio'}
              </span>
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
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white pointer-events-auto hover:border-accent/45 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {introCtaLabel}
            </a>
          </motion.div>

          <a
            href="#contact"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-lg hover:border-emerald-300/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex items-start gap-3">
              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/60">{availableLabel}</p>
                <p className="text-sm sm:text-base text-white font-semibold inline-flex items-center gap-2">
                  <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" aria-hidden />
                  {availableNowLabel}
                </p>
              </div>
              {renderProfileAvatar({
                wrapperClassName: "w-8 h-8 rounded-full mt-0.5",
                imageClassName: "object-cover",
                initialsClassName: "text-[10px]"
              })}
            </div>
          </a>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif font-medium tracking-tighter mb-6 md:mb-8 leading-[1.05] text-white drop-shadow-[0_0_40px_rgba(2,6,23,0.9)]">
              {heroTitle}
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

      <section id="work" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 bg-background">
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
              {services.map((service) => (
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                      Alexis Dezeque
                    </h3>
                    <p className="mt-2 text-white/70 text-sm md:text-base">
                      {language === 'fr'
                        ? 'Développeur JavaScript Frontend / Full-stack'
                        : 'Frontend / Full-stack JavaScript Developer'}
                    </p>
                  </div>
                  {renderProfileAvatar({
                    wrapperClassName: "w-16 h-16 md:w-20 md:h-20 rounded-2xl",
                    imageClassName: "object-cover object-[center_26%]",
                    initialsClassName: "text-sm md:text-base"
                  })}
                </div>

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
                  {recruiterFacts.map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                      <span className="text-white/50 text-xs uppercase tracking-[0.14em]">{fact.label}</span>
                      <span className="text-white text-sm">{fact.value}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#projects"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-slate-950 text-sm font-semibold hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {language === 'fr' ? 'Mes projets' : 'My projects'}
                </a>
              </article>

              <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
                {recruiterHighlights.map((item, index) => (
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

      <section id="projects" className="w-full py-20 md:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
              {language === 'fr'
                ? <>Projets <span className="text-accent italic">portfolio</span></>
                : <>Portfolio <span className="text-accent italic">projects</span></>}
            </h2>
            <p className="mt-4 text-white/60 text-sm sm:text-base max-w-3xl mx-auto">
              {projectsIntro}
            </p>
          </div>

          <ProjectCarousel projects={PORTFOLIO_PROJECTS} />
        </div>
      </section>

      <section id="proofs" className="w-full py-20 md:py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
              {language === 'fr'
                ? <>Workflow <span className="text-accent italic">IA</span></>
                : <>AI <span className="text-accent italic">workflow</span></>}
            </h2>
            <p className="mt-4 text-white/60 text-sm sm:text-base max-w-3xl mx-auto">
              {language === 'fr'
                ? "Ma manière de combiner outils IA, IDE et stack d’implémentation sur des projets réels."
                : "The way I combine AI tools, IDEs, and implementation stack in real projects."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-5">
            <article className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-3">
                {language === 'fr' ? 'Workflow IA-first' : 'AI-first workflow'}
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                {language === 'fr'
                  ? <>Livraison plus rapide, <span className="text-accent">code plus propre</span>.</>
                  : <>Faster output, <span className="text-accent">cleaner code</span>.</>}
              </h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">
                {language === 'fr'
                  ? "L’IA m’aide à passer plus vite de l’idée à la production tout en gardant structure et lisibilité."
                  : "AI helps me move faster from idea to production while keeping structure and readability."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {language === 'fr' ? 'Vitesse' : 'Speed'}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {language === 'fr' ? 'Qualité' : 'Quality'}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {language === 'fr' ? 'Régularité' : 'Consistency'}
                </span>
              </div>
            </article>

            <article className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-4">
                {language === 'fr' ? 'Outils IA préférés' : 'AI tools I prefer'}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {aiToolsFavorites.map((item) => (
                  <li key={item.tool} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-black/45 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoSrc} alt={`${item.tool} logo`} className="w-5 h-5 object-contain" loading="lazy" />
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm leading-tight">{item.tool}</p>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-accent/85 mt-1">{item.type}</p>
                      </div>
                    </div>
                    <p className="text-white/75 leading-relaxed text-xs mt-2">{item.reason}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-4">
                {language === 'fr' ? 'Garde-fous qualité IA' : 'AI quality guardrails'}
              </p>
              <ul className="space-y-2.5">
                {aiQualityGuardrails.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/80 leading-relaxed text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-4">
                {language === 'fr' ? 'Exécution IA pilotée par l’humain' : 'Human-led AI execution'}
              </p>
              <ul className="space-y-2.5">
                {humanLedAiExecution.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/80 leading-relaxed text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-background relative overflow-hidden">
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

            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110 rounded-2xl border ${tech.ring} bg-black/35 ${tech.tone} drop-shadow-[0_0_15px_rgba(14,165,233,0.25)] flex items-center justify-center`}>
                      <span className="text-base sm:text-lg font-semibold tracking-wide">{tech.glyph}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.15em] uppercase text-white/40 group-hover:text-accent transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
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

      <section id="faq" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
              FAQ <span className="text-accent italic">
                {audience === 'client'
                  ? (language === 'fr' ? 'freelance' : 'freelance')
                  : (language === 'fr' ? 'recrutement' : 'hiring')}
              </span>
            </h2>
            <p className="mt-4 text-white/60 text-sm sm:text-base">
              {audience === 'client'
                ? (language === 'fr'
                  ? 'Réponses claires pour cadrer le besoin et démarrer rapidement.'
                  : 'Clear answers to scope and start collaboration quickly.')
                : (language === 'fr'
                  ? 'Les points clés qu’un recruteur attend sur mon profil et ma disponibilité.'
                  : 'The key points recruiters typically need about my profile and availability.')}
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

      <section id="contact" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 flex items-center justify-center bg-background relative">
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
                  ? (language === 'fr'
                    ? <>Parlons de votre <span className="text-accent">projet</span>.</>
                    : <>Let&apos;s discuss your <span className="text-accent">project</span>.</>)
                  : (language === 'fr'
                    ? <>Parlons de votre <span className="text-accent">processus de recrutement</span>.</>
                    : <>Let&apos;s discuss your <span className="text-accent">hiring process</span>.</>)}
              </h2>
              <p className="text-base sm:text-lg font-sans text-white/60 mb-8 tracking-[0.08em] uppercase">
                React / Next / NestJS // {availableNowLabel}
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
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {language === 'fr' ? 'Email direct' : 'Direct email'}
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
              <h3 className="text-white text-2xl font-serif mb-2">{language === 'fr' ? 'Formulaire rapide' : 'Quick form'}</h3>
              <p className="text-white/60 text-sm mb-6">
                {formDescription}
              </p>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Nom' : 'Name'}</span>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
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
                    placeholder={language === 'fr' ? 'vous@email.com' : 'you@email.com'}
                  />
                </label>
                {audience === 'client' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Budget' : 'Budget'}</span>
                      <select
                        value={contactForm.budget}
                        onChange={(event) => setContactForm((prev) => ({ ...prev, budget: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <option value="">{language === 'fr' ? 'Non précisé' : 'Not specified'}</option>
                        <option value="500-1000">500 - 1000 EUR</option>
                        <option value="1000-2500">1000 - 2500 EUR</option>
                        <option value="2500+">2500+ EUR</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Délai' : 'Timeline'}</span>
                      <select
                        value={contactForm.timeline}
                        onChange={(event) => setContactForm((prev) => ({ ...prev, timeline: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <option value="">{language === 'fr' ? 'Non précisé' : 'Not specified'}</option>
                        <option value="ASAP">ASAP</option>
                        <option value="2-4 weeks">{language === 'fr' ? '2-4 semaines' : '2-4 weeks'}</option>
                        <option value="1-2 months">{language === 'fr' ? '1-2 mois' : '1-2 months'}</option>
                      </select>
                    </label>
                  </div>
                )}
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                    {audience === 'client'
                      ? (language === 'fr' ? 'Message' : 'Message')
                      : (language === 'fr' ? 'Contexte du poste' : 'Role context')}
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
