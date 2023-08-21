/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from 'react';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import IAsset from '@models/IAsset';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Clone, Environment, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import addCorsPrefix from 'utilities/helpers/addCorsPrefix';
import Character from './Character';
import ActionTag from './ActionTag';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationClip } from 'three';

export interface ICharacterAnimationHero extends SbBlokData {
  readonly title: string;
  readonly text: string;
  readonly characterModel: IAsset;
}

type GLTFResult = GLTF & {
  nodes: {
    Character: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
};

const CharacterAnimationHero = ({
  blok,
}: {
  blok: ICharacterAnimationHero;
}) => {
  const [actionIndex, setActionIndex] = useState(0);

  const { title, text, characterModel } = blok;

  const modelUrl = addCorsPrefix(characterModel.filename);

  // if (modelUrl) {
  //   const { scene, animations } = useGLTF(modelUrl) as GLTFResult;

  //   console.log(animations);
  // }

  // const actions = animations.map((action, index) => ({
  //   key: index,
  //   name: action.name,
  // }));

  useGLTF.preload(modelUrl);

  return (
    <>
      <section
        className="relative w-full component-padding"
        {...storyblokEditable(blok)}
      >
        <div className="container grid-container gap-y-12">
          <h1 className="col-span-10 text-center col-start-2 text-yellow drop-shadow-black_lg whitespace-pre-line">
            {title}
          </h1>
          <div className="col-span-6 h-[500px]">
            <Canvas shadows camera={{ position: [0, -2, 25], fov: 40 }}>
              <directionalLight
                position={[-5, 5, 5]}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <ambientLight />
              <Suspense fallback={null}>
                <Character model={modelUrl} actionIndex={actionIndex} />
              </Suspense>
            </Canvas>
          </div>
          <div className="col-span-4 col-start-7 flex text-center flex-col gap-12 pt-12">
            {text && (
              <p className="w-full body-one whitespace-pre-line">{text}</p>
            )}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {/* {actions.map((action, index) => (
                <ActionTag
                  name={action.name}
                  keyInput="A"
                  callback={() => setActionIndex(index)}
                />
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CharacterAnimationHero;
