"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ================= FEATHER SVG ================= */}
        <motion.div
          className="fixed left-1/2 top-1/2 z-[10000] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1, 0.3],
            x: [0, 0, -520],
            y: [0, -80, -320],
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -4, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src="/goldenFeather.png"
              alt="Golden Feather"
              width={160}
              height={480}
              priority
            />
          </motion.div>
        </motion.div>

        {/* ================= CURTAINS ================= */}
        <motion.div
          className="absolute top-0 left-0 h-full w-1/2 bg-background z-20"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full w-1/2 bg-background z-20"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* ================= LOGO ================= */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [1.2, 1, 1, 0.9] }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              times: [0, 0.3, 0.8, 1],
            }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-gradient">
              UTSAVAM
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
