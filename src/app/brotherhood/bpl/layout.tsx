"use client";

import Background from "./Background";
import BplNav from "./BplNav";
import PingPongBackground from "./PingPongBackground";

export default function BPLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Background />
      <PingPongBackground
        colorHexes={["#F06400", "#21ABCD"]}
        solidColorFraction={0.5}
        minSpawnDelayMs={300}
        maxSpawnDelayMs={1500}
        minRotationSpeed={0.1}
        maxRotationSpeed={2.5}
        edgePadding={3}
      />
      <BplNav />
      {children}
    </>
  );
}
