// app/about/page.tsx
// Server Component — fetches from Sanity, passes typed data to <AboutClient />.
// No "use client" here: data fetching stays on the server.

import { notFound } from "next/navigation";
import { ABOUT_PAGE_QUERY, type AboutPageData } from "@/sanity/queries/about";
import AboutClient from "./about-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // ISR — revalidate every 60 seconds

export default async function AboutPage() {
  const data = await client.fetch<AboutPageData | null>(
    ABOUT_PAGE_QUERY,
    {},
    // Cache tag so on-demand revalidation works: revalidateTag("aboutPage")
    { next: { tags: ["aboutPage"] } },
  );

  if (!data) notFound();

  return <AboutClient data={data} />;
}
