'use client';

import React, { createContext, useContext, useMemo } from 'react';
import {
  mockPrograms,
  mockEvents,
  mockFacilities,
  mockGallery,
  mockNews,
  heroSlides,
  statistics,
  teamMembers,
  Program,
  Event,
  Facility,
  GalleryImage,
  NewsItem,
} from '@/lib/data';

interface DataContextType {
  programs: Program[];
  events: Event[];
  facilities: Facility[];
  gallery: GalleryImage[];
  news: NewsItem[];
  heroSlides: typeof heroSlides;
  statistics: typeof statistics;
  teamMembers: typeof teamMembers;
  filterProgramsByCategory: (category: string) => Program[];
  filterEventsByCategory: (category: string) => Event[];
  filterGalleryByCategory: (category: string) => GalleryImage[];
  getUpcomingEvents: () => Event[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<DataContextType>(() => ({
    programs: mockPrograms,
    events: mockEvents,
    facilities: mockFacilities,
    gallery: mockGallery,
    news: mockNews,
    heroSlides,
    statistics,
    teamMembers,
    filterProgramsByCategory: (category: string) =>
      mockPrograms.filter((p) => p.category === category),
    filterEventsByCategory: (category: string) =>
      mockEvents.filter((e) => e.category === category),
    filterGalleryByCategory: (category: string) =>
      mockGallery.filter((g) => g.category === category),
    getUpcomingEvents: () =>
      mockEvents
        .filter((e) => e.date >= new Date())
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
  }), []);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
