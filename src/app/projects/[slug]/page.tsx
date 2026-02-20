import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PORTFOLIO_PROJECTS } from '@/data/projects'
import { ProjectScreenshotsCarousel } from '@/components/Work/ProjectScreenshotsCarousel'
import { MermaidDiagram } from '@/components/Work/MermaidDiagram'

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
    const backHref = audience ? `/?audience=${audience}#projects` : '/#projects'

    if (!project) {
        notFound()
    }

    const keyMetrics = project.metrics.slice(0, 4)
    const hasArchitecture = Boolean(project.architecture)
    const projectNarrative = [
        { label: 'Problem', value: project.problem },
        { label: 'Solution', value: project.solution },
        { label: 'Result', value: project.result }
    ]

    return (
        <main className="relative w-full min-h-screen bg-background px-4 sm:px-6 py-10 md:py-14 overflow-hidden">
            <div className="pointer-events-none absolute -top-40 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
            <div className="pointer-events-none absolute top-[32rem] left-[-10rem] h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[120px]" />

            <article className="relative max-w-6xl mx-auto space-y-6 md:space-y-8">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                    <span aria-hidden>←</span>
                    Back to portfolio
                </Link>

                <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(165deg,rgba(14,165,233,0.16)_0%,rgba(10,15,24,0.65)_38%,rgba(8,12,18,0.95)_100%)] p-5 sm:p-6 md:p-8">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(14,165,233,0.24),transparent_44%)]" />
                    <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <header>
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                                    {project.category}
                                </span>
                                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                                    {project.year}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white leading-[1.05] tracking-tight">
                                {project.title}
                            </h1>
                            <p className="mt-4 text-white/78 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                                {project.summary}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase text-white/70"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </header>

                        <aside className="rounded-2xl border border-white/15 bg-black/35 p-4 md:p-5 backdrop-blur-md">
                            <p className="text-white/45 text-[10px] uppercase tracking-[0.2em]">Project pulse</p>
                            <div className="mt-3 rounded-xl border border-white/10 bg-black/40 px-4 py-5">
                                <div className="relative h-14 w-full">
                                    <Image
                                        src={project.imageUrl}
                                        alt={`${project.title} identity`}
                                        fill
                                        className="object-contain object-left"
                                        sizes="(max-width: 1024px) 220px, 280px"
                                    />
                                </div>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {keyMetrics.map((metric) => (
                                    <li
                                        key={metric}
                                        className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs leading-relaxed text-white/72"
                                    >
                                        {metric}
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </section>

                <ProjectScreenshotsCarousel
                    title={project.title}
                    imageUrls={project.screenshotUrls ?? []}
                />

                {hasArchitecture && project.architecture && (
                    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-white text-xl md:text-2xl font-serif">Architecture</h2>
                            <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent">
                                Core
                            </span>
                        </div>
                        <p className="text-white/75 leading-relaxed text-sm sm:text-base max-w-4xl">
                            {project.architecture.summary}
                        </p>

                        <div className="mt-5 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-5">
                            <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                                <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">Architecture diagram</h3>
                                <div className="relative aspect-[16/9] rounded-lg border border-dashed border-white/20 bg-background/65 overflow-hidden">
                                    {project.architecture.mermaidDefinition ? (
                                        <MermaidDiagram
                                            definition={project.architecture.mermaidDefinition}
                                            className="absolute inset-0 flex items-center justify-center p-2"
                                        />
                                    ) : project.architecture.diagramImageUrl ? (
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

                            <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">Monorepo</h3>
                                        <ul className="space-y-2">
                                            {project.architecture.monorepo.map((item) => (
                                                <li key={item} className="text-white/72 text-sm leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div>
                                        <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">Runtime flow</h3>
                                        <ul className="space-y-2">
                                            {project.architecture.runtime.map((item) => (
                                                <li key={item} className="text-white/72 text-sm leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {projectNarrative.map((item, index) => (
                            <div
                                key={item.label}
                                className={[
                                    'p-5 md:p-6',
                                    index < projectNarrative.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''
                                ].join(' ')}
                            >
                                <p className="text-white/45 text-[10px] uppercase tracking-[0.2em] mb-2">{item.label}</p>
                                <p className="text-white/75 leading-relaxed text-sm">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
                    <h2 className="text-white text-xl md:text-2xl font-serif">Engineering snapshot</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                            <span
                                key={item}
                                className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase text-white/72"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5">
                        <div className="space-y-5">
                            {project.features && (
                                <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                                    <h3 className="text-white text-lg font-serif mb-3">V1 scope delivered</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {project.features.map((item) => (
                                            <li key={item} className="text-white/75 text-sm leading-relaxed">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                                <h3 className="text-white text-lg font-serif mb-3">Key highlights</h3>
                                <ul className="space-y-2">
                                    {project.metrics.map((metric) => (
                                        <li key={metric} className="text-white/75 text-sm leading-relaxed">{metric}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                            <div className="space-y-5">
                                {project.securityAndQuality && (
                                    <div>
                                        <h3 className="text-white text-lg font-serif mb-3">Security & quality</h3>
                                        <ul className="space-y-2">
                                            {project.securityAndQuality.map((item) => (
                                                <li key={item} className="text-white/75 text-sm leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.securityAndQuality && project.limitations && (
                                    <div className="h-px bg-white/10" />
                                )}

                                {project.limitations && (
                                    <div>
                                        <h3 className="text-white text-lg font-serif mb-3">Current limits</h3>
                                        <ul className="space-y-2">
                                            {project.limitations.map((item) => (
                                                <li key={item} className="text-white/75 text-sm leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    )
}
