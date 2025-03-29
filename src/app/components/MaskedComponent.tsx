"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export const MaskedComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { x, y } = useMousePosition(containerRef);
  const size = isHovered ? 400 : 0;

  return (
    <main className="h-screen bg-black opacity-[0.85] overflow-hidden">
      <motion.div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center absolute bg-red-500"
        style={{
          maskImage: 'url("/assets/mask.svg")',
          maskRepeat: "no-repeat",
          WebkitMaskSize: "0px",
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
          className="max-w-[90vw] p-[5vw] text-4xl md:text-6xl lg:text-[64px] text-white font-dm font-bold"
        >
          A web developer - with skills that haven't been replaced by A.I (yet)
          - making good shit only if the paycheck is equally good.
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
          className="max-w-[90vw] p-[5vw] text-4xl md:text-6xl lg:text-[64px] text-white font-dm font-bold"
        >
          I'm a versatile
          <span className="text-red-500"> full-stack developer</span> dedicated
          to crafting efficient & meaningful digital experiences from front to
          back.
        </motion.p>
      </div>
    </main>
  );
};
