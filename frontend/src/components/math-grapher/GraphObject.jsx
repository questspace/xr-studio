import { useState, useEffect } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { GraphBufferGeometry } from "./GraphBufferGeometry";
extend({ GraphBufferGeometry });

export function GraphObject({
  valueFunction,
  order,
  bounds,
  color,
  gridXScale,
  gridZScale,
  showGrid,
  ...props
}) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    console.log(bounds)
    console.log(valueFunction);
    console.log(typeof valueFunction)
    const newValues = [];
    const iRange = bounds[1] - bounds[0];
    const jRange = bounds[5] - bounds[4];

    for (var i = 0; i < order; ++i) {
      var iCoordinate = bounds[0] + (i * iRange) / (order - 1);
      var valueRow = [];
      for (var j = 0; j < order; ++j) {
        var jCoordinate = bounds[4] + (j * jRange) / (order - 1);
        if (valueFunction && typeof valueFunction === "function") {
          var value = valueFunction(iCoordinate, jCoordinate);
          valueRow.push(value);
        }
      }
      newValues.push(valueRow);
    }

    setValues(newValues);
    console.log(newValues);
  }, []);

  console.log(values);

  return (
    <mesh {...props}>
      {values.length > 0 && (
        <graphBufferGeometry
          attach="geometry"
          args={[order, bounds, values, gridXScale, gridZScale]}
        />
      )}
      <meshPhongMaterial attach="material" side={THREE.DoubleSide} color={color} />
    </mesh>
  );
}
