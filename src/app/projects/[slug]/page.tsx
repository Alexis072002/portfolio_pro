import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PORTFOLIO_PROJECTS } from '@/data/projects'

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

const getProjectBySlug = (slug: string) =>
    PORTFOLIO_PROJECTS.find((project) => project.slug === slug)

export const generateStaticParams = () =>
    PORTFOLIO_PROJECTS.map((project) => ({ slug: project.slug }))

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) {
        return {
            title: 'Projet introuvable',
            description: 'Ce projet n existe pas ou n est plus disponible.'
        }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const ogImage = `${siteUrl}${project.imageUrl}`

    return {
        title: `${project.title} | Alexis Dezeque`,
        description: project.summary,
        openGraph: {
            title: `${project.title} | Alexis Dezeque`,
            description: project.summary,
            images: [{ url: ogImage, alt: project.title }],
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Alexis Dezeque`,
            description: project.summary,
            images: [ogImage]
        }
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="w-full min-h-screen bg-black px-4 sm:px-6 py-16 md:py-24">
            <article className="max-w-4xl mx-auto">
                <Link
                    href="/#work"
                    className="inline-flex items-center text-sm uppercase tracking-[0.18em] text-white/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-1"
                >
                    Retour au portfolio
                </Link>

                <header className="mt-8 md:mt-10">
                    <p className="text-accent text-xs tracking-[0.2em] uppercase mb-3">
                        {project.category} | {project.year}
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight">
                        {project.title}
                    </h1>
                    <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl">
                        {project.summary}
                    </p>
                </header>

                <section className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-xs tracking-[0.12em] uppercase text-white/75"
                        >
                            {tag}
                        </span>
                    ))}
                </section>

                <section className="mt-10 md:mt-14 space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Probleme</h2>
                        <p className="text-white/75 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Solution</h2>
                        <p className="text-white/75 leading-relaxed">{project.solution}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Resultat</h2>
                        <p className="text-white/75 leading-relaxed">{project.result}</p>
                    </div>
                </section>

                <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h3 className="text-white text-lg font-serif mb-4">Points cles</h3>
                        <ul className="space-y-2">
                            {project.metrics.map((metric) => (
                                <li key={metric} className="text-white/75">{metric}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h3 className="text-white text-lg font-serif mb-4">Stack utilisee</h3>
                        <ul className="space-y-2">
                            {project.tech.map((item) => (
                                <li key={item} className="text-white/75">{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </article>
        </main>
    )
}
