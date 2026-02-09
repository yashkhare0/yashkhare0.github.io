"use client"

import { useLocale, locales, type Locale } from "@/lib/i18n"
import { useRouter } from "next/navigation"

const localeFlags: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  fr: { flag: "🇫🇷", label: "Français" },
}

export function LanguageSwitcher() {
  const currentLocale = useLocale()
  const router = useRouter()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return
    router.push(`/${locale}/`)
  }

  return (
    <div className="fixed top-5 sm:top-6 right-27 sm:right-33 z-50 flex items-center gap-1">
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
