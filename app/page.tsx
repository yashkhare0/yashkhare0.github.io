"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { BlogPreview } from "@/components/sections/blog-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { Contact } from "@/components/sections/contact"
import { SectionNav } from "@/components/navigation/section-nav"

type Section = "hero" | "about" | "experience" | "skills" | "projects" | "blog" | "testimonials" | "contact"

const sectionList: Section[] = ["hero", "about", "experience", "skills", "projects", "blog", "testimonials", "contact"]

function SectionRenderer({
  section,
  onNavigate,
  isActive,
  hasBeenVisited,
}: {
  section: Section
  onNavigate: (s: string) => void
  isActive: boolean
  hasBeenVisited: boolean
}) {
  const props = { onNavigate, isActive, hasBeenVisited }
  switch (section) {
    case "hero": return <Hero {...props} />
    case "about": return <About {...props} />
    case "experience": return <Experience {...props} />
    case "skills": return <Skills {...props} />
    case "projects": return <Projects {...props} />
    case "blog": return <BlogPreview {...props} />
    case "testimonials": return <Testimonials {...props} />
    case "contact": return <Contact {...props} />
  }
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("hero")
  const [displayedSection, setDisplayedSection] = useState<Section>("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visitedSections, setVisitedSections] = useState<Set<Section>>(new Set(["hero"]))
  const containerRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)

  // Navigate to a section with diagonal clip-path wipe
  const navigateTo = useCallback(
    async (section: Section) => {
      if (section === currentSection || isTransitioning) return

      setIsTransitioning(true)

      const currentIndex = sectionList.indexOf(currentSection)
      const targetIndex = sectionList.indexOf(section)
      const goingForward = targetIndex > currentIndex

      // Phase 1: Wipe covers the screen — old section still visible underneath
      if (wipeRef.current) {
        gsap.set(wipeRef.current, {
          clipPath: goingForward
            ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
            : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          opacity: 1,
        })

        await gsap.to(wipeRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.4,
          ease: "power3.inOut",
        })
      }

      // Phase 2: Screen is fully covered — safe to swap sections
      setVisitedSections((prev) => new Set(prev).add(section))
      setCurrentSection(section)
      setDisplayedSection(section)

      // Let React render the new section behind the wipe
      await new Promise((resolve) => setTimeout(resolve, 80))

      // Phase 3: Wipe reveals the new section
      if (wipeRef.current) {
        await gsap.to(wipeRef.current, {
          clipPath: goingForward
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          duration: 0.4,
          ease: "power3.inOut",
        })

        gsap.set(wipeRef.current, { opacity: 0 })
      }

      setIsTransitioning(false)
    },
    [currentSection, isTransitioning]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      const currentIndex = sectionList.indexOf(currentSection)

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          if (currentIndex < sectionList.length - 1) {
            navigateTo(sectionList[currentIndex + 1])
          }
          break
        case "ArrowLeft":
        case "ArrowUp":
          if (currentIndex > 0) {
            navigateTo(sectionList[currentIndex - 1])
          }
          break
        case "Home":
          navigateTo("hero")
          break
        case "End":
          navigateTo("contact")
          break
      }

      // Number keys 1-8
      const num = parseInt(e.key)
      if (num >= 1 && num <= sectionList.length) {
        navigateTo(sectionList[num - 1])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, isTransitioning, navigateTo])

  // Wheel navigation with debounce
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>
    let canNavigate = true

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || !canNavigate) return

      // Check if section has scrollable content
      const sectionEl = document.querySelector(".section-viewport") as HTMLElement
      if (sectionEl) {
        const { scrollTop, scrollHeight, clientHeight } = sectionEl
        const isAtTop = scrollTop <= 5
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
        const hasScrollableContent = scrollHeight > clientHeight + 10

        if (hasScrollableContent) {
          if (e.deltaY > 0 && !isAtBottom) return
          if (e.deltaY < 0 && !isAtTop) return
        }
      }

      const currentIndex = sectionList.indexOf(currentSection)

      if (e.deltaY > 50 && currentIndex < sectionList.length - 1) {
        canNavigate = false
        navigateTo(sectionList[currentIndex + 1])
        wheelTimeout = setTimeout(() => { canNavigate = true }, 1200)
      } else if (e.deltaY < -50 && currentIndex > 0) {
        canNavigate = false
        navigateTo(sectionList[currentIndex - 1])
        wheelTimeout = setTimeout(() => { canNavigate = true }, 1200)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(wheelTimeout)
    }
  }, [currentSection, isTransitioning, navigateTo])

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartY = 0
    let touchStartScrollTop = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      const sectionEl = document.querySelector(".section-viewport") as HTMLElement
      touchStartScrollTop = sectionEl?.scrollTop || 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY
      const currentIndex = sectionList.indexOf(currentSection)

      const sectionEl = document.querySelector(".section-viewport") as HTMLElement
      if (sectionEl) {
        const { scrollTop, scrollHeight, clientHeight } = sectionEl
        const isAtTop = scrollTop <= 5
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
        const hasScrollableContent = scrollHeight > clientHeight + 10
        const didScroll = Math.abs(scrollTop - touchStartScrollTop) > 10

        if (hasScrollableContent && didScroll) return
        if (hasScrollableContent) {
          if (diff > 0 && !isAtBottom) return
          if (diff < 0 && !isAtTop) return
        }
      }

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < sectionList.length - 1) {
          navigateTo(sectionList[currentIndex + 1])
        } else if (diff < 0 && currentIndex > 0) {
          navigateTo(sectionList[currentIndex - 1])
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, isTransitioning, navigateTo])

  const handleNavigate = (section: string) => {
    if (sectionList.includes(section as Section)) {
      navigateTo(section as Section)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Displayed section — stays mounted until wipe fully covers */}
      <SectionRenderer
        section={displayedSection}
        onNavigate={handleNavigate}
        isActive={displayedSection === currentSection}
        hasBeenVisited={visitedSections.has(displayedSection) && displayedSection !== currentSection}
      />

      {/* Diagonal wipe transition overlay */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-40 pointer-events-none opacity-0"
        style={{ background: "var(--bg-primary)" }}
      />

      {/* Section indicator */}
      <div className="fixed top-5 sm:top-6 left-5 sm:left-6 z-50 flex items-center gap-2.5">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {String(sectionList.indexOf(currentSection) + 1).padStart(2, "0")} / {String(sectionList.length).padStart(2, "0")}
        </span>
      </div>

      {/* Section navigation */}
      <SectionNav
        sections={sectionList}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        disabled={isTransitioning}
      />
    </div>
  )
}
