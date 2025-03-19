"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export const MaskedComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 0;

  return (
    <main className="h-screen bg-black opacity-[0.85]">
      <motion.div
        className="w-full h-full flex items-center justify-center absolute bg-red-500"
        style={{
          maskImage: 'url("/assets/mask.svg")',
          maskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-[64px] w-[1000px] p-[40px] text-white font-dm font-bold"
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center">
        <p className="w-[1000px] p-[40px] text-[64px] text-white font-dm font-bold">
          I'm a<span className="text-[#ec4e39]"> selectively skilled </span>
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </main>
  );
};
