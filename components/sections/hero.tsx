"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { ArrowDown, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { DotGrid } from "@/components/effects/dot-grid"

interface HeroProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function Hero({ onNavigate, isActive, hasBeenVisited }: HeroProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const greetRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!isActive || (hasBeenVisited && animatedRef.current)) return
    animatedRef.current = true

    const tl = gsap.timeline({ delay: 0.3 })

    // Image — scale in with slight rotation
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotate: 5 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "elastic.out(1, 0.6)" },
        0
      )
    }

    // Greeting — slide in from left
    if (greetRef.current) {
      tl.fromTo(
        greetRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    // Name — elastic overshoot from below
    if (nameRef.current) {
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        },
        0.2
      )
    }

    // Tagline — fade from right
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0.5
      )
    }

    // Description
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.7
      )
    }

    // CTAs — stagger in
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.5)" },
        0.9
      )
    }

    // Stats — stagger from bottom
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        1.1
      )
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.5
      )

      gsap.to(scrollRef.current, {
        y: 6,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      })
    }
  }, [isActive, hasBeenVisited])

  return (
    <section
      ref={sectionRef}
      className="section-viewport items-center justify-center relative"
    >
      <DotGrid />

      {/* SVG clip-path definition — organic blob shape */}
      <svg className="absolute" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.02 C0.75,-0.03,0.97,0.12,0.99,0.35 C1.01,0.58,0.92,0.78,0.78,0.92 C0.64,1.06,0.38,1.04,0.22,0.93 C0.06,0.82,-0.02,0.62,0.01,0.42 C0.04,0.22,0.25,0.07,0.5,0.02Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 w-full">
        {/* Two column: text left, image right */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Left: text content */}
          <div className="max-w-xl">
            {/* Greeting */}
            <p
              ref={greetRef}
              className="font-mono text-sm tracking-[0.2em] uppercase mb-6 opacity-0"
              style={{ color: "var(--accent-gold)" }}
            >
              {t.hero.greeting}
            </p>

            {/* Name — Instrument Serif, italic, single line */}
            <h1
              ref={nameRef}
              className="text-hero mb-5 opacity-0"
              style={{ color: "var(--text-primary)" }}
            >
              {t.hero.name}
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-display text-xl sm:text-2xl md:text-3xl font-medium mb-6 leading-normal opacity-0"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.hero.tagline}
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="font-body text-base sm:text-lg max-w-xl mb-10 leading-relaxed opacity-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <button
                onClick={() => onNavigate("projects")}
                className="btn-gold cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="btn-outline-gold cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center gap-10 sm:gap-14">
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="opacity-0">
                  <div
                    className="font-serif text-3xl sm:text-4xl mb-1"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-body text-xs uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with blob mask */}
          <div
            ref={imageRef}
            className="relative hidden lg:block opacity-0"
          >
            {/* Gold glow behind the blob */}
            <div
              className="absolute -inset-4 rounded-full blur-2xl opacity-[0.08]"
              style={{ background: "var(--accent-gold)" }}
            />

            {/* Image with organic blob clip-path */}
            <div
              className="relative w-[340px] h-[400px] xl:w-[400px] xl:h-[470px]"
              style={{ clipPath: "url(#hero-blob)" }}
            >
              <Image
                src="/yash.jpg"
                alt="Yash Khare"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1280px) 400px, 340px"
              />
            </div>

            {/* Decorative border — offset blob outline */}
            <div
              className="absolute -inset-3 opacity-30"
              style={{
                clipPath: "url(#hero-blob)",
                border: "2px solid var(--accent-gold)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={() => onNavigate("about")}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {t.nav.explore}
        </span>
        <ArrowDown size={14} style={{ color: "var(--accent-gold)" }} />
      </div>
    </section>
  )
}
