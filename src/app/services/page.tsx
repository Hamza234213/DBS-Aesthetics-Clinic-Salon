import Link from "next/link";
import { treatmentCategories } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { AnimatedHero } from "@/components/AnimatedHero";

export default function ServicesPage() {
  return (
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-6 sm:px-6 md:pt-[140px] md:pb-8 lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">
              Services
            </p>

            <h1 className="mt-4 text-4xl font-serif font-semibold text-[#f7f2e9] sm:text-5xl">
              Explore every category of premium care offered at DBS.
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">
              Our services span facial and skin therapies, laser care, hair
              treatments, body treatments and salon services.
            </p>
          </div>
        </AnimatedHero>
      </section>

      {/* Service Categories */}
      <SectionShell
        eyebrow="Service categories"
        title="Choose the experience that fits your goals"
        description="Each category has a dedicated page with treatment details, benefits and booking options."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {treatmentCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/services/${category.slug}`}
              className="page-card group rounded-[1.75rem] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9ac6a]/40"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a] font-serif font-semibold">
                  {category.title}
                </p>
                <span className="text-[#c9ac6a] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>

              <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}