import {
  memo,
  useRef,
} from 'react';

import * as THREE from 'three';

import { useGLTF } from '@react-three/drei';
import {
  ThreeEvent,
  useFrame,
} from '@react-three/fiber';

interface ModelProps {
  setTarget: (target: THREE.Object3D | null) => void;
  isTransitioning: boolean;
}

const Model = ({ setTarget, isTransitioning }: ModelProps) => {
  const model = useGLTF("./space_boi.glb");
  const modelRef = useRef<THREE.Group>(null);
  const initialScale = 0.25; // Increased from 0.2
  const hasScaled = useRef(false);

  useFrame(() => {
    if (modelRef.current && isTransitioning && !hasScaled.current) {
      const targetScale = 0.3;
      modelRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.02
      );

      if (modelRef.current.scale.x > 0.29) {
        hasScaled.current = true;
      }
    }
  });

  return (
    <group
      ref={modelRef}
      scale={initialScale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (!isTransitioning) {
          setTarget(e.object);
        }
      }}
    >
      <primitive object={model.scene} />
    </group>
  );
};

export default memo(Model);

useGLTF.preload("./space_boi.glb");
