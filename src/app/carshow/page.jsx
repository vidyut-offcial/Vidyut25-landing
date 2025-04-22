'use client';

import { useState, Suspense } from 'react';
import { GameWrapper } from '@/components/GameWrapper';

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const cars = ['car.glb', 'car.glb', 'car.glb'];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GameWrapper />
    </div>
  );
}
