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

  const tabWidth = 200;
  const tabHeight = 50;
  const tabOffset = index * tabWidth;

  return (
    <div ref={container} className="sticky top-0 h-screen">
      {/* Folder Tab */}
      <div
        style={{
          backgroundColor: color,
          position: "absolute",
          left: `${tabOffset}px`,
          top: 0,
          width: `${tabWidth}px`,
          height: `${tabHeight}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100 - index,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        {title}
      </div>
      
      {/* Card Body */}
      <div
        style={{
          backgroundColor: color,
          position: "absolute",
          left: 0,
          top: `${tabHeight}px`,
          width: "100%",
          height: `calc(100% - ${tabHeight}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100 - index,
          padding: "2rem",
        }}
        className="rounded-none"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};
