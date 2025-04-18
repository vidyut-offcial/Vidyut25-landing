import React, { useRef, Suspense, useEffect, useState, forwardRef } from 'react';
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

function DiamondStars() {
  const starsGeometry = useRef();
  const starsMaterial = useRef();
  
  useEffect(() => {
    const vertices = [];
    const sizes = [];
    const colors = [];
    const twinkleData = [];
    const color = new THREE.Color();
    
    const createStarLayer = (count, minRadius, maxRadius, sizeMultiplier) => {
      for (let i = 0; i < count; i++) {
        let x, y, z;
        const distMethod = Math.random();
        if (distMethod < 0.6) {
          const radius = minRadius + Math.random() * (maxRadius - minRadius);
          const theta = 2 * Math.PI * Math.random();
          const phi = Math.acos(2 * Math.random() - 1);
          x = radius * Math.sin(phi) * Math.cos(theta);
          y = radius * Math.sin(phi) * Math.sin(theta);
          z = radius * Math.cos(phi);
        } else if (distMethod < 0.8) {
          const radius = minRadius + Math.random() * (maxRadius - minRadius);
          const theta = 2 * Math.PI * Math.random();
          x = radius * Math.cos(theta);
          y = (Math.random() - 0.5) * (maxRadius - minRadius) * 0.2;
          z = radius * Math.sin(theta);
        } else {
          const clusterCenterX = (Math.random() - 0.5) * maxRadius * 2;
          const clusterCenterY = (Math.random() - 0.5) * maxRadius * 2;
          const clusterCenterZ = (Math.random() - 0.5) * maxRadius * 2;
          const clusterRadius = Math.random() * (maxRadius - minRadius) * 0.1;
          x = clusterCenterX + (Math.random() - 0.5) * clusterRadius;
          y = clusterCenterY + (Math.random() - 0.5) * clusterRadius;
          z = clusterCenterZ + (Math.random() - 0.5) * clusterRadius;
        }
        vertices.push(x, y, z);
        
        const sizeDistribution = Math.random();
        let size;
        if (sizeDistribution < 0.7) {
          size = (0.5 + Math.random() * 1.5) * sizeMultiplier;
        } else if (sizeDistribution < 0.95) {
          size = (2.0 + Math.random() * 2.0) * sizeMultiplier;
        } else {
          size = (4.0 + Math.random() * 3.0) * sizeMultiplier;
        }
        sizes.push(size);
        
        let starType = Math.random();
        const layerHueShift = (maxRadius - minRadius) / 2000;
        if (starType < 0.0005) {
          color.setHSL(0.6 + layerHueShift, 1, 0.95);
        } else if (starType < 0.002) {
          color.setHSL(0.6 + layerHueShift, 0.85, 0.9);
        } else if (starType < 0.01) {
          color.setHSL(0.6 + layerHueShift, 0.4, 0.95);
        } else if (starType < 0.05) {
          color.setHSL(0.15 + layerHueShift, 0.3, 0.95);
        } else if (starType < 0.12) {
          color.setHSL(0.15 + layerHueShift, 0.7, 0.85);
        } else if (starType < 0.24) {
          color.setHSL(0.07 + layerHueShift, 0.9, 0.8);
        } else if (starType < 0.5) {
          color.setHSL(0.02 + layerHueShift, 0.95, 0.7);
        } else if (starType < 0.6) {
          color.setHSL(0.01 + layerHueShift, 1.0, 0.75);
        } else if (starType < 0.65) {
          color.setHSL(0.65 + layerHueShift, 0.9, 0.85);
        } else if (starType < 0.67) {
          color.setHSL(0.6 + layerHueShift, 0.2, 0.98);
        } else {
          const hue = Math.random() * 0.2 + (Math.random() < 0.5 ? 0 : 0.6) + layerHueShift;
          color.setHSL(hue, 0.7 + Math.random() * 0.3, 0.7 + Math.random() * 0.3);
        }
        colors.push(color.r, color.g, color.b);
        
        // Twinkle effect data
        const twinkleSpeed = 0.3 + Math.random() * 3.0;
        const twinklePhase = Math.random() * Math.PI * 2;
        const twinkleIntensity = 0.3 + Math.random() * 0.7;
        twinkleData.push(twinkleSpeed, twinklePhase, twinkleIntensity);
      }
    };
    
    // Further reduced star counts for performance
    createStarLayer(700, 200, 500, 1.2);  // Close stars
    createStarLayer(1000, 500, 1500, 1.0); // Mid-distance stars
    createStarLayer(800, 1500, 2500, 0.8); // Far stars
    createStarLayer(400, 2500, 5000, 1.5);  // Very distant stars
    
    starsGeometry.current.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    starsGeometry.current.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    starsGeometry.current.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    starsGeometry.current.setAttribute(
      'twinkle',
      new THREE.Float32BufferAttribute(twinkleData, 3)
    );
  }, []);
  
  useFrame((state) => {
    if (starsMaterial.current) {
      starsMaterial.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });
  
  return (
    <points>
      <bufferGeometry ref={starsGeometry} />
      <shaderMaterial 
        ref={starsMaterial}
        vertexShader={`
          attribute float size;
          attribute vec3 color;
          attribute vec3 twinkle;
          varying vec3 vColor;
          varying float vTwinkleSpeed;
          varying float vTwinkleOffset;
          varying float vTwinkleIntensity;
          uniform float time;
          void main() {
            vColor = color;
            vTwinkleSpeed = twinkle.x;
            vTwinkleOffset = twinkle.y;
            vTwinkleIntensity = twinkle.z;
            float twinkleFactor = 1.0 - vTwinkleIntensity + vTwinkleIntensity * 
                               (0.5 + 0.5 * sin(time * vTwinkleSpeed + vTwinkleOffset));
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * twinkleFactor * (500.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            // Create circular shape by checking point coords
            vec2 center = vec2(0.5, 0.5);
            vec2 pt = gl_PointCoord - center;
            
            // Calculate distance from center (circular)
            float dist = length(pt) * 2.0;
            if (dist > 1.0) discard;
            
            // Soften the edges for a nicer circle
            float intensity = 1.0 - smoothstep(0.5, 1.0, dist);
            vec3 glowColor = vColor * intensity;
            gl_FragColor = vec4(glowColor, intensity);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          time: { value: 0 }
        }}
      />
    </points>
  );
}

function SpaceDust() {
  const dustRef = useRef();
  const dustMaterialRef = useRef();
  
  useEffect(() => {
    const particles = 2500;
    const positions = new Float32Array(particles * 3);
    const sizes = new Float32Array(particles);
    const colors = new Float32Array(particles * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < particles; i++) {
      let x, y, z;
      const distributionPattern = Math.random();
      
      if (distributionPattern < 0.5) {
        const r = 400 + 1200 * Math.pow(Math.random(), 2);
        const theta = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 100;
        x = r * Math.cos(theta);
        y = height;
        z = r * Math.sin(theta);
      } else {
        const r = 200 + 1600 * Math.pow(Math.random(), 1.5);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      }
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      const size = (distributionPattern < 0.8) ? 
        (0.5 + Math.random() * 1.5) : 
        (2.0 + Math.random() * 2.0);
      sizes[i] = size;
      
      if (distributionPattern < 0.4) {
        color.setHSL(0.6, 0.7, 0.15 + Math.random() * 0.2);
      } else if (distributionPattern < 0.7) {
        color.setHSL(0.75, 0.5, 0.15 + Math.random() * 0.2);
      } else {
        color.setHSL(0.15, 0.8, 0.15 + Math.random() * 0.2);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    dustRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustRef.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    dustRef.current.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  useFrame((state) => {
    if (dustMaterialRef.current) {
      dustMaterialRef.current.uniforms.time.value = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <points>
      <bufferGeometry ref={dustRef} />
      <shaderMaterial
        ref={dustMaterialRef}
        vertexShader={`
          attribute float size;
          attribute vec3 customColor;
          varying vec3 vColor;
          uniform float time;
          void main() {
            vColor = customColor;
            vec3 newPosition = position;
            float cosTime = cos(time * 0.05);
            float sinTime = sin(time * 0.05);
            float x = newPosition.x * cosTime - newPosition.z * sinTime;
            float z = newPosition.x * sinTime + newPosition.z * cosTime;
            float yOffset = sin(time * 0.02 + newPosition.x * 0.001 + newPosition.z * 0.001) * 10.0;
            newPosition.x = x;
            newPosition.y += yOffset;
            newPosition.z = z;
            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_PointSize = size * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            // Circular shape instead of square
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = 0.5 * pow(1.0 - d * 2.0, 1.5);
            gl_FragColor = vec4(vColor, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          time: { value: 0 }
        }}
      />
    </points>
  );
}

function DistantStars() {
  const generateScatteredPosition = (minDistance, maxDistance) => {
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    return [
      distance * Math.sin(phi) * Math.cos(theta),
      distance * Math.sin(phi) * Math.sin(theta),
      distance * Math.cos(phi)
    ];
  };
  
  return (
    <group>
      {[...Array(5)].map((_, i) => {
        const [x, y, z] = generateScatteredPosition(1000, 3500);
        const brightness = 0.5 + Math.random() * 0.5;
        const size = 5 + brightness * 8;
        const starColors = [
          '#ffffff',
          '#b3e5fc',
          '#80d8ff',
          '#ffecb3',
          '#ffe082',
          '#ffccbc',
          '#ff8a65',
          '#d1c4e9',
        ];
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        return (
          <group key={`distant-star-${i}`}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={brightness * 0.9}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[size * 3, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={brightness * 0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

const Scene = forwardRef(({ scale }, ref) => {
  const modelRef = useRef();
  const initialPosition = useRef([2.5, -1, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { camera } = useThree();
  const [starSpeed, setStarSpeed] = useState(0.1);

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

  const animateRotation = () => {
    if (isAnimating || !modelRef.current) return;
    setIsAnimating(true);
    gsap.to(modelRef.current.rotation, {
      duration: 1,
      y: modelRef.current.rotation.y + Math.PI * 2,
      onComplete: () => setIsAnimating(false),
    });
  };

  const animateMove = (direction) => {
    if (isAnimating || !modelRef.current) return;
    const currentModel = modelRef.current;
    setIsAnimating(true);
    let targetPosition = { ...currentModel.position };
    switch (direction) {
      case 'up':
        targetPosition.y += 2;
        break;
      case 'down':
        targetPosition.y -= 2;
        break;
      case 'left':
        targetPosition.x -= 2;
        break;
      case 'right':
        targetPosition.x += 2;
        break;
      default:
        break;
    }
    gsap.to(currentModel.position, {
      duration: 1,
      ...targetPosition,
      onComplete: () =>
        gsap.to(currentModel.position, {
          duration: 1,
          x: initialPosition.current[0],
          y: initialPosition.current[1],
          z: initialPosition.current[2],
          onComplete: () => setIsAnimating(false),
        }),
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isAnimating) return;
      switch (event.code) {
        case 'Space':
          animateRotation();
          break;
        case 'ArrowUp':
          animateMove('up');
          break;
        case 'ArrowDown':
          animateMove('down');
          break;
        case 'ArrowLeft':
          animateMove('left');
          break;
        case 'ArrowRight':
          animateMove('right');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating]);

  return (
    <>
      <color attach="background" args={['#000005']} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 5, 5]} intensity={0.5} color="#a2d2ff" />
      <pointLight position={[-5, 0, -5]} color={0x1F51FF} intensity={0.8} />
      <Suspense fallback={null}>
        <Model 
          scale={scale} 
          url="/models/spaceship.glb" 
          ref={modelRef} 
        />
        <DiamondStars />
        <SpaceDust />
        <DistantStars />
      </Suspense>
      <EffectComposer>
        <Bloom
          intensity={1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Noise opacity={0.015} />
      </EffectComposer>
    </>
  );
});

export default Scene;