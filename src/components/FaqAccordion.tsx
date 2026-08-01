"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqAccordionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div
            key={item.question}
            className={`page-card overflow-hidden rounded-[1.75rem] transition-all duration-300 ${
              isOpen 
                ? "border-[#c9ac6a]/60 shadow-[0_0_40px_rgba(201,172,106,0.08)]" 
                : "border-[#c9ac6a]/20 hover:border-[#c9ac6a]/35 hover:shadow-[0_0_30px_rgba(201,172,106,0.05)]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300 group"
            >
              <div className="flex items-center gap-4">
                {/* Question number with gold styling */}
                <span className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border text-xs font-medium transition-all duration-300 ${
                  isOpen 
                    ? "border-[#c9ac6a] bg-[#c9ac6a]/10 text-[#c9ac6a]" 
                    : "border-[#c9ac6a]/20 text-[#c9ac6a]/40 group-hover:border-[#c9ac6a]/40 group-hover:text-[#c9ac6a]/60"
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  isOpen ? "text-[#c9ac6a]" : "text-[#f7f2e9] group-hover:text-[#f7f2e9]/90"
                }`}>
                  {item.question}
                </span>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ml-4 ${
                  isOpen 
                    ? "border-[#c9ac6a] bg-[#c9ac6a]/10 text-[#c9ac6a]" 
                    : "border-[#c9ac6a]/20 text-[#c9ac6a]/40 group-hover:border-[#c9ac6a]/40 group-hover:text-[#c9ac6a]/60"
                }`}
              >
                <svg 
                  className="h-4 w-4 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="relative">
                    {/* Gold accent line */}
                    <div className="mx-6 h-px bg-gradient-to-r from-[#c9ac6a]/40 via-[#c9ac6a]/20 to-transparent" />
                    
                    <div className="px-6 pb-6 pt-4">
                      <div className="flex gap-4">
                       
                        <p className="text-sm leading-7 text-[#f7f2e9]/80">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}