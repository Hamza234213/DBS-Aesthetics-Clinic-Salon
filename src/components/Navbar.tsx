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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isOpen ? "pointer-events-none" : "pointer-events-auto"
        } ${
          isScrolled && !isOpen
            ? "bg-[#111111]/80 backdrop-blur-md border-b border-white/10 "
            : "bg-transparent backdrop-blur-none border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 bg-transparent px-3 py-3 min-[400px]:gap-3 min-[400px]:px-4 sm:px-6 lg:px-8">
          {/* =========================
              LOGO
          ========================== */}
          <Link
            href="/"
            scroll={true}
            className="flex min-w-0 flex-1 items-center gap-1 lg:flex-none"
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
            {/* Icon logo - fluid size, never shrinks below its own box */}
            <div className="relative h-[clamp(2.5rem,12vw,3rem)] w-[clamp(2.5rem,12vw,3rem)] shrink-0 grow-0 sm:h-16 sm:w-16 lg:h-[68px] lg:w-[68px]">
              <Image
                src="/DBS_Logo.png"
                alt="DBS_Logo"
                fill
                priority
                sizes="(min-width: 1024px) 68px, 64px"
                className="object-contain"
              />
            </div>

            {/* Text logo - height scales with screen width, width is capped by the space left */}
            <div className="relative h-[clamp(1.5rem,6.5vw,2.5rem)] min-w-0 max-w-[220px] flex-1 sm:h-12 sm:max-w-[270px] lg:h-[68px] lg:w-[270px] lg:flex-none">
              <Image
                src="/DBS%20Text%20Logo%20Navbar.png"
                alt="DBS Aesthetics Clinic & Salon"
                fill
                priority
                sizes="(min-width: 1024px) 270px, 60vw"
                className="object-contain object-left"
              />
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
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[#232323] transition-all duration-300 bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)] hover:brightness-110 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)]"
            >
              Book Appointment
            </Link>
          </div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex size-11 min-h-11 min-w-11 shrink-0 grow-0 basis-11 items-center justify-center rounded-full border border-white/10 bg-white/5 p-0 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 lg:hidden"
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
                  className="flex min-w-0 flex-1 items-center gap-1"
                >
                  {/* Mobile icon logo - fixed size */}
                  <div className="relative h-[clamp(2.75rem,13vw,3.5rem)] w-[clamp(2.75rem,13vw,3.5rem)] shrink-0 grow-0 sm:h-16 sm:w-16">
                    <Image
                      src="/DBS_Logo.png"
                      alt="DBS_Logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile text logo - scales with screen, capped by remaining space */}
                  <div className="relative h-[clamp(1.5rem,7vw,2.25rem)] min-w-0 max-w-[200px] flex-1">
                    <Image
                      src="/DBS%20Text%20Logo%20Navbar.png"
                      alt="DBS Aesthetics Clinic & Salon"
                      fill
                      sizes="60vw"
                      className="object-contain object-left"
                    />
                  </div>
                </Link>

                {/* Close Button - fixed circle */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    relative
                    ml-3
                    size-12
                    min-h-12
                    min-w-12
                    shrink-0
                    grow-0
                    basis-12
                    p-0
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
