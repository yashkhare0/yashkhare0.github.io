"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTranslation } from "@/lib/i18n"

interface TestimonialsProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function Testimonials({ onNavigate, isActive, hasBeenVisited }: TestimonialsProps) {
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

    // Number
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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    // Cards — slide in from alternating sides
    if (cardsRef.current) {
      const items = cardsRef.current.children
      Array.from(items).forEach((item, i) => {
        const fromLeft = i % 2 === 0
        tl.fromTo(
          item,
          { opacity: 0, x: fromLeft ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          0.25 + i * 0.15
        )
      })
    }
  }, [isActive, hasBeenVisited])

  return (
    <section
      ref={sectionRef}
      className="section-viewport items-center justify-center"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section number */}
        <span ref={numberRef} className="section-number">07</span>

        {/* Heading — centered, large serif quote mark */}
        <div ref={headingRef} className="mb-14 opacity-0">
          <span
            className="font-serif text-6xl sm:text-8xl block mb-2 leading-none"
            style={{ color: "var(--accent-gold)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <h2 className="text-section-heading font-display">
            {t.testimonials.headline}
          </h2>
        </div>

        {/* Testimonials — large editorial quotes */}
        <div ref={cardsRef} className="space-y-8">
          {t.testimonials.items.map((testimonial, i) =>
            testimonial.name === "more_coming" ? (
              <div
                key="more-coming"
                className="card-editorial p-8 sm:p-10 opacity-0 flex items-center justify-center"
                style={{ borderStyle: "dashed" }}
              >
                <p
                  className="font-serif text-lg sm:text-xl italic"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  More on the way, I promise!
                </p>
              </div>
            ) : (
              <div
                key={`${testimonial.name}-${i}`}
                className="card-editorial p-8 sm:p-10 opacity-0"
              >
                <div className="relative z-10">
                  {/* Large quote text */}
                  <blockquote
                    className="font-serif text-xl sm:text-2xl leading-relaxed mb-6 italic"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {testimonial.quote}
                  </blockquote>

                  {/* Author — inline */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold"
                      style={{
                        background: "var(--accent-gold-muted)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium">{testimonial.name}</p>
                      <p className="font-body text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
