import { Metadata } from "next";
import { clinicInfo } from "@/data/clinic";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Online Payment",
  description: "Pay consultation fees securely online at DBS Aesthetics Clinic & Salon via EasyPaisa, JazzCash or bank transfer.",
};

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">Online payment</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#f7f2e9] sm:text-5xl">Secure consultation fee payments in a few simple steps.</h1>
          <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">Choose a convenient payment method and we’ll confirm your booking once the transfer is received.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book-appointment">Book Consultation</Button>
            <Button href={clinicInfo.socials.whatsapp} variant="secondary">WhatsApp Support</Button>
          </div>
        </div>

        <div className="rounded-[2.25rem] border border-[#c9ac6a]/20 bg-[#1f1f1f] p-8">
          <h2 className="text-2xl font-semibold text-[#f7f2e9]">Payment options</h2>
          <div className="mt-6 space-y-4 text-sm text-[#f7f2e9]/75">
            <div className="rounded-3xl border border-[#c9ac6a]/20 bg-[#232323] p-5">
              <p className="font-semibold text-[#f7f2e9]">EasyPaisa</p>
              <p className="mt-2">Send your payment to the clinic account shared over WhatsApp or by phone.</p>
            </div>
            <div className="rounded-3xl border border-[#c9ac6a]/20 bg-[#232323] p-5">
              <p className="font-semibold text-[#f7f2e9]">JazzCash</p>
              <p className="mt-2">Use the verified clinic mobile number for a seamless transfer.</p>
            </div>
            <div className="rounded-3xl border border-[#c9ac6a]/20 bg-[#232323] p-5">
              <p className="font-semibold text-[#f7f2e9]">Bank Transfer</p>
              <p className="mt-2">Share the payment proof and transaction ID for confirmation.</p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-[#c9ac6a]/20 bg-[#232323] p-6">
            <p className="text-lg font-semibold text-[#f7f2e9]">Payment instructions</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#f7f2e9]/70">
              <li>Share your name, treatment and payment proof after sending funds.</li>
              <li>Upload your screenshot using the support channel or by request.</li>
              <li>Our team will confirm your booking after verification.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
