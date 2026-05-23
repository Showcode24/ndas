"use client";

// app/home-client.tsx  (or app/(home)/home-client.tsx)
// Receives pre-fetched Sanity data as a single `data` prop.
// Replace the previously hardcoded homeData / home-data.ts imports with this prop.

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

import SiteLayout from "@/components/layouts/site-layout";
import type { HomePageData } from "@/sanity/queries/home";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: HomePageData;
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
// NOTE: The existing hero slider component (HeroSlider / hero-slider.tsx) can be
// adapted to accept heroSlides from data.heroSlides instead of a hardcoded list.

function Hero({ heroSlides }: { heroSlides: HomePageData["heroSlides"] }) {
  // Use the first slide for a simple static hero, or wire up the existing
  // HeroSlider component by passing heroSlides to it as a prop.
  const slide = heroSlides[0];
  if (!slide) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0b2748]">
      {slide.image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${slide.image}'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
            backgroundBlendMode: "overlay",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[660px]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: expo }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
          >
            {slide.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: expo }}
            className="text-lg text-white/70 leading-relaxed mb-10 max-w-lg"
          >
            {slide.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: expo }}
            className="flex flex-wrap gap-4"
          >
            {slide.primaryCta.href && (
              <Link
                href={slide.primaryCta.href}
                className="px-8 py-4 bg-[#af8f47] text-white font-bold text-sm rounded-full hover:bg-[#c9a55a] transition-colors duration-300"
              >
                {slide.primaryCta.label}
              </Link>
            )}
            {slide.secondaryCta.href && (
              <Link
                href={slide.secondaryCta.href}
                className="px-8 py-4 border-2 border-white/30 text-white font-bold text-sm rounded-full hover:bg-white/10 transition-colors duration-300"
              >
                {slide.secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── about section ─────────────────────── */

function AboutSection({ about }: { about: HomePageData["about"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-[#0b2748] mb-6 leading-tight"
          >
            {about.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: expo }}
            viewport={{ once: true }}
            className="text-base text-[#0b2748]/60 leading-relaxed mb-8"
          >
            {about.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: expo }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {about.primaryCta.href && (
              <Link
                href={about.primaryCta.href}
                className="px-6 py-3 bg-[#0b2748] text-white font-bold text-sm rounded-full hover:bg-[#af8f47] transition-colors duration-300"
              >
                {about.primaryCta.label}
              </Link>
            )}
            {about.secondaryCta.href && (
              <Link
                href={about.secondaryCta.href}
                className="px-6 py-3 border-2 border-[#0b2748] text-[#0b2748] font-bold text-sm rounded-full hover:bg-[#0b2748] hover:text-white transition-colors duration-300"
              >
                {about.secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── stats section ─────────────────────── */

function StatsSection({ stats }: { stats: HomePageData["stats"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-[0.4em] uppercase bg-[#af8f47]/20 text-[#af8f47] rounded-full border border-[#af8f47]/30"
          >
            {stats.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
          >
            {stats.heading.prefix}{" "}
            <span className="text-[#af8f47]">{stats.heading.highlight}</span>{" "}
            {stats.heading.suffix}
          </motion.h2>
          <p className="text-base text-white/50 max-w-2xl leading-relaxed">{stats.subheading}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: expo }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-black text-[#af8f47] mb-2">{item.value}</div>
              <div className="text-sm text-white/50 uppercase tracking-wide">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── features section ──────────────────── */

function FeaturesSection({ features }: { features: HomePageData["features"] }) {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="mb-16">
          <Eyebrow>{features.eyebrow}</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-[#0b2748]"
          >
            {features.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: expo }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-[#0b2748]/5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0b2748] mb-6" />
              <h3 className="text-lg font-black text-[#0b2748] mb-3">{item.title}</h3>
              <p className="text-sm text-[#0b2748]/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── events section ────────────────────── */

function EventsSection({ events }: { events: HomePageData["events"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-lg">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-[#0b2748] mb-4"
            >
              {events.heading}
            </motion.h2>
            <p className="text-base text-[#0b2748]/60 leading-relaxed">{events.body}</p>
          </div>
          {events.primaryCta.href && (
            <Link
              href={events.primaryCta.href}
              className="px-6 py-3 border-2 border-[#0b2748] text-[#0b2748] font-bold text-sm rounded-full hover:bg-[#0b2748] hover:text-white transition-colors duration-300 flex-shrink-0"
            >
              {events.primaryCta.label}
            </Link>
          )}
        </div>
        {/* Events list — wire up dynamic events fetched separately or from a CMS array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholder — replace with real event cards when events CMS type is ready */}
          {Array.from({ length: events.displayCount }).map((_, i) => (
            <div key={i} className="h-40 bg-[#0b2748]/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA section ───────────────────────── */

function CtaSection({ cta }: { cta: HomePageData["cta"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-[0.4em] uppercase bg-[#af8f47]/20 text-[#af8f47] rounded-full border border-[#af8f47]/30"
        >
          {cta.badge}
        </motion.span>

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
              className="px-8 py-4 bg-[#af8f47] text-white font-bold text-sm rounded-full hover:bg-[#c9a55a] transition-colors duration-300"
            >
              {cta.primaryCta.label}
            </Link>
          )}
          {cta.secondaryCta.href && (
            <Link
              href={cta.secondaryCta.href}
              className="px-8 py-4 border-2 border-white/30 text-white font-bold text-sm rounded-full hover:border-white hover:bg-white/10 transition-colors duration-300"
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

export default function HomeClient({ data }: Props) {
  return (
    <SiteLayout>
      <ScrollProgress />
      <Hero heroSlides={data.heroSlides} />
      <AboutSection about={data.about} />
      <StatsSection stats={data.stats} />
      {/* Programs section — wire up trades from academicsPage or a shared trades CMS type */}
      <FeaturesSection features={data.features} />
      <EventsSection events={data.events} />
      <CtaSection cta={data.cta} />
    </SiteLayout>
  );
}
