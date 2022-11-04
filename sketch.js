const serviceUuid = "555a0002-0000-467a-9538-01f0652c74e8";
const characteristicsUUID = {
  prox: "555a0002-0017-467a-9538-01f0652c74e8",
  humi: "555a0002-0016-467a-9538-01f0652c74e8",
  temp: "555a0002-0014-467a-9538-01f0652c74e8"
};

let logo;
function preload() {
  logo = loadImage('logo.png');
}
let myBLE;
y= 250;

let proxCharacteristic;
let humiCharacteristic;
let tempCharacteristic;


let proxValue = 0;
let humiValue = 0;
let tempValue = 0;


let sensorArray = new Array(3);

let cnv;
let screenWidth;
let screenHeight;
let controlMenuWidth = 25 / 100;


function handleCanvas() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.position(0, 0);

  screenHeight = windowHeight;
  screenWidth = windowWidth;
}

function setup() {
  // Create a p5ble class
  myBLE = new p5ble();

  handleCanvas();
  shapes = new Shapes();

  background("#ffff");

  button = createButton('CONNECT');
  button.position(0, 0);
  button.mousePressed(connectAndStartNotify);

}

function draw() {

  background(y);
  noStroke();
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  normalMaterial();

  rotateX((frameCount * 0.01));
  rotateY((frameCount * 0.01));
  rotateZ((frameCount * 0.01));

  push();

  if (myBLE.isConnected()) {
    let mappedStretch = map(sensorArray[1], 50, 120, 0.1, 6);
    scale(mappedStretch, mappedStretch, mappedStretch);
  }
  sphere(100);

  pop();

  if (sensorArray[1] > 60) {
    push();
    translate(400, 400, 0);
    let mappedStretch = map(sensorArray[1], 60, 120, 1, 4);
    scale(mappedStretch, mappedStretch, mappedStretch);
    sphere(50);
    pop();
  }

  if (sensorArray[1] > 75) {

    push();
    translate(800, 200, 300);
    let mappedStretch = map(sensorArray[1], 80, 120, 1, 4);
    scale(mappedStretch, mappedStretch, mappedStretch);
    fill(50, 150, 150);
    texture(logo);
    box(50);
    pop();
  }

}

function windowResized() {
  handleCanvas();
}

function connectAndStartNotify() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log(characteristics[1].uuid);
  for (let i = 0; i < characteristics.length; i++) {
    if (characteristics[i].uuid == characteristicsUUID.prox) {
      proxCharacteristic = characteristics[i];
      myBLE.startNotifications(proxCharacteristic, handleProx);
    } else if (characteristics[i].uuid == characteristicsUUID.humi) {
      humiCharacteristic = characteristics[i];
      myBLE.startNotifications(humiCharacteristic, handleHumi);
    } else if (characteristics[i].uuid == characteristicsUUID.temp) {
      tempCharacteristic = characteristics[i];
      myBLE.startNotifications(tempCharacteristic, handleTemp);
    } else {
      console.log("nothing");
    }
  }
  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
}


function handleProx(data) {
  //console.log('Prox: ', data);
  proxValue = Number(data);
  sensorArray[0] = proxValue;
}

function handleHumi(data) {
  //console.log('Prox: ', data);
  humiValue = Number(data);
  sensorArray[1] = humiValue;
  console.log(humiValue);
}

function handleTemp(data) {
  //console.log('Prox: ', data);
  tempValue = Number(data);
  sensorArray[2] = tempValue;

}


/*function mapMyData(selectedIndex, sensorData, defaultValue, min, max) {
  let mappedData;

  if (selectedIndex == "0" || selectedIndex == "1" || selectedIndex == "2") {
    mappedData = map(sensorData, -2000, 2000, min, max);
  } else if (
    selectedIndex == "3" ||
    selectedIndex == "4" ||
    selectedIndex == "5"
  ) {
    mappedData = map(sensorData, -4, 4, min, max);
  } else if (selectedIndex == "6") {
    mappedData = map(sensorData, 0, 255, min, max);
  } else if (selectedIndex == "10") {
    mappedData = map(sensorData, 0, 4097, min, max);
  } else {
    mappedData = defaultValue;
  }
  return mappedData;
}*/

class Shapes {
  constructor() {
    this.defaultSize = 100;

  }

  draw3D() {


    sphere(this.defaultSize);



  }
}


/*function translateShape() {

  let defaultTranslation = 0;

  if (myBLE.isConnected()) {
    let xTranslation = sensorArray[xTranslationIndex];
    let yTranslation = sensorArray[yTranslationIndex];
    let zTranslation = sensorArray[zTranslationIndex];


    let mappedXtranslation = mapMyData(xTranslationIndex, xTranslation, defaultTranslation, -((screenWidth / 2) + controlMenuWidth), (screenWidth / 2));
    let mappedYtranslation = mapMyData(yTranslationIndex, yTranslation, defaultTranslation, -(screenHeight / 2), (screenHeight / 2));
    let mappedZtranslation = mapMyData(zTranslationIndex, zTranslation, defaultTranslation, - (screenWidth * 2), screenWidth * 0.5);

    translate(mappedXtranslation, mappedYtranslation, mappedZtranslation);

  }
}



function rotateShape() {

  let defaultRotation = (frameCount * 0.01);

  if (myBLE.isConnected()) {
    let xRotation = sensorArray[xRotationIndex];
    let yRotation = sensorArray[yRotationIndex];
    let zRotation = sensorArray[zRotationIndex];

    let mappedXrotation = mapMyData(xRotationIndex, xRotation, defaultRotation, 0, (2 * PI));
    let mappedYrotation = mapMyData(yRotationIndex, yRotation, defaultRotation, 0, (2 * PI));
    let mappedZrotation = mapMyData(zRotationIndex, zRotation, defaultRotation, 0, (2 * PI));

    rotateX(mappedXrotation);
    rotateY(mappedYrotation);
    rotateZ(mappedZrotation);


  } else {

    rotateX(defaultRotation);
    rotateY(defaultRotation);
    rotateZ(defaultRotation);

  }


}*/
