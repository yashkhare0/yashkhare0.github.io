"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { skills, skillCategories } from "@/config/content"
import { MagneticCard } from "@/components/effects/magnetic-card"

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
  hasBeenVisited?: boolean
}

export function Skills({ onNavigate, isActive, hasBeenVisited }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const animatedRef = useRef(false)

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  useEffect(() => {
    if (!isActive || (hasBeenVisited && animatedRef.current)) return
    animatedRef.current = true

    const tl = gsap.timeline({ delay: 0.15 })

    // Number watermark
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

    // Tabs
    if (tabsRef.current) {
      tl.fromTo(
        tabsRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out" },
        0.3
      )
    }

    // Grid — scatter-assemble: start from random positions
    if (gridRef.current) {
      const items = gridRef.current.children
      Array.from(items).forEach((item) => {
        const rx = (Math.random() - 0.5) * 60
        const ry = (Math.random() - 0.5) * 60
        const rs = 0.5 + Math.random() * 0.3
        gsap.set(item, { opacity: 0, x: rx, y: ry, scale: rs, rotation: (Math.random() - 0.5) * 15 })
      })
      tl.to(
        items,
        { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.7, stagger: 0.02, ease: "elastic.out(1, 0.7)" },
        0.4
      )
    }
  }, [isActive, hasBeenVisited])

  // Animate grid on category change
  useEffect(() => {
    if (!gridRef.current) return

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, scale: 0.85, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.02, ease: "power3.out" }
    )
  }, [activeCategory])

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section number */}
        <span ref={numberRef} className="section-number">03</span>

        {/* Heading with inline count */}
        <div ref={headingRef} className="mb-10 opacity-0">
          <div className="flex items-baseline gap-4">
            <h2 className="text-section-heading font-display">
              Tech Stack
            </h2>
            <span
              className="font-mono text-sm px-3 py-1 rounded-full"
              style={{
                background: "var(--accent-gold-muted)",
                color: "var(--accent-gold)",
              }}
            >
              {skills.length}
            </span>
          </div>
          <p className="font-body text-lg mt-2" style={{ color: "var(--text-secondary)" }}>
            Technologies I work with daily
          </p>
        </div>

        {/* Category tabs */}
        <div ref={tabsRef} className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 cursor-pointer border"
              style={{
                background: activeCategory === cat.key ? "var(--accent-gold)" : "transparent",
                color: activeCategory === cat.key ? "var(--text-inverse)" : "var(--text-secondary)",
                borderColor: activeCategory === cat.key ? "var(--accent-gold)" : "var(--border-default)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid — magnetic cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filteredSkills.map((skill) => (
            <MagneticCard key={skill.name} intensity={5} className="opacity-0">
              <div
                className="card-editorial p-4 text-center cursor-default"
              >
                <span className="font-body text-sm font-medium block relative z-20" style={{ color: "var(--text-primary)" }}>
                  {skill.name}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-wider mt-1 block relative z-20"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {categoryLabelMap[skill.category] || skill.category}
                </span>
              </div>
            </MagneticCard>
          ))}
        </div>

        {/* Filtered count */}
        <div className="mt-8">
          <span className="font-mono text-sm" style={{ color: "var(--text-tertiary)" }}>
            {filteredSkills.length} technologies
            {activeCategory !== "all" && ` in ${skillCategories.find((c) => c.key === activeCategory)?.label}`}
          </span>
        </div>
      </div>
    </section>
  )
}
