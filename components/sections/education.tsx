"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTranslation } from "@/lib/i18n"

interface EducationProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function Education({ isActive, hasBeenVisited }: EducationProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!isActive || (hasBeenVisited && animatedRef.current)) return
    animatedRef.current = true

    const tl = gsap.timeline({ delay: 0.15 })

    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        0
      )
    }

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out" },
        0.25
      )
    }
  }, [isActive, hasBeenVisited])

  return (
    <section ref={sectionRef} className="section-viewport">
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <span ref={numberRef} className="section-number">03</span>

        <div ref={headingRef} className="mb-14 opacity-0">
          <h2 className="text-section-heading font-display">
            {t.about.educationHeading}
          </h2>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.about.education.map((edu, i) => (
            <div
              key={i}
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
              <p className="font-body text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                {edu.location}
              </p>
              <p className="font-mono text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
                {edu.period}
              </p>
              {edu.details && edu.details.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {edu.details.map((detail, di) => (
                    <li
                      key={di}
                      className="font-body text-xs leading-relaxed flex gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span style={{ color: "var(--accent-gold)" }}>▪</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
