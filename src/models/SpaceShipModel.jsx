import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);
  
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.material) {
          const processColor = (material) => {
            const newMat = material.clone();
            
            if (material.color) {
              const { r, g, b } = material.color;
              if (g > r && g > b) {
                newMat.color = new THREE.Color(0x1F51FF);
              }
            }
            
            if (obj.name.toLowerCase().includes('fire') || 
                obj.name.toLowerCase().includes('engine') ||
                obj.name.toLowerCase().includes('thruster') ||
                obj.name.toLowerCase().includes('light')) {
              newMat.emissive = new THREE.Color(0x1F51FF);
              newMat.emissiveIntensity = 2.5;
            }
            
            if (material.emissive) {
              const { r, g, b } = material.emissive;
              if (g > r && g > b && (g > 0.2)) {
                newMat.emissive = new THREE.Color(0x1F51FF);
              }
            }
            
            return newMat;
          };
          
          if (Array.isArray(obj.material)) {
            obj.material = obj.material.map(mat => processColor(mat));
          } else {
            obj.material = processColor(obj.material);
          }
        }
      }
    });
  }, [scene]);
  
  useEffect(() => {
    if (names.length > 0) {
      console.log("Playing all animations:", names);
      
      names.forEach(name => {
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
      ref={group} 
      scale={0.8} 
      position={[2.5, 0, 0]} 
      rotation={[0, Math.PI / 2, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

function Scene({ stars = false }) {
  return (
    <>
      <color attach="background" args={['#0d0d0d']} />
      
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[10, 5, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight 
        position={[-5, 0, -5]}
        color={0x1F51FF} 
        intensity={0.8} 
      />
      
      <Suspense fallback={null}>
        <Model url="/models/spaceship.glb" />
        <Environment preset="night" />
        { stars && <Stars />}
      </Suspense>
      
      <EffectComposer>
        <Bloom 
          intensity={1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
      
      <OrbitControls />
    </>
  );
}

function Stars() {
  const starsGeometry = useRef();
  
  useEffect(() => {
    const vertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      vertices.push(x, y, z);
    }
    
    starsGeometry.current.setAttribute(
      'position', 
      new THREE.Float32BufferAttribute(vertices, 3)
    );
  }, []);
  
  return (
    <points>
      <bufferGeometry ref={starsGeometry} />
      <pointsMaterial size={1} color="#ffffff" />
    </points>
  );
}

export default function SpaceShipModel({ stars = false }) {
  return (
    <Canvas
      style={{ width: '100vw', minHeight: '100vh', height: "100vh" }}
      camera={{ position: [0, 2, 10], fov: 60 }}
      shadows
    >
      <Scene stars={stars} />
    </Canvas>
  );
}