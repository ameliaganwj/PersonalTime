var socket = io();
let bodypix;
let video;
let segmentation;
let opacity = 0;
let newVariable;

socket.on('data', function (data) {
    document.getElementById('sample').style.opacity = data / 100;
    opacity = data / 100;
    // document.getElementById('sample').innerHTML = data;
});

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
    if (opacity <= 0.5) {
        background('rgba(255,255,255, 0.2)');
        if (segmentation) {
            image(segmentation.backgroundMask, 0, 0, width, height);
        }
    } else if (opacity >= 0.6) {
        background('rgba(255,255,255, 0.2)');
    } else {
        background('rgba(255,255,255, 0.2)');
    }



    function mousePressed() {
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