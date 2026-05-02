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
  { label: "Partnerships", href: "/partnerships", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
];

const STEPS = [
  {
    number: "01",
    title: "Nomination",
    description:
      "Eligible personnel are identified through the appropriate institutional process in line with current manpower and training requirements.",
  },
  {
    number: "02",
    title: "Drafting",
    description:
      "Selected trainees receive formal direction to report for training in accordance with approved administrative procedures.",
  },
  {
    number: "03",
    title: "Reporting & Induction",
    description:
      "On arrival, trainees complete documentation, orientation, and other induction requirements before training begins.",
  },
  {
    number: "04",
    title: "Course Commencement",
    description:
      "Apprentices commence structured instruction combining workshop practice, guided teaching, and practical task development.",
  },
];

const REQUIREMENTS = [
  "Must meet the currently approved eligibility conditions for the relevant intake category.",
  "Must possess the required nomination, authorization, or institutional clearance where applicable.",
  "Must satisfy documentation and reporting requirements communicated for the intake.",
];

const FAQS = [
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
      { label: "Tiger Gate, Victoria Island", href: "#" },
      { label: "Official contacts TBC", href: "#" },
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
              href: "mailto:info@ndlapprenticesschool.com",
              icon: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
              text: "info@ndlapprenticesschool.com",
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/98 backdrop-blur-xl shadow-[0_4px_20px_rgba(11,39,72,0.1)]" : "bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(11,39,72,0.07)]"}`}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-3 gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{
              background:
                "radial-gradient(circle at 38% 38%, #fff8dd 0%, #ecd18f 55%, #c8a03c 100%)",
            }}
          >
            <span className="text-[#0b2748] font-black text-[13px] tracking-tight">
              ND
            </span>
          </motion.div>
          <div className="leading-none">
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Naval Dockyard
            </p>
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Apprentice School
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: expo }}
            >
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 rounded-sm relative group
                  ${item.active ? "text-[#0b2748]" : "text-[#0b2748]/65 hover:text-[#0b2748] hover:bg-[#f0f3f7]"}`}
              >
                {item.label}
                {item.dropdown && (
                  <svg
                    className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                {item.active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="shrink-0 w-9 h-9 flex items-center justify-center text-[#0b2748]/60 hover:text-[#0b2748] hover:bg-[#f0f3f7] rounded-sm transition-colors"
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
        </motion.button>
      </div>
    </header>
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
            backgroundImage: `url('/images/admissions-hero.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
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
            <span className="text-white/80">Admissions</span>
          </motion.nav>

          <Eyebrow light>Admissions and Intake</Eyebrow>

          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
            Entry Into a{" "}
            <span className="text-[#af8f47] relative inline-block">
              Structured
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
            Technical Training Environment.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: expo }}
            className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]"
          >
            NDAS admissions should be understood through the School&apos;s
            approved training pathways, nomination processes, and institutional
            requirements.
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

/* ─────────────────────────── selection process ─────────────────── */

function SelectionProcess() {
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
          <Eyebrow>Selection Process</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            How Trainees{" "}
            <span className="italic font-medium text-[#af8f47]">
              Enter NDAS
            </span>
          </h2>
          <p className="text-[#0b2748]/40 text-[13px] font-medium tracking-wide">
            Current intake information should be confirmed before publication.
          </p>
        </motion.div>

        {/* Steps — horizontal connected timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] h-[2px] bg-[#0b2748]/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: expo }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Number circle */}
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full bg-[#0b2748] flex items-center justify-center text-white relative z-10 group-hover:bg-[#af8f47] transition-colors duration-500"
                  >
                    <span className="text-[18px] font-bold tracking-tight">
                      {step.number}
                    </span>
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#af8f47]/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                </div>

                <h3 className="text-[#0b2748] text-lg font-semibold tracking-tight mb-3 group-hover:text-[#af8f47] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#0b2748]/60 text-[14px] font-medium leading-[1.8]">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 w-8 h-[2px] bg-[#af8f47] group-hover:w-12 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── requirements & faq ────────────────── */

function RequirementsAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 border-t border-[#0b2748]/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <Eyebrow>Requirements</Eyebrow>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
              Admission Depends on{" "}
              <span className="italic font-medium text-[#af8f47]">
                Approved Criteria
              </span>
            </h2>
            <div className="w-12 h-[2px] bg-[#af8f47] mb-8" />
            <p className="text-[#0b2748]/70 font-medium leading-[1.8] text-[16px] md:text-[17px] mb-10">
              The admissions page should state only verified and current
              eligibility criteria. Where entries depend on service nomination,
              medical fitness, or official instructions, the wording should
              remain exact and procedural rather than promotional.
            </p>

            {/* Requirements list */}
            <div className="space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10">
              {REQUIREMENTS.map((req, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#f5f7f9] p-8 md:p-10 flex items-start gap-5 hover:bg-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#af8f47]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#af8f47]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-[#0b2748]/75 text-[15px] font-medium leading-[1.75]">
                    {req}
                  </p>
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#af8f47]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="mb-10">
              <Eyebrow>Common Questions</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748]">
                Admissions{" "}
                <span className="italic font-medium text-[#af8f47]">FAQ</span>
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: expo }}
                  viewport={{ once: true }}
                  className="border border-[#0b2748]/10 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-8 md:p-10 flex items-start justify-between gap-4 group"
                  >
                    <h3
                      className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${openFaq === i ? "text-[#af8f47]" : "text-[#0b2748] group-hover:text-[#af8f47]"}`}
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full border border-[#0b2748]/15 flex items-center justify-center flex-shrink-0 group-hover:border-[#af8f47] group-hover:bg-[#af8f47] transition-all duration-300"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-colors duration-300 ${openFaq === i ? "text-[#af8f47]" : "text-[#0b2748]/40 group-hover:text-[#0d2238]"}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: expo }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-0">
                          <div className="w-8 h-[2px] bg-[#af8f47] mb-4" />
                          <p className="text-[#0b2748]/60 text-[14px] font-medium leading-[1.8]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            <Eyebrow light>Get In Touch</Eyebrow>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
              Have Questions About Admissions?
            </h2>
            <p className="text-white/60 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
              Contact the School directly for current intake guidance,
              eligibility confirmation, and related enquiries.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <MagneticButton href="/contact" variant="primary">
              Contact NDAS
            </MagneticButton>
            <MagneticButton href="/academics" variant="outline">
              Explore Training
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
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background:
                  "radial-gradient(circle at 38% 38%, #fff8dd 0%, #ecd18f 55%, #c8a03c 100%)",
              }}
            >
              <span className="text-[#0b2748] font-black text-[11px]">ND</span>
            </div>
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

export default function AdmissionsPage() {
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
        <SelectionProcess />
        <RequirementsAndFAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
