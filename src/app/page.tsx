import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  clinicInfo,
  treatmentCategories,
  testimonials,
  stats,
  faqs,
  certifications,
} from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";
import { ReviewCard } from "@/components/ReviewCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AnimatedHero } from "@/components/AnimatedHero";
import {
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

/* ============================================================
   PERFORMANCE NOTES (what changed vs. the old version)
   - No blur-* blobs and no backdrop-blur anywhere (GPU killers).
     Glows are now plain gradients, which are practically free.
   - No infinite animations (shimmer / ping) that repaint forever.
   - No `transition-all` and no animated box-shadow. Hover effects
     only animate transform / opacity / colors.
   - Below-the-fold sections use content-visibility:auto so the
     browser skips rendering them until they're near the viewport.
   - Hero card image now has `sizes` + `priority`.
   ============================================================ */

const featuredSlugs = [
  "hydra-facial-treatments",
  "laser-treatments",
  "skin-whitening-treatments",
  "facial-services",
  "hair-fashion-services",
  "makeup-services",
];

const featuredCategories = featuredSlugs.flatMap(
  (slug) => treatmentCategories.find((c) => c.slug === slug) ?? [],
);

const whyItems = [
  {
    title: "Consultation-led treatment planning",
    text: "Every service begins with an honest assessment and tailored recommendation.",
  },
  {
    title: "Certified experts and modern protocol",
    text: "Our team pairs advanced aesthetics with strict hygiene and care standards.",
  },
  {
    title: "Comfort-first salon & skincare services",
    text: "Expect discreet, polished and highly personalized attention from start to finish.",
  },
];

/* Contact links computed once on the server instead of inline in JSX */
function toWhatsAppNumber(raw: unknown) {
  const n = String(raw).replace(/\D/g, "");
  if (n.startsWith("0")) return `92${n.slice(1)}`;
  if (n.startsWith("92")) return n;
  return `92${n}`;
}
const whatsappHref = `https://wa.me/${toWhatsAppNumber(clinicInfo.whatsapp)}`;
const landlineHref = `tel:${String(clinicInfo.landline).replace(/\D/g, "")}`;
const instagramHref =
  "https://www.instagram.com/dbsbyzaini?igsh=MXQ3MWhhcWp1aTh0Zw==";

/* Shared class strings (kept as full literals so Tailwind can detect them) */
const GOLD_GRADIENT =
  "bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]";
const GOLD_SHADOW =
  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)]";

/* Cheap hover transition: only transform + colors (covers Tailwind v3 and v4) */
const CARD_TRANSITION =
  "transition-[transform,scale,translate,border-color,background-color] duration-300";

/* Single gradient layers replacing all the old blurred blobs */
const HERO_GLOW =
  "bg-[linear-gradient(to_bottom_right,rgb(201_172_106/0.2),rgb(201_172_106/0.05),transparent),radial-gradient(circle_500px_at_95%_15%,rgb(201_172_106/0.15),transparent),radial-gradient(circle_400px_at_5%_95%,rgb(201_172_106/0.15),transparent),radial-gradient(circle_600px_at_50%_50%,rgb(201_172_106/0.08),transparent)]";
const PAGE_GLOW =
  "bg-[radial-gradient(circle_700px_at_100%_0%,rgb(201_172_106/0.15),transparent),radial-gradient(circle_600px_at_0%_100%,rgb(201_172_106/0.1),transparent),radial-gradient(circle_500px_at_33%_10%,rgb(201_172_106/0.08),transparent),radial-gradient(circle_450px_at_67%_90%,rgb(201_172_106/0.08),transparent),radial-gradient(circle_400px_at_50%_50%,rgb(201_172_106/0.06),transparent)]";

/* Lets the browser skip layout/paint of sections that are off-screen */
function Deferred({ children }: { children: ReactNode }) {
  return (
    <div className="[content-visibility:auto] [contain-intrinsic-size:auto_720px]">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* =========================================================
          HERO SECTION
      ========================================================== */}
      <section className="relative isolate flex min-h-[max(680px,100svh)] flex-col justify-center overflow-hidden">
        {/* Background image (mostly covered by the overlay, so low quality is fine) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt="Luxury aesthetics background"
            fill
            className="object-cover"
            priority
            quality={50}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/88" />
        </div>

        {/* One combined gold glow layer (replaces 3 gradients + 3 blurred blobs) */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 ${HERO_GLOW}`}
        />

        <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-32 pb-10 sm:px-6 sm:pt-36 sm:pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-[90px] lg:pb-8">
          {/* LEFT SIDE */}
          <AnimatedHero>
            <div className="mb-6 w-full sm:mb-8 lg:mb-10">
              <p className="mb-4 font-serif text-xs font-semibold tracking-[0.35em] text-[#c9ac6a] uppercase sm:mb-5 sm:text-sm lg:mb-5">
                Luxury aesthetics • salon • skincare
              </p>

              <h1 className="max-w-2xl font-serif text-3xl leading-[1.1] font-semibold text-[#f7f2e9] sm:text-5xl sm:leading-[1] lg:text-6xl lg:leading-[0.95] xl:text-7xl">
                Confidence begins with expert care.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#f7f2e9]/80 sm:mt-7 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg lg:leading-8">
                {clinicInfo.homepageAbout}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 lg:mt-8 lg:gap-4">
                <Button href="/book-appointment">Book Your Consultation</Button>
                <Button href={clinicInfo.socials.whatsapp} variant="secondary">
                  WhatsApp Us
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#f7f2e9]/70 sm:mt-6 sm:text-sm lg:mt-7 lg:gap-6">
                <span>UAN {clinicInfo.phone}</span>
                <span>Tel {clinicInfo.landline}</span>
                <span>{clinicInfo.hours}</span>
              </div>
            </div>
          </AnimatedHero>

          {/* RIGHT SIDE: FEATURED SHOWCASE */}
          <AnimatedHero>
            <div className="group relative mx-auto w-full max-w-md lg:max-w-[440px]">
              <div
                className={`relative overflow-hidden rounded-[2rem] border border-[#c9ac6a]/30 bg-[#0a0a0a]/90 p-4 shadow-[0_0_60px_rgba(201,172,106,0.18),0_20px_50px_rgba(0,0,0,0.75)] sm:p-6 lg:p-5 ${CARD_TRANSITION} ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:border-[#c9ac6a]/60`}
              >
                {/* Header tag (static dot, no infinite ping) */}
                <div className="flex items-center justify-between border-b border-[#c9ac6a]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9ac6a] shadow-[0_0_8px_#c9ac6a]" />
                    <span className="font-serif text-[10px] font-bold tracking-[0.25em] text-[#c9ac6a] uppercase sm:text-xs">
                      Featured Suite
                    </span>
                  </div>

                  <span className="rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/10 px-2.5 py-1 text-[9px] font-semibold text-[#f4d98a] sm:text-[10px]">
                    ★ 4.9 / 5
                  </span>
                </div>

                {/* Main visual */}
                <div className="relative mt-3 h-44 w-full overflow-hidden rounded-xl border border-[#c9ac6a]/20 sm:h-52 lg:h-48">
                  <Image
                    src="/Hydra Facial.png"
                    alt="Vampire Hydra Facial Treatment Suite"
                    fill
                    priority
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                  <div className="absolute right-3 bottom-3 left-3">
                    <span
                      className={`inline-block rounded-md px-2 py-1 text-[9px] font-bold tracking-widest text-[#232323] uppercase ${GOLD_GRADIENT} ${GOLD_SHADOW}`}
                    >
                      Top Requested
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-[#f7f2e9] sm:text-xl lg:text-lg">
                      Vampire Hydra Facial
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-3 grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-[#c9ac6a]/15 bg-[#121212] p-3">
                    <p className="text-[10px] font-medium text-[#c9ac6a]">
                      Session Duration
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#f7f2e9] sm:text-sm">
                      60 Minutes
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#c9ac6a]/15 bg-[#121212] p-3">
                    <p className="text-[10px] font-medium text-[#c9ac6a]">
                      Expected Result
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#f7f2e9] sm:text-sm">
                      Instant Deep Glow
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-3 flex items-center justify-between border-t border-[#c9ac6a]/15 pt-3">
                  <div>
                    <span className="text-[10px] text-[#f7f2e9]/60">
                      Starting from
                    </span>
                    <p className="font-serif text-base font-bold text-[#c9ac6a] sm:text-lg">
                      PKR 15,000
                    </p>
                  </div>

                  <Button href="/book-appointment?treatment=Hydra%20Facial">
                    Book Suite
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedHero>
        </div>
      </section>

      {/* =========================================================
          REST OF THE WEBSITE
      ========================================================== */}
      <div className="relative bg-[#0a0a0a]">
        {/* One static gradient layer instead of 4 gradients + 5 blurred blobs */}
        <div
          className={`pointer-events-none absolute inset-0 z-0 ${PAGE_GLOW}`}
        />
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />

        <div className="relative z-10">
          {/* WHY DBS */}
          <SectionShell
            eyebrow="Why DBS"
            title="Luxury care with medical precision and a private-client experience."
            description="Every appointment is shaped around trust, safety and visible results."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {whyItems.map(({ title, text }, index) => (
                <div
                  key={title}
                  className={`group relative rounded-[1.75rem] border border-[#c9ac6a]/20 bg-[#0a0a0a]/70 p-6 sm:p-8 ${CARD_TRANSITION} hover:scale-[1.02] hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a]`}
                >
                  {/* Glow fades in via opacity only (GPU friendly) */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 shadow-[0_20px_60px_rgba(201,172,106,0.12)] transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9ac6a]/30 text-xs font-medium text-[#c9ac6a]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/20 to-transparent" />
                  </div>

                  <h3 className="relative z-10 font-[Patrick] text-xl font-semibold text-[#c9ac6a]">
                    {title}
                  </h3>

                  <p className="relative z-10 mt-4 text-sm leading-7 text-[#f7f2e9]/60 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
                    {text}
                  </p>

                  <div className="relative z-10 mt-6 h-px bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/40 to-[#c9ac6a]/20" />
                </div>
              ))}
            </div>
          </SectionShell>

          {/* INSTAGRAM EXCLUSIVE DEALS BANNER (right below the hero) */}
          <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-14">
            <div
              className={`group relative overflow-hidden rounded-[1.75rem] border border-[#c9ac6a]/30 bg-[#0f0f0f] px-6 py-8 text-center sm:px-10 sm:py-10 ${CARD_TRANSITION} hover:scale-[1.02] hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a]`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_0%,rgb(201_172_106/0.15),transparent)]" />
              {/* Hover glow fades in via opacity only (same as the other cards) */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 shadow-[0_20px_60px_rgba(201,172,106,0.12)] transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/50 to-transparent" />

              <div className="relative z-10 flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9ac6a]/40 bg-[#c9ac6a]/10 text-2xl text-[#c9ac6a]">
                  <FaInstagram aria-hidden="true" />
                </span>

                <p className="mt-4 font-serif text-xs font-semibold tracking-[0.35em] text-[#c9ac6a] uppercase sm:text-sm">
                  Limited-time offers
                </p>

                <h2 className="mt-3 max-w-2xl font-serif text-2xl leading-tight font-semibold text-[#f7f2e9] sm:text-3xl lg:text-4xl">
                  For Exclusive Deals, Visit Our Instagram
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#f7f2e9]/70 transition-colors duration-300 group-hover:text-[#f7f2e9]/90 sm:text-base">
                  Our latest offers and seasonal packages are posted first on
                  Instagram. Tap below to see what&apos;s on right now.
                </p>

                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wider text-[#232323] uppercase transition-[filter] duration-300 hover:brightness-110 ${GOLD_GRADIENT} ${GOLD_SHADOW}`}
                >
                  <FaInstagram aria-hidden="true" />
                  View Exclusive Deals
                </a>
              </div>
            </div>
          </section>

          {/* TREATMENT CATEGORIES */}
          <Deferred>
            <SectionShell
              eyebrow="Treatment categories"
              title="Explore a full spectrum of aesthetic and salon care"
              description="Every category is available under one luxury roof in Karachi."
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/services/${category.slug}`}
                    className={`group relative rounded-4xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/80 ${CARD_TRANSITION} hover:scale-[1.02] hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a] active:scale-[0.98]`}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-4xl opacity-0 shadow-[0_20px_60px_rgba(201,172,106,0.15)] transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-4xl">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="relative overflow-hidden rounded-b-4xl p-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/5 via-[#c9ac6a]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <h3 className="relative z-10 font-[Patrick] text-xl font-semibold text-[#c9ac6a]">
                        {category.title}
                      </h3>

                      <p className="relative z-10 mt-3 text-sm leading-7 text-[#f7f2e9]/70 transition-colors duration-300 group-hover:text-[#f7f2e9]/90">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/services"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wider text-[#232323] uppercase transition-[filter] duration-300 hover:brightness-110 ${GOLD_GRADIENT} ${GOLD_SHADOW}`}
                >
                  Explore More
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </SectionShell>
          </Deferred>

          {/* RESULTS */}
          <Deferred>
            <SectionShell
              eyebrow="Results"
              title="What clients say about their experience"
              description="Real feedback from clients who value expertise, comfort and lasting results."
            >
              <div className="grid gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <ReviewCard
                    key={testimonial.name}
                    name={testimonial.name}
                    title={testimonial.title}
                    quote={testimonial.quote}
                  />
                ))}
              </div>
            </SectionShell>
          </Deferred>

          {/* CLINIC HIGHLIGHTS */}
          <Deferred>
            <SectionShell
              eyebrow="Clinic highlights"
              title="Trusted by clients who value premium care and clear communication"
              description="Our approach is designed to make every appointment feel calm, luxurious and fully informed."
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`page-card page-card-soft group relative rounded-[1.75rem] p-6 text-center sm:p-8 ${CARD_TRANSITION} hover:scale-[1.03]`}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Static gradient text (no shimmer animation) */}
                    <p className="relative z-10 bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-clip-text font-serif text-4xl font-semibold text-transparent">
                      {stat.value}
                    </p>

                    <div className="relative z-10 mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-transparent" />

                    <p className="relative z-10 mt-4 text-sm text-[#f7f2e9]/50 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </SectionShell>
          </Deferred>

          {/* FAQ */}
          <Deferred>
            <SectionShell
              eyebrow="Frequently asked questions"
              title="Helpful guidance before you book"
              description="Everything you need to know about appointments, care and treatment planning."
            >
              <FaqAccordion items={faqs} />
            </SectionShell>
          </Deferred>

          {/* OUR PROMISE */}
          <Deferred>
            <SectionShell
              eyebrow="Our promise"
              title="Certified care, elevated experience, lasting results"
              description="We combine wellness, hospitality and clinical expertise under one premium roof."
            >
              <div className="group relative grid gap-6 overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#0f0f0f] p-6 transition-colors duration-500 hover:border-[#c9ac6a]/60 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* LEFT COLUMN */}
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-2xl text-[#c9ac6a]">✦</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/30 to-transparent" />
                  </div>

                  <h3 className="bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-clip-text font-[Patrick] text-2xl font-semibold text-transparent">
                    Advanced treatments, honest consultations and full aftercare
                  </h3>

                  <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#c9ac6a]/40 to-transparent" />

                  <p className="mt-6 text-base leading-8 text-[#f7f2e9]/60 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
                    {clinicInfo.contactvision}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {certifications.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#c9ac6a]/20 bg-[#121212] px-5 py-2.5 text-sm text-[#c9ac6a] transition-colors duration-300 hover:border-[#c9ac6a]/40 hover:bg-[#181818]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN - ADDRESS CARD */}
                <div className="relative z-10 rounded-[1.75rem] border border-[#c9ac6a]/20 bg-[#141414] p-6 transition-colors duration-500 hover:border-[#c9ac6a]/40 sm:p-8">
                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/5">
                      <svg
                        className="h-4 w-4 text-[#c9ac6a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>

                    <p className="font-[Patrick] text-sm font-medium tracking-[0.35em] text-[#c9ac6a] uppercase">
                      Clinic Address
                    </p>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/20 to-transparent" />
                  </div>

                  {/* Branch */}
                  <div className="relative mt-6">
                    <div className="mt-7 min-w-0">
                      <h4 className="text-center font-serif text-3xl leading-9 font-semibold text-[#f7f2e9]">
                        Khayaban-e-Badar Branch
                      </h4>

                      <div className="mt-10 flex items-center gap-4 rounded-2xl border border-[#c9ac6a]/30 bg-[#c9ac6a]/5 px-5 py-4 transition-colors duration-300 group-hover:border-[#c9ac6a]/60">
                        <FaMapMarkerAlt className="shrink-0 text-2xl text-[#c9ac6a]" />
                        <p className="text-sm leading-6 text-[#f7f2e9]/80 sm:text-base">
                          {clinicInfo.address2}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 h-px w-full bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent" />

                  {/* Contact info */}
                  <div className="relative z-10 mt-6 flex items-center justify-center gap-4 sm:gap-8">
                    <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
                      <FaPhoneAlt className="shrink-0 text-2xl text-[#c9ac6a]" />
                      <div className="min-w-0">
                        <p className="text-xs text-[#f7f2e9]/60 sm:text-sm">
                          Tel:
                        </p>
                        <a
                          href={landlineHref}
                          className="block text-sm font-medium text-[#f7f2e9] underline-offset-4 transition-colors duration-300 hover:text-[#f4d98a] hover:underline sm:text-lg"
                          aria-label={`Call ${clinicInfo.landline}`}
                        >
                          {clinicInfo.landline}
                        </a>
                      </div>
                    </div>

                    <div className="h-12 w-px shrink-0 bg-[#c9ac6a]/40" />

                    <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
                      <FaWhatsapp className="shrink-0 text-3xl text-[#c9ac6a]" />
                      <div className="min-w-0">
                        <p className="text-xs text-[#f7f2e9]/60 sm:text-sm">
                          WhatsApp:
                        </p>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm font-medium text-[#f7f2e9] underline-offset-4 transition-colors duration-300 hover:text-[#f4d98a] hover:underline sm:text-lg"
                          aria-label={`Message ${clinicInfo.whatsapp} on WhatsApp`}
                        >
                          {clinicInfo.whatsapp}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent" />

                  <div className="relative z-10 mt-10 flex justify-center">
                    <Button href="/contact">Visit Contact Page</Button>
                  </div>
                </div>
              </div>
            </SectionShell>
          </Deferred>
        </div>
      </div>
    </div>
  );
}
