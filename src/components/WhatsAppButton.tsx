"use client";

import { FaWhatsapp } from "react-icons/fa";
import { clinicInfo } from "@/data/clinic";

export function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.socials.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#c9ac6a] px-5 py-3 text-sm font-semibold text-[#232323] shadow-2xl shadow-[#c9ac6a]/20 transition hover:scale-105"
    >
      <FaWhatsapp size={20} />
      WhatsApp Now
    </a>
  );
}
