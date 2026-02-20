import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PORTFOLIO_PROJECTS } from '@/data/projects'
import { ProjectScreenshotsCarousel } from '@/components/Work/ProjectScreenshotsCarousel'

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
    searchParams?: Promise<{
        audience?: string
    }>
}

const getProjectBySlug = (slug: string) =>
    PORTFOLIO_PROJECTS.find((project) => project.slug === slug)

const isAudienceParam = (value: string | undefined): value is 'recruiter' | 'client' =>
    value === 'recruiter' || value === 'client'

export const generateStaticParams = () =>
    PORTFOLIO_PROJECTS.map((project) => ({ slug: project.slug }))

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) {
        return {
            title: 'Project not found',
            description: 'This project does not exist or is no longer available.'
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

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
    const { slug } = await params
    const resolvedSearchParams = searchParams ? await searchParams : undefined
    const project = getProjectBySlug(slug)
    const audience = isAudienceParam(resolvedSearchParams?.audience)
        ? resolvedSearchParams?.audience
        : undefined
    const backHref = audience ? `/?audience=${audience}#work` : '/#work'

    if (!project) {
        notFound()
    }

    return (
        <main className="w-full min-h-screen bg-background px-4 sm:px-6 py-16 md:py-24">
            <article className="max-w-4xl mx-auto">
                <Link
                    href={backHref}
                    className="inline-flex items-center text-sm uppercase tracking-[0.18em] text-white/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-1"
                >
                    Back to portfolio
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

                <ProjectScreenshotsCarousel
                    title={project.title}
                    imageUrls={project.screenshotUrls ?? []}
                />

                {project.architecture && (
                    <section className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                            <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Architecture</h2>
                            <p className="text-white/75 leading-relaxed mb-6">
                                {project.architecture.summary}
                            </p>

                            <div className="space-y-5">
                                <div>
                                    <h3 className="text-white text-sm uppercase tracking-[0.18em] mb-2">Monorepo structure</h3>
                                    <ul className="space-y-2">
                                        {project.architecture.monorepo.map((item) => (
                                            <li key={item} className="text-white/75 leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white text-sm uppercase tracking-[0.18em] mb-2">Runtime flow</h3>
                                    <ul className="space-y-2">
                                        {project.architecture.runtime.map((item) => (
                                            <li key={item} className="text-white/75 leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                            <h3 className="text-white text-sm uppercase tracking-[0.18em] mb-4">Architecture diagram</h3>
                            <div className="relative aspect-[16/11] rounded-xl border border-dashed border-white/20 bg-background/60 overflow-hidden">
                                {project.architecture.diagramImageUrl ? (
                                    <Image
                                        src={project.architecture.diagramImageUrl}
                                        alt={project.architecture.diagramAlt ?? `${project.title} architecture diagram`}
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                                        <p className="text-white/55 text-sm leading-relaxed">
                                            {project.architecture.diagramPlaceholder}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <section className="mt-10 md:mt-14 space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Problem</h2>
                        <p className="text-white/75 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Solution</h2>
                        <p className="text-white/75 leading-relaxed">{project.solution}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h2 className="text-white text-xl md:text-2xl font-serif mb-3">Result</h2>
                        <p className="text-white/75 leading-relaxed">{project.result}</p>
                    </div>
                </section>

                <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h3 className="text-white text-lg font-serif mb-4">Key highlights</h3>
                        <ul className="space-y-2">
                            {project.metrics.map((metric) => (
                                <li key={metric} className="text-white/75">{metric}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <h3 className="text-white text-lg font-serif mb-4">Tech stack</h3>
                        <ul className="space-y-2">
                            {project.tech.map((item) => (
                                <li key={item} className="text-white/75">{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {(project.features || project.securityAndQuality || project.limitations) && (
                    <section className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {project.features && (
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                                <h3 className="text-white text-lg font-serif mb-4">V1 scope delivered</h3>
                                <ul className="space-y-2">
                                    {project.features.map((item) => (
                                        <li key={item} className="text-white/75 leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.securityAndQuality && (
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                                <h3 className="text-white text-lg font-serif mb-4">Security & quality</h3>
                                <ul className="space-y-2">
                                    {project.securityAndQuality.map((item) => (
                                        <li key={item} className="text-white/75 leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.limitations && (
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                                <h3 className="text-white text-lg font-serif mb-4">Current limits</h3>
                                <ul className="space-y-2">
                                    {project.limitations.map((item) => (
                                        <li key={item} className="text-white/75 leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}
            </article>
        </main>
    )
}
