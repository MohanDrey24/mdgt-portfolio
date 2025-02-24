"use client";

import { motion } from "framer-motion";

import RotatingImage from "./RotatingImage";

export const NewHero = () => {
  const titleVariants = {
    initialLabel: {
      opacity: 0,
      y: 100,
      rotateX: 90,
      skew: -10,
    },
    animateLabel: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      skew: 0,
    },
    transition: (delay: number) => ({
      delay,
      duration: 0.8,
      ease: "easeInOut",
    }),
  };

  return (
    <section className="h-screen w-screen bg-black opacity-[0.85] space-y-10 p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <motion.span
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.2)}
            className="text-white font-dm text-6xl sm:text-9xl font-extrabold mb-10 text-nowrap overflow-hidden"
          >
            Mohan Drey
          </motion.span>
          <motion.span className="hidden lg:block text-white font-dm font-bold mt-5">
            Mid-Level Full Stack Developer
          </motion.span>
        </div>
        <motion.hr
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex">
          <RotatingImage
            src="/assets/windmill.svg"
            alt="windmill"
            height={120}
            width={120}
            animate={{
              rotate: [0, 720],
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          />
          <motion.span
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.4)}
            className="text-white font-dm text-6xl sm:text-9xl font-extrabold self-end mb-10 ml-auto"
          >
            Tampon
          </motion.span>
        </div>
        <motion.hr
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <motion.span
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.6)}
            className="text-white font-dm text-6xl sm:text-9xl font-extrabold mb-10 text-nowrap"
          >
            Full Stack
          </motion.span>
          <RotatingImage
            src="/assets/clover.svg"
            alt="clover"
            animate={{
              rotate: [0, 720],
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          />
        </div>
        <motion.hr
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex">
          <span className="hidden lg:block text-white font-dm font-bold">
            Cebu - Philippines
          </span>
          <motion.span
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.8)}
            className="text-white font-dm text-6xl sm:text-9xl font-extrabold mb-10 ml-auto"
          >
            Developer
          </motion.span>
        </div>
        <motion.hr
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};
