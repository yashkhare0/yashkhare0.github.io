import type { Translations } from "."

const en: Translations = {
  meta: {
    title: "Yash Khare | AI Software Engineer",
    description:
      "AI Software Engineer shipping production-ready AI products. Specialized in Python, FastAPI, Django, RAG, and LLM integration. Based in Berlin.",
  },
  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    praise: "Praise",
    contact: "Contact",
    backToTop: "Back to top",
    explore: "Explore",
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Yash Khare",
    tagline: "Senior AI Software Engineer",
    description:
      "I ship fast without gambling with quality. Turning LLM/ML capabilities into reliable product features, building platforms that let teams ship repeatedly. Based in Berlin.",
    ctaPrimary: "View My Work",
    ctaSecondary: "Get in Touch",
    stats: [
      { value: "6+", label: "Years Experience" },
      { value: "13", label: "Products Shipped" },
      { value: "175K+", label: "Revenue Generated" },
    ],
  },
  about: {
    headline: "About Me",
    subheadline: "Shipping AI products with solid foundations",
    paragraphs: [
      "I ship fast without gambling with quality. For AI products, that means solid foundations: clean APIs, testable pipelines, observable systems, and cost-aware deployments.",
      "I focus on turning LLM/ML capabilities into reliable product features, aligning with stakeholders, and building platforms that let teams ship repeatedly. Based in Berlin, I work at the intersection of AI engineering and scalable product development.",
      "With a Master's from ESCP Europe (GMAT 730, 96th percentile), I combine deep technical execution with business acumen. I've co-founded an AI startup, led remote teams across time zones, and generated six-figure revenues within months of launch.",
    ],
    highlights: [
      {
        icon: "brain",
        title: "AI / LLM",
        description:
          "RAG, semantic search, prompt engineering, eval patterns. Hugging Face, Transformers, Ollama, vLLM.",
      },
      {
        icon: "code",
        title: "Backend & Infra",
        description:
          "Python, FastAPI, Django, Postgres, Redis, Neo4j, PGVector, RabbitMQ, Docker, Kubernetes, CI/CD.",
      },
      {
        icon: "users",
        title: "Product & Leadership",
        description:
          "Led teams of 5-10 developers. Shipped 8 products in 8 months. Scaled to six-figure revenue.",
      },
    ],
    languagesHeading: "Languages",
    languages: [
      { language: "English", level: "Native" },
      { language: "Hindi", level: "Native" },
      { language: "French", level: "B1 - Intermediate" },
      { language: "German", level: "A1 - Beginner" },
    ],
    educationHeading: "Education",
    education: [
      {
        degree: "Masters in Management",
        specialization: "Innovation & High Tech",
        institution: "ESCP Europe Business School",
        location: "Berlin, Germany",
        period: "Sep 2022 - Feb 2025",
        details: [
          "Scored 730 (96th percentile) on GMAT (V41Q49).",
          "Relevant coursework: Advanced Python Programming, Machine Learning and Analysis, Data Driven Marketing.",
        ],
      },
      {
        degree: "Bachelor of Business Administration",
        specialization: "Marketing Management",
        institution: "Sir Parshurambhau College",
        location: "Pune, India",
        period: "June 2017 - April 2020",
        details: [
          "Relevant coursework: Big Data in Marketing, Financial Management, Business Strategy.",
        ],
      },
      {
        degree: "Mechanical Engineering",
        institution: "A.I.S.S.M.S. Polytechnic College",
        location: "Pune, India",
        period: "June 2014 - Sept 2017",
        details: [
          "Relevant coursework: Computer Science, Software Development, Fundamentals of Coding.",
        ],
      },
    ],
    githubHeading: "GitHub Activity",
    totalContributions: "Total Contributions",
    currentStreak: "Current Streak",
    longestStreak: "Longest Streak",
    days: "days",
    githubUnavailable: "GitHub activity unavailable right now",
    viewOnGithub: "View profile on GitHub",
    less: "Less",
    more: "More",
  },
  experience: {
    headline: "Experience",
    subheadline: "Where I've built and shipped",
    items: [
      {
        company: "COSMO CONSULT",
        role: "AI Software Engineer",
        location: "Berlin, Germany",
        period: "Apr 2025 - Present",
        highlights: [
          "Developed, shipped and currently maintain 8 products end-to-end in 8 months (ideation to deployment) with avg time-to-deployment < 3 weeks",
          "Standardized analytics and authentication across all apps with PostHog & WorkOS; weekly exec snapshots adopted by product and leadership for roadmap decisions",
          "Architected and took full ownership of Sonar (company's most important internal AI platform): end-to-end workflow for live transcript ingestion and custom analysis",
          "Built Translate (COSMO highest adopted internal platform of 2025) reaching 25% usage without any communications",
        ],
      },
      {
        company: "GEM AI",
        role: "AI Engineer, Co-Founder",
        location: "Paris, France",
        period: "Jan 2024 - Jan 2025",
        highlights: [
          "Developed Echo, an enterprise-grade scalable RAG tool using Python, Django, and ReactJS, generating EUR 125,000 in licensing revenue in the first month",
          "Scaled to a team of 5 to build Snap-and-Solve in 25 days using Next.js, FastAPI, integrating OpenAI, Mistral, Anthropic, and Ollama",
          "Developed an adaptive syllabus mapping engine using Keras for OCR, Neo4j for graphs, and PGVector for vector storage",
          "Implemented CI/CD pipelines with GitHub Actions, reducing deployment times by 40%. Scaled to >EUR 175,000 revenue and 10 developers in 6 months",
        ],
      },
      {
        company: "PERNOD RICARD",
        role: "UX Researcher",
        location: "Paris, France",
        period: "Jul 2023 - Dec 2023",
        highlights: [
          "Automated data reporting and engagement analysis using Python and Google Apps Script, reducing manual effort by 40%",
          "Conducted qualitative research to generate user insights for product development, presented using PowerBI",
          "Communicated insights through presentations to stakeholders, contributing to strategic decisions; converted internship into founding own venture",
        ],
      },
      {
        company: "PASSIONOID TECHNOLOGIES & BLIIP STUDIOS",
        role: "Co-Founder | Software Engineer",
        location: "Pune, India",
        period: "May 2019 - Sept 2022",
        highlights: [
          "Led a team of 5 developers to successfully deliver 16+ projects for national and international clients in 3 years",
          "Developed a CRM Automation Engine in 3 months using ReactJS and Python Django, streamlining client management through CI/CD pipelines",
          "Developed a facility management platform leveraging React and Django REST Framework with GitHub Actions",
        ],
      },
    ],
  },
  skills: {
    headline: "Tech Stack",
    subheadline: "Technologies I work with daily",
    categories: [
      { key: "all", label: "All" },
      { key: "ai_llm", label: "AI / LLM" },
      { key: "ml_data", label: "ML / Data" },
      { key: "backend", label: "Backend" },
      { key: "infra", label: "Data & Infra" },
      { key: "frontend", label: "Frontend" },
    ],
    technologiesCount: "technologies",
    inCategory: "in",
  },
  projects: {
    headline: "Projects",
    subheadline: "Products I've built and shipped",
    featured: "Featured",
    source: "Source",
    live: "Live",
    items: [
      {
        title: "Drio",
        description:
          "No-code platform for building and publishing AI-native apps. Visual builder with 21 widget primitives, Skybridge compiler, and one-click deployment to ChatGPT, Claude, and Gemini. Co-founded and building as CTO. getdrio.com",
      },
      {
        title: "TalkTo",
        description:
          "Local-first communication platform for AI agents — like Slack, but for machines. Hub-and-node relay architecture enabling multi-tenant agent collaboration with 200+ tests. hyperslack.github.io",
      },
      {
        title: "noll.to",
        description:
          "Privacy-first document translation built for sensitive workflows. Focused on layout retention, controlled data handling, and reliable document processing. Shipped as a SaaS product.",
      },
      {
        title: "testkizuna.com",
        description:
          "AI-assisted QA and testing product focused on turning quality checks into repeatable, automatable workflows, with a product mindset around reliability and engineering efficiency.",
      },
      {
        title: "Sonar AI Platform",
        description:
          "Company's most important internal AI platform. Designed the end-to-end workflow for live transcript ingestion and custom analysis, running as an internal API product.",
      },
      {
        title: "Cosma",
        description:
          "AI-powered business assistant that helps teams manage workflows, automate repetitive tasks, and surface insights from company data. Built as a full-stack product.",
      },
      {
        title: "Radar",
        description:
          "Internal intelligence tool for monitoring and analyzing market signals, competitive landscape, and industry trends. Delivers actionable insights to product and strategy teams.",
      },
      {
        title: "Translate",
        description:
          "COSMO's highest adopted internal platform of 2025, reaching 25% usage without any communications or marketing. Built end-to-end as an internal tool.",
      },
      {
        title: "Voko",
        description:
          "Interactive CLI tool for managing i18n in JavaScript and TypeScript projects. Supports Google Translate, DeepL, LibreTranslate, and Yandex out of the box. Published on npm as @yashkhare0/voko-cli.",
      },
      {
        title: "Echo - Enterprise RAG",
        description:
          "Enterprise-grade scalable retrieval-augmented generation tool built in 45 days. Generated EUR 125,000 in licensing revenue in the first month.",
      },
      {
        title: "Snap-and-Solve",
        description:
          "AI-powered problem solver integrating OpenAI, Mistral, Anthropic, and Ollama for open-source inference. Built in 25 days with a team of 5. Deployed on Azure Kubernetes.",
      },
      {
        title: "Adaptive Syllabus Mapper",
        description:
          "Personalized learning path engine using sequential knowledge graphs. OCR with Keras, graphs with Neo4j, vectors with PGVector to optimize user proficiency assessments.",
      },
    ],
  },
  blog: {
    headline: "Writing",
    subheadline: "Thoughts on AI, engineering, and building products",
  },
  testimonials: {
    headline: "Kind Words",
    items: [
      {
        quote:
          "Yash was always the person in our group who could take a half-formed idea and turn it into something real overnight. While the rest of us were still debating the slide deck, he'd already have a working prototype. That bias for building is rare, especially paired with someone who actually understands the business side.",
        name: "Palak Gupta",
        role: "Business Analyst",
        company: "Enpal",
      },
      {
        quote:
          "Yash shipped 8 products in 8 months, most of them in under 3 weeks from first line of code to production. He doesn't wait for perfect specs — he builds, gets feedback, and iterates. Translate became our most adopted internal tool of 2025 with zero marketing. That tells you everything about the quality of what he delivers.",
        name: "Nicolai Schmid",
        role: "Manager",
        company: "COSMO CONSULT",
      },
      {
        quote: "",
        name: "more_coming",
        role: "",
        company: "",
      },
    ],
  },
  contact: {
    headline: "Let's Build Something",
    highlight: "Together",
    subtitle:
      "Have a project in mind or want to discuss AI solutions? I'm always open to new opportunities and conversations.",
    ctaLabel: "Get in Touch",
  },
  common: {
    copyright: "Yash Khare",
    backToTop: "Back to top",
  },
}

export default en
