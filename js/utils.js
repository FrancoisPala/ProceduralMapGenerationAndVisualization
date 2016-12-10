
function cubesLoop(group, boxGeo) {
  for (var y = 0; y < size; y++) {
    for (var i = 0; i < size; i++) {

      var val = getP(i, y);

      var boxMat = new THREE.MeshBasicMaterial({
        color: colorify("shade", val),
        wireframe: WireframeBool
      });
      boxMat.__dirtyColors = true;

      var mapCube = setCube(boxGeo, boxMat, i, y);

      group.add(mapCube);
    }
  }
  return group;
}

function setCube(boxGeo, boxMat, i, y) {
  var myCube = new THREE.Mesh(boxGeo, boxMat, i, y);
  myCube.position.x = i;
  myCube.position.y = y;
  myCube.position.z = getP(i, y);
  myCube.updateMatrix();
  myCube.matrixAutoUpdate = false;
  myCube.dynamic = true;
  return myCube;
}


function colorify(style, depth) {
  switch (style) {
    case "steps":
      return steps(depth);
      break;
    case "shade":
      return getDepthColor(depth);
      break;
  }
}

function steps(depth) {
  if ((depth / size) * 100 < 33) {
    return new THREE.Color("rgb(0, 0, 255)");
  }
  else if ((depth / size) * 100 < 80) {
    return new THREE.Color("rgb(0, 255, 0)");
  }
  else {
    return new THREE.Color("rgb(255, 0, 0)");
  }
}

function getDepthColor(depth) {
  var rgb = "rgb(0";
  // rgb += (255 - Math.floor(255 * (depth / size))).toString();
  rgb += ", 0, ";
  rgb += (Math.floor(255 - (255 * (depth / size)))).toString();
  rgb += ")";
  return new THREE.Color(rgb);
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var myColor = '';
  for (var i = 0; i < 6; i++) {
    myColor += letters[Math.floor(Math.random() * 16)];
  }
  return myColor;
}
function setControls(camera) {
  var ctrl = new THREE.TrackballControls(camera);

  ctrl.rotateSpeed = 8.0;
  ctrl.zoomSpeed = 1.2;
  ctrl.panSpeed = 2;
  ctrl.noZoom = false;
  ctrl.noPan = false;
  ctrl.staticMoving = false;
  ctrl.dynamicDampingFactor = 0.3;
  ctrl.keys = [65, 83, 68];
  ctrl.addEventListener('change', render);
  return ctrl;
}
function setCamera(x, y, z) {
  var cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);


  cam.position.x = x;
  cam.position.y = y;
  cam.position.z = z;
  return cam;
}
function setScene() {
  var setScene = new THREE.Scene();
  //setScene.background = new THREE.Color( 0xff0000 );
  return setScene;
}
function animate() {
  requestAnimationFrame(animate);
  controls.update();
}
function render() {
  // group.rotation.y += 0.1;
  renderer.render(scene, camera);
  // stats.update();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
  render();
}
