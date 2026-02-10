"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Cpu, Code, Users, Github, Flame, Calendar, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { MagneticCard } from "@/components/effects/magnetic-card"

interface AboutProps {
  onNavigate: (section: string) => void
  isActive: boolean
  hasBeenVisited?: boolean
}

const iconMap: Record<string, React.ReactNode> = {
  brain: <Cpu size={22} />,
  code: <Code size={22} />,
  users: <Users size={22} />,
}

// GitHub contribution intensity to gold palette mapping
const LEVEL_COLORS_DARK = [
  "rgba(255,255,255,0.04)",   // level 0 — empty
  "rgba(212,168,67,0.15)",    // level 1
  "rgba(212,168,67,0.35)",    // level 2
  "rgba(212,168,67,0.6)",     // level 3
  "rgba(212,168,67,1)",       // level 4 — full gold
]

const LEVEL_COLORS_LIGHT = [
  "rgba(0,0,0,0.04)",         // level 0
  "rgba(184,146,46,0.15)",    // level 1
  "rgba(184,146,46,0.3)",     // level 2
  "rgba(184,146,46,0.55)",    // level 3
  "rgba(184,146,46,0.85)",    // level 4
]

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface StreakData {
  totalContributions: number
  currentStreak: { length: number; start: string; end: string }
  longestStreak: { length: number; start: string; end: string }
}

export function About({ onNavigate, isActive, hasBeenVisited }: AboutProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const activityRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [ghLoading, setGhLoading] = useState(true)
  const [ghError, setGhError] = useState(false)

  // Fetch GitHub data on mount
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [contribRes, streakRes] = await Promise.allSettled([
          fetch("https://github-contributions-api.jogruber.de/v4/yashkhare0?y=last"),
          fetch("https://github-readme-streak-stats.herokuapp.com/?user=yashkhare0&type=json"),
        ])

        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          const data = await contribRes.value.json()
          setContributions(data.contributions || [])
        }

        if (streakRes.status === "fulfilled" && streakRes.value.ok) {
          const data = await streakRes.value.json()
          setStreakData(data)
        }

        // If at least one succeeded, show the section
        if (
          (contribRes.status === "fulfilled" && contribRes.value.ok) ||
          (streakRes.status === "fulfilled" && streakRes.value.ok)
        ) {
          setGhError(false)
        } else {
          setGhError(true)
        }
      } catch {
        setGhError(true)
      } finally {
        setGhLoading(false)
      }
    }

    fetchGitHub()
  }, [])

  // Get last ~26 weeks of contributions for the heatmap
  const getHeatmapData = () => {
    if (!contributions.length) return []
    const WEEKS = 26
    const totalDays = WEEKS * 7
    const sorted = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    return sorted.slice(-totalDays)
  }

  // Organize into columns (weeks) of 7 rows (days)
  const getHeatmapGrid = () => {
    const data = getHeatmapData()
    if (!data.length) return []

    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    // Pad the first week so it starts on Monday (day 0 = Monday in our grid)
    if (data.length > 0) {
      const firstDay = new Date(data[0].date).getDay()
      // Convert Sunday=0 to our Monday=0 format
      const mondayOffset = firstDay === 0 ? 6 : firstDay - 1
      for (let i = 0; i < mondayOffset; i++) {
        currentWeek.push({ date: "", count: 0, level: -1 }) // placeholder
      }
    }

    for (const day of data) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return weeks
  }

  useEffect(() => {
    if (!isActive || (hasBeenVisited && animatedRef.current)) return
    animatedRef.current = true

    const tl = gsap.timeline({ delay: 0.15 })

    // Section number — clip-path reveal from bottom
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        0
      )
    }

    // Heading — slide from left
    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
    }

    // Text paragraphs — stagger from left with slight rotation
    if (textRef.current) {
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, x: -20, rotateY: -5 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
        0.3
      )
    }

    // Cards — scale in with elastic ease
    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "elastic.out(1, 0.6)" },
        0.5
      )
    }

    // Activity — fade up
    if (activityRef.current) {
      tl.fromTo(
        activityRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        1.0
      )
    }
  }, [isActive, hasBeenVisited])

  const heatmapWeeks = getHeatmapGrid()
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  const levelColors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_DARK // SSR safe, will update on client

  return (
    <section
      ref={sectionRef}
      className="section-viewport"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* Section number watermark */}
        <span ref={numberRef} className="section-number">01</span>

        {/* Heading — editorial style, no gold divider */}
        <div ref={headingRef} className="mb-14 relative opacity-0">
          <h2 className="text-section-heading font-display">
            {t.about.headline}
          </h2>
          <p className="font-body text-lg mt-2" style={{ color: "var(--text-secondary)" }}>
            {t.about.subheadline}
          </p>
        </div>

        {/* Asymmetric content grid */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 mb-16">
          {/* Text column */}
          <div ref={textRef}>
            {t.about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-base leading-[1.8] mb-5 opacity-0"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </p>
            ))}

            {/* Languages */}
            <div className="mt-8 opacity-0">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] mb-4" style={{ color: "var(--text-tertiary)" }}>
                {t.about.languagesHeading}
              </h3>
              <div className="flex flex-wrap gap-3">
                {t.about.languages.map((lang, i) => (
                  <div key={i} className="skill-tag">
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{lang.language}</span>
                    <span style={{ color: "var(--text-tertiary)" }}>/ {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: GitHub activity + highlight cards */}
          <div className="flex flex-col">
            {/* Highlight Cards — magnetic tilt */}
            <div ref={cardsRef} className="space-y-4 order-2 mt-8">
              {t.about.highlights.map((highlight, i) => (
                <MagneticCard key={i} className="opacity-0">
                  <div className="card-editorial p-6">
                    <div className="relative z-20 flex items-start gap-4">
                      <div
                        className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{
                          background: "var(--accent-gold-muted)",
                          color: "var(--accent-gold)",
                        }}
                      >
                        {iconMap[highlight.icon]}
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold mb-1">
                          {highlight.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </MagneticCard>
              ))}
            </div>

            {/* GitHub Activity */}
            <div ref={activityRef} className="opacity-0 order-1">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] mb-6" style={{ color: "var(--text-tertiary)" }}>
                {t.about.githubHeading}
              </h3>

              {ghLoading ? (
                /* Loading skeleton */
                <div className="space-y-4">
                  <div className="flex gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 w-32 rounded-lg animate-pulse"
                        style={{ background: "var(--bg-surface)" }}
                      />
                    ))}
                  </div>
                  <div
                    className="h-24 w-full rounded-lg animate-pulse"
                    style={{ background: "var(--bg-surface)" }}
                  />
                </div>
              ) : ghError ? (
                /* Error state */
                <div
                  className="p-6 rounded-lg border text-center"
                  style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
                >
                  <p className="font-body text-sm mb-3" style={{ color: "var(--text-tertiary)" }}>
                    {t.about.githubUnavailable}
                  </p>
                  <a
                    href="https://github.com/yashkhare0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-sm cursor-pointer"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    <Github size={14} />
                    <span>{t.about.viewOnGithub}</span>
                  </a>
                </div>
              ) : (
                <>
                  {/* Streak Stats */}
                  {streakData && (
                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8">
                      <div>
                        <div
                          className="font-serif text-2xl sm:text-3xl mb-0.5"
                          style={{ color: "var(--accent-gold)" }}
                        >
                          {streakData.totalContributions.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} style={{ color: "var(--text-tertiary)" }} />
                          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                            {t.about.totalContributions}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div
                          className="font-serif text-2xl sm:text-3xl mb-0.5"
                          style={{ color: "var(--accent-gold)" }}
                        >
                          {streakData.currentStreak.length}
                          <span className="text-base ml-1" style={{ color: "var(--text-tertiary)" }}>{t.about.days}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Flame size={11} style={{ color: "var(--text-tertiary)" }} />
                          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                            {t.about.currentStreak}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div
                          className="font-serif text-2xl sm:text-3xl mb-0.5"
                          style={{ color: "var(--accent-gold)" }}
                        >
                          {streakData.longestStreak.length}
                          <span className="text-base ml-1" style={{ color: "var(--text-tertiary)" }}>{t.about.days}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp size={11} style={{ color: "var(--text-tertiary)" }} />
                          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                            {t.about.longestStreak}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contribution Heatmap */}
                  {heatmapWeeks.length > 0 && (
                    <div className="mb-6">
                      <div
                        className="p-4 rounded-lg border overflow-x-auto"
                        style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
                      >
                        <div className="flex gap-[3px]" style={{ minWidth: "fit-content" }}>
                          {heatmapWeeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                              {week.map((day, di) => (
                                <div
                                  key={`${wi}-${di}`}
                                  className="rounded-[2px] transition-colors duration-200"
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    background:
                                      day.level === -1
                                        ? "transparent"
                                        : levelColors[day.level] || levelColors[0],
                                  }}
                                  title={
                                    day.date
                                      ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                                      : undefined
                                  }
                                />
                              ))}
                            </div>
                          ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 mt-3">
                          <span className="font-mono text-[10px]" style={{ color: "var(--text-tertiary)" }}>{t.about.less}</span>
                          {levelColors.map((color, i) => (
                            <div
                              key={i}
                              className="rounded-[2px]"
                              style={{ width: "10px", height: "10px", background: color }}
                            />
                          ))}
                          <span className="font-mono text-[10px]" style={{ color: "var(--text-tertiary)" }}>{t.about.more}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GitHub profile link */}
                  <a
                    href="https://github.com/yashkhare0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-sm cursor-pointer transition-colors"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    <Github size={14} />
                    <span>@yashkhare0 on GitHub</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
