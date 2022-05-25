import * as THREE from "../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

//variable declaration section
let physicsWorld,
  scene,
  camera,
  renderer,
  controls,
  tmpTrans,
  rigidBodies = [],
  ambientLight,
  pointerLight;

let ballCount = 0,
  t = 0;

let clock = new THREE.Clock();

const EARTH_GRAVITY = -9.807;

const mapWidth = 60,
  mapDepth = 4,
  mapHeight = 100,
  BODY_RESTITUTION = 0.9;

var theImages = [
  new THREE.TextureLoader().load("../../imges/boysen/filip.PNG"),
  new THREE.TextureLoader().load("../../imges/boysen/oscar.jpeg"),
  new THREE.TextureLoader().load("../../imges/boysen/herman.PNG"),
  new THREE.TextureLoader().load("../../imges/boysen/matsboge.PNG"),
  new THREE.TextureLoader().load("../../imges/boysen/timmy.PNG"),
];

//Ammojs Initialization
Ammo().then(start);

function start() {
  tmpTrans = new Ammo.btTransform();

  setupPhysicsWorld();

  setupGraphics();

  //createBlock();
  //Ground
  createBlock(
    { x: mapWidth, y: 1, z: mapDepth },
    { x: 0, y: 0, z: 0 },
    0xfee8e9,
    0.3,
    true
  );
  //Right Wall
  createBlock(
    { x: 1, y: mapHeight, z: mapDepth },
    { x: mapWidth / 2, y: mapHeight / 2, z: 0 },
    0xfee8e9
  );
  //Left Wall
  createBlock(
    { x: 1, y: mapHeight, z: mapDepth },
    { x: -(mapWidth / 2), y: mapHeight / 2, z: 0 },
    0xfee8e9
  );
  //Back Wall
  createBlock(
    { x: mapWidth, y: mapHeight, z: 1 },
    { x: 0, y: mapHeight / 2, z: -mapDepth / 2 },
    0xfee8e9
  );
  //Celling
  createBlock(
    { x: mapWidth, y: 1, z: mapDepth },
    { x: 0, y: mapHeight, z: 0 },
    0xfee8e9
  );
  //Front Wall
  createBlock(
    { x: mapWidth, y: mapHeight, z: 1 },
    { x: 0, y: mapHeight / 2, z: mapDepth / 2 },
    0xfee8e9,
    0.1,
    true
  );

  //Cylindrar
  createCylinder({ x: 0, y: 60, z: 0 });
  //Rad 2
  createCylinder({ x: 4, y: 55, z: 0 });
  createCylinder({ x: -4, y: 55, z: 0 });
  //Rad 3
  createCylinder({ x: 0, y: 50, z: 0 });
  createCylinder({ x: 8, y: 50, z: 0 });
  createCylinder({ x: -8, y: 50, z: 0 });
  //rad 4
  createCylinder({ x: 4, y: 45, z: 0 });
  createCylinder({ x: -4, y: 45, z: 0 });
  createCylinder({ x: 12, y: 45, z: 0 });
  createCylinder({ x: -12, y: 45, z: 0 });
  //Rad 5
  createCylinder({ x: 0, y: 40, z: 0 });
  createCylinder({ x: 8, y: 40, z: 0 });
  createCylinder({ x: -8, y: 40, z: 0 });
  createCylinder({ x: 16, y: 40, z: 0 });
  createCylinder({ x: -16, y: 40, z: 0 });
  //Rad 6
  createCylinder({ x: 4, y: 35, z: 0 });
  createCylinder({ x: -4, y: 35, z: 0 });
  createCylinder({ x: 12, y: 35, z: 0 });
  createCylinder({ x: -12, y: 35, z: 0 });
  createCylinder({ x: 20, y: 35, z: 0 });
  createCylinder({ x: -20, y: 35, z: 0 });

  //Längs ner
  createBlock({ x: 1.5, y: 10, z: mapDepth }, { x: 0, y: 5, z: 0 }, 0xff0000);
  createCylinder({ x: 0, y: 10, z: 0 });

  createBlock(
    { x: 1.5, y: 10, z: mapDepth },
    { x: 12.5, y: 5, z: 0 },
    0xff0000
  );
  createCylinder({ x: 12.5, y: 10, z: 0 });

  createBlock(
    { x: 1.5, y: 10, z: mapDepth },
    { x: -12.5, y: 5, z: 0 },
    0xff0000
  );
  createCylinder({ x: -12.5, y: 10, z: 0 });

  createBall();

  requestAnimationFrame(animate);
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
  physicsWorld.setGravity(new Ammo.btVector3(0, EARTH_GRAVITY, 0));
}

function setupGraphics() {
  scene = new THREE.Scene();
  const viewWidth = 800;
  const viewHeight = 400;

  camera = new THREE.PerspectiveCamera(75, viewWidth / viewHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(viewWidth, viewHeight);

  renderer.setClearColor(0xff0000, 1);

  camera.position.setZ(30);
  //camera.position.setY(30);

  pointerLight = new THREE.PointLight(0xffffff);
  pointerLight.intensity = 0;

  ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.98;
  scene.add(ambientLight, pointerLight);

  controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  let deltaTime = clock.getDelta();

  updatePhysics(deltaTime);

  controls.update();

  t += 0.01;
  pointerLight.position.x = 200 * Math.cos(t) + 0;
  pointerLight.position.z = 200 * Math.sin(t) + 0;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

function createBlock(
  scale = { x: 50, y: 2, z: 50 },
  pos = { x: 0, y: 0, z: 0 },
  colors = 0xa0afa4,
  opacity1 = 1,
  trans = false
) {
  let quaternion = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0;

  //threeJS Section
  let blockPlane = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshPhongMaterial({
      color: colors,
      opacity: opacity1,
      transparent: trans,
    })
  );

  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);

  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;

  scene.add(blockPlane);

  //Ammojs Section
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(
    new Ammo.btQuaternion(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
    )
  );
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btBoxShape(
    new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
  );
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia
  );

  let body = new Ammo.btRigidBody(rbInfo);
  body.setRestitution(BODY_RESTITUTION);
  physicsWorld.addRigidBody(body);
}

function createCylinder(pos = { x: 0, y: 0, z: 0 }) {
  let scale = { x: 1.1, y: mapDepth, z: 1.1 };
  let quaternion = { x: Math.PI / 2, y: 0, z: 0, w: 1 };
  let mass = 0;

  //threeJS Section
  let CylinderPlane = new THREE.Mesh(
    new THREE.CylinderGeometry(),
    new THREE.MeshPhongMaterial({
      color: 0xff0000,
    })
  );

  CylinderPlane.position.set(pos.x, pos.y, pos.z);
  CylinderPlane.rotation.x = quaternion.x;
  //CylinderPlane.rotation.set(new THREE.Vector3(quat.x, quat.y, quat.z));
  CylinderPlane.scale.set(scale.x, scale.y, scale.z);

  CylinderPlane.castShadow = true;
  CylinderPlane.receiveShadow = true;

  scene.add(CylinderPlane);

  //Ammojs Section
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(
    new Ammo.btQuaternion(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
    )
  );
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btCylinderShape(
    new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
  );
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia
  );

  let body = new Ammo.btRigidBody(rbInfo);
  body.setRestitution(BODY_RESTITUTION);
  physicsWorld.addRigidBody(body);
}

function createBall(whatMesh) {
  let pos = {
    x: Math.random() * (3 - -3 + 1) + -3,
    y: Math.random() * (88 - 70 + 1) + 70,
    z: 0,
  };
  let radius = 1.2;
  let quaternion = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 1;

  let ball;

  //threeJS Section
  if (whatMesh != "textured") {
    ball = new THREE.Mesh(
      new THREE.SphereBufferGeometry(radius),
      new THREE.MeshPhongMaterial({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      })
    );
  } else {
    //theImages[Math.floor(Math.random() * 5)]
    ball = new THREE.Mesh(
      new THREE.SphereBufferGeometry(radius),
      new THREE.MeshBasicMaterial({
        map: theImages[Math.floor(Math.random() * 5)],
      })
    );
  }

  ball.position.set(pos.x, pos.y, pos.z);

  ball.castShadow = true;
  ball.receiveShadow = true;

  scene.add(ball);

  //Ammojs Section
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(
    new Ammo.btQuaternion(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
    )
  );
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btSphereShape(radius);
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);
  let rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia
  );
  let body = new Ammo.btRigidBody(rbInfo);
  physicsWorld.addRigidBody(body);

  ball.userData.physicsBody = body;
  body.setRestitution(BODY_RESTITUTION);
  rigidBodies.push(ball);

  ballCount++;
  document.getElementById("ballCount").innerHTML =
    "Ball Count: " + ballCount.toString();
}

function updatePhysics(deltaTime) {
  // Step world
  physicsWorld.stepSimulation(deltaTime, 10);

  // Update rigid bodies
  for (let i = 0; i < rigidBodies.length; i++) {
    let objThree = rigidBodies[i];
    let objAmmo = objThree.userData.physicsBody;
    let ms = objAmmo.getMotionState();
    if (ms) {
      ms.getWorldTransform(tmpTrans);
      let p = tmpTrans.getOrigin();
      let q = tmpTrans.getRotation();
      objThree.position.set(p.x(), p.y(), p.z());
      objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
    }
  }
}

function checkIfOutside() {
  for (let j = 0; j < rigidBodies.length; j++) {
    if (rigidBodies[j].position.y < -10) {
      console.log("Delete mesh");
      rigidBodies[j].geometry.dispose();
      rigidBodies[j].material.dispose();
      scene.remove(rigidBodies[j]);
      ballCount = ballCount - 1;
    }
  }
  document.getElementById("ballCount").innerHTML =
    "Ball Count: " + ballCount.toString();
}

function toggleLight() {
  if (ambientLight.intensity != 0) {
    ambientLight.intensity = 0;
    pointerLight.intensity = 1;
    pointerLight.position.set(0, 50, 50);
  } else {
    ambientLight.intensity = 0.98;
    pointerLight.intensity = 0;
  }
}

document.getElementById("spawnOneBall").onclick = function () {
  createBall();
};

document.getElementById("spawn50Ball").onclick = function () {
  for (let i = 0; i < 50; i++) {
    createBall();
  }
};

document.getElementById("spawnIMGBall").onclick = function () {
  createBall("textured");
};
document.getElementById("spawn50IMGBall").onclick = function () {
  for (let i = 0; i < 50; i++) {
    createBall("textured");
  }
};
document.getElementById("checkIfOutside").onclick = function () {
  checkIfOutside();
};
document.getElementById("toggleLight").onclick = function () {
  toggleLight();
};
