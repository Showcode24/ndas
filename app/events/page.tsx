import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Anchor } from "lucide-react";
import { EventsFilter } from "@/components/events-filter";

export const metadata = {
  title: "Events | NDAS",
  description:
    "Upcoming events and activities at Naval Dockyard Apprenticeship School",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Anchor className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Calendar
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with NDAS activities and events
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <EventsFilter />
        </div>
      </section>

      <Footer />
    </main>
  );
}
