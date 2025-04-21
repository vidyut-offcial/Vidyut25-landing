"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import LogoModel from "@/models/LogoModel";

function TerrainVectorBackground() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/terrain.png', (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      setTexture(loadedTexture);
    });
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (texture && meshRef.current) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0, 0) },
          terrainTexture: { value: texture },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 mouse;
          uniform sampler2D terrainTexture;
          uniform vec2 resolution;
          varying vec2 vUv;
          
          void main() {
            vec2 st = vUv;
            vec2 mousePos = mouse * 0.5 + 0.5;
            float dist = distance(st, mousePos);
            
            float ripple = sin(dist * 20.0 - time * 1.5) * 0.003;
            
            float strength = smoothstep(0.3, 0.0, dist) * 0.01;
            vec2 distortedUV = st;
            
            vec2 direction = normalize(st - mousePos);
            distortedUV += direction * sin(time + dist * 5.0) * strength;
            
            distortedUV += direction * ripple * smoothstep(0.5, 0.0, dist);
            
            vec4 color = texture2D(terrainTexture, distortedUV);
            
            gl_FragColor = color;
          }
        `,
        transparent: true
      });
      
      meshRef.current.material = material;
    }
  }, [texture]);
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[30, 15, 1, 1]} />
      <meshBasicMaterial>
        {texture && <primitive attach="map" object={texture} />}
      </meshBasicMaterial>
    </mesh>
  );
}

function CenterCamera() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <section 
      id="about-section" 
      ref={sectionRef}
      className="relative top-0 left-0 h-screen w-screen"
      style={{ height: '100vh', width: '100vw' }}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,black,transparent_40%),linear-gradient(to_bottom,black,transparent_40%),linear-gradient(to_left,black,transparent_20%),linear-gradient(to_right,black,transparent_20%)]"
        style={{ mixBlendMode: 'multiply' }}
      />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <CenterCamera />
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[0, 5, 5]} 
          intensity={0.8} 
          color="#ffffff" 
        />
        
        <Suspense fallback={null}>
          <TerrainVectorBackground />
        </Suspense>
        
        <Suspense fallback={null}>
          <LogoModel />
          <Environment preset="warehouse" intensity={0.8} />
        </Suspense>
      </Canvas>
    </section>
  );
}