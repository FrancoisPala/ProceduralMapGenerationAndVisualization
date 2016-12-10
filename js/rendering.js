var camera, controls, scene, boxGeo, group;
var WireframeBool = false;

function init() {
  var wth = window.innerWidth;
  var height = window.innerHeight;

  camera = setCamera(0, 0, -50);
  controls = setControls(camera);
  scene = setScene();

  boxGeo = new THREE.BoxGeometry(1, 1, 1);

  group = new THREE.Object3D();
  group = cubesLoop(group, boxGeo);

  scene.add(group);

    //var light = new THREE.DirectionalLight(0xffffff);
    //light.position.set(50, 50, 10);
    //scene.add(light);
    //light = new THREE.DirectionalLight(0x002288);
  //   light.position.set(-1, -1, -1);
  //   scene.add(light);
    //var light = new THREE.AmbientLight(0x222222);
    //scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  console.log('THIS ETHAN');
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);
  window.addEventListener( 'resize', onWindowResize, false );
  render();
}
