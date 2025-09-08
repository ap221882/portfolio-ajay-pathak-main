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

const Child = ({ enterClicked }: { enterClicked: boolean }) => {
  const { camera } = useThree();
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      if (!enterClicked) {
        ref.current.rotation.y = ref.current.rotation.y + delta;
      } else {
        const targetRotation = 0;
        const smoothFactor = 0.1;
        ref.current.rotation.y +=
          (targetRotation - ref.current.rotation.y) * smoothFactor;
      }
    }
  });

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={ref}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      {/* <OrbitControls /> */}
    </mesh>
  );
};

export default Child;
