import {
  easeInOut,
  MotionValue,
  useTransform,
  Variants,
  motion,
  Transition,
} from "framer-motion";
import React, { forwardRef, ReactNode } from "react";
import { cn } from "@/app/utils/cn";

type CustomVariants = Variants & {
  transition: ((delay: number) => Transition) | Transition;
};

interface AnimatedTextProps {
  children: ReactNode;
  scrollValue: MotionValue<number>;
  transformAmount: number;
  variants: CustomVariants;
  initialVariant: string;
  animateVariant: string;
  transitionDelay?: number;
  className?: string;
}

export const AnimatedText = forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      children,
      scrollValue,
      transformAmount,
      variants,
      initialVariant,
      animateVariant,
      transitionDelay = 0,
      className,
    },
    ref,
  ) => {
    const transform = useTransform(
      scrollValue,
      [0, 100],
      ["0%", `${transformAmount}%`],
      { ease: easeInOut },
    );

    const transitionValue =
      typeof variants.transition === "function"
        ? variants.transition(transitionDelay)
        : variants.transition;

    return (
      <motion.span
        ref={ref}
        style={{ x: transform }}
        variants={variants}
        initial={initialVariant}
        animate={animateVariant}
        transition={transitionValue}
        className={cn("flex items-center min-h-[72px]", className)}
      >
        {children}
      </motion.span>
    );
  },
);

AnimatedText.displayName = "AnimatedText";
