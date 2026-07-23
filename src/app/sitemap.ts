import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://dbsaesthetics.com", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/about", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/contact", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/gallery", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/faqs", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/book-appointment", lastModified: new Date() },
    { url: "https://dbsaesthetics.com/services", lastModified: new Date() },
  ];
}
