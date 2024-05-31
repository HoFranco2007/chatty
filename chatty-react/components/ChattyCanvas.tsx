import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const ChattyCanvas= () => {
  const chatty = useGLTF("/lion/chatty.gltf");
  return (
    <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}> 
      <primitive object={chatty.scene} scale={0.5} />    
    </Canvas>
  );
};

export default ChattyCanvas;