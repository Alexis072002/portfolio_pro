"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PortfolioProject } from '@/data/projects'
import { useLanguage } from '@/components/Language/LanguageProvider'
import { ProjectScreenshotsCarousel } from '@/components/Work/ProjectScreenshotsCarousel'
import { MermaidDiagram } from '@/components/Work/MermaidDiagram'

type ProjectDetailContentProps = {
  project: PortfolioProject
  backHref: string
}

const copyByLanguage = {
  en: {
    backToPortfolio: 'Back to portfolio',
    projectPulse: 'Project pulse',
    architecture: 'Architecture',
    core: 'Core',
    architectureDiagram: 'Architecture diagram',
    monorepo: 'Monorepo',
    runtimeFlow: 'Runtime flow',
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
    engineeringSnapshot: 'Engineering snapshot',
    v1ScopeDelivered: 'V1 scope delivered',
    keyHighlights: 'Key highlights',
    securityAndQuality: 'Security & quality',
    currentLimits: 'Current limits'
  },
  fr: {
    backToPortfolio: 'Retour au portfolio',
    projectPulse: 'Pulse du projet',
    architecture: 'Architecture',
    core: 'Noyau',
    architectureDiagram: "Schéma d'architecture",
    monorepo: 'Monorepo',
    runtimeFlow: 'Flux runtime',
    problem: 'Problème',
    solution: 'Solution',
    result: 'Résultat',
    engineeringSnapshot: 'Snapshot engineering',
    v1ScopeDelivered: 'Périmètre V1 livré',
    keyHighlights: 'Points clés',
    securityAndQuality: 'Sécurité & qualité',
    currentLimits: 'Limites actuelles'
  }
} as const

const pulseFrenchContent = {
  category: 'Plateforme SaaS Analytics',
  summary:
    "SaaS analytics multi-tenant avec OAuth Google, insights YouTube + GA4, reporting automatisé et backend prêt pour la production.",
  problem:
    "Les signaux produit et croissance étaient dispersés entre plusieurs outils, et les workflows d'accès/reporting n'étaient pas centralisés pour une équipe.",
  solution:
    'Conception d’un monorepo full-stack (Next.js + NestJS) avec RBAC workspace, vues analytics unifiées, insights de corrélation, scheduling des rapports et API robuste.',
  result:
    "Pulse centralise analytics, reporting et collaboration workspace dans un cockpit opérationnel unique, avec une base solide pour l'industrialisation.",
  metrics: [
    'Flux auth Google OAuth + cookie JWT',
    'RBAC multi-tenant workspace (OWNER / EDITOR / VIEWER)',
    'Endpoints réels YouTube + GA4',
    'Rapports hebdo/mensuels avec retries',
    'Endpoints ops + structure audit-ready'
  ],
  architecture: {
    summary:
      "Modules backend orientés domaine, contrats partagés, et séparation runtime claire entre frontend, API, couche data et services externes.",
    monorepo: [
      'apps/frontend : landing marketing + dashboard SaaS',
      'apps/backend : API NestJS modulaire',
      'packages/shared : types métier partagés et surface contrat tRPC'
    ],
    runtime: [
      'Navigateur -> frontend Next.js',
      'Frontend -> API NestJS via cookie JWT httpOnly',
      'Backend -> PostgreSQL via Prisma',
      'Backend -> APIs Google (OAuth, YouTube, GA4)',
      'Backend -> services queue/cache + pipeline génération PDF'
    ],
    diagramPlaceholder:
      "Placeholder du schéma d'architecture. Ajoutez votre image de schéma ici."
  },
  features: [
    'Login Google OAuth et callback avec option remember-me',
    'Cycle workspace: création, renommage, changement workspace actif',
    'Invitations membres et gestion des rôles',
    'Modules analytics: overview, YouTube, GA4, corrélations',
    "Génération d'insights automatiques lag/corrélation",
    'Génération, scheduling, retries et historique de rapports',
    'PDF via Puppeteer avec fallback'
  ],
  securityAndQuality: [
    'Helmet + CSP de base et rate limiting route par route',
    'Cookies httpOnly avec configuration secure en production',
    'Chiffrement des tokens Google (AES-256-GCM) avec rotation',
    'Validation DTO et enveloppes API success/error standardisées',
    'Tests unitaires services clés + quality gates CI (lint, typecheck, tests, build, Lighthouse)'
  ],
  limitations: [
    'Cache et queue actuellement en mémoire (infra distribuée prévue)',
    'Envoi email encore stubbé',
    'Couverture frontend/e2e à renforcer'
  ]
}

const getLocalizedProject = (project: PortfolioProject, language: 'en' | 'fr'): PortfolioProject => {
  if (!(language === 'fr' && project.slug === 'pulse-saas')) {
    return project
  }

  return {
    ...project,
    category: pulseFrenchContent.category,
    summary: pulseFrenchContent.summary,
    problem: pulseFrenchContent.problem,
    solution: pulseFrenchContent.solution,
    result: pulseFrenchContent.result,
    metrics: pulseFrenchContent.metrics,
    architecture: project.architecture
      ? {
          ...project.architecture,
          summary: pulseFrenchContent.architecture.summary,
          monorepo: pulseFrenchContent.architecture.monorepo,
          runtime: pulseFrenchContent.architecture.runtime,
          diagramPlaceholder: pulseFrenchContent.architecture.diagramPlaceholder
        }
      : project.architecture,
    features: pulseFrenchContent.features,
    securityAndQuality: pulseFrenchContent.securityAndQuality,
    limitations: pulseFrenchContent.limitations
  }
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project, backHref }) => {
  const { language } = useLanguage()
  const copy = copyByLanguage[language]
  const localizedProject = getLocalizedProject(project, language)
  const keyMetrics = localizedProject.metrics.slice(0, 4)
  const hasArchitecture = Boolean(localizedProject.architecture)
  const projectNarrative = [
    { label: copy.problem, value: localizedProject.problem },
    { label: copy.solution, value: localizedProject.solution },
    { label: copy.result, value: localizedProject.result }
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
          {copy.backToPortfolio}
        </Link>

        <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(165deg,rgba(14,165,233,0.16)_0%,rgba(10,15,24,0.65)_38%,rgba(8,12,18,0.95)_100%)] p-5 sm:p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(14,165,233,0.24),transparent_44%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <header>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                  {localizedProject.category}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {localizedProject.year}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white leading-[1.05] tracking-tight">
                {localizedProject.title}
              </h1>
              <p className="mt-4 text-white/78 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                {localizedProject.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {localizedProject.tags.map((tag) => (
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
              <p className="text-white/45 text-[10px] uppercase tracking-[0.2em]">{copy.projectPulse}</p>
              <div className="mt-3 rounded-xl border border-white/10 bg-black/40 px-4 py-5">
                <div className="relative h-14 w-full">
                  <Image
                    src={localizedProject.imageUrl}
                    alt={`${localizedProject.title} identity`}
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
          title={localizedProject.title}
          imageUrls={localizedProject.screenshotUrls ?? []}
          language={language}
        />

        {hasArchitecture && localizedProject.architecture && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-white text-xl md:text-2xl font-serif">{copy.architecture}</h2>
              <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent">
                {copy.core}
              </span>
            </div>
            <p className="text-white/75 leading-relaxed text-sm sm:text-base max-w-4xl">
              {localizedProject.architecture.summary}
            </p>

            <div className="mt-5 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-5">
              <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">{copy.architectureDiagram}</h3>
                <div className="relative aspect-[16/9] rounded-lg border border-dashed border-white/20 bg-background/65 overflow-hidden">
                  {localizedProject.architecture.mermaidDefinition ? (
                    <MermaidDiagram
                      definition={localizedProject.architecture.mermaidDefinition}
                      className="absolute inset-0 flex items-center justify-center p-2"
                    />
                  ) : localizedProject.architecture.diagramImageUrl ? (
                    <Image
                      src={localizedProject.architecture.diagramImageUrl}
                      alt={localizedProject.architecture.diagramAlt ?? `${localizedProject.title} architecture diagram`}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                      <p className="text-white/55 text-sm leading-relaxed">
                        {localizedProject.architecture.diagramPlaceholder}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">{copy.monorepo}</h3>
                    <ul className="space-y-2">
                      {localizedProject.architecture.monorepo.map((item) => (
                        <li key={item} className="text-white/72 text-sm leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <h3 className="text-white text-[11px] uppercase tracking-[0.18em] mb-3">{copy.runtimeFlow}</h3>
                    <ul className="space-y-2">
                      {localizedProject.architecture.runtime.map((item) => (
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
          <h2 className="text-white text-xl md:text-2xl font-serif">{copy.engineeringSnapshot}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {localizedProject.tech.map((item) => (
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
              {localizedProject.features && (
                <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                  <h3 className="text-white text-lg font-serif mb-3">{copy.v1ScopeDelivered}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {localizedProject.features.map((item) => (
                      <li key={item} className="text-white/75 text-sm leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
                <h3 className="text-white text-lg font-serif mb-3">{copy.keyHighlights}</h3>
                <ul className="space-y-2">
                  {localizedProject.metrics.map((metric) => (
                    <li key={metric} className="text-white/75 text-sm leading-relaxed">{metric}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/35 p-4 md:p-5">
              <div className="space-y-5">
                {localizedProject.securityAndQuality && (
                  <div>
                    <h3 className="text-white text-lg font-serif mb-3">{copy.securityAndQuality}</h3>
                    <ul className="space-y-2">
                      {localizedProject.securityAndQuality.map((item) => (
                        <li key={item} className="text-white/75 text-sm leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {localizedProject.securityAndQuality && localizedProject.limitations && (
                  <div className="h-px bg-white/10" />
                )}

                {localizedProject.limitations && (
                  <div>
                    <h3 className="text-white text-lg font-serif mb-3">{copy.currentLimits}</h3>
                    <ul className="space-y-2">
                      {localizedProject.limitations.map((item) => (
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

