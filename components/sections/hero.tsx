"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Labrador } from "@/components/labrador/labrador";
import { TriangleAccent } from "@/components/transitions/geometric-transition";
import { heroContent } from "@/config/content";

interface HeroProps {
  onNavigate?: (section: string) => void;
  isActive?: boolean;
}

export function Hero({ onNavigate, isActive = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const [dogPose, setDogPose] = useState<"sleeping" | "sitting" | "curious">("sleeping");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initial animation
  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Name reveal with slash effect
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }

    // CTA buttons
    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      tl.fromTo(
        buttons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );
    }

    // Dog appears
    if (dogRef.current) {
      tl.fromTo(
        dogRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
        "-=0.3"
      );
    }
  }, [isActive]);

  // Listen for any interaction to wake up dog
  useEffect(() => {
    if (hasInteracted) return;

    const handleInteraction = () => {
      setHasInteracted(true);
      setDogPose("sitting");

      // After a moment, become curious
      setTimeout(() => {
        setDogPose("curious");
      }, 2000);
    };

    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted]);

  // Split name into characters for animation - two lines
  const firstName = heroContent.firstName.split("").map((char, i) => (
    <span key={`first-${i}`} className="char inline-block">
      {char}
    </span>
  ));
  
  const lastName = heroContent.lastName.split("").map((char, i) => (
    <span key={`last-${i}`} className="char inline-block">
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="section-viewport center-content"
      style={{
        backgroundColor: "var(--warm-black)",
        color: "var(--cream-white)",
      }}
    >
      {/* Triangle accent - clickable to navigate */}
      <TriangleAccent
        position="top-right"
        color="var(--sunset-coral)"
        size={300}
        onClick={() => onNavigate?.("about")}
        interactive
      />

      {/* Diagonal lines background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 39px,
            var(--cream-white) 39px,
            var(--cream-white) 40px
          )`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-start">
          {/* Name */}
          <h1
            ref={nameRef}
            className="text-giant font-display leading-[0.85] tracking-tighter"
            style={{ perspective: "1000px" }}
          >
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </h1>

          {/* Diagonal underline */}
          <div
            className="w-24 sm:w-36 md:w-48 h-0.5 sm:h-1 mt-3 sm:mt-4 mb-6 sm:mb-8"
            style={{
              backgroundColor: "var(--sunset-coral)",
              transform: "skewX(-20deg)",
            }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-body max-w-2xl leading-relaxed opacity-80"
          >
            {heroContent.tagline.prefix}{" "}
            <span style={{ color: heroContent.tagline.highlights[0].color }}>
              {heroContent.tagline.highlights[0].text}
            </span>{" "}
            and{" "}
            <span style={{ color: heroContent.tagline.highlights[1].color }}>
              {heroContent.tagline.highlights[1].text}
            </span>
            {heroContent.tagline.suffix}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={() => onNavigate?.(heroContent.cta.primary.section)}
              className="btn-geometric text-sm sm:text-base"
              style={{
                backgroundColor: "var(--cream-white)",
                color: "var(--warm-black)",
              }}
            >
              {heroContent.cta.primary.label}
            </button>
            <button
              onClick={() => onNavigate?.(heroContent.cta.secondary.section)}
              className="btn-outline text-sm sm:text-base"
              style={{
                borderColor: "var(--cream-white)",
                color: "var(--cream-white)",
              }}
            >
              {heroContent.cta.secondary.label}
            </button>
          </div>
        </div>

        {/* Labrador - positioned at bottom right */}
        <div
          ref={dogRef}
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-16 md:right-16 lg:bottom-24 lg:right-24 scale-75 sm:scale-100"
        >
          <Labrador
            pose={dogPose}
            size={120}
            followCursor={hasInteracted}
            onInteract={() => {
              setDogPose("curious");
              setTimeout(() => setDogPose("sitting"), 1500);
            }}
          />
          {/* Speech bubble on first wake */}
          {hasInteracted && dogPose === "sitting" && (
            <div
              className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-body whitespace-nowrap animate-overshoot-in"
              style={{
                backgroundColor: "var(--cream-white)",
                color: "var(--warm-black)",
              }}
            >
              *wakes up* 🐕
            </div>
          )}
        </div>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-50 font-body">
          Navigate
        </span>
        <div className="flex gap-2 sm:gap-3">
          {["about", "skills", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => onNavigate?.(section)}
              className="nav-dot w-2.5 h-2.5 sm:w-3 sm:h-3"
              style={{ borderColor: "var(--cream-white)" }}
              aria-label={`Go to ${section}`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 text-[10px] sm:text-xs opacity-30 font-mono hidden md:block">
        Press 1-5 or ←→
      </div>
    </section>
  );
}
