import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PORTFOLIO_PROJECTS } from '@/data/projects'
import { ProjectDetailContent } from '@/components/Work/ProjectDetailContent'

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

    return <ProjectDetailContent project={project} backHref={backHref} />
}
