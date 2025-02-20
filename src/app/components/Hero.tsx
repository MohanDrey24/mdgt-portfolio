"use client";

import { styles } from "../style";
import ComputersCanvas from "./canvas/Computers";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";

const Hero = () => {
  const heroText = [
    "I am a full-stack web developer who makes web applications.",
  ];

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
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I&apos;m <span className="text-[#763568]">Mohan Drey</span>
          </motion.h1>

          <TypewriterEffect
            className={`${styles.heroSubText} text-white mt-2`}
            letterDelayTime={0.15}
            cursorFadeTime={0.15}
            text={heroText}
          />
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
