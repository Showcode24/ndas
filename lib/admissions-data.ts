// lib/admissions-data.ts
// All static content for the Admissions page.

import { FileText, UserCheck, Trophy, ClipboardList } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

// criteria is now a flat string — no detail sub-text
export interface Criterion {
  text: string;
}

export interface AdmissionStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Faq {
  question: string;
  answer: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroData = {
  breadcrumb: "Home / Admissions",
  eyebrow: "Admissions and Intake",
  heading: "Entry Into a Structured Technical Training Environment.",
  subheading:
    "NDAS admissions should be understood through the School's approved training pathways, nomination processes, and institutional requirements.",
  cta: { label: "Contact Admissions", href: "/contact" },
} as const;

// ─── Selection Process ────────────────────────────────────────────────────────

export const selectionData = {
  heading: "How Trainees Enter NDAS",
  note: "Current intake information should be confirmed before publication.",
  status: {
    label: "Status: Active",
    cycle: "Recruitment Cycle 2026/27",
  },
} as const;

export const admissionSteps: AdmissionStep[] = [
  {
    step: "01",
    title: "Nomination",
    desc: "Eligible personnel are identified through the appropriate institutional process in line with current manpower and training requirements.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Drafting",
    desc: "Selected trainees receive formal direction to report for training in accordance with approved administrative procedures.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Reporting & Induction",
    desc: "On arrival, trainees complete documentation, orientation, and other induction requirements before training begins.",
    icon: UserCheck,
  },
  {
    step: "04",
    title: "Course Commencement",
    desc: "Apprentices commence structured instruction combining workshop practice, guided teaching, and practical task development.",
    icon: Trophy,
  },
];

// ─── Eligibility / Requirements ───────────────────────────────────────────────

export const eligibilityData = {
  heading: {
    main: "Admission Depends on",
    highlight: "Approved Criteria.",
  },
  subheading:
    "The admissions page should state only verified and current eligibility criteria. Where entries depend on service nomination, medical fitness, or official instructions, the wording should remain exact and procedural rather than promotional.",
  cta: { label: "Contact Admissions", href: "/contact" },
} as const;

export const criteria: Criterion[] = [
  {
    text: "Must meet the currently approved eligibility conditions for the relevant intake category.",
  },
  {
    text: "Must possess the required nomination, authorization, or institutional clearance where applicable.",
  },
  {
    text: "Must satisfy documentation and reporting requirements communicated for the intake.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqSectionData = {
  eyebrow: "Admissions Support",
  heading: {
    main: "Got questions?",
    sub: "We've got answers.",
  },
  subheading:
    "Everything you need to know about joining. If you can't find your answer here, our team is one click away.",
  cta: { label: "Chat with Admissions" },
} as const;

export const faqs: Faq[] = [
  {
    question: "Can civilians apply directly to NDAS?",
    answer:
      "Civilian or inter-service intake should only be described according to current approved policy. The website should not imply open access unless that has been formally authorized.",
  },
  {
    question: "How do applicants know when intake is active?",
    answer:
      "Intake information should be followed through official NDAS communication channels and published notices.",
  },
  {
    question: "Need clarification on admissions?",
    answer:
      "Contact the School for current intake guidance, joining instructions, and related enquiries.",
  },
];

// ─── CTA ──────────────────────────────────────────────────────────────────────

export const ctaData = {
  heading: "Begin Your Commissioning.",
  subheading:
    "Applications for the 2026/27 academic year close in 45 days. Don't miss your chance to join the Naval Dockyard Apprentice School.",
  primaryCta: { label: "Launch Online Application" },
  secondaryCta: { label: "Inquire for Help", href: "/contact" },
} as const;