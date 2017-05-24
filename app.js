
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var dots = [];
var img = new Image();

img.onload = function() {
	ctx.drawImage(img, 0, 450 ,50,50);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

img.src = "turtle.png";

var y = canvas.height;
var x = canvas.width;

var dotRowCount = 10;
var dotColCount = 10;
var dotOffsetLeft = 25;
var dotOffsetTop = 25;

for(c=0; c<dotColCount; c++) {
    dots[c] = [];
    for(r=0; r<dotRowCount; r++) {
        dots[c][r] = { x: 0, y: 0 };
    }
}

drawDots = function(){
	
	for(c=0; c<dotColCount; c++) {
	    for(r=0; r<dotRowCount; r++) {
	    	var dotX = c * (canvas.width/10) + dotOffsetLeft;
	    	var dotY = r * (canvas.height/10) + dotOffsetTop;
	    	dots[c][r].x = dotX;
	    	dots[c][r].y = dotY;

	    	ctx.beginPath();
			ctx.arc(dotX,dotY, 5, 0, Math.PI*2, false);
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.closePath();

	    }
	}
}

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	ctx.save(); 
 
	// move to the middle of where we want to draw our image
	ctx.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	ctx.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	ctx.drawImage(image, -(image.width/2), -(image.height/2),50,50);
 
	// and restore the co-ords to how they were when we began
	ctx.restore(); 
}

var left = function(){
	drawRotatedImage(img,canvas.width,canvas.height,90);
}

function keyDownHandler(e) {
    switch(e.keyCode){
    	case 37 :
    		console.log("37");
    		left();
    	    break;
    	case 38 :
    		console.log("38");
    		up();
    	    break;
    	case 39 :
    		console.log("39");
    		right();
    	    break;
    	case 40 :
    		console.log("40");
    		down();
    	    break; 
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


drawDots();

