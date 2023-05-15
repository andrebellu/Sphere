import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import './style.css';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 'orange',
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const light = new THREE.PointLight('white', 0.5);
light.position.set(20, 20, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1})
  .fromTo(mesh.rotation, {x: 0, y: 0, z: 0}, {x: Math.PI * 2, y: Math.PI * 2, z: Math.PI * 2}, '-=1')
tl.fromTo('nav', {opacity: 0}, {opacity: 1})
  .fromTo('.title', {opacity: 0}, {opacity: 1})