import { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach DBS Aesthetics Clinic & Salon by phone, WhatsApp or in person at our Karachi location.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">Contact us</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">Book a private consultation or visit our clinic in Karachi.</h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">We welcome calls, WhatsApp inquiries and online consultation requests for all treatments and salon services.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-appointment">Book Appointment</Button>
              <Button href={clinicInfo.socials.whatsapp} variant="secondary">WhatsApp</Button>
            </div>
          </div>
          <div className="rounded-[2.25rem] border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8">
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
      </section>

      <SectionShell eyebrow="Map" title="Find us easily in Phase 7" description="Our location is conveniently placed near the main commercial and medical route in Karachi.">
        <div className="overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020] p-4">
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
