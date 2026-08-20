import Image from "next/image";
import Link from "next/link";
import { clinicInfo } from "@/data/clinic";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import { RiWhatsappFill } from "react-icons/ri";

export function Footer() {
  // =========================================================
  // WhatsApp number
  // =========================================================

  const whatsappNumber = String(clinicInfo.whatsapp || "")
    .replace(/\D/g, "")
    .replace(/^0/, "92");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // =========================================================
  // Phone numbers
  // =========================================================

  const phoneNumber = String(clinicInfo.phone || "").replace(/\s/g, "");
  const landlineNumber = String(clinicInfo.landline || "").replace(/\s/g, "");

  const phoneWhatsappUrl = `https://wa.me/92${phoneNumber
    .replace(/\D/g, "")
    .replace(/^0/, "")}`;

  const landlineUrl = `tel:${landlineNumber.replace(/\D/g, "")}`;

  return (
    <footer className="relative overflow-hidden border-t border-[#c9ac6a]/20 bg-[#050505]">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(201,172,106,0.10),transparent_45%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/50 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/35 to-transparent" />

      <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />

      <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />


      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">


        {/* ===================================================
            LEFT COLUMN — BRAND
        ==================================================== */}

        <div>

          {/* BRAND NAME WITH LOGO */}

          <Link
            href="/"
            aria-label="DBS Aesthetics & Salon Home"
            className="group inline-flex items-center gap-4 transition-all duration-500 hover:scale-[1.02]"
          >

            <Image
              src="/dbslogo.png"
              alt="DBS Aesthetics & Salon"
              width={80}
              height={80}
              priority
              className="
                h-auto
                w-[70px]
                object-contain
                transition-all
                duration-500
                sm:w-[90px] 
                mt-3
                group-hover:drop-shadow-[0_0_20px_rgba(201,172,106,0.20)]
              "
            />

            <div>
              <h3 className="bg-[length:200%_100%] bg-clip-text font-[Patrick] text-2xl leading-relaxed text-transparent animate-shimmer   bg-gradient-to-r
                  from-[#8f6b2e]
                  via-[#f4d98a]
                  via-[#c9a55c]
                  to-[#8f6b2e]">
                {clinicInfo.footername}
              </h3>

              <h4 className="font-[Playfair] text-xl leading-relaxed text-[#f7f2e9]">
                {clinicInfo.footersubname}
              </h4>
            </div>

          </Link>


          {/* GOLD DIVIDER */}

          <div className="mt-4 h-px w-[230px] bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />


          {/* ABOUT */}

          <p className="mt-5 max-w-md text-sm leading-7 text-[#f7f2e9]/60 transition-colors duration-300 hover:text-[#f7f2e9]/80">
            {clinicInfo.footerabout}
          </p>


          {/* =================================================
              SOCIAL ICONS
          ================================================== */}

          <div className="mt-6 flex gap-3">


            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/dbsbyzaini?igsh=MXQ3MWhhcWp1aTh0Zw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                group
                relative
                rounded-full
                border
                border-[#c9ac6a]/20
                bg-[#0b0b0b]/80
                p-3
                text-[#c9ac6a]/70
                transition-all
                duration-300
                hover:scale-110
                hover:border-[#c9ac6a]/60
                hover:text-[#c9ac6a]
                hover:shadow-[0_0_30px_rgba(201,172,106,0.12)]
              "
            >

              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <FaInstagram className="relative z-10" />

            </a>


            {/* FACEBOOK */}

            <a
              href="https://www.facebook.com/share/17t1XyNng3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                group
                relative
                rounded-full
                border
                border-[#c9ac6a]/20
                bg-[#0b0b0b]/80
                p-3
                text-[#c9ac6a]/70
                transition-all
                duration-300
                hover:scale-110
                hover:border-[#c9ac6a]/60
                hover:text-[#c9ac6a]
                hover:shadow-[0_0_30px_rgba(201,172,106,0.12)]
              "
            >

              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <FaFacebookF className="relative z-10" />

            </a>


            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="
                group
                relative
                rounded-full
                border
                border-[#c9ac6a]/20
                bg-[#0b0b0b]/80
                p-3
                text-[#c9ac6a]/70
                transition-all
                duration-300
                hover:scale-110
                hover:border-[#c9ac6a]/60
                hover:text-[#c9ac6a]
                hover:shadow-[0_0_30px_rgba(201,172,106,0.12)]
              "
            >

              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <FaWhatsapp className="relative z-10" />

            </a>

          </div>

        </div>


        {/* ===================================================
            MIDDLE COLUMN — CONTACT
        ==================================================== */}

        <div className="pt-[8px] lg:pt-[18px]">

          <h4
            className="font-[Oswald] text-lg font-semibold uppercase tracking-[0.2em]
               bg-[length:200%_100%]
               bg-clip-text
               text-transparent
               animate-shimmer
               bg-gradient-to-r
               from-[#8f6b2e]
               via-[#f4d98a]
               via-[#c9a55c]
               to-[#8f6b2e]"
          >
            Contact
          </h4>


          {/* GOLD DIVIDER */}

          <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />


          <ul className="mt-5 space-y-4 text-sm text-[#f7f2e9]/65">


            {/* WHATSAPP NUMBER */}

            <li className="flex items-start gap-3">

              <RiWhatsappFill
                size={15}
                className="mt-1 shrink-0 text-[#c9ac6a]/70"
              />

              <a
                href={phoneWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#c9ac6a]"
              >
                {clinicInfo.phone}
              </a>

            </li>


            {/* LANDLINE */}

            <li className="flex items-start gap-3">

              <FaPhone
                size={14}
                className="mt-1 shrink-0 text-[#c9ac6a]/70"
              />

              <a
                href={landlineUrl}
                className="transition-colors duration-300 hover:text-[#c9ac6a]"
              >
                {clinicInfo.landline}
              </a>

            </li>


            {/* FIRST ADDRESS */}

            <li className="flex items-start gap-3">

              <FaMapMarkerAlt
                size={14}
                className="mt-1 shrink-0 text-[#c9ac6a]/70"
              />

              <span className="transition-colors duration-300 hover:text-[#f7f2e9]/90">
                {clinicInfo.address1}
              </span>

            </li>


            {/* SECOND ADDRESS */}

            <li className="flex items-start gap-3">

              <FaMapMarkerAlt
                size={14}
                className="mt-1 shrink-0 text-[#c9ac6a]/70"
              />

              <span className="transition-colors duration-300 hover:text-[#f7f2e9]/90">
                {clinicInfo.address2}
              </span>

            </li>


            {/* OPENING HOURS */}

            <li className="flex items-start gap-3">

              <FaClock
                size={14}
                className="mt-1 shrink-0 text-[#c9ac6a]/70"
              />

              <span className="transition-colors duration-300 hover:text-[#f7f2e9]/90">
                {clinicInfo.hours}
              </span>

            </li>

          </ul>

        </div>


        {/* ===================================================
            RIGHT COLUMN — EXPLORE
        ==================================================== */}

        <div className="pt-[8px] lg:pt-[18px]">

          <h4 className="font-[Oswald] text-lg font-semibold uppercase tracking-[0.2em]
               bg-[length:200%_100%]
               bg-clip-text
               text-transparent
               animate-shimmer
               bg-gradient-to-r
               from-[#8f6b2e]
               via-[#f4d98a]
               via-[#c9a55c]
               to-[#8f6b2e]">
            Explore
          </h4>


          {/* GOLD DIVIDER */}

          <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />


          <ul className="mt-5 space-y-3 text-sm text-[#f7f2e9]/65">


            {/* ABOUT */}

            <li>

              <Link
                href="/about"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >

                <span className="flex h-px w-4 shrink-0 items-center">

                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                </span>

                <span>About</span>

              </Link>

            </li>


            {/* SERVICES */}

            <li>

              <Link
                href="/services"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >

                <span className="flex h-px w-4 shrink-0 items-center">

                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                </span>

                <span>Services</span>

              </Link>

            </li>


            {/* GALLERY */}

            <li>

              <Link
                href="/gallery"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >

                <span className="flex h-px w-4 shrink-0 items-center">

                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                </span>

                <span>Gallery</span>

              </Link>

            </li>


            {/* BOOK APPOINTMENT */}

            <li>

              <Link
                href="/book-appointment"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >

                <span className="flex h-px w-4 shrink-0 items-center">

                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                </span>

                <span>Book Appointment</span>

              </Link>

            </li>

          </ul>

        </div>

      </div>


      {/* =====================================================
          BOTTOM COPYRIGHT BAR
      ====================================================== */}

      <div className="relative z-10 border-t border-[#c9ac6a]/10 bg-[#060606]/80">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <p className="group flex items-center justify-center gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f7f2e9]/40 transition-all duration-500 hover:text-[#c9ac6a]/80 sm:text-[13px] sm:tracking-[0.35em]">

            {/* LEFT LINE */}

            <span className="h-px w-6 bg-[#c9ac6a]/30 transition-all duration-500 group-hover:w-10 group-hover:bg-[#c9ac6a]/60 sm:w-8" />


            {/* CREDIT */}

            <span>
              Powered by{" "}
              <span className="text-[#c9ac6a]/70 transition-colors duration-500 group-hover:text-[#c9ac6a]">
                CodeX Studio
              </span>
            </span>


            {/* RIGHT LINE */}

            <span className="h-px w-6 bg-[#c9ac6a]/30 transition-all duration-500 group-hover:w-10 group-hover:bg-[#c9ac6a]/60 sm:w-8" />

          </p>

        </div>

      </div>

    </footer>
  );
}