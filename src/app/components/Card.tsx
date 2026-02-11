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
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={container} className="sticky top-0 h-screen">
      <div
        style={{
          backgroundColor: color,
          position: "absolute",
          left: 0,
          top: `${Math.min(index * 25, 75)}%`,
          width: "100%",
          height: `calc(100% - ${Math.min(index * 25, 75)}%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100 - index,
        }}
        className="rounded-none"
      >
        {title}
      </div>
    </div>
  );
};
