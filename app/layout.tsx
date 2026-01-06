import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Khare | AI Developer & Full-Stack Engineer",
  description:
    "AI Developer & Full-Stack Engineer with 4+ years experience. Specialized in Python (Django, FastAPI) and React. Building scalable AI products in Berlin.",
  keywords: [
    "AI Developer",
    "Full-Stack Engineer",
    "Python",
    "Django",
    "FastAPI",
    "React",
    "Next.js",
    "RAG",
    "LLM",
    "Machine Learning",
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
    title: "Yash Khare | AI Developer & Full-Stack Engineer",
    description:
      "AI Developer & Full-Stack Engineer with 4+ years experience. Building scalable AI products in Berlin.",
    siteName: "Yash Khare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Khare | AI Developer & Full-Stack Engineer",
    description:
      "AI Developer & Full-Stack Engineer with 4+ years experience. Building scalable AI products in Berlin.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
