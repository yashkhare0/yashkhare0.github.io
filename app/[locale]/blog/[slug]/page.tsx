import { posts } from "#velite"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import type { Metadata } from "next"

export function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug && p.published)
  if (!post) return {}

  return {
    title: `${post.title} | Yash Khare`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = posts.find((p) => p.slug === slug && p.published)

  if (!post) notFound()

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  return (
    <article className="blog-page min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Top bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <a
          href={`/${locale}/`}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 hover:text-[var(--accent-gold)]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </a>
        <span
          className="font-mono text-[11px] uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          Blog
        </span>
      </nav>

      {/* Hero */}
      <header className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded"
                style={{
                  background: "var(--accent-gold-muted)",
                  color: "var(--accent-gold)",
                }}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="font-body text-lg sm:text-xl leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div
            className="flex items-center gap-6 pb-8 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div
              className="flex items-center gap-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              <Calendar size={14} />
              <span className="font-mono text-xs">{formatDate(post.date)}</span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              <Clock size={14} />
              <span className="font-mono text-xs">{post.readingTime}</span>
            </div>
            {post.metadata.wordCount > 0 && (
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                {post.metadata.wordCount.toLocaleString()} words
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 sm:px-8 pb-20 sm:pb-28">
        <div
          className="prose-blog max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Footer */}
      <footer
        className="px-6 sm:px-8 py-12 border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a
            href={`/${locale}/`}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 hover:text-[var(--accent-gold)]"
            style={{ color: "var(--text-tertiary)" }}
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </a>
          <span
            className="font-mono text-[11px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Yash Khare
          </span>
        </div>
      </footer>
    </article>
  )
}
