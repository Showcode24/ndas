"use client";

// app/facilities/facilities-client.tsx
// Receives pre-fetched Sanity data as a single `data` prop.

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Ship, Settings, Zap, Library, Wrench, Shield } from "lucide-react";

import SiteLayout from "@/components/layouts/site-layout";
import type { FacilitiesPageData } from "@/sanity/queries/facilities";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: FacilitiesPageData;
}

/* ─────────────────────────── helpers ───────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  Settings,
  Zap,
  Library,
  Wrench,
  Shield,
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
      <span className={`text-[10px] font-extrabold tracking-[0.5em] uppercase ${light ? "text-[#af8f47]" : "text-[#af8f47]"}`}>
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero({ hero }: { hero: FacilitiesPageData["hero"] }) {
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
          <p className="text-white/40 text-[12px] font-medium mb-8">{hero.breadcrumbs}</p>
          <p className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47] mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
            {hero.title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-md">{hero.description}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── training environment ──────────────── */

function TrainingEnvironment({ trainingEnvironment }: { trainingEnvironment: FacilitiesPageData["trainingEnvironment"] }) {
  return (
    <section className="py-16 bg-white border-b border-[#0b2748]/5">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: expo }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl md:text-3xl font-black text-[#0b2748] mb-4">{trainingEnvironment.title}</h2>
          <p className="text-base text-[#0b2748]/60 leading-relaxed">{trainingEnvironment.description}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── facility cards ────────────────────── */

function FacilityCards({ facilities }: { facilities: FacilitiesPageData["facilities"] }) {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((facility, i) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: expo }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 border border-[#0b2748]/5"
            >
              <div className="relative h-56 bg-[#0b2748]/10 overflow-hidden">
                {facility.image ? (
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="w-12 h-12 text-[#0b2748]/20" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#af8f47] text-white text-[10px] font-bold tracking-wide uppercase rounded-full">
                    {facility.category}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-black text-[#0b2748] mb-3">{facility.name}</h3>
                <p className="text-sm text-[#0b2748]/60 leading-relaxed">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── highlights ────────────────────────── */

function Highlights({ highlights }: { highlights: FacilitiesPageData["highlights"] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = iconMap[item.iconKey] ?? Settings;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: expo }}
                viewport={{ once: true }}
                className="p-6 border border-[#0b2748]/10 rounded-2xl hover:border-[#af8f47] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0b2748] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#af8f47]" />
                </div>
                <h3 className="font-bold text-[#0b2748] mb-2">{item.title}</h3>
                <p className="text-sm text-[#0b2748]/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── extended context ──────────────────── */

function ExtendedContext({ extendedContext }: { extendedContext: FacilitiesPageData["extendedContext"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl">
          <Eyebrow light>{extendedContext.eyebrow}</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
          >
            {extendedContext.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: expo }}
            viewport={{ once: true }}
            className="text-base text-white/60 leading-relaxed mb-10"
          >
            {extendedContext.description}
          </motion.p>
          {extendedContext.cta.link && (
            <Link
              href={extendedContext.cta.link}
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 text-white font-bold text-sm rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              {extendedContext.cta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── root ──────────────────────────────── */

export default function FacilitiesClient({ data }: Props) {
  return (
    <SiteLayout>
      <ScrollProgress />
      <Hero hero={data.hero} />
      <TrainingEnvironment trainingEnvironment={data.trainingEnvironment} />
      <FacilityCards facilities={data.facilities} />
      <Highlights highlights={data.highlights} />
      <ExtendedContext extendedContext={data.extendedContext} />
    </SiteLayout>
  );
}
