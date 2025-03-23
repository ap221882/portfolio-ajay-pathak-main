"use client";

import React from 'react';

import {
  motion,
  useScroll,
} from 'motion/react';
import { useTheme } from 'next-themes';

const FullPageScroll = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  if (theme === "light") {
    return null;
  }
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "slategray",
        }}
      />
    </>
  );
};

export default FullPageScroll;
