"use client";

import HorizontalScroll from "./components/HorizontalScroll";
import Hero from "./components/Hero";
import ParticlesContainer from "./components/ParticlesContainer";
import ScrollIndicator from "./components/ScrollIndicator";
import { useEffect, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const hasReachedBottom =
        Math.abs(scrollTop + clientHeight - scrollHeight) < 1;

      if (hasReachedBottom) {
        console.log("THE BOTTOM HAS BEEN REACHED");
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", onScroll);

      return () => {
        container.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <main ref={containerRef} className="bg-amber-600 flex flex-col">
      <ParticlesContainer />
      <Hero />
      <HorizontalScroll />
      <ScrollIndicator />
    </main>
  );
}
