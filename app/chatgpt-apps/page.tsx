"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

interface AppEntry {
  name: string
  screenshots: string[]
}

const APPS: AppEntry[] = [{"name": "ace-knowledge-graph", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "ace-quiz-maker", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "adobe-acrobat", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "adobe-express", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "adobe-photoshop", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "agentforce-sales", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "airtable", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "all-accor", "screenshots": ["screenshot-1.jpg"]}, {"name": "alltrails", "screenshots": ["screenshot-1.jpg"]}, {"name": "apartment-list", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "app", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "apple-music", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "asana", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "atlassian-rovo", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "autoscout24", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "autotrader", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "b12-website-generator", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "bible", "screenshots": ["screenshot-1.jpg"]}, {"name": "bodi", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "booking-com", "screenshots": ["screenshot-1.jpg"]}, {"name": "botlab", "screenshots": ["screenshot-1.jpg"]}, {"name": "botpress", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "brand24", "screenshots": ["screenshot-1.jpg"]}, {"name": "brex", "screenshots": ["screenshot-1.jpg"]}, {"name": "busbud", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "cafe24", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "canva", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "cargurus", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "carmax", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "cars24", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "check24", "screenshots": ["screenshot-1.jpg"]}, {"name": "circleback", "screenshots": ["screenshot-1.jpg"]}, {"name": "clay", "screenshots": ["screenshot-1.jpg"]}, {"name": "cloudinary", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "conductor", "screenshots": ["screenshot-1.jpg"]}, {"name": "cottages", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "coursera", "screenshots": ["screenshot-1.jpg"]}, {"name": "cruise-critic", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "daloopa", "screenshots": ["screenshot-1.jpg"]}, {"name": "datacamp", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "dealpilot", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "dewa", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "docket", "screenshots": ["screenshot-1.jpg"]}, {"name": "donedeal", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "dow-jones-factiva", "screenshots": ["screenshot-1.jpg"]}, {"name": "dupe", "screenshots": ["screenshot-1.jpg"]}, {"name": "edx", "screenshots": ["screenshot-1.jpg"]}, {"name": "egnyte", "screenshots": ["screenshot-1.jpg"]}, {"name": "evaneos", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "fareharbor", "screenshots": ["screenshot-1.jpg"]}, {"name": "figma", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "flight-network", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "flixor", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "fyxer", "screenshots": ["screenshot-1.jpg"]}, {"name": "garage-guard-by-jerry-ai", "screenshots": ["screenshot-1.jpg"]}, {"name": "genspark-ai-slides", "screenshots": ["screenshot-1.jpg"]}, {"name": "getyourguide", "screenshots": ["screenshot-1.jpg"]}, {"name": "granola", "screenshots": ["screenshot-1.jpg"]}, {"name": "hex", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "heygen", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "highlevel", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "hubspot", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "hugging-face", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "hyatt", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "immoscout24", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "imovirtual", "screenshots": ["screenshot-1.jpg"]}, {"name": "internshala", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "invideo", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "jimdo", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "jobkorea", "screenshots": ["screenshot-1.jpg"]}, {"name": "kiwi-com", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "klaviyo", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "kleinanzeigen", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "klook", "screenshots": ["screenshot-1.jpg"]}, {"name": "komoot", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "kraken", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "leboncoin", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "legalzoom", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "lona", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "lotte-chemical", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "lovable", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "lseg", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "lugg", "screenshots": ["screenshot-1.jpg"]}, {"name": "makemytrip", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "malwarebytes", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "mangaboom", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "manus", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "marcopolo", "screenshots": ["screenshot-1.jpg"]}, {"name": "monday-com", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "moneysupermarket", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "namecheap", "screenshots": ["screenshot-1.jpg"]}, {"name": "netlify", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "network-solutions", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "norton", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "omio", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "opentable", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "otomoto", "screenshots": ["screenshot-1.jpg"]}, {"name": "outliner", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "paypal", "screenshots": ["screenshot-1.jpg"]}, {"name": "pc-express", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "preply-language-tutor-finder", "screenshots": ["screenshot-1.jpg"]}, {"name": "priceline", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "pylon", "screenshots": ["screenshot-1.jpg"]}, {"name": "quizlet", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "ranked-ai", "screenshots": ["screenshot-1.jpg"]}, {"name": "realestate-com-au", "screenshots": ["screenshot-1.jpg"]}, {"name": "recorrido", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "redbus", "screenshots": ["screenshot-1.jpg"]}, {"name": "redfin", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "replit", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "s-p-global", "screenshots": ["screenshot-1.jpg"]}, {"name": "scite", "screenshots": ["screenshot-1.jpg"]}, {"name": "semrush", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "skyscanner", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "slidesgpt", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "speechify", "screenshots": ["screenshot-1.jpg"]}, {"name": "spotify", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "statsig", "screenshots": ["screenshot-1.jpg"]}, {"name": "streak", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "strive-pdf-generator", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "tarot", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "the-knot", "screenshots": ["screenshot-1.jpg"]}, {"name": "thefork", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "third-bridge", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "tickersage", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "tinman-ai", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "tonita", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "tourlane", "screenshots": ["screenshot-1.jpg"]}, {"name": "tourradar", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "trade-me-property", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "tripadvisor", "screenshots": ["screenshot-1.jpg"]}, {"name": "tuio", "screenshots": ["screenshot-1.jpg"]}, {"name": "turo", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "udemy", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "upwork", "screenshots": ["screenshot-1.jpg"]}, {"name": "vercel", "screenshots": ["screenshot-1.jpg"]}, {"name": "viator", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "vio", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "vivid-seats", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "von-poll-immobilien", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg"]}, {"name": "wayground", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "wednesday-app", "screenshots": ["screenshot-1.jpg"]}, {"name": "wix", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "zen-shopping", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg", "screenshot-4.jpg"]}, {"name": "zola", "screenshots": ["screenshot-1.jpg"]}, {"name": "zoom", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}, {"name": "zumba", "screenshots": ["screenshot-1.jpg"]}, {"name": "zumper", "screenshots": ["screenshot-1.jpg", "screenshot-2.jpg", "screenshot-3.jpg"]}]

function formatName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function ChatGPTAppsCatalog() {
  const [search, setSearch] = useState("")
  const [lightbox, setLightbox] = useState<{ app: AppEntry; idx: number } | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  const filtered = APPS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const openLightbox = useCallback((app: AppEntry, idx: number) => {
    setLightbox({ app, idx })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const navLightbox = useCallback(
    (dir: number) => {
      if (!lightbox) return
      const shots = lightbox.app.screenshots.filter((s) => s.startsWith("screenshot"))
      const next = (lightbox.idx + dir + shots.length) % shots.length
      setLightbox({ ...lightbox, idx: next })
    },
    [lightbox]
  )

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[var(--text-tertiary)] hover:text-[var(--accent-gold)] transition-colors text-sm"
              >
                ← Back
              </Link>
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                  <span className="text-[var(--accent-gold)]">⚡</span> ChatGPT Apps Catalog
                </h1>
                <p className="text-sm text-[var(--text-tertiary)] mt-0.5">
                  <span className="text-[var(--text-secondary)] font-medium">{filtered.length}</span> apps ·{" "}
                  <span className="text-[var(--text-secondary)] font-medium">348</span> screenshots
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 max-w-md sm:max-w-sm">
              <input
                type="text"
                placeholder="Search apps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-gold)] transition-colors font-[family-name:var(--font-body)]"
                autoFocus
              />
              <div className="flex rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                    view === "grid"
                      ? "bg-[var(--accent-gold-muted)] text-[var(--accent-gold)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                    view === "list"
                      ? "bg-[var(--accent-gold-muted)] text-[var(--accent-gold)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Catalog */}
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-lg font-medium mb-2">No apps found</h2>
            <p className="text-[var(--text-tertiary)] text-sm">Try a different search term</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((app) => {
              const shots = app.screenshots.filter((s) => s.startsWith("screenshot"))
              if (!shots.length) return null
              return (
                <div
                  key={app.name}
                  onClick={() => openLightbox(app, 0)}
                  className="group cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden hover:border-[var(--border-default)] hover:bg-[var(--bg-surface)] transition-all hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={`/chatgpt-apps-screenshots/${app.name}/${shots[0]}`}
                      alt={app.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {shots.length > 1 && (
                      <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {shots.length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm font-medium font-[family-name:var(--font-display)]">
                      {formatName(app.name)}
                    </span>
                    <span className="text-[11px] text-[var(--text-tertiary)]">
                      {shots.length} shot{shots.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((app) => {
              const shots = app.screenshots.filter((s) => s.startsWith("screenshot"))
              if (!shots.length) return null
              return (
                <div
                  key={app.name}
                  className="flex gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden hover:border-[var(--border-default)] hover:bg-[var(--bg-surface)] transition-all p-4"
                >
                  <div
                    className="relative w-48 shrink-0 aspect-[16/10] overflow-hidden rounded-lg bg-black cursor-pointer"
                    onClick={() => openLightbox(app, 0)}
                  >
                    <img
                      src={`/chatgpt-apps-screenshots/${app.name}/${shots[0]}`}
                      alt={app.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium font-[family-name:var(--font-display)]">
                      {formatName(app.name)}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {shots.map((s, i) => (
                        <img
                          key={s}
                          src={`/chatgpt-apps-screenshots/${app.name}/${s}`}
                          alt={`${app.name} ${i + 1}`}
                          className="w-20 h-12 object-cover rounded-md border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--accent-gold)] transition-colors"
                          loading="lazy"
                          onClick={() => openLightbox(app, i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox()
            if (e.key === "ArrowLeft") navLightbox(-1)
            if (e.key === "ArrowRight") navLightbox(1)
          }}
          tabIndex={0}
          role="dialog"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-6 text-[var(--text-tertiary)] hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
          <p className="text-base font-medium font-[family-name:var(--font-display)] mb-4">
            {formatName(lightbox.app.name)}
          </p>
          <img
            src={`/chatgpt-apps-screenshots/${lightbox.app.name}/${
              lightbox.app.screenshots.filter((s) => s.startsWith("screenshot"))[lightbox.idx]
            }`}
            alt={lightbox.app.name}
            className="max-w-[90vw] max-h-[75vh] rounded-lg shadow-2xl"
          />
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => navLightbox(-1)}
              className="px-5 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-sm hover:border-[var(--accent-gold)] transition-colors"
            >
              ← Prev
            </button>
            <span className="text-[var(--text-tertiary)] text-sm">
              {lightbox.idx + 1} /{" "}
              {lightbox.app.screenshots.filter((s) => s.startsWith("screenshot")).length}
            </span>
            <button
              onClick={() => navLightbox(1)}
              className="px-5 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-sm hover:border-[var(--accent-gold)] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
