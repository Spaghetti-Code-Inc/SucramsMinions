const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const HEIGHT = 600;
const WIDTH = 1000;

var STOP = false;
var WINNER = "None";

ball = {
    pos: [490, 290],
    width: 20,
    speed: 7,
    regS: 7,
    ds: .001,
    color: "gray",
    rad: Math.random()*2*Math.PI,
    right: 1,
    up: 1,
};

p1 = {
    pos: [10, 260],
    width: 20, 
    height: 80,
    color: "green",
    speed: 5,
    up: false,
    down: false
};

p2 = {
    pos: [970, 260],
    width: 20,
    height: 80,
    color: "red",
    speed: 5,
    up: false,
    down: false,
}


window.onload = function(){
    setInterval(GameLoop, 16.66);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function GameLoop(){
    if(STOP) return;

    // Draw screen
    Rect("white", 0, 0, WIDTH, HEIGHT);
    Rect(p1.color, p1.pos[0], p1.pos[1], p1.width, p1.height);
    Rect(p2.color, p2.pos[0], p2.pos[1], p2.width, p2.height);
    
    Rect(ball.color, ball.pos[0], ball.pos[1], ball.width);

    // Move players
    MovePlayer(p1);
    MovePlayer(p2);


    // detect collisions
    BallCollisions();

    MoveBall();

    ball.speed += ball.ds;
    ball.regS += ball.ds;
}

function Rect(color, x, y, width, height=null){
    ctx.fillStyle = color;
    
    if(height == null) ctx.fillRect(x, y, width, width);
    else ctx.fillRect(x, y, width, height);
}

function RectangleCollider(x1, y1, w1, x2, y2, w2){
    if (
        x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + w2 &&
        y1 + w1 > y2
    ) {
        // Collision detected!
        return true;
    } else {
        // No collision
        return false;
    }
}

function MoveBall(){

    ball.pos[0] += ball.speed*Math.cos(ball.rad);
    ball.pos[1] += ball.up*ball.speed*Math.sin(ball.rad);

    if(ball.pos[0] < 0) ball.pos[0] = 0;
    else if(ball.pos[0] + ball.width > WIDTH) ball.pos[0] = WIDTH-ball.width;
}

function BallCollisions(){
    // Outer walls
    if(ball.pos[0] <= 0) {
        STOP = true;
    }
    else if(ball.pos[0]+ball.width >= WIDTH){
        STOP = true;
    }
    else if(ball.pos[1] <= 0 || ball.pos[1]+ball.width >= HEIGHT){
        ball.up *= -1;
    }

    // Paddles
    if(RectangleCollider(p1.pos[0]-60, p1.pos[1], 80, ball.pos[0], ball.pos[1], ball.width)){
        // Distance ball center is from paddle center on collision
        var n = ((p1.pos[1]+p1.height/2)-(ball.pos[1]+ball.width/2))/(p1.height/2+ball.width/2);
        
        if(Math.abs(n) > 0.5) ball.speed *= .5+Math.abs(n);
        else ball.speed = ball.regS;

        if(n>0.8) n = 0.8;
        else if(n < -0.8) n = -0.8;

        n = -n*Math.PI/2;
        ball.up = 1;

        ball.rad = n;
    }
    else if(RectangleCollider(p2.pos[0], p2.pos[1], 80, ball.pos[0], ball.pos[1], ball.width)){
        // Distance ball center is from paddle center on collision
        var n = ((p2.pos[1]+p2.height/2)-(ball.pos[1]+ball.width/2))/(p2.height/2+ball.width/2);
        
        if(Math.abs(n) > 0.5) ball.speed *= .5+Math.abs(n);
        else ball.speed = ball.regS;
        
        if(n>0.8) n = 0.8;
        else if(n < -0.8) n = -0.8;
        
        n = Math.PI+n*Math.PI/2;

        ball.up = 1;

        ball.rad = n;
    }
}



function MovePlayer(p){
    if(p.up && p.pos[1] > 0) p.pos[1] -= p.speed;
    if(p.down && p.pos[1]+p.height < HEIGHT) p.pos[1] += p.speed;
}

function keyDownHandler(e){
    if(e.keyCode == 87) p1.up = true;
    if(e.keyCode == 83) p1.down = true;

    if(e.keyCode == 38) p2.up = true;
    if(e.keyCode == 40) p2.down = true;
}

function keyUpHandler(e){
    if(e.keyCode == 87) p1.up = false;
    if(e.keyCode == 83) p1.down = false;

    if(e.keyCode == 38) p2.up = false;
    if(e.keyCode == 40) p2.down = false;
}



