"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────────────────── constants ─────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

const NAV = [
  { label: "Home", href: "/", active: true, dropdown: false },
  { label: "About NDAS", href: "/about", dropdown: true },
  { label: "Academics", href: "/academics", dropdown: true },
  { label: "Admissions", href: "/admissions", dropdown: false },
  // { label: "Student Life", href: "/student-life", dropdown: true },
  // { label: "Projects & Gallery", href: "/facilities", dropdown: false },
  // { label: "News & Events", href: "/news", dropdown: false },
  // { label: "Portal", href: "/portal", dropdown: false },
  { label: "Facilities", href: "/facilities", dropdown: false },
  { label: "Partnerships", href: "/partnerships", dropdown: false },
  // { label: "Contact", href: "/contact", dropdown: false },
];

const TRADES = [
  {
    code: "WF-101",
    title: "Welding & Fabrication",
    description:
      "Training in metal joining processes, fabrication techniques, cutting methods, and practical repair support.",
    category: "Mechanical",
    badges: ["BAC", "Industrial Training"],
    image: (
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09213f" />
            <stop offset="100%" stopColor="#133a63" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#wg)" />
        <g opacity=".22" stroke="#315e87" strokeWidth="1">
          {Array.from({ length: 14 }, (_, i) => (
            <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="500" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
          ))}
        </g>
        <circle cx="656" cy="130" r="100" fill="#d4a734" opacity=".14" />
        <g stroke="#f7fafc" strokeWidth="8" fill="none" opacity=".95">
          <path d="M170 500 C260 410, 360 360, 500 300" />
          <path d="M500 300 l80 120" />
          <path d="M610 205 l0 300" />
          <circle cx="610" cy="170" r="38" />
          <path d="M610 332 l160 0" />
          <path d="M770 332 l0 120" />
        </g>
        <g fill="#d4a734">
          <circle cx="540" cy="353" r="6" />
          <circle cx="556" cy="368" r="5" />
          <circle cx="572" cy="347" r="4" />
          <circle cx="592" cy="362" r="5" />
          <circle cx="607" cy="342" r="4" />
        </g>
        <text
          x="70"
          y="380"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="700"
          fill="#f7fafc"
        >
          Welding & Fabrication
        </text>
        <text
          x="70"
          y="424"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="22"
          fontWeight="500"
          fill="#c6d6e6"
        >
          Practical metalwork and repair support
        </text>
      </svg>
    ),
  },
  {
    code: "EE-201",
    title: "Electrical Electronics",
    description:
      "Training in electrical installation, basic controls, fault diagnosis, and motor rewinding.",
    category: "Electrical",
    badges: ["BAC", "Electrical"],
    image: (
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="eg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09213f" />
            <stop offset="100%" stopColor="#133a63" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#eg)" />
        <g opacity=".22" stroke="#315e87" strokeWidth="1">
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="500" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 55} x2="800" y2={i * 55} />
          ))}
        </g>
        <rect
          x="160"
          y="150"
          width="250"
          height="300"
          rx="14"
          fill="#0b2748"
          stroke="#f7fafc"
          strokeWidth="6"
        />
        <rect x="220" y="210" width="120" height="70" rx="8" fill="#1f4f7e" />
        <g stroke="#f7fafc" strokeWidth="6" fill="none">
          <path d="M500 230 h160 v80 h120 v90 h120" />
          <path d="M500 420 h110 v-60 h120 v60 h110" />
          <circle cx="500" cy="230" r="16" fill="#d4a734" />
          <circle cx="500" cy="420" r="16" fill="#d4a734" />
          <circle cx="780" cy="310" r="16" fill="#d4a734" />
          <circle cx="730" cy="360" r="16" fill="#d4a734" />
        </g>
        <path
          d="M895 165 l-38 75 h45 l-27 65"
          stroke="#d4a734"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="70"
          y="380"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="700"
          fill="#f7fafc"
        >
          Electrical Electronics
        </text>
        <text
          x="70"
          y="424"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="22"
          fontWeight="500"
          fill="#c6d6e6"
        >
          Controls, diagnosis and motor rewinding
        </text>
      </svg>
    ),
  },
  {
    code: "PP-301",
    title: "Plumbing & Pipe Fitting",
    description:
      "Training in pipe systems, fittings, installation methods, and maintenance procedures.",
    category: "Mechanical",
    badges: ["BAC", "Mechanical"],
    image: (
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09213f" />
            <stop offset="100%" stopColor="#133a63" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#pg)" />
        <g opacity=".22" stroke="#315e87" strokeWidth="1">
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="500" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 55} x2="800" y2={i * 55} />
          ))}
        </g>
        <g
          stroke="#f7fafc"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M180 180 h240 v120 h120 v180" />
          <path d="M270 520 v-150 h190 v-110 h240" />
          <path d="M770 160 v140 h120 v160" />
        </g>
        <g fill="#d4a734">
          <circle cx="420" cy="300" r="20" />
          <circle cx="540" cy="300" r="20" />
          <circle cx="460" cy="370" r="20" />
          <circle cx="700" cy="260" r="20" />
          <circle cx="770" cy="300" r="20" />
        </g>
        <text
          x="70"
          y="380"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="700"
          fill="#f7fafc"
        >
          Plumbing & Pipe Fitting
        </text>
        <text
          x="70"
          y="424"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="22"
          fontWeight="500"
          fill="#c6d6e6"
        >
          Installation and maintenance practice
        </text>
      </svg>
    ),
  },
  {
    code: "CJ-401",
    title: "Carpentry & Joinery",
    description:
      "Training in woodwork, joinery, fitting, structural tasks, and practical workshop operations.",
    category: "Construction",
    badges: ["BAC", "Construction"],
    image: (
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09213f" />
            <stop offset="100%" stopColor="#133a63" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#cg)" />
        <g opacity=".22" stroke="#315e87" strokeWidth="1">
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="500" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 55} x2="800" y2={i * 55} />
          ))}
        </g>
        <g fill="none" stroke="#f7fafc" strokeWidth="8">
          <path d="M160 470 l260 -200 l240 0 l190 155 l-250 0 l-170 -140 l-220 185 z" />
          <path d="M270 470 l170 -140 l160 0 l110 95" />
          <rect x="650" y="180" width="120" height="160" rx="8" />
          <path d="M710 160 l0 220" />
          <path d="M650 240 h120" />
        </g>
        <g fill="#d4a734">
          <rect x="760" y="184" width="14" height="150" rx="5" />
          <rect x="420" y="503" width="110" height="14" rx="5" />
        </g>
        <text
          x="70"
          y="380"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="700"
          fill="#f7fafc"
        >
          Carpentry & Joinery
        </text>
        <text
          x="70"
          y="424"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="22"
          fontWeight="500"
          fill="#c6d6e6"
        >
          Woodwork and structural fitting tasks
        </text>
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "Real Dockyard Context",
    description:
      "The School's biggest advantage is that training takes place within the operational environment of Naval Dockyard Limited, not in isolation from it.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    title: "Practical Emphasis",
    description:
      "The training model places strong weight on practical work, workshop exposure, and applied learning rather than theory alone.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    title: "Certification Support",
    description:
      "NDAS is strengthening the formal value of its training through Trade Test, HSE, and other curriculum-linked certification pathways.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
];

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "About NDAS", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Facilities", href: "/facilities" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Entry Information", href: "/admissions" },
      { label: "BAC · IAC · AAC", href: "/admissions" },
      { label: "Trade Test & HSE Support", href: "/admissions" },
    ],
  },
  {
    heading: "Contact",
    links: [
      {
        label:
          "Naval Dockyard Apprentice School 28, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
        href: "#",
      },
    { label: "Email: info@ndlapprenticeschool.com", href: "#" },
      { label: "Phone: +234 904 799 8706", href: "/contact" },
      { label: "Send an enquiry", href: "/contact" },
    ],
  },
];

/* ─────────────────────────── primitives ────────────────────────── */

function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 0.6, ease: expo }}
        viewport={{ once: true }}
        className="h-[2px] bg-[#af8f47] rounded-full flex-shrink-0"
      />
      <span
        className={`text-[10px] font-extrabold tracking-[0.5em] uppercase ${light ? "text-[#af8f47]" : "text-[#af8f47]"}`}
      >
        {children}
      </span>
    </div>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const base =
    "inline-flex items-center text-[12px] font-bold tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300 whitespace-nowrap text-center relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-[#af8f47] text-[#0d2238] hover:bg-[#c8a44c]"
      : "text-white border border-white/30 hover:bg-white/10";

  return (
    <Link
      ref={ref}
      href={href}
      className={`${base} ${styles} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────── scroll progress ───────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#af8f47] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

/* ─────────────────────────── back to top ───────────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#0b2748] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#af8f47] transition-colors duration-300"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── topbar ────────────────────────────── */

function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-2.5 gap-4">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: expo }}
          className="font-semibold"
        >
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </motion.span>
        <div className="hidden md:flex items-center gap-5">
          {[
            {
              href: "tel:+2349047998706",
              icon: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z",
              text: "+234 904 799 8706",
            },
            {
              href: "mailto:info@ndlapprenticeschool.com",
              icon: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
              text: "info@ndlapprenticeschool.com",
            },
          ].map((item, i) => (
            <motion.a
              key={item.text}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: expo }}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-3 h-3 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {item.icon.split(" ").map((d, idx) => (
                  <path key={idx} d={d} />
                ))}
              </svg>
              {item.text}
            </motion.a>
          ))}
          <div className="flex items-center gap-1.5 border-l border-[#e8eef5]/30 pl-4">
            {[
              {
                label: "Facebook",
                d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              },
              {
                label: "Twitter",
                d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              },
              {
                label: "YouTube",
                d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
              },
            ].map((s, i) => (
              <motion.a
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.08,
                  ease: expo,
                }}
                href="#"
                aria-label={s.label}
                className="w-6 h-6 flex items-center justify-center bg-[#e8eef5]/15 hover:bg-[#af8f47] rounded-sm transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={s.d} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── header ────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: expo, delay: 0.2 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(11,39,72,0.12)]"
          : "bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(11,39,72,0.07)]"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-3 gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          >
            <Image src="/ndas-logo.png" width={100} height={100} alt="logo" />
          </motion.div>
          <div className="leading-none">
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Naval Dockyard
            </p>
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Apprentice School
            </p>
            <p className="text-[#0b2748]/50 text-[10px] font-medium tracking-wide mt-0.5">
              Technology is Development
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((item, i) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i, ease: expo }}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 rounded-sm relative group ${
                    isActive
                      ? "text-[#0b2748]"
                      : "text-[#0b2748]/65 hover:text-[#0b2748] hover:bg-[#f0f3f7]"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full"
                    />
                  )}
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton href="/contact" variant="primary">
            Contact NDAS
          </MagneticButton>
        </motion.div>
      </div>
    </motion.header>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/academics-hero.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
            backgroundBlendMode: "overlay",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/60 via-transparent to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[640px]"
        >
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: expo }}
            className="flex items-center gap-2 text-white/40 text-[12px] font-medium mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white/80">Academics</span>
          </motion.nav>

          <Eyebrow light>Training Programmes</Eyebrow>

          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
            A Practical Curriculum Built Around{" "}
            <span className="text-[#af8f47] relative inline-block">
              Trade
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: expo }}
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#af8f47"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Competence.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: expo }}
            className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]"
          >
            NDAS training is organized around progressive apprenticeship
            development, hands-on learning, and four core technical trades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-px bg-white/30" />
            <span className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-medium">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── training structure ────────────────── */

function TrainingStructure() {
  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 max-w-3xl"
        >
          <Eyebrow>Training Structure</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            From Foundational Exposure to{" "}
            <span className="italic font-medium text-[#af8f47]">
              Higher Technical Proficiency.
            </span>
          </h2>
          <p className="text-[#0b2748]/60 text-[16px] md:text-[17px] font-medium leading-[1.8]">
            The Basic Apprentice Course introduces trainees to trade practice,
            workshop culture, and practical task execution. The Intermediate and
            Advanced Apprentice Courses are intended to deepen technical
            competence and broaden specialization.
          </p>
        </motion.div>

        {/* Trade list — editorial horizontal layout */}
        <div className="space-y-4">
          {TRADES.map((trade, i) => (
            <motion.div
              key={trade.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: expo }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative"
            >
              <Link href={`/academics/${i + 1}`}>
                <div className="relative bg-white border border-[#0b2748]/8 overflow-hidden hover:border-[#af8f47]/30 transition-all duration-500">
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-[#af8f47]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + i * 0.1,
                      ease: expo,
                    }}
                    viewport={{ once: true }}
                  />

                  <div className="flex flex-col lg:flex-row">
                    {/* Left — number & category */}
                    <div className="lg:w-[200px] flex-shrink-0 p-8 lg:p-10 lg:border-r border-[#0b2748]/8 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-4">
                      <div className="text-center lg:text-left">
                        <p className="text-[#af8f47] text-[11px] font-extrabold tracking-[0.4em] uppercase mb-1">
                          {trade.category}
                        </p>
                        <p className="text-[#0b2748]/20 text-[48px] lg:text-[64px] font-bold leading-none tracking-tighter">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                      </div>
                      <div className="hidden lg:flex flex-col gap-2">
                        {trade.badges.map((badge) => (
                          <span
                            key={badge}
                            className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#0b2748]/[0.06] text-[#0b2748]/50 border border-[#0b2748]/8"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Center — content */}
                    <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1 bg-[#af8f47] text-[#0d2238]">
                          {trade.code}
                        </span>
                        <div className="h-px flex-1 bg-[#0b2748]/8 group-hover:bg-[#af8f47]/20 transition-colors duration-500" />
                      </div>

                      <h3 className="text-[#0b2748] text-2xl md:text-[28px] font-semibold tracking-tight mb-4 group-hover:text-[#af8f47] transition-colors duration-300">
                        {trade.title}
                      </h3>

                      <p className="text-[#0b2748]/60 text-[15px] font-medium leading-[1.8] max-w-2xl">
                        {trade.description}
                      </p>

                      {/* Mobile badges */}
                      <div className="flex lg:hidden flex-wrap gap-2 mt-6">
                        {trade.badges.map((badge) => (
                          <span
                            key={badge}
                            className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#0b2748]/[0.06] text-[#0b2748]/50 border border-[#0b2748]/8"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — action arrow */}
                    <div className="lg:w-[120px] flex-shrink-0 p-8 lg:p-0 lg:border-l border-[#0b2748]/8 flex items-center justify-center">
                      <motion.div
                        className="w-12 h-12 rounded-full border border-[#0b2748]/15 flex items-center justify-center group-hover:border-[#af8f47] group-hover:bg-[#af8f47] transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg
                          className="w-4 h-4 text-[#0b2748]/40 group-hover:text-[#0d2238] transition-colors duration-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom hover line */}
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#af8f47]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} /* ─────────────────────────── features ──────────────────────────── */

function Features() {
  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 border-t border-[#0b2748]/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0b2748]/10 border border-[#0b2748]/10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-[#f5f7f9] p-10 md:p-12 hover:bg-white transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-full bg-[#0b2748] flex items-center justify-center text-white mb-6 group-hover:bg-[#af8f47] transition-colors duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-[#0b2748] text-lg font-semibold tracking-tight mb-4 group-hover:text-[#af8f47] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[#0b2748]/60 text-[14px] font-medium leading-[1.8]">
                {feature.description}
              </p>
              <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#af8f47]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── cta ───────────────────────────────── */

function CTA() {
  return (
    <section className="bg-[#f5f7f9] py-20 border-t border-[#0b2748]/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#0b2748] relative overflow-hidden p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#af8f47]/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-2xl">
            <Eyebrow light>Admissions &amp; Enquiries</Eyebrow>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
              Start Your Apprenticeship Journey at NDAS.
            </h2>
            <p className="text-white/60 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
              Discover how to apply, what pathways are available, and how NDAS
              can shape your technical career.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <MagneticButton href="/admissions" variant="primary">
              View Admissions
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              Contact the School
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── footer ────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0b2748]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <p className="text-white font-black text-[13px] tracking-tight leading-snug">
              NAVAL DOCKYARD
              <br />
              APPRENTICE SCHOOL
            </p>
          </div>
          <p className="text-white/50 text-[13px] font-medium leading-[1.75]">
            The technical training school of Naval Dockyard Limited, focused on
            apprenticeship, practical engineering trades, and dockyard-relevant
            technical manpower development.
          </p>
        </motion.div>

        {FOOTER_COLS.map((col, i) => (
          <motion.div
            key={col.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 * (i + 1), ease: expo }}
            viewport={{ once: true }}
          >
            <p className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase mb-5">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/50 hover:text-white hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-white/30 tracking-widest uppercase">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-[1px] bg-[#af8f47]/40" />
          <span className="text-[10px] text-white/20 tracking-widest">
            EST. 2019
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── page ──────────────────────────────── */

export default function AcademicsPage() {
  return (
    <div
      className={`${dmSans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <ScrollProgress />
      <Topbar />
      <Header />
      <main>
        <Hero />
        <TrainingStructure />
        <Features />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
