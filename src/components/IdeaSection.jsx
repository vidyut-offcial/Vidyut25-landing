"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./HeroHighlight";
import { Cover } from "./ui/cover";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uIntensity;
  uniform float uVignetteStrength;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    vec4 texColor = texture2D(uTexture, uv);
    
    float dist = distance(uv, uMouse);
    
    float brightness = 1.0;
    if (dist < uRadius) {
      float normDist = dist / uRadius;
      float falloff = 1.0 - normDist * normDist * (3.0 - 2.0 * normDist);
      brightness = 1.0 + (uIntensity * falloff);
    }
    
    texColor.rgb = texColor.rgb * brightness;
    
    float vignette = smoothstep(0.9, 0.1, length((uv - 0.5) * vec2(1.0, 1.2)) * uVignetteStrength);
    texColor.rgb *= vignette;
    
    texColor.rgb *= 1.3;
    
    gl_FragColor = texColor;
  }
`;

function BackgroundCanvas({ canvasRef }) {
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 1;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const textureLoader = new THREE.TextureLoader();
    const rockTexture = textureLoader.load('/images/rock.png', (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rockTexture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: 0.15 },
        uIntensity: { value: 1.2 },
        uVignetteStrength: { value: 1.8 }
      },
      vertexShader,
      fragmentShader
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width);
      const mouseY = 1.0 - ((event.clientY - rect.top) / rect.height);
      
      material.uniforms.uMouse.value.x = mouseX;
      material.uniforms.uMouse.value.y = mouseY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
      
      material.uniforms.uVignetteStrength.value = 1.8 + Math.sin(elapsedTime * 0.2) * 0.1;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);
  
  return null;
}

export default function IdeaSection() {
  const canvasRef = useRef(null);
  
  return (
    <section id="idea-section" className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="-z-1">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      <BackgroundCanvas canvasRef={canvasRef} />
      
      <div className="relative h-screen w-screen font-frontage-bold -translate-y-1/8 flex flex-col gap-4 items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-4xl lg:text-6xl font-semibold text-center"
        >
          <Cover>Converging</Cover> Ideas
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-4xl lg:text-7xl font-semibold text-center"
        >
          Creating <Cover>Tomorrow.</Cover>
        </motion.h1>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent hidden md:block animate-pulse z-20" />

      </div>
    </section>
  );
}