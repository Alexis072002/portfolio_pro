export interface PortfolioProject {
    slug: string
    title: string
    category: string
    imageUrl: string
    year: string
    tags: string[]
    summary: string
    problem: string
    solution: string
    result: string
    metrics: string[]
    tech: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
    {
        slug: 'astraeus-core',
        title: 'Astraeus Core',
        category: 'AI Infrastructure / UI',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_079.jpg',
        year: '2026',
        tags: ['Next.js', 'UX', 'Performance'],
        summary: 'Dashboard Next.js pour visualiser et piloter des traitements IA en temps reel.',
        problem: 'Le suivi des jobs et des etats etait disperse, donc difficile a monitorer rapidement.',
        solution: 'Implementation d une interface unifiee avec etats live, actions rapides et architecture composants.',
        result: 'Projet plus lisible, maintenance plus simple et meilleur confort pour les utilisateurs.',
        metrics: ['Lighthouse Performance 96', 'First Load JS optimise', 'Composants reutilisables'],
        tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS']
    },
    {
        slug: 'lumina-os',
        title: 'Lumina OS',
        category: 'Spatial Computing / OS',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_060.jpg',
        year: '2025',
        tags: ['UX', 'Design System', 'React'],
        summary: 'Interface React orientee UX avec systeme de composants pour un univers logiciel immersif.',
        problem: 'Le prototype initial etait visuellement riche mais manquait de coherence globale.',
        solution: 'Creation d un design system et reorganisation des parcours pour une navigation plus claire.',
        result: 'Experience plus consistente et base front-end plus robuste pour evoluer.',
        metrics: ['Design system 42 composants', 'Architecture UI modularisee', 'Parcours simplifies'],
        tech: ['React', 'TypeScript', 'Motion', 'Design Tokens']
    },
    {
        slug: 'chronos-vr',
        title: 'Chronos VR',
        category: 'Interactive Design / VR',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_040.jpg',
        year: '2024',
        tags: ['WebGL', 'Interaction', 'Accessibility'],
        summary: 'Experience interactive WebGL/VR centree sur la fluidite et la lisibilite des interactions.',
        problem: 'Les transitions et la navigation provoquaient des ruptures dans l immersion.',
        solution: 'Ajustement des animations, du rythme de navigation et des reperes visuels.',
        result: 'Parcours plus fluide et progression plus naturelle dans l experience.',
        metrics: ['Transitions stabilisees', 'Interaction plus intuitive', 'Motion design mieux cadence'],
        tech: ['WebGL', 'Three.js', 'GSAP', 'Interaction Design']
    },
    {
        slug: 'nebula-engine',
        title: 'Nebula Engine',
        category: 'Graphics / WebGL',
        imageUrl: '/assets/hero/frames/Pushing_in_on_1080p_202602061407_020.jpg',
        year: '2023',
        tags: ['Performance', 'WebGL', 'Tooling'],
        summary: 'Moteur graphique web optimise pour scenes temps reel sur desktop et mobile.',
        problem: 'Chargement initial lourd et framerate irregulier sur certains appareils.',
        solution: 'Optimisation des assets, streaming progressif et reduction du poids des ressources.',
        result: 'Rendu plus stable et experience plus fluide sur plusieurs resolutions.',
        metrics: ['60 FPS sur devices cibles', '-29% taille des assets', 'Chargement mobile ameliore'],
        tech: ['WebGL', 'Shaders', 'Asset Pipeline', 'Performance Profiling']
    }
]

export const PROJECT_TAGS = [
    'All',
    ...Array.from(new Set(PORTFOLIO_PROJECTS.flatMap((project) => project.tags)))
]
