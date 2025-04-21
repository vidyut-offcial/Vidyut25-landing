"use client";

import { Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import { FlipWords } from "./ui/flip-words";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Environment, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// 3D Logo Model Component with Pure Silver
function LogoModel({ inView }) {
  const gltf = useLoader(GLTFLoader, "/models/logo.gltf");
  const modelRef = useRef();
  const spotlightRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPosition = useRef({ x: 0, y: 0 });
  const originalRotation = useRef({ x: 0, y: 0, z: 0 });
  const rotationTimeline = useRef(null);
  const isRotating = useRef(false);
  
  // Setup GSAP animation and materials
  useEffect(() => {
    if (gltf) {
      // Create a pure silver material
      const silverMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xE0E0E0,
        metalness: 0.9,
        roughness: 0.15,
        reflectivity: 1.0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.2,
      });
      
      // Apply the material to all mesh children
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.userData.originalMaterial = child.material;
          child.material = silverMaterial.clone();
        }
      });
      
      // Store the original rotation
      if (modelRef.current) {
        originalRotation.current = {
          x: modelRef.current.rotation.x,
          y: modelRef.current.rotation.y,
          z: modelRef.current.rotation.z
        };
      }
      
      // Initialize GSAP timeline for rotation animation
      rotationTimeline.current = gsap.timeline({ paused: true });
      
      // Set up hover detection for the model
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [gltf]);
  
  // Handle intersection observer changes
  useEffect(() => {
    if (inView && !isRotating.current && modelRef.current) {
      // Trigger rotation animation when coming into view
      isRotating.current = true;
      
      // Reset to original position first if needed
      gsap.to(modelRef.current.rotation, {
        x: originalRotation.current.x,
        y: originalRotation.current.y,
        z: originalRotation.current.z,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Then do one full rotation
          gsap.to(modelRef.current.rotation, {
            y: originalRotation.current.y + Math.PI * 2,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              isRotating.current = false;
            }
          });
        }
      });
    }
  }, [inView]);
  
  // Handle mouse move to detect hover
  const handleMouseMove = (event) => {
    if (modelRef.current) {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if mouse is over the canvas
        const isHovered = 
          x >= 0 && 
          x <= rect.width && 
          y >= 0 && 
          y <= rect.height;
          
        setHovered(isHovered);
        
        // Handle dragging
        if (isDragging) {
          const deltaX = event.clientX - dragStartPosition.current.x;
          const deltaY = event.clientY - dragStartPosition.current.y;
          
          // Update model rotation based on drag
          modelRef.current.rotation.y = originalRotation.current.y + deltaX * 0.01;
          modelRef.current.rotation.x = originalRotation.current.x + deltaY * 0.01;
          
          // Update drag start position
          dragStartPosition.current = {
            x: event.clientX,
            y: event.clientY
          };
        }
      }
    }
  };
  
  // Handle mouse down for drag start
  const handleMouseDown = (event) => {
    if (!isRotating.current) {
      setIsDragging(true);
      dragStartPosition.current = {
        x: event.clientX,
        y: event.clientY
      };
      
      // Store current rotation as starting point
      originalRotation.current = {
        x: modelRef.current.rotation.x,
        y: modelRef.current.rotation.y,
        z: modelRef.current.rotation.z
      };
    }
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Return to original position with GSAP animation
      gsap.to(modelRef.current.rotation, {
        x: originalRotation.current.x,
        y: originalRotation.current.y,
        z: originalRotation.current.z,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    }
  };
  
  useFrame((state, delta) => {
    // Only apply hover effects, no rotation here (GSAP handles rotation)
    if (modelRef.current && gltf) {
      // Hover effect - enhance shine when hovered
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Smooth transition to hovered state
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
    
    // Update spotlight position
    if (spotlightRef.current) {
      const time = state.clock.getElapsedTime();
      spotlightRef.current.position.x = Math.sin(time * 0.5) * 3;
      spotlightRef.current.position.z = Math.cos(time * 0.5) * 3;
      spotlightRef.current.position.y = 5 + Math.sin(time) * 0.5;
      
      // Make spotlight brighter when hovered
      spotlightRef.current.intensity = hovered ? 15 : 8;
    }
  });

  return (
    <>
      <primitive 
        ref={modelRef}
        object={gltf.scene} 
        scale={0.5} 
        position={[0, 0, 0]}
        onClick={handleMouseDown}
        onPointerDown={handleMouseDown}
        onPointerMissed={() => setIsDragging(false)}
        cursor={hovered ? 'grab' : 'auto'}
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

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when at least 50% visible
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about-section" 
      ref={sectionRef}
      className="h-screen w-screen bg-transparent relative flex items-center gap-64 justify-center"
    >
      <div className="bg-[url(/images/terrain.png)] h-screen w-screen absolute top-0 left-0 bg-cover"></div>
      <div className="flex flex-col items-start max-w-sm p-4 relative h-[30rem]">
        <div className="h-[550px] w-[550px]">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: "100%", height: "100%" }}
          >
          <ambientLight intensity={0.3} />
            <directionalLight 
              position={[0, 5, 5]} 
              intensity={0.8} 
              color="#ffffff" 
            />
            
            <Suspense fallback={null}>
              <LogoModel inView={isInView} />
              <Environment preset="warehouse" intensity={0.8} />
            </Suspense>
            
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              enabled={true}
            />
          </Canvas>
        </div>
      </div>

      <div className="relative z-50 md:row-span-2 w-[60%] flex items-center justify-center">
        <div className="text-8xl font-bold !font-proxima text-neutral-600 dark:text-neutral-400 text-left leading-snug">
          Experience <FlipWords words={["infinity", "possibility", "imagination", "tomorrow"]} /> <br />
          in "<span className="text-foreground">Echoes of the Future</span>",<br />the theme of <span className="font-semibold text-black dark:text-white uppercase font-frontage-bold">Vidyut</span>.
        </div>
      </div>
    </section>
  );
}