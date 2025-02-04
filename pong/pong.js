function InitPong(){
    ball = {
        pos: [690, 290],
        width: 20,
        speed: 7,
        regS: 7,
        topSpeed: 15,
        ds: .001,
        color: "	#FFAC1C",
        rad: Math.random()*Math.PI/2 - Math.PI/4,
        right: 1,
        up: 1,
    };
    
    p1 = {
        pos: [10, 260],
        width: 20, 
        height: 100,
        color: " #0FFF50",
        speed: 5,
        velocity: 0,
        acceleration: 0.5,
        friction: 0.8,
        maxSpeed: 13,
        up: false,
        down: false,
        whack: false,
        lastWhackTime: 0,
        whackCooldown: 250
    };
    
    p2 = {
        pos: [1370, 260],
        width: 20,
        height: 100,
        color: " #DC143C",
        speed: 5,
        velocity:0,
        acceleration: 0.5,
        friction: 0.8,
        maxSpeed: 13,
        up: false,
        down: false,
        wack: false,
        lastWhackTime: 0,
        whackCooldown: 250,
    }
}

function GameLoopPong(){
    if(STOP) return;

    // Draw screen
    Rect_pong("#28282B", 0, 0, WIDTH, HEIGHT);
    Rect_pong(p1.color, p1.pos[0], p1.pos[1], p1.width, p1.height);
    Rect_pong(p2.color, p2.pos[0], p2.pos[1], p2.width, p2.height);
    
    Rect_pong(ball.color, ball.pos[0], ball.pos[1], ball.width);

    // Move players
    MovePlayer_pong(p1);
    MovePlayer_pong(p2);

    megaWhack(p1);
    megaWhack(p2);

    // detect collisions
    BallCollisions_pong();

    MoveBall_pong();
    
    ball.speed += ball.ds;
    ball.regS += ball.ds;
}

function Rect_pong(color, x, y, width, height=null){
    ctx.shadowColor = color;
    ctx.shadowBlur = 2;
    ctx.fillStyle = color;
    
    if(height == null){ 
        ctx.fillStyle = "#FFAC1C";
        ctx.shadowColor = "rgb(255, 203, 89)";
        ctx.shadowBlur = 20;
        ctx.fillRect(x, y, width, width);
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x + 1, y + 1, width - 2, width - 2);
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
    }
    else{
        ctx.fillRect(x, y, width, height);
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x+2, y+2, width - 4, height - 4)
        ctx.globalAlpha = 1.0;
    }
}

function SquareCollider_pong(x1, y1, w1, x2, y2, w2){
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

function MoveBall_pong(){

    ball.pos[0] += ball.speed*Math.cos(ball.rad);
    ball.pos[1] += ball.up*ball.speed*Math.sin(ball.rad);

    if(ball.pos[0] < 0) ball.pos[0] = 0;
    else if(ball.pos[0] + ball.width > WIDTH) ball.pos[0] = WIDTH-ball.width;
}

function BallCollisions_pong(){
    // Outer walls
    if(ball.pos[0] <= 0) {
        STOP = true;
        removeEventListener("keydown", keyDownHandler_pong);
        removeEventListener("keyup", keyUpHandler_pong);
    }
    else if(ball.pos[0]+ball.width >= WIDTH){
        STOP = true;
        removeEventListener("keydown", keyDownHandler_pong);
        removeEventListener("keyup", keyUpHandler_pong);
    }
    else if(ball.pos[1] <= 0 || ball.pos[1]+ball.width >= HEIGHT){
        if(Math.abs(ball.up) < 1){
            if(ball.up < 0){
                ball.up += 5;
            }else{
                ball.up -= 5;
            }
        }
        ball.up *= -1;
    }

    let currentTime = Date.now();
    // Paddles
    if(SquareCollider_pong(p1.pos[0]-60, p1.pos[1], p1.height, ball.pos[0], ball.pos[1], ball.width)){
        // Distance ball center is from paddle center on collision
        var n = ((p1.pos[1]+p1.height/2)-(ball.pos[1]+ball.width/2))/(p1.height/2+ball.width/2);
        
        if(Math.abs(n) > 0.5) ball.speed *= .5+Math.abs(n);
        else ball.speed = ball.regS;

        if(n>0.8) n = 0.8;
        else if(n < -0.8) n = -0.8;

        n = -n*Math.PI/2;
        ball.up = 1;

        ball.rad = n;

        if (currentTime - p1.lastWhackTime <= 250) {
            ball.speed *= 1.5;
        }
    }
    else if(SquareCollider_pong(p2.pos[0], p2.pos[1], p2.height, ball.pos[0], ball.pos[1], ball.width)){
        // Distance ball center is from paddle center on collision
        var n = ((p2.pos[1]+p2.height/2)-(ball.pos[1]+ball.width/2))/(p2.height/2+ball.width/2);
        
        if(Math.abs(n) > 0.5) ball.speed *= .5+Math.abs(n);
        else ball.speed = ball.regS;
        
        if(n>0.8) n = 0.8;
        else if(n < -0.8) n = -0.8;
        
        n = Math.PI+n*Math.PI/2;

        ball.up = 1;

        ball.rad = n;

        if (currentTime - p2.lastWhackTime <= 250) {
            ball.speed *= 1.5;
        }
    }
    ball.speed = Math.min(ball.topSpeed, ball.speed);
}


function MovePlayer_pong(p) {
    if (p.moving) {
        p.velocity += p.direction * p.acceleration;
        p.velocity = Math.max(Math.min(p.velocity, p.maxSpeed), -p.maxSpeed);
    } else {
        if (p.velocity > 0) {
            p.velocity = Math.max(p.velocity - p.friction, 0);
        } else if (p.velocity < 0) {
            p.velocity = Math.min(p.velocity + p.friction, 0);
        }
    }

    p.pos[1] += p.velocity;

    // bounce paddle off the ceiling and floor
    if (p.pos[1] < 0) {
        p.pos[1] = 0;
        p.velocity = Math.abs(p.velocity - (0.7 * p.velocity * p.friction));
    }
    if (p.pos[1] + p.height > HEIGHT) {
        p.pos[1] = HEIGHT - p.height;
        p.velocity = -Math.abs(p.velocity - (0.7 * p.velocity * p.friction));
    }
}

function megaWhack(p) {
    let currentTime = Date.now();
    if(p.whack){
        console.log("bounce!");
        if(p.pos[0] < 500){
            if(p.pos[0] > 2){
                p.pos[0]--;
            }
            else{
                p.whack = false;
                p.pos[0] = 10;
                p.lastWhackTime = currentTime;
            }
        }
        if(p.pos[0] > 500){
            if(p.pos[0] < WIDTH - 22){
                p.pos[0]++;
            }
            else{
                p.whack = false;
                p.pos[0] = 1370;
                p.lastWhackTime = currentTime;
            }
        }

    }
}

function keyDownHandler_pong(e) {
    let currentTime = Date.now();

    if (e.keyCode == 87) { // 'W' key
        p1.moving = true;
        p1.direction = -1;
    }
    if (e.keyCode == 83) { // 'S' key
        p1.moving = true;
        p1.direction = 1;
    }

    if (e.keyCode == 38) { // Up arrow
        p2.moving = true;
        p2.direction = -1;
    }
    if (e.keyCode == 40) { // Down arrow
        p2.moving = true;
        p2.direction = 1;
    }
    if(e.key =="v" && currentTime - p1.lastWhackTime > p1.whackCooldown){
        p1.whack = true;
        p1.lastWhackTime = currentTime;
     }
     if(e.key =="m" && currentTime - p2.lastWhackTime > p2.whackCooldown){
        p2.whack = true;
        p2.lastWhackTime = currentTime;
     }
}

function keyUpHandler_pong(e) {
    if (e.keyCode == 87 || e.keyCode == 83) { // 'W' or 'S' key
        p1.moving = false;
        p1.velocity = 0;
    }

    if (e.keyCode == 38 || e.keyCode == 40) { // Up or Down arrow
        p2.moving = false;
        p2.velocity = false;
    }
    if(e.key =="v"){
        p1.whack = false;
        p1.pos[0] = 10;
     }
     if(e.key =="m"){
        p2.whack = false;
        p2.pos[0] = 1370;
     }
}