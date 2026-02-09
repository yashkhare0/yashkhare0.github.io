"use client"

import { useLocale, locales, type Locale } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const currentLocale = useLocale()
  const router = useRouter()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return
    router.push(`/${locale}/`)
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span
              className="mx-1 font-mono text-[10px]"
              style={{ color: "var(--border-default)" }}
            >
              /
            </span>
          )}
          <button
            onClick={() => handleSwitch(locale)}
            className="font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 cursor-pointer"
            style={{
              color: locale === currentLocale ? "var(--accent-gold)" : "var(--text-tertiary)",
            }}
            onMouseEnter={(e) => {
              if (locale !== currentLocale) {
                e.currentTarget.style.color = "var(--text-secondary)"
              }
            }}
            onMouseLeave={(e) => {
              if (locale !== currentLocale) {
                e.currentTarget.style.color = "var(--text-tertiary)"
              }
            }}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  )
}
