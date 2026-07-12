"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function LiquidLogoLoader() {
  const [percent, setPercent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHiddenText, setIsHiddenText] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  const logoFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 3000; // 3 seconds loading duration
    let startTime: number | null = null;
    let animationFrameId: number;
    let isZooming = false;

    const animateLoad = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const progress = Math.min((elapsed / duration) * 100, 100);
      setPercent(Math.floor(progress));

      if (logoFillRef.current) {
        const height = logoFillRef.current.clientHeight || 88;
        
        // --- PERFECT LINEAR CORRECTION ---
        // The wave crest starts 100px down inside the 600px tall mask image.
        // We animate the mask vertically relative to the container height:
        // - At 0%: mask crest is at height (bottom of logo) -> startY = height - 100
        // - At 100%: mask crest is at 0 (top of logo) -> endY = -100
        const startY = height - 100;
        const travelDistance = height;
        
        const yPos = startY - (progress / 100) * travelDistance;
        const xPos = -(elapsed / 1500) * 400;

        logoFillRef.current.style.webkitMaskPosition = `${xPos}px ${yPos}px`;
        logoFillRef.current.style.maskPosition = `${xPos}px ${yPos}px`;
      }

      if (progress < 100) {
        animationFrameId = requestAnimationFrame(animateLoad);
      } else if (!isZooming) {
        isZooming = true;
        setTimeout(() => {
          setIsHiddenText(true);
          setIsZoomed(true);
          // Destroy loader and remove from DOM after zoom transition completes (800ms)
          setTimeout(() => {
            setIsDestroyed(true);
          }, 800);
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(animateLoad);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isDestroyed) {
    return null;
  }

  return (
    <div id="splash">
      <style>{`
        #splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: #1a1a1c; /* Deep dark environment */
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .logo-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Wrapper for the final zoom effect */
        .logo-wrapper {
          position: relative;
          width: 320px;
          height: 78px;
          display: inline-block;
          transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.8s ease-in;
        }

        @media (min-width: 640px) {
          .logo-wrapper {
            width: 440px;
            height: 107px;
          }
        }

        /* Transition Classes */
        .zoom-in {
          transform: scale(45);
          opacity: 0;
        }

        /* Common logo background properties */
        .logo-mask {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url("/light/logo.svg");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        /* Base Silhouette (Gray Logo) */
        .logo-base {
          opacity: 0.8;
          filter: grayscale(1) brightness(0.2);
        }

        /* The Magic Liquid Fill Logo (Masked by wave pattern) */
        .logo-fill {
          -webkit-mask-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Cpath d='M0,100 C100,70 100,130 200,100 C300,70 300,130 400,100 L400,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E");
          -webkit-mask-size: 400px 600px;
          -webkit-mask-repeat: repeat-x;
          mask-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Cpath d='M0,100 C100,70 100,130 200,100 C300,70 300,130 400,100 L400,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E");
          mask-size: 400px 600px;
          mask-repeat: repeat-x;
        }

        /* Loading counter positioning */
        .loading-text {
          position: absolute;
          bottom: -2.5rem;
          right: 0;
          color: #ffffff;
          font-size: 0.9rem;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          letter-spacing: 1px;
          transition: opacity 0.2s ease;
        }

        .hidden {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="logo-container">
        <div className={`logo-wrapper ${isZoomed ? "zoom-in" : ""}`}>
          <div className={cn("logo-mask logo-base")} />
          <div className={cn("logo-mask logo-fill")} ref={logoFillRef} />
        </div>
        <div className={`loading-text ${isHiddenText ? "hidden" : ""}`}>
          loading... <span>{percent}</span>%
        </div>
      </div>
    </div>
  );
}