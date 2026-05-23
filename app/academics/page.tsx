// app/academics/page.tsx
// Server Component — fetches the academics page content + all course summaries
// from Sanity, passes typed data to <AcademicsClient />.

import { notFound } from "next/navigation";
import {
  ACADEMICS_PAGE_QUERY,
  ALL_COURSES_QUERY,
  type AcademicsPageData,
  type CourseSummary,
} from "@/sanity/queries/academics";
import AcademicsClient from "./academics-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function AcademicsPage() {
  const [data, courses] = await Promise.all([
    client.fetch<AcademicsPageData | null>(
      ACADEMICS_PAGE_QUERY,
      {},
      { next: { tags: ["academicsPage"] } },
    ),
    client.fetch<CourseSummary[]>(
      ALL_COURSES_QUERY,
      {},
      { next: { tags: ["course"] } },
    ),
  ]);

  if (!data) notFound();

  return <AcademicsClient data={data} courses={courses ?? []} />;
}
