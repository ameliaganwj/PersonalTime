// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
BodyPix
=== */
console.log("This is running!");


let bodypix;
let video;
let segmentation;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.5, // 0 - 1, defaults to 0.5
};

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
//   canvas.position(0,0);
//   canvas.style('z-index','-1');
//   canvas.parent('canvasContainer');
  // load up your video
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  
  background('rgba(255,255,255, 0.2)');
  // tint(255,200);
//   noFill();
  if (segmentation) {
    // console.log( segmentation.personMask);
    /*
    let img = createImage(320, 240);
    img.loadPixels();
    
    let back = segmentation.personMask;
    back.loadPixels();
    for (let i = 0; i < back.width; i++) {
      for (let j = 0; j < back.height; j++) {
        let col = back.get(i, j);
        img.set(i, j, color(col[0], col[1], col[3], 0.5));
      }
    }
    img.updatePixels();
    // console.log(c);
    image(img, 0,0);
    */
    // image(segmentation.personMask, 0, 0, width,height);
    
    
    image(segmentation.backgroundMask, 0, 0, width,height);
  }

  function mousePressed(){
     
    save('myCanvas.png');
    return false;
  }
  
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}

