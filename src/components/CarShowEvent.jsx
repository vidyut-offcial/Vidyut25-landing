import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function CarShowEvent() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={[0, 1, -5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}
