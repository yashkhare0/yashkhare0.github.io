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

const sections: Section[] = ["hero", "about", "experience", "skills", "projects", "blog", "testimonials", "contact"]

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Navigate to a section with smooth morphing transition
  const navigateTo = useCallback(
    async (section: Section) => {
      if (section === currentSection || isTransitioning) return

      setIsTransitioning(true)

      // Smooth fade transition via overlay
      if (overlayRef.current) {
        await gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        })
      }

      // Change section at peak of transition
      setCurrentSection(section)

      // Small delay for React to render new section
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Reveal new section
      if (overlayRef.current) {
        await gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      setIsTransitioning(false)
    },
    [currentSection, isTransitioning]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      const currentIndex = sections.indexOf(currentSection)

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          if (currentIndex < sections.length - 1) {
            navigateTo(sections[currentIndex + 1])
          }
          break
        case "ArrowLeft":
        case "ArrowUp":
          if (currentIndex > 0) {
            navigateTo(sections[currentIndex - 1])
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
      if (num >= 1 && num <= sections.length) {
        navigateTo(sections[num - 1])
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

      const currentIndex = sections.indexOf(currentSection)

      if (e.deltaY > 50 && currentIndex < sections.length - 1) {
        canNavigate = false
        navigateTo(sections[currentIndex + 1])
        wheelTimeout = setTimeout(() => { canNavigate = true }, 1200)
      } else if (e.deltaY < -50 && currentIndex > 0) {
        canNavigate = false
        navigateTo(sections[currentIndex - 1])
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
      const currentIndex = sections.indexOf(currentSection)

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
        if (diff > 0 && currentIndex < sections.length - 1) {
          navigateTo(sections[currentIndex + 1])
        } else if (diff < 0 && currentIndex > 0) {
          navigateTo(sections[currentIndex - 1])
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

  // Wrapper for child components
  const handleNavigate = (section: string) => {
    if (sections.includes(section as Section)) {
      navigateTo(section as Section)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Current Section */}
      {currentSection === "hero" && (
        <Hero onNavigate={handleNavigate} isActive={currentSection === "hero"} />
      )}
      {currentSection === "about" && (
        <About onNavigate={handleNavigate} isActive={currentSection === "about"} />
      )}
      {currentSection === "experience" && (
        <Experience onNavigate={handleNavigate} isActive={currentSection === "experience"} />
      )}
      {currentSection === "skills" && (
        <Skills onNavigate={handleNavigate} isActive={currentSection === "skills"} />
      )}
      {currentSection === "projects" && (
        <Projects onNavigate={handleNavigate} isActive={currentSection === "projects"} />
      )}
      {currentSection === "blog" && (
        <BlogPreview onNavigate={handleNavigate} isActive={currentSection === "blog"} />
      )}
      {currentSection === "testimonials" && (
        <Testimonials onNavigate={handleNavigate} isActive={currentSection === "testimonials"} />
      )}
      {currentSection === "contact" && (
        <Contact onNavigate={handleNavigate} isActive={currentSection === "contact"} />
      )}

      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 pointer-events-none opacity-0"
        style={{ background: "var(--bg-primary)" }}
      />

      {/* Section indicator */}
      <div className="fixed top-5 sm:top-6 left-5 sm:left-6 z-50 flex items-center gap-2.5">
        <div
          className="w-2 h-2 rounded-full animate-pulse-gold"
          style={{ backgroundColor: "var(--accent-gold)" }}
        />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {currentSection}
        </span>
      </div>

      {/* Section navigation dots */}
      <SectionNav
        sections={sections}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        disabled={isTransitioning}
      />
    </div>
  )
}
