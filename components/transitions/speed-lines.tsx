"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SpeedLinesProps {
  isActive: boolean;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
  count?: number;
  duration?: number;
}

export function SpeedLines({
  isActive,
  direction = "right",
  color = "currentColor",
  count = 20,
  duration = 0.5,
}: SpeedLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) {
      linesRef.current.forEach((line, i) => {
        if (!line) return;

        const isHorizontal = direction === "left" || direction === "right";
        const delay = i * 0.015;

        gsap.fromTo(
          line,
          {
            [isHorizontal ? "scaleX" : "scaleY"]: 0,
            opacity: 0,
          },
          {
            [isHorizontal ? "scaleX" : "scaleY"]: 1,
            opacity: Math.random() * 0.5 + 0.3,
            duration: duration,
            delay,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(line, {
                [isHorizontal ? "scaleX" : "scaleY"]: 0,
                opacity: 0,
                duration: duration * 0.5,
                ease: "power2.in",
              });
            },
          }
        );
      });
    }
  }, [isActive, direction, duration]);

  const lines = Array.from({ length: count }, (_, i) => {
    const isHorizontal = direction === "left" || direction === "right";
    const randomOffset = Math.random() * 100;
    const randomLength = Math.random() * 20 + 10;

    return {
      style: {
        position: "absolute" as const,
        backgroundColor: color,
        [isHorizontal ? "height" : "width"]: "2px",
        [isHorizontal ? "width" : "height"]: `${randomLength}%`,
        [isHorizontal ? "top" : "left"]: `${randomOffset}%`,
        [direction === "right" ? "left" : direction === "left" ? "right" : direction === "down" ? "top" : "bottom"]: 0,
        transformOrigin:
          direction === "right"
            ? "left"
            : direction === "left"
            ? "right"
            : direction === "down"
            ? "top"
            : "bottom",
      },
    };
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) linesRef.current[i] = el;
          }}
          style={line.style}
        />
      ))}
    </div>
  );
}

// Burst speed lines from a point
export function BurstLines({
  isActive,
  originX = 50,
  originY = 50,
  color = "currentColor",
  count = 12,
}: {
  isActive: boolean;
  originX?: number;
  originY?: number;
  color?: string;
  count?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const lines = containerRef.current.children;

    gsap.fromTo(
      lines,
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  }, [isActive]);

  const burstLines = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const length = Math.random() * 100 + 50;

    return {
      style: {
        position: "absolute" as const,
        left: `${originX}%`,
        top: `${originY}%`,
        width: `${length}px`,
        height: "2px",
        backgroundColor: color,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
      },
    };
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {burstLines.map((line, i) => (
        <div key={i} style={line.style} />
      ))}
    </div>
  );
}

// Diagonal motion lines background effect
export function DiagonalMotionLines({
  color = "currentColor",
  opacity = 0.1,
  spacing = 40,
}: {
  color?: string;
  opacity?: number;
  spacing?: number;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent ${spacing - 1}px,
          ${color} ${spacing - 1}px,
          ${color} ${spacing}px
        )`,
        opacity,
      }}
    />
  );
}
