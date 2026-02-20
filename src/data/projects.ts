export interface PortfolioProject {
    slug: string
    title: string
    category: string
    imageUrl: string
    imageFit?: 'cover' | 'contain'
    logoUrl?: string
    screenshotUrls?: string[]
    year: string
    tags: string[]
    summary: string
    problem: string
    solution: string
    result: string
    metrics: string[]
    tech: string[]
    architecture?: {
        summary: string
        monorepo: string[]
        runtime: string[]
        mermaidDefinition?: string
        diagramImageUrl?: string
        diagramAlt?: string
        diagramPlaceholder: string
    }
    features?: string[]
    securityAndQuality?: string[]
    limitations?: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
    {
        slug: 'pulse-saas',
        title: 'Pulse SaaS',
        category: 'SaaS Analytics Platform',
        imageUrl: '/projects/Pulse_SaaS/logo/pulse-logo-dark.svg',
        imageFit: 'contain',
        screenshotUrls: [
            '/projects/Pulse_SaaS/overview_SaaS.png',
            '/projects/Pulse_SaaS/workspace_SaaS.png',
            '/projects/Pulse_SaaS/kpi_exemples_SaaS.png',
            '/projects/Pulse_SaaS/correlations_SaaS.png',
            '/projects/Pulse_SaaS/correlations_graphics_SaaS.png',
            '/projects/Pulse_SaaS/reports_SaaS.png',
            '/projects/Pulse_SaaS/youtube_view_SaaS.png',
            '/projects/Pulse_SaaS/youtube_view_graphics_SaaS.png',
            '/projects/Pulse_SaaS/health_page.png',
            '/projects/Pulse_SaaS/health_page_2.png',
            '/projects/Pulse_SaaS/health_page_3.png',
            '/projects/Pulse_SaaS/graphic_exemple_SaaS.png'
        ],
        year: '2026',
        tags: ['Next.js', 'NestJS', 'SaaS', 'Analytics', 'RBAC'],
        summary: 'Multi-tenant analytics SaaS with Google OAuth, YouTube + GA4 insights, automated reporting, and an operations-ready backend.',
        problem: 'Product and growth signals were fragmented across tools, while access control and reporting workflows were not centralized for teams.',
        solution: 'Built a full-stack monorepo (Next.js + NestJS) with workspace RBAC, unified analytics views, correlation insights, report scheduling, and a guarded API architecture.',
        result: 'Pulse provides one operational cockpit for analytics, reporting, and workspace collaboration, with a solid foundation for production hardening.',
        metrics: [
            'Google OAuth + JWT cookie auth flow',
            'Multi-tenant workspace RBAC (OWNER / EDITOR / VIEWER)',
            'Real YouTube + GA4 data endpoints',
            'Weekly/monthly report scheduling with retry flows',
            'Ops endpoints and audit-ready structure'
        ],
        tech: [
            'Next.js (App Router)',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'NestJS',
            'Prisma',
            'PostgreSQL',
            'JWT + Google OAuth2',
            'Turborepo + pnpm workspaces'
        ],
        architecture: {
            summary: 'Domain-based backend modules, shared contracts, and a clear runtime separation between frontend, API, data layer, and external providers.',
            monorepo: [
                'apps/frontend: marketing + SaaS dashboard',
                'apps/backend: modular NestJS API',
                'packages/shared: shared business types and tRPC contract surface'
            ],
            runtime: [
                'Browser -> Next.js frontend',
                'Frontend -> NestJS API via JWT httpOnly cookie',
                'Backend -> PostgreSQL through Prisma',
                'Backend -> Google APIs (OAuth, YouTube, GA4)',
                'Backend -> queue/cache services and PDF generation pipeline'
            ],
            mermaidDefinition: `flowchart LR
  U["User Browser"] --> F["Next.js Frontend (App Router)"]
  F -->|"JWT cookie (httpOnly)"| B["NestJS Backend API"]
  B --> P["PostgreSQL (Prisma)"]
  B --> G["Google APIs (OAuth, YouTube Analytics, GA4 Data API)"]
  B --> Q["In-memory Queue Service"]
  B --> C["In-memory Cache Service"]
  B --> R["/tmp PDF storage"]`,
            diagramPlaceholder: 'Architecture diagram placeholder. Add your schema image here.'
        },
        features: [
            'Google OAuth login and callback with remember-me behavior',
            'Workspace lifecycle: create, rename, switch active workspace',
            'Role-based invitations and member management',
            'Analytics modules: overview, YouTube, GA4, correlations',
            'Automatic lag/correlation insight generation',
            'Report generation, scheduling, retries, and history',
            'Puppeteer PDF generation with fallback strategy'
        ],
        securityAndQuality: [
            'Helmet + CSP baseline and route-level rate limiting',
            'httpOnly cookies with secure production setup',
            'Encrypted Google tokens (AES-256-GCM) with rotation support',
            'DTO validation and standardized API success/error envelopes',
            'Unit tests on core services and CI quality gates (lint, typecheck, tests, build, Lighthouse)'
        ],
        limitations: [
            'Cache and queue currently in-memory (distributed infra planned)',
            'Email delivery still stubbed',
            'Frontend/e2e test coverage remains a next step'
        ]
    },
    {
        slug: 'astraeus-core',
        title: 'Astraeus Core',
        category: 'AI Infrastructure / UI',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_079.jpg',
        year: '2026',
        tags: ['Next.js', 'UX', 'Performance'],
        summary: 'Next.js dashboard to monitor and operate real-time AI processing workflows.',
        problem: 'Job tracking and status visibility were fragmented, making monitoring slow and unclear.',
        solution: 'Built a unified interface with live states, quick actions, and a scalable component architecture.',
        result: 'Clearer product experience, easier maintenance, and improved daily usability.',
        metrics: ['Lighthouse Performance 96', 'Optimized first-load JS', 'Reusable component architecture'],
        tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS']
    },
    {
        slug: 'lumina-os',
        title: 'Lumina OS',
        category: 'Spatial Computing / OS',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_060.jpg',
        year: '2025',
        tags: ['UX', 'Design System', 'React'],
        summary: 'UX-first React interface with a component system for an immersive software environment.',
        problem: 'The initial prototype looked rich visually but lacked global consistency.',
        solution: 'Built a design system and restructured user flows for clearer navigation.',
        result: 'More consistent experience and a stronger frontend foundation for future growth.',
        metrics: ['42-component design system', 'Modular UI architecture', 'Simplified user flows'],
        tech: ['React', 'TypeScript', 'Motion', 'Design Tokens']
    },
    {
        slug: 'chronos-vr',
        title: 'Chronos VR',
        category: 'Interactive Design / VR',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_040.jpg',
        year: '2024',
        tags: ['WebGL', 'Interaction', 'Accessibility'],
        summary: 'Interactive WebGL/VR experience focused on fluid interactions and visual clarity.',
        problem: 'Transitions and navigation created breaks in immersion.',
        solution: 'Refined animation timing, interaction pacing, and visual guidance cues.',
        result: 'Smoother flow and more natural progression throughout the experience.',
        metrics: ['Stabilized transitions', 'More intuitive interaction model', 'Better-paced motion design'],
        tech: ['WebGL', 'Three.js', 'GSAP', 'Interaction Design']
    },
    {
        slug: 'nebula-engine',
        title: 'Nebula Engine',
        category: 'Graphics / WebGL',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_020.jpg',
        year: '2023',
        tags: ['Performance', 'WebGL', 'Tooling'],
        summary: 'Optimized web graphics engine for real-time scenes across desktop and mobile.',
        problem: 'Heavy initial load and unstable framerate on part of the target devices.',
        solution: 'Optimized assets, introduced progressive streaming, and reduced resource weight.',
        result: 'More stable rendering and smoother experience across multiple screen sizes.',
        metrics: ['60 FPS on target devices', '29% smaller asset payload', 'Improved mobile loading'],
        tech: ['WebGL', 'Shaders', 'Asset Pipeline', 'Performance Profiling']
    }
]

export const PROJECT_TAGS = [
    'All',
    ...Array.from(new Set(PORTFOLIO_PROJECTS.flatMap((project) => project.tags)))
]
