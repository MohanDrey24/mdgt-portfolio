'use client';

import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  // Cloud,
  Stars,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export const AuroraEffect = () => {
  const color = useMotionValue(COLORS[0]);
  const [bgImage, setBgImage] = useState(
    `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${COLORS[0]})`
  );

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  useMotionValueEvent(color, 'change', (latest) => {
    setBgImage(`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${latest})`);
  });

  return (
    <motion.section
      style={{
        backgroundImage: bgImage,
      }}
      className='absolute min-h-screen place-content-center overflow-hidden inset-0 z-0'
    >
      <Canvas>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </motion.section>
  );
};
