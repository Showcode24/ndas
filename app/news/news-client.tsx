"use client";

// app/news/news-client.tsx
// Receives pre-fetched Sanity data as props.
// Replaces all imports from data.ts (mockNews, mockEvents).

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";

import SiteLayout from "@/components/layouts/site-layout";
import type { NewsPageData, NewsPostSummary } from "@/sanity/queries/news";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: NewsPageData;
  posts: NewsPostSummary[];
}

/* ─────────────────────────── helpers ───────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
      <span className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47]">
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero({ hero }: { hero: NewsPageData["hero"] }) {
  return (
    <section className="relative min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden bg-[#0b2748]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[640px]"
        >
          <p className="text-white/40 text-[12px] font-medium mb-8">
            {hero.breadcrumbs}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: expo }}
            className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47] mb-4"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: expo }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
          >
            {hero.heading}
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

/* ─────────────────────────── post card ─────────────────────────── */

function PostCard({ post }: { post: NewsPostSummary }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: expo }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#0b2748]/5 shadow-sm hover:shadow-xl hover:border-[#af8f47]/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 bg-[#0b2748]/10 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#0b2748]/10">
            <Tag className="w-12 h-12" />
          </div>
        )}
        {post.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#af8f47] text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#0b2748]/80 text-white text-[9px] font-bold tracking-wide uppercase rounded-full">
          {post.postType === "event" ? "Event" : "News"}
        </span>
      </div>

      <div className="p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-3 text-[10px] font-bold text-[#0b2748]/40 uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {post.location}
            </span>
          )}
          <span className="px-2 py-0.5 bg-[#af8f47]/10 text-[#af8f47] rounded-full">
            {post.category}
          </span>
        </div>

        <h3 className="text-base font-black text-[#0b2748] mb-2 leading-snug group-hover:text-[#af8f47] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-[#0b2748]/55 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── listing section ───────────────────── */

function ListingSection({
  posts,
  filters,
}: {
  posts: NewsPostSummary[];
  filters: NewsPageData["filters"];
}) {
  const [activeTab, setActiveTab] = useState<"all" | "news" | "event">("all");
  const [activeCategory, setCategory] = useState("All");

  const allCategories = ["All", ...filters.categories];

  const filtered = posts.filter((p) => {
    const matchTab = activeTab === "all" || p.postType === activeTab;
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchTab && matchCat;
  });

  return (
    <section className="py-20 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        {/* Tab bar */}
        <div className="flex items-center gap-3 mb-8">
          {(["all", "news", "event"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-colors duration-300 ${
                activeTab === tab
                  ? "bg-[#0b2748] text-white"
                  : "bg-white border border-[#0b2748]/10 text-[#0b2748]/60 hover:border-[#0b2748]/30"
              }`}
            >
              {tab === "all" ? "All" : tab === "news" ? "News" : "Events"}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#af8f47] text-white"
                  : "bg-white border border-[#0b2748]/10 text-[#0b2748]/50 hover:border-[#af8f47]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeTab}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#0b2748]/40 py-24 text-sm"
            >
              No posts found for this filter combination.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CtaSection({ cta }: { cta: NewsPageData["cta"] }) {
  return (
    <section className="py-24 bg-[#0b2748]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
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
          {cta.secondaryCta.href && cta.secondaryCta.label && (
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

export default function NewsClient({ data, posts }: Props) {
  if (!data) return null;

  const safeFilters = {
    categories: Array.isArray(data?.filters?.categories)
      ? data.filters.categories
      : [],
  };

  return (
    <SiteLayout>
      <ScrollProgress />

      {data.hero && <Hero hero={data.hero} />}

      <ListingSection
        posts={Array.isArray(posts) ? posts : []}
        filters={safeFilters}
      />

      {data.cta && <CtaSection cta={data.cta} />}
    </SiteLayout>
  );
}
