"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function SlashGateLoader() {
  const [isRendered, setIsRendered] = useState(true);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const slashLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doorLeft = doorLeftRef.current;
    const doorRight = doorRightRef.current;
    const mascot = mascotRef.current;
    const glow = glowRef.current;
    const slashLine = slashLineRef.current;

    if (!doorLeft || !doorRight || !mascot || !glow || !slashLine) return;

    const tl = gsap.timeline({
      onComplete: () => setIsRendered(false),
    });

    // 0s: Mascot + slash appear instantly
    tl.fromTo(mascot,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
      0
    )
    .fromTo(slashLine,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 0.3, ease: "power2.out" },
      0
    )
    .fromTo(glow,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power1.out" },
      0.05
    )

    // 0.35s: Doors sweep open along the / diagonal
    .to(doorLeft, {
      x: "-60%",
      y: "60%",
      duration: 0.75,
      ease: "power2.inOut",
    }, 0.35)
    .to(doorRight, {
      x: "60%",
      y: "-60%",
      duration: 0.75,
      ease: "power2.inOut",
    }, 0.35)
    .to(slashLine, {
      scaleX: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 0.4)
    .to(glow, {
      scale: 3,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, 0.4)
    .to(mascot, {
      scale: 1.4,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 0.45);

    return () => { tl.kill(); };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Left door — bottom-left side of the / slash */}
      <div
        ref={doorLeftRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0b1124",
          clipPath: "polygon(0 0, 54% 0, 46% 100%, 0 100%)",
          willChange: "transform",
        }}
      />

      {/* Right door — top-right side of the / slash */}
      <div
        ref={doorRightRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0b1124",
          clipPath: "polygon(54% 0, 100% 0, 100% 100%, 46% 100%)",
          willChange: "transform",
        }}
      />

      {/* Diagonal slash line — the / seam between doors */}
      <div
        ref={slashLineRef}
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          width: "2px",
          height: "120%",
          background: "linear-gradient(180deg, transparent 0%, rgba(241,87,34,0.5) 15%, rgba(255,255,255,0.85) 50%, rgba(95,150,255,0.5) 85%, transparent 100%)",
          transform: "translateX(-50%) rotate(5deg) scaleY(0)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
          boxShadow: "0 0 12px rgba(241,87,34,0.3), 0 0 25px rgba(95,150,255,0.15)",
        }}
      />

      {/* Diagonal glow — elongated ellipse along the / direction */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(5deg)",
          width: "100px",
          height: "70vh",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(241,87,34,0.22) 0%, rgba(37,59,122,0.1) 40%, transparent 70%)",
          filter: "blur(35px)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Mascot */}
      <div
        ref={mascotRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          zIndex: 2,
        }}
      >
        <Image
          src="/media/mascot/mascot.png"
          alt=""
          width={140}
          height={140}
          priority
          style={{
            width: "110px",
            height: "110px",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(241,87,34,0.45))",
          }}
        />
      </div>
    </div>
  );
}
