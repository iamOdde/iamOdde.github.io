var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  // Add a lights to the scene

  //Your Code

  return scene;
};

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format

const scene = createScene(); //Call the createScene function
engine.setSize(800, 400);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});

const camera = new BABYLON.ArcRotateCamera(
  "camera",
  -Math.PI / 2,
  Math.PI / 2.5,
  3,
  //new BABYLON.Vector3(0, 10, -30),
  new BABYLON.Vector3(0, 0, 0),
  scene
);
camera.attachControl(canvas, true);
//camera.inputs.clear();

const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 10, -10),
  scene
);
const light2 = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 10, 10),
  scene
);

const smallCube = BABYLON.MeshBuilder.CreateBox("smallCube", {
  width: 5,
  height: 5,
  depth: 5,
});
const boxColor = new BABYLON.StandardMaterial("boxColor");
boxColor.diffuseColor = new BABYLON.Color3.Black();
smallCube.material = boxColor;

// Front back left right up down panels
const front = BABYLON.MeshBuilder.CreateBox("front", {
  width: 4,
  height: 4,
  depth: 0.5,
});
front.position.z = -2.5;

const frontColor = new BABYLON.StandardMaterial("frontColor");
frontColor.diffuseColor = new BABYLON.Color3.FromHexString("#FFA500");
front.material = frontColor;

const back = BABYLON.MeshBuilder.CreateBox("back", {
  width: 4,
  height: 4,
  depth: 0.5,
});
back.position.z = 2.5;

const backColor = new BABYLON.StandardMaterial("backColor");
backColor.diffuseColor = new BABYLON.Color3.Red();
back.material = backColor;

const left = BABYLON.MeshBuilder.CreateBox("left", {
  width: 4,
  height: 4,
  depth: 0.5,
});
left.position.x = -2.5;
left.rotation.y = BABYLON.Tools.ToRadians(90);

const leftColor = new BABYLON.StandardMaterial("leftColor");
leftColor.diffuseColor = new BABYLON.Color3.Green();
left.material = leftColor;

const right = BABYLON.MeshBuilder.CreateBox("right", {
  width: 4,
  height: 4,
  depth: 0.5,
});
right.position.x = 2.5;
right.rotation.y = BABYLON.Tools.ToRadians(-90);

const rightColor = new BABYLON.StandardMaterial("rightColor");
rightColor.diffuseColor = new BABYLON.Color3.Blue();
right.material = rightColor;

const up = BABYLON.MeshBuilder.CreateBox("up", {
  width: 4,
  height: 0.5,
  depth: 4,
});
up.position.y = 2.5;

const upColor = new BABYLON.StandardMaterial("upColor");
upColor.diffuseColor = new BABYLON.Color3.White();
up.material = upColor;

const down = BABYLON.MeshBuilder.CreateBox("down", {
  width: 4,
  height: 0.5,
  depth: 4,
});
down.position.y = -2.5;

const downColor = new BABYLON.StandardMaterial("downColor");
downColor.diffuseColor = new BABYLON.Color3.Yellow();
down.material = downColor;

front.parent = smallCube;
back.parent = smallCube;
left.parent = smallCube;
right.parent = smallCube;
up.parent = smallCube;
down.parent = smallCube;

//Front MidleLayer
const cubeF = smallCube.clone("smallCube");
cubeF.position.z = -4.5;

const cubeFR = smallCube.clone("smallCube");
cubeFR.position.z = -4.5;
cubeFR.position.x = 4.5;

const cubeFL = smallCube.clone("smallCube");
cubeFL.position.x = -4.5;
cubeFL.position.z = -4.5;
//Front Up
const cubeFU = smallCube.clone("smallCube");
cubeFU.position.z = -4.5;
cubeFU.position.y = 4.5;

const cubeFRU = smallCube.clone("smallCube");
cubeFRU.position.z = -4.5;
cubeFRU.position.x = 4.5;
cubeFRU.position.y = 4.5;

const cubeFLU = smallCube.clone("smallCube");
cubeFLU.position.x = -4.5;
cubeFLU.position.z = -4.5;
cubeFLU.position.y = 4.5;

//Front Down
const cubeFD = smallCube.clone("smallCube");
cubeFD.position.z = -4.5;
cubeFD.position.y = -4.5;

const cubeFRD = smallCube.clone("smallCube");
cubeFRD.position.z = -4.5;
cubeFRD.position.x = 4.5;
cubeFRD.position.y = -4.5;

const cubeFLD = smallCube.clone("smallCube");
cubeFLD.position.x = -4.5;
cubeFLD.position.z = -4.5;
cubeFLD.position.y = -4.5;

//Back MidleLayer
const cubeB = smallCube.clone("smallCube");
cubeB.position.z = 4.5;

const cubeBR = smallCube.clone("smallCube");
cubeBR.position.z = 4.5;
cubeBR.position.x = 4.5;

const cubeBL = smallCube.clone("smallCube");
cubeBL.position.x = -4.5;
cubeBL.position.z = 4.5;
//Back Up
const cubeBU = smallCube.clone("smallCube");
cubeBU.position.z = 4.5;
cubeBU.position.y = 4.5;

const cubeBRU = smallCube.clone("smallCube");
cubeBRU.position.z = 4.5;
cubeBRU.position.x = 4.5;
cubeBRU.position.y = 4.5;

const cubeBLU = smallCube.clone("smallCube");
cubeBLU.position.x = -4.5;
cubeBLU.position.z = 4.5;
cubeBLU.position.y = 4.5;

//Back Down
const cubeBD = smallCube.clone("smallCube");
cubeBD.position.z = 4.5;
cubeBD.position.y = -4.5;

const cubeBRD = smallCube.clone("smallCube");
cubeBRD.position.z = 4.5;
cubeBRD.position.x = 4.5;
cubeBRD.position.y = -4.5;

const cubeBLD = smallCube.clone("smallCube");
cubeBLD.position.x = -4.5;
cubeBLD.position.z = 4.5;
cubeBLD.position.y = -4.5;

//Left Middle
const cubeL = smallCube.clone("smallCube");
cubeL.position.x = -4.5;

const cubeLU = smallCube.clone("smallCube");
cubeLU.position.x = -4.5;
cubeLU.position.y = 4.5;

const cubeLD = smallCube.clone("smallCube");
cubeLD.position.x = -4.5;
cubeLD.position.y = -4.5;

//Right Middle
const cubeR = smallCube.clone("smallCube");
cubeR.position.x = 4.5;

const cubeRU = smallCube.clone("smallCube");
cubeRU.position.x = 4.5;
cubeRU.position.y = 4.5;

const cubeRD = smallCube.clone("smallCube");
cubeRD.position.x = 4.5;
cubeRD.position.y = -4.5;

//Center Up Down
const cubeU = smallCube.clone("smallCube");
cubeU.position.y = 4.5;

const cubeD = smallCube.clone("smallCube");
cubeD.position.y = -4.5;

//BigCube.rotation.z = BABYLON.Tools.ToRadians(45);

scene.actionManager = new BABYLON.ActionManager(scene);

let allCubesArr = [];
allCubesArr.push(cubeF);
allCubesArr.push(cubeFL);
allCubesArr.push(cubeFR);
allCubesArr.push(cubeFLU);
allCubesArr.push(cubeFLD);
allCubesArr.push(cubeFRU);
allCubesArr.push(cubeFRD);
allCubesArr.push(cubeFU);
allCubesArr.push(cubeFD);
allCubesArr.push(cubeB);
allCubesArr.push(cubeBL);
allCubesArr.push(cubeBR);
allCubesArr.push(cubeBLU);
allCubesArr.push(cubeBLD);
allCubesArr.push(cubeBRU);
allCubesArr.push(cubeBRD);
allCubesArr.push(cubeBU);
allCubesArr.push(cubeBD);
allCubesArr.push(cubeR);
allCubesArr.push(cubeRU);
allCubesArr.push(cubeRD);
allCubesArr.push(cubeL);
allCubesArr.push(cubeLU);
allCubesArr.push(cubeLD);
allCubesArr.push(cubeU);
allCubesArr.push(cubeD);

//console.log(hello[0]);

const moveGroup = BABYLON.MeshBuilder.CreateBox("moveGroup", {
  width: 1,
  height: 1,
  depth: 1,
});

//Frammot
//Frammsida
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "r",
    },
    function () {
      console.log("r button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.z == -4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.z = moveGroup.rotation.z - Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.z = BABYLON.Tools.ToRadians(0);
    }
  )
);
//Toppen
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "t",
    },
    function () {
      console.log("t button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.y == 4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.y = moveGroup.rotation.y - Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.y = BABYLON.Tools.ToRadians(0);
    }
  )
);
//Right Side
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "y",
    },
    function () {
      console.log("y button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.x == 4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.x = moveGroup.rotation.x + Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.x = BABYLON.Tools.ToRadians(0);
    }
  )
);
//Till Baka
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "f",
    },
    function () {
      console.log("f button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.z == -4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.z = moveGroup.rotation.z + Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.z = BABYLON.Tools.ToRadians(0);
    }
  )
);
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "g",
    },
    function () {
      console.log("g button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.y == 4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.y = moveGroup.rotation.y + Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.y = BABYLON.Tools.ToRadians(0);
    }
  )
);
scene.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnKeyUpTrigger,
      parameter: "h",
    },
    function () {
      console.log("h button was pressed");
      allCubesArr.forEach((element) => {
        if (element.position.x == 4.5) {
          element.parent = moveGroup;
        }
      });
      moveGroup.rotation.x = moveGroup.rotation.x - Math.PI / 2;
      allCubesArr.forEach((element) => {
        moveGroup.removeChild(element);
      });
      moveGroup.rotation.x = BABYLON.Tools.ToRadians(0);
    }
  )
);

const tick = () => {
  console.log("FPS: ", engine.getFps().toFixed());
};
setInterval(tick, 1000);
