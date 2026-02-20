# yashkhare0.github.io

Personal portfolio and blog for **Yash Khare** — AI Software Engineer based in Berlin. A single-page site with smooth scroll navigation, dark/light theming, i18n support, and an AI-powered chat widget.

Live at [yashkhare0.github.io](https://yashkhare0.github.io)

## Tech Stack

- **Next.js** with App Router and static export
- **TypeScript**
- **Tailwind CSS** + **Radix UI** for components
- **Framer Motion** + **GSAP** for animations
- **Velite** for markdown blog content
- **next-intl** for i18n (English, French, German)
- **Lenis** for smooth scrolling

## Sections

- **Hero** — Introduction with key stats
- **About** — Background and technical highlights
- **Experience** — Work history (COSMO CONSULT, Kizuna, ESCP, etc.)
- **Education** — Academic background
- **Skills** — Technical skill categories
- **Projects** — Featured work
- **Blog** — Posts rendered from markdown (RAG systems, vector databases, shipping products)
- **Testimonials** — Colleague and client quotes
- **Contact** — Contact form and links
- **Chat Widget** — AI chatbot that answers questions about Yash in first person

## Project Structure

```
├── app/
│   ├── [locale]/          # i18n routes (en, fr, de)
│   │   ├── page.tsx       # Main single-page layout
│   │   ├── blog/[slug]/   # Individual blog posts
│   │   └── layout.tsx
│   └── layout.tsx         # Root layout
├── components/
│   ├── sections/          # Hero, About, Experience, Skills, etc.
│   ├── chat/              # AI chat widget
│   ├── navigation/        # Section nav sidebar
│   ├── effects/           # Dot grid, magnetic card effects
│   └── ui/                # Theme toggle, language switcher
├── config/content.ts      # All portfolio copy (edit here, not in components)
├── content/posts/         # Markdown blog posts
├── messages/              # i18n translation files
└── styles/globals.css
```

## Development

```bash
pnpm install
pnpm dev
```

## Build and Deploy

```bash
pnpm static    # Builds, creates .nojekyll and CNAME
pnpm deploy    # Pushes to GitHub Pages via gh-pages
```

## Editing Content

All resume copy, projects, experience, and testimonials live in [`config/content.ts`](config/content.ts). Update that file — no need to touch components.

## License

MIT
