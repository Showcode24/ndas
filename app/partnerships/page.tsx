"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { partnershipsPageData } from "@/lib/partnerships-data";

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-6">
              {partnershipsPageData.hero.breadcrumb}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-blue-600/5 border border-blue-600/10">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                {partnershipsPageData.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.95]">
              {partnershipsPageData.hero.heading.main}{" "}
              <span className="text-blue-600">
                {partnershipsPageData.hero.heading.highlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed">
              {partnershipsPageData.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIP APPROACH + GRID */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-4">
              {partnershipsPageData.partnershipApproach.eyebrow}
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {partnershipsPageData.partnershipApproach.heading}
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed">
              {partnershipsPageData.partnershipApproach.body.map((p, i) => (
                <span key={i}>
                  {p}
                  {i !== partnershipsPageData.partnershipApproach.body.length - 1
                    ? " "
                    : ""}
                </span>
              ))}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipsPageData.partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {partner.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {partner.description}
                </p>

                <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full bg-blue-50 text-blue-600">
                  {partner.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[3rem] bg-blue-600 p-12 md:p-20 text-center text-white">
            <p className="text-xs uppercase tracking-widest text-blue-200 font-bold mb-4">
              Partnership Enquiries
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              {partnershipsPageData.cta.heading}
            </h2>

            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              {partnershipsPageData.cta.subheading}
            </p>

            <Link href={partnershipsPageData.cta.primaryCta.href}>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-bold rounded-full">
                {partnershipsPageData.cta.primaryCta.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}