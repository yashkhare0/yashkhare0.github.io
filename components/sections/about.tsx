"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Cpu, Code, Users } from "lucide-react"
import { aboutContent, education, spokenLanguages } from "@/config/content"

interface AboutProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

const iconMap: Record<string, React.ReactNode> = {
  brain: <Cpu size={24} />,
  code: <Code size={24} />,
  users: <Users size={24} />,
}

export function About({ onNavigate, isActive }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const tl = gsap.timeline({ delay: 0.2 })

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0
      )
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        0.3
      )
    }

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        0.6
      )
    }

    if (educationRef.current) {
      tl.fromTo(
        educationRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        0.9
      )
    }
  }, [isActive])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <div className="divider-gold mb-4" />
          <h2 className="text-section-heading font-display mb-2">
            {aboutContent.headline}
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            {aboutContent.subheadline}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Text */}
          <div ref={textRef}>
            {aboutContent.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-base leading-relaxed mb-5 opacity-0"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </p>
            ))}

            {/* Languages */}
            <div className="mt-8 opacity-0">
              <h3 className="font-display text-sm uppercase tracking-widest mb-4" style={{ color: "var(--accent-gold)" }}>
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {spokenLanguages.map((lang) => (
                  <div
                    key={lang.language}
                    className="skill-tag"
                  >
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{lang.language}</span>
                    <span style={{ color: "var(--text-tertiary)" }}>/ {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div ref={cardsRef} className="space-y-4">
            {aboutContent.highlights.map((highlight, i) => (
              <div
                key={i}
                className="card-cinematic p-6 cursor-pointer opacity-0"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: "var(--accent-gold-muted)",
                      color: "var(--accent-gold)",
                    }}
                  >
                    {iconMap[highlight.icon]}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">
                      {highlight.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={educationRef}>
          <h3 className="font-display text-sm uppercase tracking-widest mb-6" style={{ color: "var(--accent-gold)" }}>
            Education
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-5 rounded-lg border opacity-0"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <p className="font-display text-sm font-semibold mb-1">{edu.degree}</p>
                {edu.specialization && (
                  <p className="font-body text-xs mb-2" style={{ color: "var(--accent-gold)" }}>
                    {edu.specialization}
                  </p>
                )}
                <p className="font-body text-sm" style={{ color: "var(--text-secondary)" }}>
                  {edu.institution}
                </p>
                <p className="font-mono text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
