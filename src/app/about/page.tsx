import { Metadata } from "next";
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
    <div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-24 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">About DBS</p>
            <h1 className="mt-4 text-4xl font-semibold font-semibold font-serif leading-tight text-[#f7f2e9] sm:text-5xl">
              A luxury clinic where medical expertise meets elevated beauty care.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">{clinicInfo.about}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-appointment">Book Consultation</Button>
              <Button href="/contact" variant="secondary">Visit Clinic</Button>
            </div>
          </div>
          <div className="rounded-[2.25rem] border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8">
            <h2 className="text-2xl font-semibold text-[#f7f2e9]">Our philosophy</h2>
            <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">{clinicInfo.vision}</p>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/70">{clinicInfo.mission}</p>
          </div>
        </div></AnimatedHero>
      </section>

      <SectionShell eyebrow="Our values" title="Trusted, transparent and deeply personal care" description="We are committed to a calm and refined experience at every step.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-[#c9ac6a]/20 bg-[#202020] p-8 text-center">
              <p className="text-4xl font-semibold text-[#c9ac6a]">{stat.value}</p>
              <p className="mt-3 text-sm text-[#f7f2e9]/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Meet the team" title="The specialists shaping your experience" description="A blend of medical expertise, artistry and hospitality defines our team.">
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <DoctorCard key={member.name} name={member.name} role={member.role} bio={member.bio} image={member.image} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Standards" title="Certified protocols and a premium standard" description="Every detail is designed to feel safe, modern and reassuring.">
        <div className="flex flex-wrap gap-3">
          {certifications.map((item) => (
            <span key={item} className="rounded-full border border-[#c9ac6a]/30 px-4 py-2 text-sm text-[#c9ac6a]">{item}</span>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
