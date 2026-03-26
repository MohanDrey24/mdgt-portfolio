import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface CardProps {
  projectId: number;
  title: string;
  description: string[];
  src: string;
  link: string;
  color: string;
  index: number;
  onFullyInView?: (projectId: number) => void;
}

export const Card = ({
  projectId,
  title,
  description,
  src,
  link,
  color,
  index,
  onFullyInView,
}: CardProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const stickyViewportRef = useRef<HTMLDivElement | null>(null);

  const [scaleValue, setScaleValue] = useState(1);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useMotionValueEvent(scale, "change", (latest) => {
    setScaleValue(latest);
  });

  useEffect(() => {
    if (!onFullyInView) return;
    if (!stickyViewportRef.current) return;

    const el = stickyViewportRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.98) {
          onFullyInView(projectId);
        }
      },
      {
        threshold: [0, 0.98, 1],
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onFullyInView, projectId]);

  return (
    <div ref={container} className="relative h-[200vh]">
      <div ref={stickyViewportRef} className="sticky top-0 h-screen flex">
        <motion.div
          style={{
            scale,
            backgroundColor: color,
          }}
          className="flex items-start pt-50 px-5 sm:px-16 w-full h-full rounded-4xl flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-[40px] sm:text-[60px] font-bold text-white"
          >
            {title}
          </motion.div>
          {description.map((line, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: "easeOut",
                }}
                className="text-[14px] text-black max-w-[90%] sm:max-w-175"
              >
                {line}
              </motion.div>
            );
          })}
          <motion.a
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            transition={{
              delay: 0.75,
              duration: 1,
              ease: "easeOut",
            }}
            className="text-[20px]font-bold text-white"
          >
            Visit Site
          </motion.a>
          {/* <p className="text-3xl font-black">{scaleValue.toFixed(3)}</p> */}
        </motion.div>
      </div>
    </div>
  );
};
