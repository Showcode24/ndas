// app/page.tsx  (or app/(home)/page.tsx)
// Server Component — fetches from Sanity, passes typed data to <HomeClient />.
// No "use client" here: data fetching stays on the server.

import { notFound } from "next/navigation";
import { HOME_PAGE_QUERY, type HomePageData } from "@/sanity/queries/home";
import HomeClient from "./home-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // ISR — revalidate every 60 seconds

export default async function HomePage() {
  const data = await client.fetch<HomePageData | null>(
    HOME_PAGE_QUERY,
    {},
    { next: { tags: ["homePage"] } },
  );

  if (!data) notFound();

  return <HomeClient data={data} />;
}
