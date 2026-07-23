"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  title: string;
  quote: string;
  rating?: number;
  date?: string;
}

export function ReviewCard({ 
  name, 
  title, 
  quote, 
  rating = 5, 
  date 
}: ReviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div
      className={`relative rounded-2xl border-2 p-8 transition-all duration-300 cursor-pointer
        ${isHovered || isTapped 
          ? 'border-[#c9ac6a] shadow-[0_20px_60px_rgba(201,172,106,0.15)]' 
          : 'border-[#c9ac6a]/20  shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTapped(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsTapped(false), 300);
      }}
      onMouseDown={() => setIsTapped(true)}
      onMouseUp={() => {
        setTimeout(() => setIsTapped(false), 300);
      }}
      whileHover={{ 
        y: -5,
        scale: 1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
    

      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`transition-colors duration-300 ${
              i < rating 
                ? (isHovered || isTapped) 
                  ? 'text-[#c9ac6a]' 
                  : 'text-[#c9ac6a]/70' 
                : 'text-gray-600'
            }`}
            size={16}
          />
        ))}
      </div>

      {/* Quote text */}
      <motion.p 
        className={`text-lg leading-8 transition-colors duration-300 ${
          (isHovered || isTapped) 
            ? 'text-[#f7f2e9]' 
            : 'text-[#f7f2e9]/80'
        }`}
      >
        “{quote}”
      </motion.p>

      {/* Author info */}
      <div className="mt-6 pt-6 border-t border-[#c9ac6a]/10">
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              className={`font-semibold text-lg transition-colors duration-300 ${
                (isHovered || isTapped) 
                  ? 'text-[#c9ac6a]' 
                  : 'text-[#f7f2e9]'
              }`}
            >
              {name}
            </motion.p>
            <p className="text-sm text-[#c9ac6a]/70">{title}</p>
          </div>
          {date && (
            <span className="text-xs text-gray-500">{date}</span>
          )}
        </div>
      </div>

     
    
      
    </motion.div>
  );
}