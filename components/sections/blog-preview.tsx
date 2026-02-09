"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight, Clock, Calendar } from "lucide-react"
import { blogPosts } from "@/config/content"

interface BlogPreviewProps {
  onNavigate: (section: string) => void
  isActive: boolean
}

export function BlogPreview({ onNavigate, isActive }: BlogPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        0.3
      )
    }
  }, [isActive])

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
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <div className="divider-gold mb-4" />
          <h2 className="text-section-heading font-display mb-2">
            Blog
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--text-secondary)" }}>
            Thoughts on AI, engineering, and building products
          </p>
        </div>

        {/* Blog grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="card-cinematic p-6 opacity-0 cursor-pointer group"
            >
              <div className="relative z-10">
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
                <h3 className="font-display text-lg font-bold mb-3 transition-colors group-hover:text-[var(--accent-gold)]">
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
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--accent-gold)" }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
