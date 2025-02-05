const logo = new Image();
logo.src = "Assets/classClashLogo.png";

function InitHockey(){

    puck = {
        pos: [WIDTH/2, 350],
        color: " rgba(25, 83, 255, 0.41)",
        velocity: 0,
        momentumDirection: null,
        radius: 25,
        friction: 0.005,
        maxPuckspeed: 12
    };
    p1 = {
        pos: [100, 350],
        radius: 40,
        color: "rgb(18, 196, 66)",
        maxPlayerSpeed: 10,
        velocity: 0,
        acceleration: 0.5,
        friction: 0.5,
        momentumDirection: null,
        Up: false,
        Down: false,
        Left: false,
        Right: false,
        Fast: false,
        fastActive: false,
        fastEndTime: 0,
        fastCooldownEnd: 0,
    };
    p2 = {
        pos: [1300, 350],
        radius: 40,
        color: " #DC143C",
        maxPlayerSpeed: 10,
        velocity: 0,
        acceleration: 0.5,
        friction: 0.5,
        momentumDirection: null,
        Up: false,
        Down: false,
        Left: false,
        Right: false,
        Fast: false,
        fastActive: false,
        fastEndTime: 0,
        fastCooldownEnd: 0,
    };
}

function GameLoopHockey(){
    if(STOP) return;
    
    //clear background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();
    movePlayers();
    collisionHandler();
    drawObjects();
}

function drawBackground(){
    ctx.fillStyle = "rgb(219, 219, 219)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    //middle line
    ctx.fillStyle = "black";
    ctx.fillRect(WIDTH/2 - 5, 0, 10, HEIGHT);
    // goal boxes
    ctx.lineWidth = 10;
    ctx.strokeRect(-5, HEIGHT/2 - 100, 100, 200);
    ctx.strokeRect(WIDTH + 5 - 100, HEIGHT/2 - 100, 100, 200);

    // black border
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(100, 600, 100, Math.PI/2, Math.PI);
    ctx.stroke();
    ctx.fillRect(100, 695, 1200, 5)
    ctx.arc(100, 100, 100, Math.PI, 1.5*Math.PI);
    ctx.stroke();
    ctx.arc(1300, 100, 100, 1.5*Math.PI, 2*Math.PI);
    ctx.stroke();
    ctx.arc(1300, 600, 100, 0, 0.5*Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function drawObjects(){
    //draw p1
    ctx.lineWidth = 10;
    ctx.fillStyle = p1.color;
    ctx.beginPath();
    ctx.arc(p1.pos[0], p1.pos[1], p1.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(p1.pos[0], p1.pos[1], p1.radius/2, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.closePath();

    //draw p2
    ctx.lineWidth = 10;
    ctx.fillStyle = p2.color;
    ctx.beginPath();
    ctx.arc(p2.pos[0], p2.pos[1], p2.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(p2.pos[0], p2.pos[1], p2.radius/2, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.closePath();

    //draw puck
    ctx.lineWidth = 5;
    ctx.fillStyle = puck.color;
    ctx.shadowBlur = 5;
    ctx.shadowColor = puck.color;
    ctx.strokeStyle = "rgb(56, 76, 255)";
    ctx.beginPath();
    ctx.arc(puck.pos[0], puck.pos[1], puck.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black"
    ctx.shadowBlur = 0;
}

// helper method
function movePlayers(){
    movePlayer(p1);
    movePlayer(p2);
}

function movePlayer(player) {
    let currentTime = Date.now();

    // Boost activation (only when moving)
    if (player.Fast && !player.fastActive && currentTime > player.fastCooldownEnd) {
        if (player.momentumDirection !== null) { 
            player.fastActive = true;
            player.fastEndTime = currentTime + 200;
            

            player.boostAcceleration = player.acceleration * 6;
            player.boostMaxSpeed = player.maxPlayerSpeed * 5;
        }
        player.fastCooldownEnd = currentTime + 1000;
    }

    //reset after boost
    if (player.fastActive) {
        if (currentTime > player.fastEndTime) {
            player.fastActive = false; // End boost
            player.boostAcceleration = player.acceleration;
            player.boostMaxSpeed = player.maxPlayerSpeed;
        }
    }

    // determine movement direction
    let dx = 0, dy = 0;
    if (player.Up) dy -= 1;
    if (player.Down) dy += 1;
    if (player.Left) dx -= 1;
    if (player.Right) dx += 1;

    // Normalize direction
    if (dx !== 0 || dy !== 0) {
        let angle = Math.atan2(dy, dx);
        player.momentumDirection = angle;

        let acceleration = player.fastActive ? player.boostAcceleration : player.acceleration;
        let maxSpeed = player.fastActive ? player.boostMaxSpeed : player.maxPlayerSpeed;

        player.velocity = Math.min(player.velocity + acceleration, maxSpeed);
    } else {
        player.velocity = Math.max(player.velocity - player.friction, 0);
        if (player.velocity === 0) {
            player.momentumDirection = null;
        }
    }

    // move player based on velocity and direction
    if (player.momentumDirection !== null) {
        player.pos[0] += Math.cos(player.momentumDirection) * player.velocity;
        player.pos[1] += Math.sin(player.momentumDirection) * player.velocity;
    }

}

function movePuck(puck) {
    if (puck.momentumDirection !== null) {
        puck.pos[0] += Math.cos(puck.momentumDirection) * puck.velocity;
        puck.pos[1] += Math.sin(puck.momentumDirection) * puck.velocity;
    }
    puck.velocity *= 1 - puck.friction;
    handleWallCollision(puck);
}

function collisionHandler(){
    handleWallCollision(p1);
    handleWallCollision(p2);
    playerPuckCollisions(p1);
    playerPuckCollisions(p2);
}
// these collisions are for the walls
function handleWallCollision(object) {
    let ctx = canvas.getContext("2d");
    let minX = 2 + object.radius;
    let maxX = 1398 - object.radius;
    let minY = 2 + object.radius;
    let maxY = 698 - object.radius;

    
    if(object !== puck){
        // Keep players in bounds
        if (object.pos[0] < minX) object.pos[0] = minX;
        if (object.pos[0] > maxX) object.pos[0] = maxX;
        if (object.pos[1] < minY) object.pos[1] = minY;
        if (object.pos[1] > maxY) object.pos[1] = maxY;
    }

    //rounded corners
    let corners = [
        { x: 105, y: 105, startAngle: Math.PI, endAngle: 1.5 * Math.PI, quadrant: 1 },
        { x: 1295, y: 105, startAngle: 1.5 * Math.PI, endAngle: 0, quadrant: 2 },
        { x: 105, y: 595, startAngle: 0.5 * Math.PI, endAngle: Math.PI, quadrant: 3 },
        { x: 1295, y: 595, startAngle: 0, endAngle: Math.PI / 2, quadrant: 4 }
    ];
    let cornerRadius = 100;

    // Draw  corners for visualization
    // ctx.fillStyle = "blue";
    // for (let corner of corners) {
    //     ctx.beginPath();
    //     ctx.arc(corner.x, corner.y, cornerRadius, corner.startAngle, corner.endAngle);
    //     ctx.lineTo(corner.x, corner.y); 
    //     ctx.fill();
    // }

    for (let corner of corners) {
        let dx = object.pos[0] - corner.x;
        let dy = object.pos[1] - corner.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let angle = Math.atan2(dy, dx); // Angle from center of the circle to the object
        
        // if(corner.quadrant === 2){
        //     console.log("Angle: " + angle + " | startAngle: " + corner.startAngle + " | endAngle: " + corner.endAngle + " | distance: " + distance);
        // }
        if ((corner.quadrant === 1 && angle <= corner.startAngle - corner.endAngle) ||
            (corner.quadrant === 2 && angle <= -0.2 && angle >= -1.8) ||
            (corner.quadrant === 4 && angle >= corner.startAngle && angle <= corner.endAngle) ||
            (corner.quadrant === 3 && angle >= corner.startAngle && angle <= corner.endAngle)) {
            
            // Push object back inside bounds
            object.pos[0] = corner.x + Math.cos(angle) * (cornerRadius - object.radius);
            object.pos[1] = corner.y + Math.sin(angle) * (cornerRadius - object.radius);

            // Handle puck in corner
            if (object === puck) {
                // Calculate normal vector of the corner
                let normalX = object.pos[0] - corner.x;
                let normalY = object.pos[1] - corner.y;
                let normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
                
                // Normalize normal vector
                normalX /= normalLength;
                normalY /= normalLength;

                // Calculate direction of puck's momentum
                let dirX = Math.cos(object.momentumDirection);
                let dirY = Math.sin(object.momentumDirection);
                
                // Compute dot product between direction and normal
                let dotProduct = dirX * normalX + dirY * normalY;

                // Reflect momentum direction
                let reflectX = dirX - 2 * dotProduct * normalX;
                let reflectY = dirY - 2 * dotProduct * normalY;

                // Update puck's momentum direction
                object.momentumDirection = Math.atan2(reflectY, reflectX);

                // Adjust puck's position slightly if it's too close to the corner
                let minDist = object.radius + 1; // Set a buffer distance
                if (normalLength < minDist) {
                    // Move puck out slightly from the corner (along normal vector)
                    object.pos[0] = corner.x + normalX * minDist;
                    object.pos[1] = corner.y + normalY * minDist;
                }
            }
        }
        else{
            if(object === puck){
                if (object.pos[0] < minX || object.pos[0] > maxX){
                    puck.momentumDirection = Math.atan2(Math.sin(puck.momentumDirection), -Math.cos(puck.momentumDirection));
                    puck.pos[0] = Math.max(minX, Math.min(maxX, puck.pos[0]));
                }
                if (object.pos[1] < minY || object.pos[1] > maxY){
                    puck.momentumDirection = Math.atan2(-Math.sin(puck.momentumDirection), Math.cos(puck.momentumDirection));
                    puck.pos[1] = Math.max(minY, Math.min(maxY, puck.pos[1]));
                }
            }
        }

    }

    //keep player on their own side
    if(object === p1){
        if(object.pos[0] + object.radius >= WIDTH / 2){
            object.pos[0] = WIDTH/2 - object.radius - 5;
        }
    }
    if(object === p2){
        if(object.pos[0] - object.radius <= WIDTH / 2){
            object.pos[0] = WIDTH/2 + object.radius + 5;
        }
    }
    
}

function playerPuckCollisions(player){
    dx = player.pos[0] - puck.pos[0];
    dy = player.pos[1] - puck.pos[1];
    distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < player.radius + puck.radius){
        if(player.momentumDirection != null){
            puck.momentumDirection = player.momentumDirection;
            puck.velocity = player.velocity * 0.95;
        }
        else{
            if(puck.velocity != 0){
                puck.momentumDirection = puck.momentumDirection + Math.PI;
                puck.velocity *= 0.8;
            }
        }
    }
    movePuck(puck);
}

//key press handlers
function keyDownHandler_hockey(e){
    switch (e.keyCode) {
        case 87: p1.Up = true; break;
        case 65: p1.Left = true; break;
        case 83: p1.Down = true; break;
        case 68: p1.Right = true; break;
        case 86: p1.Fast = true; break;

        case 38: p2.Up = true; break;
        case 37: p2.Left = true; break;
        case 40: p2.Down = true; break;
        case 39: p2.Right = true; break;
        case 77: p2.Fast = true; break;
    }
}

function keyUpHandler_hockey(e){
    //p1
    if(e.keyCode == 87){
        p1.Up = false;
    }

    if(e.keyCode == 65){
        p1.Left = false;
    }

    if(e.keyCode == 83){
        p1.Down = false;
    }

    if(e.keyCode == 68){
        p1.Right = false;
    }

    if(e.keyCode == 86){
        p1.Fast = false;
    }


    //p2
    if(e.keyCode == 38){
        p2.Up = false;
    }

    if(e.keyCode == 37){
        p2.Left = false;
    }

    if(e.keyCode == 40){
        p2.Down = false;
    }

    if(e.keyCode == 39){
        p2.Right = false;
    }

    if(e.keyCode == 77){
        p2.Fast = false;
    }

}