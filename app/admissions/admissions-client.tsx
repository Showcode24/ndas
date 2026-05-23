"use client";

// app/admissions/admissions-client.tsx
// Receives pre-fetched Sanity data as a single `data` prop.
// All animation, hooks, and rendering logic lives here.

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { FileText, ClipboardList, UserCheck, Trophy } from "lucide-react";

import SiteLayout from "@/components/layouts/site-layout";
import type { AdmissionsPageData } from "@/sanity/queries/admissions";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: AdmissionsPageData;
}

/* ─────────────────────────── helpers ───────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  ClipboardList,
  UserCheck,
  Trophy,
};

/* ─────────────────────────── scroll progress ───────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#af8f47] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

/* ─────────────────────────── primitives ────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 0.6, ease: expo }}
        viewport={{ once: true }}
        className="h-[2px] bg-[#af8f47] rounded-full flex-shrink-0"
      />
      <span className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47]">
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero({ hero }: { hero: AdmissionsPageData["hero"] }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32">
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
            className="text-white/40 text-[12px] font-medium mb-8"
          >
            {hero.breadcrumb}
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: expo }}
            className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47] mb-4"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: expo }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
          >
            {hero.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: expo }}
            className="text-lg text-white/70 leading-relaxed mb-10 max-w-md"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: expo }}
          >
            <Link
              href={hero.cta.href}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#af8f47] text-white font-bold text-sm rounded-full hover:bg-[#c9a55a] transition-colors duration-300"
            >
              {hero.cta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── selection process ─────────────────── */

function SelectionSection({ selection }: { selection: AdmissionsPageData["selection"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#0b2748]">{selection.heading}</h2>
            <span className="px-4 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
              {selection.status.label}
            </span>
          </div>
          <p className="text-sm text-[#0b2748]/50 mb-2">{selection.status.cycle}</p>
          {selection.note && (
            <p className="text-sm text-[#0b2748]/60 italic">{selection.note}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {selection.steps.map((step, i) => {
            const Icon = iconMap[step.iconKey] ?? FileText;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: expo }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0b2748] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#af8f47]" />
                  </div>
                  <span className="text-5xl font-black text-[#0b2748]/10 leading-none">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0b2748] mb-3">{step.title}</h3>
                <p className="text-sm text-[#0b2748]/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── eligibility ───────────────────────── */

function EligibilitySection({ eligibility }: { eligibility: AdmissionsPageData["eligibility"] }) {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#0b2748] leading-tight mb-6">
              {eligibility.heading.main}{" "}
              <span className="text-[#af8f47]">{eligibility.heading.highlight}</span>
            </h2>
            <p className="text-base text-[#0b2748]/60 leading-relaxed mb-8">
              {eligibility.subheading}
            </p>
            <Link
              href={eligibility.cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0b2748] text-[#0b2748] font-bold text-sm rounded-full hover:bg-[#0b2748] hover:text-white transition-colors duration-300"
            >
              {eligibility.cta.label}
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {eligibility.criteria.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: expo }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#0b2748]/5"
              >
                <div className="w-2 h-2 rounded-full bg-[#af8f47] flex-shrink-0 mt-2" />
                <p className="text-sm text-[#0b2748]/70 leading-relaxed">{c.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FAQ ───────────────────────────────── */

function FaqSection({ faq }: { faq: AdmissionsPageData["faq"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
          >
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-[#0b2748] mb-4">
              {faq.heading.main}{" "}
              <span className="text-[#af8f47]">{faq.heading.sub}</span>
            </h2>
            <p className="text-base text-[#0b2748]/60 leading-relaxed mb-8">{faq.subheading}</p>
            {faq.cta.href && (
              <Link
                href={faq.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b2748] text-white font-bold text-sm rounded-full hover:bg-[#af8f47] transition-colors duration-300"
              >
                {faq.cta.label}
              </Link>
            )}
          </motion.div>

          <div className="space-y-3">
            {faq.faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: expo }}
                viewport={{ once: true }}
                className="border border-[#0b2748]/10 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-bold text-[#0b2748] text-sm">{item.question}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0b2748] text-white text-lg flex items-center justify-center leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-[#0b2748]/60 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CtaSection({ cta }: { cta: AdmissionsPageData["cta"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
        >
          {cta.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: expo }}
          viewport={{ once: true }}
          className="text-base text-white/60 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {cta.subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: expo }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {cta.primaryCta.href && (
            <Link
              href={cta.primaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#af8f47] text-white font-bold text-sm rounded-full hover:bg-[#c9a55a] transition-colors duration-300"
            >
              {cta.primaryCta.label}
            </Link>
          )}
          {cta.secondaryCta.href && (
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-sm rounded-full hover:border-white hover:bg-white/10 transition-colors duration-300"
            >
              {cta.secondaryCta.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── root ──────────────────────────────── */

export default function AdmissionsClient({ data }: Props) {
  if (!data) return null;

  return (
    <SiteLayout>
      <ScrollProgress />

      {data.hero && <Hero hero={data.hero} />}

      {data.selection && (
        <SelectionSection selection={data.selection} />
      )}

      {data.eligibility && (
        <EligibilitySection eligibility={data.eligibility} />
      )}

      {Array.isArray(data.faq) && data.faq.length > 0 && (
        <FaqSection faq={data.faq} />
      )}

      {data.cta && <CtaSection cta={data.cta} />}
    </SiteLayout>
  );
}
