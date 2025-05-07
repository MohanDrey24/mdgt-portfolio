'use client';

import { useState, useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/app/utils/cn';

interface FolderProps {
  tabPosition?: string;
  folderColor?: string;
}

export const Folder = ({ folderColor, tabPosition }: FolderProps) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'start start'],
  });

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
    console.log(scrollYProgress);
  });

  return (
    <div
      ref={container}
      className='relative h-screen bg-gray-200 opacity-[0.85]'
    >
      <div className='absolute inset-0 w-full h-full flex justify-center items-center z-10' />

      <div
        className='absolute bottom-0 w-full z-20'
        style={{ height: `${progress * 96}vh` }}
      >
        {/* Trapezoid tab attached to the overlay */}
        <div
          className={cn('absolute -top-8 right-0 w-[300px] h-8', [
            folderColor,
            tabPosition,
          ])}
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)',
          }}
        ></div>

        {/* Main overlay content */}
        <div
          className={cn(
            'w-full h-full flex justify-center items-center',
            folderColor
          )}
        >
          <h1 className='text-4xl font-bold text-white'>Overlay Content</h1>
        </div>
      </div>
    </div>
  );
};
