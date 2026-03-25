'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryImage, Eye } from 'lucide-react';
import { GalleryImage as IGalleryImage } from '@/lib/data';

interface GalleryImageComponentProps {
  image: IGalleryImage;
  index?: number;
  onOpen?: () => void;
}

export function GalleryImageComponent({
  image,
  index = 0,
  onOpen,
}: GalleryImageComponentProps) {
  return (
    <motion.button
      className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer text-left"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      onClick={onOpen}
    >
      {/* Image */}
      <Image
        src={image.image}
        alt={image.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="w-full">
          <h3 className="text-white font-semibold mb-1">{image.title}</h3>
          <p className="text-white/75 text-sm flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}
