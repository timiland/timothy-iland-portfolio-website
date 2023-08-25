/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from 'react';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import IAsset from '@models/IAsset';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import addCorsPrefix from 'utilities/helpers/addCorsPrefix';
import Button from '@atoms/Button/Button';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import clsx from 'clsx';
import Character from './Character';

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

const ActionButtons = ({ model, setActionIndex }) => {
  const { animations } = useGLTF(model) as GLTFResult;

  const actions = animations.map((action, index) => ({
    key: index,
    name: action.name,
  }));

  useGLTF.preload(model);

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {actions.map((action, index) => (
        // <ActionTag name={action.name} callback={() => setActionIndex(index)} />
        <Button
          style_={ButtonStyleEnum.Outline}
          onClick={() => setActionIndex(index)}
        >
          {action.name}
        </Button>
      ))}
    </div>
  );
};

const CharacterAnimationHero = ({
  blok,
}: {
  blok: ICharacterAnimationHero;
}) => {
  const [actionIndex, setActionIndex] = useState(0);
  const [colourIndex, setColourIndex] = useState(0);

  const { title, text, characterModel } = blok;

  const modelUrl = addCorsPrefix(characterModel.filename);

  const colours = ['bg-green', 'bg-yellow', 'bg-white'];

  return (
    <section
      className="relative w-full component-padding"
      {...storyblokEditable(blok)}
    >
      <div className="container grid-container relative">
        <div className="relative col-span-8 col-start-3 pointer-events-none w-full h-[550px]">
          <h1 className="w-full absolute top-0 text-center col-start-2 text-yellow drop-shadow-black_lg whitespace-pre-line pb-[250px]">
            {title}
          </h1>
          <Canvas
            className=""
            shadows
            camera={{ position: [0, 0, 75], fov: 43 }}
          >
            <directionalLight
              position={[-5, 5, 5]}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <ambientLight />
            <Suspense fallback={null}>
              <Character
                model={modelUrl}
                actionIndex={actionIndex}
                colourIndex={colourIndex}
              />
            </Suspense>
          </Canvas>
        </div>
        <div className="col-span-8 col-start-3 flex text-center flex-col gap-12">
          <Suspense fallback={null}>
            <ActionButtons model={modelUrl} setActionIndex={setActionIndex} />
          </Suspense>
        </div>
        <div className="col-span-6 col-start-4 text-center pt-12 flex justify-center">
          <div className="rounded-full p-3 border-2 border-yellow flex shrink gap-6 bg-black">
            {colours.map((colour, index) => (
              <button
                onClick={() => setColourIndex(index)}
                aria-label="change character colour"
                className={clsx(
                  index === colourIndex
                    ? 'outline outline-2 outline-yellow outline-offset-4'
                    : 'hover:cursor-pointer hover:scale-110',
                  colours[index],
                  'rounded-full h-8 w-8 transition-all '
                )}
              />
            ))}
          </div>
        </div>
        <div className="col-span-6 col-start-4 flex text-center flex-col gap-12 pt-12">
          {text && <p className="w-full body-lg whitespace-pre-line">{text}</p>}
        </div>
      </div>
    </section>
  );
};

export default CharacterAnimationHero;
