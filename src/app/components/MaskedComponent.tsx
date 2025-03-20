"use client";

import { useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export const MaskedComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { x, y } = useMousePosition(containerRef);
  const size = isHovered ? 400 : 0;

  // Add viewport scroll detection
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  return (
    <main className="h-screen bg-black opacity-[0.85]">
      <motion.div
        ref={containerRef}
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
        <motion.p
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-[64px] w-[1000px] p-[40px] text-white font-dm font-bold cursor-none"
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </motion.p>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="w-[1000px] p-[40px] text-[64px] text-white font-dm font-bold"
        >
          I'm a<span className="text-[#ec4e39]"> selectively skilled </span>
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </motion.p>
      </div>
    </main>
  );
};
