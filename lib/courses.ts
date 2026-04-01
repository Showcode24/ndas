export const mockPrograms = [
  {
    id: "2",
    slug: "electrical-electronics-and-motor-rewinding",
    title: "Electrical Electronics & Motor Rewinding",
    icon: "zap",
    shortDesc:
      "Master shipboard power systems, PLC automation, and industrial motor restoration.",
    fullDesc:
      "Apprentices are poised to learn the design of electrical power systems onboard ships, with a primary focus on operation, maintenance, and secure power supply. The course introduces cutting-edge technology including Festo Automation Programmable Logic Controllers (PLC) for motor control and Multisim™ software for advanced circuit simulation and PCB design. A core component includes motor winding, conducted in collaboration with Naval Dockyard Limited (NDL) experts using industrial-grade facilities.",
    duration: "24 Months",
    certification: "National Technical Certificate",
    location: "NDAS Campus & NDL Workshops",
    image: "/images/courses/electrical-main.jpg",
    highlights: [
      "Festo Didactic PLC Training",
      "Multisim™ & Ultiboard Simulation",
      "Shipboard Power Distribution",
      "Industrial Motor Rewinding Collaboration",
    ],
    courseOutline: [
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
    ],
  },
  {
    id: "3",
    slug: "motor-drives",
    title: "Motor Drives",
    icon: "cpu",
    shortDesc:
      "Advanced power electronics and precision control for industrial electric motors.",
    fullDesc:
      "The Motor Drives course complements Basic Controls, providing the expertise required to manage motor systems through electronic drives. Students delve into the world of semiconductors, converters, and sophisticated control techniques like Pulse-Width Modulation (PWM) and Field-Oriented Control (FOC). This program is essential for high-tech roles in robotics, manufacturing, and renewable energy sectors.",
    duration: "12 Months",
    certification: "Specialized Technical Certificate",
    location: "Automation Lab",
    image: "/images/courses/motor-drives.jpg",
    highlights: [
      "AC/DC Drive Main Functions",
      "Vector & Sensorless Control",
      "Power Semiconductor Mastery",
      "Energy Efficiency Optimization",
    ],
    courseOutline: [
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
    ],
  },
  {
    id: "1",
    slug: "carpentry-and-joinery",
    title: "Carpentry and Joinery",
    icon: "hammer",
    shortDesc:
      "Traditional craftsmanship meets naval engineering for shipbuilding and structural woodwork.",
    fullDesc:
      "Designed for those who appreciate precision and pride in craftsmanship, this course introduces apprentices to carpentry within the shipbuilding industry. It covers the mastery of hand tools, power tools, and industrial machinery. Apprentices gain deep knowledge of timber processing and participate in practical visits to Naval Dockyard Limited and active ships to understand maritime woodwork applications.",
    duration: "24 Months",
    certification: "National Technical Certificate",
    location: "NDAS Woodwork Workshop & NDL",
    image: "/images/courses/carpentry-main.jpg",
    highlights: [
      "Shipbuilding Carpentry Focus",
      "Timber Kilning & Identification",
      "Upholstery and Interior Panelling",
      "High-Density Fibreboard (HDF) Applications",
    ],
    courseOutline: [
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
    ],
  },
  {
    id: "4",
    slug: "plumbing-and-pipe-fittings",
    title: "Plumbing and Pipe Fittings",
    icon: "waves",
    shortDesc:
      "Precision fluid system engineering for naval vessels and industrial infrastructure.",
    fullDesc:
      "Modern shipbuilding mandates personnel who can repair complex piping systems under tight schedules. This course acquaints apprentices with safety precautions and the technical knowledge required for various plumbing equipment and processes. It emphasizes material selection suitable for high-pressure systems onboard ships and includes industrial visits to Dorman Long Engineering workshops.",
    duration: "18 Months",
    certification: "National Technical Certificate",
    location: "Mechanical Workshop & Dorman Long Engineering",
    image: "/images/courses/plumbing-main.jpg",
    highlights: [
      "Marine Fluid System Design",
      "Oxyacetylene Brazing & Cutting",
      "PPR & High-Pressure PVC Works",
      "Industrial Joint Preparation",
    ],
    courseOutline: [
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
    ],
  },
  {
    id: "weld-5",
    slug: "welding-and-fabrication",
    title: "Welding and Fabrication",
    icon: "wrench",
    shortDesc:
      "Structural metal mastery, from blast furnace theory to advanced arc welding.",
    fullDesc:
      "This course provides the essential skills to fabricate and repair complex metal objects. Apprentices learn the physical properties of various metals and the manufacturing processes behind steel and iron. The practical phase focuses on electric arc and gas welding, ensuring graduates can perform high-integrity repairs in maritime and industrial environments.",
    duration: "24 Months",
    certification: "National Technical Certificate",
    location: "Fabrication Lab & NDL Shipyard",
    image: "/images/courses/welding-main.jpg",
    highlights: [
      "Electric Arc & Oxyacetylene Welding",
      "Metallurgy & Composition Analysis",
      "Structural Steel Manufacturing Theory",
      "Advanced Grove & Position Welding",
    ],
    courseOutline: [
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
    ],
  },
];
