import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import { Ramp } from "./Ramp";

// Billboard component to handle loading and positioning of billboards
const Billboard = ({ position, rotation = [0, 0, 0] }) => {
  const billboardModel = useLoader(GLTFLoader, "/models/billboard.glb");
  const billboardTexture = useLoader(TextureLoader, "/images/demo.png");

  useEffect(() => {
    // Apply texture to the correct material
    billboardModel.scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name, child.material);
        
        // Check if the child has the specific material we're looking for
        if (child.material && child.material.name === "Cube005_Material004_0") {
          child.material.map = billboardTexture;
          child.material.needsUpdate = true;
        }
        // For materials that might be in an array
        else if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat.name === "Cube005_Material004_0") {
              mat.map = billboardTexture;
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [billboardModel, billboardTexture]);

  return (
    <primitive 
      scale={0.01}
      object={billboardModel.scene.clone()} 
      position={position} 
      rotation={rotation} 
    />
  );
};

export function Track() {
  const result = useLoader(
    GLTFLoader,
    "/models/track.glb"
  );

  const colorMap = useLoader(
    TextureLoader,
    "/textures/track.png"
  );

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

  let geometry = result.scene.children[0].geometry;

  return (
    <>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          toneMapped={false}
          map={colorMap}
        />
      </mesh>

      <Ramp />
      
      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]}/>
      
      <ColliderBox position={[-1.85,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-1.85,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.125]} scale={[0.13, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.9]} scale={[0.13, 1, 0.13]}/>
      
      <ColliderBox position={[-2.86,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[-3.33,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[0.41,0,2]} scale={[0.35, 1, 0.35]}/>
      
      <ColliderBox position={[-2.3,0,-2.76]} scale={[1.37, 1, 1.09]}/>
      
      <ColliderBox position={[-3.08,0,0.89]} scale={[0.36, 1, 0.03]}/>
      <ColliderBox position={[-2.53,0,0.89]} scale={[0.36, 1, 0.03]}/>
      
      <ColliderBox position={[-4.53,0,-0.65]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.15,0,-0.67]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.9,0,-0.58]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>
      
      {/* Add four billboards positioned around the track */}
      <Billboard position={[4, 0, 2]} rotation={[0, -Math.PI / 4, 0]} />
      <Billboard position={[-8, 0, -2]} rotation={[0, Math.PI / 3, 0]} />
      <Billboard position={[-2, 0, -7]} rotation={[0, Math.PI / 2, 0]} />
      <Billboard position={[-6, 0, 6]} rotation={[0, -Math.PI / 6, 0]} />
    </>
  );
}