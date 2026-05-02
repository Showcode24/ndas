"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const STATS = [
  { value: "31 May 2019", label: "Re-Commissioned" },
  { value: "4", label: "Core Trades" },
  { value: "BAC · IAC · AAC", label: "Training Pathway" },
  { value: "Practical + IT", label: "Applied Learning Model" },
];

const ABOUT_ROWS = [
  {
    label: "FOUNDATION",
    text: "The Naval Dockyard Apprentice School is the technical training school of Naval Dockyard Limited. Re-commissioned on 31 May 2019, it trains Nigerian Navy technical personnel across four core engineering trades.",
  },
  {
    label: "ADVANTAGE",
    text: "Its defining advantage is proximity to a live dockyard — where maintenance culture, technical discipline, and practical engineering knowledge form the actual learning environment.",
  },
  {
    label: "LOCATION",
    text: "Tiger Gate, Naval Dockyard Limited Compound, Victoria Island, Lagos — operating within a working dockyard unique among Nigerian technical training institutions.",
  },
];

const TRADES = [
  {
    index: "01",
    title: "Welding & Fabrication",
    tag: "Mechanical",
    badge: "BAC",
    description:
      "Training in metal joining, fabrication processes, and practical repair support relevant to shipyard and engineering environments.",
  },
  {
    index: "02",
    title: "Electrical Electronics & Motor Rewinding",
    tag: "Electrical",
    badge: "BAC",
    description:
      "Training in electrical installation, basic controls, fault tracing, and motor rewinding for technical support and maintenance roles.",
  },
  {
    index: "03",
    title: "Plumbing & Pipe Fitting",
    tag: "Mechanical",
    badge: "BAC",
    description:
      "Training in pipe systems, fittings, installation practice, and maintenance tasks applicable to workshop and utility environments.",
  },
  {
    index: "04",
    title: "Carpentry & Joinery",
    tag: "Construction",
    badge: "BAC",
    description:
      "Training in woodwork, joinery, structural fittings, and practical workshop tasks relevant to support and maintenance functions.",
  },
];

const WHY = [
  {
    title: "Dockyard Proximity",
    description:
      "NDAS sits within the Naval Dockyard environment, giving training a practical context that ordinary classroom-based institutions cannot reproduce.",
  },
  {
    title: "Trade-Based Instruction",
    description:
      "Training is organised around core engineering trades directly relevant to maintenance, repair, fabrication, and technical support.",
  },
  {
    title: "Knowledge Preservation",
    description:
      "The School preserves and transfers practical dockyard skills required to sustain naval engineering capability over time.",
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
      <span className="w-8 h-[2px] bg-[#af8f47] rounded-full flex-shrink-0" />
      <span
        className={`text-[10px] font-extrabold tracking-[0.5em] uppercase ${light ? "text-[#af8f47]" : "text-[#af8f47]"}`}
      >
        {children}
      </span>
    </div>
  );
}

function HoverLine() {
  return (
    <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#af8f47]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
  );
}

/* ─────────────────────────── topbar ────────────────────────────── */

function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-2 gap-4">
        <span className="font-semibold">
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </span>
        <div className="hidden md:flex items-center gap-5">
          {/* Phone */}
          <a
            href="tel:+2349047998706"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +234 904 799 8706
          </a>
          {/* Email */}
          <a
            href="mailto:info@ndlapprenticesschool.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            info@ndlapprenticesschool.com
          </a>
          {/* Social icons */}
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
            ].map((s) => (
              <a
                key={s.label}
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── header ────────────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#0b2748]/10 shadow-[0_1px_12px_rgba(11,39,72,0.07)]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-3 gap-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{
              background:
                "radial-gradient(circle at 38% 38%, #fff8dd 0%, #ecd18f 55%, #c8a03c 100%)",
            }}
          >
            <span className="text-[#0b2748] font-black text-[13px] tracking-tight">
              ND
            </span>
          </div>
          <div className="leading-none">
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Naval Dockyard
            </p>
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Apprentice School
            </p>
          </div>
        </Link>

        {/* ── Nav ── */}
        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors rounded-sm
                ${
                  item.active
                    ? "text-[#0b2748]"
                    : "text-[#0b2748]/65 hover:text-[#0b2748] hover:bg-[#f0f3f7]"
                }`}
            >
              {item.label}
              {item.dropdown && (
                <svg
                  className="w-3 h-3 opacity-50"
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
            </Link>
          ))}
        </nav>

        {/* ── Search icon ── */}
        <button className="shrink-0 w-9 h-9 flex items-center justify-center text-[#0b2748]/60 hover:text-[#0b2748] hover:bg-[#f0f3f7] rounded-sm transition-colors">
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
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-[480px] md:min-h-[520px] flex items-center overflow-hidden bg-[#0b2748]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-worker.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
          backgroundBlendMode: "overlay",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/50 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: expo }}
          className="max-w-[600px]"
        >
          <h1 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-white mb-5">
            Shaping Technical Excellence.
            <br />
            Building{" "}
            <span className="text-[#af8f47] underline decoration-[#af8f47]/40 underline-offset-4">
              Nigeria&rsquo;s
            </span>{" "}
            Future.
          </h1>

          <p className="text-white/70 text-[15px] sm:text-[17px] font-light leading-[1.7] mb-10 max-w-[46ch]">
            Practical. Professional. Purposeful. NDAS trains skilled hands and
            competent minds for the industries of today and tomorrow.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center text-[13px] font-bold tracking-wide bg-[#af8f47] text-[#0d2238] px-6 py-3.5 hover:bg-[#c8a44c] transition-colors duration-300"
            >
              Learn More About NDAS
            </Link>
            <Link
              href="/academics"
              className="inline-flex items-center text-[13px] font-bold tracking-wide text-white border border-white/40 px-6 py-3.5 hover:bg-white/10 transition-colors duration-300"
            >
              Explore Our Trades
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── stats ─────────────────────────────── */

function Stats() {
  return (
    <section className="bg-[#f5f7f9] border-t border-b border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#0b2748]/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="py-8 px-6 sm:px-8"
            >
              <p className="text-[#0b2748] text-xl md:text-2xl font-semibold tracking-tight mb-1.5">
                {s.value}
              </p>
              <p className="text-[#0b2748]/65 text-[11px] font-bold tracking-[0.35em] uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── about ─────────────────────────────── */

function About() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left sticky */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true }}
            >
              <Eyebrow>About NDAS</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                Apprenticeship Built Around a Real Dockyard.
              </h2>
              <div className="w-8 h-[1px] bg-[#af8f47] mb-8" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/about"
                  className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#0b2748] border border-[#0b2748]/30 px-5 py-3 text-center hover:bg-[#0b2748] hover:text-white transition-all duration-300"
                >
                  Learn More About NDAS
                </Link>
                <Link
                  href="/academics"
                  className="text-[12px] font-bold tracking-[0.15em] uppercase text-center text-[#0b2748]/60 hover:text-[#0b2748] transition-colors"
                >
                  View Training Pathway →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true }}
            className="lg:w-2/3 space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10"
          >
            {ABOUT_ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                viewport={{ once: true }}
                className="group relative bg-[#f5f7f9] p-10 md:p-14 hover:bg-[#0b2748]/[0.04] transition-colors"
              >
                <p className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase mb-4">
                  {row.label}
                </p>
                <p className="text-[#0b2748]/75 font-medium leading-[1.75] text-base md:text-[17px] max-w-2xl">
                  {row.text}
                </p>
                <HoverLine />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── trades ────────────────────────────── */

function Trades() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left sticky */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true }}
            >
              <Eyebrow>Training Areas</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-4">
                Four Trades.
                <br />
                <span className="italic font-medium">
                  One Dockyard Context.
                </span>
              </h2>
              <div className="w-8 h-[1px] bg-[#af8f47] mt-6 mb-8" />
              <Link
                href="/academics"
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#0b2748]/60 hover:text-[#0b2748] transition-colors"
              >
                View Academics →
              </Link>
            </motion.div>
          </div>

          {/* Right rows */}
          <div className="lg:w-2/3">
            <div className="space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10">
              {TRADES.map((trade, i) => {
                const tradeId = parseInt(trade.index);
                return (
                  <Link key={trade.title} href={`/academics/${tradeId}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.7 }}
                      viewport={{ once: true }}
                      className="group relative bg-[#f5f7f9] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-[#eff2f7] transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10 flex-1 min-w-0">
                        {/* Index circle */}
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-[#0b2748]/20 rounded-full text-[#af8f47] text-[11px] font-bold tracking-widest group-hover:border-[#af8f47]/50 transition-colors duration-500">
                          {trade.index}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl md:text-[22px] font-semibold tracking-tight mb-2 text-[#0b2748]">
                            {trade.title}
                          </h3>
                          <p className="text-[#0b2748]/70 text-[14px] font-medium leading-relaxed">
                            {trade.description}
                          </p>
                          <div className="flex gap-2 mt-4 flex-wrap">
                            <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#0b2748]/[0.08] text-[#0b2748]/70">
                              {trade.badge}
                            </span>
                            <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#0b2748]/[0.08] text-[#0b2748]/70">
                              {trade.tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Mono label */}
                      <div className="shrink-0 hidden md:block">
                        <span className="text-[10px] font-mono font-semibold text-[#0b2748]/35 group-hover:text-[#af8f47]/60 transition-colors">
                          TRADE_{trade.index}
                        </span>
                      </div>

                      <HoverLine />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-between items-center"
            >
              <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-[#0b2748]/40">
                BAC · IAC · AAC
              </span>
              <div className="w-16 h-px bg-[#0b2748]/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── why ndas ──────────────────────────── */

function WhyNDAS() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left sticky nav */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true }}
            >
              <Eyebrow>Why NDAS</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-12">
                Technical Training That Starts Closer to the Work.
              </h2>

              <nav className="flex flex-col gap-6">
                {WHY.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setSelected(i)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <div className="relative w-8 h-[1px] bg-[#0b2748]/25 overflow-hidden flex-shrink-0">
                      <motion.div
                        animate={{ x: selected === i ? 0 : "-100%" }}
                        transition={{ duration: 0.4, ease: expo }}
                        className="absolute inset-0 bg-[#af8f47]"
                      />
                    </div>
                    <span
                      className={`text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-500 ${
                        selected === i
                          ? "text-[#af8f47] translate-x-2"
                          : "text-[#0b2748]/60 group-hover:text-[#0b2748]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Right panel */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: expo }}
                className="space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10"
              >
                {/* Active — expanded */}
                <div className="bg-[#f5f7f9] p-12 md:p-16">
                  <p className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase mb-6">
                    0{selected + 1}&nbsp;/&nbsp;0{WHY.length}
                  </p>
                  <h3 className="text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-tight text-[#0b2748] mb-6 leading-[1.1]">
                    {WHY[selected].title}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#af8f47] mb-6" />
                  <p className="text-[#0b2748]/75 text-[17px] font-medium leading-[1.75] max-w-xl">
                    {WHY[selected].description}
                  </p>
                </div>

                {/* Others — collapsed */}
                {WHY.filter((_, i) => i !== selected).map((item) => (
                  <button
                    key={item.title}
                    onClick={() =>
                      setSelected(WHY.findIndex((x) => x.title === item.title))
                    }
                    className="group relative w-full text-left bg-[#f5f7f9] px-12 py-8 flex items-center justify-between hover:bg-[#eff2f7] transition-colors"
                  >
                    <span className="text-[#0b2748]/70 font-medium tracking-tight group-hover:text-[#0b2748] transition-colors text-[15px]">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#0b2748]/35 group-hover:text-[#af8f47]/60 transition-colors">
                      View
                    </span>
                    <HoverLine />
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-between items-center"
            >
              <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-[#0b2748]/45">
                Naval Dockyard Apprentice School
              </span>
              <div className="w-16 h-px bg-[#0b2748]/25" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── cta ───────────────────────────────── */

function CTA() {
  return (
    <section className="bg-[#f5f7f9] py-16 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="bg-[#0b2748] relative overflow-hidden p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#af8f47] rounded-full" />
              <span className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase">
                Admissions &amp; Enquiries
              </span>
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
              Developing Technical Manpower for Naval and Maritime Support.
            </h2>
            <p className="text-white/70 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
              NDAS exists to train personnel whose practical skill can support
              maintenance, repair, and engineering readiness.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/admissions"
              className="text-[12px] font-bold tracking-[0.15em] uppercase bg-[#af8f47] text-[#0d2238] px-8 py-4 hover:bg-[#c8a44c] transition-colors duration-300 whitespace-nowrap text-center"
            >
              View Admissions
            </Link>
            <Link
              href="/contact"
              className="text-[12px] font-bold tracking-[0.15em] uppercase text-white border border-white/30 px-8 py-4 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap text-center"
            >
              Contact the School
            </Link>
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
        {/* Brand */}
        <div>
          <p className="text-white font-black text-[13px] tracking-tight leading-snug mb-4">
            NAVAL DOCKYARD
            <br />
            APPRENTICE SCHOOL
          </p>
          <p className="text-white/60 text-[13px] font-medium leading-[1.75]">
            The technical training school of Naval Dockyard Limited, focused on
            apprenticeship, practical engineering trades, and dockyard-relevant
            technical manpower development.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <p className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase mb-5">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-t border-white/15 flex items-center justify-between">
        <p className="text-[11px] text-white/40 tracking-widest uppercase">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="w-8 h-[1px] bg-[#af8f47]/50" />
      </div>
    </footer>
  );
}

/* ─────────────────────────── page ──────────────────────────────── */

export default function HomePage() {
  return (
    <div
      className={`${dmSans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Trades />
        <WhyNDAS />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
