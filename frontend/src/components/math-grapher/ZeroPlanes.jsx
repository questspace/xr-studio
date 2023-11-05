import * as THREE from "three";

export function ZeroPlanes({ bounds }) {
  const xRange = bounds[1] - bounds[0];
  const yRange = bounds[3] - bounds[2];
  const zRange = bounds[5] - bounds[4];

  const color = new THREE.Color(0x2244bb);

  return (
    <group>
      {/* X part */}
      <mesh
        name="zeroX"
        position={[0.0, bounds[2] + yRange / 2, bounds[4] + zRange / 2]}
        rotation={[0.0, Math.PI / 2, 0.0]}
      >
        <planeGeometry attach="geometry" args={[zRange, yRange]} />
        <meshLambertMaterial
          name="zeroPlaneMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>

      {/* Y parts */}
      <mesh
        name="zeroY"
        position={[bounds[0] + xRange / 2, 0.0, bounds[4] + zRange / 2]}
        rotation={[Math.PI / 2, 0.0, 0.0]}
      >
        <planeGeometry attach="geometry" args={[zRange, yRange]} />
        <meshLambertMaterial
          name="zeroPlaneMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>

      {/* Z parts */}
      <mesh name="zeroZ" position={[bounds[0] + xRange / 2, bounds[2] + yRange / 2, 0.0]}>
        <planeGeometry attach="geometry" args={[xRange, yRange]} />
        <meshLambertMaterial
          name="zeroPlaneMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>
    </group>
  );
}
