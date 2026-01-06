"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Labrador } from "@/components/labrador/labrador";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [showDog, setShowDog] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Immediately disable pointer events before fading
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = "none";
        }
        // Fade out the intro
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Animate the name text
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".intro-char");

      // Initial state
      gsap.set(chars, {
        y: 50,
        opacity: 0,
        rotateX: -90,
      });

      // Reveal name
      tl.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.5)",
        delay: 0.3,
      });

      // Show dog
      tl.add(() => setShowDog(true), "-=0.2");

      // Hold
      tl.to({}, { duration: 0.8 });

      // Slide everything up
      tl.to(containerRef.current, {
        y: "-100%",
        duration: 0.7,
        ease: "power3.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const name = "YASH KHARE";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--warm-black)" }}
    >
      {/* Geometric background lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
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

      {/* Name */}
      <div
        ref={textRef}
        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
        style={{ color: "var(--cream-white)", perspective: "1000px" }}
      >
        {name.split("").map((char, i) => (
          <span
            key={i}
            className="intro-char inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Underline */}
      <div
        className="w-24 h-1 mt-4"
        style={{
          backgroundColor: "var(--sunset-coral)",
          transform: "skewX(-20deg)",
        }}
      />

      {/* Dog */}
      <div
        className={`mt-8 transition-all duration-500 ${
          showDog ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <Labrador pose="sleeping" size={80} />
      </div>

      {/* Triangle accent */}
      <div
        className="absolute top-0 right-0 w-48 h-48"
        style={{
          backgroundColor: "var(--sunset-coral)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48"
        style={{
          backgroundColor: "var(--sunset-coral)",
          clipPath: "polygon(0 0, 0 100%, 100% 100%)",
        }}
      />
    </div>
  );
}
