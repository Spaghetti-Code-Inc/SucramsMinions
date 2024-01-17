const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const HEIGHT = 600;
const WIDTH = 1000;

var STOP = false;
var WINNER = "None";


var p1 = {
    pos: [249-40, 580-80],
    width: 80,
    color: "green"
};

var p2 = {
    pos: [749-40, 580-80],
    width: 80,
    color: "red"
};

window.onload = function(){
    setInterval(GameLoop, 16.66);
}

function GameLoop(){
    // Create screen
    Rect("white", 0, 0, WIDTH, HEIGHT);
    Rect("black", WIDTH/2-2, 0, 4, HEIGHT);
    Rect("black", 0, HEIGHT-20, WIDTH, 20);

    // Draw Player
    DrawPlayer(p1);
    DrawPlayer(p2);

    // Draw Block
    DrawBlock(40, 40, "W");
    DrawBlock(100, 40, "A");
}

function Rect(color, x, y, width, height=null){
    ctx.fillStyle = color;
    
    if(height == null) ctx.fillRect(x, y, width, width);
    else ctx.fillRect(x, y, width, height);
}

function DrawPlayer(p){
    Rect(p.color, p.pos[0], p.pos[1], p.width);
}

function DrawBlock(x, y, letter){
    ctx.strokeStyle = "1px black";
    ctx.strokeRect(x, y, 40, 40);
    
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(letter, x+20, y+32);
}

/*
A line will connect the green and red squares
Everytime a letter is pressed the squares will shift a few pixels to there own side
A total of each will be kept track, once a player pressed 20 more keys than the other they win. 
^Also will be signified by the losing block being dragged into a pit in the middle

10 Letters will be shown at a time, once a player is done with there 10 letters a new set will appear.
^or a new letter appears everytime one of the showing ones is pressed
*/