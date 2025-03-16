"use client";

import { ReactElement, useEffect, useRef, useState } from "react";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function DarkModeGradient({
  children,
}: {
  children: ReactElement;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [_, measure] = useElementDimensions(ref);
  const gradientX = useMotionValue(0.5);
  const gradientY = useMotionValue(0.5);
  const background = useTransform(
    () =>
      `conic-gradient(from 0deg at ${gradientX.get() * 100}% ${gradientY.get() * 100}%, #2a2a22, #3c3c3c, #505050, #2a2a2a)` // Grayish tones
  );

  return (
    <div
      className="fixed top-0 left-0 opacity-20 flex items-center justify-center"
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        gradientX.set((e.clientX - rect.left) / rect.width);
        gradientY.set((e.clientY - rect.top) / rect.height);
      }}
    >
      <motion.div
        ref={ref}
        className="w-screen h-screen rounded-2xl cursor-none shadow-lg border border-gray-700"
        style={{ background }}
        onPointerEnter={() => measure()}
      />
      {children}
    </div>
  );
}

/**
 * ================  Utils  =========================
 */

function useElementDimensions(
  ref: React.RefObject<HTMLDivElement | null>
): [{ width: number; height: number }, VoidFunction] {
  const [size, setSize] = useState({ width: 0, height: 0 });

  function measure() {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
  }

  useEffect(() => {
    measure();
  }, []);

  return [size, measure];
}
