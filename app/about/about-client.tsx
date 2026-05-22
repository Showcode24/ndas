"use client";

// app/about/about-client.tsx
// Receives pre-fetched Sanity data as a single `data` prop.
// All animation, hooks, and rendering logic lives here.

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Anchor } from "lucide-react";

import SiteLayout, { MagneticButton } from "@/components/layouts/site-layout";
import type { AboutPageData, Leader } from "@/sanity/queries/about";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: AboutPageData;
}

/* ─────────────────────────── shared easing ─────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (typeof window !== "undefined") {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
  }

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

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero({ hero }: { hero: AboutPageData["hero"] }) {
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
            backgroundImage: `url('${hero.backgroundImage}'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
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
            {hero.breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && (
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
                )}
                {i < hero.breadcrumb.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          <Eyebrow light>{hero.eyebrow}</Eyebrow>

          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
            {hero.heading}{" "}
            <span className="text-[#af8f47] relative inline-block">
              {hero.headingHighlight}
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
            {hero.headingTail}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: expo }}
            className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]"
          >
            {hero.subtext}
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

/* ─────────────────────────── heritage ──────────────────────────── */

function Heritage({ heritage }: { heritage: AboutPageData["heritage"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  function renderParagraph(text: string, i: number) {
    if (i !== 0 || !heritage.highlightDate) {
      return (
        <p
          key={i}
          className="text-[#0b2748]/70 font-medium leading-[1.8] text-[16px] md:text-[17px] mb-6"
        >
          {text}
        </p>
      );
    }
    const [before, after] = text.split(heritage.highlightDate);
    return (
      <p
        key={i}
        className="text-[#0b2748]/70 font-medium leading-[1.8] text-[16px] md:text-[17px] mb-6"
      >
        {before}
        <span className="text-[#0b2748] font-semibold">
          {heritage.highlightDate}
        </span>
        {after}
      </p>
    );
  }

  return (
    <section ref={ref} className="bg-[#f5f7f9] py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <Eyebrow>{heritage.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
              {heritage.heading}{" "}
              <span className="italic font-medium text-[#af8f47]">
                {heritage.headingHighlight}
              </span>
            </h2>
            <div className="w-12 h-[2px] bg-[#af8f47] mb-8" />
            {heritage.paragraphs.map((para, i) => renderParagraph(para, i))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: expo }}
              viewport={{ once: true }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#0b2748] flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#0b2748] font-bold text-[14px]">
                  {heritage.badge.label}
                </p>
                <p className="text-[#0b2748]/50 text-[12px] font-medium">
                  {heritage.badge.sublabel}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2 relative"
          >
            <div className="relative aspect-square max-w-[520px] mx-auto">
              <div className="absolute inset-0 bg-[#0b2748] rounded-sm overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#1d4e81]/30 blur-[80px]" />
              </div>
              <motion.div
                style={{ rotate: rotate1 }}
                className="absolute inset-8 border border-[#af8f47]/20 rounded-full"
              />
              <motion.div
                style={{ rotate: rotate1 }}
                className="absolute inset-16 border border-[#af8f47]/10 rounded-full"
              />
              <motion.div
                style={{ rotate: rotate2 }}
                className="absolute inset-12 border border-dashed border-[#4c6c84]/30 rounded-full"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: expo }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-[#af8f47] flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#af8f47]/10 flex items-center justify-center">
                      <span className="text-[#af8f47] font-black text-[18px] tracking-tight">
                        ND
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#af8f47]" />
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: expo }}
                viewport={{ once: true }}
                className="absolute top-6 right-6 w-10 h-10 border border-[#af8f47]/40"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: expo }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 w-6 h-6 bg-[#af8f47]/20"
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: expo }}
                viewport={{ once: true }}
                className="absolute bottom-10 right-10 text-right"
              >
                <p className="text-[#af8f47]/60 text-[10px] font-extrabold tracking-[0.5em] uppercase">
                  Naval Dockyard
                </p>
                <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">
                  Apprentice School
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: expo }}
                viewport={{ once: true }}
                className="absolute top-10 left-10"
              >
                <p className="text-white/80 text-3xl font-bold tracking-tight">
                  2019
                </p>
                <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5">
                  Re-Commissioned
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── mission / vision ─────────────────── */

function MissionVision({
  missionVision,
}: {
  missionVision: AboutPageData["missionVision"];
}) {
  const { mission, vision, values, ndlAdvantage } = missionVision;

  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Eyebrow>{missionVision.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            {missionVision.heading}
          </h2>
          <div className="w-8 h-[1px] bg-[#af8f47]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {[mission, vision].map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[#af8f47] pl-5"
              >
                <p className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#af8f47] mb-2">
                  {item.label}
                </p>
                <p className="text-[15px] font-medium text-[#0b2748]/65 leading-[1.8]">
                  {item.text}
                </p>
              </div>
            ))}
            <div className="border-l-2 border-[#af8f47] pl-5">
              <p className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#af8f47] mb-2">
                {values.label}
              </p>
              <p className="text-[15px] font-medium text-[#0b2748]/65 leading-[1.8] mb-5">
                {values.intro}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {values.tags.map((v) => (
                  <span
                    key={v}
                    className="text-[11px] font-semibold tracking-[0.06em] px-4 py-1.5 rounded-full border border-[#af8f47] text-[#af8f47]"
                  >
                    {v}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-[#0b2748]/45 italic">
                {values.footnote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-36 h-fit"
          >
            <div className="bg-[#0b2748] p-10 md:p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 flex items-center justify-center border border-[#af8f47]/40 rounded-full mb-6">
                  <Anchor
                    size={18}
                    className="text-[#af8f47]"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-white text-[20px] font-semibold tracking-tight leading-snug mb-5">
                  {ndlAdvantage.heading}
                </h3>
                <p className="text-white/60 text-[14px] font-medium leading-[1.85] mb-8">
                  {ndlAdvantage.body}
                </p>
                <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-4 text-center">
                  {ndlAdvantage.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[#af8f47] text-[30px] font-semibold tracking-tight leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-white/45 mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── objectives ────────────────────────── */

function Objectives({
  objectives,
}: {
  objectives: AboutPageData["objectives"];
}) {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Eyebrow>{objectives.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            {objectives.heading}
          </h2>
          <div className="w-8 h-[1px] bg-[#af8f47]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {objectives.prose.map((para, i) => (
              <p
                key={i}
                className="text-[#0b2748]/65 text-[15px] font-medium leading-[1.85]"
              >
                {para}
              </p>
            ))}
            <div className="mt-2">
              <Link
                href={objectives.cta.href}
                className="inline-flex items-center text-[12px] font-bold tracking-[0.15em] uppercase text-[#0b2748] border border-[#0b2748]/30 px-6 py-3 hover:bg-[#0b2748] hover:text-white transition-all duration-300"
              >
                {objectives.cta.label}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#af8f47] mb-5">
              Institutional Functions
            </p>
            <div className="flex flex-col gap-px bg-[#0b2748]/5 border border-[#0b2748]/10">
              {objectives.functions.map((fn, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#f5f7f9] px-6 py-5 flex gap-4 items-start hover:bg-[#eff2f7] transition-colors"
                >
                  <span className="text-[#af8f47] text-[16px] leading-none flex-shrink-0 mt-0.5">
                    ›
                  </span>
                  <p className="text-[#0b2748]/60 text-[13.5px] font-medium leading-[1.7] group-hover:text-[#0b2748]/80 transition-colors">
                    {fn}
                  </p>
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#af8f47] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── leader card ───────────────────────── */

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: expo, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group cursor-pointer w-full"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: expo }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="relative border border-[#0b2748]/10 overflow-hidden"
        >
          <div className="aspect-[3/4] bg-[#dce3ec] relative overflow-hidden">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border border-[#af8f47]/40 flex items-center justify-center">
                <Anchor
                  size={20}
                  className="text-[#af8f47]/60"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b2748] to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-[13px] font-semibold tracking-tight leading-snug">
              {leader.name}
            </p>
            <p className="text-[#af8f47] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">
              {leader.role}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 bg-[#af8f47] p-5 flex flex-col justify-between border border-[#af8f47] h-80"
        >
          <div>
            <p className="text-[9px] font-extrabold tracking-[0.3em] uppercase text-[#0d2238]/50 mb-2">
              Role
            </p>
            <p className="text-[#0d2238] text-[13px] font-bold tracking-tight leading-snug mb-3">
              {leader.role}
            </p>
            <div className="w-5 h-[1px] bg-[#0d2238]/25 mb-3" />
            <p className="text-[#0d2238]/75 text-[12px] font-medium leading-[1.65]">
              {leader.bio}
            </p>
          </div>
          <p className="text-[#0d2238] text-[11px] font-bold tracking-tight mt-3">
            {leader.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── leadership ────────────────────────── */

function Leadership({
  leadership,
}: {
  leadership: AboutPageData["leadership"];
}) {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Eyebrow>{leadership.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            {leadership.heading}
          </h2>
          <div className="w-8 h-[1px] bg-[#af8f47]" />
        </motion.div>

        {/* Compass grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-3 gap-5 items-center max-w-3xl mx-auto">
            <div />
            <div className="flex flex-col items-center gap-2">
              <LeaderCard leader={leadership.seniorLeaders[0]} index={0} />
            </div>
            <div />

            <div className="flex flex-col items-center gap-2">
              <LeaderCard leader={leadership.seniorLeaders[1]} index={1} />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border border-[#0b2748]/15" />
                <div className="absolute inset-3 rounded-full border border-[#af8f47]/30" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#0b2748]/10 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0b2748]/10 -translate-x-1/2" />
                {[
                  "top-2 left-1/2 -translate-x-1/2",
                  "bottom-2 left-1/2 -translate-x-1/2",
                  "left-2 top-1/2 -translate-y-1/2",
                  "right-2 top-1/2 -translate-y-1/2",
                ].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-1 h-1 rounded-full bg-[#af8f47]`}
                  />
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[8px] font-extrabold tracking-[0.2em] uppercase text-[#0b2748]/40">
                    NDAS
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LeaderCard leader={leadership.seniorLeaders[2]} index={2} />
            </div>

            <div />
            <div className="flex flex-col items-center gap-2">
              {/* currentCO is its own explicit field — not derived from the array */}
              <LeaderCard leader={leadership.currentCO} index={3} />
            </div>
            <div />
          </div>
        </motion.div>

        {/* CO Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Eyebrow>{leadership.coMessage.eyebrow}</Eyebrow>
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-[#0b2748] mb-10">
            {leadership.coMessage.heading}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-px bg-[#0b2748]/5 border border-[#0b2748]/10">
            <div className="relative bg-[#dce3ec] min-h-[320px]">
              <Image
                src={leadership.currentCO.image}
                alt={`${leadership.coMessage.name} — ${leadership.coMessage.title}, NDAS`}
                fill
                className="object-cover object-top opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-[#af8f47]/40 flex items-center justify-center">
                  <Anchor
                    size={20}
                    className="text-[#af8f47]/60"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0b2748] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-[13px] font-semibold">
                  {leadership.coMessage.name}
                </p>
                <p className="text-[#af8f47] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">
                  {leadership.coMessage.title}
                </p>
              </div>
            </div>

            <div className="bg-[#f5f7f9] p-8 md:p-12 flex flex-col gap-5">
              {leadership.coMessage.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[#0b2748]/65 text-[14px] font-medium leading-[1.85]"
                >
                  {para}
                </p>
              ))}
              <div className="mt-4 pt-6 border-t border-[#0b2748]/10">
                <p className="text-[#af8f47] text-[15px] font-semibold">
                  {leadership.coMessage.name}
                </p>
                <p className="text-[#0b2748]/45 text-[13px] mt-1">
                  {leadership.coMessage.title}
                </p>
                <p className="text-[#0b2748]/45 text-[13px]">
                  {leadership.coMessage.school}
                </p>
                <p className="text-[#af8f47] text-[13px] font-bold tracking-wide mt-3">
                  {leadership.coMessage.signoff}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Previous COs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
        >
          <Eyebrow>{leadership.previousCOsEyebrow}</Eyebrow>
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-[#0b2748] mb-2">
            {leadership.previousCOsHeading}
          </h3>
          <p className="text-[#0b2748]/45 text-[13px] font-medium mb-10">
            {leadership.previousCOsSubtext}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#0b2748]/5 border border-[#0b2748]/10">
            {leadership.previousCOs.map((co, i) => (
              <div key={co.name} className="bg-[#f5f7f9] p-4 min-h-[380px]">
                <LeaderCard leader={co} index={i} />
              </div>
            ))}
          </div>

          <p className="text-[#0b2748]/30 text-[11px] italic mt-5">
            {leadership.previousCOsFootnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CTA({ cta }: { cta: AboutPageData["cta"] }) {
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
            <Eyebrow light>{cta.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
              {cta.heading}
            </h2>
            <p className="text-white/60 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
              {cta.subtext}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <MagneticButton href={cta.primaryCta.href} variant="primary">
              {cta.primaryCta.label}
            </MagneticButton>
            <MagneticButton href={cta.secondaryCta.href} variant="outline">
              {cta.secondaryCta.label}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── root client component ─────────────── */

export default function AboutClient({ data }: Props) {
  if (!data) return null;

  return (
    <SiteLayout>
      <ScrollProgress />

      <main>
        {data.hero && <Hero hero={data.hero} />}

        {data.heritage && <Heritage heritage={data.heritage} />}

        {data.missionVision && (
          <MissionVision missionVision={data.missionVision} />
        )}

        {data.objectives && <Objectives objectives={data.objectives} />}

        {data.leadership && <Leadership leadership={data.leadership} />}

        {data.cta && <CTA cta={data.cta} />}
      </main>

      <BackToTop />
    </SiteLayout>
  );
}
