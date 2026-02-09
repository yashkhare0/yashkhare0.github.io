"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import { heroContent } from "@/config/content"
import { AuroraBackground } from "@/components/effects/aurora-background"

interface HeroProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function Hero({ onNavigate, isActive }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Animate name characters
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".hero-char")
      tl.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -60 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
        },
        0
      )
    }

    // Tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6
      )
    }

    // Description
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      )
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        1
      )
    }

    // Stats
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        1.2
      )
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        1.6
      )

      // Continuous bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.2,
      })
    }
  }, [isActive])

  const renderName = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block opacity-0"
        style={{
          display: char === " " ? "inline" : "inline-block",
          perspective: "500px",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className="section-viewport items-center justify-center relative"
    >
      <AuroraBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Greeting */}
        <p
          ref={taglineRef}
          className="font-mono text-sm sm:text-base tracking-widest uppercase mb-4 opacity-0"
          style={{ color: "var(--accent-gold)" }}
        >
          {heroContent.greeting}
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-hero font-display text-gradient-gold mb-6"
        >
          {renderName(heroContent.name)}
        </h1>

        {/* Tagline */}
        <p
          className="font-display text-xl sm:text-2xl md:text-3xl font-medium mb-6 opacity-0"
          ref={descRef}
          style={{ color: "var(--text-secondary)" }}
        >
          {heroContent.tagline}
        </p>

        {/* Description */}
        <p
          className="font-body text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
          style={{ color: "var(--text-tertiary)" }}
        >
          {heroContent.description}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate(heroContent.cta.primary.section)}
            className="btn-gold cursor-pointer"
          >
            <span>{heroContent.cta.primary.label}</span>
          </button>
          <button
            onClick={() => onNavigate(heroContent.cta.secondary.section)}
            className="btn-outline-gold cursor-pointer"
          >
            <span>{heroContent.cta.secondary.label}</span>
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex items-center justify-center gap-8 sm:gap-16">
          {heroContent.stats.map((stat, i) => (
            <div key={i} className="text-center opacity-0">
              <div
                className="font-display text-2xl sm:text-3xl font-bold mb-1"
                style={{ color: "var(--accent-gold)" }}
              >
                {stat.value}
              </div>
              <div
                className="font-body text-xs sm:text-sm uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={() => onNavigate("about")}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--text-tertiary)" }}
        >
          Scroll
        </span>
        <ArrowDown size={16} style={{ color: "var(--accent-gold)" }} />
      </div>
    </section>
  )
}
