import { Metadata } from "next";
import Image from "next/image";
import { galleryImages } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore a visual gallery of DBS Aesthetics Clinic & Salon treatments, interiors and transformations.",
};

export default function GalleryPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-24 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
          <div className="max-w-3xl">
            <p className="text-sm font-serif font-semibold uppercase tracking-[0.35em] text-[#c9ac6a]">
              Gallery
            </p>

            <h1 className="mt-4 text-4xl font-serif font-semibold text-[#f7f2e9] sm:text-5xl">
              A glimpse into our premium treatment environment.
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">
              From serene treatment rooms to polished salon styling, each image
              reflects our elevated standard of care.
            </p>
          </div>
        </AnimatedHero>
      </section>

      {/* Gallery */}
      <SectionShell
        eyebrow="Visual story"
        title="Our salon, skincare and treatment spaces"
        description="Luxury details, modern design and a calm atmosphere define the experience."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020]"
            >
              <div className="relative h-80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-[#c9ac6a]">Visual Preview</p>

                <p className="mt-2 text-sm leading-7 text-[#f7f2e9]/70">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}