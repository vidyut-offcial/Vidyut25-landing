import { usePlane } from '@react-three/cannon';

export default function Terrain() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#556B2F" />
    </mesh>
  );
}
