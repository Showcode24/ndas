// app/news/page.tsx
// Server Component — fetches news page content + all posts from Sanity.

import { notFound } from "next/navigation";
import {
  NEWS_PAGE_QUERY,
  ALL_NEWS_POSTS_QUERY,
  type NewsPageData,
  type NewsPostSummary,
} from "@/sanity/queries/news";
import NewsClient from "./news-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function NewsPage() {
  const [data, posts] = await Promise.all([
    client.fetch<NewsPageData | null>(
      NEWS_PAGE_QUERY,
      {},
      { next: { tags: ["newsPage"] } },
    ),
    client.fetch<NewsPostSummary[]>(
      ALL_NEWS_POSTS_QUERY,
      {},
      { next: { tags: ["newsPost"] } },
    ),
  ]);

  if (!data) notFound();

  return <NewsClient data={data} posts={posts ?? []} />;
}
