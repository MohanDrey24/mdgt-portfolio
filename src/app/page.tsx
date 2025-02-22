"use client";

import HorizontalScroll from "./components/HorizontalScroll";
import Hero from "./components/Hero";
import ParticlesContainer from "./components/ParticlesContainer";
import ScrollIndicator from "./components/ScrollIndicator";
import { AuroraEffect } from "./components/AuroraEffect";

export default function Home() {
  const heroText = [
    "I am a full-stack web developer who makes web applications.",
  ];
  return (
    <main className="flex flex-col bg-[#E7EFF2FF]">
      {/* <ParticlesContainer /> */}
      <AuroraEffect />
      <Hero heroText={heroText} isComputerVisible={true} />
      <HorizontalScroll />
      <ScrollIndicator className="bottom-4 left-1/2" />
    </main>
  );
}
