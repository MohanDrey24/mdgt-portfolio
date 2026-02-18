import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
interface CardProps {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  index: number;
}

export const Card = ({
  title,
  description,
  src,
  link,
  color,
  index,
}: CardProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });

  return (
    <div
      ref={container}
      className="sticky top-0 h-screen flex items-center justify-center"
    >
      <motion.div
        style={{ 
          scale,
          backgroundColor: color,
        }}
        className="flex items-center justify-center w-full h-full rounded-xl"
      >
        {title}
      </motion.div>
    </div>
  );
};
