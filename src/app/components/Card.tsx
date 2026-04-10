import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { getCardColors } from "../utils/colorPicker";

interface CardProps {
  projectId: number;
  title: string;
  description: string[];
  technologies: string[];
  src: string;
  images?: string[];
  link: string;
  color: string;
  index: number;
  onFullyInView?: (projectId: number) => void;
}

export const Card = ({
  projectId,
  title,
  description,
  technologies,
  src,
  images,
  link,
  color,
  index,
  onFullyInView,
}: CardProps) => {
  const cardColors = getCardColors(color);
  const shouldReduceMotion = useReducedMotion();
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

  const hasImages = Array.isArray(images) && images.length > 0;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!hasImages) return;
    if (images.length < 2) return;
    if (shouldReduceMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [hasImages, images, shouldReduceMotion]);

  return (
    <div ref={container} className="relative h-[200vh]">
      <div ref={stickyViewportRef} className="sticky top-0 h-screen flex">
        <motion.div
          style={{
            scale,
            backgroundColor: color,
            color: cardColors.fg,
          }}
          className={`relative flex items-start pt-35 sm:pt-50 px-5 sm:px-16 w-full h-full rounded-4xl flex-col ${
            hasImages ? "lg:pr-168" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-[40px] sm:text-[60px] font-bold mb-4"
          >
            {title}
          </motion.div>
          {description.map((line, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: "easeOut",
                }}
                style={{ color: cardColors.muted }}
                className="text-[14px] w-full"
              >
                {line}
              </motion.div>
            );
          })}

          <motion.a
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            transition={{
              delay: 0.75,
              duration: 1,
              ease: "easeOut",
            }}
            className="text-[20px] font-bold flex items-center gap-2 mt-4"
          >
            Visit Site <ExternalLink className="w-5 h-5" />
          </motion.a>

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0, x: -24 }}
            whileInView={{ opacity: 1, scaleX: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            style={{ backgroundColor: cardColors.divider }}
            className="h-0.5 w-full max-w-full mt-6 mb-4 origin-left rounded-full"
          />
          <div className="flex space-x-2">
            {technologies.map((tech, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  delay: 0.75 + idx * 0.3,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="text-[18px] inset-0 font-bold"
              >
                {tech}
              </motion.p
              >
            ))}
          </div>

          {hasImages && (
            <div className="mt-10 w-full lg:mt-0 lg:absolute lg:bottom-10 lg:right-16 lg:w-130 xl:w-160">
              <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-xl">
                {!shouldReduceMotion && images.length > 1 && (
                  <img
                    src={
                      images[
                        (activeImageIndex - 1 + images.length) % images.length
                      ]
                    }
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover scale-[0.985]"
                  />
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeImageIndex]}
                    src={images[activeImageIndex]}
                    alt={`${title} screenshot ${activeImageIndex + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ y: 18, scale: 0.99 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
