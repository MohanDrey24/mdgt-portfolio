"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface TypewriterEffectProps {
  text: string[];
  className?: string;
  letterDelayTime?: number;
  cursorFadeTime?: number;
  swapDelayTime?: number;
}

const TypewriterEffect = ({
  text,
  className,
  letterDelayTime = 0.125,
  cursorFadeTime = 0.225,
  swapDelayTime = 5500,
}: TypewriterEffectProps) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % text.length);
    }, swapDelayTime);

    return () => clearInterval(intervalId);
  }, [swapDelayTime, text]);

  return (
    <p className={cn("leading-relaxed", className)}>
      {text[exampleIndex].split("").map((l, i) => {
        return (
          <motion.span className="relative z-1000" key={`${l}-${i}`}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: i * letterDelayTime,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: i * letterDelayTime,
                times: [0, 0.1, 1],
                duration: cursorFadeTime,
                ease: "easeInOut",
              }}
              className="bg-black absolute bottom-[3px] left-[1px] right-0 top-[3px] z-0"
              // className="border-black border-r-2 absolute bottom-[3px] left-[1px] right-0 top-[3px]"
            />
          </motion.span>
        );
      })}
    </p>
  );
};

export default TypewriterEffect;
