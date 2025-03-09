"use client";

import {
  OrbitControls,
  Stars,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const ThreeDBackground = () => {
  return (
    <div className='absolute top-0 left-0 h-full w-full'>
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#0d0d0d"]} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <OrbitControls enableZoom={false} />
    </Canvas>
    </div>
  );
};

export default ThreeDBackground;
