import { memo } from 'react';

import { useGLTF } from '@react-three/drei';

const Model = () => {
  const model = useGLTF("./space_boi.glb");

  return (
    <>
      <primitive object={model.scene} scale={0.25} />
    </>
  );
};

export default memo(Model);

useGLTF.preload("./space_boi.glb");
