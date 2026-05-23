// app/partnerships/page.tsx
// Server Component — fetches from Sanity, passes typed data to <PartnershipsClient />.

import { notFound } from "next/navigation";
import { PARTNERSHIPS_PAGE_QUERY, type PartnershipsPageData } from "@/sanity/queries/partnerships";
import PartnershipsClient from "./partnerships-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function PartnershipsPage() {
  const data = await client.fetch<PartnershipsPageData | null>(
    PARTNERSHIPS_PAGE_QUERY,
    {},
    { next: { tags: ["partnershipsPage"] } },
  );

  if (!data) notFound();

  return <PartnershipsClient data={data} />;
}
