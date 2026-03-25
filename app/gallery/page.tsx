import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Anchor } from "lucide-react";
import { GalleryFilter } from "@/components/gallery-filter";

export const metadata = {
  title: "Gallery | NDAS",
  description: "Photo gallery showcasing NDAS events, training, and facilities",
};

export default function GalleryPage() {
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
                Memories
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Photo Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Capturing moments from NDAS events and activities
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GalleryFilter />
        </div>
      </section>

      <Footer />
    </main>
  );
}
