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
