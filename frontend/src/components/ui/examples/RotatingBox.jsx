import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import * as R3FDrei from "@react-three/drei";

export const RotatingBox = () => {
  return (
    <>
      <R3FDrei.Box
  args={[1, 1, 1]}
  position={[1, 1.2, 0]}
  rotation={[0, Math.PI / 180 * 25, 0]}
  material={new THREE.MeshBasicMaterial({ color: "orange" })}
/>
    </>
  );
};