"use client";

import clsx from "clsx";
import React, { ReactNode, useEffect, useRef, useCallback } from "react";

type SvgTiltBackgroundProps = {
  children: ReactNode;
  svgUrl: string;
  className?: string;
  svgClassName?: string;
  maxTilt?: number;
  scale?: number;
  maskSize?: string;
  fullPage?: boolean;
  fadeIn?: boolean;

  glareColor?: string; // rgba-friendly: "255,255,255"
  glareOpacity?: number;
  glareSize?: string;
};

export default function SvgTiltBackground({
  children,
  svgUrl,
  className,
  svgClassName = "text-[var(--light-blue)]/10",
  maxTilt = 8,
  scale = 1.08,
  maskSize = "100% 100%",
  fullPage=false,
  fadeIn=true,

  glareColor = "255,255,255",
  glareOpacity = 0.22,
  glareSize = "28%",
}: SvgTiltBackgroundProps) {
  const bgRef = useRef<HTMLDivElement | null>(null);

  const setTilt = useCallback((x: number, y: number) => {
    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;

    const glareX = 50 - x * 80;
    const glareY = 50 - y * 80;

    bgRef.current?.style.setProperty("--rotate-x", `${rotateX}deg`);
    bgRef.current?.style.setProperty("--rotate-y", `${rotateY}deg`);
    bgRef.current?.style.setProperty("--glare-x", `${glareX}%`);
    bgRef.current?.style.setProperty("--glare-y", `${glareY}%`);
  }, [maxTilt]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    function updateFromScroll() {
      if (!media.matches) return;

      const scrollProgress =
        window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      const y = scrollProgress - 0.1;
      const x = Math.sin(scrollProgress * Math.PI * 2) * 0.25;

      setTilt(x, y);
    }

    function handleMouseMove(e: MouseEvent) {
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      setTilt(x, y);
    }

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll, { passive: true });

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      window.removeEventListener("mousemove", handleMouseMove)
    };
  }, [setTilt]);

  const maskStyles = {
    maskImage: `url(${svgUrl})`,
    WebkitMaskImage: `url(${svgUrl})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize,
    WebkitMaskSize: maskSize,
  };

  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={{ perspective: "900px" }}
    >
      <div
        ref={bgRef}
        className={clsx(
          "pointer-events-none absolute md:inset-0 top-0 left-0 right-0 h-screen transition-transform duration-300 ease-out",
          { "md:h-auto": fullPage },
          svgClassName
        )}
        style={
          {
            "--rotate-x": "0deg",
            "--rotate-y": "0deg",
            "--glare-x": "50%",
            "--glare-y": "50%",
            transform: `rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(${scale})`,
            transformStyle: "preserve-3d",
          } as React.CSSProperties
        }
      >
        <div
          className={clsx("absolute inset-0 mix-blend-screen", { "animate-fade-zoom": fadeIn })}
          style={{
            ...maskStyles,
            backgroundColor: "currentColor",
            backgroundImage: `
              radial-gradient(
                circle at var(--glare-x) var(--glare-y),
                rgba(${glareColor}, ${glareOpacity}) 0%,
                rgba(${glareColor}, ${glareOpacity * 0.45}) ${glareSize},
                transparent 55%
              )
            `,
            backgroundBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
