"use client";

import HorizontalScroll from "./components/HorizontalScroll";
import Hero from "./components/Hero";
import ParticlesContainer from "./components/ParticlesContainer";
import ScrollIndicator from "./components/ScrollIndicator";

export default function Home() {
  return (
    <main className="flex flex-col">
      <ParticlesContainer />
      <Hero />
      <HorizontalScroll />
      <ScrollIndicator className="bottom-4 left-1/2" />
    </main>
  );
}
