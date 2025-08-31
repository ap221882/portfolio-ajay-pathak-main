import { Suspense } from "react";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

function Model() {
  const { scene } = useGLTF("/model.glb"); // path relative to public/
  return <primitive object={scene} scale={0.5} position={[0, 0, 0]} />;
}

const Child = () => {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </>
  );
};

export default Child;
