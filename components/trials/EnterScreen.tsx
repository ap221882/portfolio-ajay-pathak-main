"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Canvas } from "@react-three/fiber";

import Child from "./child/Child";

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
    <div className="flex items-center justify-center h-full w-full">
      <Canvas
        style={{ width: "100vw", height: "100%" }}
        camera={{ position: [1, 2, 2.5], fov: 60 }}
      >
        <Child />
      </Canvas>
    </div>
  );
}
