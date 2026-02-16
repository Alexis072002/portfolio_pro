import React from 'react'
import type { AiToolItem } from '@/components/Home/types'

interface ProofsSectionProps {
  language: 'en' | 'fr'
  aiToolsFavorites: AiToolItem[]
  aiQualityGuardrails: string[]
  humanLedAiExecution: string[]
}

export const ProofsSection: React.FC<ProofsSectionProps> = ({
  language,
  aiToolsFavorites,
  aiQualityGuardrails,
  humanLedAiExecution
}) => {
  return (
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
              ? 'Ma manière de combiner outils IA, IDE et stack d’implémentation sur des projets réels.'
              : 'The way I combine AI tools, IDEs, and implementation stack in real projects.'}
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
                ? 'L’IA m’aide à passer plus vite de l’idée à la production tout en gardant structure et lisibilité.'
                : 'AI helps me move faster from idea to production while keeping structure and readability.'}
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
  )
}
