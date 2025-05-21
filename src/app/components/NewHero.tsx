"use client";

import RotatingImage from "./RotatingImage";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import { motion, useScroll } from "framer-motion";
import {
  dividerVariants,
  subTitleVariants,
  titleVariants,
} from "../utils/HeroVariants";

export const NewHero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="h-screen w-screen bg-black opacity-[0.85] px-[24px]">
      <div className="flex flex-col">
        <div className="flex justify-between max-h-[192px] py-[24px]">
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={15}
            variants={titleVariants}
            initialVariant="initialLabel"
            animateVariant="animateLabel"
            transitionDelay={0.2}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl lg:text-[144px] font-extrabold text-nowrap overflow-hidden"
          >
            Mohan Drey
          </AnimatedText>
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={5}
            variants={subTitleVariants}
            initialVariant="initial"
            animateVariant="animate"
            className="hidden lg:block text-white font-dm font-bold"
          >
            Mid-Level Full Stack Developer
          </AnimatedText>
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
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={-20}
            variants={titleVariants}
            initialVariant="initialLabel"
            animateVariant="animateLabel"
            transitionDelay={0.4}
            className="text-white font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold ml-auto"
          >
            Tampon
          </AnimatedText>
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
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={20}
            variants={titleVariants}
            initialVariant="initialLabel"
            animateVariant="animateLabel"
            transitionDelay={0.6}
            className="text-red-500 font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold text-nowrap"
          >
            Full Stack
          </AnimatedText>
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
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={-125}
            variants={subTitleVariants}
            initialVariant="initial"
            animateVariant="animate"
            className="hidden lg:flex lg:flex-col text-white font-dm font-bold"
          >
            <span>Cebu City</span>
            <span>-Philippines</span>
          </AnimatedText>
          <AnimatedText
            ref={targetRef}
            scrollValue={scrollY}
            transformAmount={-20}
            variants={titleVariants}
            initialVariant="initialLabel"
            animateVariant="animateLabel"
            transitionDelay={0.8}
            className="text-red-500 font-dm text-5xl sm:text-8xl md:text-9xl xl:text-[144px] font-extrabold ml-auto"
          >
            Developer
          </AnimatedText>
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
