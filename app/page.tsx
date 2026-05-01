"use client";

import React from "react";
import { HeroSlider } from "@/components/hero-slider";
import { ProgramCard } from "@/components/program-card";
import { EventCard } from "@/components/event-card";
import { TestimonialSection } from "@/components/testimonial-section";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowRight, Anchor, Award, Calendar, Wrench } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { mockPrograms, mockEvents, heroSlides } from "@/lib/data";
import { homeData, trades, keyFeatures } from "@/lib/home-data";

const upcomingEvents = mockEvents
  .filter((e: any) => e.date >= new Date())
  .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
  .slice(0, homeData.events.displayCount);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white">
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-16 md:pt-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <HeroSlider
            slides={mockPrograms.slice(0, 3).map((p: any, i: number) => ({
              id: p.id,
              title: heroSlides[i].title,
              subtitle: heroSlides[i].subtitle,
              image: heroSlides[i].image,
              href: `/academics/${p.id}`,
            }))}
          />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Anchor className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {homeData.about.eyebrow}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                {homeData.about.heading}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {homeData.about.body}
              </p>
              <div className="flex gap-4">
                <Link href={homeData.about.primaryCta.href}>
                  <Button className="bg-primary hover:bg-primary/90">
                    {homeData.about.primaryCta.label}
                  </Button>
                </Link>
                <Link href={homeData.about.secondaryCta.href}>
                  <Button variant="outline">
                    {homeData.about.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Anchor className="w-24 h-24 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Snapshot / Stats ──────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y }}
            className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen"
          />
          <div className="absolute bottom-[0%] -left-[10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
              >
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold tracking-wider text-blue-300 uppercase">
                  {homeData.stats.badge}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-[1.1]"
              >
                {homeData.stats.heading.prefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {homeData.stats.heading.highlight}
                </span>{" "}
                {homeData.stats.heading.suffix}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-slate-400 leading-relaxed mb-8 max-w-md"
              >
                {homeData.stats.subheading}
              </motion.p>
            </div>

            {/* Snapshot tiles — driven entirely from homeData.stats.items */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-10">
                  {homeData.stats.items.map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-2xl md:text-3xl font-extrabold text-white mb-1 leading-tight">
                        {item.value}
                      </p>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trades ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-blue-600" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  {homeData.programs.eyebrow}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {homeData.programs.heading}
              </h2>
            </div>

            <Link
              href={homeData.programs.viewAllCta.href}
              className="group hidden md:flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              <span>{homeData.programs.viewAllCta.label}</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trades.map((trade, index) => (
              <motion.div
                key={trade.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {mockPrograms[index] ? (
                  <Link href={`/academics/${mockPrograms[index].id}`}>
                    <ProgramCard program={mockPrograms[index]} index={index} />
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">{trade.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
                      {trade.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {trade.pathway.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                        >
                          {p}
                        </span>
                      ))}
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                        {trade.category}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-blue-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                {homeData.features.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight max-w-2xl">
              {homeData.features.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  {homeData.events.heading}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {homeData.events.body}
                </p>
              </div>
              <Link
                href={homeData.events.primaryCta.href}
                className="inline-flex"
              >
                <Button className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all bg-blue-600 hover:bg-blue-700">
                  {homeData.events.primaryCta.label}
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {upcomingEvents.map((event: any, index: number) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <EventCard event={event} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <TestimonialSection />
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0F172A] px-8 py-20 text-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-blue-200 text-sm font-semibold tracking-wide mb-8 border border-white/20 backdrop-blur-md">
                {homeData.cta.badge}
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight text-balance">
                {homeData.cta.heading}
              </h2>

              <p className="text-xl text-slate-300 mb-10 text-balance leading-relaxed">
                {homeData.cta.subheading}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href={homeData.cta.primaryCta.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold px-10 py-7 text-lg shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                  >
                    {homeData.cta.primaryCta.label}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href={homeData.cta.secondaryCta.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-white/20 text-black hover:bg-white/10 hover:text-white backdrop-blur-sm px-10 py-7 text-lg transition-all"
                  >
                    {homeData.cta.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
