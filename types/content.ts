export interface NavContent {
  logo: string;
  status: string;
  showCvDownload: boolean;
}

export interface HeroContent {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface PhilosophyItem {
  icon: string;
  title: string;
  body: string;
}

export interface AboutContent {
  pageTitle: string;
  bio: string[];
  philosophy: PhilosophyItem[];
}

export interface FooterContent {
  copyright: string;
  coordinates: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tagColor: "cyan" | "magenta" | "purple";
  stack: string[];
  category: string;
  order: number;
}

export interface StackItem {
  label: string;
  icon: string;
  color: "cyan" | "magenta" | "green" | "purple";
}

export interface CvMeta {
  filename: string | null;
  uploadedAt: string | null;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

export interface ContactContent {
  heading: string;
  subtext: string;
  links: ContactLink[];
}

export interface Content {
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  footer: FooterContent;
  projects: Project[];
  stack: StackItem[];
  cv: CvMeta;
  contact: ContactContent;
}
