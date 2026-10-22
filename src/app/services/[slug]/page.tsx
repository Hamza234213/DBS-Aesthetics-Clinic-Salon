import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  servicePages,
  servicesWithPrices,
  treatmentCategories,
} from "@/data/clinic";
import { Button } from "@/components/Button";
import { SectionShell } from "@/components/SectionShell";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

type PricingGroup =
  (typeof servicesWithPrices)[keyof typeof servicesWithPrices];

type TreatmentItem = {
  name: string;
  description?: string;
  features?: string[];
};

const allGroups: PricingGroup[] = Object.values(servicesWithPrices);

/** Finds the price group whose `slug` matches (case-insensitive). */
const findGroupBySlug = (slug: string): PricingGroup | null =>
  allGroups.find((group) => group.slug.toLowerCase() === slug.toLowerCase()) ??
  null;

/**
 * The generic landing pages in `servicePages` that don't share a slug with a
 * price group. Each one shows the group listed here.
 */
const DIRECT_PRICING: Record<string, string> = {
  "facial-treatments": "hydra-facial-treatments",
  "hair-treatments": "hair-treatment",
  "skin-treatments": "skin-whitening-treatments",
  "body-treatments": "haifu-treatments",
  "salon-services": "eyebrows-and-lips-tint-services",
};

/**
 * Every slug in `treatmentCategories` (clinic.ts) that has no page of its own
 * is rendered with the closest `servicePages` template. Its treatments and
 * prices come from the price group with the same slug.
 * Keys are lowercase because lookups are case-insensitive.
 */
const CATEGORY_TEMPLATE: Record<string, string> = {
  "hydra-facial-treatments": "facial-treatments",
  "skin-whitening-treatments": "skin-treatments",
  "haifu-treatments": "body-treatments",
  "sliming-drips-treatments": "body-treatments",
  "hair-treatment": "hair-treatments",
  "hair-extensions-services": "hair-treatments",
  "face-prp-treatments": "facial-treatments",
  "facial-services": "facial-treatments",
  "guinot-treatment": "facial-treatments",
  "whitening-and-lifting-facial": "facial-treatments",
  "peeling-treatments": "skin-treatments",
  "meso-therapy-service": "skin-treatments",
  "botox-treatments": "skin-treatments",
  "filling-services": "skin-treatments",
  "exosomal-therapy-treatment": "skin-treatments",
  "stemcells-therapy-treatment": "skin-treatments",
  "profilow-treatment": "skin-treatments",
  "bleaching-treatment": "skin-treatments",
  "eyebrows-and-lips-tint-services": "salon-services",
  "waxing-treatment": "salon-services",
  "threading-treatment": "salon-services",
  "makeup-services": "salon-services",
  "hands-and-feet-services": "salon-services",
  "hair-fashion-services": "salon-services",
  "nail-art-services": "salon-services",
  "mehandi-services": "salon-services",
  "eyelash-extension-services": "salon-services",
};

function resolveRoute(slug: string) {
  const key = slug.toLowerCase();

  // 1. A real page in servicePages (price group by same slug, else DIRECT_PRICING)
  const direct = servicePages.find((item) => item.slug.toLowerCase() === key);
  if (direct) {
    const group =
      findGroupBySlug(direct.slug) ??
      findGroupBySlug(DIRECT_PRICING[direct.slug] ?? "");
    return { service: direct, label: direct.title, group };
  }

  // 2. A category from treatmentCategories shown on a servicePages template
  const category = treatmentCategories.find(
    (item) => item.slug.toLowerCase() === key,
  );
  const templateSlug = CATEGORY_TEMPLATE[key];
  if (category && templateSlug) {
    const service = servicePages.find((item) => item.slug === templateSlug);
    if (service) {
      return {
        service,
        label: category.title,
        group: findGroupBySlug(category.slug),
      };
    }
  }

  return null;
}

export function generateStaticParams() {
  const slugs = new Set<string>([
    ...servicePages.map((item) => item.slug),
    ...treatmentCategories.map((item) => item.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveRoute(slug);
  return {
    title: resolved?.label ?? "Service",
    description: resolved?.service.intro ?? "Premium DBS aesthetic service",
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const resolved = resolveRoute(slug);

  if (!resolved) {
    notFound();
  }

  const { service, label, group } = resolved;
  const treatments = (group?.treatments ?? []) as TreatmentItem[];

  // Before/after pairs from the gallery (clinic.ts galleries hold 2 images)
  const beforeAfterPairs: { before: string; after: string }[] = [];
  for (let i = 0; i + 1 < service.gallery.length; i += 2) {
    beforeAfterPairs.push({
      before: service.gallery[i],
      after: service.gallery[i + 1],
    });
  }
  const hasStandaloneImage = service.gallery.length % 2 !== 0;

  const bookingHref = `/book-appointment?treatment=${encodeURIComponent(label)}`;

  return (
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:mt-36">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">
              {label}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">
              {service.intro}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={bookingHref}>Book This Treatment</Button>
            </div>
          </div>

          <div className="page-card rounded-[1.75rem] overflow-hidden p-0">
            {beforeAfterPairs.length > 0 ? (
              <div className="h-full">
                <BeforeAfterSlider
                  beforeImage={beforeAfterPairs[0].before}
                  afterImage={beforeAfterPairs[0].after}
                  alt={`${label} - Before & After`}
                  className="h-full"
                />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {service.gallery.map((item) => (
                  <div
                    key={item}
                    className="page-card overflow-hidden rounded-[1.25rem]"
                  >
                    <div className="relative h-72">
                      <Image
                        src={item}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasStandaloneImage && beforeAfterPairs.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="page-card overflow-hidden rounded-[1.25rem] md:col-span-2">
                  <div className="relative h-72">
                    <Image
                      src={service.gallery[service.gallery.length - 1]}
                      alt={label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TREATMENT CARDS */}
      {group && treatments.length > 0 && (
        <SectionShell
          eyebrow="Treatments"
          title={group.category}
          description={group.description}
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => {
              const description =
                treatment.description ??
                "A luxurious experience with customized care for you.";
              const features =
                treatment.features ?? service.benefits.slice(0, 3);

              return (
                <div
                  key={treatment.name}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[linear-gradient(135deg,#0b0907_0%,#17120b_55%,#261c0e_100%)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9ac6a]/40 hover:shadow-[0_15px_40px_rgba(201,172,106,0.1)]"
                >
                  {/* droplet background image */}
                  <Image
                    src="/Water%20Droplet%201.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="pointer-events-none select-none object-cover object-right"
                  />

                  <div className="relative z-10 p-5 pr-[34%]">
                    <h3 className="font-serif text-lg font-semibold leading-tight text-[#f7f2e9]">
                      {treatment.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#f7f2e9]/80 line-clamp-2">
                      {description}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-[#f7f2e9]/90"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e6c987] to-[#b08d48]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-2.5 w-2.5"
                              fill="none"
                              stroke="#1a1308"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                          </span>
                          <span className="text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}`}
                      className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[#232323] transition-all duration-300 bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)] hover:brightness-110 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)]"
                    >
                      Book Treatment
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionShell>
      )}

      <SectionShell
        eyebrow="Treatment overview"
        title="Why clients choose this service"
        description={service.overview}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.benefits.map((item) => (
            <div key={item} className="page-card rounded-[1.25rem] p-6">
              <p className="text-lg font-semibold text-[#f7f2e9]">{item}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="How it works"
        title="A simple, premium treatment flow"
        description="Every session is guided by care, planning and professional support."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.process.map((step) => (
            <div key={step} className="page-card rounded-[1.25rem] p-6">
              <p className="text-lg font-semibold text-[#f7f2e9]">{step}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Details"
        title="Practical information before your visit"
        description="A transparent overview of what to expect."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="page-card rounded-[1.5rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">
              Duration
            </p>
            <p className="mt-4 text-lg text-[#f7f2e9]">{service.duration}</p>
          </div>
          <div className="page-card rounded-[1.5rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">
              Recovery
            </p>
            <p className="mt-4 text-lg text-[#f7f2e9]">{service.recovery}</p>
          </div>
          <div className="page-card rounded-[1.5rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">
              Suitable for
            </p>
            <p className="mt-4 text-lg text-[#f7f2e9]">
              {service.suitableFor.join(", ")}
            </p>
          </div>
        </div>
      </SectionShell>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="page-card p-8 text-center rounded-[1.25rem]">
          <h2 className="text-3xl font-semibold text-[#f7f2e9]">
            Ready to begin?
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">
            Book your appointment or speak with our team for a tailored
            recommendation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={bookingHref}>Book Appointment</Button>
            <Button href="https://wa.me/923333378862" variant="secondary">
              WhatsApp
            </Button>
          </div>
          <div className="mt-8 text-sm text-[#f7f2e9]/60">
            <Link href="/services" className="text-[#c9ac6a]">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
