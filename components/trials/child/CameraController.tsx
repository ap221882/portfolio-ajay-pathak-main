import { useRef } from 'react';

import * as THREE from 'three';

import { OrbitControls } from '@react-three/drei';
import {
  useFrame,
  useThree,
} from '@react-three/fiber';

interface CameraControllerProps {
  target: THREE.Object3D | null;
  isTransitioning: boolean;
}

function CameraController({ target, isTransitioning }: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const hasTransitioned = useRef(false);

  useFrame(() => {
    if (isTransitioning && !hasTransitioned.current) {
      const targetPos = new THREE.Vector3(1.5, 1, 2.5); // Adjusted for diagonal view
      camera.position.lerp(targetPos, 0.01);
      camera.lookAt(0, 0, 0);

      if (camera.position.distanceTo(targetPos) < 0.1) {
        hasTransitioned.current = true;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={!isTransitioning}
      minDistance={2}
      maxDistance={10}
    />
  );
}

export default CameraController;
