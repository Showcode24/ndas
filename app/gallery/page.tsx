// app/gallery/page.tsx
// Server Component — fetches gallery page content + all images from Sanity.

import { notFound } from "next/navigation";
import {
  GALLERY_PAGE_QUERY,
  ALL_GALLERY_IMAGES_QUERY,
  type GalleryPageData,
  type GalleryImageItem,
} from "@/sanity/queries/gallery";
import GalleryClient from "./gallery-client";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function GalleryPage() {
  const [data, images] = await Promise.all([
    client.fetch<GalleryPageData | null>(
      GALLERY_PAGE_QUERY,
      {},
      { next: { tags: ["galleryPage"] } },
    ),
    client.fetch<GalleryImageItem[]>(
      ALL_GALLERY_IMAGES_QUERY,
      {},
      { next: { tags: ["galleryImage"] } },
    ),
  ]);

  if (!data) notFound();

  return <GalleryClient data={data} images={images ?? []} />;
}
