import Link from "next/link";
import { clinicInfo } from "@/data/clinic";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-gradient-to-tl from-[#c9ac6a]/10 via-[#232323]/30 to-[#232323]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h3 className="text-2xl  font-serif leading-relaxed text-[#D4A85F] ">{clinicInfo.footername}</h3>
          <h4 className="text-xl font-[Playfair] leading-relaxed text-[#f7f2e9]">{clinicInfo.footersubname}</h4>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#f7f2e9]/70">
            {clinicInfo.footerabout}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={clinicInfo.socials.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-[#c9ac6a]/40 p-3 text-[#c9ac6a] transition hover:bg-[#c9ac6a] hover:text-[#232323]"><FaInstagram /></a>
            <a href={clinicInfo.socials.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-[#c9ac6a]/40 p-3 text-[#c9ac6a] transition hover:bg-[#c9ac6a] hover:text-[#232323]"><FaFacebookF /></a>
            <a href={clinicInfo.socials.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-[#c9ac6a]/40 p-3 text-[#c9ac6a] transition hover:bg-[#c9ac6a] hover:text-[#232323]"><FaWhatsapp /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#c9ac6a]">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm  text-[#f7f2e9]/70">
            <li>{clinicInfo.phone}</li>
            <li>{clinicInfo.landline}</li>
            <li>{clinicInfo.address}</li>
            <li>{clinicInfo.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#c9ac6a]">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm  text-[#f7f2e9]/70">
            <li><Link href="/about" className="hover:text-[#c9ac6a]">About</Link></li>
            <li><Link href="/services" className="hover:text-[#c9ac6a]">Services</Link></li>
            <li><Link href="/gallery" className="hover:text-[#c9ac6a]">Gallery</Link></li>
            <li><Link href="/book-appointment" className="hover:text-[#c9ac6a]">Book Appointment</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
