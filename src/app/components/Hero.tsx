"use client";

import { styles } from "../style";
import ComputersCanvas from "./canvas/Computers";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";

const Hero = ({
  heroText,
  isComputerVisible = true,
}: {
  heroText: string[];
  isComputerVisible: boolean;
}) => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div>
          <motion.h1
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className={`${styles.heroHeadText}`}
          >
            HI, I&apos;M <span className="text-[#D32F2F]">MOHAN DREY</span>
          </motion.h1>

          <TypewriterEffect
            className={`${styles.heroSubText} mt-2`}
            letterDelayTime={0.055}
            cursorFadeTime={0.155}
            text={heroText}
          />
        </div>
      </div>

      {isComputerVisible && <ComputersCanvas />}
    </section>
  );
};

export default Hero;
