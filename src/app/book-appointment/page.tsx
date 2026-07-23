import { clinicInfo } from "@/data/clinic";
import { AppointmentForm } from "@/components/AppointmentForm";

export default function BookAppointmentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">Book appointment</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">Reserve a private consultation with the DBS team.</h1>
          <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">Share your preferred treatment, schedule and details so we can prepare a thoughtful, personalized experience.</p>
          <div className="mt-8 rounded-4xl border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8 text-sm leading-8 text-[#f7f2e9]/75">
            <p><span className="text-[#c9ac6a]">Phone:</span> {clinicInfo.phone}</p>
            <p><span className="text-[#c9ac6a]">WhatsApp:</span> {clinicInfo.whatsapp}</p>
            <p><span className="text-[#c9ac6a]">Hours:</span> {clinicInfo.hours}</p>
          </div>
        </div>

        <AppointmentForm />
      </div>
    </div>
  );
}
