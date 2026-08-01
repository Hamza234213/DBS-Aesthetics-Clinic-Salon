"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
      {/* =========================
          DESKTOP / MAIN NAVBAR
      ========================== */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{
          y: isOpen ? -100 : 0,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isOpen
            ? "pointer-events-none"
            : "pointer-events-auto"
        } ${
          isScrolled && !isOpen
          ? "bg-[#111111]/45 backdrop-blur-2xl border-b border-white/10 "
            : "bg-transparent backdrop-blur-none border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between bg-transparent px-4 py-3 sm:px-6 lg:px-8">

          {/* =========================
              LOGO
          ========================== */}
          <Link
            href="/"
            scroll={true}
            className="flex items-center gap-3 flex-shrink-0"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
          >
            {/* Bigger Logo */}
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-[68px] lg:w-[68px] flex-shrink-0">
              <Image
                src="/dbslogo.png"
                alt="DBS Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div>
              <p
                className="
                  bg-gradient-to-r
                  from-[#8f6b2e]
                  via-[#f4d98a]
                  via-[#c9a55c]
                  to-[#8f6b2e]
                  bg-clip-text
                  text-transparent
                  text-xs
                  sm:text-sm
                  font-[Patrick]
                  tracking-[0.15em]
                  normal-case
                  font-semibold
                  whitespace-nowrap
                "
              >
                Aesthetics Clinic
              </p>

              <p className="text-[10px] sm:text-xs font-[Patrick] tracking-[0.15em] normal-case text-white font-medium whitespace-nowrap">
                & Salon
              </p>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative
                    text-sm
                    font-medium
                    tracking-wide
                    transition
                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-[#8f6b2e]
                          via-[#f4d98a]
                          to-[#8f6b2e]
                          bg-clip-text
                          text-transparent
                        `
                        : "text-[#f7f2e9]/70 hover:text-[#c9ac6a]"
                    }
                  `}
                >
                  {link.label}

                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="
                        absolute
                        -bottom-1
                        left-0
                        right-0
                        h-[2px]
                        rounded-full
                        bg-gradient-to-r
                        from-[#8f6b2e]
                        via-[#f4d98a]
                        to-[#8f6b2e]
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>

    {/* =========================
    DESKTOP BUTTON
========================== */}
<div className="hidden lg:flex items-center gap-4">
  <a
    href="/book-appointment"
    className="
      inline-flex items-center justify-center
      rounded-full
      px-6 py-2.5
      text-sm font-semibold
      text-[#2a2112]

      bg-[linear-gradient(120deg,#c99c4e_0%,#e4c56f_20%,#fff0ad_40%,#d9b45b_58%,#f3d57d_78%,#c99c4e_100%)]

      border border-[#f8e5a5]/70

      shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_5px_20px_rgba(201,172,106,0.25)]

      transition-all
      duration-300

      hover:scale-[1.03]
      hover:brightness-110

      hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.9),0_8px_26px_rgba(201,172,106,0.45)]
    "
  >
    Book Appointment
  </a>
</div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
           className="
  lg:hidden
  relative
  w-11
  h-11
  flex
  items-center
  justify-center
  rounded-full
  bg-white/5
  backdrop-blur-xl
  border
  border-white/10
  hover:bg-white/10
  transition-all
  duration-300
"
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
                className="
                  block
                  w-5
                  h-0.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#8f6b2e]
                  via-[#f4d98a]
                  to-[#8f6b2e]
                "
              />

              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="
                  block
                  w-5
                  h-0.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#8f6b2e]
                  via-[#f4d98a]
                  to-[#8f6b2e]
                "
              />

              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                className="
                  block
                  w-5
                  h-0.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#8f6b2e]
                  via-[#f4d98a]
                  to-[#8f6b2e]
                "
              />
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: 0 }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#1a1a1a]/98 backdrop-blur-2xl" />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#c9ac6a]/5
                via-transparent
                to-transparent
              "
            />

            {/* Decorative Glow */}
            <div className="absolute top-20 right-10 w-48 h-48 rounded-full bg-[#c9ac6a]/5 blur-3xl" />

            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[#c9ac6a]/5 blur-3xl" />

            <div className="relative z-10 flex flex-col h-full px-6 py-8">

              {/* =========================
                  MOBILE HEADER
              ========================== */}
              <div className="flex items-center justify-between mb-12">

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  {/* Bigger Mobile Logo */}
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                    <Image
                      src="/dbslogo.png"
                      alt="DBS Logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        bg-gradient-to-r
                        from-[#8f6b2e]
                        via-[#f4d98a]
                        to-[#8f6b2e]
                        bg-clip-text
                        text-transparent
                        text-sm
                        font-[Patrick]
                        tracking-[0.15em]
                        normal-case
                        font-semibold
                      "
                    >
                      Aesthetics Clinic
                    </p>

                    <p className="text-xs font-[Patrick] tracking-[0.15em] normal-case text-white font-medium">
                      & Salon
                    </p>
                  </div>
                </Link>

                {/* Close Button - FIXED */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    relative
                    w-12
                    h-12
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#c9ac6a]/10
                    hover:bg-[#c9ac6a]/20
                    transition-colors
                    duration-300
                    group
                  "
                  aria-label="Close menu"
                >
                  <span className="relative w-6 h-6 flex items-center justify-center">
                    {/* First diagonal line */}
                    <span className="absolute w-6 h-0.5 bg-[#f4d98a] rotate-45 rounded-full" />
                    {/* Second diagonal line */}
                    <span className="absolute w-6 h-0.5 bg-[#f4d98a] -rotate-45 rounded-full" />
                  </span>
                </button>
              </div>

              {/* =========================
                  MOBILE LINKS
              ========================== */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-2">
                {links.map((link, index) => {
                  const active = pathname === link.href;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      className="w-full max-w-sm"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block
                          py-4
                          px-6
                          text-center
                          text-2xl
                          font-medium
                          transition-all
                          duration-300
                          rounded-2xl

                          ${
                            active
                              ? `
                                bg-[#c9ac6a]/10
                                bg-gradient-to-r
                                from-[#8f6b2e]
                                via-[#f4d98a]
                                to-[#8f6b2e]
                                bg-clip-text
                                text-transparent
                              `
                              : `
                                text-[#f7f2e9]/70
                                hover:bg-[#c9ac6a]/5
                                hover:text-[#c9ac6a]
                              `
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 