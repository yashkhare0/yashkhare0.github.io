import { TranslationProvider } from "@/lib/i18n"
import { messages } from "@/messages"
import type { Translations } from "@/messages"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "fr" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t: Translations = messages[locale] || messages.en

  return (
    <TranslationProvider locale={locale} messages={t}>
      {children}
    </TranslationProvider>
  )
}
