"use client";

import { useEffect, useState } from "react";

export function SlashGateLoader() {
  const [percent, setPercent] = useState(0);
  const [isExit, setIsExit] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading duration
    const intervalTime = 20; // 20ms steps
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextPercent = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setPercent(nextPercent);

      if (nextPercent >= 100) {
        clearInterval(interval);
        setIsExit(true);
        // Remove from DOM after fade-out transition completes
        setTimeout(() => {
          setIsDestroyed(true);
        }, 700);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (isDestroyed) {
    return null;
  }

  // translateY goes from 120% (empty) to 0% (full)
  const translateY = 120 - percent * 1.2;

  return (
    <div
      id="splash"
      className={isExit ? "splash-exit" : ""}
      aria-hidden="true"
    >
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className="splash-logo-bg" />
          <div
            id="splash-wave-container"
            className="splash-wave-container"
            style={{ transform: `translateY(${translateY}%)` }}
          >
            <svg className="splash-wave" viewBox="0 0 240 28" preserveAspectRatio="none">
              <path d="M 0 15 Q 30 5, 60 15 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
            </svg>
            <svg className="splash-wave splash-wave-back" viewBox="0 0 240 28" preserveAspectRatio="none">
              <path d="M 0 15 Q 30 25, 60 15 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
            </svg>
          </div>
        </div>
        <div className="splash-loading-text" dir="ltr">
          loading... <span>{percent}</span> %
        </div>
      </div>
    </div>
  );
}
