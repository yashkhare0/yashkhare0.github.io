"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface SectionNavProps {
  sections: string[]
  currentSection: string
  onNavigate: (section: string) => void
  disabled?: boolean
}

export function SectionNav({ sections, currentSection, onNavigate, disabled }: SectionNavProps) {
  const navRef = useRef<HTMLDivElement>(null)

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
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 opacity-0"
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onNavigate(section)}
          disabled={disabled}
          className="group relative flex items-center cursor-pointer"
          aria-label={`Go to ${section}`}
          aria-current={currentSection === section ? "true" : undefined}
        >
          {/* Tooltip */}
          <span
            className="absolute right-8 px-2.5 py-1 rounded text-xs font-body capitalize whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block"
            style={{
              background: "var(--accent-gold)",
              color: "var(--text-inverse)",
            }}
          >
            {section}
          </span>

          {/* Dot */}
          <div
            className={`nav-dot ${currentSection === section ? "active" : ""}`}
          />
        </button>
      ))}
    </nav>
  )
}
