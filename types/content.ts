export interface Profile {
  name: string;
  title: string;
  blurb: string;
  avatar: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  accent: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}
