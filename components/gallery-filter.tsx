'use client';

import React, { useState } from 'react';
import { GalleryImageComponent } from '@/components/gallery-image';
import { mockGallery } from '@/lib/data';

const galleryCategories = ['All', 'Events', 'Facilities', 'Training', 'Graduation', 'Sports'];

export function GalleryFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGallery =
    selectedCategory === 'All'
      ? mockGallery
      : mockGallery.filter((g) => g.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {galleryCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((image, index) => (
          <GalleryImageComponent key={image.id} image={image} index={index} />
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No images found in this category
          </p>
        </div>
      )}
    </>
  );
}