
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var dots = [];
var img = new Image();

var turtleX = 0;
var turtleY = 450;

img.onload = function() {
	ctx.drawImage(img, turtleX, turtleY ,50,50);
}

var turtle = {

	// direction of turtle (North = 1,East = 2,South = 3, West = 4)
	up : {
		towards : 1,
		src  : "images/turtle-up.png"
	},
	right : {
		towards : 2,
		src  : "images/turtle-right.png"
	},
	down : {
		towards : 3,
		src  : "images/turtle-down.png"
	},
	left : {
		towards : 4,
		src  : "images/turtle-left.png"
	}
}

var oppos = {
	1 : 3,
	2 : 4,
	3 : 1,
	4 : 2
}

var directions = {
	1 : "North",
	2 : "East",
	3 : "South",
	4 : "West"
}

document.addEventListener("keydown", keyDownHandler, false);

initTurtle = function(){
	img.src = turtle.up.src;
	img.towards = turtle.up.towards;
	updateView(img.towards,turtleX,turtleY);
	drawDots();
}

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

var updateView = function(d,x,y){
 document.getElementById("turtleloc").innerHTML = "("+x+","+y+") towards " + directions[d];
}

var checkCollision = function(x,y,fn){
	if( (x < 0 || x >= canvas.width) || (y < 0 || y >= canvas.height) ){
		return true;
	}
	return false;
}

var moveTurtle = function(direction,x,y){
	console.log("old coordinates : ",turtleX,turtleY);
	console.log(direction);
	switch (direction) {
		case 1 :
			// Move towards north
			if(checkCollision(turtleX,turtleY - 50)){
				break;
			} 
			turtleY -= 50;
			break;
		case 2 :
			// Move towards east
			if(checkCollision(turtleX + 50,turtleY)){
				break;
			}
			turtleX += 50;
			break;
		case 3 :
			// Move towards south
			if(checkCollision(turtleX,turtleY + 50)){
				break;
			}
			turtleY += 50;
			break;
		case 4 :
			// Move towards west
			if(checkCollision(turtleX - 50,turtleY)){
				break;
			}
			turtleX -= 50;
			break;
	}


	updateView(direction,turtleX,turtleY);
	console.log("new coordinates : ",turtleX,turtleY);
	ctx.drawImage(img, turtleX, turtleY ,50,50);	
}

var left = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var file = img.src.slice(img.src.lastIndexOf('/'))
	switch (file) {
		case "/turtle-up.png":
		  img.src = turtle.left.src;
		  img.towards = turtle.left.towards;
		  break;
		case "/turtle-left.png":
		  img.src = turtle.down.src;
		  img.towards = turtle.down.towards;
		  break;
		case "/turtle-down.png":
		  img.src = turtle.right.src;
		  img.towards = turtle.right.towards;
		  break;
		case "/turtle-right.png":
		  img.src = turtle.up.src;
		  img.towards = turtle.up.towards;
		  break;
	}
	drawDots();
}

var right = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var file = img.src.slice(img.src.lastIndexOf('/'))
	switch (file) {
		case "/turtle-up.png":
		  img.src = turtle.right.src;
		  img.towards = turtle.right.towards; 
		  break;
		case "/turtle-right.png":
		  img.src = turtle.down.src;
		  img.towards = turtle.down.towards;
		  break;
		case "/turtle-down.png":
		  img.src = turtle.left.src;
		  img.towards = turtle.left.towards;
		  break;
		case "/turtle-left.png":
		  img.src = turtle.up.src;
		  img.towards = turtle.up.towards;
		  break;
	}
	drawDots();
}

var up = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawDots();
	moveTurtle(img.towards,turtleX,turtleY);
}

var down = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawDots();
	moveTurtle(oppos[img.towards],turtleX,turtleY);
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

initTurtle();
