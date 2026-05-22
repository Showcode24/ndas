'use client';

import React, { useState } from 'react';
import { ProgramCard } from '@/components/program-card';
import { mockPrograms } from '@/lib/data';

const categories = ['All', 'Marine', 'Electrical', 'Mechanical', 'Civil'];

export function ProgramsFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPrograms =
    selectedCategory === 'All'
      ? mockPrograms
      : mockPrograms.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
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

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredPrograms.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} />
        ))}
      </div>
    </>
  );
}