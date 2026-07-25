import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicePages, servicesWithPrices } from "@/data/clinic";
import { Button } from "@/components/Button";
import { SectionShell } from "@/components/SectionShell";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
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
    "hair-treatments": "hairTreatments", // Added this line
    "laser-treatments": "laserHairRemoval",
    "skin-treatments": "skinWhiteningDrips",
    "body-treatments": "hifuTreatments",
    "salon-services": "eyebrowLipTints",
  };

  const key = categoryMap[slug];
  if (!key) return null;
  
  const serviceData = servicesWithPrices[key as keyof typeof servicesWithPrices];
  return serviceData || null;
};

// Type guard to check if treatment has packagePrice
const hasPackagePrice = (treatment: any): treatment is { packagePrice: number } => {
  return treatment && typeof treatment.packagePrice === 'number';
};

// Type guard to check if treatment has individualPrice
const hasIndividualPrice = (treatment: any): treatment is { individualPrice: number } => {
  return treatment && typeof treatment.individualPrice === 'number';
};

// Type guard to check if treatment has price
const hasPrice = (treatment: any): treatment is { price: number } => {
  return treatment && typeof treatment.price === 'number';
};

// Type guard to check if treatment has priceRange
const hasPriceRange = (treatment: any): treatment is { priceRange: string } => {
  return treatment && typeof treatment.priceRange === 'string';
};

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const heroImage = service.gallery?.[0] ?? "/image1.PNG";
  const servicePricing = getServicesForCategory(slug);

  // Check if any treatment has specific price types
  const hasAnyPackagePrice = servicePricing?.treatments?.some(hasPackagePrice) ?? false;
  const hasAnyIndividualPrice = servicePricing?.treatments?.some(hasIndividualPrice) ?? false;
  const hasAnyPrice = servicePricing?.treatments?.some(hasPrice) ?? false;
  const hasAnyPriceRange = servicePricing?.treatments?.some(hasPriceRange) ?? false;

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">{service.title}</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">{service.intro}</h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">{service.overview}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-appointment">Book This Treatment</Button>
              <Button href="https://wa.me/923333378862" variant="secondary">WhatsApp</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#1f1f1f]">
            <div className="relative h-80">
              <Image src={heroImage} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - Only show if pricing data exists */}
      {servicePricing && servicePricing.treatments && servicePricing.treatments.length > 0 && (
        <SectionShell 
          eyebrow="Pricing" 
          title={`${servicePricing.category} Packages & Pricing`} 
          description={servicePricing.description}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#c9ac6a]/20">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">Treatment</th>
                  {hasAnyPackagePrice && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">Package Price</th>
                  )}
                  {hasAnyIndividualPrice && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">Individual Session</th>
                  )}
                  {hasAnyPrice && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">Price</th>
                  )}
                  {hasAnyPriceRange && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#c9ac6a]">Price Range</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {servicePricing.treatments.map((treatment: any, index: number) => (
                  <tr key={index} className="border-b border-[#c9ac6a]/10 hover:bg-[#2a2a2a] transition-colors">
                    <td className="px-4 py-4 text-[#f7f2e9] font-medium">{treatment.name}</td>
                    {hasAnyPackagePrice && (
                      <td className="px-4 py-4 text-[#f7f2e9]">
                        {treatment.packagePrice ? `PKR ${treatment.packagePrice.toLocaleString()}` : '-'}
                      </td>
                    )}
                    {hasAnyIndividualPrice && (
                      <td className="px-4 py-4 text-[#f7f2e9]">
                        {treatment.individualPrice ? `PKR ${treatment.individualPrice.toLocaleString()}` : '-'}
                      </td>
                    )}
                    {hasAnyPrice && (
                      <td className="px-4 py-4 text-[#f7f2e9]">
                        {treatment.price ? `PKR ${treatment.price.toLocaleString()}` : '-'}
                      </td>
                    )}
                    {hasAnyPriceRange && (
                      <td className="px-4 py-4 text-[#f7f2e9]">
                        {treatment.priceRange ? `PKR ${treatment.priceRange}` : '-'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-[#f7f2e9]/60 italic">* Prices are in PKR. Packages valid for specified sessions.</p>
          </div>
        </SectionShell>
      )}

      <SectionShell eyebrow="Treatment overview" title="Why clients choose this service" description={service.overview}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.benefits.map((item) => (
            <div key={item} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#202020] p-6">
              <p className="text-lg font-semibold text-[#f7f2e9]">{item}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="How it works" title="A simple, premium treatment flow" description="Every session is guided by care, planning and professional support.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.process.map((step) => (
            <div key={step} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#202020] p-6">
              <p className="text-lg font-semibold text-[#f7f2e9]">{step}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Details" title="Practical information before your visit" description="A transparent overview of what to expect.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[#202020] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">Duration</p>
            <p className="mt-4 text-lg text-[#f7f2e9]">{service.duration}</p>
          </div>
          <div className="rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[#202020] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">Recovery</p>
            <p className="mt-4 text-lg text-[#f7f2e9]">{service.recovery}</p>
          </div>
          <div className="rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[#202020] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">Suitable for</p>
            <p className="mt-4 text-lg text-[#f7f2e9]">{service.suitableFor.join(", ")}</p>
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow="FAQs" title="Questions about this treatment" description="Common guidance for clients preparing for their experience.">
        <div className="space-y-4">
          {service.faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#202020] p-6">
              <p className="text-lg font-semibold text-[#f7f2e9]">{item.question}</p>
              <p className="mt-3 text-sm leading-7 text-[#f7f2e9]/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Before & after" title="Gallery preview for this treatment category" description="A visual summary of the premium care and aesthetic finish clients can expect.">
        <div className="grid gap-6 md:grid-cols-2">
          {service.gallery.map((item) => (
            <div key={item} className="overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020]">
              <div className="relative h-72">
                <Image src={item} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-[#c9ac6a]/20 bg-[#202020] p-8 text-center">
          <h2 className="text-3xl font-semibold text-[#f7f2e9]">Ready to begin?</h2>
          <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">Book your appointment or speak with our team for a tailored recommendation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/book-appointment">Book Appointment</Button>
            <Button href="https://wa.me/923333378862" variant="secondary">WhatsApp</Button>
          </div>
          <div className="mt-8 text-sm text-[#f7f2e9]/60">
            <Link href="/services" className="text-[#c9ac6a]">← Back to all services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}