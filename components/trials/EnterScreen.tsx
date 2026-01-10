"use client";

import { Canvas } from '@react-three/fiber';

import Child from './child/Child';

export default function EnterScreen() {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      camera={{ position: [1, 2, 2.5], fov: 60 }}
    >
      <Child />
    </Canvas>
  );
}
