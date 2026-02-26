import React from 'react'
import type { Language } from '@/components/Language/LanguageProvider'
import type {
  AiToolItem,
  Audience,
  FaqItem,
  RecruiterFactItem,
  RecruiterHighlightItem,
  ServiceItem
} from '@/components/Home/types'

export const TECH_STACK = [
  { name: 'Next.js', glyph: 'N', ring: 'border-white/20', tone: 'text-white' },
  { name: 'Python', glyph: 'Py', ring: 'border-yellow-300/30', tone: 'text-yellow-200' },
  { name: 'React', glyph: 'R', ring: 'border-sky-300/30', tone: 'text-accent' },
  { name: 'NestJS', glyph: 'Ne', ring: 'border-rose-300/30', tone: 'text-rose-200' },
  { name: 'TypeScript', glyph: 'TS', ring: 'border-blue-300/30', tone: 'text-blue-200' },
  { name: 'TailwindCSS', glyph: 'Tw', ring: 'border-cyan-300/30', tone: 'text-cyan-200' },
  { name: 'PostgreSQL', glyph: 'Pg', ring: 'border-indigo-300/30', tone: 'text-indigo-200' }
] as const

export const RECRUITER_STACK = ['React', 'Next.js', 'TypeScript', 'NestJS', 'TailwindCSS']

export const HERO_FRAMES = Array.from({ length: 80 }, (_, i) =>
  `/assets/hero/frames/Pushing_in_on_1080p_202602061407_${i.toString().padStart(3, '0')}.jpg`
)

export const PROFILE_PHOTO_SRC = '/assets/pictures/me.jpeg'
export const AUDIENCE_STORAGE_KEY = 'portfolio_audience_mode'
export const CONTACT_EMAIL = 'alexis.dezeque@outlook.com'

const SERVICES_BY_LANGUAGE: Record<Language, ServiceItem[]> = {
  en: [
    {
      title: 'Landing Pages Premium',
      description: 'Fast, responsive, conversion-driven pages for product launches and campaigns.',
      scope: 'Next.js + animations + SEO',
      price: 'From EUR 900'
    },
    {
      title: 'React Frontend Revamp',
      description: 'UI/UX revamp of an existing product with a maintainable component architecture.',
      scope: 'React/Next + lightweight design system',
      price: 'From EUR 1400'
    },
    {
      title: 'Full-stack Web App',
      description: 'Complete web app with a Next.js frontend and NestJS API for concrete business goals.',
      scope: 'Next.js + NestJS + DB',
      price: 'Custom quote'
    }
  ],
  fr: [
    {
      title: 'Landing pages premium',
      description: 'Pages rapides, responsives et orientées conversion pour lancements produit et campagnes.',
      scope: 'Next.js + animations + SEO',
      price: 'A partir de 900 EUR'
    },
    {
      title: 'Refonte frontend React',
      description: 'Refonte UI/UX d’un produit existant avec une architecture de composants maintenable.',
      scope: 'React/Next + design system léger',
      price: 'A partir de 1400 EUR'
    },
    {
      title: 'Application web full-stack',
      description: 'Application complète avec frontend Next.js et API NestJS pour des objectifs métier concrets.',
      scope: 'Next.js + NestJS + DB',
      price: 'Sur devis'
    }
  ]
}

const AI_TOOLS_FAVORITES_BY_LANGUAGE: Record<Language, AiToolItem[]> = {
  en: [
    {
      tool: 'Antigravity',
      type: 'IDE',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=antigravity.dev',
      reason: 'More intuitive than Cursor, cleaner UX, and supercharged with the Google ecosystem (Nano Banana, Veo 3.1, Gemini). It makes me significantly more productive.'
    },
    {
      tool: 'Claude',
      type: 'Code AI',
      logoSrc: 'https://cdn.simpleicons.org/anthropic/FFFFFF',
      reason: 'Excellent reasoning and strong business logic understanding. It analyzes existing code deeply and keeps architecture consistency.'
    },
    {
      tool: 'Gemini',
      type: 'Generative AI',
      logoSrc: 'https://cdn.simpleicons.org/googlegemini/8ab4f8',
      reason: 'Very high context capacity (1M+ tokens), ideal for large codebases and long multi-file sessions.'
    },
    {
      tool: 'Nano Banana Pro',
      type: 'Image AI',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=labs.google',
      reason: 'Highly realistic image quality, precise prompt understanding, and very low hallucination rate.'
    },
    {
      tool: 'Veo 3.1',
      type: 'Video AI',
      logoSrc: 'https://cdn.simpleicons.org/googledeepmind/FFFFFF',
      reason: 'Best-in-class text-to-video with sound right now. Very powerful, simple to use, and reliable with structured prompts.'
    },
    {
      tool: 'Flow',
      type: 'Video AI',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=labs.google',
      reason: 'Great for transition videos between images, accurate prompt understanding, low hallucinations, and multiple video outputs per prompt.'
    }
  ],
  fr: [
    {
      tool: 'Antigravity',
      type: 'IDE',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=antigravity.dev',
      reason: 'Plus intuitif que Cursor, UX plus claire, et boosté par l’écosystème Google (Nano Banana, Veo 3.1, Gemini). Je suis nettement plus productif avec.'
    },
    {
      tool: 'Claude',
      type: 'IA code',
      logoSrc: 'https://cdn.simpleicons.org/anthropic/FFFFFF',
      reason: 'Excellent raisonnement et bonne logique métier. Il analyse très bien le code existant et respecte la cohérence d’architecture.'
    },
    {
      tool: 'Gemini',
      type: 'IA générative',
      logoSrc: 'https://cdn.simpleicons.org/googlegemini/8ab4f8',
      reason: 'Très grande capacité de contexte (1M+ tokens), idéale pour les grosses bases de code et les sessions longues multi-fichiers.'
    },
    {
      tool: 'Nano Banana Pro',
      type: 'IA image',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=labs.google',
      reason: 'Qualité d’image très réaliste, compréhension précise du prompt, et très faible taux d’hallucination.'
    },
    {
      tool: 'Veo 3.1',
      type: 'IA vidéo',
      logoSrc: 'https://cdn.simpleicons.org/googledeepmind/FFFFFF',
      reason: 'Référence actuelle en text-to-video avec son. Puissant, simple à prendre en main, et fiable avec des prompts structurés.'
    },
    {
      tool: 'Flow',
      type: 'IA vidéo',
      logoSrc: 'https://www.google.com/s2/favicons?sz=128&domain=labs.google',
      reason: 'Très efficace pour les vidéos de transition entre images, bonne compréhension du prompt, peu d’hallucinations, et sorties multiples par prompt.'
    }
  ]
}

const AI_QUALITY_GUARDRAILS_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
    'Architecture first: I define structure, boundaries, and implementation strategy before generation.',
    'Rules before output: strict coding standards, naming conventions, and reusable patterns.',
    'Verification loop: generated code is always reviewed, tested, and refactored before merge.'
  ],
  fr: [
    'Architecture d’abord : je définis la structure, les limites et la stratégie d’implémentation avant toute génération.',
    'Règles avant output : standards de code stricts, conventions de nommage et patterns réutilisables.',
    'Boucle de vérification : le code généré est toujours relu, testé et refactoré avant merge.'
  ]
}

const HUMAN_LED_AI_EXECUTION_BY_LANGUAGE: Record<Language, string[]> = {
  en: [
    'AI as workforce: AI accelerates boilerplate, research, and draft implementations.',
    'I stay the brain: I make product decisions, tradeoffs, and final technical choices.',
    'Final ownership: I validate maintainability, business logic, and production readiness.'
  ],
  fr: [
    'L’IA comme main-d’œuvre : elle accélère le boilerplate, la recherche et les premières implémentations.',
    'Je reste le cerveau : je prends les décisions produit, les compromis et les choix techniques finaux.',
    'Responsabilité finale : je valide la maintenabilité, la logique métier et la readiness de production.'
  ]
}

const RECRUITER_HIGHLIGHTS_BY_LANGUAGE: Record<Language, RecruiterHighlightItem[]> = {
  en: [
    {
      title: 'Profile',
      description: 'I am a frontend/full-stack JavaScript developer, EPITECH graduate (RNCP level 5), focused on delivering immediate product impact.'
    },
    {
      title: 'Core skills',
      description: 'React, Next.js, TypeScript and Tailwind on the frontend, plus NestJS for APIs and full-stack collaboration.'
    },
    {
      title: 'Team value',
      description: 'I deliver readable, maintainable interfaces, communicate clearly, and ramp up quickly in demanding product environments.'
    }
  ],
  fr: [
    {
      title: 'Présentation',
      description: 'Je suis développeur frontend/full-stack JavaScript, diplômé d’EPITECH (RNCP niveau 5), avec un impact rapide sur les produits web.'
    },
    {
      title: 'Compétences clés',
      description: 'React, Next.js, TypeScript et Tailwind côté frontend, avec NestJS pour les API et la contribution full-stack.'
    },
    {
      title: 'Valeur en équipe',
      description: 'Je livre des interfaces lisibles et maintenables, je communique clairement et je monte vite en autonomie en environnement produit exigeant.'
    }
  ]
}

const RECRUITER_FACTS_BY_LANGUAGE: Record<Language, RecruiterFactItem[]> = {
  en: [
    { label: 'Role target', value: 'Frontend / Full-stack JavaScript opportunities' },
    { label: 'Qualification', value: 'EPITECH graduate (RNCP level 5)' },
    { label: 'Availability', value: 'Available now' }
  ],
  fr: [
    { label: 'Poste ciblé', value: 'Opportunités JavaScript Frontend / Full-stack' },
    { label: 'Formation', value: 'Diplômé d’EPITECH (RNCP niveau 5)' },
    { label: 'Disponibilité', value: 'Disponible maintenant' }
  ]
}

const FAQ_CLIENT_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: [
    {
      q: 'What types of projects can you handle?',
      a: 'Conversion landing pages, React/Next frontend revamps, and full-stack JavaScript web apps depending on your scope.'
    },
    {
      q: 'What does a typical collaboration look like?',
      a: 'Goal alignment, prioritized deliverables, and short iterations with regular progress updates.'
    },
    {
      q: 'How should I estimate project budget?',
      a: 'Budget depends on complexity and expected quality level. The form helps create a first estimate before the first call.'
    },
    {
      q: 'How fast can we start?',
      a: 'I can usually start quickly based on workload. The timeline is confirmed after a short scoping call.'
    }
  ],
  fr: [
    {
      q: 'Quels types de projets pouvez-vous prendre en charge ?',
      a: 'Landing pages orientées conversion, refontes frontend React/Next, et applications web full-stack JavaScript selon votre besoin.'
    },
    {
      q: 'Comment se déroule une collaboration type ?',
      a: 'Alignement des objectifs, livrables priorisés, puis itérations courtes avec points d’avancement réguliers.'
    },
    {
      q: 'Comment estimer le budget d’un projet ?',
      a: 'Le budget dépend de la complexité et du niveau de qualité attendu. Le formulaire permet une première estimation avant l’échange.'
    },
    {
      q: 'Sous quel délai pouvez-vous démarrer ?',
      a: 'Je peux généralement démarrer rapidement selon la charge en cours. Le planning est confirmé après un court cadrage.'
    }
  ]
}

const FAQ_RECRUITER_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: [
    {
      q: 'What type of role are you currently looking for?',
      a: 'I am open to Frontend or Full-stack JavaScript opportunities, with a strong focus on React and Next.js.'
    },
    {
      q: 'Which areas can you handle independently?',
      a: 'Frontend feature development, API integration, component refactoring, and UX/performance optimization.'
    },
    {
      q: 'What is your strongest stack?',
      a: 'JavaScript/TypeScript, React, Next.js and Tailwind, with NestJS for backend needs.'
    },
    {
      q: 'When are you available for a hiring process?',
      a: 'Available immediately for HR screening, technical interviews, and a fast start date.'
    }
  ],
  fr: [
    {
      q: 'Quel type de poste recherchez-vous actuellement ?',
      a: 'Je suis ouvert aux opportunités Frontend ou Full-stack JavaScript, avec un fort focus React et Next.js.'
    },
    {
      q: 'Quels périmètres pouvez-vous gérer en autonomie ?',
      a: 'Développement de features frontend, intégration API, refactor de composants, et optimisation UX/performance.'
    },
    {
      q: 'Quelle est votre stack principale ?',
      a: 'JavaScript/TypeScript, React, Next.js et Tailwind, avec NestJS pour les besoins backend.'
    },
    {
      q: 'Quand êtes-vous disponible pour un process de recrutement ?',
      a: 'Disponible immédiatement pour échange RH, entretien technique et démarrage rapide.'
    }
  ]
}

type HomeCopy = {
  audienceLabel: string
  audienceRecruiterToggleLabel: string
  audienceClientToggleLabel: string
  availableLabel: string
  availableNowLabel: string
  services: ServiceItem[]
  aiToolsFavorites: AiToolItem[]
  aiQualityGuardrails: string[]
  humanLedAiExecution: string[]
  recruiterHighlights: RecruiterHighlightItem[]
  recruiterFacts: RecruiterFactItem[]
  faqItems: FaqItem[]
  introRoleLine: string
  introAudiencePitch: string
  heroTitle: React.ReactNode
  heroPitch: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  introCtaLabel: string
  workTitle: React.ReactNode
  workSubtitle: string
  aboutEyebrow: string
  aboutTitle: React.ReactNode
  aboutParagraphs: string[]
  formDescription: string
  messagePlaceholder: string
  submitLabel: string
  projectsIntro: string
}

export const getHomeCopy = (language: Language, audience: Audience): HomeCopy => {
  const audienceLabel = audience === 'client' ? 'client' : language === 'fr' ? 'recruteur' : 'recruiter'
  const faqItems = audience === 'client' ? FAQ_CLIENT_BY_LANGUAGE[language] : FAQ_RECRUITER_BY_LANGUAGE[language]

  return {
    audienceLabel,
    audienceRecruiterToggleLabel: language === 'fr' ? 'Je recrute' : 'I am hiring',
    audienceClientToggleLabel: language === 'fr' ? 'Je cherche un freelance' : 'I need a freelancer',
    availableLabel: language === 'fr' ? 'Disponible' : 'Available',
    availableNowLabel: language === 'fr' ? 'Disponible maintenant' : 'Available now',
    services: SERVICES_BY_LANGUAGE[language],
    aiToolsFavorites: AI_TOOLS_FAVORITES_BY_LANGUAGE[language],
    aiQualityGuardrails: AI_QUALITY_GUARDRAILS_BY_LANGUAGE[language],
    humanLedAiExecution: HUMAN_LED_AI_EXECUTION_BY_LANGUAGE[language],
    recruiterHighlights: RECRUITER_HIGHLIGHTS_BY_LANGUAGE[language],
    recruiterFacts: RECRUITER_FACTS_BY_LANGUAGE[language],
    faqItems,
    introRoleLine:
      audience === 'client'
        ? language === 'fr'
          ? '- Développeur web freelance'
          : '- Freelance Web Developer'
        : language === 'fr'
          ? '- Développeur full-stack créatif'
          : '- Creative Full-stack Developer',
    introAudiencePitch:
      audience === 'client'
        ? language === 'fr'
          ? "Portfolio conçu pour l'acquisition client et une exécution rapide."
          : 'Portfolio designed for client acquisition and fast execution.'
        : language === 'fr'
          ? 'Je développe des applications web responsives et performantes, avec un focus sur l’expérience utilisateur et la qualité du code. Je suis actuellement ouvert à de nouvelles opportunités professionnelles (CDD/CDI) pour concrétiser des idées créatives dans une équipe passionnée.'
          : 'I craft responsive, high-performance web applications with a focus on user experience and clean code. I am currently open to new professional opportunities to bring creative ideas to life within a passionate team.',
    heroTitle:
      audience === 'client'
        ? language === 'fr'
          ? <>React / Next.js<br />&amp; <span className="text-accent">JavaScript</span> full-stack.</>
          : <>React / Next.js<br />&amp; Full-stack <span className="text-accent">JavaScript</span>.</>
        : language === 'fr'
          ? <>Créer des applications scalables avec<br /><span className="text-accent">React &amp; Next.JS</span></>
          : <>Building scalable Project with<br /><span className="text-accent">React &amp; Next.JS</span></>,
    heroPitch:
      audience === 'client'
        ? language === 'fr'
          ? 'Je conçois des expériences web rapides et maintenables, alignées avec vos objectifs produit.'
          : 'I build fast, maintainable web experiences aligned with your product goals.'
        : language === 'fr'
          ? 'Spécialisé dans l’écosystème JavaScript moderne. Je crée des expériences web accessibles et pixel-perfect, et je suis prêt à rejoindre votre équipe dès aujourd’hui.'
          : 'Specialized in the modern JavaScript ecosystem. I build accessible, pixel-perfect web experiences and I am ready to join your team today.',
    primaryCtaLabel:
      audience === 'client'
        ? language === 'fr'
          ? 'Voir mes services'
          : 'View services'
        : language === 'fr'
          ? 'Voir le profil'
          : 'View profile',
    secondaryCtaLabel:
      audience === 'client'
        ? language === 'fr'
          ? 'Discuter de votre projet'
          : 'Discuss your project'
        : language === 'fr'
          ? 'Planifier un entretien'
          : 'Schedule an interview',
    introCtaLabel:
      audience === 'client'
        ? language === 'fr'
          ? 'Démarrer un projet'
          : 'Start a project'
        : language === 'fr'
          ? 'Me contacter'
          : 'Contact me',
    workTitle:
      audience === 'client'
        ? language === 'fr'
          ? <>Services <span className="text-accent italic">freelance</span></>
          : <>Freelance <span className="text-accent italic">services</span></>
        : language === 'fr'
          ? <>À propos de <span className="text-accent italic">moi</span></>
          : <>About <span className="text-accent italic">me</span></>,
    workSubtitle:
      audience === 'client'
        ? language === 'fr'
          ? 'Offres ciblées, conçues pour l’acquisition et la conversion'
          : 'Lean service offers focused on acquisition and conversion'
        : language === 'fr'
          ? 'Aperçu de mon profil développeur frontend/full-stack'
          : 'Snapshot of my frontend/full-stack developer profile',
    aboutEyebrow:
      audience === 'client'
        ? language === 'fr'
          ? 'Positionnement // Offre freelance'
          : 'Positioning // Freelance offer'
        : language === 'fr'
          ? 'Positionnement // Opportunités Frontend & Full-stack'
          : 'Positioning // Frontend & Full-stack opportunities',
    aboutTitle:
      audience === 'client'
        ? language === 'fr'
          ? <>React / Next pour <span className="text-accent italic">l’acquisition client</span>,<br />NestJS pour une exécution robuste.</>
          : <>React / Next for <span className="text-accent italic">client acquisition</span>,<br />NestJS for robust delivery.</>
        : language === 'fr'
          ? <>React / Next en <span className="text-accent italic">priorité</span>,<br />NestJS pour le full-stack.</>
          : <>React / Next <span className="text-accent italic">first</span>,<br />NestJS for full-stack.</>,
    aboutParagraphs:
      audience === 'client'
        ? language === 'fr'
          ? [
            'J’aide les équipes à transformer leurs besoins en expériences web rapides, claires et orientées résultats.',
            'Mon approche est simple : cadrage clair, exécution propre, suivi transparent et livrables maintenables.'
          ]
          : [
            'I help teams turn requirements into fast, clear and result-oriented web experiences.',
            'My approach is simple: clear scope, clean execution, transparent follow-up and maintainable deliverables.'
          ]
        : language === 'fr'
          ? [
            'Je suis développeur frontend/full-stack JavaScript, diplômé d’EPITECH (RNCP niveau 5), avec un focus React/Next pour livrer des interfaces fiables et scalables.',
            'Je développe au quotidien avec des assistants IA pour aller plus vite, tout en conservant la qualité du code et la maintenabilité.',
            'Mon objectif est de rejoindre une équipe produit, contribuer rapidement sur le périmètre frontend, puis élargir vers plus de responsabilités full-stack.'
          ]
          : [
            'I am a frontend/full-stack JavaScript developer, EPITECH graduate (RNCP level 5), focused on React/Next to deliver reliable and scalable interfaces.',
            'I build daily with AI copilots and modern assistant tools to ship faster while keeping code quality and maintainability high.',
            'My goal is to join a product team, contribute quickly on frontend scope, and grow into broader full-stack ownership.'
          ],
    formDescription:
      audience === 'client'
        ? language === 'fr'
          ? 'Partagez votre contexte, votre budget et votre délai. Je vous réponds rapidement.'
          : 'Share your context, budget and timeline. I will get back to you quickly.'
        : language === 'fr'
          ? 'Partagez le contexte du poste et les attentes de votre équipe. Je vous réponds rapidement.'
          : 'Share role context and team expectations. I will get back to you quickly.',
    messagePlaceholder:
      audience === 'client'
        ? language === 'fr'
          ? 'Contexte, objectifs, stack et attentes...'
          : 'Context, goals, stack and expectations...'
        : language === 'fr'
          ? 'Contexte du poste, stack, organisation équipe et prochaines étapes...'
          : 'Role context, stack, team setup and next steps...',
    submitLabel:
      audience === 'client'
        ? language === 'fr'
          ? 'Envoyer la demande'
          : 'Send request'
        : language === 'fr'
          ? 'Demander un entretien'
          : 'Request an interview',
    projectsIntro:
      audience === 'client'
        ? language === 'fr'
          ? 'Aperçu du format final des case studies pour vous projeter dans une future collaboration.'
          : 'Preview of the final case study format to help you visualize collaboration.'
        : language === 'fr'
          ? 'Aperçu du format final des projets, utilisé pendant les échanges de recrutement.'
          : 'Preview of the final project format shared during hiring conversations.'
  }
}
