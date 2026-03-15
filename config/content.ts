// =============================================================================
// SITE CONTENT CONFIGURATION
// =============================================================================
// All portfolio content. Update profiles, projects, experience here.

export const siteConfig = {
  name: "Yash Khare",
  title: "AI Software Engineer",
  email: "yash.khare.work@gmail.com",
  phone: "+33 769054521",
  location: "Berlin, Germany",
  website: "https://yashkhare0.github.io",
}

// =============================================================================
// HERO SECTION
// =============================================================================

export const heroContent = {
  greeting: "Hi, I'm",
  name: "Yash Khare",
  tagline: "Senior AI Software Engineer",
  description:
    "I ship fast without gambling with quality. Turning LLM/ML capabilities into reliable product features, building platforms that let teams ship repeatedly. Based in Berlin.",
  cta: {
    primary: { label: "View My Work", section: "projects" },
    secondary: { label: "Get in Touch", section: "contact" },
  },
  stats: [
    { value: "6+", label: "Years Experience" },
    { value: "13", label: "Products Shipped" },
    { value: "175K+", label: "Revenue Generated" },
  ],
}

// =============================================================================
// ABOUT SECTION
// =============================================================================

export const aboutContent = {
  headline: "About Me",
  subheadline: "Shipping AI products with solid foundations",
  paragraphs: [
    "I ship fast without gambling with quality. For AI products, that means solid foundations: clean APIs, testable pipelines, observable systems, and cost-aware deployments.",
    "I focus on turning LLM/ML capabilities into reliable product features, aligning with stakeholders, and building platforms that let teams ship repeatedly. Based in Berlin, I work at the intersection of AI engineering and scalable product development.",
    "With a Master's from ESCP Europe (GMAT 730, 96th percentile), I combine deep technical execution with business acumen. I've co-founded an AI startup, led remote teams across time zones, and generated six-figure revenues within months of launch.",
  ],
  highlights: [
    { icon: "brain", title: "AI / LLM", description: "RAG, semantic search, prompt engineering, eval patterns. Hugging Face, Transformers, Ollama, vLLM." },
    { icon: "code", title: "Backend & Infra", description: "Python, FastAPI, Django, Postgres, Redis, Neo4j, PGVector, RabbitMQ, Docker, Kubernetes, CI/CD." },
    { icon: "users", title: "Product & Leadership", description: "Led teams of 5-10 developers. Shipped 8 products in 8 months. Scaled to six-figure revenue." },
  ],
}

// =============================================================================
// EXPERIENCE SECTION
// =============================================================================

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  period: string
  technologies: string[]
  highlights: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: "cosmo",
    company: "COSMO CONSULT",
    role: "AI Software Engineer",
    location: "Berlin, Germany",
    period: "Apr 2025 - Present",
    current: true,
    technologies: [
      "Next.js", "Vercel", "FastAPI", "PostgreSQL", "PGVector",
      "Django", "Neo4j", "Azure", "RabbitMQ", "Pulumi", "PostHog", "WorkOS",
    ],
    highlights: [
      "Developed, shipped and currently maintain 8 products end-to-end in 8 months (ideation to deployment) with avg time-to-deployment < 3 weeks",
      "Standardized analytics and authentication across all apps with PostHog & WorkOS; weekly exec snapshots adopted by product and leadership for roadmap decisions",
      "Architected and took full ownership of Sonar (company's most important internal AI platform): end-to-end workflow for live transcript ingestion and custom analysis",
      "Built Translate (COSMO highest adopted internal platform of 2025) reaching 25% usage without any communications",
    ],
  },
  {
    id: "gem",
    company: "GEM AI",
    role: "AI Engineer, Co-Founder",
    location: "Paris, France",
    period: "Jan 2024 - Jan 2025",
    technologies: [
      "Python", "Django", "FastAPI", "ReactJS", "TypeScript",
      "Azure", "Docker", "Kubernetes", "PostgreSQL", "GitHub Actions",
    ],
    highlights: [
      "Developed Echo, an enterprise-grade scalable RAG tool using Python, Django, and ReactJS, generating EUR 125,000 in licensing revenue in the first month",
      "Scaled to a team of 5 to build Snap-and-Solve in 25 days using Next.js, FastAPI, integrating OpenAI, Mistral, Anthropic, and Ollama",
      "Developed an adaptive syllabus mapping engine using Keras for OCR, Neo4j for graphs, and PGVector for vector storage",
      "Implemented CI/CD pipelines with GitHub Actions, reducing deployment times by 40%. Scaled to >EUR 175,000 revenue and 10 developers in 6 months",
    ],
  },
  {
    id: "pernod",
    company: "PERNOD RICARD",
    role: "UX Researcher",
    location: "Paris, France",
    period: "Jul 2023 - Dec 2023",
    technologies: ["Python", "Google Apps Script", "PowerBI", "Excel"],
    highlights: [
      "Automated data reporting and engagement analysis using Python and Google Apps Script, reducing manual effort by 40%",
      "Conducted qualitative research to generate user insights for product development, presented using PowerBI",
      "Communicated insights through presentations to stakeholders, contributing to strategic decisions; converted internship into founding own venture",
    ],
  },
  {
    id: "passionoid",
    company: "PASSIONOID TECHNOLOGIES & BLIIP STUDIOS",
    role: "Co-Founder | Software Engineer",
    location: "Pune, India",
    period: "May 2019 - Sept 2022",
    technologies: [
      "ReactJS", "Flutter", "Django", "React Native", "PostgreSQL", "GitHub Actions",
    ],
    highlights: [
      "Led a team of 5 developers to successfully deliver 16+ projects for national and international clients in 3 years",
      "Developed a CRM Automation Engine in 3 months using ReactJS and Python Django, streamlining client management through CI/CD pipelines",
      "Developed a facility management platform leveraging React and Django REST Framework with GitHub Actions",
    ],
  },
]

// =============================================================================
// EDUCATION SECTION
// =============================================================================

export interface Education {
  id: string
  institution: string
  degree: string
  specialization?: string
  location: string
  period: string
  highlights?: string[]
}

export const education: Education[] = [
  {
    id: "escp",
    institution: "ESCP Europe Business School",
    degree: "Masters in Management",
    specialization: "Innovation & High Tech",
    location: "Berlin, Germany",
    period: "Sep 2022 - Feb 2025",
    highlights: [
      "GMAT: 730 (96th percentile) - V41 Q49",
      "Advanced Python Programming, Machine Learning and Analysis, Data Driven Marketing",
    ],
  },
]

// =============================================================================
// SKILLS SECTION
// =============================================================================

export interface Skill {
  name: string
  category: "ai_llm" | "ml_data" | "backend" | "infra" | "frontend"
}

export const skills: Skill[] = [
  // AI/LLM
  { name: "RAG", category: "ai_llm" },
  { name: "Semantic Search", category: "ai_llm" },
  { name: "Prompt Engineering", category: "ai_llm" },
  { name: "Eval Patterns", category: "ai_llm" },
  { name: "Hugging Face", category: "ai_llm" },
  { name: "Transformers", category: "ai_llm" },
  { name: "Ollama", category: "ai_llm" },
  { name: "vLLM", category: "ai_llm" },
  { name: "LangChain", category: "ai_llm" },
  { name: "LlamaIndex", category: "ai_llm" },

  // ML/Data
  { name: "Pandas", category: "ml_data" },
  { name: "NumPy", category: "ml_data" },
  { name: "scikit-learn", category: "ml_data" },
  { name: "PyTorch", category: "ml_data" },
  { name: "TensorFlow", category: "ml_data" },

  // Backend
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Async Python", category: "backend" },
  { name: "Testing", category: "backend" },

  // Data/Infra
  { name: "PostgreSQL", category: "infra" },
  { name: "Redis", category: "infra" },
  { name: "Neo4j", category: "infra" },
  { name: "PGVector", category: "infra" },
  { name: "RabbitMQ", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Kubernetes", category: "infra" },
  { name: "CI/CD", category: "infra" },
  { name: "Azure", category: "infra" },
  { name: "Monitoring", category: "infra" },
  { name: "Pulumi", category: "infra" },
  { name: "PostHog", category: "infra" },

  // Frontend (not on CV skills but used in experience)
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Flutter", category: "frontend" },
]

export const skillCategories = [
  { key: "all", label: "All" },
  { key: "ai_llm", label: "AI / LLM" },
  { key: "ml_data", label: "ML / Data" },
  { key: "backend", label: "Backend" },
  { key: "infra", label: "Data & Infra" },
  { key: "frontend", label: "Frontend" },
] as const

// =============================================================================
// PROJECTS SECTION
// =============================================================================

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  year: string
  featured?: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: "drio",
    title: "Drio",
    description:
      "No-code platform for building and publishing AI-native apps. Visual builder with 21 widget primitives, Skybridge compiler, and one-click deployment to ChatGPT, Claude, and Gemini. Co-founded as CTO.",
    tags: ["Next.js", "Convex", "MCP", "TypeScript", "AI", "Startup"],
    liveUrl: "https://getdrio.com",
    year: "2025",
    featured: true,
  },
  {
    id: "talkto",
    title: "TalkTo",
    description:
      "Local-first communication platform for AI agents — like Slack, but for machines. Hub-and-node relay architecture enabling multi-tenant agent collaboration with 600+ tests.",
    tags: ["TypeScript", "SQLite", "REST API", "AI Agents", "Open Source"],
    liveUrl: "https://hyperslack.github.io",
    githubUrl: "https://github.com/hyperslack/talkto",
    year: "2025",
  },
  {
    id: "noll",
    title: "noll.to",
    description:
      "Privacy-first document translation built for sensitive workflows. Focused on layout retention, controlled data handling, and reliable document processing. Shipped as a SaaS product.",
    tags: ["SaaS", "Privacy", "Document Processing", "Translation"],
    liveUrl: "https://noll.to",
    year: "2025",
  },
  {
    id: "testkizuna",
    title: "testkizuna.com",
    description:
      "AI-assisted QA and testing product focused on turning quality checks into repeatable, automatable workflows, with a product mindset around reliability and engineering efficiency.",
    tags: ["AI", "QA", "Testing", "Automation"],
    liveUrl: "https://testkizuna.com",
    year: "2025",
  },
  {
    id: "sonar",
    title: "Sonar AI Platform",
    description:
      "Company's most important internal AI platform. Designed the end-to-end workflow for live transcript ingestion and custom analysis, running as an internal API product.",
    tags: ["FastAPI", "PostgreSQL", "PGVector", "Azure", "RabbitMQ"],
    liveUrl: "https://sonar.apx.team",
    year: "2025",
  },
  {
    id: "cosma",
    title: "Cosma",
    description:
      "AI-powered business assistant that helps teams manage workflows, automate repetitive tasks, and surface insights from company data. Built as a full-stack product.",
    tags: ["Next.js", "AI", "SaaS", "Automation"],
    liveUrl: "https://cosma.app",
    year: "2025",
  },
  {
    id: "radar",
    title: "Radar",
    description:
      "Internal intelligence tool for monitoring and analyzing market signals, competitive landscape, and industry trends. Delivers actionable insights to product and strategy teams.",
    tags: ["Next.js", "FastAPI", "Analytics", "Internal Tool"],
    liveUrl: "https://radar.apx.team",
    year: "2025",
  },
  {
    id: "translate",
    title: "Translate",
    description:
      "COSMO's highest adopted internal platform of 2025, reaching 25% usage without any communications or marketing. Built end-to-end as an internal tool.",
    tags: ["Next.js", "FastAPI", "Azure", "Internal Tool"],
    liveUrl: "https://translate.apx.team",
    year: "2025",
  },
  {
    id: "voko",
    title: "Voko",
    description:
      "Interactive CLI tool for managing i18n in JavaScript and TypeScript projects. Supports Google Translate, DeepL, LibreTranslate, and Yandex out of the box. Published on npm as @yashkhare0/voko-cli.",
    tags: ["CLI", "i18n", "TypeScript", "Open Source", "npm"],
    liveUrl: "https://yashkhare0.github.io/voko/",
    githubUrl: "https://github.com/yashkhare0/voko",
    year: "2025",
  },
  {
    id: "echo",
    title: "Echo - Enterprise RAG",
    description:
      "Enterprise-grade scalable retrieval-augmented generation tool built in 45 days. Generated EUR 125,000 in licensing revenue in the first month.",
    tags: ["Python", "Django", "ReactJS", "PostgreSQL", "RAG"],
    year: "2024",
  },
  {
    id: "snap-solve",
    title: "Snap-and-Solve",
    description:
      "AI-powered problem solver integrating OpenAI, Mistral, Anthropic, and Ollama for open-source inference. Built in 25 days with a team of 5. Deployed on Azure Kubernetes.",
    tags: ["Next.js", "FastAPI", "Azure Kubernetes", "Prometheus", "Grafana"],
    year: "2024",
  },
  {
    id: "syllabus-mapper",
    title: "Adaptive Syllabus Mapper",
    description:
      "Personalized learning path engine using sequential knowledge graphs. OCR with Keras, graphs with Neo4j, vectors with PGVector to optimize user proficiency assessments.",
    tags: ["Keras", "Neo4j", "PGVector", "Python", "OCR"],
    year: "2024",
  },
]

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Yash was always the person in our group who could take a half-formed idea and turn it into something real overnight. While the rest of us were still debating the slide deck, he'd already have a working prototype. That bias for building is rare, especially paired with someone who actually understands the business side.",
    name: "Palak Gupta",
    role: "Business Analyst",
    company: "Enpal",
  },
  {
    id: "t2",
    quote: "Yash shipped 8 products in 8 months, most of them in under 3 weeks from first line of code to production. He doesn't wait for perfect specs — he builds, gets feedback, and iterates. Translate became our most adopted internal tool of 2025 with zero marketing. That tells you everything about the quality of what he delivers.",
    name: "Nicolai Schmid",
    role: "Manager",
    company: "COSMO CONSULT",
  },
]

// =============================================================================
// CONTACT SECTION
// =============================================================================

export const contactContent = {
  headline: "Let's Build Something",
  highlight: "Together",
  subtitle:
    "Have a project in mind or want to discuss AI solutions? I'm always open to new opportunities and conversations.",
  ctaLabel: "Get in Touch",
}

export const socialLinks = [
  {
    name: "Email",
    href: "mailto:yash.khare.work@gmail.com",
    label: "yash.khare.work@gmail.com",
    icon: "mail",
  },
  {
    name: "GitHub",
    href: "https://github.com/yashkhare0",
    label: "@yashkhare0",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-khare/",
    label: "yash-khare",
    icon: "linkedin",
  },
]

// =============================================================================
// BLOG SECTION — now powered by Velite (content/posts/*.md)
// =============================================================================
// Blog posts are defined in content/posts/ as Markdown files.
// Import them via: import { posts } from "#velite"

// =============================================================================
// SPOKEN LANGUAGES
// =============================================================================

export const spokenLanguages = [
  { language: "English", level: "Native" },
  { language: "Hindi", level: "Native" },
  { language: "French", level: "B1 - Intermediate" },
  { language: "German", level: "A1 - Beginner" },
]

// =============================================================================
// META & SEO
// =============================================================================

export const metaContent = {
  title: "Yash Khare | AI Software Engineer",
  description:
    "AI Software Engineer shipping production-ready AI products. Specialized in Python, FastAPI, Django, RAG, and LLM integration. Based in Berlin.",
  keywords: [
    "AI Software Engineer", "AI Engineer", "Python", "Django", "FastAPI",
    "React", "Next.js", "RAG", "LLM", "Machine Learning", "Berlin",
    "Semantic Search", "Prompt Engineering",
  ],
  ogImage: "/og-image.png",
}
