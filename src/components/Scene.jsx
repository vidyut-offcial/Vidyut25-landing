import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";

export function Scene() {
  // Always use third person
  const thirdPerson = true;
  // Fixed camera position
  const cameraPosition = [-6, 3.9, 6.21];
  const carRef = useRef();

  return (
    <Suspense fallback={null}>
      <Environment
        files={"/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      
      <Physics>
        <Ground />
        <Track />
        <Car ref={carRef} thirdPerson={thirdPerson} />
      </Physics>
    </Suspense>
  );
}