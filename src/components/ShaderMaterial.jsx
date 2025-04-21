import React, { useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';

class CustomShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: { x: 0, y: 0 } },
        uResolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        uTexture: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse / uResolution;

          // Add distortion based on mouse position
          uv.x += sin(uTime * 2.0 + uv.y * 10.0) * 0.02 * mouse.x;
          uv.y += cos(uTime * 2.0 + uv.x * 10.0) * 0.02 * mouse.y;

          gl_FragColor = texture2D(uTexture, uv);
        }
      `,
    });
  }
}

extend({ CustomShaderMaterial });

const CustomShaderMaterialComponent = ({ imageUrl }) => {
  const material = useMemo(() => new CustomShaderMaterial(), []);
  const { size, pointer } = useThree();

  // Update uniforms directly in useFrame without triggering re-renders
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime(); // Update time
    material.uniforms.uMouse.value.set(pointer.x * size.width, pointer.y * size.height); // Update mouse position
  });

  return <customShaderMaterial attach="material" args={[imageUrl]} />;
};

export default CustomShaderMaterialComponent;