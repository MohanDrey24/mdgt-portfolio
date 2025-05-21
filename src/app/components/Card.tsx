import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div
      ref={container}
      className="sticky top-0 h-screen flex items-center justify-center"
    >
      <div
        style={{ backgroundColor: color, top: `calc(-10% + ${index * 25}px)` }}
        className="flex items-center justify-center sm:w-[1000px] sm:h-[500px] w-full h-full sm:rounded-4xl rounded-none"
      >
        {title}
      </div>
    </div>
  );
};
