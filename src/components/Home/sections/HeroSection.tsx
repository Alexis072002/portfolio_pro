import React from 'react'
import { motion, type MotionValue } from 'framer-motion'
import { HeroScrollCanvas } from '@/components/HeroScrollAnimation/HeroScrollCanvas'
import { LanguageSwitcher } from '@/components/Language/LanguageSwitcher'
import type { Audience } from '@/components/Home/types'
import { ProfileAvatar } from '@/components/Home/ProfileAvatar'

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>
  smoothProgress: MotionValue<number>
  prefersReducedMotion: boolean
  isLowDataMode: boolean
  audience: Audience
  onAudienceChange: (audience: Audience) => void
  audienceRecruiterToggleLabel: string
  audienceClientToggleLabel: string
  introTitleOpacity: MotionValue<number>
  introTitleX: MotionValue<number>
  introTitleFilter: MotionValue<string>
  glitchOpacity: MotionValue<number>
  glitchLeftX: MotionValue<number>
  glitchRightX: MotionValue<number>
  glitchScanOpacity: MotionValue<number>
  glitchScanY: MotionValue<number>
  introRoleLine: string
  introAudiencePitch: string
  introCtaLabel: string
  availableLabel: string
  availableNowLabel: string
  isProfilePhotoAvailable: boolean
  onProfileImageError: () => void
  profilePhotoSrc: string
  textOpacity: MotionValue<number>
  textY: MotionValue<number>
  heroTitle: React.ReactNode
  heroPitch: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  heroFrames: string[]
  language: 'en' | 'fr'
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroRef,
  smoothProgress,
  prefersReducedMotion,
  isLowDataMode,
  audience,
  onAudienceChange,
  audienceRecruiterToggleLabel,
  audienceClientToggleLabel,
  introTitleOpacity,
  introTitleX,
  introTitleFilter,
  glitchOpacity,
  glitchLeftX,
  glitchRightX,
  glitchScanOpacity,
  glitchScanY,
  introRoleLine,
  introAudiencePitch,
  introCtaLabel,
  availableLabel,
  availableNowLabel,
  isProfilePhotoAvailable,
  onProfileImageError,
  profilePhotoSrc,
  textOpacity,
  textY,
  heroTitle,
  heroPitch,
  primaryCtaLabel,
  secondaryCtaLabel,
  heroFrames,
  language
}) => {
  return (
    <>
      <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAudienceChange('recruiter')}
            className={`text-center py-3 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${audience === 'recruiter' ? 'bg-accent text-slate-950' : 'border border-white/20 text-white'}`}
          >
            {audienceRecruiterToggleLabel}
          </button>
          <button
            type="button"
            onClick={() => onAudienceChange('client')}
            className={`text-center py-3 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${audience === 'client' ? 'bg-accent text-slate-950' : 'border border-white/20 text-white'}`}
          >
            {audienceClientToggleLabel}
          </button>
        </div>
      </div>

      <section ref={heroRef} id="hero" className="relative w-full min-h-[380vh] md:min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <HeroScrollCanvas
              imageUrls={heroFrames}
              scrollProgress={smoothProgress}
              reduceMotion={prefersReducedMotion}
              lowDataMode={isLowDataMode}
            />
          </div>

          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30">
            <LanguageSwitcher />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-2 p-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => onAudienceChange('recruiter')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'recruiter' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              {audienceRecruiterToggleLabel}
            </button>
            <button
              type="button"
              onClick={() => onAudienceChange('client')}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors ${audience === 'client' ? 'bg-accent text-slate-950 font-semibold' : 'text-white/70 hover:text-white'}`}
            >
              {audienceClientToggleLabel}
            </button>
          </div>

          <motion.div
            style={{
              opacity: introTitleOpacity,
              x: introTitleX,
              filter: introTitleFilter
            }}
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none max-w-[85vw] sm:max-w-[70vw] md:max-w-[52vw] lg:max-w-[45vw]"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10 sm:w-14 bg-accent/80" />
              <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white/70">
                {language === 'fr' ? 'Portfolio' : 'Portfolio'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_0_30px_rgba(2,6,23,0.95)]">
              <span className="relative inline-block">
                <motion.span
                  style={{ opacity: glitchOpacity, x: glitchLeftX }}
                  className="absolute inset-0 text-accent/85 mix-blend-screen pointer-events-none select-none"
                  aria-hidden
                >
                  Alexis Dezeque
                  <span className="block italic">{introRoleLine}</span>
                </motion.span>
                <motion.span
                  style={{ opacity: glitchOpacity, x: glitchRightX }}
                  className="absolute inset-0 text-sky-200/70 mix-blend-screen pointer-events-none select-none"
                  aria-hidden
                >
                  Alexis Dezeque
                  <span className="block italic">{introRoleLine}</span>
                </motion.span>
                <span>Alexis Dezeque</span>
                <span className="block text-accent italic">{introRoleLine}</span>
              </span>
            </h1>
            <motion.div
              style={{ opacity: glitchScanOpacity, y: glitchScanY }}
              className="absolute left-0 right-0 top-0 h-6 pointer-events-none bg-gradient-to-r from-transparent via-accent/90 to-transparent blur-[0.8px]"
              aria-hidden
            />
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-[44ch] leading-relaxed">
              {introAudiencePitch}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white pointer-events-auto hover:border-accent/45 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {introCtaLabel}
            </a>
          </motion.div>

          <a
            href="#contact"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-lg hover:border-emerald-300/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex items-start gap-3">
              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/60">{availableLabel}</p>
                <p className="text-sm sm:text-base text-white font-semibold inline-flex items-center gap-2">
                  <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" aria-hidden />
                  {availableNowLabel}
                </p>
              </div>
              <ProfileAvatar
                photoSrc={profilePhotoSrc}
                isPhotoAvailable={isProfilePhotoAvailable}
                onImageError={onProfileImageError}
                wrapperClassName="w-8 h-8 rounded-full mt-0.5"
                imageClassName="object-cover"
                initialsClassName="text-[10px]"
              />
            </div>
          </a>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif font-medium tracking-tighter mb-6 md:mb-8 leading-[1.05] text-white drop-shadow-[0_0_40px_rgba(2,6,23,0.9)]">
              {heroTitle}
            </h2>
            <p className="max-w-2xl text-base sm:text-lg md:text-2xl font-sans text-white leading-relaxed mx-auto font-medium mb-10 md:mb-12 drop-shadow-[0_0_30px_rgba(2,6,23,0.8)]">
              {heroPitch}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pointer-events-auto w-full sm:w-auto max-w-sm sm:max-w-none">
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 bg-accent text-slate-950 font-sans font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {primaryCtaLabel}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-8 md:px-10 py-3.5 md:py-4 border border-white/15 font-sans font-medium rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {secondaryCtaLabel}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
