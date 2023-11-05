import * as THREE from "three";

/**
 * GraphBufferGeometry
 *
 * This class is a custom BufferGeometry for the MathGrapher component.
 * It's taken from `aframe-plot-component` by Michael Casebolt (https://github.com/mikebolt).
 */
class GraphBufferGeometry extends THREE.BufferGeometry {
  type = "GraphBufferGeometry";
  order = 32;
  bounds = [-1, 1, -1, 1, -1, 1];
  values = [];
  uScale = 1;
  vScale = 1;

  constructor(order, bounds, values, uScale, vScale) {
    super();

    console.log(order, bounds, values, uScale, vScale);

    this.order = order;

    this.values = values;

    let numTriangles = (order - 1) * (order - 1) * 2;
    let numVertices = numTriangles * 3;
    let numFloats = numVertices * 3;

    let vertices = new Float32Array(numFloats);
    let normals = new Float32Array(numFloats);
    let uvs = new Float32Array(numVertices * 2);

    let faceIndex = 0;
    let normalIndex = 0;
    let uvIndex = 0;

    function addValues(vertex, normal, i, j) {
      addVertex(vertex);
      addNormal(normal);
      addUV(vertex.x, vertex.z);
    }

    function addVertex(V) {
      vertices[faceIndex++] = V.x;
      vertices[faceIndex++] = V.y;
      vertices[faceIndex++] = V.z;
    }

    function addNormal(N) {
      normals[normalIndex++] = N.x;
      normals[normalIndex++] = N.y;
      normals[normalIndex++] = N.z;
    }

    function addUV(x, z) {
      uvs[uvIndex++] = x / uScale;
      uvs[uvIndex++] = z / vScale;
    }

    function getNormalVector(A, B, C) {
      let diff1 = B.clone().sub(A);
      let diff2 = C.clone().sub(A);
      let cross = diff1.cross(diff2);
      cross.normalize();
      return cross;
    }

    const xRange = bounds[1] - bounds[0];
    const zRange = bounds[5] - bounds[4];
    const xStep = xRange / (order - 1);
    const zStep = zRange / (order - 1);

    for (let i = 0; i < order - 1; ++i) {
      let x = bounds[0] + i * xStep;

      for (let j = 0; j < order - 1; ++j) {
        let z = bounds[4] + j * zStep;

        let value = values[i][j];
        let valuePlusX = values[i + 1][j];
        let valuePlusZ = values[i][j + 1];
        let valuePlusXZ = values[i + 1][j + 1];

        let A = new THREE.Vector3(x, valuePlusZ, z + zStep);
        let B = new THREE.Vector3(x + xStep, valuePlusX, z);
        let C = new THREE.Vector3(x, value, z);

        let normal = getNormalVector(A, B, C);

        addValues(A, normal, i, j + 1);
        addValues(B, normal, i + 1, j);
        addValues(C, normal, i, j);

        A = new THREE.Vector3(x + xStep, valuePlusX, z);
        B = new THREE.Vector3(x, valuePlusZ, z + zStep);
        C = new THREE.Vector3(x + xStep, valuePlusXZ, z + zStep);

        normal = getNormalVector(A, B, C);

        addValues(A, normal, i + 1, j);
        addValues(B, normal, i, j + 1);
        addValues(C, normal, i + 1, j + 1);
      }
    }

    function freeAttributeArray() {
      this.array = null;
    }

    this.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3).onUpload(freeAttributeArray),
    );
    this.setAttribute("uv", new THREE.BufferAttribute(uvs, 2).onUpload(freeAttributeArray));
    this.computeVertexNormals();
  }
}

export { GraphBufferGeometry };
