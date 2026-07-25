import { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach DBS Aesthetics Clinic & Salon by phone, WhatsApp or in person at our Karachi location.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />
      
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-24 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">Contact us</p>
              <h1 className="mt-4 text-4xl font-semibold font-semibold font-serif text-[#f7f2e9] sm:text-5xl">Book a private consultation or visit our clinic in Karachi.</h1>
              <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">We welcome calls, WhatsApp inquiries and online consultation requests for all treatments and salon services.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-appointment">Book Appointment</Button>
                <Button href={clinicInfo.socials.whatsapp} variant="secondary">WhatsApp</Button>
              </div>
            </div>
            <div className="rounded-[2.25rem] border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8 transition-all duration-300 hover:scale-[1.02] hover:border-[#c9ac6a]/60 hover:shadow-[0_20px_60px_rgba(201,172,106,0.12)] active:scale-95">
              <h2 className="text-2xl font-semibold text-[#f7f2e9]">Clinic details</h2>
              <ul className="mt-6 space-y-4 text-lg text-[#f7f2e9]/75">
                <li><span className="text-[#c9ac6a]">Phone:</span> {clinicInfo.phone}</li>
                <li><span className="text-[#c9ac6a]">Landline:</span> {clinicInfo.landline}</li>
                <li><span className="text-[#c9ac6a]">WhatsApp:</span> {clinicInfo.whatsapp}</li>
                <li><span className="text-[#c9ac6a]">Address:</span> {clinicInfo.address}</li>
                <li><span className="text-[#c9ac6a]">Hours:</span> {clinicInfo.hours}</li>
              </ul>
            </div>
          </div>
        </AnimatedHero>
      </section>

      <SectionShell eyebrow="Map" title="Find us easily in Phase 7" description="Our location is conveniently placed near the main commercial and medical route in Karachi.">
        <div className="overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020] p-4 transition-all duration-300 hover:scale-[1.01] hover:border-[#c9ac6a]/60 hover:shadow-[0_20px_60px_rgba(201,172,106,0.12)] active:scale-95">
          <iframe
            src="https://www.google.com/maps?q=13-C%20Khayaban-e-Saadi%20Phase%207%20Karachi&output=embed"
            title="DBS Aesthetics Clinic & Salon location"
            className="h-105 w-full rounded-3xl border-0"
            loading="lazy"
          />
        </div>
      </SectionShell>
    </div>
  );
}