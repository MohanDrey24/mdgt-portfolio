"use client";

import { motion } from "framer-motion";

export const NewHero = () => {
  const initial = {
    opacity: 0,
    y: 100,
    rotateX: 90,
    skew: -10,
  };

  const animate = {
    opacity: 1,
    y: 0,
    rotateX: 0,
    skew: 0,
  };

  return (
    <section className="h-screen w-screen bg-black opacity-[0.85] space-y-10 p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <motion.span
            initial={initial}
            animate={animate}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="text-white font-dm text-6xl sm:text-9xl font-extrabold mb-10"
          >
            Mohan Drey
          </motion.span>
          <motion.span className="hidden lg:block text-white font-dm font-bold mt-5">
            Mid-Level Full Stack Developer
          </motion.span>
        </div>
        <hr />
      </div>

      <div className="flex flex-col gap-8">
        <motion.span
          initial={initial}
          animate={animate}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="text-white font-dm text-6xl sm:text-9xl font-extrabold self-end mb-10"
        >
          Tampon
        </motion.span>
        <hr />
      </div>

      <div className="flex flex-col gap-8">
        <motion.span
          initial={initial}
          animate={animate}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
          className="text-white font-dm text-6xl sm:text-9xl font-extrabold mb-10"
        >
          Full Stack
        </motion.span>
        <hr />
      </div>

      <div className="flex flex-col gap-8">
        <motion.span
          initial={initial}
          animate={animate}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeInOut" }}
          className="text-white font-dm text-6xl sm:text-9xl font-extrabold self-end mb-10"
        >
          Developer
        </motion.span>
        <hr />
      </div>
    </section>
  );
};
