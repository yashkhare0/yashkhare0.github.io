"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight, Github, Star } from "lucide-react"
import { projects } from "@/config/content"

interface ProjectsProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function Projects({ onNavigate, isActive }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

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

    if (featuredRef.current) {
      tl.fromTo(
        featuredRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        0.3
      )
    }

    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        0.6
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
            Projects
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            Products I&apos;ve built and shipped
          </p>
        </div>

        {/* Featured project */}
        {featuredProject && (
          <div
            ref={featuredRef}
            className="card-cinematic p-8 mb-8 opacity-0"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Star size={16} style={{ color: "var(--accent-gold)" }} />
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Featured Project
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {featuredProject.title}
              </h3>
              <p
                className="font-body text-base leading-relaxed mb-6 max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {featuredProject.year}
                </span>
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-sm transition-colors cursor-pointer"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    <Github size={14} />
                    <span>Source</span>
                  </a>
                )}
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-sm transition-colors cursor-pointer"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    <ArrowUpRight size={14} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other projects grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="card-cinematic p-6 opacity-0 cursor-pointer"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {project.year}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        style={{ color: "var(--text-tertiary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        style={{ color: "var(--text-tertiary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold mb-2">
                  {project.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded"
                      style={{
                        background: "var(--bg-surface)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
