import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicePages, servicesWithPrices } from "@/data/clinic";
import { Button } from "@/components/Button";
import { SectionShell } from "@/components/SectionShell";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  return {
    title: service?.title ?? "Service",
    description: service?.intro ?? "Premium DBS aesthetic service",
  };
}

// Helper function to get services for a category
const getServicesForCategory = (slug: string) => {
  const categoryMap: Record<string, string> = {
    "facial-treatments": "hydraFacials",
    "hair-treatments": "hairTreatments",
    "laser-treatments": "laserHairRemoval",
    "skin-treatments": "skinWhiteningDrips",
    "body-treatments": "hifuTreatments",
    "salon-services": "eyebrowLipTints",
  };

  const key = categoryMap[slug];
  if (!key) return null;

  const serviceData =
    servicesWithPrices[key as keyof typeof servicesWithPrices];
  return serviceData || null;
};

// Type guard to check if treatment has packagePrice
const hasPackagePrice = (
  treatment: any,
): treatment is { packagePrice: number } => {
  return treatment && typeof treatment.packagePrice === "number";
};

// Type guard to check if treatment has individualPrice
const hasIndividualPrice = (
  treatment: any,
): treatment is { individualPrice: number } => {
  return treatment && typeof treatment.individualPrice === "number";
};

// Type guard to check if treatment has price
const hasPrice = (treatment: any): treatment is { price: number } => {
  return treatment && typeof treatment.price === "number";
};

// Type guard to check if treatment has priceRange
const hasPriceRange = (treatment: any): treatment is { priceRange: string } => {
  return treatment && typeof treatment.priceRange === "string";
};

const TAX_RATE = 0.1;
const formatCurrency = (amount: number) => `PKR ${amount.toLocaleString()}`;

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const heroImage = service.gallery?.[0] ?? "/image1.png";
  const servicePricing = getServicesForCategory(slug);

  // Check if any treatment has specific price types
  const hasAnyPackagePrice =
    servicePricing?.treatments?.some(hasPackagePrice) ?? false;
  const hasAnyIndividualPrice =
    servicePricing?.treatments?.some(hasIndividualPrice) ?? false;
  const hasAnyPrice = servicePricing?.treatments?.some(hasPrice) ?? false;
  const hasAnyPriceRange =
    servicePricing?.treatments?.some(hasPriceRange) ?? false;

  // Prepare before/after pairs from gallery
  const beforeAfterPairs = [];
  for (let i = 0; i < service.gallery.length; i += 2) {
    if (i + 1 < service.gallery.length) {
      beforeAfterPairs.push({
        before: service.gallery[i],
        after: service.gallery[i + 1],
      });
    }
  }

  // If we have an odd number of images, use the last one as a standalone
  const hasStandaloneImage = service.gallery.length % 2 !== 0;

  return (
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:mt-36">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">
              {service.title}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">
              {service.intro}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-appointment">Book This Treatment</Button>
            </div>
          </div>

          <div className="page-card rounded-[1.75rem] overflow-hidden p-0">
{beforeAfterPairs.length > 0 ? (
  <div className="h-full">
    <BeforeAfterSlider
      beforeImage={beforeAfterPairs[0].before}
      afterImage={beforeAfterPairs[0].after}
      alt={`${service.title} - Before & After`}
      className="h-full"
    />
  </div>
) : (
          // Fallback to regular gallery if no pairs
          <div className="grid gap-6 md:grid-cols-2">
            {service.gallery.map((item) => (
              <div
                key={item}
                className="page-card overflow-hidden rounded-[1.25rem]"
              >
                <div className="relative h-72">
                  <Image
                    src={item}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show standalone image if odd number */}
        {hasStandaloneImage && beforeAfterPairs.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="page-card overflow-hidden rounded-[1.25rem] md:col-span-2">
              <div className="relative h-72">
                <Image
                  src={service.gallery[service.gallery.length - 1]}
                  alt={service.title}
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

      {/* PRICING SECTION - Only show if pricing data exists */}
      {servicePricing &&
        servicePricing.treatments &&
        servicePricing.treatments.length > 0 && (
          <SectionShell
            eyebrow="Pricing"
            title={`${servicePricing.category} Packages & Pricing`}
            description={servicePricing.description}
          >

              {/* Responsive Luxury Treatment Cards Grid (Replaces outdated HTML table) */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {servicePricing.treatments.map((treatment: any, index: number) => {
                  const isMultiSession = treatment.packagePrice && treatment.individualPrice;

                  return (
                    <div
                      key={index}
                      className="page-card group flex flex-col justify-between rounded-[1.75rem] border border-[#c9ac6a]/20 p-6 transition-all duration-300 hover:border-[#c9ac6a]/40 hover:shadow-[0_15px_40px_rgba(201,172,106,0.1)]"
                    >
                      <div>
                        {/* Card Header & Badge */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-xl font-serif font-semibold text-[#f7f2e9] group-hover:text-[#c9ac6a] transition-colors">
                            {treatment.name}
                          </h3>
                          {isMultiSession && (
                            <span className="rounded-full bg-[#c9ac6a]/15 border border-[#c9ac6a]/30 px-3 py-1 text-[11px] font-semibold text-[#c9ac6a] whitespace-nowrap">
                              Multi-Session Available
                            </span>
                          )}
                        </div>

                        {/* Pricing details */}
                        <div className="mt-4 space-y-3">
                          {treatment.packagePrice && (
                            <div className="flex items-center justify-between rounded-xl bg-[#0a0a0a]/70 p-3.5 border border-[#c9ac6a]/15">
                              <div>
                                <span className="text-xs font-serif font-semibold text-[#c9ac6a] uppercase tracking-wider">Full Package</span>
                                <p className="text-xs text-[#f7f2e9]/60">Complete Treatment Series</p>
                              </div>
                              <span className="text-lg font-bold font-serif text-[#f7f2e9]">
                                {formatCurrency(treatment.packagePrice)}
                              </span>
                            </div>
                          )}

                          {treatment.individualPrice && (
                            <div className="flex items-center justify-between rounded-xl bg-[#0a0a0a]/40 p-3.5 border border-white/5">
                              <div>
                                <span className="text-xs font-serif font-medium text-[#f7f2e9]/80 uppercase tracking-wider">Per Session</span>
                                <p className="text-xs text-[#f7f2e9]/50">Single Visit Option</p>
                              </div>
                              <span className="text-base font-semibold text-[#f7f2e9]/90">
                                {formatCurrency(treatment.individualPrice)}
                              </span>
                            </div>
                          )}

                          {treatment.price && !isMultiSession && (
                            <div className="flex items-center justify-between rounded-xl bg-[#0a0a0a]/60 p-3.5 border border-[#c9ac6a]/15">
                              <span className="text-xs font-serif font-semibold text-[#c9ac6a] uppercase tracking-wider">Standard Rate</span>
                              <span className="text-lg font-bold font-serif text-[#f7f2e9]">
                                {formatCurrency(treatment.price)}
                              </span>
                            </div>
                          )}

                          {treatment.priceRange && (
                            <div className="flex items-center justify-between rounded-xl bg-[#0a0a0a]/60 p-3.5 border border-[#c9ac6a]/15">
                              <span className="text-xs font-serif font-semibold text-[#c9ac6a] uppercase tracking-wider">Price Range</span>
                              <span className="text-base font-semibold text-[#f7f2e9]">
                                PKR {treatment.priceRange}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 pt-4 border-t border-[#c9ac6a]/15 flex flex-wrap gap-2">
                        {isMultiSession ? (
                          <>
                            <Button
                              href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}&session=Full%20Package`}
                              className="flex-1 text-center justify-center text-xs py-2.5"
                            >
                              Book Package
                            </Button>
                            <Button
                              href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}&session=Single%20Session`}
                              variant="secondary"
                              className="flex-1 text-center justify-center text-xs py-2.5"
                            >
                              Single Session
                            </Button>
                          </>
                        ) : (
                          <Button
                            href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}`}
                            className="w-full text-center justify-center py-2.5"
                          >
                            Book Treatment
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-sm text-[#f7f2e9]/60 italic text-center sm:text-left">
                * All listed prices are exclusive of tax. An additional {TAX_RATE * 100}% tax
                will be applied at the time of billing.
              </p>
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
            <Button href="/book-appointment">Book Appointment</Button>
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
