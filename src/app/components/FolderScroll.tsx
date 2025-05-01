import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export const FolderScroll = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <div className="h-screen">
      <div className="fixed inset-0 w-full h-screen bg-gray-100 flex justify-center items-center z-10" />
      <div
        className="fixed bottom-0 left-0 w-full z-20"
        style={{ height: `${progress * 95}vh` }}
      >
        {/* Trapezoid tab attached to the overlay */}
        <div
          className="absolute -top-8 right-0 w-[300px] h-8 bg-blue-600"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 20% 0)",
          }}
        ></div>

        {/* Main overlay content */}
        <div className="w-full h-full bg-blue-600 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white">Overlay Content</h1>
        </div>
      </div>
    </div>
  );
};
