"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import {
  GeometricTransition,
  TransitionHandle,
} from "@/components/transitions/geometric-transition";
import { SpeedLines } from "@/components/transitions/speed-lines";
import { IntroAnimation } from "@/components/loading/intro-animation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const sections: Section[] = ["hero", "about", "skills", "projects", "contact"];

const sectionColors: Record<Section, string> = {
  hero: "#121212", // warm-black
  about: "#1a1a3e", // deep-indigo
  skills: "#FFF8F0", // cream-white
  projects: "#1C1917", // charcoal
  contact: "#FF7356", // sunset-coral
};

const transitionAccents: Record<Section, string> = {
  hero: "#FF7356", // sunset-coral
  about: "#FFB347", // golden-hour
  skills: "#00D4FF", // electric-cyan
  projects: "#FF8FA3", // sakura-pink
  contact: "#121212", // warm-black
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("hero");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const transitionRef = useRef<TransitionHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigate to a section
  const navigateTo = useCallback(
    async (section: Section) => {
      if (section === currentSection || isTransitioning) return;

      setIsTransitioning(true);
      setShowSpeedLines(true);

      // Determine direction based on section index
      const currentIndex = sections.indexOf(currentSection);
      const targetIndex = sections.indexOf(section);
      const direction = targetIndex > currentIndex ? "right" : "left";

      // Play transition
      if (transitionRef.current) {
        await transitionRef.current.play(transitionAccents[section]);
      }

      // Wait a moment at full coverage
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Change section
      setCurrentSection(section);

      // Hide speed lines
      setShowSpeedLines(false);

      // Reverse transition to reveal new section
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (transitionRef.current) {
        await transitionRef.current.reverse();
      }

      setIsTransitioning(false);
    },
    [currentSection, isTransitioning]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      const currentIndex = sections.indexOf(currentSection);

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          if (currentIndex < sections.length - 1) {
            navigateTo(sections[currentIndex + 1]);
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
          if (currentIndex > 0) {
            navigateTo(sections[currentIndex - 1]);
          }
          break;
        case "1":
          navigateTo("hero");
          break;
        case "2":
          navigateTo("about");
          break;
        case "3":
          navigateTo("skills");
          break;
        case "4":
          navigateTo("projects");
          break;
        case "5":
          navigateTo("contact");
          break;
        case "Home":
          navigateTo("hero");
          break;
        case "End":
          navigateTo("contact");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, isTransitioning, navigateTo]);

  // Wheel navigation (with debounce) - allows internal scrolling within sections
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    let canNavigate = true;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || !canNavigate) return;

      // Find the scrollable section container
      const sectionEl = document.querySelector('[data-section]') as HTMLElement;
      
      if (sectionEl) {
        const { scrollTop, scrollHeight, clientHeight } = sectionEl;
        const isAtTop = scrollTop <= 5;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const hasScrollableContent = scrollHeight > clientHeight + 10;

        // If section has scrollable content, allow internal scrolling
        if (hasScrollableContent) {
          // Scrolling down but not at bottom - let section scroll
          if (e.deltaY > 0 && !isAtBottom) {
            return;
          }
          // Scrolling up but not at top - let section scroll
          if (e.deltaY < 0 && !isAtTop) {
            return;
          }
        }
      }

      const currentIndex = sections.indexOf(currentSection);

      if (e.deltaY > 50 && currentIndex < sections.length - 1) {
        canNavigate = false;
        navigateTo(sections[currentIndex + 1]);
        wheelTimeout = setTimeout(() => {
          canNavigate = true;
        }, 1500);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        canNavigate = false;
        navigateTo(sections[currentIndex - 1]);
        wheelTimeout = setTimeout(() => {
          canNavigate = true;
        }, 1500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isTransitioning, navigateTo]);

  // Touch/swipe navigation - allows internal scrolling within sections
  useEffect(() => {
    let touchStartY = 0;
    let touchStartScrollTop = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      
      // Store current scroll position of section
      const sectionEl = document.querySelector('[data-section]') as HTMLElement;
      touchStartScrollTop = sectionEl?.scrollTop || 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const currentIndex = sections.indexOf(currentSection);
      
      // Find the scrollable section container
      const sectionEl = document.querySelector('[data-section]') as HTMLElement;

      if (sectionEl) {
        const { scrollTop, scrollHeight, clientHeight } = sectionEl;
        const isAtTop = scrollTop <= 5;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const hasScrollableContent = scrollHeight > clientHeight + 10;
        
        // Check if the section actually scrolled during this touch
        const didScroll = Math.abs(scrollTop - touchStartScrollTop) > 10;

        // If section has scrollable content and it scrolled, don't navigate
        if (hasScrollableContent && didScroll) {
          return;
        }

        // If section has scrollable content, only navigate at boundaries
        if (hasScrollableContent) {
          // Swiping up (going to next) but not at bottom - don't navigate
          if (diff > 0 && !isAtBottom) {
            return;
          }
          // Swiping down (going to previous) but not at top - don't navigate
          if (diff < 0 && !isAtTop) {
            return;
          }
        }
      }

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < sections.length - 1) {
          navigateTo(sections[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
          navigateTo(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isTransitioning, navigateTo]);

  // Section content animation on change
  useEffect(() => {
    if (!containerRef.current) return;

    // Fade in new section content
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [currentSection]);

  // Wrapper to handle string -> Section type conversion for child components
  const handleNavigate = (section: string) => {
    if (sections.includes(section as Section)) {
      navigateTo(section as Section);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Current Section */}
      {currentSection === "hero" && (
        <Hero onNavigate={handleNavigate} isActive={currentSection === "hero" && !showIntro} />
      )}
      {currentSection === "about" && (
        <About onNavigate={handleNavigate} isActive={currentSection === "about"} />
      )}
      {currentSection === "skills" && (
        <Skills onNavigate={handleNavigate} isActive={currentSection === "skills"} />
      )}
      {currentSection === "projects" && (
        <Projects onNavigate={handleNavigate} isActive={currentSection === "projects"} />
      )}
      {currentSection === "contact" && (
        <Contact onNavigate={handleNavigate} isActive={currentSection === "contact"} />
      )}

      {/* Geometric Transition Overlay */}
      <GeometricTransition
        ref={transitionRef}
        shape="diagonal"
        direction="right"
        color={transitionAccents[currentSection]}
      />

      {/* Speed Lines Effect */}
      <SpeedLines
        isActive={showSpeedLines}
        direction="right"
        color={sectionColors[currentSection] === "#FFF8F0" ? "#121212" : "#FFF8F0"}
        count={25}
        duration={0.6}
      />

      {/* Section indicator */}
      <div className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-40 flex items-center gap-2 sm:gap-3">
        <div
          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse"
          style={{ backgroundColor: transitionAccents[currentSection] }}
        />
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body"
          style={{
            color: sectionColors[currentSection] === "#FFF8F0" ? "#121212" : "#FFF8F0",
          }}
        >
          {currentSection}
        </span>
      </div>

      {/* Theme toggle - fixed in header */}
      <div 
        className="fixed top-4 sm:top-6 md:top-8 right-16 sm:right-20 md:right-24 z-40"
        style={{
          color: sectionColors[currentSection] === "#FFF8F0" ? "#121212" : "#FFF8F0",
        }}
      >
        <ThemeToggle />
      </div>

      {/* Progress indicator */}
      <div className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 sm:gap-2">
        {sections.map((section, i) => (
          <button
            key={section}
            onClick={() => navigateTo(section)}
            className="group relative w-3 h-6 sm:h-8 flex items-center justify-center"
            disabled={isTransitioning}
            aria-label={`Go to ${section}`}
          >
            <div
              className="w-[2px] h-full transition-all duration-300"
              style={{
                backgroundColor:
                  currentSection === section
                    ? transitionAccents[currentSection]
                    : sectionColors[currentSection] === "#FFF8F0"
                    ? "rgba(18, 18, 18, 0.2)"
                    : "rgba(255, 248, 240, 0.2)",
              }}
            />
            {/* Active indicator */}
            {currentSection === section && (
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                style={{ backgroundColor: transitionAccents[currentSection] }}
              />
            )}
            {/* Tooltip on hover - hidden on mobile */}
            <span
              className="absolute right-6 px-2 py-1 text-xs font-body capitalize opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block"
              style={{
                backgroundColor: transitionAccents[currentSection],
                color: "#121212",
              }}
            >
              {section}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
