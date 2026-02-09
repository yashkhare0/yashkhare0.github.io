import type { Metadata } from "next"
import { Syne, Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Yash Khare | AI Software Engineer",
  description:
    "AI Software Engineer shipping production-ready AI products. Specialized in Python, FastAPI, Django, RAG, and LLM integration. Based in Berlin.",
  keywords: [
    "AI Software Engineer",
    "AI Engineer",
    "Python",
    "Django",
    "FastAPI",
    "React",
    "Next.js",
    "RAG",
    "LLM",
    "Semantic Search",
    "Prompt Engineering",
    "Berlin",
  ],
  authors: [{ name: "Yash Khare" }],
  creator: "Yash Khare",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashkhare0.github.io",
    title: "Yash Khare | AI Software Engineer",
    description:
      "AI Software Engineer shipping production-ready AI products. Based in Berlin.",
    siteName: "Yash Khare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Khare | AI Software Engineer",
    description:
      "AI Software Engineer shipping production-ready AI products. Based in Berlin.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
