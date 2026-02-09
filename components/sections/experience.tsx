"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MapPin, Calendar, ChevronRight } from "lucide-react"
import { experiences } from "@/config/content"

interface ExperienceProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function Experience({ onNavigate, isActive }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

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

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll(".timeline-item")
      tl.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: "power3.out" },
        0.3
      )
    }
  }, [isActive])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <div className="divider-gold mb-4" />
          <h2 className="text-section-heading font-display mb-2">
            Experience
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            Where I&apos;ve built and shipped
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 sm:left-8 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, transparent, var(--border-gold) 10%, var(--border-gold) 90%, transparent)",
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-8 sm:pl-20 opacity-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 sm:left-8 top-2 -translate-x-1/2"
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      exp.current
                        ? "animate-pulse-gold"
                        : ""
                    }`}
                    style={{
                      background: exp.current ? "var(--accent-gold)" : "var(--bg-primary)",
                      borderColor: "var(--accent-gold)",
                      boxShadow: exp.current ? "0 0 16px var(--accent-gold-glow)" : "none",
                    }}
                  />
                </div>

                {/* Content card */}
                <div className="card-cinematic p-6">
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="font-display text-xl font-bold">
                          {exp.company}
                        </h3>
                        <p
                          className="font-body text-sm font-medium"
                          style={{ color: "var(--accent-gold)" }}
                        >
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                          <Calendar size={12} />
                          <span className="font-mono">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                          <MapPin size={12} />
                          <span className="font-mono">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((highlight, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 font-body text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <ChevronRight
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: "var(--accent-gold)" }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="skill-tag text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
