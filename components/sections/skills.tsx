"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { skills, skillCategories } from "@/config/content"

const categoryLabelMap: Record<string, string> = {
  ai_llm: "AI / LLM",
  ml_data: "ML / Data",
  backend: "Backend",
  infra: "Infra",
  frontend: "Frontend",
}

interface SkillsProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function Skills({ onNavigate, isActive }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory)

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

    if (tabsRef.current) {
      tl.fromTo(
        tabsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
        0.3
      )
    }
  }, [isActive])

  // Animate grid on category change
  useEffect(() => {
    if (!gridRef.current) return

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power3.out" }
    )
  }, [activeCategory])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section heading */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <div className="divider-gold mb-4" />
          <h2 className="text-section-heading font-display mb-2">
            Tech Stack
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            Technologies I work with daily
          </p>
        </div>

        {/* Category tabs */}
        <div
          ref={tabsRef}
          className="flex flex-wrap gap-2 mb-10"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                background:
                  activeCategory === cat.key
                    ? "var(--accent-gold)"
                    : "var(--bg-surface)",
                color:
                  activeCategory === cat.key
                    ? "var(--text-inverse)"
                    : "var(--text-secondary)",
                borderColor:
                  activeCategory === cat.key
                    ? "var(--accent-gold)"
                    : "var(--border-subtle)",
                border: "1px solid",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group relative p-4 rounded-lg border text-center transition-all duration-300 cursor-default"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = "var(--border-gold)"
                el.style.boxShadow = "var(--shadow-gold)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = "var(--border-subtle)"
                el.style.boxShadow = "none"
              }}
            >
              <span className="font-body text-sm font-medium block" style={{ color: "var(--text-primary)" }}>
                {skill.name}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-wider mt-1 block"
                style={{ color: "var(--text-tertiary)" }}
              >
                {categoryLabelMap[skill.category] || skill.category}
              </span>
            </div>
          ))}
        </div>

        {/* Skill count */}
        <div className="mt-8 text-center">
          <span className="font-mono text-sm" style={{ color: "var(--text-tertiary)" }}>
            {filteredSkills.length} technologies
            {activeCategory !== "all" && ` in ${skillCategories.find((c) => c.key === activeCategory)?.label}`}
          </span>
        </div>
      </div>
    </section>
  )
}
