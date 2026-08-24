"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { 
  FaArrowRight, 
  FaGift,
  FaGem,
  FaMagic,
  FaBolt
} from "react-icons/fa";

const deals = [
  {
    id: 1,
    title: "Laser Hair Removal Suite",
    icon: <FaGem />,
    tag: "20% OFF",
    originalPrice: "PKR 25,000",
    discountedPrice: "PKR 20,000",
    description: "Full body smooth skin care with FDA-approved laser technology.",
    sessionType: "Full Package",
  },
  {
    id: 2,
    title: "Skin Rejuvenation Therapy",
    icon: <FaGem />,
    tag: "15% OFF",
    originalPrice: "PKR 35,000",
    discountedPrice: "PKR 29,750",
    description: "Youthful radiance with collagen boosting dermal therapy.",
    sessionType: "Full Package",
  },
  {
    id: 3,
    title: "PRP Hair Restoration",
    icon: <FaGem />,
    tag: "25% OFF",
    originalPrice: "PKR 45,000",
    discountedPrice: "PKR 33,750",
    description: "Natural plasma growth factor treatment for hair volume.",
    sessionType: "Full Package",
  },
  {
    id: 4,
    title: "Bridal Artistry & Glow",
    icon: <FaGem />,
    tag: "10% OFF",
    originalPrice: "PKR 55,000",
    discountedPrice: "PKR 49,500",
    description: "Comprehensive wedding prep makeover & skin therapy.",
    sessionType: "Full Package",
  },
  {
    id: 5,
    title: "Vampire Hydra Facial",
    icon: <FaGem />,
    tag: "30% OFF",
    originalPrice: "PKR 30,000",
    discountedPrice: "PKR 21,000",
    description: "Deep exfoliation, medical extraction and serum infusion.",
    sessionType: "Single Session",
  },
  {
    id: 6,
    title: "Body Sculpting & Contour",
    icon: <FaGem />,
    tag: "20% OFF",
    originalPrice: "PKR 40,000",
    discountedPrice: "PKR 32,000",
    description: "Targeted body tightening and sculpting solutions.",
    sessionType: "Full Package",
  },
];

// Quadruplicate for seamless edge-to-edge looping marquee
const infiniteDeals = [...deals, ...deals, ...deals, ...deals];

export function DealsSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue(0);
  
  // Get the total width of one set of deals
  const [cardWidth, setCardWidth] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {
      // Calculate the width of one complete set
      const containerWidth = containerRef.current.scrollWidth / 4; // Since we have 4 copies
      setCardWidth(containerWidth);
    }
  }, []);

  // Clean up any pending resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Continuous animation that doesn't restart
  useEffect(() => {
    if (cardWidth > 0 && !isPaused && !isDragging) {
      const controls = animate(x, -cardWidth, {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
      
      return controls.stop;
    }
  }, [x, cardWidth, isPaused, isDragging]);

  // Reset position when it reaches the end of one full cycle
  // Handles both the auto-scroll (always moves left) and manual
  // finger-dragging (which can move either direction), so the
  // marquee always wraps seamlessly instead of jumping.
  useEffect(() => {
    if (cardWidth > 0) {
      const unsubscribe = x.onChange((latest) => {
        if (latest <= -cardWidth) {
          x.set(latest + cardWidth);
        } else if (latest > 0) {
          x.set(latest - cardWidth);
        }
      });
      return unsubscribe;
    }
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
            Elevate your beauty routine with medical-grade treatments at special pricing.
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
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
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
              className="w-[280px] sm:w-[310px] md:w-[330px] lg:w-[350px] shrink-0"
            >
              {/* Deal Card */}
              <div className="group flex h-full min-h-[300px] flex-col justify-between rounded-[1.5rem] border border-[#c9ac6a]/20 bg-[#121212]/95 p-5 transition-all duration-300 hover:border-[#c9ac6a]/60 hover:shadow-[0_20px_50px_rgba(201,172,106,0.15)]">
                <div>
                  {/* Top Icon & Tag */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c9ac6a]/30 bg-[#c9ac6a]/15 text-sm text-[#c9ac6a] transition-transform duration-300 group-hover:scale-110">
                      {deal.icon}
                    </div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold text-[#232323] bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)]">
                    {deal.tag}
                  </span>
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
                  <div className="mt-4 flex flex-wrap items-baseline gap-3 border-t border-[#c9ac6a]/15 pt-4">
                    <span className="text-2xl font-serif font-bold text-[#c9ac6a]">
                      {deal.discountedPrice}
                    </span>
                    <span className="text-xs text-[#f7f2e9]/40 line-through">
                      {deal.originalPrice}
                    </span>
                  </div>
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





