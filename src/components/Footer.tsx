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
  // Convert a Pakistani phone number into a WhatsApp-ready international number
  const whatsappNumber = String(clinicInfo.whatsapp || "")
    .replace(/\D/g, "")
    .replace(/^0/, "92");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // Clean phone number for tel: links
  const phoneNumber = String(clinicInfo.phone || "").replace(/\s/g, "");
  const landlineNumber = String(clinicInfo.landline || "").replace(/\s/g, "");

  return (
    <footer className="relative overflow-hidden border-t border-[#c9ac6a]/20 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(201,172,106,0.10),transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/35 to-transparent" />
      <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />
      <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#c9ac6a]/8 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">

        {/* =========================
            LEFT COLUMN - BRAND
        ========================== */}
        <div>
          <h3 className="text-2xl font-serif leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] animate-shimmer">
            {clinicInfo.footername}
          </h3>

          <h4 className="mt-2 text-xl font-[Playfair] leading-relaxed text-[#f7f2e9]">
            {clinicInfo.footersubname}
          </h4>

          <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />

          <p className="mt-5 max-w-md text-sm leading-7 text-[#f7f2e9]/60 transition-colors duration-300 hover:text-[#f7f2e9]/80">
            {clinicInfo.footerabout}
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">

            {/* Instagram */}
            <a
              href={clinicInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative rounded-full border border-[#c9ac6a]/20 bg-[#0b0b0b]/80 p-3 text-[#c9ac6a]/70 transition-all duration-300 hover:border-[#c9ac6a]/60 hover:text-[#c9ac6a] hover:shadow-[0_0_30px_rgba(201,172,106,0.12)] hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10" />

              <FaInstagram className="relative z-10" />
            </a>

            {/* Facebook */}
            <a
              href={clinicInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group relative rounded-full border border-[#c9ac6a]/20 bg-[#0b0b0b]/80 p-3 text-[#c9ac6a]/70 transition-all duration-300 hover:border-[#c9ac6a]/60 hover:text-[#c9ac6a] hover:shadow-[0_0_30px_rgba(201,172,106,0.12)] hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10" />

              <FaFacebookF className="relative z-10" />
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative rounded-full border border-[#c9ac6a]/20 bg-[#0b0b0b]/80 p-3 text-[#c9ac6a]/70 transition-all duration-300 hover:border-[#c9ac6a]/60 hover:text-[#c9ac6a] hover:shadow-[0_0_30px_rgba(201,172,106,0.12)] hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#c9ac6a]/10 via-transparent to-[#c9ac6a]/10" />

              <FaWhatsapp className="relative z-10" />
            </a>

          </div>
        </div>

        {/* =========================
            MIDDLE COLUMN - CONTACT
        ========================== */}
        <div>
         <h4 className="text-lg font-semibold tracking-[0.2em] text-[#c9ac6a] font-[Oswald] uppercase">
            Contact
          </h4>

         <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />

         <ul className="mt-5 space-y-4 text-sm text-[#f7f2e9]/65">

  {/* First Number - WhatsApp */}
  <li className="flex items-start gap-3">
     <RiWhatsappFill size={15} className="mt-1 shrink-0 text-[#c9ac6a]/70"  />

    <a
      href={`https://wa.me/92${phoneNumber.replace(/\D/g, "").replace(/^0/, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300 hover:text-[#c9ac6a]"
    >
      {clinicInfo.phone}
    </a>
  </li>

  {/* Second Number - Dialer */}
  <li className="flex items-start gap-3">
    <FaPhone className="mt-1 shrink-0 text-[#c9ac6a]/70" />

    <a
      href={`tel:${landlineNumber.replace(/\D/g, "")}`}
      className="transition-colors duration-300 hover:text-[#c9ac6a]"
    >
      {clinicInfo.landline}
    </a>
  </li>

  {/* Address */}
  <li className="flex items-start gap-3">
    <FaMapMarkerAlt className="mt-1 shrink-0 text-[#c9ac6a]/70" />

    <span className="transition-colors duration-300 hover:text-[#f7f2e9]/90">
      {clinicInfo.address}
    </span>
  </li>

  {/* Hours */}
  <li className="flex items-start gap-3">
    <FaClock className="mt-1 shrink-0 text-[#c9ac6a]/70" />

    <span className="transition-colors duration-300 hover:text-[#f7f2e9]/90">
      {clinicInfo.hours}
    </span>
  </li>

</ul>
        </div>

        {/* =========================
            RIGHT COLUMN - EXPLORE
        ========================== */}
        <div>
          <h4 className="text-lg font-semibold tracking-[0.2em] text-[#c9ac6a] font-[Oswald] uppercase">
            Explore
          </h4>

          <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#c9ac6a]/50 to-transparent" />

          <ul className="mt-5 space-y-3 text-sm text-[#f7f2e9]/65">

            <li>
              <Link
                href="/about"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >
                <span className="flex h-px w-4 shrink-0 items-center">
                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>

                <span>About</span>
              </Link>
            </li>

            <li>
              <Link
                href="/services"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >
                <span className="flex h-px w-4 shrink-0 items-center">
                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>

                <span>Services</span>
              </Link>
            </li>

            <li>
              <Link
                href="/gallery"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >
                <span className="flex h-px w-4 shrink-0 items-center">
                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>

                <span>Gallery</span>
              </Link>
            </li>

            <li>
              <Link
                href="/book-appointment"
                className="group flex items-center gap-2 transition-all duration-300 hover:text-[#c9ac6a]"
              >
                <span className="flex h-px w-4 shrink-0 items-center">
                  <span className="h-px w-full bg-[#c9ac6a]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>

                <span>Book Appointment</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>

      {/* =========================
          BOTTOM COPYRIGHT BAR
      ========================== */}
      <div className="relative z-10 border-t border-[#c9ac6a]/10 bg-[#060606]/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs tracking-[0.25em] text-[#f7f2e9]/40 uppercase">
            © {new Date().getFullYear()} {clinicInfo.footername}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}