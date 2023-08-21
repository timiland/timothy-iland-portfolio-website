import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, Clone } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

function Model({ url }) {
  const { scene } = useGLTF(url) as GLTF;
  return <Clone object={scene} />;
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Environment
          files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/img/workshop_1k.hdr"
          background
        />
        <Suspense>
          <Model
            url={
              'https://s3.amazonaws.com/a.storyblok.com/f/196436/x/f44a0c09da/defaultcharacter.glb'
            }
          />
        </Suspense>
      </Canvas>
    </>
  );
}
