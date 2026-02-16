export type Audience = 'recruiter' | 'client'

export type ContactFormState = {
  name: string
  email: string
  need: string
  budget: string
  timeline: string
}

export type ServiceItem = {
  title: string
  description: string
  scope: string
  price: string
}

export type AiToolItem = {
  tool: string
  type: string
  logoSrc: string
  reason: string
}

export type RecruiterHighlightItem = {
  title: string
  description: string
}

export type RecruiterFactItem = {
  label: string
  value: string
}

export type FaqItem = {
  q: string
  a: string
}
