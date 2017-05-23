
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0,480);
ctx.lineTo(10,470);
ctx.lineTo(20, 10);
ctx.fill();
ctx.closePath();