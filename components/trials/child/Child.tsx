"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import {
  useFrame,
  useThree,
} from '@react-three/fiber';

import CameraController from './CameraController';
import Model from './Model';

interface ChildProps {
  enterClicked: boolean;
  isTransitioning: boolean;
}

const Child = ({ enterClicked, isTransitioning }: ChildProps) => {
  const { camera } = useThree();
  const [target, setTarget] = useState<THREE.Object3D | null>(null);
  const ref = useRef<THREE.Mesh>(null);

  // Set initial camera position
  useEffect(() => {
    camera.position.set(2, 1.5, 3.5); // Closer initial position
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    if (ref.current && !enterClicked) {
      ref.current.rotation.y += delta * 0.5; // Slower rotation
    } else if (ref.current && enterClicked) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        0,
        0.05
      );
    }
  });

  return (
    <mesh ref={ref}>
      <ambientLight intensity={0.5} /> {/* Increased light intensity */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} />{" "}
      {/* Adjusted light */}
      <CameraController target={target} isTransitioning={isTransitioning} />
      <Suspense fallback={null}>
        <Model setTarget={setTarget} isTransitioning={isTransitioning} />
      </Suspense>
    </mesh>
  );
};

export default Child;
