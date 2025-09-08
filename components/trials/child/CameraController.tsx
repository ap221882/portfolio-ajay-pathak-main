import { useRef } from 'react';

import * as THREE from 'three';

import { OrbitControls } from '@react-three/drei';
import {
  useFrame,
  useThree,
} from '@react-three/fiber';

function CameraController({ target }: any) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (target) {
      const targetPos = target.getWorldPosition(new THREE.Vector3());

      // Smooth position lerp
      camera.position.lerp(
        targetPos.clone().add(new THREE.Vector3(2, 2, 0.9)), // offset in Z for zoom
        0.1
      );

      camera.lookAt(targetPos);

      controlsRef.current?.update();
    }
  });

  return <OrbitControls ref={controlsRef} />;
}

export default CameraController;
