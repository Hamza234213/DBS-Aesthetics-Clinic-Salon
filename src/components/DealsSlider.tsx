// components/DealsSlider.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const deals = [
  {
    id: 1,
    title: "LASER HAIR REMOVAL",
    icon: "✦",
    tag: "20% OFF",
  },
  {
    id: 2,
    title: "SKIN REJUVENATION",
    icon: "✦",
    tag: "15% OFF",
  },
  {
    id: 3,
    title: "PRP THERAPY",
    icon: "✦",
    tag: "25% OFF",
  },
  {
    id: 4,
    title: "BRIDAL ARTISTRY",
    icon: "✦",
    tag: "10% OFF",
  },
  {
    id: 5,
    title: "HYDRAFACIAL",
    icon: "✦",
    tag: "30% OFF",
  },
  {
    id: 6,
    title: "BODY CONTOURING",
    icon: "✦",
    tag: "20% OFF",
  },
];

export function DealsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.6;

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
  const allDeals = [...deals, ...deals, ...deals, ...deals, ...deals, ...deals];

  return (
    <section className="relative py-12 overflow-hidden border-y border-[#c9ac6a]/20">
      {/* Jet Black Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Metallic Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9ac6a]/5 via-transparent to-[#c9ac6a]/5" />
      
      {/* Decorative gold gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-transparent" />
      
      {/* Gold glow spots */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[#c9ac6a]/5 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[#c9ac6a]/5 blur-3xl" />
      
      <div className="relative z-10 max-w-full mx-auto px-0">
        {/* Section Header with gold accents */}
       <div className="text-center mb-8 px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-center gap-4 mb-3">
    <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#c9ac6a]/40 to-[#c9ac6a]/20" />
    <p className="text-xs uppercase tracking-[0.4em] font-[Oswald] text-[#c9ac6a] font-medium">
      Exclusive Offers
    </p>
    <span className="h-px w-16 bg-gradient-to-l from-transparent via-[#c9ac6a]/40 to-[#c9ac6a]/20" />
  </div>
  
  <h2 className="mt-3 text-3xl md:text-4xl font-semibold font-[Patrick]">
    <span className="text-[#f7f2e9]">Limited Time</span>
    <span className="relative ml-3 text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] animate-shimmer">
      Deals
    </span>
    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/50 to-transparent" />
  </h2>
  
  <p className="mt-4 text-sm text-[#f7f2e9]/50 tracking-wide font-light">
    <span className="text-[#c9ac6a]">✦</span> Book now and save on premium treatments <span className="text-[#c9ac6a]">✦</span>
  </p>
</div>

        {/* Slider - Continuous Auto Moving Right to Left */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-hidden py-4 px-4 sm:px-6 lg:px-8"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {allDeals.map((deal, index) => (
            <motion.div
              key={`${deal.id}-${index}`}
              className="flex-shrink-0"
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 1.3 } 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/book-appointment">
                <div className="group relative flex items-center gap-4 px-7 py-4 rounded-full border border-[#c9ac6a]/20 bg-[#0a0a0a]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#c9ac6a]/60 hover:bg-[#0a0a0a]/90 ">
                  
                  {/* Gold glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#c9ac6a]/5 via-[#c9ac6a]/10 to-[#c9ac6a]/5" />
                  
                 
                 
                  {/* Icon with gold shimmer */}
                  <span className="text-[#c9ac6a] text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {deal.icon}
                  </span>
                  
                  {/* Title */}
                  <span className="text-sm font-semibold text-[#f7f2e9] tracking-wider whitespace-nowrap font-[Oswald]">
                    {deal.title}
                  </span>
                  
                  {/* Tag/Badge with gold gradient */}
                  <span className="px-3 py-1 text-xs font-medium text-[#0a0a0a] bg-gradient-to-r from-[#c9ac6a] to-[#f4d98a] rounded-full">
                    {deal.tag}
                  </span>
                  
                  {/* Arrow icon on hover */}
                  <motion.span 
                    className="text-[#c9ac6a]/40 text-sm transition-all duration-300 group-hover:text-[#c9ac6a] group-hover:translate-x-1"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}