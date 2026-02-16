import React from 'react'
import type { Audience, FaqItem } from '@/components/Home/types'

interface FaqSectionProps {
  audience: Audience
  language: 'en' | 'fr'
  faqItems: FaqItem[]
}

export const FaqSection: React.FC<FaqSectionProps> = ({ audience, language, faqItems }) => {
  return (
    <section id="faq" className="w-full py-20 md:py-28 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
            FAQ <span className="text-accent italic">
              {audience === 'client'
                ? 'freelance'
                : language === 'fr'
                  ? 'recrutement'
                  : 'hiring'}
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base">
            {audience === 'client'
              ? language === 'fr'
                ? 'Réponses claires pour cadrer le besoin et démarrer rapidement.'
                : 'Clear answers to scope and start collaboration quickly.'
              : language === 'fr'
                ? 'Les points clés qu’un recruteur attend sur mon profil et ma disponibilité.'
                : 'The key points recruiters typically need about my profile and availability.'}
          </p>
        </div>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 group">
              <summary className="cursor-pointer list-none text-white font-medium pr-8">
                {item.q}
              </summary>
              <p className="text-white/70 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
