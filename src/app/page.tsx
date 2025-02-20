"use client";

import HorizontalScroll from "./components/HorizontalScroll";
import Hero from "./components/Hero";
import ParticlesContainer from "./components/ParticlesContainer";

export default function Home() {
  return (
    <div className="bg-amber-600 flex flex-col">
      <ParticlesContainer />
      <Hero />
      <HorizontalScroll />
    </div>
  );
}
