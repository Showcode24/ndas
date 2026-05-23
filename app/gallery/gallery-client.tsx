"use client";

// app/gallery/gallery-client.tsx
// Receives pre-fetched Sanity data as props.
// Replaces all imports from data.ts (mockGallery).

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn, Calendar } from "lucide-react";

import SiteLayout from "@/components/layouts/site-layout";
import type {
  GalleryPageData,
  GalleryImageItem,
} from "@/sanity/queries/gallery";

/* ─────────────────────────── props ─────────────────────────────── */

interface Props {
  data: GalleryPageData;
  images: GalleryImageItem[];
}

/* ─────────────────────────── helpers ───────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
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

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero({ hero }: { hero: GalleryPageData["hero"] }) {
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

/* ─────────────────────────── lightbox ──────────────────────────── */

function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImageItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: expo }}
        className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {image.image ? (
          <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
            <Image
              src={image.image}
              alt={image.alt ?? image.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-[#0b2748]/40 flex items-center justify-center">
            <span className="text-white/30 text-sm">No image uploaded yet</span>
          </div>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-white font-bold text-lg">{image.title}</p>
          <div className="flex items-center gap-3 mt-1 text-white/50 text-xs">
            <span className="px-2 py-0.5 bg-[#af8f47]/30 text-[#af8f47] rounded-full">
              {image.category}
            </span>
            {image.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(image.date)}
              </span>
            )}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#af8f47] transition-colors duration-300"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── gallery grid ──────────────────────── */

function GalleryGrid({
  images,
  filters,
}: {
  images: GalleryImageItem[];
  filters: GalleryPageData["filters"];
}) {
  const [activeCategory, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImageItem | null>(null);

  const allCategories = ["All", ...filters.categories];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className="py-20 bg-[#f8f9fb]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        {/* Filter bar */}
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

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: expo }}
                  className="group relative break-inside-avoid cursor-pointer rounded-2xl overflow-hidden bg-[#0b2748]/10"
                  onClick={() => setLightbox(img)}
                >
                  {img.image ? (
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio:
                          img.imageWidth && img.imageHeight
                            ? `${img.imageWidth}/${img.imageHeight}`
                            : "4/3",
                      }}
                    >
                      <Image
                        src={img.image}
                        alt={img.alt ?? img.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video flex items-center justify-center text-[#0b2748]/20">
                      <ZoomIn className="w-10 h-10" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                    <p className="text-white font-bold text-sm">{img.title}</p>
                    <span className="text-[#af8f47] text-[10px] font-bold uppercase tracking-wide mt-1">
                      {img.category}
                    </span>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {img.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-[#af8f47] text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[#0b2748]/40 py-24 text-sm"
            >
              No images found in this category.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────── CTA ───────────────────────────────── */

function CtaSection({ cta }: { cta: GalleryPageData["cta"] }) {
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

export default function GalleryClient({ data, images }: Props) {
  if (!data) return null;

  return (
    <SiteLayout>
      <ScrollProgress />

      {data.hero && <Hero hero={data.hero} />}

      <GalleryGrid
        images={Array.isArray(images) ? images : []}
        filters={{
          categories: Array.isArray(data?.filters?.categories)
            ? data.filters.categories
            : [],
        }}
      />

      {data.cta && <CtaSection cta={data.cta} />}
    </SiteLayout>
  );
}
