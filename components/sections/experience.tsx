"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MapPin, Calendar, ChevronRight } from "lucide-react"
import { experiences } from "@/config/content"

interface ExperienceProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function Experience({ onNavigate, isActive, hasBeenVisited }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!isActive || (hasBeenVisited && animatedRef.current)) return
    animatedRef.current = true

    const tl = gsap.timeline({ delay: 0.15 })

    // Section number watermark
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        0
      )
    }

    // Heading
    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    // Self-drawing timeline line (SVG)
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength()
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length })
      tl.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.2)
    }

    // Timeline cards — slide in from alternating sides
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll(".timeline-item")
      items.forEach((item, i) => {
        const fromRight = i % 2 === 1
        tl.fromTo(
          item,
          { opacity: 0, x: fromRight ? 40 : -40, rotateY: fromRight ? 5 : -5 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: "power3.out" },
          0.3 + i * 0.15
        )
      })
    }
  }, [isActive, hasBeenVisited])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section number */}
        <span ref={numberRef} className="section-number">02</span>

        {/* Heading */}
        <div ref={headingRef} className="mb-14 opacity-0">
          <h2 className="text-section-heading font-display">
            Experience
          </h2>
          <p className="font-body text-lg mt-2" style={{ color: "var(--text-secondary)" }}>
            Where I&apos;ve built and shipped
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Self-drawing SVG line */}
          <svg
            className="absolute left-0 sm:left-8 top-0 bottom-0 w-px overflow-visible"
            style={{ height: "100%" }}
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="0" y1="0" x2="0" y2="100%"
              stroke="var(--accent-gold)"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </svg>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-8 sm:pl-20 opacity-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-8 top-2 -translate-x-1/2">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${exp.current ? "animate-pulse-gold" : ""}`}
                    style={{
                      background: exp.current ? "var(--accent-gold)" : "var(--bg-primary)",
                      borderColor: "var(--accent-gold)",
                      boxShadow: exp.current ? "0 0 16px var(--accent-gold-glow)" : "none",
                    }}
                  />
                </div>

                {/* Content card */}
                <div
                  className="card-editorial p-6"
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="font-display text-lg font-bold">
                          {exp.company}
                        </h3>
                        <p className="font-body text-sm font-medium" style={{ color: "var(--accent-gold)" }}>
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                          <Calendar size={11} />
                          <span className="font-mono">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
                          <MapPin size={11} />
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
                            size={13}
                            className="flex-shrink-0 mt-1"
                            style={{ color: "var(--accent-gold)" }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
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
