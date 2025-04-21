import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import gsap from 'gsap';

const Model = React.forwardRef(({ url, scale }, ref) => {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const processColor = (material) => {
          const newMat = material.clone();

          if (material.color) {
            const { r, g, b } = material.color;
            if (g > r && g > b) {
              newMat.color = new THREE.Color(0x1F51FF);
            }
          }

          if (material.emissive) {
            const { r, g, b } = material.emissive;
            if (g > r && g > b && g > 0.2) {
              newMat.emissive = new THREE.Color(0x1F51FF);
            }
          }

          return newMat;
        };

        if (Array.isArray(obj.material)) {
          obj.material = obj.material.map((mat) => processColor(mat));
        } else {
          obj.material = processColor(obj.material);
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (names.length > 0) {
      names.forEach((name) => {
        if (actions[name]) {
          actions[name].reset();
          actions[name].clampWhenFinished = false;
          actions[name].loop = THREE.LoopRepeat;
          actions[name].play();
        }
      });
    }
  }, [actions, names]);

  return (
    <group
      ref={ref}
      scale={scale}
      position={[2.5, -1, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <primitive object={scene} />
    </group>
  );
});

function Scene({ scale, modelRef }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Model 
          scale={scale} 
          url="/models/spaceship.glb" 
          ref={modelRef} 
        />
      </Suspense>
    </>
  );
}

const SpaceShipModel = React.forwardRef(({ height = '100vh', scale = 0.6, }, ref) => {
  return (
    <div style={{ position: 'relative', pointerEvents: 'none' }}>
      <Canvas
        style={{ width: '100vw', height }}
        camera={{ position: [0, 2, 10], fov: 60 }}
        shadows
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#a2d2ff" />
        <pointLight position={[-5, 2, -5]} intensity={1.2} color={0x1F51FF} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="white" />
        <Scene scale={scale} modelRef={ref} />
      </Canvas>
    </div>
  );
});

export default SpaceShipModel;