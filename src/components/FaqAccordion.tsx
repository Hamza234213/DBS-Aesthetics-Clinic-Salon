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
            className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
              isOpen 
                ? "border-[#c9ac6a] bg-[#1f1f1f] shadow-[0_0_30px_rgba(201,172,106,0.05)]" 
                : "border-[#c9ac6a]/20 bg-[#1f1f1f] hover:border-[#c9ac6a]/40"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left  transition-colors duration-300"
            >
              <span className={`text-lg font-medium transition-colors duration-300 ${
                isOpen ? "text-[#c9ac6a]" : "text-[#f7f2e9]"
              }`}>
                {item.question}
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-[#c9ac6a] flex-shrink-0 ml-4"
              >
                {isOpen ? "×" : "+"}
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
                  <p className="px-6 pb-6 text-sm leading-7 text-[#f7f2e9]/70">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}