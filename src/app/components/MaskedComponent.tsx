"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export const MaskedComponent = () => {
  return (
    <main className="h-screen bg-black opacity-[0.85]">
      <motion.div className="w-full h-full flex items-center justify-center">
        <p className="text-[64px] text-white w-[1000px] p-[40px]">
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>
    </main>
  );
};
