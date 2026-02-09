import type { Translations } from "."

const de: Translations = {
  meta: {
    title: "Yash Khare | KI-Softwareingenieur",
    description:
      "KI-Softwareingenieur, der produktionsreife KI-Produkte liefert. Spezialisiert auf Python, FastAPI, Django, RAG und LLM-Integration. Ansässig in Berlin.",
  },
  nav: {
    home: "Start",
    about: "Über mich",
    work: "Arbeit",
    skills: "Skills",
    projects: "Projekte",
    blog: "Blog",
    praise: "Referenzen",
    contact: "Kontakt",
    backToTop: "Nach oben",
    explore: "Entdecken",
  },
  hero: {
    greeting: "Hallo, ich bin",
    name: "Yash Khare",
    tagline: "Senior KI-Softwareingenieur",
    description:
      "Ich liefere schnell, ohne bei der Qualität Kompromisse einzugehen. LLM/ML-Fähigkeiten in zuverlässige Produktfeatures umwandeln, Plattformen bauen, die Teams wiederholbar liefern lassen. Ansässig in Berlin.",
    ctaPrimary: "Meine Arbeit ansehen",
    ctaSecondary: "Kontakt aufnehmen",
    stats: [
      { value: "6+", label: "Jahre Erfahrung" },
      { value: "11", label: "Produkte geliefert" },
      { value: "175K+", label: "Umsatz generiert" },
    ],
  },
  about: {
    headline: "Über mich",
    subheadline: "KI-Produkte mit soliden Grundlagen liefern",
    paragraphs: [
      "Ich liefere schnell, ohne bei der Qualität Kompromisse einzugehen. Für KI-Produkte bedeutet das: saubere APIs, testbare Pipelines, beobachtbare Systeme und kostenbewusste Deployments.",
      "Ich konzentriere mich darauf, LLM/ML-Fähigkeiten in zuverlässige Produktfeatures umzuwandeln, mich mit Stakeholdern abzustimmen und Plattformen zu bauen, die Teams wiederholbar liefern lassen. Von Berlin aus arbeite ich an der Schnittstelle von KI-Engineering und skalierbarer Produktentwicklung.",
      "Mit einem Master der ESCP Europe (GMAT 730, 96. Perzentil) verbinde ich tiefgreifende technische Umsetzung mit Geschäftssinn. Ich habe ein KI-Startup mitgegründet, Remote-Teams über Zeitzonen hinweg geleitet und innerhalb weniger Monate nach dem Start sechsstellige Umsätze generiert.",
    ],
    highlights: [
      {
        icon: "brain",
        title: "KI / LLM",
        description:
          "RAG, semantische Suche, Prompt Engineering, Eval-Muster. Hugging Face, Transformers, Ollama, vLLM.",
      },
      {
        icon: "code",
        title: "Backend & Infra",
        description:
          "Python, FastAPI, Django, Postgres, Redis, Neo4j, PGVector, RabbitMQ, Docker, Kubernetes, CI/CD.",
      },
      {
        icon: "users",
        title: "Produkt & Führung",
        description:
          "Teams von 5-10 Entwicklern geleitet. 8 Produkte in 8 Monaten geliefert. Auf sechsstelligen Umsatz skaliert.",
      },
    ],
    languagesHeading: "Sprachen",
    languages: [
      { language: "Englisch", level: "Muttersprache" },
      { language: "Hindi", level: "Muttersprache" },
      { language: "Französisch", level: "B1 - Mittelstufe" },
      { language: "Deutsch", level: "A1 - Anfänger" },
    ],
    educationHeading: "Ausbildung",
    education: [
      {
        degree: "Master in Management",
        specialization: "Innovation & High Tech",
        institution: "ESCP Europe Business School",
        location: "Berlin, Deutschland",
        period: "Sep 2022 - Feb 2025",
      },
    ],
    githubHeading: "GitHub-Aktivität",
    totalContributions: "Gesamte Beiträge",
    currentStreak: "Aktuelle Serie",
    longestStreak: "Längste Serie",
    days: "Tage",
    githubUnavailable: "GitHub-Aktivität derzeit nicht verfügbar",
    viewOnGithub: "Profil auf GitHub ansehen",
    less: "Weniger",
    more: "Mehr",
  },
  experience: {
    headline: "Erfahrung",
    subheadline: "Wo ich gebaut und geliefert habe",
    items: [
      {
        company: "COSMO CONSULT",
        role: "KI-Softwareingenieur",
        location: "Berlin, Deutschland",
        period: "Apr 2025 - Heute",
        highlights: [
          "8 Produkte End-to-End in 8 Monaten entwickelt, ausgeliefert und gewartet (von der Idee bis zum Deployment) mit einer durchschnittlichen Time-to-Deployment < 3 Wochen",
          "Analytics und Authentifizierung über alle Apps mit PostHog & WorkOS standardisiert; wöchentliche Executive-Snapshots von Produkt- und Führungsteams für Roadmap-Entscheidungen übernommen",
          "Sonar (die wichtigste interne KI-Plattform des Unternehmens) architektonisch verantwortet: End-to-End-Workflow für Live-Transkript-Aufnahme und individuelle Analyse",
          "Translate (die meistgenutzte interne Plattform von COSMO 2025) aufgebaut, mit 25% Nutzung ohne jegliche Kommunikation erreicht",
        ],
      },
      {
        company: "GEM AI",
        role: "KI-Ingenieur, Mitgründer",
        location: "Paris, Frankreich",
        period: "Jan 2024 - Jan 2025",
        highlights: [
          "Echo entwickelt, ein unternehmenstaugliches, skalierbares RAG-Tool mit Python, Django und ReactJS, das im ersten Monat EUR 125.000 Lizenzumsatz generierte",
          "Auf ein Team von 5 skaliert, um Snap-and-Solve in 25 Tagen mit Next.js, FastAPI und Integration von OpenAI, Mistral, Anthropic und Ollama zu bauen",
          "Eine adaptive Lehrplan-Mapping-Engine mit Keras für OCR, Neo4j für Graphen und PGVector für Vektorspeicher entwickelt",
          "CI/CD-Pipelines mit GitHub Actions implementiert, Deployment-Zeiten um 40% reduziert. Auf >EUR 175.000 Umsatz und 10 Entwickler in 6 Monaten skaliert",
        ],
      },
      {
        company: "PERNOD RICARD",
        role: "UX-Forscher",
        location: "Paris, Frankreich",
        period: "Jul 2023 - Dez 2023",
        highlights: [
          "Datenberichterstattung und Engagement-Analyse mit Python und Google Apps Script automatisiert, manuellen Aufwand um 40% reduziert",
          "Qualitative Forschung durchgeführt, um Nutzererkenntnisse für die Produktentwicklung zu generieren, präsentiert mit PowerBI",
          "Erkenntnisse durch Präsentationen an Stakeholder kommuniziert, zu strategischen Entscheidungen beigetragen; Praktikum in Unternehmensgründung umgewandelt",
        ],
      },
      {
        company: "PASSIONOID TECHNOLOGIES & BLIIP STUDIOS",
        role: "Mitgründer | Softwareingenieur",
        location: "Pune, Indien",
        period: "Mai 2019 - Sep 2022",
        highlights: [
          "Ein Team von 5 Entwicklern geleitet, um erfolgreich 16+ Projekte für nationale und internationale Kunden in 3 Jahren zu liefern",
          "Eine CRM-Automatisierungs-Engine in 3 Monaten mit ReactJS und Python Django entwickelt, Kundenmanagement durch CI/CD-Pipelines optimiert",
          "Eine Facility-Management-Plattform mit React und Django REST Framework mit GitHub Actions entwickelt",
        ],
      },
    ],
  },
  skills: {
    headline: "Tech Stack",
    subheadline: "Technologien, mit denen ich täglich arbeite",
    categories: [
      { key: "all", label: "Alle" },
      { key: "ai_llm", label: "KI / LLM" },
      { key: "ml_data", label: "ML / Daten" },
      { key: "backend", label: "Backend" },
      { key: "infra", label: "Daten & Infra" },
      { key: "frontend", label: "Frontend" },
    ],
    technologiesCount: "Technologien",
    inCategory: "in",
  },
  projects: {
    headline: "Projekte",
    subheadline: "Produkte, die ich gebaut und geliefert habe",
    featured: "Hervorgehoben",
    source: "Quellcode",
    live: "Live",
    items: [
      {
        title: "noll.to",
        description:
          "Datenschutzorientierte Dokumentenübersetzung für sensible Workflows. Fokus auf Layouterhaltung, kontrollierte Datenverarbeitung und zuverlässige Dokumentenverarbeitung. Als SaaS-Produkt veröffentlicht.",
      },
      {
        title: "testkizuna.com",
        description:
          "KI-gestütztes QA- und Testprodukt, das darauf ausgerichtet ist, Qualitätsprüfungen in wiederholbare, automatisierbare Workflows umzuwandeln, mit einem Produktfokus auf Zuverlässigkeit und Ingenieurseffizienz.",
      },
      {
        title: "Sonar AI-Plattform",
        description:
          "Die wichtigste interne KI-Plattform des Unternehmens. End-to-End-Workflow für Live-Transkript-Aufnahme und individuelle Analyse, als internes API-Produkt betrieben.",
      },
      {
        title: "Cosma",
        description:
          "KI-gestützter Business-Assistent, der Teams bei der Verwaltung von Workflows, der Automatisierung wiederkehrender Aufgaben und der Gewinnung von Erkenntnissen aus Unternehmensdaten hilft. Als Full-Stack-Produkt gebaut.",
      },
      {
        title: "Radar",
        description:
          "Internes Intelligence-Tool zur Überwachung und Analyse von Marktsignalen, Wettbewerbslandschaft und Branchentrends. Liefert umsetzbare Erkenntnisse an Produkt- und Strategieteams.",
      },
      {
        title: "Translate",
        description:
          "Die meistgenutzte interne Plattform von COSMO 2025, mit 25% Nutzung ohne jegliche Kommunikation oder Marketing erreicht. End-to-End als internes Tool gebaut.",
      },
      {
        title: "Voko",
        description:
          "Interaktives CLI-Tool zur Verwaltung von i18n in JavaScript- und TypeScript-Projekten. Unterstützt Google Translate, DeepL, LibreTranslate und Yandex direkt. Auf npm als @yashkhare0/voko-cli veröffentlicht.",
      },
      {
        title: "Echo - Enterprise RAG",
        description:
          "Unternehmenstaugliches, skalierbares Retrieval-Augmented-Generation-Tool, in 45 Tagen gebaut. EUR 125.000 Lizenzumsatz im ersten Monat generiert.",
      },
      {
        title: "Snap-and-Solve",
        description:
          "KI-gestützter Problemlöser mit Integration von OpenAI, Mistral, Anthropic und Ollama für Open-Source-Inferenz. In 25 Tagen mit einem 5-köpfigen Team gebaut. Auf Azure Kubernetes deployed.",
      },
      {
        title: "Adaptiver Lehrplan-Mapper",
        description:
          "Personalisierte Lernpfad-Engine mit sequenziellen Wissensgraphen. OCR mit Keras, Graphen mit Neo4j, Vektoren mit PGVector zur Optimierung von Kompetenzbewertungen.",
      },
    ],
  },
  blog: {
    headline: "Artikel",
    subheadline: "Gedanken zu KI, Engineering und Produktentwicklung",
    posts: [
      {
        title: "Produktions-RAG-Systeme bauen: Lehren aus Echo",
        excerpt:
          "Wie wir ein Enterprise-RAG-Tool gebaut haben, das im ersten Monat sechsstelligen Umsatz generierte. Architekturentscheidungen, Fallstricke und was ich anders machen würde.",
      },
      {
        title: "8 KI-Produkte in 8 Monaten ausliefern",
        excerpt:
          "Ein Rückblick auf den Bau und das Deployment von 8 End-to-End-KI-Produkten mit einer durchschnittlichen Time-to-Deployment von unter 3 Wochen.",
      },
      {
        title: "Vektordatenbanken in der Praxis: PGVector vs ChromaDB",
        excerpt:
          "Ein praktischer Vergleich von Vektordatenbank-Lösungen für produktive KI-Anwendungen, basierend auf realem Einsatz im großen Maßstab.",
      },
    ],
  },
  testimonials: {
    headline: "Empfehlungen",
    items: [
      {
        quote:
          "Yash hat eine außergewöhnliche Fähigkeit, komplexe KI-Konzepte in produktionsreife Produkte umzuwandeln. Seine Umsetzungsgeschwindigkeit ist bemerkenswert.",
        name: "Placeholder Name",
        role: "CTO",
        company: "Tech Company",
      },
      {
        quote:
          "Die Zusammenarbeit mit Yash hat unseren Ansatz zur KI-Integration transformiert. Er hat ein komplettes RAG-System geliefert, das ab dem ersten Tag Umsatz generierte.",
        name: "Placeholder Name",
        role: "VP Engineering",
        company: "AI Startup",
      },
      {
        quote:
          "Eine seltene Kombination aus technischer Tiefe und Geschäftsverständnis. Yash baut nicht nur Features -- er baut Produkte, die zählen.",
        name: "Placeholder Name",
        role: "Product Director",
        company: "Enterprise Corp",
      },
    ],
  },
  contact: {
    headline: "Lassen Sie uns etwas",
    highlight: "zusammen bauen",
    subtitle:
      "Haben Sie ein Projekt im Sinn oder möchten Sie über KI-Lösungen sprechen? Ich bin immer offen für neue Möglichkeiten und Gespräche.",
    ctaLabel: "Kontakt aufnehmen",
  },
  common: {
    copyright: "Yash Khare",
    backToTop: "Nach oben",
  },
}

export default de
