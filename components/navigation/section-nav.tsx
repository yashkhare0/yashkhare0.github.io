"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useTranslation } from "@/lib/i18n"

interface SectionNavProps {
  sections: string[]
  currentSection: string
  onNavigate: (section: string) => void
  disabled?: boolean
}

export function SectionNav({ sections, currentSection, onNavigate, disabled }: SectionNavProps) {
  const t = useTranslation()
  const navRef = useRef<HTMLDivElement>(null)

  const sectionLabels: Record<string, string> = {
    hero: t.nav.home,
    about: t.nav.about,
    experience: t.nav.work,
    education: t.nav.education,
    skills: t.nav.skills,
    projects: t.nav.projects,
    blog: t.nav.blog,
    testimonials: t.nav.praise,
    contact: t.nav.contact,
  }

  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 1.5, ease: "power3.out" }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1 opacity-0"
      aria-label="Section navigation"
    >
      {sections.map((section, i) => {
        const isActive = currentSection === section
        return (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            disabled={disabled}
            className="group relative flex items-center gap-3 py-1.5 px-2 cursor-pointer rounded-lg transition-all duration-300 hover:bg-[var(--bg-surface)]"
            aria-label={`Go to ${sectionLabels[section] || section}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label — slides in on hover, always visible for active */}
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "opacity-0 translate-x-2 max-w-0 lg:opacity-100 lg:translate-x-0 lg:max-w-[80px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:max-w-[80px]"
                  : "opacity-0 translate-x-2 max-w-0 group-hover:opacity-70 group-hover:translate-x-0 group-hover:max-w-[80px]"
              }`}
              style={{
                color: isActive ? "var(--accent-gold)" : "var(--text-tertiary)",
                overflow: "hidden",
              }}
            >
              {sectionLabels[section] || section}
            </span>

            {/* Dot / line indicator */}
            <div
              className="shrink-0 rounded-full transition-all duration-400"
              style={{
                width: isActive ? "20px" : "6px",
                height: "6px",
                background: isActive ? "var(--accent-gold)" : "var(--border-default)",
                borderRadius: isActive ? "3px" : "50%",
                boxShadow: isActive ? "0 0 12px var(--accent-gold-glow)" : "none",
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
