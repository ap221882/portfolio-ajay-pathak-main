import {
  memo,
  useRef,
} from 'react';

import * as THREE from 'three';

import {
  useGLTF,
  useScroll,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Model = ({ setTarget }: any) => {
  const model = useGLTF("./space_boi.glb");
  const modelRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Attach click handlers directly to children meshes
  const attachClickHandlers = (obj: THREE.Object3D) => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.userData.clickable = true; // optional
      }
    });
  };

  attachClickHandlers(model.scene);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Example rotation based on scroll
      // const rotation = scroll.offset * Math.PI * 2;
      // modelRef.current.rotation.y = rotation;
    }
  });

  return (
    <group
      ref={modelRef}
      scale={0.2}
      onClick={(e) => {
        // Intersected object from ray
        const object = e.object;
        console.log("Clicked object:", object);
        setTarget(object);
      }}
    >
      <primitive object={model.scene} />
    </group>
  );
};

export default memo(Model);

useGLTF.preload("./space_boi.glb");
