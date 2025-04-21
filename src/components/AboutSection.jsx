"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Terrain Background with Vector Shader Effect
function TerrainVectorBackground() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const [texture, setTexture] = useState(null);
  
  // Load terrain texture
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/terrain.png', (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      setTexture(loadedTexture);
    });
  }, []);
  
  // Track mouse position for shader effect
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
  
  // Create shader material once texture is loaded
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
            // Calculate distance from mouse
            vec2 st = vUv;
            vec2 mousePos = mouse * 0.5 + 0.5;
            float dist = distance(st, mousePos);
            
            // Create subtle vector effect with ripples
            float ripple = sin(dist * 20.0 - time * 1.5) * 0.003;
            
            // Apply distortion based on mouse distance (stronger near mouse)
            float strength = smoothstep(0.3, 0.0, dist) * 0.01;
            vec2 distortedUV = st;
            
            // Apply directional distortion
            vec2 direction = normalize(st - mousePos);
            distortedUV += direction * sin(time + dist * 5.0) * strength;
            
            // Apply ripple effect
            distortedUV += direction * ripple * smoothstep(0.5, 0.0, dist);
            
            // Sample texture with distorted UVs
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

function LogoModel({ inView }) {
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
  
  useEffect(() => {
    if (inView && !isRotating.current && modelRef.current) {
      isRotating.current = true;
      
      gsap.to(modelRef.current.rotation, {
        x: originalRotation.current.x,
        y: originalRotation.current.y,
        z: originalRotation.current.z,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
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
  const [isInView, setIsInView] = useState(true);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
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
          <LogoModel inView={isInView} />
          <Environment preset="warehouse" intensity={0.8} />
        </Suspense>
      </Canvas>
    </section>
  );
}