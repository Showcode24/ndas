// lib/academics-data.ts
// All static content for the Academics page.

import { Ship, Cpu, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroData = {
  eyebrow: "Training Programmes",
  heading: "A Practical Curriculum Built Around Trade Competence.",
  subheading:
    "NDAS training is organized around progressive apprenticeship development, hands-on learning, and four core technical trades.",
  statCard: {
    title: "Practical Excellence",
    subtitle: "Over 5,000+ hours of dockyard-integrated learning.",
  },
} as const;

// ─── Training Structure ───────────────────────────────────────────────────────

export const trainingStructureData = {
  eyebrow: "Training Structure",
  heading: "From Foundational Exposure to Higher Technical Proficiency.",
  description:
    "The Basic Apprentice Course introduces trainees to trade practice, workshop culture, and practical task execution. The Intermediate and Advanced Apprentice Courses are intended to deepen technical competence and broaden specialization.",
} as const;

// ─── Programs ─────────────────────────────────────────────────────────────────

export const programs: Program[] = [
  {
    id: "WF-101",
    title: "Welding & Fabrication",
    description:
      "Training in metal joining processes, fabrication techniques, cutting methods, and practical repair support.",
    category: "Mechanical",
    tags: ["BAC", "Industrial Training"],
    duration: "3 Years",
  },
  {
    id: "EE-201",
    title: "Electrical Electronics",
    description:
      "Training in electrical installation, basic controls, fault diagnosis, and motor rewinding.",
    category: "Electrical",
    tags: ["BAC", "Electrical"],
    duration: "3 Years",
  },
  {
    id: "PP-301",
    title: "Plumbing & Pipe Fitting",
    description:
      "Training in pipe systems, fittings, installation methods, and maintenance procedures.",
    category: "Mechanical",
    tags: ["BAC", "Mechanical"],
    duration: "3 Years",
  },
  {
    id: "CJ-401",
    title: "Carpentry & Joinery",
    description:
      "Training in woodwork, joinery, fitting, structural tasks, and practical workshop operations.",
    category: "Construction",
    tags: ["BAC", "Construction"],
    duration: "3 Years",
  },
];

export const programCategories = ["All", "Mechanical", "Electrical", "Construction"] as const;
export type ProgramCategory = (typeof programCategories)[number];

// ─── Features ─────────────────────────────────────────────────────────────────

export const features: Feature[] = [
  {
    icon: Ship,
    title: "Real Dockyard Context",
    description:
      "The School's biggest advantage is that training takes place within the operational environment of Naval Dockyard Limited, not in isolation from it.",
    color: "bg-blue-500",
  },
  {
    icon: Cpu,
    title: "Practical Emphasis",
    description:
      "The training model places strong weight on practical work, workshop exposure, and applied learning rather than theory alone.",
    color: "bg-cyan-500",
  },
  {
    icon: Zap,
    title: "Certification Support",
    description:
      "NDAS is strengthening the formal value of its training through Trade Test, HSE, and other curriculum-linked certification pathways.",
    color: "bg-indigo-500",
  },
];

export const featuresSectionData = {
  heading: "The NDAS Learning Edge",
  subheading:
    "Our training infrastructure is built to bridge the gap between classroom theory and real-world maritime environments.",
} as const;

// ─── CTA ──────────────────────────────────────────────────────────────────────

export const ctaData = {
  badge: "Admissions Open for 2026/27",
  heading: {
    main: "Ready to Command Your",
    highlight: "Future?",
  },
  primaryCta: { label: "Start Your Application", href: "/admissions" },
  secondaryCta: { label: "Talk to an Advisor", href: "/contact" },
} as const;