import { Metadata } from "next";
import Image from "next/image";
import { clinicInfo, teamMembers, certifications, stats } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";
import { DoctorCard } from "@/components/DoctorCard";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about DBS Aesthetics Clinic & Salon, its philosophy, team and commitment to premium care.",
};

export default function AboutPage() {
  return (
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-16 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">About DBS</p>
            <h1 className="mt-4 text-4xl font-semibold font-serif leading-tight text-[#f7f2e9] sm:text-5xl">
              A luxury clinic where medical expertise meets elevated beauty care.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">{clinicInfo.about}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-appointment">Book Consultation</Button>
              <Button href="/contact" variant="secondary">Visit Clinic</Button>
            </div>
          </div>
          
          {/* Visual Our Philosophy Card */}
          <div className="page-card relative overflow-hidden rounded-[2.25rem] border border-[#c9ac6a]/20 p-8 transition-all duration-500 hover:border-[#c9ac6a]/40 hover:shadow-[0_20px_50px_rgba(201,172,106,0.1)]">
            {/* Background luxury image backdrop with overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
              <Image
                src="/skincare.png"
                alt="DBS Clinic Aesthetics Philosophy"
                fill
                className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c9ac6a]" />
                <h2 className="text-xs uppercase tracking-[0.35em] font-serif font-bold text-[#c9ac6a]">Our Philosophy</h2>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-[#f7f2e9]">
                Pioneering excellence in aesthetic medicine and luxury self-care.
              </h3>

              <div className="grid gap-6 sm:grid-cols-1 pt-2">
                <div className="rounded-xl border border-[#c9ac6a]/15 bg-[#0a0a0a]/60 p-5 backdrop-blur-md">
                  <p className="text-xs font-serif font-bold uppercase tracking-wider text-[#c9ac6a] mb-2">Our Vision</p>
                  <p className="text-base leading-7 text-[#f7f2e9]/80">{clinicInfo.vision}</p>
                </div>

                <div className="rounded-xl border border-[#c9ac6a]/15 bg-[#0a0a0a]/60 p-5 backdrop-blur-md">
                  <p className="text-xs font-serif font-bold uppercase tracking-wider text-[#c9ac6a] mb-2">Our Mission</p>
                  <p className="text-base leading-7 text-[#f7f2e9]/80">{clinicInfo.mission}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#c9ac6a]/15 text-xs text-[#c9ac6a]/80 font-medium">
                <span>✦ Medical Safety</span>
                <span>✦ Natural Results</span>
                <span>✦ Certified Doctors</span>
              </div>
            </div>
          </div>
        </div></AnimatedHero>
      </section>

      <SectionShell eyebrow="Our values" title="Trusted, transparent and deeply personal care" description="We are committed to a calm and refined experience at every step.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="page-card page-card-soft rounded-[1.75rem] p-8 text-center transition-all duration-300 hover:scale-[1.05] active:scale-95">
              <p className="text-4xl font-semibold font-serif text-[#c9ac6a]">{stat.value}</p>
              <p className="mt-3 text-sm text-[#f7f2e9]/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Meet the team" title="The specialists shaping your experience" description="A blend of medical expertise, artistry and hospitality defines our team.">
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="transition-all duration-300 hover:scale-[1.03] hover:z-10 active:scale-95">
              <DoctorCard name={member.name} role={member.role} bio={member.bio} image={member.image} />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Standards" title="Certified protocols and a premium standard" description="Every detail is designed to feel safe, modern and reassuring.">
        <div className="flex flex-wrap gap-3">
          {certifications.map((item) => (
            <span key={item} className="page-card rounded-full px-4 py-2 text-sm text-[#c9ac6a] transition-all duration-300 hover:scale-105 active:scale-95">
              {item}
            </span>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}