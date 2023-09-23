var Bxvel = 3.5, Byvel = 3.5, Axvel = -3.5, Ayvel = 3.5, lxvel = 3.5, lyvel = 3.5;
var Ax = 225, Ay = 175, Bx = 500, By = 175, lx = 225, ly = 175;
var Image1, Image2, IW = 175, IH = 175, IWM = IW/2, IHM = IH/2, Lizards;
var Acol = [43,12,76], Bcol = [94,100,213], lcol = [94,100,213];
var epilepsyBlocker = 0;
var Acolchange = 10, Bcolchange = 10, lcolchange = 10;
var ImageCol = true, RAVE = false, help = false, Dcheck = false, Paused = false, Smoll = false;

function preload() {
  Image1 = loadImage('5X5 X 100 Brett hold.png');
  Image2 = loadImage('5X5 X 100 Brett fear.png');
	Lizards = loadImage('LizardsWUT.png');
}
function setup() {
	createCanvas(1920, 1080);
	Arandcol();
	Brandcol();
	epilepsyBlocker = 146;
}

function draw() {
	if(!Paused){
		
		if(Smoll){
			IW = 30;
			IH = 30;
			IWM = IW/2;
			IHM = IH/2;
		} else {
			IW = 175;
			IH = 175;
			IWM = IW/2;
			IHM = IH/2;
		}
  	background(255);
		textSize(15);
		fill(0, 0, 0);
		imageMode(CENTER)  
  	tint(Acol);
  	image(Image1, Ax, Ay, IW, IH);
		tint(Bcol);
  	image(Image2, Bx, By, IW, IH);
		
  	Ax += Axvel;
  	Ay += Ayvel;
		Bx += Bxvel;
  	By += Byvel;
		lx += lxvel;
  	ly += lyvel;
	
	
	
		if (ImageCol & dist(Ax, Ay, Bx, By) < IW + 10 | ImageCol & Dcheck){	
			colVel()
			borderVel()
		} else {
			EdgeCollision();
		}
	
	if (help){
		fill(0,255,0)
		rect(0,0, 750, 210)
		textSize(32);
		fill(0, 0, 0);
		text('R resets image positions', 10, 30);
		text('D swaps the collision detection: ' + !ImageCol, 10, 60);
		text('S disables image distance check: ' + Dcheck, 10, 90);
		text('O to toggle rave: ' + RAVE, 10, 120);
		text('Space to pause: ' + Paused, 10, 150);
		text('T to switch smoll mode: ' + Smoll, 10, 180);
		
	}
	if(RAVE){
	 Arandcol()
	 Brandcol()
	lrandcol()
	image(Lizards, lx, ly, IW, IH);
		
		if (lx + IW / 2 > 1920){
		lxvel = random(-2.5, -1);
			lrandcol()
	}
	if (lx - IW / 2 < 0){
		lxvel = random(1, 2.5);
		lrandcol()
	}
	
	if (ly + IH / 2 > 1080){
		lyvel = random(-2.5, -1);
		lrandcol()
	}
	if (ly - IH / 2 < 0){
		lyvel = random(1, 2.5);
		lrandcol()
	}
 }
}}



function Arandcol(){
	if (millis() - Acolchange > epilepsyBlocker){
		Acol = [random(255), random(255), random(255)]
		Acolchange = millis();
	} else {
		Ayvel = Ayvel + random(-1, 1);
		Axvel = Axvel + random(-1, 1);
	}
}

function Brandcol(){
	if (millis() - Bcolchange > epilepsyBlocker){
  	Bcol = [random(255), random(255), random(255)];
		Bcolchange = millis();
	} else {
		Byvel = Byvel + random(-1, 1);
		Bxvel = Bxvel + random(-1, 1);
	}
}

function lrandcol(){
	if (millis() - lcolchange > epilepsyBlocker){
  	lcol = [random(255), random(255), random(255)];
		lcolchange = millis();
	} else {
		lyvel = lyvel + random(-1, 1);
		lxvel = lxvel + random(-1, 1);
	}
}

function keyPressed() {
	if (keyCode === 68) {
		ImageCol = !ImageCol;
	}
	
	if (keyCode === 82) {
		Bxvel = 3.5, Byvel = 3.5, Axvel = -3.5, Ayvel = 3.5, Ax = 225, Ay = 175, Bx = 500, By = 175;	
	}
	
	if (keyCode === 72) {
		help = !help;
	}
	
	if (keyCode === 83) {
		Dcheck = !Dcheck;
	}
	
	if (keyCode === 84) {
		Smoll = !Smoll;
	}
	
	if (keyCode === 79) {
		RAVE = !RAVE;
	}
	
	if (keyCode === 32) {
		Paused = !Paused;
	}
}
function borderVel() {
	let xa1 = [Ax + IWM > width, -1, "Axvel"]
	let xa2 = [Ax - IWM < 0, 1, "Axvel"];
	let ya1 = [Ay + IHM > height, -1, "Ayvel"];
	let ya2 = [Ay - IHM < 0, 1, "Ayvel"];
	let xb1 = [Bx + IWM > width, -1, "Bxvel"];
	let xb2 = [Bx - IWM < 0, 1, "Bxvel"];
	let yb1 = [By + IHM > height, -1, "Byvel"];
	let yb2 = [By - IHM < 0, 1, "Byvel"];
	var compList = [xa1,xa2,xb1,xb2,ya1,ya2,yb1,yb2];
	let len = compList.length;
	
	for (var i=0; i < len; i++) {
		var j = compList[i];
		if (j[0]) {
			velCalc(j[2],j[1])
			eval(j[2].charAt(0) + "randcol()")
		}
	}
}

function velCalc(varString, velMod) {
	ranVal = (Math.floor((Math.random()*10))/10);
	
	if (Math.round(Math.random()) == 0) {
		velVal = velMod*(2.5 + (ranVal * -1))
	} else {
		velVal = velMod*(2.5 + (ranVal))
	}

	eval(varString + " = " + velVal);
}

function colVel() {
	var xCenDiff = Math.abs(Ax-Bx)
	var yCenDiff = Math.abs(Ay-By)
	var xSideDiff = Math.min(Math.abs((Ax+IWM)-(Bx-IWM)),Math.abs((Ax-IWM)-(Bx+IWM)))
	var ySideDiff = Math.min(Math.abs((Ay+IHM)-(By-IHM)),Math.abs((Ay-IHM)-(By+IHM)))
	
	var count;
	
	if (count > 0) {
		count -= 1
	} else {
		count = 0
	}
	
	if (yCenDiff < IH+10 && xSideDiff < 5 && count == 0) {
		Axvel *= -1
		Bxvel = Axvel*-1
		Brandcol()
		Arandcol()
		count = 3
	} 
	
	if (xCenDiff < IW+10 && ySideDiff < 5 && count == 0) {
		Ayvel *= -1
		Byvel = Ayvel*-1
		Brandcol()
		Arandcol()
		count = 3
	}
}

function EdgeCollision(){

	if (Ax + IW / 2 > 1920){
		Axvel = random(-2.5, -1);
		Arandcol()
	}
	if (Ax - IW / 2 < 0){
		Axvel = random(1, 2.5);
		Arandcol()
	}
	
	if (Ay + IH / 2 > 1080){
		Ayvel = random(-2.5, -1);
		Arandcol()
	}
	if (Ay - IH / 2 < 0){
		Ayvel = random(1, 2.5);
		Arandcol()
	}
	
	
		if (Bx + IW / 2 > 1920){
		Bxvel = random(-2.5, -1);
			Brandcol()
	}
	if (Bx - IW / 2 < 0){
		Bxvel = random(1, 2.5);
		Brandcol()
	}
	
	if (By + IH / 2 > 1080){
		Byvel = random(-2.5, -1);
		Brandcol()
	}
	if (By - IH / 2 < 0){
		Byvel = random(1, 2.5);
		Brandcol()
	}
	
}