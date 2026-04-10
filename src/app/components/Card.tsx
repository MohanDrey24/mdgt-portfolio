import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
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
  src: _src,
  images: imageListProp,
  link,
  color,
  index: _index,
  onFullyInView,
}: CardProps) => {
  const cardColors = getCardColors(color);
  const shouldReduceMotion = useReducedMotion();
  const container = useRef<HTMLDivElement | null>(null);
  const stickyViewportRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

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

  const images = imageListProp ?? [];
  const hasImages = images.length > 0;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const stackCount = hasImages ? Math.min(3, images.length) : 0;
  const stackIndices = hasImages
    ? Array.from({ length: stackCount }, (_, layerIndex) => {
        const stepsBehindFront = stackCount - 1 - layerIndex;
        return (
          (activeImageIndex - stepsBehindFront + images.length) % images.length
        );
      })
    : [];

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
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[40px] sm:text-[60px] font-bold mb-4"
          >
            {title}
          </motion.div>

          {description.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              style={{ color: cardColors.muted }}
              className="text-[14px] w-full"
            >
              {line}
            </motion.div>
          ))}

          <motion.a
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            transition={{ delay: 0.75, duration: 1, ease: "easeOut" }}
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

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {technologies.map((tech, techIndex) => (
                <motion.span
                  key={`${tech}-${techIndex}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    delay: 0.75 + techIndex * 0.15,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="text-[18px] font-bold"
                >
                  {tech}
                </motion.span>
            ))}
          </div>

          {hasImages && (
            <div className="mt-10 w-full lg:mt-0 lg:absolute lg:bottom-10 lg:right-16 lg:w-150 xl:w-200">
              <div className="relative w-full max-w-4xl aspect-video overflow-visible">
                <AnimatePresence initial={false}>
                  {stackIndices.map((imgIndex, layerIndex) => {
                    const depthFromFront = stackCount - 1 - layerIndex; // 0 = front
                    const y = -depthFromFront * 14;
                    const cardScale = 1 - depthFromFront * 0.04;
                    const isFront = depthFromFront === 0;

                    return (
                      <motion.div
                        key={imgIndex}
                        className="absolute inset-0"
                        style={{ zIndex: 10 + layerIndex }}
                        initial={
                          isFront && !shouldReduceMotion
                            ? { y: 26, scale: 1.02 }
                            : false
                        }
                        animate={{ y, scale: cardScale }}
                        exit={
                          shouldReduceMotion
                            ? { y, scale: cardScale }
                            : { y: y - 10, scale: cardScale - 0.01 }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 1, ease: "easeOut" }
                        }
                      >
                        <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-xl bg-black/5">
                          <img
                            src={images[imgIndex]}
                            alt={`${title} screenshot ${imgIndex + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
