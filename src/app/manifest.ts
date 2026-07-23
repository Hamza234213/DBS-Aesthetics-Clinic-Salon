import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DBS Aesthetics Clinic & Salon",
    short_name: "DBS",
    description: "Luxury aesthetics and salon care in Karachi",
    start_url: "/",
    display: "standalone",
    background_color: "#232323",
    theme_color: "#c9ac6a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
