"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import type { Translations } from "@/messages"

interface I18nContextValue {
  locale: string
  t: Translations
}

const I18nContext = createContext<I18nContextValue | null>(null)

export const locales = ["en", "de", "fr"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
}

export function TranslationProvider({
  locale,
  messages,
  children,
}: {
  locale: string
  messages: Translations
  children: ReactNode
}) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, t: messages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation(): Translations {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useTranslation must be used within TranslationProvider")
  return ctx.t
}

export function useLocale(): string {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useLocale must be used within TranslationProvider")
  return ctx.locale
}
