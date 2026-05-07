"use client";

import SvgTiltBackground from "@/components/SVGTiltBackground";
import Link from "next/link";

export default function Custom404() {
  return (
    <SvgTiltBackground
      svgUrl="/svg/404.svg"
      className="min-h-screen bg-[var(--navy)]"
      svgClassName="text-[var(--navy)]/15 !opacity-25 drop-shadow-sm drop-shadow-white"
      fullPage
      scale={0.75}
    >
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-5xl font-bold mb-[15rem] md:mb-[5rem] text-foreground">Page Not Found</h2>
        <Link
          href="/"
          className="bg-[var(--blue)]/20 border border-2 border-[var(--blue)]/50 backdrop-blur-sm text-center max-w-sm w-full text-white p-2 text-xl font-bold rounded-md font-medium hover:bg-[#4A85B0] hover:scale-110 hover:!drop-shadow-[0_0_15px_var(--blue)]/50 drop-shadow-[0_0_5px_var(--blue)]/0 transition"
        >
          Go Home
        </Link>
      </main>
    </SvgTiltBackground>
  );
}
