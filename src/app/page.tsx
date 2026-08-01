import Link from "next/link";
import Image from "next/image";
import { clinicInfo, featuredTreatments, treatmentCategories, testimonials, stats, teamMembers, faqs, certifications } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";
import { TreatmentCard } from "@/components/TreatmentCard";
import { DoctorCard } from "@/components/DoctorCard";
import { ReviewCard } from "@/components/ReviewCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AnimatedHero, AnimatedCard } from "@/components/AnimatedHero";
import { DealsSlider } from "@/components/DealsSlider";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative isolate overflow-hidden pt-[60px] md:pt-[80px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt="Luxury aesthetics background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/88" />
        </div>

        {/* Metallic Gold Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#c9ac6a]/20 via-[#c9ac6a]/5 to-transparent" />
        
        {/* Metallic Gold Radial Glow */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,#c9ac6a/15,transparent_50%)]" />

        {/* Decorative metallic gold elements */}
        <div className="absolute top-20 right-10 z-10 h-64 w-64 rounded-full bg-[#c9ac6a]/15 blur-3xl" />
        <div className="absolute bottom-10 left-10 z-10 h-48 w-48 rounded-full bg-[#c9ac6a]/15 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-96 w-96 rounded-full bg-[#c9ac6a]/8 blur-3xl" />

        {/* Decorative DBS logo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-[15%] z-[15] hidden
                     h-52 w-52 items-center justify-center lg:flex xl:h-64 xl:w-64"
        >
          <div className="absolute inset-[12%] rounded-full bg-[#d9b65f]/20 blur-3xl" />
          <Image
            src="/dbslogo.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 256px, 208px"
            className="object-contain opacity-80"
          />
        </div>

        <div className="relative z-20 mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
          <AnimatedHero>
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.4em] text-[#c9ac6a] font-serif">
                Luxury aesthetics • salon • skincare
              </p>

              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#f7f2e9] font-serif sm:text-5xl lg:text-7xl">
                Confidence begins with expert care.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#f7f2e9]/80">
                {clinicInfo.homepageAbout}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-appointment">
                  Book Your Consultation
                </Button>

                <Button
                  href={clinicInfo.socials.whatsapp}
                  variant="secondary"
                >
                  WhatsApp Us
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#f7f2e9]/70">
                <span>UAN {clinicInfo.phone}</span>
                <span>Tel {clinicInfo.landline}</span>
                <span>{clinicInfo.hours}</span>
              </div>
            </div>
          </AnimatedHero>

          <AnimatedCard>
            <div className="relative hidden sm:block">
              <div className="absolute inset-0 rounded-[2.5rem] border border-[#c9ac6a]/30" />
              <div className="rounded-[2.5rem] border border-[#c9ac6a]/50 bg-[#0a0a0a]/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-300 hover:shadow-[0_40px_120px_rgba(201,172,106,0.15)] hover:scale-[1.02]">
                {/* Main Image with overlay */}
                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/homapage.png"
                    alt="DBS Aesthetics Clinic & Salon - Luxury Treatment Room"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t  from-[#0a0a0a]/80 to-transparent" />
                  
                  {/* Premium Care Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#c9ac6a] font-semibold">Premium Care</p>
                    <p className="text-sm text-[#f7f2e9]/80">Advanced aesthetics • Expert salon services</p>
                  </div>
                </div>
                
          <div className="grid gap-3 sm:grid-cols-2">
  {featuredTreatments.map((treatment, index) => (
    <div 
      key={treatment.title} 
      className="group relative rounded-2xl border border-[#c9ac6a]/15 bg-[#0a0a0a]/90 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#c9ac6a]/40 hover:bg-[#0a0a0a] hover:shadow-[0_10px_40px_rgba(201,172,106,0.06)]"
    >
      {/* Premium gold gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#c9ac6a]/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Gold accent line - top */}
      <div className="absolute top-0 left-4 right-4 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Gold number badge */}
            <span className="flex items-center justify-center w-5 h-5 text-[8px] font-medium text-[#c9ac6a]/40 border border-[#c9ac6a]/20 rounded-full transition-all duration-300 group-hover:border-[#c9ac6a]/40 group-hover:text-[#c9ac6a]/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c9ac6a] font-[Oswald] transition-colors duration-300 group-hover:text-[#c9ac6a]/80">
              {treatment.title}
            </p>
          </div>
          <span className="text-[10px] text-[#f7f2e9]/30 font-light tracking-wider transition-colors duration-300 group-hover:text-[#f7f2e9]/50">
            {treatment.duration}
          </span>
        </div>
        
        <p className="mt-2.5 text-xs leading-6 text-[#f7f2e9]/50 pl-8 transition-colors duration-300 group-hover:text-[#f7f2e9]/60">
          {treatment.description}
        </p>
        
        
      
      </div>
    </div>
  ))}
</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Deals Slider Section */}
      <DealsSlider />

      {/* Rest of the sections with Metallic Gold & Jet Black Gradient */}
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
          <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-[#c9ac6a]/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-[#c9ac6a]/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#c9ac6a]/8 blur-3xl" />
          
          {/* Additional metallic gold accents */}
          <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-[#c9ac6a]/8 blur-2xl" />
          <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-[#c9ac6a]/8 blur-2xl" />
          
          {/* Subtle metallic sheen lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/20 to-transparent" />
        </div>

        {/* Content with relative positioning */}
        <div className="relative z-10">
         <SectionShell eyebrow="Why DBS" title="Luxury care with medical precision and a private-client experience." description="Every appointment is shaped around trust, safety and visible results.">
  <div className="grid gap-6 lg:grid-cols-3">
    {[
      ["Consultation-led treatment planning", "Every service begins with an honest assessment and tailored recommendation."],
      ["Certified experts and modern protocol", "Our team pairs advanced aesthetics with strict hygiene and care standards."],
      ["Comfort-first salon & skincare services", "Expect discreet, polished and highly personalized attention from start to finish."],
    ].map(([title, text], index) => (
      <div 
        key={title} 
        className="group relative rounded-[1.75rem] border border-[#c9ac6a]/20 bg-[#0a0a0a]/60 p-8 transition-all duration-300 hover:scale-[1.03] hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a] hover:shadow-[0_20px_60px_rgba(201,172,106,0.12)] active:scale-95"
      >
        {/* Gold accent glow */}
        <div className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent" />
        
      
        
        {/* Number badge with metallic gold */}
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 text-xs font-medium text-[#c9ac6a] border border-[#c9ac6a]/30 rounded-full transition-all duration-300 group-hover:border-[#c9ac6a]/60 group-hover:bg-[#c9ac6a]/10">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/20 to-transparent" />
        </div>
        
        <h3 className="text-xl font-semibold font-[Patrick] text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] to-[#d4a85f]">
          {title}
        </h3>
        
        <p className="relative z-10 mt-4 text-sm leading-7 text-[#f7f2e9]/60 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
          {text}
        </p>
        
        {/* Gold divider at bottom */}
        <div className="relative z-10 mt-6 h-px bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/40 to-[#c9ac6a]/20" />
      </div>
    ))}
  </div>
</SectionShell>

        

          <SectionShell eyebrow="Treatment categories" title="Explore a full spectrum of aesthetic and salon care" description="Every category is available under one luxury roof in Karachi.">
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {treatmentCategories.map((category) => (
      <Link 
        key={category.slug} 
        href={`/services/${category.slug}`} 
        className="group overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/60 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_60px_rgba(201,172,106,0.15)] active:scale-95"
      >
        <div className="relative h-44 overflow-hidden">
          <Image 
            src={category.image} 
            alt={category.title} 
            fill 
            className="object-cover transition duration-500 group-hover:scale-105" 
          />
        </div>
        <div className="relative p-6 overflow-hidden">
          {/* Gold gradient that appears on hover in the text area only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9ac6a]/5 via-[#c9ac6a]/10 to-transparent" />
          
          <h3 className="relative z-10 text-xl font-semibold font-[Patrick] text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] to-[#d4a85f]">
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

          <SectionShell eyebrow="Our specialists" title="Meet the team behind the experience" description="A refined team of clinicians and beauty specialists focused on safety, artistry and trust.">
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="transition-all duration-300 hover:scale-[1.03] hover:z-10 active:scale-95">
                  <DoctorCard name={member.name} role={member.role} bio={member.bio} image={member.image} />
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell eyebrow="Results" title="What clients say about their experience" description="Real feedback from clients who value expertise, comfort and lasting results.">
            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <ReviewCard key={testimonial.name} name={testimonial.name} title={testimonial.title} quote={testimonial.quote} />
              ))}
            </div>
          </SectionShell>

         <SectionShell eyebrow="Clinic highlights" title="Trusted by clients who value premium care and clear communication" description="Our approach is designed to make every appointment feel calm, luxurious and fully informed.">
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat, index) => (
      <div 
        key={stat.label} 
       className="page-card page-card-soft rounded-[1.75rem] p-8 text-center transition-all duration-300 hover:scale-[1.05] active:scale-95">
        {/* Gold glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent" />
        
        
      
        
        {/* Stat Value with metallic gold gradient */}
        <p className="relative z-10 text-4xl font-semibold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] animate-shimmer">
          {stat.value}
        </p>
        
        {/* Gold divider */}
        <div className="relative z-10 mt-3 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-transparent" />
        
        {/* Stat Label */}
        <p className="relative z-10 mt-4 text-sm text-[#f7f2e9]/50 transition-colors duration-300 group-hover:text-[#f7f2e9]/80">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</SectionShell>

          <SectionShell eyebrow="Frequently asked questions" title="Helpful guidance before you book" description="Everything you need to know about appointments, care and treatment planning.">
            <FaqAccordion items={faqs} />
          </SectionShell>
<SectionShell
  eyebrow="Our promise"
  title="Certified care, elevated experience, lasting results"
  description="We combine wellness, hospitality and clinical expertise under one premium roof."
>
  <div className="group relative grid gap-8 rounded-4xl border border-[#c9ac6a]/20 bg-[#0f0f0f] p-8 lg:grid-cols-[1fr_0.7fr] transition-all duration-500 hover:border-[#c9ac6a]/60 hover:shadow-[0_30px_80px_rgba(201,172,106,0.08)] overflow-hidden">

    {/* Metallic Gold Gradient Background - More Subtle */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* Gold Glow Effect - More Subtle */}
    <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#c9ac6a]/3 via-[#c9ac6a]/5 to-[#c9ac6a]/3 blur-2xl" />

    {/* Top Gold Divider Line */}
    <div className="pointer-events-none absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* =========================
        LEFT COLUMN
    ========================== */}
    <div className="relative z-10">

      {/* Gold Accent Icon */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl text-[#c9ac6a]">
          ✦
        </span>

        <span className="h-px flex-1 bg-gradient-to-r from-[#c9ac6a]/30 to-transparent" />
      </div>

      {/* Main Heading */}
      <h3 className="text-2xl font-semibold font-[Patrick] text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] animate-shimmer">
        Advanced treatments, honest consultations and full aftercare
      </h3>

      {/* Small Divider */}
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
            className="group/badge relative rounded-full border border-[#c9ac6a]/20 px-5 py-2.5 text-sm text-[#c9ac6a] bg-[#121212]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#c9ac6a]/40 hover:bg-[#181818] hover:shadow-[0_0_20px_rgba(201,172,106,0.05)] hover:scale-105"
          >
            {/* Gold glow on badge hover */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover/badge:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-[#c9ac6a]/5 via-transparent to-[#c9ac6a]/5" />

            <span className="relative z-10">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>

    {/* =========================
        RIGHT COLUMN - ADDRESS CARD
    ========================== */}
    <div className="relative z-10 rounded-[1.75rem] border border-[#c9ac6a]/20 bg-[#181818]/10 backdrop-blur-sm p-8 transition-all duration-500 hover:border-[#c9ac6a]/40 hover:shadow-[0_20px_40px_rgba(201,172,106,0.04)] hover:scale-[1.02]">

      {/* Inner Gold Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9ac6a]/3 via-transparent to-transparent" />

      {/* Location Icon with Gold */}
      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/5">
          <svg
            className="w-4 h-4 text-[#c9ac6a]"
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
        Clinic Address
      </p>

      <div className="relative z-10 mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/40 to-transparent" />

      {/* Address */}
      <p className="relative z-10 mt-5 text-lg leading-8 text-[#f7f2e9]/70 transition-colors duration-300 group-hover:text-[#f7f2e9]/90">
        {clinicInfo.address}
      </p>

      {/* =========================
          CONTACT INFO
      ========================== */}
      <div className="relative z-10 mt-6 space-y-3">

        {/* Telephone */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#c9ac6a]/40">
            ✦
          </span>

          <p className="text-sm text-[#f7f2e9]/50">
            Tel:{" "}
            <a
              href={`tel:${String(clinicInfo.landline).replace(/\D/g, "")}`}
              className="text-[#c9ac6a]/70 transition-all duration-300 hover:text-[#f4d98a] hover:underline underline-offset-4"
              aria-label={`Call ${clinicInfo.landline}`}
            >
              {clinicInfo.landline}
            </a>
          </p>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#c9ac6a]/40">
            ✦
          </span>

          <p className="text-sm text-[#f7f2e9]/50">
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${(() => {
                const number = String(clinicInfo.whatsapp).replace(/\D/g, "");

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
              className="text-[#c9ac6a]/70 transition-all duration-300 hover:text-[#f4d98a] hover:underline underline-offset-4"
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
      <div className="relative z-10 mt-8">
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