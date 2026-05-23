import { createClient } from "@sanity/client";
import { config } from "dotenv";

config();

// ─── VALIDATE ENV VARS ─────────────────────────────
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET    = process.env.SANITY_DATASET || "production";
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID) throw new Error("Missing SANITY_PROJECT_ID");
if (!TOKEN)      throw new Error("Missing SANITY_API_WRITE_TOKEN");

// ─── CLIENT ────────────────────────────────────────
const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  token:      TOKEN,
  apiVersion: "2024-01-01",
  useCdn:     false,
});

// ─── HELPER ────────────────────────────────────────
// _key is required on arrays of OBJECTS, not arrays of primitives.
const keyedObjects = (items) =>
  items.map((item, i) => ({
    _key: `k${i}_${Math.random().toString(36).slice(2, 7)}`,
    ...item,
  }));

// ─── DOCUMENT ──────────────────────────────────────
const academicsPageDocument = {
  _id:   "academicsPage",
  _type: "academicsPage",

  // ── Hero ───────────────────────────────────────────────────────
  hero: {
    eyebrow:          "Training Programmes",
    heading:          "A Practical Curriculum Built Around",
    headingHighlight: "Trade",
    headingTail:      "Competence.",
    subtext:
      "NDAS training is organized around progressive apprenticeship development, hands-on learning, and four core technical trades.",
    // breadcrumb = array of objects → needs _key
    breadcrumb: keyedObjects([
      { label: "Home",      href: "/"          },
      { label: "Academics", href: "/academics" },
    ]),
    // backgroundImage omitted — upload via Studio
    scrollLabel: "Scroll to explore",
  },

  // ── Training Structure ─────────────────────────────────────────
  trainingStructure: {
    eyebrow:          "Training Structure",
    heading:          "From Foundational Exposure to",
    headingHighlight: "Higher Technical Proficiency.",
    body:
      "The Basic Apprentice Course introduces trainees to trade practice, workshop culture, and practical task execution. The Intermediate and Advanced Apprentice Courses are intended to deepen technical competence and broaden specialization.",
  },

  // ── Trades ─────────────────────────────────────────────────────
  // images omitted — upload via Studio per trade card
  trades: keyedObjects([
    {
      code:        "WF-101",
      title:       "Welding & Fabrication",
      description:
        "Training in metal joining processes, fabrication techniques, cutting methods, and practical repair support.",
      category: "Mechanical",
      // badges = array of primitives → plain array inside keyedObjects
      badges: ["BAC", "Industrial Training"],
    },
    {
      code:        "EE-201",
      title:       "Electrical Electronics",
      description:
        "Training in electrical installation, basic controls, fault diagnosis, and motor rewinding.",
      category: "Electrical",
      badges: ["BAC", "Electrical"],
    },
    {
      code:        "PP-301",
      title:       "Plumbing & Pipe Fitting",
      description:
        "Training in pipe systems, fittings, installation methods, and maintenance procedures.",
      category: "Mechanical",
      badges: ["BAC", "Mechanical"],
    },
    {
      code:        "CJ-401",
      title:       "Carpentry & Joinery",
      description:
        "Training in woodwork, joinery, fitting, structural tasks, and practical workshop operations.",
      category: "Construction",
      badges: ["BAC", "Construction"],
    },
  ]),

  // ── Features ───────────────────────────────────────────────────
  features: keyedObjects([
    {
      title:       "Real Dockyard Context",
      description:
        "The School's biggest advantage is that training takes place within the operational environment of Naval Dockyard Limited, not in isolation from it.",
      iconKey: "dockyard",
    },
    {
      title:       "Practical Emphasis",
      description:
        "The training model places strong weight on practical work, workshop exposure, and applied learning rather than theory alone.",
      iconKey: "practical",
    },
    {
      title:       "Certification Support",
      description:
        "NDAS is strengthening the formal value of its training through Trade Test, HSE, and other curriculum-linked certification pathways.",
      iconKey: "certification",
    },
  ]),

  // ── CTA ────────────────────────────────────────────────────────
  cta: {
    eyebrow:      "Admissions & Enquiries",
    heading:      "Start Your Apprenticeship Journey at NDAS.",
    subtext:
      "Discover how to apply, what pathways are available, and how NDAS can shape your technical career.",
    primaryCta:   { label: "View Admissions",    href: "/admissions" },
    secondaryCta: { label: "Contact the School", href: "/contact"    },
  },
};

// ─── COURSE DOCUMENTS ──────────────────────────────
// Each trade also gets its own `course` document for detail pages.
// These are separate documents (not embedded) so they can be linked by slug.

const keyedTopics = (topics) =>
  topics.map((text, i) => ({
    _key: `t${i}_${Math.random().toString(36).slice(2, 7)}`,
    text,
  }));

const keyedOutlineSections = (sections) =>
  sections.map((section, i) => ({
    _key: `s${i}_${Math.random().toString(36).slice(2, 7)}`,
    category: section.category,
    topics: keyedTopics(section.topics),
  }));

const courseDocuments = [
  {
    _id:           "course-welding-and-fabrication",
    _type:         "course",
    slug:          { _type: "slug", current: "welding-and-fabrication" },
    title:         "Welding and Fabrication",
    iconKey:       "wrench",
    shortDesc:
      "Structural metal mastery, from blast furnace theory to advanced arc welding.",
    fullDesc:
      "This course provides the essential skills to fabricate and repair complex metal objects. Apprentices are trained in the full spectrum of welding processes and material science relevant to shipyard and dockyard engineering environments.",
    duration:      "24 Months",
    certification: "National Technical Certificate",
    location:      "Fabrication Lab & NDL Shipyard",
    // image omitted — upload via Studio
    highlights: [
      "Electric Arc & Oxyacetylene Welding",
      "Metallurgy & Composition Analysis",
      "Structural Steel Manufacturing Theory",
      "Advanced Grove & Position Welding",
    ],
    courseOutline: keyedOutlineSections([
      {
        category: "Metals & Material Science",
        topics: [
          "Physical Properties and Basic Composition of Metals",
          "Cupola Process (Cast Iron)",
          "Blast Furnace Process (Pig Iron)",
          "Direct Reduction Process (Steels)",
        ],
      },
      {
        category: "Welding & Fabrication Techniques",
        topics: [
          "General Workshop and Welding Safety",
          "Electric Arc Welding Mastery",
          "Welding Positions and Grove Welding",
          "Oxyacetylene (Gas) Welding",
          "Industrial Fabrication Practicals",
        ],
      },
    ]),
  },
  {
    _id:           "course-electrical-electronics-and-motor-rewinding",
    _type:         "course",
    slug:          { _type: "slug", current: "electrical-electronics-and-motor-rewinding" },
    title:         "Electrical Electronics & Motor Rewinding",
    iconKey:       "zap",
    shortDesc:
      "Master shipboard power systems, PLC automation, and industrial motor restoration.",
    fullDesc:
      "Apprentices are trained in the design of electrical power systems onboard ships and in industrial environments. The programme covers PLC automation, motor rewinding, fault tracing, and circuit design — combining simulation tools with hands-on practice.",
    duration:      "24 Months",
    certification: "National Technical Certificate",
    location:      "NDAS Campus & NDL Workshops",
    highlights: [
      "Festo Didactic PLC Training",
      "Multisim™ & Ultiboard Simulation",
      "Shipboard Power Distribution",
      "Industrial Motor Rewinding Collaboration",
    ],
    courseOutline: keyedOutlineSections([
      {
        category: "Multisim & Ultiboard (Simulation & Design)",
        topics: [
          "Introduction to Multisim User Interface",
          "Placing Components and Virtual Instrumentation",
          "Circuit Simulation and Grapher Analysis",
          "Bill of Materials Generation",
          "Ultiboard Board Outline and Part Placement",
          "Auto-routing and 3D Design Visualization",
        ],
      },
      {
        category: "Electric Motor and Winding",
        topics: [
          "Principles of Electricity and Safety",
          "Magnetic Field Creation and Machine Connections",
          "Types of Windings and Tooling",
          "Manual and Reversing Starters",
          "Current Protection Devices",
          "Soft Starters and Reduced AC Voltage Starters",
          "Plugging and Time Relay Circuits",
        ],
      },
      {
        category: "Advanced Control Systems",
        topics: [
          "Lockout and Tagout Procedures",
          "Two-wire and Three-wire Controls",
          "Jogging Control Circuits",
          "Friction Brakes",
          "Primary Resistor Starters",
        ],
      },
    ]),
  },
  {
    _id:           "course-plumbing-and-pipe-fittings",
    _type:         "course",
    slug:          { _type: "slug", current: "plumbing-and-pipe-fittings" },
    title:         "Plumbing and Pipe Fittings",
    iconKey:       "waves",
    shortDesc:
      "Precision fluid system engineering for naval vessels and industrial infrastructure.",
    fullDesc:
      "Modern shipbuilding mandates personnel who can repair complex piping systems under tight schedules. This programme trains apprentices in marine fluid system design, oxyacetylene brazing, and industrial joint preparation relevant to NDL and fleet support operations.",
    duration:      "18 Months",
    certification: "National Technical Certificate",
    location:      "Mechanical Workshop & Dorman Long Engineering",
    highlights: [
      "Marine Fluid System Design",
      "Oxyacetylene Brazing & Cutting",
      "PPR & High-Pressure PVC Works",
      "Industrial Joint Preparation",
    ],
    courseOutline: keyedOutlineSections([
      {
        category: "Pipe Fitting",
        topics: [
          "Workshop and Field Safety Precautions",
          "Pipe Fitting Tools and Equipment Handling",
          "Marking and Preparation of Joints",
          "Oxyacetylene Cutting and Arc Welding",
          "Industrial Pipe Work Observation at Dorman Long",
        ],
      },
      {
        category: "Plumbing Systems",
        topics: [
          "Introduction to Plumbing Architecture",
          "Types and Dimensions of Marine Pipes",
          "Polypropylene Random Copolymer (PPR) Conduit Works",
          "Polyvinyl Chloride (PVC) High-Pressure Systems",
          "Fittings Application and Repair",
        ],
      },
    ]),
  },
  {
    _id:           "course-carpentry-and-joinery",
    _type:         "course",
    slug:          { _type: "slug", current: "carpentry-and-joinery" },
    title:         "Carpentry and Joinery",
    iconKey:       "hammer",
    shortDesc:
      "Traditional craftsmanship meets naval engineering for shipbuilding and structural woodwork.",
    fullDesc:
      "Designed for those who appreciate precision and pride in craftsmanship, this programme covers the full range of woodwork and joinery skills applicable to shipbuilding, structural fitting, interior panelling, and upholstery within a dockyard context.",
    duration:      "24 Months",
    certification: "National Technical Certificate",
    location:      "NDAS Woodwork Workshop & NDL",
    highlights: [
      "Shipbuilding Carpentry Focus",
      "Timber Kilning & Identification",
      "Upholstery and Interior Panelling",
      "High-Density Fibreboard (HDF) Applications",
    ],
    courseOutline: keyedOutlineSections([
      {
        category: "Carpentry Practical",
        topics: [
          "Measurement and Precision Rules",
          "Stacking, Kilning, and Wood Identification",
          "Hand Tool Design and Joint Creation",
          "Parameter Calculation from Pictorial Views",
          "Colour Tilting, Spraying, and Quality Finishing",
          "Wall Clouding and Panelling (HDF & 100% Wood)",
          "Basic Upholstery for Sofa and Bedding",
        ],
      },
      {
        category: "Wood Processing",
        topics: [
          "Pulping, Chipping, and Prefabrication",
          "Chemical Composition and Structure of Wood",
          "Sawmilling and Drying Techniques",
          "Wood Preservation and Storage",
          "Timber Conservation and Pest Control",
          "Manufacture of Engineered Wood",
        ],
      },
    ]),
  },
  {
    _id:           "course-motor-drives",
    _type:         "course",
    slug:          { _type: "slug", current: "motor-drives" },
    title:         "Motor Drives",
    iconKey:       "cpu",
    shortDesc:
      "Advanced power electronics and precision control for industrial electric motors.",
    fullDesc:
      "The Motor Drives course complements Basic Controls, providing the expertise required to manage motor systems through electronic drives. Apprentices gain hands-on competence in AC/DC drive operation, vector control, and energy-efficient motor management.",
    duration:      "12 Months",
    certification: "Specialized Technical Certificate",
    location:      "Automation Lab",
    highlights: [
      "AC/DC Drive Main Functions",
      "Vector & Sensorless Control",
      "Power Semiconductor Mastery",
      "Energy Efficiency Optimization",
    ],
    courseOutline: keyedOutlineSections([
      {
        category: "Fundamentals & Power Electronics",
        topics: [
          "Electromagnetism and Motor Construction",
          "DC, AC Induction, and Synchronous Motors",
          "Power Semiconductors: Diodes, Transistors, Thyristors",
          "Converter Circuits: Rectifiers and Inverters",
        ],
      },
      {
        category: "Control Techniques",
        topics: [
          "Open-loop and Closed-loop Control",
          "Vector and Sensorless Control Methods",
          "Pulse-Width Modulation (PWM)",
          "Direct Torque Control (DTC)",
        ],
      },
      {
        category: "AC & DC Drive Units",
        topics: [
          "Volts Per Hertz Characteristics",
          "Ramp and Torque Boost",
          "Braking and Jogging Functions",
          "Current Limiting and IR Compensation",
          "Remote Control Integration",
        ],
      },
    ]),
  },
];

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding academicsPage...");
  try {
    const pageResult = await client.createOrReplace(academicsPageDocument);
    console.log("✅ academicsPage seeded! ID:", pageResult._id);
  } catch (err) {
    console.error("❌ academicsPage seed failed:");
    console.error(err);
    process.exit(1);
  }

  console.log(`\nSeeding ${courseDocuments.length} course documents...`);
  for (const courseDoc of courseDocuments) {
    try {
      const result = await client.createOrReplace(courseDoc);
      console.log(`✅ course seeded: ${result._id}`);
    } catch (err) {
      console.error(`❌ Failed to seed course: ${courseDoc._id}`);
      console.error(err);
      process.exit(1);
    }
  }

  console.log("\n✅ All academics data seeded successfully.");
}

seed();
