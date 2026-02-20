"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/components/Language/LanguageProvider'
import {
  CONTACT_EMAIL,
  HERO_FRAMES,
  PROFILE_PHOTO_SRC,
  TECH_STACK,
  getHomeCopy
} from '@/components/Home/content'
import type { Audience, ContactFormState } from '@/components/Home/types'
import { useAudience } from '@/components/Audience/AudienceProvider'
import { HeroSection } from '@/components/Home/sections/HeroSection'
import { WorkSection } from '@/components/Home/sections/WorkSection'
import { ProjectsSection } from '@/components/Home/sections/ProjectsSection'
import { ProofsSection } from '@/components/Home/sections/ProofsSection'
import { AboutSection } from '@/components/Home/sections/AboutSection'
import { FaqSection } from '@/components/Home/sections/FaqSection'
import { ContactSection } from '@/components/Home/sections/ContactSection'

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean
    effectiveType?: string
  }
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const appliedAudienceQueryRef = useRef<string | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = Boolean(prefersReducedMotion)
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const { audience, setAudience } = useAudience()

  const [isLowDataMode, setIsLowDataMode] = useState(false)
  const [isProfilePhotoAvailable, setIsProfilePhotoAvailable] = useState(true)
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: '',
    email: '',
    need: '',
    budget: '',
    timeline: ''
  })
  const [formFeedback, setFormFeedback] = useState('')

  const {
    audienceLabel,
    audienceRecruiterToggleLabel,
    audienceClientToggleLabel,
    availableLabel,
    availableNowLabel,
    services,
    aiToolsFavorites,
    aiQualityGuardrails,
    humanLedAiExecution,
    recruiterHighlights,
    recruiterFacts,
    faqItems,
    introRoleLine,
    introAudiencePitch,
    heroTitle,
    heroPitch,
    primaryCtaLabel,
    secondaryCtaLabel,
    introCtaLabel,
    workTitle,
    workSubtitle,
    aboutEyebrow,
    aboutTitle,
    aboutParagraphs,
    formDescription,
    messagePlaceholder,
    submitLabel,
    projectsIntro
  } = useMemo(() => getHomeCopy(language, audience), [language, audience])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection
    const saveData = Boolean(nav.connection?.saveData)
    const lowNetwork = /(^|-)(2g)/.test(nav.connection?.effectiveType ?? '')
    setIsLowDataMode(saveData || lowNetwork)
  }, [])

  useEffect(() => {
    const audienceFromQuery = searchParams.get('audience')
    if (
      (audienceFromQuery === 'recruiter' || audienceFromQuery === 'client') &&
      appliedAudienceQueryRef.current !== audienceFromQuery
    ) {
      setAudience(audienceFromQuery)
      appliedAudienceQueryRef.current = audienceFromQuery
      return
    }

    if (!audienceFromQuery) {
      appliedAudienceQueryRef.current = null
    }
  }, [searchParams, setAudience])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 260 : 100,
    damping: shouldReduceMotion ? 45 : 30,
    restDelta: 0.001
  })

  const introGlitchProgress = useMotionValue(shouldReduceMotion ? 1 : 0)

  useEffect(() => {
    if (shouldReduceMotion) {
      introGlitchProgress.set(1)
      return
    }

    introGlitchProgress.set(0)
    const controls = animate(introGlitchProgress, 1, {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    })

    return () => controls.stop()
  }, [shouldReduceMotion, introGlitchProgress])

  const textOpacity = useTransform(
    smoothProgress,
    shouldReduceMotion ? [0, 0.01] : [0.88, 1],
    shouldReduceMotion ? [1, 1] : [0, 1]
  )
  const textY = useTransform(
    smoothProgress,
    shouldReduceMotion ? [0, 0.01] : [0.88, 1],
    shouldReduceMotion ? [0, 0] : [40, 0]
  )

  const frameStep = 1 / (HERO_FRAMES.length - 1)
  const introRevealStart = 0.0001
  const introHold = 6 * frameStep
  const introEnd = 8 * frameStep

  const introTitleOpacity = useTransform(
    smoothProgress,
    [0, introRevealStart, introHold, introEnd],
    [1, 1, 1, 0]
  )
  const introTitleX = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    [0, 0, 0, shouldReduceMotion ? 0 : -48]
  )
  const introTitleBlur = useTransform(
    smoothProgress,
    [0, 2 * frameStep, introHold, introEnd],
    [0, 0, 0, shouldReduceMotion ? 0 : 10]
  )
  const introTitleFilter = useMotionTemplate`blur(${introTitleBlur}px)`

  const glitchOpacity = useTransform(
    introGlitchProgress,
    [0, 0.22, 0.52, 0.78, 1],
    shouldReduceMotion ? [0, 0, 0, 0, 0] : [0.95, 0.35, 0.88, 0.16, 0]
  )
  const glitchLeftX = useTransform(
    introGlitchProgress,
    [0, 0.4, 0.75, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [-18, 8, -5, 0]
  )
  const glitchRightX = useTransform(
    introGlitchProgress,
    [0, 0.4, 0.75, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [16, -9, 5, 0]
  )
  const glitchScanOpacity = useTransform(
    introGlitchProgress,
    [0, 0.15, 0.65, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [0.82, 0.95, 0.45, 0]
  )
  const glitchScanY = useTransform(
    introGlitchProgress,
    [0, 0.55, 1],
    shouldReduceMotion ? [0, 0, 0] : [-30, 8, 58]
  )

  const handleAudienceChange = (nextAudience: Audience) => {
    setAudience(nextAudience)
    setFormFeedback('')
  }

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Contact ${audienceLabel} - ${contactForm.name}`)
    const bodyLines = [
      language === 'fr' ? 'Bonjour Alexis,' : 'Hello Alexis,',
      '',
      `${language === 'fr' ? 'Nom' : 'Name'}: ${contactForm.name}`,
      `Email: ${contactForm.email}`
    ]

    if (audience === 'client') {
      bodyLines.push(
        `Budget: ${contactForm.budget || (language === 'fr' ? 'Non précisé' : 'Not specified')}`,
        `${language === 'fr' ? 'Délai' : 'Timeline'}: ${contactForm.timeline || (language === 'fr' ? 'Non précisé' : 'Not specified')}`
      )
    }

    bodyLines.push('')
    bodyLines.push(
      audience === 'client'
        ? language === 'fr'
          ? 'Contexte projet :'
          : 'Project context:'
        : language === 'fr'
          ? 'Contexte recrutement :'
          : 'Hiring context:'
    )
    bodyLines.push(contactForm.need)

    const body = encodeURIComponent(bodyLines.join('\r\n'))

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setFormFeedback(
      language === 'fr'
        ? "Message préparé. Votre client email s'ouvre."
        : 'Message prepared. Your email client is opening.'
    )
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Alexis Dezeque - Freelance Web Developer',
    areaServed: 'France',
    serviceType: ['Frontend Development', 'Full-stack Development', 'React/Next Revamp'],
    founder: {
      '@type': 'Person',
      name: 'Alexis Dezeque'
    },
    url: 'https://alexis.dev',
    email: CONTACT_EMAIL
  }

  return (
    <div className="flex flex-col items-center justify-center selection:bg-accent/30 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        heroRef={heroRef}
        smoothProgress={smoothProgress}
        prefersReducedMotion={shouldReduceMotion}
        isLowDataMode={isLowDataMode}
        audience={audience}
        onAudienceChange={handleAudienceChange}
        audienceRecruiterToggleLabel={audienceRecruiterToggleLabel}
        audienceClientToggleLabel={audienceClientToggleLabel}
        introTitleOpacity={introTitleOpacity}
        introTitleX={introTitleX}
        introTitleFilter={introTitleFilter}
        glitchOpacity={glitchOpacity}
        glitchLeftX={glitchLeftX}
        glitchRightX={glitchRightX}
        glitchScanOpacity={glitchScanOpacity}
        glitchScanY={glitchScanY}
        introRoleLine={introRoleLine}
        introAudiencePitch={introAudiencePitch}
        introCtaLabel={introCtaLabel}
        availableLabel={availableLabel}
        availableNowLabel={availableNowLabel}
        isProfilePhotoAvailable={isProfilePhotoAvailable}
        onProfileImageError={() => setIsProfilePhotoAvailable(false)}
        profilePhotoSrc={PROFILE_PHOTO_SRC}
        textOpacity={textOpacity}
        textY={textY}
        heroTitle={heroTitle}
        heroPitch={heroPitch}
        primaryCtaLabel={primaryCtaLabel}
        secondaryCtaLabel={secondaryCtaLabel}
        heroFrames={HERO_FRAMES}
        language={language}
      />

      <WorkSection
        audience={audience}
        workTitle={workTitle}
        workSubtitle={workSubtitle}
        services={services}
        language={language}
        recruiterFacts={recruiterFacts}
        recruiterHighlights={recruiterHighlights}
        isProfilePhotoAvailable={isProfilePhotoAvailable}
        onProfileImageError={() => setIsProfilePhotoAvailable(false)}
        profilePhotoSrc={PROFILE_PHOTO_SRC}
      />

      <ProjectsSection language={language} projectsIntro={projectsIntro} />

      <ProofsSection
        language={language}
        aiToolsFavorites={aiToolsFavorites}
        aiQualityGuardrails={aiQualityGuardrails}
        humanLedAiExecution={humanLedAiExecution}
      />

      <AboutSection
        aboutEyebrow={aboutEyebrow}
        aboutTitle={aboutTitle}
        aboutParagraphs={aboutParagraphs}
        techStack={TECH_STACK}
        prefersReducedMotion={shouldReduceMotion}
      />

      <FaqSection audience={audience} language={language} faqItems={faqItems} />

      <ContactSection
        audience={audience}
        language={language}
        availableNowLabel={availableNowLabel}
        contactEmail={CONTACT_EMAIL}
        formDescription={formDescription}
        messagePlaceholder={messagePlaceholder}
        submitLabel={submitLabel}
        contactForm={contactForm}
        onFieldChange={handleFieldChange}
        onSubmit={handleFormSubmit}
        formFeedback={formFeedback}
      />
    </div>
  )
}
