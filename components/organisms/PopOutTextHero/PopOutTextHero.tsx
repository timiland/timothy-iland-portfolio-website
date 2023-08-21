/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import ILabel from '@models/ILabel';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import OutlineText from 'components/3D/OutlineText/OutlineText';

export interface ITextOrbitSection extends SbBlokData {
  readonly title: string;
  readonly items: ILabel[];
  readonly stopTime: number;
}

const Scene = (props) => {
  const [count, setCount] = useState(0);

  const { items, stopTime } = props;

  const spacing = 50;

  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, stopTime * 1000);

    return () => clearInterval(interval);
  }, [count]);

  const step = (count - (count % 2)) / 2;

  const loopCount = Math.floor(step / items.length);

  const activeIndex = step - items.length * loopCount;

  const { position } = useSpring({
    position: step * spacing,
    // config: config.stiff,
    // config: { duration: 2000, easing: easings.easeInOutCirc },
    config: {
      tension: 200,
      friction: 20,
    },
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t / 1);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight intensity={0.3} position={[0, 3, 4]} />
      <animated.group ref={ref} position-z={position}>
        {items.map((item, index) => (
          <group
            key={item.text}
            position-z={-spacing * index - items.length * spacing * loopCount}
          >
            <Center>
              <OutlineText
                text={item.text}
                size={1.5}
                depth={4}
                fontPath="/poppins-normal-700.json"
                outlineColour="#06191D"
                // mainColour="#FED100"
                mainColour="#FFFFFF"
                visible={index === activeIndex}
              />
            </Center>
          </group>
        ))}
      </animated.group>
    </>
  );
};

const TextOrbitSection = ({ blok }: { blok: ITextOrbitSection }) => {
  const { title, items, stopTime = 3 } = blok;

  return (
    <section className="w-full grid-container" {...storyblokEditable(blok)}>
      <h1 className="col-span-full text-center text-yellow drop-shadow-black_lg">
        {title}
      </h1>
      <Canvas
        camera={{
          fov: 45,
          near: 1,
          far: 80,
          position: [0, -1.75, 11],
          aspect: 1.77,
        }}
        className="col-span-full"
        style={{ height: 400 }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene stopTime={stopTime} items={items} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default TextOrbitSection;
