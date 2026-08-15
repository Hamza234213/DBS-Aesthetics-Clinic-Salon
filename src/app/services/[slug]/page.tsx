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

  const heroImage = service.gallery?.[0] ?? "/image1.PNG";
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

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#c9ac6a]/20">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                        Treatment
                      </th>
                      {hasAnyPackagePrice && (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                          Package Price
                        </th>
                      )}
                      {hasAnyIndividualPrice && (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                          Individual Session
                        </th>
                      )}
                      {hasAnyPrice && (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                          Price
                        </th>
                      )}
                      {hasAnyPriceRange && (
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                          Price Range
                        </th>
                      )}
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">
                        Book Now
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePricing.treatments.map(
                      (treatment: any, index: number) => (
                        <tr
                          key={index}
                          className="border-b border-[#c9ac6a]/10 hover:bg-[#c9ac6a]/10 transition-colors"
                        >
                          <td className="px-4 py-4 text-[#f7f2e9] font-medium">
                            {treatment.name}
                          </td>
                          {hasAnyPackagePrice && (
                            <td className="px-4 py-4 text-[#f7f2e9]">
                              {treatment.packagePrice
                                ? formatCurrency(treatment.packagePrice)
                                : "-"}
                            </td>
                          )}
                          {hasAnyIndividualPrice && (
                            <td className="px-4 py-4 text-[#f7f2e9]">
                              {treatment.individualPrice
                                ? formatCurrency(treatment.individualPrice)
                                : "-"}
                            </td>
                          )}
                          {hasAnyPrice && (
                            <td className="px-4 py-4 text-[#f7f2e9]">
                              {treatment.price
                                ? formatCurrency(treatment.price)
                                : "-"}
                            </td>
                          )}
                          {hasAnyPriceRange && (
                            <td className="px-4 py-4 text-[#f7f2e9]">
                              {treatment.priceRange
                                ? `PKR ${treatment.priceRange}`
                                : "-"}
                            </td>
                          )}
                          <td className="px-4 py-4">
                            <Button
                              href={`/book-appointment?treatment=${encodeURIComponent(treatment.name)}`}
                              className="inline-block"
                            >
                              Book
                            </Button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-[#f7f2e9]/60 italic">
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
