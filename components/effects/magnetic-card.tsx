"use client"

import { useRef, useCallback, type ReactNode } from "react"

interface MagneticCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function MagneticCard({ children, className = "", intensity = 8 }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      const spotlight = spotlightRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -intensity
      const rotateY = ((x - centerX) / centerX) * intensity

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      card.style.transition = "transform 0.1s ease-out"

      if (spotlight) {
        spotlight.style.opacity = "1"
        spotlight.style.background = `radial-gradient(300px circle at ${x}px ${y}px, var(--accent-gold-muted) 0%, transparent 70%)`
      }
    },
    [intensity]
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const spotlight = spotlightRef.current
    if (!card) return

    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    card.style.transition = "transform 0.5s var(--ease-smooth)"

    if (spotlight) {
      spotlight.style.opacity = "0"
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      {/* Spotlight overlay */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 opacity-0 transition-opacity duration-500"
      />
      {children}
    </div>
  )
}
