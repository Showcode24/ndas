import { mockPrograms } from "@/lib/courses";
import { notFound } from "next/navigation";
import {
  Anchor,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CourseDetailClient } from "./course-detail-client";


// The parameter name MUST match the folder name [id]
export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = mockPrograms.find((p) => p.id === id);

  // If no course matches the ID, trigger the Next.js 404 page
  if (!course) return notFound();

  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-[#00234E] selection:text-white">
      <Navigation />
      <CourseDetailClient course={course} />
      <Footer />
    </main>
  );
}
