/* jshint devel:true, unused:false  */
/* jshint -W117 */ // ignore ALL globals -- GASP!

/**
* First P5JS Sketch
* from: http://p5js.org/get-started/
**/

'use strict';

var song, analyzer, img;

var config = {
  parentClass: 'canvas-wrapper',
  canvas: {
    width: 710,
    height: 200
  },
  image: '../images/astley.png',
  sound: '../sounds/rolled.mp3',
  minImageSize: 50,
  backgroundColor: {
    paused: '#ccc',
    playing: '#fff'
  }
};

console.log('You know the rules. And so do I.');

// Helpers
function getCanvasParent() {
  return document.getElementsByClassName(config.parentClass)[0];
}

function drawCenteredImage(img, imageWidth) {
  image(
    img, // loaded Image ref
    width/2 - imageWidth/2,  // center x coordinate
    height/2 - imageWidth/2, // center y coordinate (assuming square)
    imageWidth, // width
    imageWidth // height (assuming square)
  );
}

function togglePause() {
  if (song.isPaused()) {
    song.play();
  } else {
    song.pause();
  }
}

// Main
function preload() {
  song = loadSound(config.sound);
  img = loadImage(config.image);
}

function setup() {
  createCanvas(config.canvas.width, config.canvas.height).parent(getCanvasParent());
  song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  background(config.backgroundColor.playing);

  if (song.isPaused()) {
    textSize(32);
    fill(0);
    background(config.backgroundColor.paused);
    text('paused',10, 30);
  }

  var vol = analyzer.getLevel();
  drawCenteredImage(img, config.minImageSize + vol*config.canvas.height);
}

// Pause on key press or mouse click
// p5js looks for these functions.
var keyPressed = togglePause;
var mouseClicked = togglePause;
