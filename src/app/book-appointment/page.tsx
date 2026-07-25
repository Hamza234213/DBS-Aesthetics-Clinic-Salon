import { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";
import { AppointmentForm } from "@/components/AppointmentForm";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Reserve a private consultation with the DBS Aesthetics Clinic & Salon team in Karachi.",
};

export default function BookAppointmentPage() {
  return (
    <div>
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />
      
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-24 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">Book appointment</p>
              <h1 className="mt-4 text-4xl font-semibold font-semibold font-serif text-[#f7f2e9] sm:text-5xl">Reserve a private consultation with the DBS team.</h1>
              <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">Share your preferred treatment, schedule and details so we can prepare a thoughtful, personalized experience.</p>
              
              <div className="mt-8 rounded-4xl border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8 text-sm leading-8 text-[#f7f2e9]/75 transition-all duration-300 hover:scale-[1.02] hover:border-[#c9ac6a]/60 hover:shadow-[0_20px_60px_rgba(201,172,106,0.12)] active:scale-95">
                <p><span className="text-[#c9ac6a]">Phone:</span> {clinicInfo.phone}</p>
                <p><span className="text-[#c9ac6a]">WhatsApp:</span> {clinicInfo.whatsapp}</p>
                <p><span className="text-[#c9ac6a]">Hours:</span> {clinicInfo.hours}</p>
              </div>
            </div>

            <div>
              <AppointmentForm />
            </div>
          </div>
        </AnimatedHero>
      </section>
    </div>
  );
}