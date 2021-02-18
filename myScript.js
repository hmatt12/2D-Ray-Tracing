//myScript.js
//Author: MAtt Herrity
//Date: 2/17/21

//get important elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


//gloabal constants
const rayCount = 300;
const wallCount = 12;


//global variables
var walls = [];
var maxLen = 1;

//event listeners
canvas.addEventListener('mousemove', UpdateRays);
window.addEventListener('resize', resizeCanvas);

//draw a line from p1 to p2 on canvas(ctx)
function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//set canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  maxLen = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
  initWalls();
  clearCanvas();
}

//draw rays from mouse position
function UpdateRays({clientX: x, clientY: y}) {

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";

  clearCanvas();
  for(var t = 0; t < rayCount; t++) {
    let minLen = maxLen;
    let theta = 2*Math.PI/rayCount*t;
    for(var i = 0; i < walls.length; i++){
      let newLen = detectCollision(walls[i], x, y, theta);
      if(newLen < minLen){
        minLen = newLen;
      }
    }
    let xt = x + minLen * Math.cos(theta);
    let yt = y + minLen * Math.sin(theta);
    drawLine(ctx, x, y, xt, yt);
  }
}

//get rid of all lines and then draw initWall
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < walls.length; i++) {
    walls[i].draw(ctx);
  }
}

//generate wall points (constructor defined in wall.js)
function initWalls(){
  while(walls.length){
    walls.pop();
  }

  for(var i = 0; i < wallCount; i++){
    walls[i] = new wall(canvas.height, canvas.width);
  }
}

//detect collision of ray with wall
function detectCollision(line, mx, my, theta){
  let A = line.x1 - line.x2;
  let B = line.y1 - line.y2;
  let E = mx - line.x2;
  let F = my - line.y2;
  let C = -Math.cos(theta);
  let D = -Math.sin(theta);
  if (D*A != C*B){
    let rayParam = (E*B - F*A)/(C*B - D*A);
    let lineParam = (F*C -  E*D)/(C*B - D*A);

    if(lineParam >= 0 && lineParam <= 1 && rayParam >= 0){
      return rayParam;
    }

  }
  return Infinity;
}

//on startup
resizeCanvas();
