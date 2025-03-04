export const titleVariants = {
  initialLabel: {
    opacity: 0,
    y: 100,
    rotateX: 90,
    skew: -20,
  },
  animateLabel: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    skew: 0,
  },
  transition: (delay: number) => ({
    delay,
    duration: 0.8,
    ease: "easeInOut",
  }),
};

export const subTitleVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay: 0.5,
    duration: 0.8,
    ease: "easeInOut",
  },
};

export const dividerVariants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
    delay: 0.2,
    ease: "easeInOut",
  },
};
