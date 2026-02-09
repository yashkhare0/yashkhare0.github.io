"use client"

import { useEffect, useRef, useCallback } from "react"

interface DotGridProps {
  className?: string
}

export function DotGrid({ className }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef<number>(0)
  const dotsRef = useRef<{ x: number; y: number; baseAlpha: number }[]>([])

  const SPACING = 32
  const DOT_RADIUS = 1.2
  const INFLUENCE_RADIUS = 150
  const MAX_GLOW_RADIUS = 3.5

  const setupDots = useCallback((width: number, height: number) => {
    const dots: { x: number; y: number; baseAlpha: number }[] = []
    const cols = Math.ceil(width / SPACING) + 1
    const rows = Math.ceil(height / SPACING) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * SPACING,
          y: row * SPACING,
          baseAlpha: 0.12 + Math.random() * 0.08,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      setupDots(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const isDark = () => document.documentElement.classList.contains("dark")

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const { x: mx, y: my } = mouseRef.current
      const dark = isDark()
      const baseColor = dark ? "255, 255, 255" : "0, 0, 0"
      const glowColor = dark ? "212, 168, 67" : "184, 146, 46"

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < INFLUENCE_RADIUS) {
          const t = 1 - dist / INFLUENCE_RADIUS
          const ease = t * t * (3 - 2 * t) // smoothstep
          const radius = DOT_RADIUS + (MAX_GLOW_RADIUS - DOT_RADIUS) * ease
          const alpha = dot.baseAlpha + (0.9 - dot.baseAlpha) * ease

          ctx.beginPath()
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${glowColor}, ${alpha})`
          ctx.fill()

          // outer glow
          if (ease > 0.3) {
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, radius + 4 * ease, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${glowColor}, ${ease * 0.15})`
            ctx.fill()
          }
        } else {
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${baseColor}, ${dot.baseAlpha})`
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [setupDots])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className || ""}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  )
}
