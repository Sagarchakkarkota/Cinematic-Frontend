"use client";

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
      }, 850);
      return () => clearTimeout(timer);
    }

    setShouldUnblur(true);
  }, [showIntro]);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={completeIntro} />}

      <div className={`site-shell ${shouldUnblur ? "is-ready" : ""}`}>
        {children}
      </div>
    </>
  );
}
