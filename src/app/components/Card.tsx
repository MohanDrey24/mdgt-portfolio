import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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

  const images = imageListProp ?? [];
  const hasImages = images.length > 0;
  const stackCount = hasImages ? Math.min(3, images.length) : 0;
  const [frontIndex, setFrontIndex] = useState(0);

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
      { threshold: [0, 0.98, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onFullyInView, projectId]);

  useEffect(() => {
    setFrontIndex(0);
  }, [images.length]);

  useEffect(() => {
    if (!hasImages) return;
    if (images.length < 2) return;
    if (shouldReduceMotion) return;
    if (stackCount < 2) return;

    const intervalId = window.setInterval(() => {
      setFrontIndex((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [hasImages, images.length, shouldReduceMotion, stackCount]);

  const visibleStack = useMemo(() => {
    if (!hasImages) return [] as Array<{ srcIndex: number; depthFromFront: number }>;

    return images
      .map((_, srcIndex) => {
        const depthFromFront =
          (frontIndex - srcIndex + images.length) % images.length;
        return { srcIndex, depthFromFront };
      })
      .filter(({ depthFromFront }) => depthFromFront < stackCount)
      .sort((a, b) => b.depthFromFront - a.depthFromFront); // back -> front
  }, [frontIndex, hasImages, images, stackCount]);

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
              <Fragment key={`${tech}-${techIndex}`}>
                <motion.span
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
                {techIndex !== technologies.length - 1 && (
                  <span aria-hidden="true" className="opacity-70">
                    •
                  </span>
                )}
              </Fragment>
            ))}
          </div>

          {hasImages && (
            <div className="mt-10 w-full lg:mt-0 lg:absolute lg:bottom-10 lg:right-16 lg:w-150 xl:w-200">
              <div className="relative w-full aspect-video overflow-visible">
                {visibleStack.map(({ srcIndex, depthFromFront }) => {
                  const y = -depthFromFront * 14;
                  const cardScale = 1 - depthFromFront * 0.04;
                  const zIndex = 100 - depthFromFront;

                  return (
                    <motion.div
                      key={`stack-${srcIndex}`}
                      className="absolute inset-0 will-change-transform"
                      style={{ zIndex }}
                      animate={{ y, scale: cardScale }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.55, ease: "easeOut" }
                      }
                    >
                      <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-xl bg-black/5">
                        <img
                          src={images[srcIndex]}
                          alt={`${title} screenshot ${srcIndex + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
