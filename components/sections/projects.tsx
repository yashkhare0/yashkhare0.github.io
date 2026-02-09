"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight, Github, Star } from "lucide-react"
import { projects } from "@/config/content"
import { MagneticCard } from "@/components/effects/magnetic-card"

interface ProjectsProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function Projects({ onNavigate, isActive, hasBeenVisited }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

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
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    // Featured — clip-path reveal from center
    if (featuredRef.current) {
      tl.fromTo(
        featuredRef.current,
        { opacity: 0, clipPath: "inset(10% 10% 10% 10%)" },
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out" },
        0.25
      )
    }

    // Grid items — flip in from different angles
    if (gridRef.current) {
      const items = gridRef.current.children
      Array.from(items).forEach((item, i) => {
        const angle = i % 2 === 0 ? -90 : 90
        tl.fromTo(
          item,
          { opacity: 0, rotateY: angle, transformOrigin: i % 2 === 0 ? "left center" : "right center" },
          { opacity: 1, rotateY: 0, duration: 0.7, ease: "power3.out" },
          0.4 + i * 0.1
        )
      })
    }
  }, [isActive, hasBeenVisited])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section number */}
        <span ref={numberRef} className="section-number">04</span>

        {/* Heading with count badge */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <div className="flex items-baseline gap-4">
            <h2 className="text-section-heading font-display">
              Projects
            </h2>
            <span
              className="font-mono text-sm px-3 py-1 rounded-full"
              style={{ background: "var(--accent-gold-muted)", color: "var(--accent-gold)" }}
            >
              {projects.length}
            </span>
          </div>
          <p className="font-body text-lg mt-2" style={{ color: "var(--text-secondary)" }}>
            Products I&apos;ve built and shipped
          </p>
        </div>

        {/* Featured project — editorial wide card */}
        {featuredProject && (
          <div
            ref={featuredRef}
            className="card-editorial p-8 sm:p-10 mb-8 opacity-0"
          >
            <div className="relative z-10 grid sm:grid-cols-[1fr_auto] gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Star size={14} style={{ color: "var(--accent-gold)" }} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--accent-gold)" }}>
                    Featured
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  {featuredProject.title}
                </h3>
                <p className="font-body text-base leading-relaxed mb-6 max-w-xl" style={{ color: "var(--text-secondary)" }}>
                  {featuredProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm" style={{ color: "var(--text-tertiary)" }}>
                    {featuredProject.year}
                  </span>
                  {featuredProject.githubUrl && (
                    <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-body text-sm cursor-pointer transition-colors"
                      style={{ color: "var(--accent-gold)" }}>
                      <Github size={14} /> <span>Source</span>
                    </a>
                  )}
                  {featuredProject.liveUrl && (
                    <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-body text-sm cursor-pointer transition-colors"
                      style={{ color: "var(--accent-gold)" }}>
                      <ArrowUpRight size={14} /> <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project grid — editorial layout */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <MagneticCard key={project.id} intensity={6} className="opacity-0">
              <div className="card-editorial p-6 h-full">
                <div className="relative z-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {project.year}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="transition-colors cursor-pointer" style={{ color: "var(--text-tertiary)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>
                          <Github size={15} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="transition-colors cursor-pointer" style={{ color: "var(--text-tertiary)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded"
                        style={{ background: "var(--bg-surface)", color: "var(--text-tertiary)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
}
