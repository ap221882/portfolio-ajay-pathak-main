"use client";

import './hero.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
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
  const shouldReduceMotion = useReducedMotion();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // ensure first chip is keyboard-focusable on mount
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-role="role-0"]');
    if (el) el.setAttribute("tabindex", "0");
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // --- Date ---
      const day = now.getDate();
      const month = now.toLocaleString("en-US", { month: "short" });
      const year = now.getFullYear();

      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
            ? "nd"
            : day % 10 === 3 && day !== 13
              ? "rd"
              : "th";

      setDate(`${day}${suffix} ${month} ${year}`);

      // --- Time ---
      const currentTime = now.toLocaleTimeString("en-GB", {
        hour12: false, // 24h format
      });

      setTime(currentTime);
    };

    updateDateTime(); // run immediately
    const timer = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(timer); // cleanup
  }, []);

  const headlineVariants = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div className="grid flex-1 h-full heroContainer">
      <header className="flex border-b">
        <div className="w-full text-center m-auto">
          <div className="mb-6 mx-6 pt-4">
            <div className="flex justify-between">
              <p className="text-sm uppercase tracking-widest">{date}</p>
              <p className="text-sm uppercase tracking-widest">{time}</p>
              <p className="text-sm uppercase tracking-widest">Ajay Pathak</p>
            </div>
          </div>
          <motion.h1
            {...headlineVariants}
            className="text-4xl sm:text-3xl md:text-6xl lg:text-5xl font-medium leading-tight pb-4"
          >
            I build what product needs.
          </motion.h1>
        </div>
      </header>
      <div className="relative w-full">
        <div className="flex items-center justify-center h-full w-full">
          <EnterScreen />
        </div>
      </div>
    </motion.div>
  );
}
