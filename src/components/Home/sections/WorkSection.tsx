import React from 'react'
import { ProfileAvatar } from '@/components/Home/ProfileAvatar'
import { RECRUITER_STACK } from '@/components/Home/content'
import type {
  Audience,
  RecruiterFactItem,
  RecruiterHighlightItem,
  ServiceItem
} from '@/components/Home/types'

interface WorkSectionProps {
  audience: Audience
  workTitle: React.ReactNode
  workSubtitle: string
  services: ServiceItem[]
  language: 'en' | 'fr'
  recruiterFacts: RecruiterFactItem[]
  recruiterHighlights: RecruiterHighlightItem[]
  isProfilePhotoAvailable: boolean
  onProfileImageError: () => void
  profilePhotoSrc: string
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  audience,
  workTitle,
  workSubtitle,
  services,
  language,
  recruiterFacts,
  recruiterHighlights,
  isProfilePhotoAvailable,
  onProfileImageError,
  profilePhotoSrc
}) => {
  return (
    <section id="work" className="w-full min-h-screen py-24 md:py-28 px-5 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold mb-5 md:mb-6 text-white">
            {workTitle}
          </h2>
          <p className="text-white/40 font-sans tracking-[0.18em] uppercase text-[11px] sm:text-sm">
            {workSubtitle}
          </p>
        </div>

        {audience === 'client' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {services.map((service) => (
              <article key={service.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-7">
                <h3 className="text-white text-2xl font-serif mb-3">{service.title}</h3>
                <p className="text-white/70 leading-relaxed mb-5">{service.description}</p>
                <p className="text-accent text-sm tracking-[0.12em] uppercase mb-2">{service.scope}</p>
                <p className="text-white/85 text-sm">{service.price}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-6">
            <article className="lg:col-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-8">
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                    Alexis Dezeque
                  </h3>
                  <p className="mt-2 text-white/70 text-sm md:text-base">
                    {language === 'fr'
                      ? 'Développeur JavaScript Frontend / Full-stack'
                      : 'Frontend / Full-stack JavaScript Developer'}
                  </p>
                </div>
                <ProfileAvatar
                  photoSrc={profilePhotoSrc}
                  isPhotoAvailable={isProfilePhotoAvailable}
                  onImageError={onProfileImageError}
                  wrapperClassName="w-16 h-16 md:w-20 md:h-20 rounded-2xl"
                  imageClassName="object-cover object-[center_26%]"
                  initialsClassName="text-sm md:text-base"
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {RECRUITER_STACK.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-3.5">
                {recruiterFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                    <span className="text-white/50 text-xs uppercase tracking-[0.14em]">{fact.label}</span>
                    <span className="text-white text-sm">{fact.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="#projects"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-slate-950 text-sm font-semibold hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {language === 'fr' ? 'Mes projets' : 'My projects'}
              </a>
            </article>

            <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-6">
              {recruiterHighlights.map((item, index) => (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 md:p-8 min-h-[230px] ${index === 2 ? 'xl:col-span-2' : ''}`}
                >
                  <div className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-accent/75 to-transparent opacity-70 pointer-events-none" />
                  <div className="absolute -top-16 right-0 w-44 h-44 bg-accent/15 blur-[85px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="text-white text-2xl md:text-[2rem] leading-tight font-serif mb-4 mt-1">{item.title}</h3>
                  <p className="text-white/75 leading-relaxed text-sm md:text-base max-w-[56ch]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
