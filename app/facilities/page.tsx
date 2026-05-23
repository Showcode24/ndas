// app/facilities/page.tsx
// Server Component — fetches from Sanity, passes typed data to <FacilitiesClient />.

import { notFound } from "next/navigation";
import {
  FACILITIES_PAGE_QUERY,
  type FacilitiesPageData,
} from "@/sanity/queries/facilities";
import FacilitiesClient from "./facilities-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function FacilitiesPage() {
  const data = await client.fetch<FacilitiesPageData | null>(
    FACILITIES_PAGE_QUERY,
    {},
    { next: { tags: ["facilitiesPage"] } },
  );

  if (!data) notFound();

  return <FacilitiesClient data={data} />;
}
