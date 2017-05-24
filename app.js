
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var dots = [];
var img = new Image();

img.onload = function() {
	ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
}

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

	    	console.log(dotX,dotY);

	    	ctx.beginPath();
			ctx.arc(dotX,dotY, 5, 0, Math.PI*2, false);
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.closePath();

	    }
	}

}

drawDots();
