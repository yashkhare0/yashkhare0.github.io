"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SpeedLinesProps {
  isActive: boolean;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
  count?: number;
  duration?: number;
}

interface LineData {
  offset: number;
  length: number;
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
  const [lineData, setLineData] = useState<LineData[]>([]);

  // Generate random values only on client to avoid hydration mismatch
  useEffect(() => {
    setLineData(
      Array.from({ length: count }, () => ({
        offset: Math.random() * 100,
        length: Math.random() * 20 + 10,
      }))
    );
  }, [count]);

  useEffect(() => {
    if (!containerRef.current || lineData.length === 0) return;

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
            opacity: 0.3 + Math.random() * 0.5,
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
  }, [isActive, direction, duration, lineData.length]);

  const isHorizontal = direction === "left" || direction === "right";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {lineData.map((data, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) linesRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            backgroundColor: color,
            [isHorizontal ? "height" : "width"]: "2px",
            [isHorizontal ? "width" : "height"]: `${data.length}%`,
            [isHorizontal ? "top" : "left"]: `${data.offset}%`,
            [direction === "right" ? "left" : direction === "left" ? "right" : direction === "down" ? "top" : "bottom"]: 0,
            transformOrigin:
              direction === "right"
                ? "left"
                : direction === "left"
                ? "right"
                : direction === "down"
                ? "top"
                : "bottom",
            transform: isHorizontal ? "scaleX(0)" : "scaleY(0)",
            opacity: 0,
          }}
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
  const [lengths, setLengths] = useState<number[]>([]);

  // Generate random lengths only on client to avoid hydration mismatch
  useEffect(() => {
    setLengths(Array.from({ length: count }, () => Math.random() * 100 + 50));
  }, [count]);

  useEffect(() => {
    if (!containerRef.current || !isActive || lengths.length === 0) return;

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
  }, [isActive, lengths.length]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {lengths.map((length, i) => {
        const angle = (i / count) * 360;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${originX}%`,
              top: `${originY}%`,
              width: `${length}px`,
              height: "2px",
              backgroundColor: color,
              transformOrigin: "left center",
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
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
