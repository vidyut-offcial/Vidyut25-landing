"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import LogoModel from "@/models/LogoModel";
import { TextFade } from "@/components/FadeUp";
import { motion, AnimatePresence } from "framer-motion";

const subtitleLines = [
  "Manifest the future",
  "Sparking innovation",
  "Building a sustainable future"
];



export const AnimatedSubtitle = () => {
  const subtitleLines = [
    "Manifest the future",
    "Sparking innovation",
    "Building a sustainable future"
  ];

  const textVariants = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(8px)",
      y: -20,
      transition: { duration: 0.8, ease: "easeIn" },
    },
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitleLines.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 min-h-[2rem] sm:min-h-[2.5rem] relative flex justify-center sm:top-10 ">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute text-zinc-300 text-[clamp(1rem,4vw,1.5rem)]  text-center tracking-wide whitespace-nowrap  sm:whitespace-nowrap"
        >
          {subtitleLines[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


function TerrainVectorBackground() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const [texture, setTexture] = useState(null);



  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/webp_output/terrain.webp', (loadedTexture) => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          gsap.to(
            sectionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out"
            }
          );
        } else if (!entry.isIntersecting && sectionRef.current) {
          // Reset state so it can replay
          gsap.set(sectionRef.current, { opacity: 0, y: 50, scale: 0.95 });
        }
      },
      {
        threshold: 0.4 // Adjust based on how visible the section should be to trigger
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
      className="relative top-0 opacity-0 translate-y-[100px] left-0 h-[50vh] sm:h-[100vh] xs:h-[60vh] w-screen overflow-hidden"
    >

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,black,transparent_40%),linear-gradient(to_bottom,black,transparent_40%),linear-gradient(to_left,black,transparent_20%),linear-gradient(to_right,black,transparent_20%)]"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* The text */}
      <div className="absolute w-full z-10 bottom-[50px] sm:top-2/3 sm:mt-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-frontage-bold ">
        <TextFade
          direction="up"
          className="pt-0 flex-col flex justify-center items-center " // reduced space
        >
          <h2 className="text-2xl text-center font-bold md:text-4xl sm:text-3xl lg:text-5xl xl:text-7xl md:leading-[0rem] prose-h2:my-0">
            Echoes of tomorrow
          </h2>
          <div className="mt-[1px] sm:mt-4 sm:font-frontage-bold font-mono">
          <AnimatedSubtitle />
          </div>
        </TextFade>

      </div>
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
        <ambientLight intensity={1} />
        <directionalLight
          position={[0, 5, 5]}
          intensity={1}
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
