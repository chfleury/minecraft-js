import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { World } from "./World/World";
import Stats from "three/examples/jsm/libs/stats.module.js";

const stats = new Stats();
document.body.append(stats.dom);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-32, 16, -32);

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);

renderer.setSize(window.innerWidth, window.innerHeight);
// set sky color
renderer.setClearColor(0x87ceeb, 1); // TODO

// generate world
const world = new World(32);
world.generate();
scene.add(world);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  stats.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// TODO
function setupLights() {
  const ambientLight = new THREE.AmbientLight(); // TODO
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(); // TODO
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(); // TODO
  directionalLight2.position.set(-1, 1, -0.5).normalize();
  scene.add(directionalLight2);
}

setupLights();
