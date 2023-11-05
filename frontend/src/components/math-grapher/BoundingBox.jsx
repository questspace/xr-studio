import * as THREE from "three";

export function BoundingBox({ bounds }) {
  const xRange = bounds[1] - bounds[0];
  const yRange = bounds[3] - bounds[2];
  const zRange = bounds[5] - bounds[4];

  const color = new THREE.Color(0xdddddd);

  console.log(xRange, yRange, zRange)

  return (
    <group>
      {/* X parts */}
      <mesh
        name="lowX"
        position={[bounds[0], bounds[2] + yRange / 2, bounds[4] + zRange / 2]}
        rotation={[0.0, Math.PI / 2, 0.0]}
      >
        <planeGeometry attach="geometry" args={[zRange, yRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>
      <mesh
        name="highX"
        position={[bounds[1], bounds[2] + yRange / 2, bounds[4] + zRange / 2]}
        rotation={[0.0, Math.PI / 2, 0.0]}
      >
        <planeGeometry attach="geometry" args={[zRange, yRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>

      {/* Y parts */}
      <mesh
        name="lowY"
        position={[bounds[0] + xRange / 2, bounds[2], bounds[4] + zRange / 2]}
        rotation={[Math.PI / 2, 0.0, 0.0]}
      >
        <planeGeometry attach="geometry" args={[xRange, zRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>
      <mesh
        name="highY"
        position={[bounds[0] + xRange / 2, bounds[3], bounds[4] + zRange / 2]}
        rotation={[Math.PI / 2, 0.0, 0.0]}
      >
        <planeGeometry attach="geometry" args={[xRange, zRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>

      {/* Z parts */}
      <mesh name="lowZ" position={[bounds[0] + xRange / 2, bounds[2] + yRange / 2, bounds[4]]}>
        <planeGeometry attach="geometry" args={[xRange, yRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
          attach="material"
          color={color}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1 / 8}
        />
      </mesh>
      <mesh name="highZ" position={[bounds[0] + xRange / 2, bounds[2] + yRange / 2, bounds[5]]}>
        <planeGeometry attach="geometry" args={[xRange, yRange]} />
        <meshLambertMaterial
          name="boundingMaterial"
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
