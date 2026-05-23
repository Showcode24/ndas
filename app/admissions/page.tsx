// app/admissions/page.tsx
// Server Component — fetches from Sanity, passes typed data to <AdmissionsClient />.

import { notFound } from "next/navigation";
import { ADMISSIONS_PAGE_QUERY, type AdmissionsPageData } from "@/sanity/queries/admissions";
import AdmissionsClient from "./admissions-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function AdmissionsPage() {
  const data = await client.fetch<AdmissionsPageData | null>(
    ADMISSIONS_PAGE_QUERY,
    {},
    { next: { tags: ["admissionsPage"] } },
  );

  if (!data) notFound();

  return <AdmissionsClient data={data} />;
}
