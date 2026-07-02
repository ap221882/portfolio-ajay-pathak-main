import { MetadataRoute } from 'next';

export const dynamic = "force-static";

const BASE_URL = "https://ajay-pathak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
