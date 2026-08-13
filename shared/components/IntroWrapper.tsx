"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useIntroAnimation } from "@/shared/hooks/useIntroAnimation";
import { IntroAnimation } from "./IntroAnimation";

interface IntroWrapperProps {
  children: React.ReactNode;
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const { showIntro, completeIntro } = useIntroAnimation();
  const [shouldUnblur, setShouldUnblur] = useState(false);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShouldUnblur(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShouldUnblur(true);
    }
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={completeIntro} />}
      </AnimatePresence>

      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{
          filter: shouldUnblur ? "blur(0px)" : "blur(10px)",
          opacity: shouldUnblur ? 1 : 0,
        }}
        transition={{
          filter: { duration: 0.8, ease: "easeOut" },
          opacity: { duration: 0.8, ease: "easeOut" },
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </>
  );
}
