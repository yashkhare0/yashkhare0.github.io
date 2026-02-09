"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const blobs = containerRef.current.querySelectorAll(".aurora-blob")

    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-60, 60)`,
        y: `random(-60, 60)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(15, 25)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 2,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
    </div>
  )
}
