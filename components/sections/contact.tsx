"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mail, Github, Linkedin, ArrowUpRight, ArrowUp } from "lucide-react"
import { socialLinks, siteConfig } from "@/config/content"
import { useTranslation } from "@/lib/i18n"

interface ContactProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={18} />,
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
}

export function Contact({ onNavigate, isActive, hasBeenVisited }: ContactProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const backToTopRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
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

    // Content — circular clip-path reveal
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
        { opacity: 1, clipPath: "circle(80% at 50% 50%)", duration: 1, ease: "power3.out" },
        0.1
      )
    }

    // Links — stagger up
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        0.5
      )
    }

    // Back to top
    if (backToTopRef.current) {
      tl.fromTo(
        backToTopRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.8
      )

      gsap.to(backToTopRef.current, {
        y: -6,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      })
    }

    // Footer
    if (footerRef.current) {
      tl.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.9
      )
    }
  }, [isActive, hasBeenVisited])

  return (
    <section
      ref={sectionRef}
      className="section-viewport items-center justify-center relative"
    >
      <span ref={numberRef} className="section-number" style={{ right: "auto", left: 0 }}>07</span>

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center opacity-0">
        {/* Heading — large serif */}
        <h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {t.contact.headline}{" "}
          <span className="text-gradient-gold italic">{t.contact.highlight}</span>
        </h2>
        <p
          className="font-body text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {t.contact.subtitle}
        </p>

        {/* CTA */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-gold inline-flex mb-14"
        >
          <Mail size={15} />
          <span>{t.contact.ctaLabel}</span>
        </a>

        {/* Social links — horizontal */}
        <div ref={linksRef} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer opacity-0"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)"
              }}
            >
              <span style={{ color: "var(--accent-gold)" }}>{iconMap[link.icon]}</span>
              <span className="font-body text-sm font-medium">{link.name}</span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "var(--text-tertiary)" }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Back to top — centered, matching Hero's Explore indicator */}
      <div
        ref={backToTopRef}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={() => onNavigate("hero")}
      >
        <ArrowUp size={14} style={{ color: "var(--accent-gold)" }} />
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {t.common.backToTop}
        </span>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-4 left-0 right-0 flex items-center justify-center px-6 sm:px-8 opacity-0"
      >
        <span className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
      </div>
    </section>
  )
}
