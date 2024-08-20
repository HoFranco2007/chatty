import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

const ChattyCanvas = () => {
  const chatty = useGLTF("/lion/chatty.gltf");

  return (
    <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}>
      <Suspense fallback={null}>
        <primitive object={chatty.scene} scale={0.5} />
        <ambientLight intensity={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default ChattyCanvas;