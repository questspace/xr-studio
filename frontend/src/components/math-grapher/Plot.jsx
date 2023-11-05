import { useEffect, useState } from "react";
import * as math from "mathjs";
import * as THREE from "three";
import { GraphObject } from "./GraphObject";
import { ZeroPlanes } from "./ZeroPlanes";
import { BoundingBox } from "./BoundingBox";
import { useFrame } from "@react-three/fiber";

let functionScope = { t: 0.0 };

/**
 *
 * Parameters based on `plot` component from
 * https://github.com/mikebolt/aframe-plot-component/blob/master/index.js
 *
 *  'equation': {'type': 'string', 'default': '0'},
 *  'order': {'type': 'number', 'default': 32},
 *  'label_text': {'type': 'string', 'default': ''},
 *  'show_formula': {'type': 'boolean', 'default': false},
 *  'show_axes': {'type': 'boolean', 'default': true},
 *  'bounds': {'type': 'string', 'default': '-1 1 -1 1 -1 1'},
 *  'show_zero_planes': {'type': 'boolean', 'default': false},
 *  'show_bounding_box': {'type': 'boolean', 'default': false},
 *  'show_grid': {'type': 'boolean', 'default': true}, // TODO
 *  'grix_x_scale': {'type': 'number', 'default': 0.1}, // TODO
 *  'grid_z_scale': {'type': 'number', 'default': 0.1}, // TODO
 *  'color': {'type': 'string', 'default': '#AAA'},
 *  'animate': {'type': 'boolean', 'default': false}
 */
function Plot({
  equation,
  order,
  labelText,
  showFormula,
  showAxes,
  bounds,
  showZeroPlanes,
  showBoundingBox,
  showGrid,
  gridXScale,
  gridZScale,
  color,
  animate,
  ...props
}) {
  //   const [compiledFunction, setCompiledFunction] = useState((i, j) => math.compile(equation));

  //   useEffect(() => {
  //     console.log(bounds);
  //     console.log(equation);
  //     console.log(order);
  //     const code = math.compile(equation);
  //     console.log(code);
  //     // setEvaluatedFunction(function (i, j) {
  //     //   console.log(i, j);
  //     //   functionScope.x = i || 1;
  //     //   functionScope.y = j || 1;
  //     //   return code.evaluate(functionScope);
  //     // });
  //     console.log(evaluatedFunction);
  //   }, [equation, bounds, order]);

  useFrame((state, delta, xrFrame) => {
    if (animate) {
      functionScope.t = (delta % 1000) / 1000;
    }
  });

//   console.log(bounds);
//   console.log(evaluatedFunction);

  return (
    <group {...props}>
      {showAxes && <axesHelper />}
      {bounds && showZeroPlanes && <ZeroPlanes bounds={bounds} />}
      {bounds && showBoundingBox && <BoundingBox bounds={bounds} />}
      {bounds && equation && (
        <GraphObject
          valueFunction={function (i, j) {
            functionScope.x = i || 1;
            functionScope.y = j || 1;
            return math.evaluate(equation, functionScope);
          }}
          functionScope={functionScope}
          order={order}
          bounds={bounds}
          color={color}
          gridXScale={gridXScale}
          gridZScale={gridZScale}
          showGrid={showGrid}
        />
      )}
    </group>
  );
}

Plot.defaultProps = {
  equation: 0,
  order: 32,
  labelText: "",
  showFormula: false,
  showAxes: true,
  bounds: [-1.0, 1.0, -1.0, 1.0, -1.0, 1.0], // [-x, +x, -y, +y, -z, +z]
  showZeroPlanes: false,
  showBoundingBox: false,
  showGrid: true,
  gridXScale: 0.1,
  gridZScale: 0.1,
  color: new THREE.Color("#aaa"),
  animate: false,
};

export { Plot };
