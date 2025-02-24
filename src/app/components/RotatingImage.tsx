"use client";

import { motion, Transition, AnimationProps } from "framer-motion";
import Image from "next/image";
import { cn } from "../utils/cn";

const MotionImage = motion(Image);

type RotatingImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  initial?: AnimationProps["initial"];
  animate?: AnimationProps["animate"];
  transition?: Transition;
};

const RotatingImage = ({
  src,
  alt,
  className,
  width = 180,
  height = 180,
  initial,
  animate,
  transition,
}: RotatingImageProps) => {
  return (
    <MotionImage
      src={src}
      alt={alt}
      className={cn("", className)}
      whileHover={{ rotate: 720 }}
      width={width}
      height={height}
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ transformOrigin: "center" }}
    />
  );
};

export default RotatingImage;
