import type { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://dbsaesthetics.com"),
  title: {
    default: `${clinicInfo.name} | Luxury Aesthetics & Salon Care`,
    template: `%s | ${clinicInfo.name}`,
  },
  description:
    "Premium aesthetic treatments, laser care, skincare and salon services in Karachi with expert consultations and safe luxury care.",
  keywords: ["DBS Aesthetics", "Karachi clinic", "laser hair removal", "HydraFacial", "salon"],
  openGraph: {
    title: `${clinicInfo.name} | Luxury Aesthetics & Salon Care`,
    description:
      "Premium aesthetic treatments, laser care, skincare and salon services in Karachi with expert consultations and safe luxury care.",
    type: "website",
    locale: "en_US",
    url: "https://dbsaesthetics.com",
    siteName: clinicInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinicInfo.name} | Luxury Aesthetics & Salon Care`,
    description:
      "Premium aesthetic treatments, laser care, skincare and salon services in Karachi with expert consultations and safe luxury care.",
  },
  alternates: {
    canonical: "https://dbsaesthetics.com",
  },
};
