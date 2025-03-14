"use client";

import {
  circOut,
  easeInOut,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import RotatingImage from "./RotatingImage";
import {
  dividerVariants,
  subTitleVariants,
  titleVariants,
} from "../utils/HeroVariants";
import { useRef } from "react";

export const NewHero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // useMotionValueEvent(scrollY, "change", (val) => {
  //   console.log(val);
  // });

  const positiveXPosition1 = useTransform(scrollY, [0, 100], ["0%", "15%"], {
    ease: easeInOut,
  });

  const positiveXPosition2 = useTransform(scrollY, [0, 100], ["0%", "20%"], {
    ease: easeInOut,
  });

  const negativeXPosition1 = useTransform(scrollY, [0, 100], ["0%", "-20%"], {
    ease: easeInOut,
  });

  const negativeXPosition2 = useTransform(scrollY, [0, 100], ["0%", "-20%"], {
    ease: easeInOut,
  });

  const negativeXPosition3 = useTransform(scrollY, [0, 100], ["0%", "-125%"], {
    ease: easeInOut,
  });

  return (
    <section className="h-screen w-screen bg-black opacity-[0.85] px-[24px]">
      <div className="flex flex-col">
        <div className="flex justify-between max-h-[192px] py-[24px]">
          <motion.span
            ref={targetRef}
            style={{ x: positiveXPosition1 }}
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.2)}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl lg:text-[144px] font-extrabold text-nowrap overflow-hidden"
          >
            Mohan Drey
          </motion.span>
          <motion.span
            ref={targetRef}
            style={{ x: positiveXPosition1 }}
            variants={subTitleVariants}
            initial="initial"
            animate="animate"
            transition={subTitleVariants.transition}
            className="hidden lg:block text-white font-dm font-bold"
          >
            Mid-Level Full Stack Developer
          </motion.span>
        </div>
        <motion.hr
          variants={dividerVariants}
          initial="initial"
          animate="animate"
          transition={dividerVariants.transition}
        />
      </div>

      <div className="flex flex-col max-h-[192px]">
        <div className="flex items-center py-[24px]">
          <RotatingImage
            src="/assets/windmill.svg"
            alt="windmill"
            className="w-18 h-18 sm:w-25 sm:h-25 md:w-32 md:h-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [0, 720],
            }}
            transition={{
              delay: 0.2,
              duration: 3,
              ease: "easeOut",
            }}
          />
          <motion.span
            ref={targetRef}
            style={{ x: negativeXPosition1 }}
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.4)}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold ml-auto"
          >
            Tampon
          </motion.span>
        </div>
        <motion.hr
          variants={dividerVariants}
          initial="initial"
          animate="animate"
          transition={dividerVariants.transition}
        />
      </div>

      <div className="flex flex-col max-h-[192px]">
        <div className="flex justify-between items-center py-[24px]">
          <motion.span
            ref={targetRef}
            style={{ x: positiveXPosition2 }}
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.6)}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold text-nowrap"
          >
            Full Stack
          </motion.span>
          <RotatingImage
            src="/assets/clover.svg"
            alt="clover"
            className="w-18 h-18 sm:w-25 sm:h-25 md:w-32 md:h-32"
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [0, 720],
            }}
            transition={{
              delay: 0.2,
              duration: 3,
              ease: "easeOut",
            }}
          />
        </div>
        <motion.hr
          variants={dividerVariants}
          initial="initial"
          animate="animate"
          transition={dividerVariants.transition}
        />
      </div>

      <div className="flex flex-col max-h-[192px]">
        <div className="flex py-[24px]">
          <motion.div
            ref={targetRef}
            style={{ x: negativeXPosition3 }}
            variants={subTitleVariants}
            initial="initial"
            animate="animate"
            transition={subTitleVariants.transition}
            className="hidden lg:flex lg:flex-col text-white font-dm font-bold"
          >
            <span>Cebu City</span>
            <span>-Philippines</span>
          </motion.div>
          <motion.span
            ref={targetRef}
            style={{ x: negativeXPosition2 }}
            variants={titleVariants}
            initial="initialLabel"
            animate="animateLabel"
            transition={titleVariants.transition(0.8)}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold ml-auto"
          >
            Developer
          </motion.span>
        </div>
        <motion.hr
          variants={dividerVariants}
          initial="initial"
          animate="animate"
          transition={dividerVariants.transition}
        />
      </div>
    </section>
  );
};
