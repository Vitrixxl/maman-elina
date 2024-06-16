"use client";
import React, { ReactNode } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface TransitionWrapperProps {
  children: ReactNode;
}

export default function TransitionWrapper({
  children,
}: TransitionWrapperProps) {
  const path = usePathname();

  return (
    <AnimatePresence mode="wait">
      <m.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="h-full"
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
