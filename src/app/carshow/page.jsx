'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/cannon";
import { Scene } from "@/components/Scene";

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const cars = ['car.glb', 'car.glb', 'car.glb'];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <Physics
          broadphase="SAP"
          gravity={[0, -2.6, 0]}
        >
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}
