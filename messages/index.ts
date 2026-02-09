export interface Translations {
  meta: {
    title: string
    description: string
  }
  nav: {
    home: string
    about: string
    work: string
    skills: string
    projects: string
    blog: string
    praise: string
    contact: string
    backToTop: string
    explore: string
  }
  hero: {
    greeting: string
    name: string
    tagline: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { value: string; label: string }[]
  }
  about: {
    headline: string
    subheadline: string
    paragraphs: string[]
    highlights: { icon: string; title: string; description: string }[]
    languagesHeading: string
    languages: { language: string; level: string }[]
    educationHeading: string
    education: {
      degree: string
      specialization?: string
      institution: string
      location: string
      period: string
    }[]
    githubHeading: string
    totalContributions: string
    currentStreak: string
    longestStreak: string
    days: string
    githubUnavailable: string
    viewOnGithub: string
    less: string
    more: string
  }
  experience: {
    headline: string
    subheadline: string
    items: {
      company: string
      role: string
      location: string
      period: string
      highlights: string[]
    }[]
  }
  skills: {
    headline: string
    subheadline: string
    categories: { key: string; label: string }[]
    technologiesCount: string
    inCategory: string
  }
  projects: {
    headline: string
    subheadline: string
    featured: string
    source: string
    live: string
    items: {
      title: string
      description: string
    }[]
  }
  blog: {
    headline: string
    subheadline: string
    posts: {
      title: string
      excerpt: string
    }[]
  }
  testimonials: {
    headline: string
    items: {
      quote: string
      name: string
      role: string
      company: string
    }[]
  }
  contact: {
    headline: string
    highlight: string
    subtitle: string
    ctaLabel: string
  }
  common: {
    copyright: string
    backToTop: string
  }
}

export { default as en } from "./en"
export { default as de } from "./de"
export { default as fr } from "./fr"

import en from "./en"
import de from "./de"
import fr from "./fr"

export const messages: Record<string, Translations> = { en, de, fr }
