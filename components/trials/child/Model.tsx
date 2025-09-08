import { memo } from 'react';

import { useGLTF } from '@react-three/drei';

const Model = () => {
  const model = useGLTF("./space_boi.glb");
  console.log(model.nodes);

  return <primitive object={model.scene} scale={0.2} />;
};

export default memo(Model);

useGLTF.preload("./space_boi.glb");
