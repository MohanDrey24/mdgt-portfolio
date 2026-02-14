import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CardProps {
  title: string;
  company: string;
  jobDate: string;
  experience: string[];
  technologies: string[];
  color: string;
  index: number;
}

export const Card = ({
  title,
  company,
  jobDate,
  color,
  technologies,
  index,
  experience,
}: CardProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  const tabWidth = 600;
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
          fontSize: "20px",
        }}
      >
        {title}
      </div>

      {/* Card Body */}
      <div
        style={{
          backgroundColor: color,
          top: `${tabHeight}px`,
          height: `calc(100% - ${tabHeight}px)`,
          zIndex: 100 - index,
          padding: "2rem",
        }}
        className="rounded-none absolute left-0 w-full flex"
      >
        <div className="*:font-dm">
          <h1 className="font-bold text-5xl">{title}</h1>
          <h2 className="font-bold text-3xl">{company}</h2>
          <h3 className="text-2xl">{jobDate}</h3>
          <ul className="list-disc pl-5 mt-4">
            {experience.map((item, key) => (
              <li className="text-2xl" key={key}>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-6">
            {technologies.map((tech, key) => (
              <span
                key={key}
                className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm w-fit whitespace-nowrap border border-black"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
