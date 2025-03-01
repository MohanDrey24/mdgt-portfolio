"use client";

import HorizontalScroll from "./components/HorizontalScroll";
import Hero from "./components/Hero";
// import ParticlesContainer from "./components/ParticlesContainer";
import ScrollIndicator from "./components/ScrollIndicator";
import { AuroraEffect } from "./components/AuroraEffect";
import { useEffect, useRef } from "react";
import { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { ReactLenis } from "lenis/react";

export default function Home() {
  const heroText = [
    "I am a full-stack web developer who makes web applications.",
  ];

  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      options={{ autoRaf: false, lerp: 0.05 }}
      ref={lenisRef}
      className="flex flex-col bg-[#E7EFF2FF]"
    >
      {/* <ParticlesContainer /> */}
      <AuroraEffect />
      <Hero heroText={heroText} isComputerVisible={true} />
      <HorizontalScroll />
      <ScrollIndicator className="bottom-4 left-1/2" />
    </ReactLenis>
  );
}
