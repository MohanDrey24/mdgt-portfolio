"use client";

import Hero from "./components/Hero";
import useProgressStore from "./stores/useProgressStore";

export default function Home() {
  const progress = useProgressStore((state) => state.progress);
  const isLoaded = useProgressStore((state) => state.isLoaded);

  return (
    <div className="relative z-0 bg-primary">
      {/* {progress} */}
      <div className="bg-amber-400">
        <Hero />
      </div>
    </div>
  );
}
