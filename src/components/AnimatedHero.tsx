"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedHero({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
      {children}
    </motion.div>
  );
}
