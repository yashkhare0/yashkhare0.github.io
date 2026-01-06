"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Labrador } from "@/components/labrador/labrador";
import { TriangleAccent } from "@/components/transitions/geometric-transition";
import { aboutContent } from "@/config/content";

interface AboutProps {
  onNavigate?: (section: string) => void;
  isActive?: boolean;
}

export function About({ onNavigate, isActive = false }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !contentRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Title reveal
    const title = contentRef.current.querySelector("h2");
    if (title) {
      tl.fromTo(
        title,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    // Paragraph reveal
    const paragraphs = contentRef.current.querySelectorAll("p");
    tl.fromTo(
      paragraphs,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    );

    // Cards reveal with stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      tl.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      );
    }
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      data-section="about"
      className="section-viewport"
      style={{
        backgroundColor: "var(--deep-indigo)",
        color: "var(--cream-white)",
      }}
    >
      {/* Accent shape */}
      <TriangleAccent
        position="bottom-left"
        color="var(--golden-hour)"
        size={250}
        onClick={() => onNavigate?.("hero")}
        interactive
      />

      {/* Hexagon decoration */}
      <div
        className="absolute top-20 right-20 w-32 h-32 opacity-20 hexagon"
        style={{ backgroundColor: "var(--golden-hour)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div ref={contentRef} className="space-y-8">
            {/* Section label */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-[2px]"
                style={{ backgroundColor: "var(--golden-hour)" }}
              />
              <span
                className="text-sm uppercase tracking-[0.3em] font-body"
                style={{ color: "var(--golden-hour)" }}
              >
                About
              </span>
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display leading-tight">
              {aboutContent.headline.prefix}
              <br />
              <span style={{ color: "var(--golden-hour)" }}>{aboutContent.headline.highlight}</span>
            </h2>

            {/* Description */}
            <p className="text-xl font-body leading-relaxed opacity-80">
              {aboutContent.intro}
            </p>

            <p className="text-lg font-body leading-relaxed opacity-60">
              {aboutContent.description}
            </p>
          </div>

          {/* Visual side with dog */}
          <div className="relative flex items-center justify-center">
            {/* Geometric frame */}
            <div
              className="relative w-72 h-80 md:w-80 md:h-96"
              style={{
                border: "3px solid var(--golden-hour)",
                transform: "rotate(3deg)",
              }}
            >
              {/* Inner content */}
              <div
                className="absolute inset-4 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 179, 71, 0.1)",
                }}
              >
                <Labrador pose="sitting" size={150} followCursor />
              </div>

              {/* Corner accents */}
              <div
                className="absolute -top-2 -left-2 w-6 h-6"
                style={{ backgroundColor: "var(--golden-hour)" }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-6 h-6"
                style={{ backgroundColor: "var(--golden-hour)" }}
              />
            </div>

            {/* Floating label */}
            <div
              className="absolute -bottom-4 right-0 px-4 py-2 font-mono text-sm"
              style={{
                backgroundColor: "var(--golden-hour)",
                color: "var(--deep-indigo)",
                transform: "rotate(-3deg)",
              }}
            >
              My companion ♥
            </div>
          </div>
        </div>

        {/* Trait cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mt-20">
          {aboutContent.traits.map((trait, i) => (
            <div
              key={trait.title}
              className="geo-card p-8 group"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110"
                style={{ color: "var(--golden-hour)" }}
              >
                {trait.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-display mb-4">{trait.title}</h3>

              {/* Description */}
              <p className="font-body text-sm leading-relaxed opacity-70">
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {["hero", "about", "skills", "projects", "contact"].map((section, i) => (
          <button
            key={section}
            onClick={() => onNavigate?.(section)}
            className={`nav-dot ${section === "about" ? "active" : ""}`}
            style={{
              borderColor: "var(--cream-white)",
              backgroundColor: section === "about" ? "var(--golden-hour)" : "transparent",
            }}
            aria-label={`Go to ${section}`}
          />
        ))}
      </div>
    </section>
  );
}
