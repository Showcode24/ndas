"use client";

// app/partnerships/partnerships-client.tsx
// Receives pre-fetched Sanity data as a single `data` prop.

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import SiteLayout from "@/components/layouts/site-layout";
import type { PartnershipsPageData } from "@/sanity/queries/partnerships";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: PartnershipsPageData;
}

/* ─────────────────────────── helpers ───────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

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

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
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

function Hero({ hero }: { hero: PartnershipsPageData["hero"] }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[640px]"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: expo }}
            className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-[0.4em] uppercase bg-[#af8f47]/20 text-[#af8f47] rounded-full border border-[#af8f47]/30"
          >
            {hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: expo }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
          >
            {hero.heading.main}{" "}
            <span className="text-[#af8f47]">{hero.heading.highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: expo }}
            className="text-lg text-white/70 leading-relaxed max-w-md"
          >
            {hero.subheading}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── partnership approach ──────────────── */

function ApproachSection({ partnershipApproach }: { partnershipApproach: PartnershipsPageData["partnershipApproach"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <Eyebrow>{partnershipApproach.eyebrow}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2748] mb-8 leading-tight">
            {partnershipApproach.heading}
          </h2>
          <div className="space-y-4">
            {partnershipApproach.body.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: expo }}
                viewport={{ once: true }}
                className="text-base text-[#0b2748]/60 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── partners grid ─────────────────────── */

function PartnersSection({ partners }: { partners: PartnershipsPageData["partners"] }) {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: expo }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-[#0b2748]/5 hover:shadow-lg hover:border-[#af8f47]/30 transition-all duration-500"
            >
              {partner.logo && (
                <div className="relative h-16 mb-6">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}
              <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.3em] uppercase bg-[#af8f47]/10 text-[#af8f47] rounded-full">
                {partner.category}
              </span>
              <h3 className="text-xl font-black text-[#0b2748] mb-3">{partner.name}</h3>
              <p className="text-sm text-[#0b2748]/60 leading-relaxed">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CtaSection({ cta }: { cta: PartnershipsPageData["cta"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-3xl mx-auto"
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
          {cta.secondaryCta.href && cta.secondaryCta.label && (
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

export default function PartnershipsClient({ data }: Props) {
  return (
    <SiteLayout>
      <ScrollProgress />
      <Hero hero={data.hero} />
      <ApproachSection partnershipApproach={data.partnershipApproach} />
      <PartnersSection partners={data.partners} />
      <CtaSection cta={data.cta} />
    </SiteLayout>
  );
}
