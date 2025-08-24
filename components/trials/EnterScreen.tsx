"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function EnterScreen() {
  const [showEnter, setShowEnter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowEnter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push("/main");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white overflow-hidden relative">
      {/* Shape Reveal */}
      <motion.div
        initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
        animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-700"
      />

      {/* Enter Button / Text */}
      <AnimatePresence>
        {showEnter && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-24 flex flex-col items-center space-y-4"
          >
            <Button
              size="lg"
              variant="secondary"
              className="rounded-2xl px-10 py-6 text-lg font-semibold shadow-xl"
              onClick={() => router.push("/main")}
            >
              Press Enter
            </Button>
            <p className="text-white/70 text-sm">
              or click the button to continue
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
