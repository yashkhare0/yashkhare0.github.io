"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight, Clock, Calendar } from "lucide-react"
import { blogPosts } from "@/config/content"
import { MagneticCard } from "@/components/effects/magnetic-card"

interface BlogPreviewProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

export function BlogPreview({ onNavigate, isActive, hasBeenVisited }: BlogPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
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

    // Heading — clip-path from left
    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" },
        0.1
      )
    }

    // Cards — stagger from different directions
    if (gridRef.current) {
      const items = gridRef.current.children
      Array.from(items).forEach((item, i) => {
        const directions = [
          { x: -40, y: 0 },     // from left
          { x: 0, y: 40 },      // from bottom
          { x: 40, y: 0 },      // from right
        ]
        const dir = directions[i % directions.length]
        tl.fromTo(
          item,
          { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" },
          0.3 + i * 0.12
        )
      })
    }
  }, [isActive, hasBeenVisited])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section number */}
        <span ref={numberRef} className="section-number">05</span>

        {/* Heading — no divider, serif accent */}
        <div ref={headingRef} className="mb-14 opacity-0">
          <h2 className="text-section-heading font-display">
            Writing
          </h2>
          <p className="font-body text-lg mt-2" style={{ color: "var(--text-secondary)" }}>
            Thoughts on AI, engineering, and building products
          </p>
        </div>

        {/* Blog grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <MagneticCard key={post.id} intensity={5} className="opacity-0">
              <article className="card-editorial p-6 h-full group cursor-pointer">
                <div className="relative z-20">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          background: "var(--accent-gold-muted)",
                          color: "var(--accent-gold)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--accent-gold)]">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="font-body text-sm leading-relaxed mb-4 line-clamp-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5" style={{ color: "var(--text-tertiary)" }}>
                        <Calendar size={12} />
                        <span className="font-mono text-xs">{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5" style={{ color: "var(--text-tertiary)" }}>
                        <Clock size={12} />
                        <span className="font-mono text-xs">{post.readingTime}</span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--accent-gold)" }}
                    />
                  </div>
                </div>
              </article>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
}
