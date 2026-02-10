"use client"

import { useLocale, locales, type Locale } from "@/lib/i18n"
import { useRouter, usePathname } from "next/navigation"

const localeFlags: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  fr: { flag: "🇫🇷", label: "Français" },
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return
    // Preserve the current path after the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
    router.push(`/${locale}${pathWithoutLocale || "/"}`)
  }

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleSwitch(locale)}
          className="w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-300 hover:scale-110 text-sm leading-none"
          style={{
            background: locale === currentLocale ? "var(--bg-elevated)" : "transparent",
            borderColor:
              locale === currentLocale ? "var(--accent-gold)" : "var(--border-default)",
            opacity: locale === currentLocale ? 1 : 0.5,
          }}
          aria-label={`Switch to ${localeFlags[locale].label}`}
          onMouseEnter={(e) => {
            if (locale !== currentLocale) {
              e.currentTarget.style.opacity = "1"
              e.currentTarget.style.borderColor = "var(--text-secondary)"
            }
          }}
          onMouseLeave={(e) => {
            if (locale !== currentLocale) {
              e.currentTarget.style.opacity = "0.5"
              e.currentTarget.style.borderColor = "var(--border-default)"
            }
          }}
        >
          <span className="text-[15px]">{localeFlags[locale].flag}</span>
        </button>
      ))}
    </div>
  )
}
