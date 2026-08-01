"use client";

import { FaWhatsapp } from "react-icons/fa";
import { clinicInfo } from "@/data/clinic";

export function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.socials.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="
        fixed bottom-5 right-5 z-50
        inline-flex items-center gap-3
        rounded-full
        px-5 py-3
        text-sm font-semibold
        text-[#232323]

        bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]

        shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_6px_20px_rgba(201,172,106,0.25)]

        transition-all
        duration-300
        hover:scale-105
        hover:brightness-110

        hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_25px_rgba(201,172,106,0.45)]
      "
    >
      <FaWhatsapp size={20} />
      WhatsApp Now
    </a>
  );
}