"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaArrowRight, FaGift, FaRegClock } from "react-icons/fa";

const deals = [
  {
    id: 1,
    title: "Laser Hair Removal Full Body",
    tag: "23% OFF",
    originalPrice: "PKR 65,000",
    discountedPrice: "PKR 50,000",
    description:
      "Unlimited Sessions of Full body Hair Removal with FDA-approved laser technology.",
    sessionType: "Full Package",
  },
  {
    id: 2,
    title: "Hair PRGF/PRP",
    tag: "50% OFF",
    originalPrice: "PKR 30,000",
    discountedPrice: "PKR 15,000",
    description:
      "Hair restoration treatment that strengthens follicles and promotes natural hair growth.",
    sessionType: "Full Package",
  },
  {
    id: 3,
    title: "Hair Exosomes",
    tag: "60% OFF",
    originalPrice: "PKR 100,000",
    discountedPrice: "PKR 40,000",
    description:
      "Hair restoration treatment to support follicle health and promote fuller-looking hair.",
    sessionType: "Full Package",
  },
  {
    id: 4,
    title: "B.B Glow Facial with Free Hair PRP",
    tag: "10% OFF",
    originalPrice: "PKR 55,000",
    discountedPrice: "PKR 49,500",
    description: "Comprehensive wedding prep makeover & skin therapy.",
    sessionType: "Full Package",
  },
  {
    id: 5,
    title: "Korean Diamond Hydra Facial with Free Cocktail Frequency",
    tag: "Upto 25% OFF",
    originalPrice: "PKR 12,000",
    discountedPrice: "PKR 3,000",
    // Only this deal shows two price options instead of a single price
    prices: [
      { label: "5 Steps", price: "PKR 3,000" },
      { label: "15 Steps", price: "PKR 6,000" },
    ],
    description: "Deep exfoliation, medical extraction and serum infusion.",
    sessionType: "Single Session",
  },
  {
    id: 6,
    title: "Whitening Drips 3 Sessions with Free Diamond Glass Skin Facial",
    tag: "50% OFF",
    originalPrice: "PKR 24,000",
    discountedPrice: "PKR 32,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 7,
    title: "Full Body Whitening Peel with Free Under Arms & Under Legs Laser",
    tag: "50% OFF",
    originalPrice: "PKR 24,000",
    discountedPrice: "PKR 32,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 8,
    title: "Laser Hair Removal (6 Sessions)",
    tag: "70% OFF",
    originalPrice: "PKR 60,000",
    discountedPrice: "PKR 15,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 9,
    title: "Full Body Laser (Unlimited Sessions)",
    tag: "23% OFF",
    originalPrice: "PKR 65,000",
    discountedPrice: "PKR 50,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 10,
    title: "NA D+IV Therapy",
    tag: "50% OFF",
    originalPrice: "PKR 16,000",
    discountedPrice: "PKR 8,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 11,
    title: "Lip Filler",
    tag: "50% OFF",
    originalPrice: "PKR 24,000",
    discountedPrice: "PKR 12,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 12,
    title: "Lipo & Lemon Bottle",
    tag: "50% OFF",
    originalPrice: "PKR 24,000",
    discountedPrice: "PKR 12,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 13,
    title: "Scars Therapy (6 Sessions) with Free Hydra Facial",
    tag: "50% OFF",
    originalPrice: "PKR 40,000",
    discountedPrice: "PKR 25,000",
    perSession: "Each Session PKR 6,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 14,
    title: "3 PRGF + PRP Sessions with 2 Free Head Washes & Unlimited Grafts",
    discountedPrice: "PKR 95,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 15,
    title: "Hydra Facial with Free Carbon Laser",
    discountedPrice: "PKR 6,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
  {
    id: 16,
    title: "Eyebrow Microblading with Free Eye Lash Curl",
    tag: "45% OFF",
    originalPrice: "PKR 15,000",
    discountedPrice: "PKR 8,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
];

// Seconds the slider takes to scroll one full set of deals (lower = faster)
const LOOP_SECONDS = 80;

// Quadruplicate for seamless edge-to-edge looping marquee
const infiniteDeals = [...deals, ...deals, ...deals, ...deals];

export function DealsSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // First card of set 1 and first card of set 2: the distance between them is
  // the exact width of one full set (cards + gaps).
  const firstCardRef = useRef<HTMLDivElement>(null);
  const nextSetCardRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue(0);

  // Get the total width of one set of deals
  const [cardWidth, setCardWidth] = useState(0);

  // Measure the EXACT width of one set of deals (cards + gaps) and keep it
  // up to date. If this number is even slightly wrong, the loop "wraps" at the
  // wrong place and the slider jumps back a few cards.
  useEffect(() => {
    const measure = () => {
      const first = firstCardRef.current;
      const next = nextSetCardRef.current;
      if (!first || !next) return;
      const width = next.offsetLeft - first.offsetLeft;
      if (width > 0) {
        setCardWidth((prev) => (Math.abs(prev - width) < 0.5 ? prev : width));
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (firstCardRef.current) observer.observe(firstCardRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Clean up any pending resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Continuous auto-scroll at a CONSTANT speed.
  // The duration is calculated from the distance left to travel, so pausing
  // and resuming (hover / drag) never changes how fast the slider moves.
  useEffect(() => {
    if (cardWidth <= 0 || isPaused || isDragging) return;

    let controls: ReturnType<typeof animate> | undefined;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;

      // x always sits between -cardWidth and 0, so this is the distance
      // left until the end of one full cycle.
      const remaining = cardWidth + x.get();

      controls = animate(x, -cardWidth, {
        duration: (remaining / cardWidth) * LOOP_SECONDS,
        ease: "linear",
        onComplete: () => {
          if (cancelled) return;
          x.set(0); // jump back to the start of the next cycle (seamless)
          run();
        },
      });
    };

    run();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [x, cardWidth, isPaused, isDragging]);

  // Reset position when it reaches the end of one full cycle
  // Handles both the auto-scroll (always moves left) and manual
  // finger-dragging (which can move either direction), so the
  // marquee always wraps seamlessly instead of jumping.
  useEffect(() => {
    if (cardWidth <= 0) return;

    // If the set width changed (resize / breakpoint), pull x back into range.
    const current = x.get();
    if (current <= -cardWidth || current > 0) {
      const r = current % cardWidth;
      x.set(r > 0 ? r - cardWidth : r);
    }

    const unsubscribe = x.on("change", (latest) => {
      if (latest <= -cardWidth) {
        x.set(latest + cardWidth);
      } else if (latest > 0) {
        x.set(latest - cardWidth);
      }
    });
    return unsubscribe;
  }, [x, cardWidth]);

  return (
    <section className="relative w-full overflow-hidden border-y border-[#c9ac6a]/20 bg-[#0a0a0a] py-12 sm:py-14 lg:py-16">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#c9ac6a]/5 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c9ac6a]/5 blur-3xl sm:h-96 sm:w-96" />

      {/* Header Container (Padded) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="min-w-0">
          {/* Badge */}
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/10 px-3 py-1.5 backdrop-blur-sm sm:px-4">
            <FaGift className="shrink-0 text-[10px] text-[#c9ac6a] sm:text-xs" />
            <span className="truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c9ac6a] sm:text-xs sm:tracking-[0.25em]">
              Exclusive Packages
            </span>
          </div>

          {/* Heading */}
          <h2 className="max-w-3xl text-2xl font-semibold font-serif leading-tight text-[#f7f2e9] sm:text-3xl md:text-4xl lg:text-5xl">
            Limited-Time Aesthetic Deals
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#f7f2e9]/65 sm:text-sm md:text-base">
            Elevate your beauty routine with medical-grade treatments at special
            pricing.
          </p>
        </div>
      </div>

      {/* Full-Width Screen Marquee Slider */}
      <div
        ref={containerRef}
        className="relative z-10 w-full overflow-hidden py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-5 sm:gap-6 w-max cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ x }}
          drag="x"
          dragElastic={1}
          dragMomentum={true}
          onDragStart={() => {
            if (resumeTimeoutRef.current)
              clearTimeout(resumeTimeoutRef.current);
            setIsDragging(true);
          }}
          onDragEnd={() => {
            // Give inertia a moment to settle before the auto-scroll
            // takes back over, so it doesn't snap mid-flick.
            resumeTimeoutRef.current = setTimeout(() => {
              setIsDragging(false);
            }, 600);
          }}
        >
          {infiniteDeals.map((deal, index) => (
            <div
              key={`${deal.id}-${index}`}
              ref={
                index === 0
                  ? firstCardRef
                  : index === deals.length
                    ? nextSetCardRef
                    : undefined
              }
              className="w-[280px] sm:w-[310px] md:w-[330px] lg:w-[350px] shrink-0"
            >
              {/* Deal Card */}
              <div className="group flex h-full min-h-[300px] flex-col justify-between rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[#121212]/95 p-5 transition-all duration-300 hover:border-[#c9ac6a]/60 hover:shadow-[0_20px_50px_rgba(201,172,106,0.15)]">
                <div>
                  {/* Top Ribbon & Tag */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    {/* Beauty Hour ribbon + text */}
                    <div className="-mt-5 flex min-w-0 items-start gap-2.5">
                      <div
                        className="flex h-[122px] w-[62px] shrink-0 flex-col items-center px-1 pt-3 text-[#1a1205] bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)",
                        }}
                      >
                        <FaRegClock
                          className="text-[28px]"
                          style={{ stroke: "currentColor", strokeWidth: 1 }}
                        />
                        <span className="mt-1.5 whitespace-nowrap font-serif text-[12.5px] font-extrabold">
                          1 - 6 pm
                        </span>
                        <span className="my-1.5 h-[2px] w-9 bg-[#1a1205]/60" />
                        <span className="text-center text-[9px] font-black uppercase leading-tight tracking-[0.14em]">
                          Special
                          <br />
                          Deals
                        </span>
                      </div>
                      <h4 className="pt-3 pl-3 font-serif text-xl font-bold leading-[1.05] text-transparent bg-clip-text bg-[linear-gradient(135deg,#c9a55c_0%,#f4d98a_50%,#b8893f_100%)] sm:text-2xl">
                        Beauty
                        <br />
                        Hour
                      </h4>
                    </div>
                    {deal.tag && (
                      <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold text-[#232323] bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)]">
                        {deal.tag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#f7f2e9] transition-colors duration-300 group-hover:text-[#c9ac6a]">
                    {deal.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-[#f7f2e9]/65 leading-relaxed min-h-[42px]">
                    {deal.description}
                  </p>

                  {/* Pricing */}
                  {deal.prices ? (
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#c9ac6a]/15 pt-4">
                      {deal.prices.map((option, i) => (
                        <div
                          key={option.label}
                          className={`min-w-0 ${i > 0 ? "border-l border-[#c9ac6a]/15 pl-3" : ""}`}
                        >
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7f2e9]/60">
                            {option.label}
                          </span>
                          <span className="mt-1 block whitespace-nowrap text-xl font-serif font-bold text-[#c9ac6a]">
                            {option.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 border-t border-[#c9ac6a]/15 pt-4">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-2xl font-serif font-bold text-[#c9ac6a]">
                          {deal.discountedPrice}
                        </span>
                        {deal.originalPrice && (
                          <span className="text-xs text-[#f7f2e9]/40 line-through">
                            {deal.originalPrice}
                          </span>
                        )}
                      </div>
                      {deal.perSession && (
                        <span className="mt-1 block text-[11px] font-bold uppercase tracking-wide text-[#f7f2e9]/85">
                          {deal.perSession}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* Claim Offer Button */}
                <div className="mt-5">
                  <Link
                    href={`/book-appointment?treatment=${encodeURIComponent(deal.title)}&session=${encodeURIComponent(deal.sessionType)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#232323] transition-all duration-300 bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)] hover:brightness-110 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)]"
                  >
                    <span>Claim Offer</span>
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
