"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { clinicInfo } from "@/data/clinic";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-transparent backdrop-blur-xl shadow-lg"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[#f7f2e9] uppercase">
            <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
              <Image
  src="/dbslogo.png"
  alt="DBS Logo"
  fill
  priority
  className="object-contain"
/></div>
            <div className="hidden sm:block">
            
              <p className="text-[16px] font-[Patrick] tracking-[0.2em] normal-case text-[#c9ac6a]/100 font-semibold ">
                Aesthetics Clinic & Salon
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition ${
                    active ? "text-[#f7f2e9]/70 hover:text-[#c9ac6a]" : "text-[#f7f2e9]/70 hover:text-[#c9ac6a]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/book-appointment"
              className="rounded-full border border-[#c9ac6a] px-6 py-2.5 text-sm font-medium text-[#c9ac6a] transition hover:bg-[#c9ac6a] hover:text-[#232323]"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-[#c9ac6a] transition-colors duration-300 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-transparent backdrop-blur-xl lg:hidden"
            style={{ top: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full px-6 space-y-8">
              {/* Mobile Logo at top */}
              <div className="absolute top-6 left-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    <Image
                      src="/dbslogo.png"
                      alt="DBS Logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[#c9ac6a] font-serif text-lg font-bold">DBS</span>
                </Link>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-[#c9ac6a] transition-colors duration-300"
                aria-label="Close menu"
              >
                <FaTimes size={28} />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * links.indexOf(link) }}
                      className="w-full text-center"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 text-2xl font-medium transition ${
                          active ? "text-[#c9ac6a]" : "text-[#f7f2e9]/80 hover:text-[#c9ac6a]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Book Appointment Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full mt-4"
                >
                  <a
                    href="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center rounded-full bg-[#c9ac6a] px-8 py-4 text-base font-medium text-[#232323] transition hover:bg-[#d4b87a]"
                  >
                    Book Appointment
                  </a>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center text-sm text-[#f7f2e9]/50 space-y-2"
                >
                  <p>
                    <a href={`tel:${clinicInfo.phone}`} className="hover:text-[#c9ac6a] transition-colors">
                      {clinicInfo.phone}
                    </a>
                  </p>
                  <p>{clinicInfo.hours}</p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

   
    </>
  );
}