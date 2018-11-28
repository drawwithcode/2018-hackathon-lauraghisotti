var mySong
var analyzer
var myImage

function preload(){
  // put preload code here
  mySong = loadSound("./assets/malcom.mp3");
  myImage = loadImage("./assets/malcom2.png");
}


var jimmys = [];
var touches = [];

//var sammys= [];

var grande = 0;
var linea = 0;


function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  background(0, 0, 255);

  fft = new p5.FFT()

  var jimmysNumber=4;


  for(var i=0; i<jimmysNumber; i++) {
  var diametro = random(50, 200);
  var firstJimmy = new Jimmy((1+i)*width/5, 210, diametro, 0, 90);
  firstJimmy.speed= 3;
  //firstJimmy.diameter = random(50, 60);
  //firstJimmy.speed = random(10, 15);
  firstJimmy.color = color(255, random(255), random(255));
  jimmys.push(firstJimmy);
  }


  analyzer= new p5.Amplitude();
analyzer.setInput(mySong);

}

function draw() {
  // put drawing code here
  clear();
  background("yellow");

  if (mySong.isPlaying() == false) {
     mySong.play();
   }


  var vol=map(mouseX, 0, width, 0, 1);
  var vol2=map(mouseX, 0, width, 0, 360);

  mySong.amp(vol);

  var volume = analyzer.getLevel();
volume = map(mouseX, 0, width, 0, 360);

var spectrum = fft.analyze();
  noStroke();
  fill(255, 0,0);
  for (var i = 0; i< 100; i++){
    var diametro = map(i, 0, spectrum.length, 0, 200);
  //  var h = -height + map(spectrum[i], 0, 255, height, 0);
  //  rect(x, height, width / spectrum.length, h )
    ellipse(random(100, width-100), height-100, diametro);
  }

var  rata=map(mouseY, 0, height, 0, 2);
var rata1=map(rata, 0, 2, 20, 50);


  mySong.rate(rata);


  for(var j = 0; j <jimmys.length; j++) {
    jimmys[j].move();
    jimmys[j].display();
    jimmys[j].start=0;
    jimmys[j].end=vol2;
}

push();
imageMode(CENTER);
translate(width/2, height/2);
rotate(volume);
image(myImage, 0, 0);
pop();

push();
textAlign(CENTER);
textFont("Luckiest Guy");
textSize(rata1);
fill("black");
text("You're not\nthe boss\nof me now", width/6, height/2);
pop();

push();
textAlign(CENTER);
textFont("Luckiest Guy");
textSize(rata1);
fill("black");
text("You're not\nthe boss\nof me now", 5*width/6, height/2);
pop();


}




function Jimmy (_x, _y, _diameter, _start, _end){
  this.x=_x;
  this.y=_y;
  this.diameter=_diameter;
  this.start=0;
  this.end=90;
  this.color="black";
  this.speed= 3;

  angleMode(DEGREES);

  this.display= function() {
    noStroke();
    fill(this.color);
    arc(this.x, this.y, this.diameter, this.diameter, this.start, this.end, PIE);

    /*fill("white");
    arc(this.x, this.y, this.diameter, this.diameter, this.start+90, this.end+90, PIE);

    fill(this.color);
    arc(this.x, this.y, this.diameter, this.diameter, this.start+180, this.end+180, PIE);

    fill("white");
    arc(this.x, this.y, this.diameter, this.diameter, this.start+270, this.end+270, PIE);*/
    }



    this.move = function() {
    //  this.x += this.speed;
      this.start += 0;
      this.end += 90;
    }

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
