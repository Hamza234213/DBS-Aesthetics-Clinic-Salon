import { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";
import { AppointmentForm } from "@/components/AppointmentForm";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Reserve a private consultation with the DBS Aesthetics Clinic & Salon team in Karachi.",
};

export const dynamic = "force-dynamic";

export default function BookAppointmentPage() {
  return (
    <div className="page-metallic-shell relative overflow-hidden min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-12 sm:px-6 md:pt-[140px] md:pb-16 lg:px-8 lg:pt-[150px]">
        <AnimatedHero>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">Book appointment</p>
              <h1 className="mt-4 text-4xl font-semibold font-semibold font-serif text-[#f7f2e9] sm:text-5xl">Reserve a private consultation with the DBS team.</h1>
              <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">Share your preferred treatment, schedule and details so we can prepare a thoughtful, personalized experience.</p>
              
              <div className="page-card mt-8 rounded-[2rem] p-8 text-sm leading-8 text-[#f7f2e9]/75 transition-all duration-300 hover:scale-[1.02] active:scale-95">
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