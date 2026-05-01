"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Quote,
  History,
  Star,
  Anchor,
  Target,
  Eye,
  Shield,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import {
  leadershipData,
  pastCommanders,
  aboutPageData,
} from "@/lib/about-data";

// ─── Sub-Components ───────────────────────────────────────────────────────────

const LeaderCard = ({
  person,
  isLarge = false,
  isAccent = false,
}: {
  person: { name: string; title: string; image: string };
  isLarge?: boolean;
  isAccent?: boolean;
}) => (
  <div className="flex flex-col items-center group">
    <div
      className={`
        relative p-1 rounded-2xl transition-all duration-700
        ${
          isAccent
            ? "bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            : "bg-slate-800 border border-slate-700"
        }
      `}
    >
      <div
        className={`
          overflow-hidden rounded-xl bg-slate-900
          ${isLarge ? "w-48 h-60 md:w-56 md:h-72" : "w-36 h-48 md:w-44 md:h-56"}
        `}
      >
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
    </div>
    <div className="mt-5 text-center max-w-[200px]">
      <h4
        className={`font-bold tracking-tight ${isAccent ? "text-white text-lg" : "text-slate-200 text-base"}`}
      >
        {person.name}
      </h4>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 mt-1.5 font-bold">
        {person.title}
      </p>
    </div>
  </div>
);

// Icon map for mission/vision cards
const cardIcons: Record<string, React.ReactNode> = {
  Mission: <Target className="w-5 h-5" />,
  Vision: <Eye className="w-5 h-5" />,
  "Discipline & Safety": <Shield className="w-5 h-5" />,
  "The NDL Advantage": <Wrench className="w-5 h-5" />,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadershipPage() {
  const {
    hero,
    heritage,
    missionVision,
    organogram,
    address,
    timeline,
    history,
    cta,
  } = aboutPageData;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navigation />

      {/* 1. Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-slate-900/5 border border-slate-900/10">
              <Star className="w-4 h-4 text-slate-700 fill-slate-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
              {hero.heading.main} <br />
              <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">
                {hero.heading.highlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed mb-10">
              {hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Heritage */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_right,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6 text-blue-500">
              <Anchor className="w-4 h-4" />
              <span className="font-bold tracking-widest text-xs uppercase">
                {heritage.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">
              {heritage.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {heritage.body.map((para, i) => (
              <p
                key={i}
                className="text-slate-400 text-lg leading-relaxed font-light"
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Mission, Vision and Values */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-blue-600">
              <span className="font-bold tracking-widest text-xs uppercase">
                {missionVision.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {missionVision.heading}
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionVision.cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-blue-600 rounded-2xl p-8 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-500">
                  {cardIcons[card.title] ?? <Star className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-white mb-3 tracking-tight transition-colors duration-500">
                  {card.title}
                </h3>
                <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed font-light transition-colors duration-500">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Organogram */}
      <section className="py-32 px-4 bg-slate-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-24">
            <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-4">
              {organogram.heading}
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Tier 1: CNS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <LeaderCard person={leadershipData.cns} isLarge={true} />
          </motion.div>

          <div className="w-px h-16 bg-slate-800" />

          {/* Tier 2: COE + ASNDL */}
          <div className="relative w-full max-w-5xl">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-slate-800" />
            <div className="flex flex-col md:flex-row justify-around pt-16 gap-16 md:gap-0">
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-16 left-1/2 w-px h-16 bg-slate-800" />
                <LeaderCard person={leadershipData.coe} />
              </div>
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-16 left-1/2 w-px h-16 bg-slate-800" />
                <LeaderCard person={leadershipData.asndl} />
              </div>
            </div>
          </div>

          <div className="w-px h-16 bg-slate-800 mt-12 md:mt-0" />

          {/* Tier 3: CO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-4"
          >
            <LeaderCard person={leadershipData.co} isAccent={true} />
          </motion.div>
        </div>
      </section>

      {/* 5. CO Address + Timeline */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Address */}
            <div className="relative order-2 lg:order-1">
              <Quote className="absolute -top-12 -left-12 w-32 h-32 text-slate-50 -z-10" />
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                {address.heading.main} <br /> {address.heading.sub}{" "}
                <span className="text-blue-600">
                  {address.heading.highlight}
                </span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                {address.paragraphs.map((para, i) => (
                  <p key={i}>"{para}"</p>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xl">
                  {leadershipData.co.name}
                </p>
                <p className="text-blue-600 font-mono text-sm tracking-widest uppercase mt-1">
                  {address.signatoryRole}
                </p>
              </div>

              {/* Timeline — sits beneath the address */}
              <div className="mt-16">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                  Key Milestones
                </h3>
                <ol className="relative border-l-2 border-slate-200 space-y-0">
                  {timeline.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.12 }}
                      className="relative pl-8 pb-10 last:pb-0"
                    >
                      {/* dot */}
                      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow" />
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                        {item.marker}
                      </span>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>

            {/* CO Photo */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-32">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-200 relative group">
                <img
                  src={leadershipData.co.image}
                  alt="Commanding Officer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Past Commanding Officers */}
      {/* <section className="py-32 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <History className="w-5 h-5" />
                <span className="font-bold tracking-widest text-xs uppercase">
                  {history.eyebrow}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {history.heading}
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm font-light">
              {history.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pastCommanders.map((pco, idx) => (
              <motion.div
                key={pco.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={pco.image}
                    alt={pco.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                    {pco.tenure}
                  </div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight mb-2">
                    {pco.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                    {pco.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 7. CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
          <h2 className="text-white text-3xl md:text-5xl font-black mb-6 relative z-10">
            {cta.heading}
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            {cta.subheading}
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link href={cta.primaryCta.href}>
              <Button
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 h-auto text-base font-bold"
              >
                {cta.primaryCta.label} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={cta.secondaryCta.href}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-slate-700 text-white hover:bg-slate-800 px-8 py-6 h-auto text-base font-bold"
              >
                {cta.secondaryCta.label}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
