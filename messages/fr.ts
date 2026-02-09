import type { Translations } from "."

const fr: Translations = {
  meta: {
    title: "Yash Khare | Ingénieur logiciel IA",
    description:
      "Ingénieur logiciel IA livrant des produits IA prêts pour la production. Spécialisé en Python, FastAPI, Django, RAG et intégration LLM. Basé à Berlin.",
  },
  nav: {
    home: "Accueil",
    about: "À propos",
    work: "Parcours",
    skills: "Compétences",
    projects: "Projets",
    blog: "Blog",
    praise: "Avis",
    contact: "Contact",
    backToTop: "Retour en haut",
    explore: "Explorer",
  },
  hero: {
    greeting: "Bonjour, je suis",
    name: "Yash Khare",
    tagline: "Ingénieur logiciel IA senior",
    description:
      "Je livre rapidement sans compromettre la qualité. Transformer les capacités LLM/ML en fonctionnalités produit fiables, construire des plateformes qui permettent aux équipes de livrer de manière répétée. Basé à Berlin.",
    ctaPrimary: "Voir mon travail",
    ctaSecondary: "Me contacter",
    stats: [
      { value: "6+", label: "Ans d'expérience" },
      { value: "11", label: "Produits livrés" },
      { value: "175K+", label: "Chiffre d'affaires" },
    ],
  },
  about: {
    headline: "À propos",
    subheadline: "Livrer des produits IA avec des bases solides",
    paragraphs: [
      "Je livre rapidement sans compromettre la qualité. Pour les produits IA, cela signifie des bases solides : des APIs propres, des pipelines testables, des systèmes observables et des déploiements conscients des coûts.",
      "Je me concentre sur la transformation des capacités LLM/ML en fonctionnalités produit fiables, l'alignement avec les parties prenantes et la construction de plateformes qui permettent aux équipes de livrer de manière répétée. Depuis Berlin, je travaille à l'intersection de l'ingénierie IA et du développement produit scalable.",
      "Avec un Master de l'ESCP Europe (GMAT 730, 96e percentile), je combine une exécution technique approfondie avec un sens des affaires. J'ai cofondé une startup IA, dirigé des équipes distantes sur plusieurs fuseaux horaires et généré des revenus à six chiffres en quelques mois après le lancement.",
    ],
    highlights: [
      {
        icon: "brain",
        title: "IA / LLM",
        description:
          "RAG, recherche sémantique, prompt engineering, patterns d'évaluation. Hugging Face, Transformers, Ollama, vLLM.",
      },
      {
        icon: "code",
        title: "Backend & Infra",
        description:
          "Python, FastAPI, Django, Postgres, Redis, Neo4j, PGVector, RabbitMQ, Docker, Kubernetes, CI/CD.",
      },
      {
        icon: "users",
        title: "Produit & Leadership",
        description:
          "Direction d'équipes de 5 à 10 développeurs. 8 produits livrés en 8 mois. Croissance jusqu'à un chiffre d'affaires à six chiffres.",
      },
    ],
    languagesHeading: "Langues",
    languages: [
      { language: "Anglais", level: "Langue maternelle" },
      { language: "Hindi", level: "Langue maternelle" },
      { language: "Français", level: "B1 - Intermédiaire" },
      { language: "Allemand", level: "A1 - Débutant" },
    ],
    educationHeading: "Formation",
    education: [
      {
        degree: "Master en Management",
        specialization: "Innovation & High Tech",
        institution: "ESCP Europe Business School",
        location: "Berlin, Allemagne",
        period: "Sep 2022 - Fév 2025",
      },
    ],
    githubHeading: "Activité GitHub",
    totalContributions: "Contributions totales",
    currentStreak: "Série en cours",
    longestStreak: "Plus longue série",
    days: "jours",
    githubUnavailable: "Activité GitHub indisponible pour le moment",
    viewOnGithub: "Voir le profil sur GitHub",
    less: "Moins",
    more: "Plus",
  },
  experience: {
    headline: "Expérience",
    subheadline: "Où j'ai construit et livré",
    items: [
      {
        company: "COSMO CONSULT",
        role: "Ingénieur logiciel IA",
        location: "Berlin, Allemagne",
        period: "Avr 2025 - Présent",
        highlights: [
          "Développé, livré et maintenu 8 produits de bout en bout en 8 mois (de l'idéation au déploiement) avec un temps moyen de déploiement < 3 semaines",
          "Standardisé l'analytique et l'authentification sur toutes les apps avec PostHog & WorkOS ; snapshots hebdomadaires adoptés par les équipes produit et direction pour les décisions de roadmap",
          "Architecturé et pris la responsabilité complète de Sonar (la plateforme IA interne la plus importante de l'entreprise) : workflow de bout en bout pour l'ingestion de transcriptions en direct et l'analyse personnalisée",
          "Construit Translate (la plateforme interne la plus adoptée de COSMO en 2025) atteignant 25% d'utilisation sans aucune communication",
        ],
      },
      {
        company: "GEM AI",
        role: "Ingénieur IA, Co-fondateur",
        location: "Paris, France",
        period: "Jan 2024 - Jan 2025",
        highlights: [
          "Développé Echo, un outil RAG scalable de niveau entreprise utilisant Python, Django et ReactJS, générant EUR 125 000 de revenus de licences dès le premier mois",
          "Monté en charge à une équipe de 5 pour construire Snap-and-Solve en 25 jours avec Next.js, FastAPI, intégrant OpenAI, Mistral, Anthropic et Ollama",
          "Développé un moteur de cartographie de syllabus adaptatif utilisant Keras pour l'OCR, Neo4j pour les graphes et PGVector pour le stockage vectoriel",
          "Implémenté des pipelines CI/CD avec GitHub Actions, réduisant les temps de déploiement de 40%. Croissance à >EUR 175 000 de revenus et 10 développeurs en 6 mois",
        ],
      },
      {
        company: "PERNOD RICARD",
        role: "Chercheur UX",
        location: "Paris, France",
        period: "Jul 2023 - Déc 2023",
        highlights: [
          "Automatisé le reporting de données et l'analyse d'engagement avec Python et Google Apps Script, réduisant l'effort manuel de 40%",
          "Mené des recherches qualitatives pour générer des insights utilisateurs pour le développement produit, présentés via PowerBI",
          "Communiqué les insights par des présentations aux parties prenantes, contribuant aux décisions stratégiques ; transformé le stage en création d'entreprise",
        ],
      },
      {
        company: "PASSIONOID TECHNOLOGIES & BLIIP STUDIOS",
        role: "Co-fondateur | Ingénieur logiciel",
        location: "Pune, Inde",
        period: "Mai 2019 - Sep 2022",
        highlights: [
          "Dirigé une équipe de 5 développeurs pour livrer avec succès 16+ projets pour des clients nationaux et internationaux en 3 ans",
          "Développé un moteur d'automatisation CRM en 3 mois avec ReactJS et Python Django, optimisant la gestion client via des pipelines CI/CD",
          "Développé une plateforme de gestion des installations avec React et Django REST Framework avec GitHub Actions",
        ],
      },
    ],
  },
  skills: {
    headline: "Stack technique",
    subheadline: "Technologies que j'utilise au quotidien",
    categories: [
      { key: "all", label: "Toutes" },
      { key: "ai_llm", label: "IA / LLM" },
      { key: "ml_data", label: "ML / Données" },
      { key: "backend", label: "Backend" },
      { key: "infra", label: "Données & Infra" },
      { key: "frontend", label: "Frontend" },
    ],
    technologiesCount: "technologies",
    inCategory: "dans",
  },
  projects: {
    headline: "Projets",
    subheadline: "Produits que j'ai construits et livrés",
    featured: "En vedette",
    source: "Code source",
    live: "En ligne",
    items: [
      {
        title: "noll.to",
        description:
          "Traduction de documents axée sur la confidentialité pour les workflows sensibles. Concentration sur la conservation de la mise en page, le traitement contrôlé des données et le traitement fiable des documents. Livré en tant que produit SaaS.",
      },
      {
        title: "testkizuna.com",
        description:
          "Produit QA et test assisté par IA axé sur la transformation des contrôles qualité en workflows répétables et automatisables, avec une approche produit centrée sur la fiabilité et l'efficacité d'ingénierie.",
      },
      {
        title: "Plateforme IA Sonar",
        description:
          "La plateforme IA interne la plus importante de l'entreprise. Workflow de bout en bout conçu pour l'ingestion de transcriptions en direct et l'analyse personnalisée, fonctionnant comme un produit API interne.",
      },
      {
        title: "Cosma",
        description:
          "Assistant business alimenté par l'IA qui aide les équipes à gérer les workflows, automatiser les tâches répétitives et extraire des insights des données de l'entreprise. Construit comme un produit full-stack.",
      },
      {
        title: "Radar",
        description:
          "Outil d'intelligence interne pour surveiller et analyser les signaux du marché, le paysage concurrentiel et les tendances du secteur. Fournit des insights actionnables aux équipes produit et stratégie.",
      },
      {
        title: "Translate",
        description:
          "La plateforme interne la plus adoptée de COSMO en 2025, atteignant 25% d'utilisation sans aucune communication ni marketing. Construit de bout en bout comme un outil interne.",
      },
      {
        title: "Voko",
        description:
          "Outil CLI interactif pour gérer l'i18n dans les projets JavaScript et TypeScript. Supporte Google Translate, DeepL, LibreTranslate et Yandex nativement. Publié sur npm sous @yashkhare0/voko-cli.",
      },
      {
        title: "Echo - RAG Entreprise",
        description:
          "Outil de génération augmentée par récupération de niveau entreprise, construit en 45 jours. EUR 125 000 de revenus de licences générés dès le premier mois.",
      },
      {
        title: "Snap-and-Solve",
        description:
          "Solveur de problèmes alimenté par l'IA intégrant OpenAI, Mistral, Anthropic et Ollama pour l'inférence open-source. Construit en 25 jours avec une équipe de 5. Déployé sur Azure Kubernetes.",
      },
      {
        title: "Cartographe de syllabus adaptatif",
        description:
          "Moteur de parcours d'apprentissage personnalisé utilisant des graphes de connaissances séquentiels. OCR avec Keras, graphes avec Neo4j, vecteurs avec PGVector pour optimiser les évaluations de compétences.",
      },
    ],
  },
  blog: {
    headline: "Articles",
    subheadline: "Réflexions sur l'IA, l'ingénierie et la construction de produits",
    posts: [
      {
        title: "Construire des systèmes RAG en production : leçons d'Echo",
        excerpt:
          "Comment nous avons construit un outil RAG entreprise qui a généré un chiffre d'affaires à six chiffres dès son premier mois. Décisions d'architecture, pièges et ce que je ferais différemment.",
      },
      {
        title: "Livrer 8 produits IA en 8 mois",
        excerpt:
          "Un retour d'expérience sur la construction et le déploiement de 8 produits IA de bout en bout avec un temps moyen de déploiement inférieur à 3 semaines.",
      },
      {
        title: "Bases de données vectorielles en pratique : PGVector vs ChromaDB",
        excerpt:
          "Une comparaison pratique des solutions de bases de données vectorielles pour les applications IA en production, basée sur une utilisation réelle à grande échelle.",
      },
    ],
  },
  testimonials: {
    headline: "Témoignages",
    items: [
      {
        quote:
          "Yash a une capacité exceptionnelle à transformer des concepts IA complexes en produits prêts pour la production. Sa vitesse d'exécution est remarquable.",
        name: "Placeholder Name",
        role: "CTO",
        company: "Tech Company",
      },
      {
        quote:
          "Travailler avec Yash a transformé notre approche de l'intégration IA. Il a livré un système RAG complet qui a généré des revenus dès le premier jour.",
        name: "Placeholder Name",
        role: "VP Engineering",
        company: "AI Startup",
      },
      {
        quote:
          "Une combinaison rare de profondeur technique et de compréhension business. Yash ne construit pas juste des fonctionnalités -- il construit des produits qui comptent.",
        name: "Placeholder Name",
        role: "Directeur Produit",
        company: "Enterprise Corp",
      },
    ],
  },
  contact: {
    headline: "Construisons quelque chose",
    highlight: "ensemble",
    subtitle:
      "Vous avez un projet en tête ou souhaitez discuter de solutions IA ? Je suis toujours ouvert aux nouvelles opportunités et conversations.",
    ctaLabel: "Me contacter",
  },
  common: {
    copyright: "Yash Khare",
    backToTop: "Retour en haut",
  },
}

export default fr
