"use client";

// app/academics/academics-client.tsx
// Receives pre-fetched Sanity data as props.
// Replaces all imports from academics-data.ts and courses.ts.

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Anchor } from "lucide-react";

import SiteLayout from "@/components/layouts/site-layout";
import type { AcademicsPageData, CourseSummary } from "@/sanity/queries/academics";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data:    AcademicsPageData;
  courses: CourseSummary[];
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

function Hero({ hero }: { hero: AcademicsPageData["hero"] }) {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      {hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${hero.backgroundImage}'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
            backgroundBlendMode: "overlay",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[640px]"
        >
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: expo }}
            className="flex items-center gap-2 text-white/40 text-[12px] font-medium mb-8"
          >
            {hero.breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {i < hero.breadcrumb.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
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
            {hero.heading}{" "}
            <span className="text-[#af8f47]">{hero.headingHighlight}</span>{" "}
            {hero.headingTail}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: expo }}
            className="text-lg text-white/70 leading-relaxed max-w-md"
          >
            {hero.subtext}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── training structure ────────────────── */

function TrainingStructure({ trainingStructure }: { trainingStructure: AcademicsPageData["trainingStructure"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <Eyebrow>{trainingStructure.eyebrow}</Eyebrow>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-[#0b2748] leading-tight"
          >
            {trainingStructure.heading}{" "}
            <span className="text-[#af8f47]">{trainingStructure.headingHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: expo }}
            viewport={{ once: true }}
            className="text-base text-[#0b2748]/60 leading-relaxed pt-2"
          >
            {trainingStructure.body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── courses / trades grid ─────────────── */

function CoursesSection({
  trades,
  courses,
}: {
  trades:   AcademicsPageData["trades"];
  courses:  CourseSummary[];
}) {
  // Prefer course documents (richer data); fall back to trades from the page doc.
  const items = courses.length > 0 ? courses : trades;

  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const isCourse = "slug" in item;
            const slug     = isCourse ? (item as CourseSummary).slug : null;
            const title    = item.title;
            const desc     = isCourse
              ? (item as CourseSummary).shortDesc
              : (item as AcademicsPageData["trades"][0]).description;
            const img      = isCourse ? (item as CourseSummary).image : null;
            const duration = isCourse ? (item as CourseSummary).duration : null;
            const cert     = isCourse ? (item as CourseSummary).certification : null;

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: expo }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden border border-[#0b2748]/5 shadow-sm hover:shadow-xl hover:border-[#af8f47]/30 transition-all duration-500"
              >
                {/* Image / placeholder */}
                <div className="relative h-44 bg-[#0b2748]/10 overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Anchor className="w-10 h-10 text-[#0b2748]/20" />
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <h3 className="text-lg font-black text-[#0b2748] mb-2">{title}</h3>
                  <p className="text-sm text-[#0b2748]/60 leading-relaxed mb-4">{desc}</p>

                  {(duration || cert) && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {duration && (
                        <span className="px-3 py-1 bg-[#0b2748]/5 text-[#0b2748] text-[10px] font-bold rounded-full uppercase tracking-wide">
                          {duration}
                        </span>
                      )}
                      {cert && (
                        <span className="px-3 py-1 bg-[#af8f47]/10 text-[#af8f47] text-[10px] font-bold rounded-full uppercase tracking-wide">
                          {cert}
                        </span>
                      )}
                    </div>
                  )}

                  {slug && (
                    <Link
                      href={`/academics/${slug}`}
                      className="inline-flex items-center gap-2 text-[#0b2748] font-bold text-sm hover:text-[#af8f47] transition-colors duration-300"
                    >
                      View Programme
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── features ──────────────────────────── */

const featureIcons: Record<string, React.ReactNode> = {
  dockyard: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  ),
  practical: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  certification: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  ),
};

function FeaturesSection({ features }: { features: AcademicsPageData["features"] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: expo }}
              viewport={{ once: true }}
              className="p-8 border border-[#0b2748]/10 rounded-3xl hover:border-[#af8f47] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0b2748] flex items-center justify-center text-[#af8f47] mb-6">
                {featureIcons[feature.iconKey] ?? <Anchor className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-black text-[#0b2748] mb-3">{feature.title}</h3>
              <p className="text-sm text-[#0b2748]/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CtaSection({ cta }: { cta: AcademicsPageData["cta"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
        <Eyebrow light>{cta.eyebrow}</Eyebrow>
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
          {cta.subtext}
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

export default function AcademicsClient({ data, courses }: Props) {
  if (!data) return null;

  return (
    <SiteLayout>
      <ScrollProgress />

      {data.hero && <Hero hero={data.hero} />}

      {data.trainingStructure && (
        <TrainingStructure trainingStructure={data.trainingStructure} />
      )}

      {data.trades?.length > 0 && (
        <CoursesSection trades={data.trades} courses={courses ?? []} />
      )}

      {data.features && (
        <FeaturesSection features={data.features} />
      )}

      {data.cta && <CtaSection cta={data.cta} />}
    </SiteLayout>
  );
}
