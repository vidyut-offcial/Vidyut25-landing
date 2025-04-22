"use client";

import gsap from "gsap";
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
    const rockTexture = textureLoader.load("/images/rock.png", (texture) => {
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
        uVignetteStrength: { value: 1.8 },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / rect.width;
      const mouseY = 1.0 - (event.clientY - rect.top) / rect.height;

      material.uniforms.uMouse.value.x = mouseX;
      material.uniforms.uMouse.value.y = mouseY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      material.uniforms.uVignetteStrength.value =
        1.8 + Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return null;
}

export default function IdeaSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(heading1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(heading2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out",
          });
        } else {
          // Reset styles so animation can replay on re-entry
          gsap.set([heading1Ref.current, heading2Ref.current], {
            opacity: 0,
            y: 20,
          });
        }
      },
      { threshold: 0.3 }
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
      ref={sectionRef}
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden"
      id="idea-section"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <BackgroundCanvas canvasRef={canvasRef} />

      <div className="relative h-screen w-screen font-frontage-bold flex flex-col gap-4 items-center justify-center -translate-y-1/8 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <h1
          ref={heading1Ref}
          className="opacity-0 translate-y-5 text-2xl sm:text-3xl md:text-4xl lg:text-6xl 2xl:text-6xl font-semibold text-center"
        >
          <Cover>Converging</Cover> Ideas
        </h1>
        <h1
          ref={heading2Ref}
          className="opacity-0 translate-y-5 text-2xl sm:text-3xl md:text-4xl lg:text-7xl 2xl:text-7xl font-semibold text-center"
        >
          Creating <Cover>Tomorrow.</Cover>
        </h1>
      </div>
    </section>
  );
}
