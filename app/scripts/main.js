/* jshint devel:true, unused:false  */
/* jshint -W117 */ // ignore ALL globals -- GASP!

/**
* First P5JS Sketch
* from: http://p5js.org/get-started/
**/

'use strict';

var song, analyzer, img;

var config = {
  canvasWrapper: '.canvas-wrapper',
  image: '../images/astley.png',
  sound: '../sounds/rolled.mp3',
  minImageSize: 50,
  backgroundColor: {
    paused: '#ccc',
    playing: '#fff'
  }
};

console.log('You know the rules. And so do I.');

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

  // setup canvas
  var $canvasWrapper = $(config.canvasWrapper);
  createCanvas($canvasWrapper.innerWidth(), $canvasWrapper.innerHeight()).parent($canvasWrapper[0]);
  
  // setup song
  song.loop();
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
  drawCenteredImage(img, config.minImageSize + vol*height);
}

// Pause on key press or mouse click
// p5js looks for these functions.
var keyPressed = togglePause;
var mouseClicked = togglePause;
