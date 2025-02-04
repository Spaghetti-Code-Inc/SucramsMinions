const logo = new Image();
logo.src = "Assets/classClashLogo.png";

function InitHockey(){

    gamePhysics = {
        acceleration: 0.5,
        friction: 0.5,
        maxPlayerSpeed: 10,
        maxPuckspeed: 12
    };
    puck = {
        pos: [500, 300],
        velocity: 0,
        momentumDirection: null,
        radius: 20
    };
    p1 = {
        pos: [100, 200],
        color: "green",
        velocity: 0,
        momentumDirection: null,
        Up: false,
        Down: false,
        Left: false,
        Right: false
    };
    p2 = {
        pos: [1100, 200],
        color: red,
        velocity: 0,
        momentumDirection: null,
        Up: false,
        Down: false,
        Left: false,
        Right: false
    };
}

function GameLoopHockey(){
    if(STOP) return;
    
    //clear background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();
}

function drawBackground(){
    ctx.fillStyle = "rgb(219, 219, 219)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(WIDTH/2 - 5, 0, 10, HEIGHT);
    
}