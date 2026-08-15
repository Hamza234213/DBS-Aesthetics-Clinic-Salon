"use client";

import { FaWhatsapp } from "react-icons/fa";
import { clinicInfo } from "@/data/clinic";

export function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.socials.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="
        group
        fixed bottom-5 right-5 z-50

        flex items-center justify-center
        h-14 w-14
        hover:w-[155px]

        overflow-hidden
        rounded-full

        text-sm font-semibold
        text-[#232323]

        bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]

        shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_6px_20px_rgba(201,172,106,0.25)]

        transition-all
        duration-300
        ease-in-out

        hover:scale-105
        hover:brightness-110

        hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_25px_rgba(201,172,106,0.45)]
      "
    >
      {/* WhatsApp Icon */}
      <FaWhatsapp
        size={24}
        className="
          shrink-0
          transition-all
          duration-300
          group-hover:mr-1
        "
      />

      {/* Text - hidden until hover */}
      <span
        className="
          max-w-0
          overflow-hidden
          whitespace-nowrap
          opacity-0

          transition-all
          duration-300
          ease-in-out

          group-hover:max-w-[100px]
          group-hover:opacity-100
        "
      >
        WhatsApp
      </span>
    </a>
  );
}