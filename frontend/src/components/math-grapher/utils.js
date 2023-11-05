function createPlot() {
  if (this.graphObject !== null) {
    this.root.remove(this.graphObject);
  }

  this.graphObject = createGraphObject(
    this.F,
    this.data.order,
    this.bounds,
    this.data.color,
    this.data.grid_x_scale,
    this.data.grid_y_scale,
    this.data.show_grid,
  );
  this.root.add(this.graphObject);
}

function updateGraph() {
  var code = math.compile(this.data.function);
  var scope = { t: 0.0 };
  this.scope = scope;
  this.F = function (i, j) {
    scope.x = i;
    scope.y = j;
    return code.eval(scope);
  };

  console.log(this.data);

  var root = new THREE.Object3D();
  this.root = root;

  // TODO: make this more robust with format checking
  // [-x, +x, -y, +y, -z, +z]
  this.bounds = this.data.bounds.split(" ").map(function (x) {
    return parseFloat(x);
  });

  // TODO: make custom axes that extend to the bounds
  if (this.data.axes_enabled === true) {
    var axes = makeAxes();
    root.add(axes);
  }

  if (this.data.show_zero_planes === true) {
    var zeroPlanes = makeZeroPlanes(this.bounds);
    root.add(zeroPlanes);
  }

  if (this.data.show_bounding_box === true) {
    var boundingBox = makeBoundingBox(this.bounds);
    root.add(boundingBox);
  }

  this.graphObject = null;
  this.createPlot();
  this.el.setObject3D("mesh", root);

  console.log(root);
}

/**
 * Called on each scene tick.
 */
function animatePlot(t, scope) {
  scope.t = (t % 1000) / 1000;
  createPlot();
}
