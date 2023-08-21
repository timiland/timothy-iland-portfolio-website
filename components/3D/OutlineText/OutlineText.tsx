/* eslint-disable react/no-unknown-property */
import { Text3D } from '@react-three/drei';

interface IOutlineText {
  readonly text: string;
  readonly visible: boolean;
  readonly outlineColour: string;
  readonly mainColour: string;
  readonly fontPath: string;
  readonly size: number;
  readonly depth: number;
}

const OutlineText = ({
  text,
  visible,
  outlineColour = '#0000',
  mainColour,
  fontPath,
  size,
  depth,
}: IOutlineText) => (
  <>
    <Text3D
      visible={visible}
      castShadow
      receiveShadow
      curveSegments={32}
      bevelEnabled
      bevelSize={0.04}
      bevelThickness={0.1}
      height={depth}
      lineHeight={0.5}
      letterSpacing={0.06}
      size={size}
      font="/poppins-normal-700.json"
    >
      {text}
      <meshPhysicalMaterial
        color={mainColour}
        metalness={0.2}
        reflectivity={0.8}
        roughness={1}
      />
    </Text3D>
    <Text3D
      visible={visible}
      position={[0, 0, -1]}
      castShadow
      receiveShadow
      curveSegments={32}
      bevelEnabled
      bevelSize={0.1}
      bevelThickness={1}
      height={depth}
      lineHeight={0.5}
      letterSpacing={0.06}
      size={size}
      bevelOffset={0.2}
      bevelSegments={5}
      font={fontPath}
    >
      {text}
      <meshPhysicalMaterial
        opacity={0}
        color={outlineColour}
        metalness={0.2}
        reflectivity={0.8}
        roughness={1}
      />
    </Text3D>
  </>
);

export default OutlineText;
