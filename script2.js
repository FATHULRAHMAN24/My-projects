let canvas=document.getElementById("gamearea");
let ctx=canvas.getContext("2d");


var player={
    x:30,
    y:240,
    w:40,
    h:40,
    speed:0,
    backgroundcolor:"cyan",
    jumppower:-10,
    maxSpeed:6,
}

var map=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0],
    [0,0,0,0,2,0,0,2,0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

let speedY=0;
let gravity=0.5;

var moveLeft=false;
var moveRight=false;

let leftBtn= document.getElementById("leftbtn");
let rightBtn= document.getElementById("rightbtn");
let jumpBtn= document.getElementById("jumpbtn");

leftBtn.ontouchstart=function(){
    moveLeft=true;
}
leftBtn.ontouchend=function(){
    moveLeft=false;
}
rightBtn.ontouchstart=function(){
    moveRight=true;
}
rightBtn.ontouchend=function(){
    moveRight=false;
}

function update(){


if(moveLeft&&player.x>=0){
    player.speed-=0.5;
}
if(moveRight&&player.x<=720-player.w){
    player.speed+=0.5;
}
if(player.speed>player.maxSpeed){
    player.x=player.maxSpeed;
}
if(player.speed<-1*player.maxSpeed){
    player.speed=-1*player.maxSpeed;
}




player.speed*=0.9;
player.x+=player.speed;
speedY+=gravity;
player.y+=speedY
var col=Math.floor(player.x/40);
var row=Math.floor((player.y+player.h)/40);

if(map[row][col]==1){
    speedY=0;
    player.y=row*40-player.h;
}

}



function draw(){
    ctx.clearRect(0,0,720,320);
    for(var row=0; row<map.length; row++){
    for(var col=0; col<map[row].length; col++){
        if(map[row][col]==1){
            ctx.fillStyle="blue";
            ctx.fillRect(col*40,row*40,40,40);
        }
        if(map[row][col]==2){
            ctx.fillStyle="yellow";
            ctx.fillRect(col*40,row*40,20,20);
        }
    }
}
    ctx.fillStyle=player.backgroundcolor;
    ctx.fillRect(player.x,player.y,player.w,player.h);
}


function game(){
    update();
    draw();

    requestAnimationFrame(game);
}
game();