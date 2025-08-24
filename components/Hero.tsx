"use client";

import './hero.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Easing,
  motion,
  useReducedMotion,
} from 'framer-motion';

import EnterScreen from './trials/EnterScreen';

const ROLES = [
  {
    id: "engineer",
    title: "Engineer",
    subtitle: "Systems, frontend & performance.",
    href: "/engineer",
  },
  {
    id: "creator",
    title: "Creator",
    subtitle: "Audio stories & short reels.",
    href: "/creator",
  },
  {
    id: "writer",
    title: "Writer",
    subtitle: "Long-form essays & frontend explainers.",
    href: "/writer",
  },
];

export default function HeroSelector() {
  const [focused, setFocused] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // ensure first chip is keyboard-focusable on mount
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-role="role-0"]');
    if (el) el.setAttribute("tabindex", "0");
  }, []);

  // keyboard nav
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      setFocused((p) => Math.min(p + 1, ROLES.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setFocused((p) => Math.max(p - 1, 0));
      e.preventDefault();
    }
  }

  // focus anchor when focused index changes
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(
      `[data-role="role-${focused}"]`
    );
    if (el) el.focus();
  }, [focused]);

  // motion variants
  const headlineVariants = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };
  const chipVariant = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.12 + i * 0.05,
            duration: 0.28,
            ease: "easeOut" as Easing,
          },
        };

  return (
    <motion.div className="grid flex-1 h-full heroContainer">
      <header className="flex p-10 border-b">
        <div className="max-w-4xl w-full text-center m-auto">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-widest">Ajay Pathak</p>
          </div>
          <motion.h1
            {...headlineVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight"
          >
            I build what product needs.
          </motion.h1>
        </div>
      </header>
      <div className="flex items-center justify-center h-full">
        <motion.h1
          {...headlineVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight"
        >
          <EnterScreen />
        </motion.h1>
      </div>
    </motion.div>
  );
}
