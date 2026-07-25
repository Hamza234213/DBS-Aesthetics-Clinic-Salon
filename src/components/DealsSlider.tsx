// components/DealsSlider.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const deals = [
  {
    id: 1,
    title: "LASER HAIR REMOVAL",
    icon: "✦",
  },
  {
    id: 2,
    title: "SKIN REJUVENATION",
    icon: "✦",
  },
  {
    id: 3,
    title: "PRP THERAPY",
    icon: "✦",
  },
  {
    id: 4,
    title: "BRIDAL ARTISTRY",
    icon: "✦",
  },
  {
    id: 5,
    title: "HYDRAFACIAL",
    icon: "✦",
  },
  {
    id: 6,
    title: "BODY CONTOURING",
    icon: "✦",
  },
];

export function DealsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;

    const animate = () => {
      if (!slider) return;
      
      scrollPosition += speed;
      
      // Reset when we've scrolled past the width of one set
      if (scrollPosition >= slider.scrollWidth / 2) {
        scrollPosition = 0;
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft = scrollPosition;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Duplicate deals for seamless looping
  const allDeals = [...deals, ...deals, ...deals, ...deals, ...deals, ...deals, ];

  return (
    <section className="relative py-8 overflow-hidden border-y border-[#c9ac6a]/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[#222221]" />
      
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent" />
      
      <div className="relative z-10 max-w-full mx-auto px-0">
        {/* Section Header */}
        <div className="text-center mb-6 px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.4em] font-semibold font-serif text-[#c9ac6a]">
            Exclusive Offers
          </p>
          <h2 className="mt-1 text-2xl font-semibold font-serif text-[#f7f2e9]">
            Limited Time Deals
          </h2>
        </div>

        {/* Slider - Continuous Auto Moving Right to Left */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-hidden py-4 px-4 sm:px-6 lg:px-8"
        >
          {allDeals.map((deal, index) => (
            <motion.div
              key={`${deal.id}-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <Link href="/book-appointment">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#c9ac6a]/20 bg-[#1a1a1a]/80 backdrop-blur-sm hover:border-[#c9ac6a]/60 hover:shadow-[0_10px_40px_rgba(201,172,106,0.1)] transition-all duration-300">
                  {/* Icon */}
                  <span className="text-[#c9ac6a] text-lg">✦</span>
                  
                  {/* Title */}
                  <span className="text-sm font-semibold text-[#f7f2e9] tracking-wider whitespace-nowrap">
                    {deal.title}
                  </span>
                
                  
                  {/* Plus icon */}
                  <span className="text-[#c9ac6a]/50 text-sm font-light ml-1">+</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}