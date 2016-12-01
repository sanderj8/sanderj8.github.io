var img;
var song;
var fft;

var redRand;
var greenRand;
var blueRand;

var widthCenter;
var heightCenter;

function preload() {
    img = loadImage("deadmau5.png");
    song = loadSound("dj-sona-kinetic.mp3");
    song.setVolume(0.2);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    push();
    for (var i = 0; i < 100; i++) {
        scale(.98);
        image(img, i, 0);
    }
    pop();
    fft = new p5.FFT();
    song.loop();
    redRand = 25;
    blueRand = 25;
    greenRand = 25;

}

function draw() {
    background(0);

    var spectrum = fft.analyze();
    noStroke();

    for (var i = 0; i < spectrum.length; i++) {
        fill(fft.getEnergy("bass") / 4 + (i / 4), fft.getEnergy("mid") / 4 + (i / 4), fft.getEnergy("treble") / 4 + (i / 4));
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h)
    }
    fill(255, 255, 255);
    ellipse(600, 400, 1.5 * (fft.getEnergy("bass")), 1.5 * (fft.getEnergy("bass")));
    fill(0, 0, 0);
    ellipse(600, 400, 1.5 * (fft.getEnergy("bass") * .9), 1.5 * (fft.getEnergy("bass") * .9));
    fill(255, 255, 255);
    ellipse(600, 400, 1.5 * (fft.getEnergy("mid")), 1.5 * (fft.getEnergy("mid")));
    fill(0, 0, 0);
    ellipse(600, 400, 1.5 * ((fft.getEnergy("mid")) * .9), 1.5 * ((fft.getEnergy("mid")) * .9));
    fill(255, 255, 255);
    ellipse(600, 400, 1.5 * (fft.getEnergy("treble")), 1.5 * (fft.getEnergy("treble")));
    fill(0, 0, 0);
    ellipse(600, 400, 1.5 * ((fft.getEnergy("treble")) * .9), 1.5 * ((fft.getEnergy("treble")) * .9));

    redRand = redRand + 1;
    blueRand = blueRand + 3;
    greenRand = greenRand + 5;

    if (redRand > 255) {
        redRand = 25;
    }
    if (greenRand > 255) {
        greenRand = 25;
    }
    if (blueRand > 255) {
        blueRand = 25;
    }
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.loop();
    }
}