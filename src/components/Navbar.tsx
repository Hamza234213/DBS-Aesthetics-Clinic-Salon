"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaPhone, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { clinicInfo } from "@/data/clinic";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{
          y: isOpen ? -100 : 0,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isOpen ? "pointer-events-none" : "pointer-events-auto"
        } ${
          isScrolled && !isOpen
            ? " backdrop-blur-xl shadow-lg border-b border-[#c9ac6a]/20"
            : "bg-transparent backdrop-blur-none border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl bg-transparent items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo - Simplified for mobile */}
          <Link 
            href="/" 
            scroll={true}
            className="flex items-center gap-2 flex-shrink-0"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative h-10 w-10 sm:h-13 sm:w-13 flex-shrink-0">
              <Image
                src="/dbslogo.png"
                alt="DBS Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="">
              <p className="text-xs sm:text-sm font-[Patrick] tracking-[0.15em] normal-case text-[#c9ac6a] font-semibold whitespace-nowrap">
                Aesthetics Clinic
              </p>
              <p className="text-[10px] sm:text-xs font-[Patrick] tracking-[0.15em] normal-case text-white font-medium whitespace-nowrap">
                & Salon
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition relative ${
                    active ? "text-[#c9ac6a]" : "text-[#f7f2e9]/70 hover:text-[#c9ac6a]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c9ac6a]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/book-appointment"
              className="rounded-full bg-[#c9ac6a] px-6 py-2.5 text-sm font-medium text-[#232323] transition hover:bg-[#d4b87a]"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-[#c9ac6a]/10 hover:bg-[#c9ac6a]/20 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                className="block w-5 h-0.5 bg-[#c9ac6a] rounded-full transition-all"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="block w-5 h-0.5 bg-[#c9ac6a] rounded-full transition-all"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                className="block w-5 h-0.5 bg-[#c9ac6a] rounded-full transition-all"
              />
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: 0 }}
          >
            {/* Background overlay with gradient */}
            <div className="absolute inset-0 bg-[#1a1a1a]/98 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#c9ac6a]/5 via-transparent to-transparent" />
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-48 h-48 rounded-full bg-[#c9ac6a]/5 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[#c9ac6a]/5 blur-3xl" />

            <div className="relative z-10 flex flex-col h-full px-6 py-8">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between mb-12">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image
                      src="/dbslogo.png"
                      alt="DBS Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-[Patrick] tracking-[0.15em] normal-case text-[#c9ac6a] font-semibold">
                      Aesthetics Clinic
                    </p>
                    <p className="text-xs font-[Patrick] tracking-[0.15em] normal-case text-white font-medium">
                      & Salon
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#c9ac6a]/10 hover:bg-[#c9ac6a]/20 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-[#c9ac6a] text-xl" />
                </button>
              </div>

              {/* Navigation Links - Centered */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-2">
                {links.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="w-full max-w-sm"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-4 px-6 text-center text-2xl font-medium transition-all duration-300 rounded-2xl ${
                          active 
                            ? "text-[#c9ac6a] bg-[#c9ac6a]/10" 
                            : "text-[#f7f2e9]/70 hover:text-[#c9ac6a] hover:bg-[#c9ac6a]/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Section - Book Button & Contact Info */}
              <div className="mt-auto space-y-6 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center rounded-2xl bg-[#c9ac6a] px-8 py-4 text-base font-semibold text-[#232323] transition hover:bg-[#d4b87a] hover:scale-[1.02] active:scale-95"
                  >
                    Book Appointment
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center gap-3 pt-4 border-t border-[#c9ac6a]/10"
                >
                  <div className="flex items-center gap-6">
                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className="flex items-center gap-2 text-sm text-[#f7f2e9]/60 hover:text-[#c9ac6a] transition-colors"
                    >
                      <FaPhone className="text-[#c9ac6a] text-xs" />
                      {clinicInfo.phone}
                    </a>
                    <span className="text-[#f7f2e9]/20">|</span>
                    <span className="text-sm text-[#f7f2e9]/60">{clinicInfo.hours}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <a
                      href={clinicInfo.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#c9ac6a]/10 hover:bg-[#c9ac6a]/20 transition-colors"
                    >
                      <FaWhatsapp className="text-[#c9ac6a] text-lg" />
                    </a>
                    <a
                      href={clinicInfo.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#c9ac6a]/10 hover:bg-[#c9ac6a]/20 transition-colors"
                    >
                      <FaInstagram className="text-[#c9ac6a] text-lg" />
                    </a>
                    <a
                      href={clinicInfo.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#c9ac6a]/10 hover:bg-[#c9ac6a]/20 transition-colors"
                    >
                      <FaFacebook className="text-[#c9ac6a] text-lg" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}