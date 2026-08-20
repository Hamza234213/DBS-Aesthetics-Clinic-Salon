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
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-6 sm:px-6 md:pt-[140px] md:pb-8 lg:px-8 lg:pt-[150px]">
        <AnimatedHero>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">Contact us</p>
              <h1 className="mt-4 text-4xl font-semibold font-serif text-[#f7f2e9] sm:text-5xl leading-tight">
                Book a private consultation or visit our clinics in Karachi.
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">
                We welcome calls, WhatsApp inquiries and online consultation requests for all treatments and salon services.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-appointment">Book Appointment</Button>
                <Button href={clinicInfo.socials.whatsapp} variant="secondary">WhatsApp Us</Button>
              </div>
            </div>
            <div className="page-card rounded-[2.25rem] border border-[#c9ac6a]/20 p-8 transition-all duration-300 hover:border-[#c9ac6a]/40">
              <h2 className="text-2xl font-serif font-semibold text-[#f7f2e9]">Clinic Contact Details</h2>
              <ul className="mt-6 space-y-4 text-base sm:text-lg text-[#f7f2e9]/75">
                <li><span className="font-semibold text-[#c9ac6a]">UAN / Mobile:</span> {clinicInfo.phone}</li>
                <li><span className="font-semibold text-[#c9ac6a]">Landline:</span> {clinicInfo.landline}</li>
                <li><span className="font-semibold text-[#c9ac6a]">WhatsApp:</span> {clinicInfo.whatsapp}</li>
                <li><span className="font-semibold text-[#c9ac6a]">Operating Hours:</span> {clinicInfo.hours}</li>
              </ul>
            </div>
          </div>
        </AnimatedHero>
      </section>

      {/* Dual Maps Section - Side by Side (50% / 50%) */}
      <SectionShell 
        eyebrow="Our Locations" 
        title="Visit DBS Clinic & Salon at Two Prime Karachi Addresses" 
        description="Select your preferred location below for directions and in-person consultations."
      >
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Address 1 Map Card */}
          <div className="page-card flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#c9ac6a]/20 p-5 transition-all duration-300 hover:border-[#c9ac6a]/40">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="rounded-full bg-[#c9ac6a]/15 border border-[#c9ac6a]/30 px-3 py-1 text-xs font-semibold text-[#c9ac6a]">
                  Address 1 • Phase 7 Ext
                </span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#f7f2e9]">
                Khayaban-e-Saadi Branch
              </h3>
              <p className="mt-2 text-sm text-[#f7f2e9]/70 leading-relaxed">
                {clinicInfo.address1}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#c9ac6a]/15">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.31036501321367!2d67.07478076045612!3d24.830841785921727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d0042457625%3A0xf47981895bd9772d!2sDBS%20Aesthetic%20Clinic%20%26%20Salon!5e0!3m2!1sen!2s!4v1787181323329!5m2!1sen!2s"
                title="DBS Khayaban-e-Saadi Location"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#c9ac6a]/15">
              <span className="text-xs text-[#f7f2e9]/60">Opposite TM Roots Pharmacy</span>
              <a
                href="https://maps.app.goo.gl/cfej6kVhqPzX5y9C9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c9ac6a] hover:text-[#f4d98a] transition-colors"
              >
                Get Directions ↗
              </a>
            </div>
          </div>

          {/* Address 2 Map Card */}
          <div className="page-card flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#c9ac6a]/20 p-5 transition-all duration-300 hover:border-[#c9ac6a]/40">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="rounded-full bg-[#c9ac6a]/15 border border-[#c9ac6a]/30 px-3 py-1 text-xs font-semibold text-[#c9ac6a]">
                  Address 2 • Phase 5 Ext
                </span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#f7f2e9]">
                Badar Commercial Branch
              </h3>
              <p className="mt-2 text-sm text-[#f7f2e9]/70 leading-relaxed">
                {clinicInfo.address2}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#c9ac6a]/15">
              <iframe
                src="https://www.google.com/maps?q=Plot%2030c%20Phase%205%20Ext%20Badar%20Commercial%20Street%206%20Karachi&output=embed"
                title="DBS Badar Commercial Location"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#c9ac6a]/15">
              <span className="text-xs text-[#f7f2e9]/60">2nd Floor, Badar Commercial</span>
              <a
                href="https://maps.google.com/?q=Plot+no+30c+2nd+floor+Phase+5+Ext+Badar+Commercial+Street+6+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c9ac6a] hover:text-[#f4d98a] transition-colors"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}