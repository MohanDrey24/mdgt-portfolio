"use client";

import HorizontalScroll from "../components/HorizontalScroll";
import { NewHero } from "../components/NewHero";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

const Sample = () => {
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
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      <NewHero />
      <HorizontalScroll />
    </ReactLenis>
  );
};

export default Sample;
