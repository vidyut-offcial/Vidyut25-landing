import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import gsap from "gsap";

export default function LogoModel() {
  const gltf = useLoader(GLTFLoader, "/models/logo.gltf");
  const modelRef = useRef();
  const spotlightRef = useRef();
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: 0 });
  const originalRotation = useRef({ x: 0, y: 0, z: 0 });
  const rotationTimeline = useRef(null);
  const isRotating = useRef(false);
  
  useEffect(() => {
    if (gltf) {
      const silverMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xE0E0E0,
        metalness: 0.9,
        roughness: 0.15,
        reflectivity: 1.0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.2,
      });
      
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.userData.originalMaterial = child.material;
          child.material = silverMaterial.clone();
        }
      });
      
      if (modelRef.current) {
        originalRotation.current = {
          x: modelRef.current.rotation.x,
          y: modelRef.current.rotation.y,
          z: modelRef.current.rotation.z
        };
      }
      
      rotationTimeline.current = gsap.timeline({ paused: true });
      
      const handleMouseMove = (event) => {
        if (modelRef.current && !isRotating.current) {
          const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseRef.current.x = normalizedX;
          
          const canvas = document.querySelector('canvas');
          if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const isHovered = 
              x >= 0 && 
              x <= rect.width && 
              y >= 0 && 
              y <= rect.height;
              
            setHovered(isHovered);
          }
        }
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [gltf]);
  
  useFrame((state, delta) => {
    if (modelRef.current && !isRotating.current) {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        originalRotation.current.y + mouseRef.current.x * 0.5, 
        0.05
      );
    }
    
    if (modelRef.current && gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (hovered) {
            child.material.envMapIntensity = THREE.MathUtils.lerp(
              child.material.envMapIntensity,
              1.8,
              0.1
            );
            child.material.clearcoat = THREE.MathUtils.lerp(
              child.material.clearcoat,
              0.9,
              0.1
            );
          } else {
            child.material.envMapIntensity = THREE.MathUtils.lerp(
              child.material.envMapIntensity,
              1.2,
              0.1
            );
            child.material.clearcoat = THREE.MathUtils.lerp(
              child.material.clearcoat,
              0.6,
              0.1
            );
          }
        }
      });
    }
    
    if (spotlightRef.current) {
      const time = state.clock.getElapsedTime();
      spotlightRef.current.position.x = Math.sin(time * 0.5) * 3;
      spotlightRef.current.position.z = Math.cos(time * 0.5) * 3;
      spotlightRef.current.position.y = 5 + Math.sin(time) * 0.5;
      
      spotlightRef.current.intensity = hovered ? 15 : 8;
    }
  });

  return (
    <>
      <primitive 
        ref={modelRef}
        object={gltf.scene} 
        scale={0.2} 
        position={[0, 0.2, 0]}
        cursor={hovered ? 'pointer' : 'auto'}
      />
      <spotLight
        ref={spotlightRef}
        position={[0, 5, 0]}
        angle={0.15}
        penumbra={1}
        decay={2}
        distance={20}
        intensity={8}
        color="#ffffff"
        castShadow
      />
    </>
  );
}