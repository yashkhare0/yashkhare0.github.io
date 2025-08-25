import type { Profile, Project, ExperienceEntry, Testimonial } from "@/types/content";

export const profile: Profile = {
  name: "Yash Khare",
  title: "Founder • AI Engineer",
  blurb: "Building usable intelligence. I design, ship, and scale AI systems that actually survive production.",
  avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Yash",
  location: "Berlin, Germany",
  email: "mailto:yashkhare.work@gmail.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  resumeUrl: "#resume",
};

export const projects: Project[] = [
  {
    title: "Kizuna QA Agents",
    subtitle: "Vision + Playwright + LangGraph",
    description:
      "Autonomous agents that crawl products, execute UX flows, and surface actionable bugs with visual diffs.",
    tags: ["LangGraph", "Playwright", "Vision-LLM", "Azure"],
    cta: "Case study",
    href: "#",
    accent: "from-cyan-400 via-sky-400 to-blue-500",
  },
  {
    title: "Transcript-Master",
    subtitle: "Meeting intelligence engine",
    description:
      "Real-time ingestion, diarization, and searchable insights with pgvector and TaskIQ orchestration.",
    tags: ["FastAPI", "pgvector", "vLLM", "Redis"],
    cta: "See insights",
    href: "#",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
  },
  {
    title: "Elio",
    subtitle: "K-12 smart tutor",
    description:
      "Graph-based learner modeling with conversational guidance and adaptive syllabus planning.",
    tags: ["Knowledge Graph", "RAG", "Reinforcement"],
    cta: "Prototype",
    href: "#",
    accent: "from-fuchsia-400 via-purple-400 to-indigo-400",
  },
  {
    title: "WhisperX @ Scale",
    subtitle: "Low-latency speech infra",
    description:
      "Cost-tuned streaming transcription with autoscaling GPU pools and QoS gates.",
    tags: ["A100", "CUDA", "RunPod", "Azure ML"],
    cta: "Architecture",
    href: "#",
    accent: "from-amber-400 via-orange-400 to-rose-400",
  },
];

export const skills: string[] = [
  "Python",
  "FastAPI",
  "TypeScript",
  "Next.js",
  "Postgres",
  "pgvector",
  "vLLM",
  "LangGraph",
  "Docker",
  "Kubernetes",
  "Azure",
  "Terraform",
];

export const experience: ExperienceEntry[] = [
  {
    role: "CTO / Founder",
    org: "GEM AI",
    period: "2023 → 2024",
    points: [
      "Built and delivered €175k of AI projects in 7 months",
      "Led multi-service Docker stacks across clients",
    ],
  },
  {
    role: "AI Engineer",
    org: "Cosmo Consult",
    period: "2024 → Present",
    points: [
      "Shipped production LLM apps with enterprise SSO",
      "Drove observability with Langfuse and tracing",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Joerg R.",
    role: "Investor",
    quote:
      "Yash moves from problem to shipped system frighteningly fast, and the UX doesn't suffer for it.",
  },
  {
    name: "Gunnar G.",
    role: "Professor",
    quote:
      "Strong technical depth with rare clarity of communication. He makes complex ideas feel simple.",
  },
];
