"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  as: Tag = "span",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll(".split-char")

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 40,
        rotateX: -40,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      }
    )
  }, [delay, stagger, duration])

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className} style={{ perspective: "500px" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="split-char inline-block opacity-0"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  )
}
