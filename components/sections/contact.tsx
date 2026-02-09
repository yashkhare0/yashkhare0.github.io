"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mail, Github, Linkedin, ArrowUpRight, ArrowUp } from "lucide-react"
import { contactContent, socialLinks, siteConfig } from "@/config/content"

interface ContactProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={20} />,
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
}

export function Contact({ onNavigate, isActive }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const tl = gsap.timeline({ delay: 0.2 })

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0
      )
    }

    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        0.5
      )
    }

    if (footerRef.current) {
      tl.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.8
      )
    }
  }, [isActive])

  return (
    <section
      ref={sectionRef}
      className="section-viewport items-center justify-center relative"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
        {/* Heading */}
        <div ref={headingRef}>
          <div className="divider-gold mx-auto mb-6 opacity-0" />
          <h2 className="text-section-heading font-display mb-2 opacity-0">
            {contactContent.headline}{" "}
            <span className="text-gradient-gold">{contactContent.highlight}</span>
          </h2>
          <p
            className="font-body text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto opacity-0"
            style={{ color: "var(--text-secondary)" }}
          >
            {contactContent.subtitle}
          </p>

          {/* CTA */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn-gold inline-flex mb-12 opacity-0"
          >
            <Mail size={16} />
            <span>{contactContent.ctaLabel}</span>
          </a>
        </div>

        {/* Social links */}
        <div ref={linksRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-3 px-5 py-3 rounded-lg border transition-all duration-300 cursor-pointer opacity-0"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-gold)"
                e.currentTarget.style.boxShadow = "var(--shadow-gold)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <span style={{ color: "var(--accent-gold)" }}>{iconMap[link.icon]}</span>
              <div className="text-left">
                <span className="font-body text-sm font-medium block">{link.name}</span>
                <span className="font-mono text-xs block" style={{ color: "var(--text-tertiary)" }}>
                  {link.label}
                </span>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "var(--text-tertiary)" }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 sm:px-8 opacity-0"
      >
        <span className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-1.5 font-mono text-xs transition-colors cursor-pointer"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          <ArrowUp size={12} />
          <span>Back to top</span>
        </button>
      </div>
    </section>
  )
}
