"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Quote } from "lucide-react"
import { testimonials } from "@/config/content"

interface TestimonialsProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function Testimonials({ onNavigate, isActive }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" },
        0.3
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
            Testimonials
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            What people say about working with me
          </p>
        </div>

        {/* Testimonials grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-cinematic p-6 sm:p-8 opacity-0"
            >
              <div className="relative z-10">
                {/* Quote icon */}
                <div
                  className="mb-4"
                  style={{ color: "var(--accent-gold)" }}
                >
                  <Quote size={24} />
                </div>

                {/* Quote text */}
                <blockquote
                  className="font-body text-sm sm:text-base leading-relaxed mb-6 italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold"
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
          ))}
        </div>
      </div>
    </section>
  )
}
