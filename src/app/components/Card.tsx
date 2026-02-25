import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface CardProps {
  projectId: number;
  title: string;
  description: string;
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);

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
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onFullyInView, projectId]);

  return (
    <div ref={container} className="relative h-[200vh]">
      <div
        ref={stickyViewportRef}
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
          <p className="text-3xl font-black">{scaleValue.toFixed(3)}</p>
        </motion.div>
      </div>
    </div>
  );
};
