"use client";

import {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import MinimalSelectorHero from '@/components/Hero';

const Main = () => {
  const [val, setVal] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setVal("Profile");
      }
      if (e.key === "Enter" && val.toLowerCase() === "profile") {
        router.push("/about");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [val]);

  return (
    <>
      <MinimalSelectorHero />
    </>
  );
};

export default Main;
