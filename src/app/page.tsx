import Link from "next/link";
import Image from "next/image";
import {
  clinicInfo,
  featuredTreatments,
  treatmentCategories,
  testimonials,
  stats,
  teamMembers,
  faqs,
  certifications,
} from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";
import { DoctorCard } from "@/components/DoctorCard";
import { ReviewCard } from "@/components/ReviewCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AnimatedHero, AnimatedCard } from "@/components/AnimatedHero";
import { DealsSlider } from "@/components/DealsSlider";


export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* =========================================================
          HERO SECTION
          At least one full viewport tall on every device (min-height,
          not a fixed height), content vertically centered inside it.
          This keeps the hero from ever clipping content on short
          screens, or under-filling the screen (letting the next
          section peek through) on tall ones.
      ========================================================== */}
      <section className="relative isolate flex flex-col justify-center overflow-hidden min-h-[max(680px,100svh)]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt="Luxury aesthetics background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0a0a0a]/88" />
        </div>

        {/* Metallic Gold Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#c9ac6a]/20 via-[#c9ac6a]/5 to-transparent" />

        {/* Metallic Gold Radial Glow */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,#c9ac6a/15,transparent_50%)]" />

        {/* Decorative metallic gold elements */}
        <div className="pointer-events-none absolute top-20 right-10 z-10 h-64 w-64 rounded-full bg-[#c9ac6a]/15 blur-3xl" />

        <div className="pointer-events-none absolute bottom-10 left-10 z-10 h-48 w-48 rounded-full bg-[#c9ac6a]/15 blur-2xl" />

        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />

{/* =========================================================
    HERO CONTENT AREA
========================================================= */}
<div
  className="
    relative
    z-20
    mx-auto
    grid
    w-full
    max-w-7xl
    grid-cols-1
    items-center
    gap-10
    px-4
    pt-32
    pb-10
    sm:px-6
    sm:pt-36
    sm:pb-10
    lg:grid-cols-[1.05fr_0.95fr]
    lg:gap-10
    lg:px-8
    lg:pt-[90px]
    lg:pb-8
  "
>

  {/* =========================================================
      DECORATIVE DBS LOGO
  ========================================================= */}
  


          {/* =====================================================
    LEFT SIDE
====================================================== */}
          <AnimatedHero>
            <div className="w-full mb-6 sm:mb-8 lg:mb-10">
              <p
                className="
        mb-4
        text-xs
        font-semibold
        uppercase
        tracking-[0.35em]
        text-[#c9ac6a]
        font-serif
        sm:mb-5
        sm:text-sm
        lg:mb-5
      "
              >
                Luxury aesthetics • salon • skincare
              </p>

              <h1
                className="
        max-w-2xl
        text-3xl
        leading-[1.1]
        font-semibold
        text-[#f7f2e9]
        font-serif
        sm:text-5xl
        sm:leading-[1]
        lg:text-6xl
        lg:leading-[0.95]
        xl:text-7xl
      "
              >
                Confidence begins with expert care.
              </h1>

              <p
                className="
        mt-5
        max-w-xl
        text-sm
        leading-6
        text-[#f7f2e9]/80
        sm:mt-7
        sm:text-base
        sm:leading-7
        lg:mt-6
        lg:text-lg
        lg:leading-8
      "
              >
                {clinicInfo.homepageAbout}
              </p>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 lg:mt-8 lg:gap-4">
                <Button href="/book-appointment">Book Your Consultation</Button>

                <Button href={clinicInfo.socials.whatsapp} variant="secondary">
                  WhatsApp Us
                </Button>
              </div>

              {/* Contact information */}
              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2
                  text-xs
                  text-[#f7f2e9]/70
                  sm:mt-6
                  sm:text-sm
                  lg:mt-7
                  lg:gap-6
                "
              >
                <span>UAN {clinicInfo.phone}</span>

                <span>Tel {clinicInfo.landline}</span>

                <span>{clinicInfo.hours}</span>
              </div>
            </div>
          </AnimatedHero>

          {/* =====================================================
              RIGHT SIDE: LUXURY FEATURED SHOWCASE
          ====================================================== */}
        <AnimatedHero>
  <div className="group relative mx-auto w-full max-w-md lg:max-w-[440px]">

    {/* Decorative Gold Glow Backdrop */}
    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#c9ac6a]/30 via-[#f4d98a]/15 to-[#c9ac6a]/30 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90" />

    {/* Main Luxury Glassmorphic Card */}
    <div
      className="
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-[#c9ac6a]/30
        bg-[#0a0a0a]/85
        p-4
        shadow-[0_20px_50px_rgba(0,0,0,0.75)]
        backdrop-blur-xl
        transition-all
        duration-500
        ease-out
        sm:p-6
        lg:p-5
        group-hover:-translate-y-1.5
        group-hover:scale-[1.015]
        group-hover:border-[#c9ac6a]/60
        group-hover:shadow-[0_28px_65px_rgba(0,0,0,0.85)]
      "
    >

      {/* Header Tag */}
      <div className="flex items-center justify-between border-b border-[#c9ac6a]/20 pb-3">

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c9ac6a] animate-ping" />

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif font-bold text-[#c9ac6a]">
            Featured Suite
          </span>
        </div>

        <span className="rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/10 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold text-[#f4d98a]">
          ★ 4.9 / 5
        </span>

      </div>

      {/* Main Visual Image */}
      <div className="relative mt-3 h-44 sm:h-52 lg:h-48 w-full overflow-hidden rounded-xl border border-[#c9ac6a]/20">

        <Image
          src="/hydra.png"
          alt="Vampire Hydra Facial Treatment Suite"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

        <div className="absolute bottom-3 left-3 right-3">

          <span className="inline-block rounded-md bg-[#c9ac6a] px-2 py-1 text-[9px] uppercase font-bold tracking-widest text-[#0a0a0a]">
            Top Requested
          </span>

          <h3 className="mt-1 text-lg sm:text-xl lg:text-lg font-serif font-semibold text-[#f7f2e9]">
            Vampire Hydra Facial
          </h3>

        </div>
      </div>

      {/* Card Details */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 text-xs">

        <div className="rounded-lg border border-[#c9ac6a]/15 bg-[#121212]/90 p-3">
          <p className="text-[10px] text-[#c9ac6a] font-medium">
            Session Duration
          </p>

          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#f7f2e9]">
            60 Minutes
          </p>
        </div>

        <div className="rounded-lg border border-[#c9ac6a]/15 bg-[#121212]/90 p-3">
          <p className="text-[10px] text-[#c9ac6a] font-medium">
            Expected Result
          </p>

          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-[#f7f2e9]">
            Instant Deep Glow
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="mt-3 pt-3 border-t border-[#c9ac6a]/15 flex items-center justify-between">

        <div>
          <span className="text-[10px] text-[#f7f2e9]/60">
            Starting from
          </span>

          <p className="text-base sm:text-lg font-bold font-serif text-[#c9ac6a]">
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
          DEALS SLIDER
          This now starts exactly after the viewport-sized hero.
      ========================================================== */}
      <DealsSlider />

      {/* =========================================================
          REST OF THE WEBSITE
      ========================================================== */}
      <div className="relative">
        {/* Premium Metallic Gold & Jet Black Background */}
        <div className="absolute inset-0 z-0">
          {/* Jet Black Base */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />

          {/* Metallic Gold Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/20 via-[#c9ac6a]/8 to-transparent" />

          {/* Radial Metallic Gold Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#c9ac6a/15,transparent_60%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#c9ac6a/10,transparent_50%)]" />

          {/* Diagonal Metallic Accent */}
          <div className="absolute inset-0 bg-gradient-to-tl from-[#c9ac6a]/15 via-[#0a0a0a]/40 to-[#0a0a0a]" />

          {/* Metallic Gold Glow Spots */}
          <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-[#c9ac6a]/10 blur-3xl" />

          <div className="absolute right-1/3 bottom-20 h-80 w-80 rounded-full bg-[#c9ac6a]/10 blur-3xl" />

          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />

          {/* Additional metallic gold accents */}
          <div className="absolute top-40 right-20 h-48 w-48 rounded-full bg-[#c9ac6a]/8 blur-2xl" />

          <div className="absolute bottom-40 left-20 h-48 w-48 rounded-full bg-[#c9ac6a]/8 blur-2xl" />

          {/* Subtle metallic sheen lines */}
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />

          <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* =====================================================
              WHY DBS
          ====================================================== */}
          <SectionShell
            eyebrow="Why DBS"
            title="Luxury care with medical precision and a private-client experience."
            description="Every appointment is shaped around trust, safety and visible results."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                [
                  "Consultation-led treatment planning",
                  "Every service begins with an honest assessment and tailored recommendation.",
                ],
                [
                  "Certified experts and modern protocol",
                  "Our team pairs advanced aesthetics with strict hygiene and care standards.",
                ],
                [
                  "Comfort-first salon & skincare services",
                  "Expect discreet, polished and highly personalized attention from start to finish.",
                ],
              ].map(([title, text], index) => (
                <div
                  key={title}
                  className="
                    group
                    relative
                    rounded-[1.75rem]
                    border
                    border-[#c9ac6a]/20
                    bg-[#0a0a0a]/60
                    p-6
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:border-[#c9ac6a]/60
                    hover:bg-[#0a0a0a]
                    hover:shadow-[0_20px_60px_rgba(201,172,106,0.12)]
                    active:scale-95
                    sm:p-8
                  "
                >
                  {/* Gold accent glow */}
                  <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number badge */}
                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9ac6a]/30 text-xs font-medium text-[#c9ac6a] transition-all duration-300 group-hover:border-[#c9ac6a]/60 group-hover:bg-[#c9ac6a]/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/20 to-transparent" />
                  </div>

                  <h3 className="bg-gradient-to-r from-[#c9ac6a] to-[#d4a85f] bg-clip-text text-xl font-semibold text-transparent font-[Patrick]">
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

          {/* =====================================================
              TREATMENT CATEGORIES
          ====================================================== */}
          <SectionShell
            eyebrow="Treatment categories"
            title="Explore a full spectrum of aesthetic and salon care"
            description="Every category is available under one luxury roof in Karachi."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {treatmentCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/services/${category.slug}`}
                  className="
                    group
                    overflow-hidden
                    rounded-4xl
                    border
                    border-[#c9ac6a]/20
                    bg-[#0a0a0a]/60
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:border-[#c9ac6a]/60
                    hover:bg-[#0a0a0a]/90
                    hover:shadow-[0_20px_60px_rgba(201,172,106,0.15)]
                    active:scale-95
                  "
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="relative overflow-hidden p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/5 via-[#c9ac6a]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <h3 className="relative z-10 bg-gradient-to-r from-[#c9ac6a] to-[#d4a85f] bg-clip-text text-xl font-semibold text-transparent font-[Patrick]">
                      {category.title}
                    </h3>

                    <p className="relative z-10 mt-3 text-sm leading-7 text-[#f7f2e9]/70 transition-colors duration-300 group-hover:text-[#f7f2e9]/90">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SectionShell>

          {/* =====================================================
              OUR SPECIALISTS
          ====================================================== */}
          <SectionShell
            eyebrow="Our specialists"
            title="Meet the team behind the experience"
            description="A refined team of clinicians and beauty specialists focused on safety, artistry and trust."
          >
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="transition-all duration-300 hover:z-10 hover:scale-[1.03] active:scale-95"
                >
                  <DoctorCard
                    name={member.name}
                    role={member.role}
                    bio={member.bio}
                    image={member.image}
                  />
                </div>
              ))}
            </div>
          </SectionShell>

          {/* =====================================================
              RESULTS
          ====================================================== */}
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

          {/* =====================================================
              CLINIC HIGHLIGHTS
          ====================================================== */}
          <SectionShell
            eyebrow="Clinic highlights"
            title="Trusted by clients who value premium care and clear communication"
            description="Our approach is designed to make every appointment feel calm, luxurious and fully informed."
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="
                    page-card
                    page-card-soft
                    group
                    relative
                    rounded-[1.75rem]
                    p-6
                    text-center
                    transition-all
                    duration-300
                    hover:scale-[1.05]
                    active:scale-95
                    sm:p-8
                  "
                >
                  {/* Gold glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Stat value */}
                  <p className="relative z-10 bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] bg-clip-text text-4xl font-semibold text-transparent font-serif animate-shimmer">
                    {stat.value}
                  </p>

                  {/* Divider */}
                  <div className="relative z-10 mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-transparent" />

                  {/* Label */}
                  <p className="relative z-10 mt-4 text-sm text-[#f7f2e9]/50 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* =====================================================
              FAQ
          ====================================================== */}
          <SectionShell
            eyebrow="Frequently asked questions"
            title="Helpful guidance before you book"
            description="Everything you need to know about appointments, care and treatment planning."
          >
            <FaqAccordion items={faqs} />
          </SectionShell>

          {/* =====================================================
              OUR PROMISE
          ====================================================== */}
          <SectionShell
            eyebrow="Our promise"
            title="Certified care, elevated experience, lasting results"
            description="We combine wellness, hospitality and clinical expertise under one premium roof."
          >
            <div
              className="
                group
                relative
                grid
                gap-6
                overflow-hidden
                rounded-4xl
                border
                border-[#c9ac6a]/20
                bg-[#0f0f0f]
                p-6
                transition-all
                duration-500
                hover:border-[#c9ac6a]/60
                hover:shadow-[0_30px_80px_rgba(201,172,106,0.08)]
                sm:p-8
                lg:grid-cols-[1fr_0.95fr]
                lg:gap-8
              "
            >
              {/* Metallic Gold Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/3 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Gold Glow */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-[#c9ac6a]/3 via-[#c9ac6a]/5 to-[#c9ac6a]/3 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

              {/* Top Gold Divider */}
              <div className="pointer-events-none absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* LEFT COLUMN */}
              <div className="relative z-10">
                {/* Gold Accent */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl text-[#c9ac6a]">✦</span>

                  <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/30 to-transparent" />
                </div>

                {/* Heading */}
                <h3 className="bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] bg-clip-text text-2xl font-semibold text-transparent font-[Patrick] animate-shimmer">
                  Advanced treatments, honest consultations and full aftercare
                </h3>

                {/* Divider */}
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#c9ac6a]/40 to-transparent" />

                {/* Description */}
                <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/60 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
                  {clinicInfo.contactvision}
                </p>

                {/* Certification Badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {certifications.map((item) => (
                    <span
                      key={item}
                      className="
                        group/badge
                        relative
                        rounded-full
                        border
                        border-[#c9ac6a]/20
                        bg-[#121212]/60
                        px-5
                        py-2.5
                        text-sm
                        text-[#c9ac6a]
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:border-[#c9ac6a]/40
                        hover:bg-[#181818]
                        hover:shadow-[0_0_20px_rgba(201,172,106,0.05)]
                      "
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#c9ac6a]/5 via-transparent to-[#c9ac6a]/5 opacity-0 transition-opacity duration-300 group-hover/badge:opacity-30" />

                      <span className="relative z-10">{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN - ADDRESS CARD */}
<div
  className="
    relative
    z-10
    rounded-[1.75rem]
    border
    border-[#c9ac6a]/20
    bg-[#181818]/10
    p-6
    backdrop-blur-sm
    transition-all
    duration-500
    hover:scale-[1.02]
    hover:border-[#c9ac6a]/40
    hover:shadow-[0_20px_40px_rgba(201,172,106,0.04)]
    sm:p-8
  "
>
  {/* Inner Gold Glow */}
  <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#c9ac6a]/3 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

  {/* Location Icon + Heading Line */}
  <div className="relative z-10 mb-4 flex items-center gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/5">
      <svg
        className="h-4 w-4 text-[#c9ac6a]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
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

    <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/20 to-transparent" />
  </div>

  {/* Address Heading */}
  <p className="relative z-10 text-sm uppercase tracking-[0.35em] text-[#c9ac6a] font-[Oswald]">
    Clinic Addresses
  </p>

  <div className="relative z-10 mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/40 to-transparent" />

  {/* ================= BRANCH 1 ================= */}
  <div className="relative z-10 mt-6">
    <div className="flex items-start gap-4">
      
      {/* Branch Badge */}
      <span
        className="
          mt-0.5
          shrink-0
          rounded-full
          border
          border-[#c9ac6a]/50
          bg-gradient-to-r
          from-[#c9ac6a]
          via-[#f4d98a]
          to-[#c9ac6a]
          px-4
          py-1.5
          text-[11px]
          font-semibold
          tracking-[0.08em]
          text-[#151515]
          shadow-[0_4px_15px_rgba(201,172,106,0.12)]
        "
      >
        BRANCH 1
      </span>

      {/* Branch Information */}
      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold leading-6 text-[#f7f2e9]">
          Khayaban-e-Saadi Branch
        </h4>

        <p className="mt-1 text-sm leading-6 text-[#f7f2e9]/65 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
          {clinicInfo.address1}
        </p>
      </div>
    </div>
  </div>

  {/* Branch Divider */}
  <div className="relative z-10 my-5 h-px w-full bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent" />

  {/* ================= BRANCH 2 ================= */}
  <div className="relative z-10">
    <div className="flex items-start gap-4">
      
      {/* Branch Badge */}
      <span
        className="
          mt-0.5
          shrink-0
          rounded-full
          border
          border-[#c9ac6a]/50
          bg-gradient-to-r
          from-[#c9ac6a]
          via-[#f4d98a]
          to-[#c9ac6a]
          px-4
          py-1.5
          text-[11px]
          font-semibold
          tracking-[0.08em]
          text-[#151515]
          shadow-[0_4px_15px_rgba(201,172,106,0.12)]
        "
      >
        BRANCH 2
      </span>

      {/* Branch Information */}
      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold leading-6 text-[#f7f2e9]">
          Khayaban-e-Badar Branch
        </h4>

        <p className="mt-1 text-sm leading-6 text-[#f7f2e9]/65 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
          {clinicInfo.address2}
        </p>
      </div>
    </div>
  </div>

  {/* Contact Divider */}
  <div className="relative z-10 mt-5 h-px w-full bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent" />

  {/* Contact Info */}
  <div className="relative z-10 mt-5 space-y-3">
    
    {/* Telephone */}
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#c9ac6a]/50">
        ✦
      </span>

      <p className="text-sm text-[#f7f2e9]/50">
        Tel:{" "}
        <a
          href={`tel:${String(clinicInfo.landline).replace(/\D/g, "")}`}
          className="
            text-[#c9ac6a]/70
            transition-all
            duration-300
            hover:text-[#f4d98a]
            hover:underline
            underline-offset-4
          "
          aria-label={`Call ${clinicInfo.landline}`}
        >
          {clinicInfo.landline}
        </a>
      </p>
    </div>

    {/* WhatsApp */}
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#c9ac6a]/50">
        ✦
      </span>

      <p className="text-sm text-[#f7f2e9]/50">
        WhatsApp:{" "}
        <a
          href={`https://wa.me/${(() => {
            const number = String(clinicInfo.whatsapp).replace(
              /\D/g,
              "",
            );

            if (number.startsWith("0")) {
              return `92${number.slice(1)}`;
            }

            if (number.startsWith("92")) {
              return number;
            }

            return `92${number}`;
          })()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-[#c9ac6a]/70
            transition-all
            duration-300
            hover:text-[#f4d98a]
            hover:underline
            underline-offset-4
          "
          aria-label={`Message ${clinicInfo.whatsapp} on WhatsApp`}
        >
          {clinicInfo.whatsapp}
        </a>
      </p>
    </div>
  </div>

  {/* Bottom Gold Divider */}
  <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent" />

  {/* Contact Button */}
  <div className="relative z-10 mt-7">
    <Button href="/contact">
      Visit Contact Page
    </Button>
  </div>
</div>
            </div>
          </SectionShell>
        </div>
      </div>
    </div>
  );
}
 




 




