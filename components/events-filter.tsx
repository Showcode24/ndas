"use client";

import React, { useState } from "react";
import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/lib/data";

const eventCategories = ["All", "Academic", "Sports", "Cultural", "Technical"];

export function EventsFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? mockEvents
      : mockEvents.filter((e) => e.category === selectedCategory);

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {eventCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No events found in this category
          </p>
        </div>
      )}
    </>
  );
}
