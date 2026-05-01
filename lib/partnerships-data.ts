// lib/partnerships-data.ts
// All static content for the Partnerships page.

export const partnershipsPageData = {
  // Meta
  meta: {
    title: "NDAS | Partnerships",
    breadcrumb: "Home / Partnerships",
  },

  // Hero
  hero: {
    badge: "Institutional Collaboration",
    heading: {
      main: "Partnerships That Strengthen",
      highlight: "Training Quality.",
    },
    subheading:
      "NDAS pursues collaboration that improves capacity development, practical exposure, certification support, and technical relevance.",
  },

  // Partnership Approach (mapped to a section like "heritage")
  partnershipApproach: {
    eyebrow: "Partnership Approach",
    heading: "Collaboration Must Be Practical, Structured, and Relevant.",
    body: [
      "Partnership content should distinguish clearly between active arrangements, developing engagements, and exploratory discussions.",
      "The objective is not to inflate prestige, but to show how collaboration can improve training value and technical capability.",
    ],
  },

  // Partners (mapped like cards structure)
  partners: [
    {
      name: "Dearsan Shipyard",
      description:
        "Relevant to technology exposure, shipyard best practices, and possible curriculum-linked technical collaboration.",
      category: "Technology Transfer",
    },
    {
      name: "NIMASA",
      description:
        "Relevant to maritime standards, possible certification pathways, and wider alignment of technical training with national maritime requirements.",
      category: "Standards & Certification",
    },
    {
      name: "NASENI",
      description:
        "Relevant to engineering technology exposure, innovation, and longer-term technical development opportunities.",
      category: "Technology & Capacity Development",
    },
    {
      name: "SUVTC Yaba",
      description:
        "NDAS has moved toward Trade Test certification support through engagement with the Skills Upgrading and Vocational Training Centre at Yaba.",
      category: "Trade Test",
    },
    {
      name: "Novelle Training Center",
      description:
        "NDAS has introduced certified HSE-related safety training support through engagement with Novelle Training Center.",
      category: "Safety Certification",
    },
  ],

  // CTA
  cta: {
    heading: "Interested in Supporting Technical Training at NDAS?",
    subheading:
      "Institutions, agencies, and technical stakeholders may contact the School to discuss collaboration relevant to training quality and practical development.",
    primaryCta: {
      label: "Contact the School",
      href: "/contact",
    },
    secondaryCta: {
      label: "",
      href: "",
    },
  },
} as const;