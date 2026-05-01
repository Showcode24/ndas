"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroData,
  selectionData,
  admissionSteps,
  eligibilityData,
  criteria,
  faqSectionData,
  faqs,
  ctaData,
} from "@/lib/admissions-data";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdmissionsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white">
      <Navigation />

      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-6">
              {heroData.breadcrumb}
            </p>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-blue-600/5 border border-blue-600/10">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                {heroData.eyebrow}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.95]">
              {heroData.heading}
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed mb-10">
              {heroData.subheading}
            </p>

            <Link href={heroData.cta.href}>
              <Button
                size="lg"
                className="rounded-none bg-slate-900 hover:bg-blue-600 text-white px-8 h-14 transition-all group"
              >
                {heroData.cta.label}{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SELECTION PROCESS */}
      <section className="py-32 px-4 md:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                {selectionData.heading}
              </h2>
              {selectionData.note && (
                <p className="mt-4 text-xs font-mono text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-4">
                  {selectionData.note}
                </p>
              )}
            </div>
            <div className="hidden md:block pb-2 text-right">
              <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">
                {selectionData.status.label}
              </span>
              <p className="text-slate-500 text-xs mt-1">
                {selectionData.status.cycle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {index !== admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-20 -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-slate-800 group-hover:text-blue-500 transition-colors duration-500" />
                  </div>
                )}

                <div className="h-full p-8 lg:p-10 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-500">
                  <div className="flex items-start justify-between mb-12">
                    <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                      <step.icon className="w-6 h-6 text-blue-500 group-hover:text-white" />
                    </div>
                    <span className="font-mono text-4xl font-black text-slate-800 group-hover:text-blue-500/20 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                    {step.desc}
                  </p>

                  <div className="mt-8 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-1000 delay-500"
                      style={{ width: `${(index + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ELIGIBILITY / CRITERIA */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                {eligibilityData.heading.main}{" "}
                <span className="text-blue-600">
                  {eligibilityData.heading.highlight}
                </span>
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
                {eligibilityData.subheading}
              </p>
              <Link href={eligibilityData.cta.href}>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                  {eligibilityData.cta.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Criteria — flat strings, no detail sub-text */}
            <div className="space-y-4">
              {criteria.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-blue-600 transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5" />
                  <p className="text-slate-700 group-hover:text-white transition-colors leading-relaxed text-sm font-medium">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-6 lg:px-12 bg-white selection:bg-blue-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-blue-600 font-semibold tracking-wider text-xs uppercase">
                {faqSectionData.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {faqSectionData.heading.main} <br />
              <span className="text-slate-400 font-medium">
                {faqSectionData.heading.sub}
              </span>
            </h2>
            <p className="mt-6 text-base text-slate-500 max-w-sm leading-relaxed">
              {faqSectionData.subheading}
            </p>
            <button className="mt-8 group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-300">
              {faqSectionData.cta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-7 w-full pt-4">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full py-6 flex items-center justify-between text-left transition-colors hover:text-blue-600 focus:outline-none"
                    >
                      <span
                        className={`text-lg font-medium pr-8 transition-colors ${isOpen ? "text-blue-600" : "text-slate-900"}`}
                      >
                        {faq.question}
                      </span>
                      <span className="shrink-0 ml-4">
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"}`}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 pb-6"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-600 text-base leading-relaxed pr-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-blue-600 p-12 md:p-24 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/blueprint-pattern.png')] bg-repeat" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                {ctaData.heading}
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
                {ctaData.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105"
                >
                  {ctaData.primaryCta.label}
                </Button>
                <Link href={ctaData.secondaryCta.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/30 text-white hover:bg-white/10 px-12 py-8 text-xl backdrop-blur-sm"
                  >
                    {ctaData.secondaryCta.label}
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
