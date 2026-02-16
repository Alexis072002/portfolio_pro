import React from 'react'
import { motion } from 'framer-motion'
import type { Audience, ContactFormState } from '@/components/Home/types'

interface ContactSectionProps {
  audience: Audience
  language: 'en' | 'fr'
  availableNowLabel: string
  contactEmail: string
  formDescription: string
  messagePlaceholder: string
  submitLabel: string
  contactForm: ContactFormState
  onFieldChange: (field: keyof ContactFormState, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  formFeedback: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  audience,
  language,
  availableNowLabel,
  contactEmail,
  formDescription,
  messagePlaceholder,
  submitLabel,
  contactForm,
  onFieldChange,
  onSubmit,
  formFeedback
}) => {
  return (
    <section id="contact" className="w-full min-h-screen py-20 md:py-28 px-4 sm:px-6 flex items-center justify-center bg-background relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 text-white leading-tight">
              {audience === 'client'
                ? language === 'fr'
                  ? <>Parlons de votre <span className="text-accent">projet</span>.</>
                  : <>Let&apos;s discuss your <span className="text-accent">project</span>.</>
                : language === 'fr'
                  ? <>Interessé par mon profil ? <span className="text-accent">Contactez-moi</span>.</>
                  : <>Interested in my profile ? <span className="text-accent">Contact me</span>.</>}
            </h2>
            <p className="text-base sm:text-lg font-sans text-white/60 mb-8 tracking-[0.08em] uppercase">
              React / Next / NestJS // {availableNowLabel}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
              <a
                href="https://calendly.com/alexis-dev/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-slate-950 font-semibold hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Calendly
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {language === 'fr' ? 'Email direct' : 'Direct email'}
              </a>
              <a
                href="https://github.com/Alexis072002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-8">
            <h3 className="text-white text-2xl font-serif mb-2">{language === 'fr' ? 'Formulaire rapide' : 'Quick form'}</h3>
            <p className="text-white/60 text-sm mb-6">
              {formDescription}
            </p>
            <form className="space-y-4" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Nom' : 'Name'}</span>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(event) => onFieldChange('name', event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.15em] text-white/50">Email</span>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => onFieldChange('email', event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder={language === 'fr' ? 'vous@email.com' : 'you@email.com'}
                />
              </label>
              {audience === 'client' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Budget' : 'Budget'}</span>
                    <select
                      value={contactForm.budget}
                      onChange={(event) => onFieldChange('budget', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <option value="">{language === 'fr' ? 'Non précisé' : 'Not specified'}</option>
                      <option value="500-1000">500 - 1000 EUR</option>
                      <option value="1000-2500">1000 - 2500 EUR</option>
                      <option value="2500+">2500+ EUR</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.15em] text-white/50">{language === 'fr' ? 'Délai' : 'Timeline'}</span>
                    <select
                      value={contactForm.timeline}
                      onChange={(event) => onFieldChange('timeline', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <option value="">{language === 'fr' ? 'Non précisé' : 'Not specified'}</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">{language === 'fr' ? '2-4 semaines' : '2-4 weeks'}</option>
                      <option value="1-2 months">{language === 'fr' ? '1-2 mois' : '1-2 months'}</option>
                    </select>
                  </label>
                </div>
              )}
              <label className="block">
                <span className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {audience === 'client'
                    ? 'Message'
                    : language === 'fr'
                      ? 'Contexte du poste'
                      : 'Role context'}
                </span>
                <textarea
                  value={contactForm.need}
                  onChange={(event) => onFieldChange('need', event.target.value)}
                  required
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y"
                  placeholder={messagePlaceholder}
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-accent text-slate-950 font-semibold py-3.5 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {submitLabel}
              </button>
              <p role="status" aria-live="polite" className="text-sm text-white/60 min-h-5">
                {formFeedback}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
