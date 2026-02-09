"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-5 sm:top-6 right-16 sm:right-20 z-50 w-9 h-9 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-300 hover:scale-110"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "var(--border-default)",
        color: "var(--text-secondary)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
