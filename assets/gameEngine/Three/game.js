import * as THREE from "../../../node_modules/three/build/three.module.js";
console.log("hej");
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(800, 400);

camera.position.setZ(30);

const pointerLight = new THREE.PointLight(0xffffff);
pointerLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointerLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  smallSphere.rotation.x += 0.01;
  smallSphere.rotation.y += 0.005;
  smallSphere.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

//Skapa första bollen
const smallSphereTemp = new THREE.SphereGeometry(0.8, 32, 16);
const smallSphereColor = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const smallSphere = new THREE.Mesh(smallSphereTemp, smallSphereColor);

smallSphere.position.y = 10;

scene.add(smallSphere);

//Storlekar
const mapWidth = 25;
const mapLenght = 2;
const mapHight = 50;

// Skapa Grunden
const groundTemp = new THREE.BoxGeometry(mapWidth, 0.1, mapLenght);
const material = new THREE.MeshBasicMaterial({
  color: 0xfee8e9,
  side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(groundTemp, material);
scene.add(ground);

//Skapa väggarna
const backWallTemp = new THREE.BoxGeometry(mapWidth, mapHight, 0.1);
const backWall = new THREE.Mesh(backWallTemp, material);

backWall.position.z = -(mapLenght / 2);
backWall.position.y = mapHight / 2;
scene.add(backWall);

//Skapa väggorna till sidan

const leftWallTemp = new THREE.BoxGeometry(0.1, mapHight, mapLenght);
const leftWall = new THREE.Mesh(leftWallTemp, material);

leftWall.position.x = -(mapWidth / 2);
leftWall.position.y = mapHight / 2;
scene.add(leftWall);

const rightWallTemp = new THREE.BoxGeometry(0.1, mapHight, mapLenght);
const rightWall = new THREE.Mesh(rightWallTemp, material);

rightWall.position.x = mapWidth / 2;
rightWall.position.y = mapHight / 2;
scene.add(rightWall);

//Skapa frontväggen
const frontWallTemp = new THREE.BoxGeometry(mapWidth, mapHight, 0.1);
const frontWallColor = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  opacity: 0.4,
  transparent: true,
});
const frontWall = new THREE.Mesh(frontWallTemp, frontWallColor);

frontWall.position.z = mapLenght / 2;
frontWall.position.y = mapHight / 2;
scene.add(frontWall);

/*
let APP_ = null;
window.addEventListener("DOMContentLoader", async () => {
  Ammo().then((lib) => {
    ammo = lib;
    APP_ = scene;
    APP_.initialize();
  });
});*/

let physicsWorld;

Ammo().then(start);

function start() {
  //code goes here
  setupPhysicsWorld();
}

function setupPhysicsWorld() {
  let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
    overlappingPairCache = new Ammo.btDbvtBroadphase(),
    solver = new Ammo.btSequentialImpulseConstraintSolver();

  physicsWorld = new Ammo.btDiscreteDynamicsWorld(
    dispatcher,
    overlappingPairCache,
    solver,
    collisionConfiguration
  );
  physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
}
animate();
