// =============================================================================
// SITE CONTENT CONFIGURATION
// =============================================================================
// All resume and landing page content lives here. Updates to profiles, projects,
// or testimonials can be made here without touching any UI code.

export const siteConfig = {
  name: "Yash Khare",
  title: "AI Developer & Full-Stack Engineer",
  email: "yash.khare.work@gmail.com",
  phone: "+33 769054521",
  location: "Berlin, Germany",
  website: "https://yashkhare0.github.io",
};

// =============================================================================
// HERO SECTION
// =============================================================================
export const heroContent = {
  firstName: "YASH",
  lastName: "KHARE",
  tagline: {
    prefix: "AI Developer & Engineer building intelligent systems with",
    highlights: [
      { text: "scalable architecture", color: "var(--sunset-coral)" },
      { text: "rapid delivery", color: "var(--golden-hour)" },
    ],
    suffix: ".",
  },
  // Short version for the hero
  subtitle:
    "AI Developer & Engineer shipping production-ready AI products. 4+ years leading remote teams across Python, React, and cloud infrastructure.",
  cta: {
    primary: { label: "View Work", section: "projects" },
    secondary: { label: "Say Hello", section: "contact" },
  },
};

// =============================================================================
// ABOUT SECTION
// =============================================================================
export const aboutContent = {
  headline: {
    prefix: "Building with",
    highlight: "velocity",
  },
  intro:
    "I'm an AI developer and full-stack engineer who ships fast without cutting corners. 8 products in 8 months, each deployed in under 3 weeks.",
  description:
    "Based in Berlin, I specialize in end-to-end product development — from ideation to production. Whether it's RAG pipelines, microservices, or enterprise dashboards, I focus on solutions that scale and deliver real business value.",
  traits: [
    {
      title: "AI & ML",
      description:
        "RAG systems, vector search, LLM integrations. Building intelligent products that understand and respond.",
      icon: "◇",
    },
    {
      title: "Full-Stack",
      description:
        "Django, FastAPI, Next.js. Architecting scalable systems from database to deployment.",
      icon: "△",
    },
    {
      title: "Leadership",
      description:
        "Led teams of 5-10 developers across time zones. Shipped €175K+ in revenue in 6 months.",
      icon: "○",
    },
  ],
};

// =============================================================================
// EXPERIENCE SECTION
// =============================================================================
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  technologies: string[];
  highlights: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "cosmo",
    company: "COSMO CONSULT",
    role: "AI Developer",
    location: "Berlin, Germany",
    period: "Apr 2025 – Present",
    current: true,
    technologies: [
      "Next.js",
      "Vercel",
      "FastAPI",
      "PostgreSQL",
      "PGVector",
      "Django",
      "Neo4j",
      "Azure",
      "RabbitMQ",
      "Pulumi",
      "PostHog",
      "WorkOS",
    ],
    highlights: [
      "Shipped 8 products end-to-end in 8 months with avg time-to-deployment < 3 weeks",
      "Standardized analytics across all apps with PostHog: event taxonomy, funnels, retention dashboards",
      "Architected 'Sonar' — the company's most important internal AI platform for transcript analysis",
    ],
  },
  {
    id: "gem",
    company: "GEM AI",
    role: "AI Engineer | CTO | Co-Founder",
    location: "Paris, France",
    period: "Jan 2024 – Jan 2025",
    technologies: [
      "Python",
      "Django",
      "FastAPI",
      "ReactJS",
      "TypeScript",
      "Azure",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "GitHub Actions",
    ],
    highlights: [
      "Built 'Echo' — enterprise RAG tool generating €125,000 in licensing revenue in first month",
      "Led team of 5 to build 'snap-and-solve' in 25 days with Next.js, FastAPI, and multi-model AI",
      "Generated €175,000+ revenue in 6 months leading 10 developers across time zones",
      "Developed adaptive syllabus mapping engine with Neo4j graphs and PGVector for assessments",
    ],
  },
  {
    id: "pernod",
    company: "PERNOD RICARD",
    role: "Digital UX Researcher | Internship",
    location: "Paris, France",
    period: "Jul 2023 – Dec 2023",
    technologies: ["Python", "Google Apps Script", "PowerBI", "Excel"],
    highlights: [
      "Automated data reporting and engagement analysis, reducing manual effort by 40%",
      "Conducted qualitative research for product development insights",
      "Successfully converted internship into founding my own venture",
    ],
  },
  {
    id: "passionoid",
    company: "PASSIONOID TECHNOLOGIES & BLIIP STUDIOS",
    role: "Co-Founder | Software Engineer",
    location: "Pune, India",
    period: "Sep 2021 – May 2022",
    technologies: [
      "ReactJS",
      "Flutter",
      "Django",
      "React Native",
      "PostgreSQL",
      "GitHub Actions",
    ],
    highlights: [
      "Led team of 5 to deliver 16+ projects for national and international clients in 3 years",
      "Developed CRM Automation Engine in 3 months using ReactJS and Django",
      "Built facility management platform with React and Django REST Framework",
    ],
  },
];

// =============================================================================
// EDUCATION SECTION
// =============================================================================
export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  location: string;
  period: string;
  highlights?: string[];
}

export const education: Education[] = [
  {
    id: "escp",
    institution: "ESCP Europe Business School",
    degree: "Master's in Management",
    specialization: "Innovation & High Tech",
    location: "Berlin, Germany",
    period: "Sep 2022 – Feb 2025",
    highlights: [
      "GMAT: 730 (96th percentile) - V41 Q49",
      "Advanced Python Programming, Machine Learning, Data Driven Marketing",
    ],
  },
  {
    id: "sp",
    institution: "Sir Parshurambhau College",
    degree: "Bachelor of Business Administration",
    specialization: "Marketing Management",
    location: "Pune, India",
    period: "June 2017 – April 2020",
    highlights: ["Big Data in Marketing, Financial Management, Business Strategy"],
  },
  {
    id: "aissms",
    institution: "A.I.S.S.M.S. Polytechnic College",
    degree: "Diploma in Mechanical Engineering",
    location: "Pune, India",
    period: "June 2014 – Sept 2017",
    highlights: ["Computer Science, Software Development, Fundamentals of Coding"],
  },
];

// =============================================================================
// SKILLS SECTION
// =============================================================================
export interface Skill {
  name: string;
  category: "backend" | "frontend" | "ai" | "genai" | "tools" | "languages";
}

export const skills: Skill[] = [
  // Backend & Databases
  { name: "Django", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Neo4j", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PGVector", category: "backend" },
  { name: "ChromaDB", category: "backend" },

  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Flutter", category: "frontend" },

  // AI/ML
  { name: "TensorFlow", category: "ai" },
  { name: "PyTorch", category: "ai" },
  { name: "scikit-learn", category: "ai" },
  { name: "NumPy", category: "ai" },
  { name: "Pandas", category: "ai" },
  { name: "OpenCV", category: "ai" },
  { name: "spaCy", category: "ai" },
  { name: "NLTK", category: "ai" },

  // GenAI
  { name: "LangChain", category: "genai" },
  { name: "LlamaIndex", category: "genai" },
  { name: "Hugging Face", category: "genai" },
  { name: "Ollama", category: "genai" },
  { name: "vLLM", category: "genai" },
  { name: "RAG", category: "genai" },
  { name: "Transformers", category: "genai" },

  // Tools & Cloud
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "Azure", category: "tools" },
  { name: "GitHub Actions", category: "tools" },
  { name: "Pulumi", category: "tools" },
  { name: "PostHog", category: "tools" },
];

export const skillCategories = [
  { key: "all", label: "All" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "ai", label: "AI/ML" },
  { key: "genai", label: "GenAI" },
  { key: "tools", label: "DevOps" },
];

export const spokenLanguages = [
  { language: "English", level: "Native" },
  { language: "Hindi", level: "Native" },
  { language: "French", level: "B1 - Intermediate" },
  { language: "German", level: "A1 - Beginner" },
];

// =============================================================================
// PROJECTS SECTION
// =============================================================================
// Placeholder structure - User will provide actual project data later
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  featured?: boolean;
  image?: string;
}

export const projects: Project[] = [
  // Placeholder projects based on resume highlights
  {
    id: "sonar",
    title: "Sonar AI Platform",
    description:
      "Internal AI platform for transcript ingestion and custom analysis. End-to-end workflow design running as an internal API product.",
    tags: ["FastAPI", "PostgreSQL", "PGVector", "Azure", "RabbitMQ"],
    year: "2025",
    featured: true,
  },
  {
    id: "echo",
    title: "Echo - Enterprise RAG",
    description:
      "Enterprise-grade scalable retrieval-augmented generation tool. Generated €125,000 in licensing revenue in the first month.",
    tags: ["Python", "Django", "ReactJS", "PostgreSQL", "RAG"],
    year: "2024",
  },
  {
    id: "snap-solve",
    title: "Snap-and-Solve",
    description:
      "AI-powered problem solver integrating OpenAI, Mistral, Anthropic, and Ollama. Built in 25 days with a team of 5.",
    tags: ["Next.js", "FastAPI", "Azure Kubernetes", "Prometheus", "Grafana"],
    year: "2024",
  },
  {
    id: "syllabus-mapper",
    title: "Adaptive Syllabus Mapper",
    description:
      "Personalized learning path engine using sequential knowledge graphs. OCR with Keras, graphs with Neo4j, vectors with PGVector.",
    tags: ["Keras", "Neo4j", "PGVector", "Python", "OCR"],
    year: "2024",
  },
];

// =============================================================================
// CONTACT SECTION
// =============================================================================
export const contactContent = {
  headline: {
    prefix: "Let's create",
    middle: "something",
    highlight: "amazing",
  },
  subtitle: "Have a project in mind? Or just want to say hello?\nI'd love to hear from you!",
  ctaLabel: "Get in Touch",
};

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
    href: "https://linkedin.com/in/yashkhare0",
    label: "yashkhare0",
    icon: "linkedin",
  },
];

// =============================================================================
// META & SEO
// =============================================================================
export const metaContent = {
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
  ogImage: "/og-image.png",
};
