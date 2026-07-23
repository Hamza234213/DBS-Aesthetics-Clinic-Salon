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

export default function Home() {
  return (
    <div className="overflow-hidden">
     <section className="relative isolate overflow-hidden pt-[110px] md:pt-[120px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />
        <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
          <AnimatedHero>
            <div>
              <p className="mb-5 text-sm uppercase tracking-[0.4em] font-semibold font-serif text-[#c9ac6a]">Luxury aesthetics • salon • skincare</p>
              <h1 className="max-w-2xl text-4xl font-semibold font-serif leading-tight text-[#f7f2e9] sm:text-5xl lg:text-7xl">
                Confidence begins with expert care.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#f7f2e9]/75">
                {clinicInfo.about}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-appointment">Book Your Consultation</Button>
                <Button href={clinicInfo.socials.whatsapp} variant="secondary">WhatsApp Us</Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#f7f2e9]/70">
                <span>UAN {clinicInfo.phone}</span>
                <span>Tel {clinicInfo.landline}</span>
                <span>{clinicInfo.hours}</span>
              </div>
            </div>
          </AnimatedHero>

          <AnimatedCard>
            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] border border-[#c9ac6a]/25" />
              <div className="rounded-[2.5rem] border  border-white/10 bg-[#1a1a1a]/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-2">
                  {featuredTreatments.map((treatment, index) => (
                    <div key={treatment.title} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#232323] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.25em] font-semibold text-[#c9ac6a]">{treatment.title}</p>
                        <span className="text-sm text-[#f7f2e9]/60">{treatment.duration}</span>
                      </div>
                     
                      <p className="mt-3 text-sm leading-7 text-[#f7f2e9]/70">{treatment.description}</p>
                      {index === 0 ? <div className="mt-6 h-2 rounded-full bg-linear-to-r from-[#c9ac6a] via-[#e2c07d] to-transparent" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <SectionShell eyebrow="Why DBS" title="Luxury care with medical precision and a private-client experience." description="Every appointment is shaped around trust, safety and visible results.">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Consultation-led treatment planning", "Every service begins with an honest assessment and tailored recommendation."],
            ["Certified experts and modern protocol", "Our team pairs advanced aesthetics with strict hygiene and care standards."],
            ["Comfort-first salon & skincare services", "Expect discreet, polished and highly personalized attention from start to finish."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.75rem] border border-[#c9ac6a]/20 bg-[#202020]/80 p-8">
              <h3 className="text-xl font-semibold text-[#D4A85F]   ">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#f7f2e9]/70">{text}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Featured treatments" title="Signature services designed to reveal, restore and refine." description="From radiant facials to advanced laser care, each treatment is curated for a premium outcome.">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredTreatments.map((treatment) => (
            <TreatmentCard key={treatment.title} title={treatment.title} description={treatment.description} duration={treatment.duration} href="/book-appointment" image={treatment.image} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Treatment categories" title="Explore a full spectrum of aesthetic and salon care" description="Every category is available under one luxury roof in Karachi.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {treatmentCategories.map((category) => (
            <Link key={category.slug} href={`/services/${category.slug}`} className="group overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020]">
              <div className="relative h-44 overflow-hidden">
                <Image src={category.image} alt={category.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#f7f2e9]">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#f7f2e9]/70">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Our specialists" title="Meet the team behind the experience" description="A refined team of clinicians and beauty specialists focused on safety, artistry and trust.">
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <DoctorCard key={member.name} name={member.name} role={member.role} bio={member.bio} image={member.image} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Results" title="What clients say about their experience" description="Real feedback from clients who value expertise, comfort and lasting results.">
        <div className="grid 
           gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <ReviewCard key={testimonial.name} name={testimonial.name} title={testimonial.title} quote={testimonial.quote} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Clinic highlights" title="Trusted by clients who value premium care and clear communication" description="Our approach is designed to make every appointment feel calm, luxurious and fully informed.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#202020] p-8 font-serif
          text-[#D4A85F] text-center">
              <p className="text-4xl font-semibold text-[#c9ac6a]">{stat.value}</p>
              <p className="mt-3 text-sm text-[#f7f2e9]/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Frequently asked questions" title="Helpful guidance before you book" description="Everything you need to know about appointments, care and treatment planning.">
        <FaqAccordion items={faqs} />
      </SectionShell>

      <SectionShell eyebrow="Our promise" title="Certified care, elevated experience, lasting results" description="We combine wellness, hospitality and clinical expertise under one premium roof.">
        <div className="grid gap-6 rounded-4xl border  border-[#c9ac6a]/20 bg-[#1e1e1e] p-8 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <h3 className="text-2xl font-semibold text-[#c9ac6a]">Advanced treatments, honest consultations and full aftercare</h3>
            <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">{clinicInfo.vision}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {certifications.map((item) => (
                <span key={item} className="rounded-full border border-[#c9ac6a]/30 px-4 py-2 text-sm text-[#c9ac6a]">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border  border-[#c9ac6a]/20 bg-[#232323] p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">Clinic address</p>
            <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/80">{clinicInfo.address}</p>
            <p className="mt-6 text-sm text-[#f7f2e9]/70">Tel {clinicInfo.landline} • WhatsApp {clinicInfo.whatsapp}</p>
            <div className="mt-8 ">
              <Button href="/contact">Visit Contact Page</Button>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}