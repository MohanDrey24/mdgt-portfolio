export const rotatingImageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotate: [0, 720],
  },
  transition: {
    delay: 0.2,
    duration: 3,
    ease: "easeOut",
  },
};
