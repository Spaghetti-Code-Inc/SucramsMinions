const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const HEIGHT = 600;
const WIDTH = 1000;

var STOP = false;
var WINNER = "None";


var p1 = {
    pos: [249-40, 580-80],
    width: 80,
    color: "green",
    listToPress: [],
    keysPressed: 0
};

var p2 = {
    pos: [749-40, 580-80],
    width: 80,
    color: "red",
    listToPress: [],
    keysPressed: 0,
};

var keyDict = {
    0: "a",
    1: "b",
    2: "c", 
    3: "d",
    4: "e",
    5: "f",
    6: "g", 
    7: "h",
    8: "i",
    9: "j",
    10: "k",
    11: "l",
    12: "m",
    13: "n",
    14: "o",
    15: "p",
    16: "q",
    17: "r",
    18: "s",
    19: "t",
    20: "u",
    21: "v",
    22: "w",
    23: "x",
    24: "y",
    25: "z",
}

window.onload = function(){
    Init();
    setInterval(GameLoop, 16.66);
}

function Init(){
    for(var i = 0; i < 45; i++){
        var n = Math.floor(26*Math.random());
        var k = Math.floor(26*Math.random());

        p1.listToPress.push(keyDict[n]);
        p2.listToPress.push(keyDict[k]);
    }

    console.log(p1.listToPress);
}

function GameLoop(){
    // Create screen
    Rect("white", 0, 0, WIDTH, HEIGHT);
    Rect("black", WIDTH/2-2, 0, 4, HEIGHT);
    Rect("black", 0, HEIGHT-20, WIDTH, 20);

    // Draw Player
    DrawPlayer(p1);
    DrawPlayer(p2);

    // Draw 10 Blocks on each side
    // DrawBlock(40, 40, "W");
    // DrawBlock(100, 40, "A");

    DrawBlocks(p1);
}

function Rect(color, x, y, width, height=null){
    ctx.fillStyle = color;
    
    if(height == null) ctx.fillRect(x, y, width, width);
    else ctx.fillRect(x, y, width, height);
}

function DrawPlayer(p){
    Rect(p.color, p.pos[0], p.pos[1], p.width);
}

function DrawBlocks(p){
    for(var row = 0; row < 9; row++){
        for(var col = 0; col < 5; col++){
            
            // Current Row that needs pressed
            if(p.keysPressed >= row*5 && p.keysPressed < 5+row*5){
                DrawBlockToPress(90+col*60, 40+50*row, p.listToPress[5*row+col]);
            }
            // Rows that have already been pressed
            else if(p.keysPressed >= 5+row*5){
                DrawBlockBeenPress(90+col*60, 40+50*row, p.listToPress[5*row+col]);
            }
            else {
                DrawBlockCantPress(90+col*60, 40+50*row, p.listToPress[5*row+col]);
            }

        }
    }
}

function DrawBlockToPress(x, y, letter){
    ctx.strokeStyle = "1px black";
    ctx.strokeRect(x, y, 40, 40);
    
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(letter, x+20, y+32);
}

function DrawBlockBeenPress(x, y, letter){
    ctx.strokeStyle = "1px black";
    ctx.strokeRect(x, y, 40, 40);
    
    ctx.fillStyle = "Green";
    ctx.fillRect(x, y, 40, 40);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(letter, x+20, y+32);
}

function DrawBlockCantPress(x, y, letter){
    ctx.strokeStyle = "1px black";
    ctx.strokeRect(x, y, 40, 40);
    
    ctx.fillStyle = "Gray";
    ctx.fillRect(x, y, 40, 40);

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