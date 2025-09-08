"use client";

import {
  Suspense,
  useRef,
} from 'react';

import { Mesh } from 'three';

import {
  useFrame,
  useThree,
} from '@react-three/fiber';

import Model from './Model';

const Child = () => {
  const { camera } = useThree();
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y = ref.current.rotation.y + delta;
    }
  });

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={ref}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0]} />
      <Suspense fallback={<progress />}>
        <Model />
      </Suspense>
      {/* <OrbitControls /> */}
    </mesh>
  );
};

export default Child;
