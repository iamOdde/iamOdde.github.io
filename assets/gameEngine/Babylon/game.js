//variable declaration section
let canvas, engine, scene, camera, himoLight, light, light2;

const mapWidth = 25,
  mapLength = 2,
  mapHeight = 50,
  EARTH_GRAVITY = -9.807;

const theImages = [
  "../../imges/boysen/filip.PNG",
  "../../imges/boysen/oscar.jpeg",
  "../../imges/boysen/herman.PNG",
  "../../imges/boysen/matsboge.PNG",
  "../../imges/boysen/timmy.PNG",
];

setupGraphics();

function setupGraphics() {
  canvas = document.getElementById("renderCanvas");
  engine = new BABYLON.Engine(canvas, true);

  scene = new BABYLON.Scene(engine);
  engine.setSize(800, 400);

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });

  camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 35, -60),
    scene
  );
  camera.attachControl(canvas, true);
  camera.setTarget(new BABYLON.Vector3(0, 25, 0));

  himoLight = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 35, -60),
    scene
  );

  light = new BABYLON.PointLight(
    "light",
    new BABYLON.Vector3(0, 35, -80),
    scene
  );

  light.setEnabled(false);

  // Ljus under
  light2 = new BABYLON.PointLight(
    "light2",
    new BABYLON.Vector3(0, -5, 0),
    scene
  );
}

//Lägger till fysik
await Ammo();
scene.enablePhysics(
  new BABYLON.Vector3(0, EARTH_GRAVITY, 0),
  new BABYLON.AmmoJSPlugin()
);

//Creating graphics
const ground = BABYLON.Mesh.CreateGround(
  "ground",
  mapWidth,
  mapLength,
  1,
  scene
);

const wallBack = BABYLON.MeshBuilder.CreateBox(
  "plane",
  { height: mapHeight, width: mapWidth, depth: 0.1 },
  scene
);

wallBack.position.z = mapLength / 2;
wallBack.position.y = mapHeight / 2;

const wallFront = BABYLON.MeshBuilder.CreateBox(
  "plane",
  { height: mapHeight, width: mapWidth, depth: 0.1 },
  scene
);

wallFront.position.z = -(mapLength / 2);
wallFront.position.y = mapHeight / 2;
wallFront.visibility = 0.1;

const wallLeft = BABYLON.MeshBuilder.CreateBox(
  "plane",
  { height: mapHeight, width: 0.1, depth: mapLength },
  scene
);

wallLeft.position.x = -(mapWidth / 2);
wallLeft.position.y = mapHeight / 2;

const wallRight = BABYLON.MeshBuilder.CreateBox(
  "plane",
  { height: mapHeight, width: 0.1, depth: mapLength },
  scene
);

wallRight.position.x = mapWidth / 2;
wallRight.position.y = mapHeight / 2;

//Background color
const backGroundColor = new BABYLON.StandardMaterial("backgroundColor");
backGroundColor.diffuseColor = new BABYLON.Color3.FromHexString("#FEE8E9");
wallBack.material = backGroundColor;
ground.material = backGroundColor;
wallLeft.material = backGroundColor;
wallRight.material = backGroundColor;

scene.clearColor = new BABYLON.Color3.Red();

const cylinderColor = new BABYLON.StandardMaterial("cylinderColor");
cylinderColor.diffuseColor = new BABYLON.Color3.Red();
const mapHeight2 = mapHeight - 10;

function createCylinder(posx, posy) {
  const cylinder = BABYLON.MeshBuilder.CreateCylinder(
    "cylinder",
    { height: mapLength, width: 1, depth: 1 },
    scene
  );
  cylinder.material = cylinderColor;
  cylinder.rotation.x = BABYLON.Tools.ToRadians(90);
  cylinder.position.x = posx;
  cylinder.position.y = mapHeight2 - posy;
  cylinder.position.z = 0;

  cylinder.checkCollisions = true;

  cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(
    cylinder,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 0, restitution: 0.9 },
    scene
  );
}

//Cylinders rad 1
createCylinder(0, 5);
//Rad 2
createCylinder(2, 8);
createCylinder(-2, 8);
//Rad 3
createCylinder(0, 11);
createCylinder(-4, 11);
createCylinder(4, 11);
//Rad 4
createCylinder(2, 14);
createCylinder(-2, 14);
createCylinder(6, 14);
createCylinder(-6, 14);
//Rad 5
createCylinder(0, 17);
createCylinder(-4, 17);
createCylinder(4, 17);
createCylinder(8, 17);
createCylinder(-8, 17);
//Rad 6
createCylinder(2, 20);
createCylinder(-2, 20);
createCylinder(6, 20);
createCylinder(-6, 20);
createCylinder(10, 20);
createCylinder(-10, 20);

//Rektanglar på botten

const botRec = BABYLON.MeshBuilder.CreateBox(
  "botRec",
  { height: mapHeight / 10, width: 0.5, depth: mapLength },
  scene
);
botRec.position.y = mapHeight / 20;

const botCyl = BABYLON.MeshBuilder.CreateCylinder(
  "botCyl",
  { height: mapLength, width: 0.1, depth: 0.1 },
  scene
);
botCyl.rotation.x = BABYLON.Tools.ToRadians(90);
botCyl.position.y = mapHeight / 20;

const botColor = new BABYLON.StandardMaterial("botColor");
botColor.diffuseColor = new BABYLON.Color3.Red();
botRec.material = botColor;
botCyl.material = botColor;

botCyl.parent = botRec;

const botRec2 = botRec.clone("botCyl");
botRec2.position.x = 6.25;
const botRec3 = botRec.clone("botCyl");
botRec3.position.x = -6.25;

//Bollarna
const smallSphere = BABYLON.MeshBuilder.CreateSphere("sphereCube", {
  width: 5,
  height: 5,
  depth: 5,
});
const sphereColor = new BABYLON.StandardMaterial("SphereColor");
sphereColor.diffuseColor = new BABYLON.Color3.Black();
smallSphere.material = sphereColor;

smallSphere.physicsImpostor = new BABYLON.PhysicsImpostor(
  smallSphere,
  BABYLON.PhysicsImpostor.SphereImpostor,
  { mass: 1, restitution: 0.9 },
  scene
);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(
  ground,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
wallLeft.physicsImpostor = new BABYLON.PhysicsImpostor(
  wallLeft,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
wallRight.physicsImpostor = new BABYLON.PhysicsImpostor(
  wallRight,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
wallBack.physicsImpostor = new BABYLON.PhysicsImpostor(
  wallBack,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
wallFront.physicsImpostor = new BABYLON.PhysicsImpostor(
  wallFront,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
smallSphere.position.y = 45;
smallSphere.position.x = 0.1;
ground.checkCollisions = true;
smallSphere.checkCollisions = true;

//Botten rec fysik
botRec.physicsImpostor = new BABYLON.PhysicsImpostor(
  botRec,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
botRec2.physicsImpostor = new BABYLON.PhysicsImpostor(
  botRec2,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);
botRec3.physicsImpostor = new BABYLON.PhysicsImpostor(
  botRec3,
  BABYLON.PhysicsImpostor.BoxImpostor,
  { mass: 0, restitution: 0.9 },
  scene
);

const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
  "UI"
);

// Funktion för att skapa bollar

const createBall = function () {
  const ball = new BABYLON.MeshBuilder.CreateSphere("sphereCube", {
    width: 5,
    height: 5,
    depth: 5,
  });
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(
    ball,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene
  );
  ball.checkCollisions = true;

  ball.position.y = Math.random() * (47 - 43 + 1) + 43;
  ball.position.x = Math.random() * (3 - -3 + 1) + -3;
  const ballColor = new BABYLON.StandardMaterial("ballColor");
  ballColor.diffuseColor = new BABYLON.Color3(
    Math.random() * 2,
    Math.random() * 2,
    Math.random() * 2
  );
  ball.material = ballColor;
  ballCount = ballCount + 1;
  text1.text = ballCount + " balls";
  return ball;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//Gamla math randome Math.random() * 2 - 0.9
const createBallIMG = function () {
  const ball = new BABYLON.MeshBuilder.CreateSphere("sphereCube", {
    width: 5,
    height: 5,
    depth: 5,
  });
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(
    ball,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene
  );
  ball.checkCollisions = true;
  ball.position.y = Math.random() * (47 - 43 + 1) + 43;
  ball.position.x = Math.random() * (3 - -3 + 1) + -3;

  const ballIMG = new BABYLON.StandardMaterial("ballIMG");
  ballIMG.diffuseTexture = new BABYLON.Texture(
    theImages[getRandomInt(5)],
    scene
  );

  ball.material = ballIMG;

  ballCount = ballCount + 1;
  text1.text = ballCount + " balls";
  return ball;
};
let ballCount = 1;
//Ball counter top right
let text1 = new BABYLON.GUI.TextBlock();
text1.text = "1 Ball";
text1.color = "white";
text1.fontSize = 24;
text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
advancedTexture.addControl(text1);

function createButton(
  text1,
  leftMargin,
  rightMargin,
  horizontalAlignment1,
  verticalAlignment1,
  functionName
) {
  let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", text1);
  button1.width = "100px";
  button1.height = "40px";
  button1.left = leftMargin;
  button1.right = rightMargin;
  button1.color = "black";
  button1.cornerRadius = 5;
  button1.fontSize = 14;
  button1.background = "white";
  button1.left;
  button1.horizontalAlignment = horizontalAlignment1;
  button1.verticalAlignment = verticalAlignment1;
  if (functionName == "createBall") {
    button1.onPointerUpObservable.add(function () {
      //console.log("Boll");
      createBall();
    });
  } else if (functionName == "createBall50") {
    button1.onPointerUpObservable.add(function () {
      //console.log("Boll");
      for (let i = 0; i < 50; i++) {
        createBall();
      }
    });
  } else if (functionName == "checkIfOutisde") {
    button1.onPointerUpObservable.add(function () {
      checkIfOutside();
    });
  } else if (functionName == "createIMG") {
    button1.onPointerUpObservable.add(function () {
      createBallIMG();
    });
  } else if (functionName == "createIMG50") {
    button1.onPointerUpObservable.add(function () {
      for (let i = 0; i < 50; i++) {
        createBallIMG();
      }
    });
  }
  advancedTexture.addControl(button1);
}

createButton(
  "Spawn 1 Ball",
  "0px",
  "0px",
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  "createBall"
);
createButton(
  "Spawn 50 Balls",
  "100px",
  "0px",
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  "createBall50"
);
createButton(
  "Delete out of bounds",
  "0px",
  "10px",
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  "checkIfOutisde"
);
createButton(
  "Spawn 1 IMG",
  "-200px",
  "0px",
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  "createIMG"
);
createButton(
  "Spawn 50 IMG",
  "-100px",
  "0px",
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  "createIMG50"
);

const tick = () => {
  console.log("FPS: ", engine.getFps().toFixed());
};
setInterval(tick, 1000);

const checkIfOutside = () => {
  for (let j = 0; j < scene.meshes.length; j++) {
    if (scene.meshes[j].position.y < -10) {
      console.log("Delete mesh");
      scene.meshes[j].dispose();
      ballCount = ballCount - 1;
      text1.text = ballCount + " balls";
    }
  }
};

scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyDownTrigger,
      parameter: " ",
    },
    function () {
      //console.log("space button was pressed");
      createBall();
    }
  )
);

//Stänger av ljuset
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyDownTrigger,
      parameter: "e",
    },
    function () {
      console.log("e button was pressed");
      if (himoLight.intensity != 0) {
        himoLight.intensity = 0;
        light.setEnabled(true);
      } else {
        himoLight.intensity = 1;
        light.setEnabled(false);
      }
    }
  )
);

let lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 2, scene);

lightSphere0.material = new BABYLON.StandardMaterial("green", scene);
lightSphere0.material.emissiveColor = new BABYLON.Color3(1, 0.9, 0);

let alpha = 0;
scene.beforeRender = function () {
  light.position = new BABYLON.Vector3(
    -60 * Math.sin(alpha),
    35,
    -60 * Math.cos(alpha)
  );
  lightSphere0.position = light.position;
  alpha += 0.001;
};
//setInterval(dayNnight, 500);
