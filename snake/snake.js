function InitSnake(){
    dS = 7;
    // Change in speed when power up is collected
    ddS = 1;
    
    p1 = {
        speed: dS,
        pos: [100, 280],
        width: 40,
        acolor: "#DC143C",
        color: "rgb(165, 16, 46)",
        Up: false,
        Left: false,
        Down: false,
        Right: false,
        Fast: false,
        FastMultiplier: 1.5,
        last: "Right",
        len: 20,
        body: [[80, 280], [60, 280]]
    };
    
    p2 = {
        speed: dS,
        pos: [1260, 280],
        width: 40,
        acolor: "#0FFF50",
        color: "rgb(18, 196, 66)",
        Up: false,
        Left: false,
        Down: false,
        Right: false,
        Fast: false,
        FastMultiplier: 1.5,
        last: "Left",
        len: 20,
        body: [[1280, 280], [1300, 280]]
    };
    
    food = [];
    foodWidth = 20;
    foodUp = 10;
}



function GameLoopSnake(){
    if(STOP) return;

    // Clear Screen
    Rect_snake("#28282B", 0, 0, WIDTH, HEIGHT)

    // Move Players
    MovePlayer_snake(p1);
    MovePlayer_snake(p2);

    // Draw Players
    DrawPlayer_snake(p1);
    DrawPlayer_snake(p2);

    // Detect Collisions
    CollisionDetect_snake();

    // Spawn some food
    FoodSpawner_snake();
}

function Rect_snake(color, x, y, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function RectangleCollider_snake(x1, y1, w1, x2, y2, w2){
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

function GoToEndingScreen_snake(){
    Rect_snake("white", 0, 0, WIDTH, HEIGHT);
    
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    if(WINNER == "p1"){
        // Add a point to p1's total
        ctx.fillText("Player 1 Wins: (Show updated round score)", 500, 300);
    } else if (WINNER == "p2"){
        // Add a point to p2's total
        ctx.fillText("Player 2 Wins: (Show updated round score)", 500, 300);
    } else {
        // Tie, do not add a point to either
        ctx.fillText("Tie: (Show updated round score)", 500, 300);
    }

    // Wait until space bar is pressed to move on to the next game
}

function CollisionDetect_snake(){

   // Heads collide
   if(RectangleCollider_snake(p1.pos[0], p1.pos[1], p1.width, p2.pos[0], p2.pos[1], p2.width)){
        STOP = true;

        if(p1.len > p2.len){
            WINNER = "p1";
            console.log("Green wins!");
        } else if (p2.len > p1.len){
            WINNER = "p2";
            console.log("Red Wins");
        } else {
            WINNER = "tie";
            console.log("Tie!");
        }
        return;
    }

    // P1
    try{
        for(i = 0; i < p2.len; i++){
            if(RectangleCollider_snake(p1.pos[0], p1.pos[1], p1.width, p2.body[i][0], p2.body[i][1], p2.width)){
                removeEventListener("keyup", keyUpHandler_snake);
                removeEventListener("keydown", keyDownHandler_snake);
                STOP = true;
                return;
            }
        }
    } catch {}
    // P2
    try{
        for(i = 0; i < p1.len; i++){
            if(RectangleCollider_snake(p2.pos[0], p2.pos[1], p2.width, p1.body[i][0], p1.body[i][1], p1.width)){
                removeEventListener("keyup", keyUpHandler_snake);
                removeEventListener("keydown", keyDownHandler_snake);
                STOP = true;
                return;
            }
        }
    } catch {}
}

function DrawPlayer_snake(p){
    try{
        // Always striped color
        for(i = 0; i < p.len; i++){
                
            if(i%4 <= 1) Rect_snake(p.acolor, p.body[i][0], p.body[i][1], p.width, p.width);
            else Rect_snake(p.color, p.body[i][0], p.body[i][1], p.width, p.width);

        }
        // SWITCH Into switching color mode for FAST
        // if(p.Fast && p.len > 8){
        //     for(i = 0; i < p.len; i++){
                
        //         if(i%4 <= 1) Rect(p.acolor, p.body[i][0], p.body[i][1], p.width, p.width);
        //         else Rect(p.color, p.body[i][0], p.body[i][1], p.width, p.width);

        //     }
        // }
        // else {
        //     for(i = 0; i < p.len; i++){
        //         Rect(p.color, p.body[i][0], p.body[i][1], p.width, p.width);
        //     }
        // }

    } catch {}

    ctx.strokeStyle = "black";
    ctx.lineWidth = 8;
    ctx.strokeRect(p.pos[0], p.pos[1], p.width, p.width);
    Rect_snake(p.color, p.pos[0], p.pos[1], p.width, p.width);
}

function MovePlayer_snake(p){
    // var move = 0;
    // if(p.Fast && p.len > 8){
    //     move = p.speed*p.FastMultiplier;
    //     p.len -= 0.2;
    // } else { move = p.speed; }
    let move = p.speed;

    if (p.Fast && p.len > 8) {
        move = p.speed * p.FastMultiplier;
        p.len -= 0.2;
    } else if (!p.Fast) {
        move = p.speed;
    }


    if(p.body.length >= p.len){
        p.body.pop();
    }

    if((!p.Up && !p.Down && !p.Left && !p.Right) || (p.Left && p.Right && !p.Down && !p.Up) || (p.Up && p.Down && !p.Left && !p.Right)){
        if(p.last == "Up") p.pos[1] -= move;
        else if(p.last == "Left") p.pos[0] -= move;
        else if(p.last == "Down") p.pos[1] += move;
        else if(p.last == "Right") p.pos[0] += move;
    }


    sqrt2 = 1.41421356237;
    if(p.Up && p.Left){
        p.pos[1] -= move/sqrt2;
        p.pos[0] -= move/sqrt2;
    }
    if(p.Up && p.Right){
        p.pos[1] -= move/sqrt2;
        p.pos[0] += move/sqrt2;
    }
    if(p.Down && p.Left){
        p.pos[1] += move/sqrt2;
        p.pos[0] -= move/sqrt2;
    }
    if(p.Down && p.Right){
        p.pos[1] += move/sqrt2;
        p.pos[0] += move/sqrt2;
    }

    if(p.Up && (!p.Left && !p.Right && !p.Down)) {
        p.pos[1] -= move;
    }
    if(p.Down && (!p.Left && !p.Right && !p.Up)) {
        p.pos[1] += move;
    }
    if(p.Left && (!p.Up && !p.Down && !p.Right)) {
        p.pos[0] -= move;
    }
    if(p.Right && (!p.Up && !p.Down && !p.Left)) {
        p.pos[0] += move;
    }

    currentX = p.pos[0];
    currentY = p.pos[1];
    p.body.unshift([currentX, currentY]);



    if(p.pos[0]+p.width/2 > WIDTH) p.pos[0] = -p.width/2;
    if(p.pos[1]+p.width/2 > HEIGHT) p.pos[1] = -p.width/2;
    if(p.pos[0]+p.width/2 < 0) p.pos[0] += WIDTH;
    if(p.pos[1]+p.width/2 < 0) p.pos[1] += HEIGHT;

    // if(p.pos[0]+p.width/2 > WIDTH) p.pos[0] = (p.pos[0]+p.width/2)%WIDTH;
    // if(p.pos[1]+p.width/2 > HEIGHT) p.pos[1] = (p.pos[1]+p.width/2)%HEIGHT;
    // if(p.pos[0]+p.width/2 < 0) p.pos[0] += WIDTH-p.width/2;
    // if(p.pos[1]+p.width/2 < 0) p.pos[1] += HEIGHT-p.width/2;
}




function FoodSpawner_snake(){
    var num = Math.random();
    if(num < .01){
        var x = Math.random()*(WIDTH-20);
        var y = Math.random()*(HEIGHT-20);

        var place = true;
        try {
            for(i = 0; i < p2.len; i++){
                if(RectangleCollider_snake(x, y, 20, p2.body[i][0], p2.body[i][1], p2.width)){
                    place = false;
                }
            }
        } catch (error) {}

        try {
            for(i = 0; i < p1.len; i++){
                if(RectangleCollider_snake(x, y, 20, p1.body[i][0], p1.body[i][1], p1.width)){
                    place = false;
                }
            }
        } catch (error) {}

        if(place){
            food.push([x, y]);
        }

    }

    var rid = -1;
    for(i = 0; i < food.length; i++){

        ctx.fillStyle = "#FFAC1C";
        ctx.shadowColor = "rgb(255, 203, 89)";
        ctx.shadowBlur = 20;
        ctx.fillRect(food[i][0], food[i][1], foodWidth, foodWidth)
        ctx.shadowBlur = 0;
        if(RectangleCollider_snake(food[i][0], food[i][1], foodWidth, p1.pos[0], p1.pos[1], p1.width)){
            rid = i;
            p1.len += foodUp;
        }
        if(RectangleCollider_snake(food[i][0], food[i][1], foodWidth, p2.pos[0], p2.pos[1], p2.width)){
            rid = i;
            p2.len += foodUp;
        }
    }

    if(rid != -1) food.splice(rid, 1);

}

function keyDownHandler_snake(e){
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

function keyUpHandler_snake(e){


    if(e.keyCode == 87){
        if(!p1.Left && !p1.Right && !p1.Down){
            p1.last = "Up";
        }
        p1.Up = false;

    }
    if(e.keyCode == 65){
        if(!p1.Up && !p1.Right && !p1.Down){
            p1.last = "Left";
        }
        p1.Left = false;

    }
    if(e.keyCode == 83){
        if(!p1.Left && !p1.Right && !p1.Up){
            p1.last = "Down";
        }
        p1.Down = false;

    }
    if(e.keyCode == 68){
        if(!p1.Left && !p1.Up && !p1.Down){
            p1.last = "Right";
        }
        p1.Right = false;

    }
    if(e.keyCode == 86){
        p1.Fast = false;
    }

    if(e.keyCode == 38){
        if(!p2.Left && !p2.Right && !p2.Down){
            p2.last = "Up";
        }
        p2.Up = false;

    }
    if(e.keyCode == 37){
        if(!p2.Up && !p2.Right && !p2.Down){
            p2.last = "Left";
        }
        p2.Left = false;

    }
    if(e.keyCode == 40){
        if(!p2.Left && !p2.Right && !p2.Up){
            p2.last = "Down";
        }
        p2.Down = false;

    }
    if(e.keyCode == 39){
        if(!p2.Left && !p2.Up && !p2.Down){
            p2.last = "Right";
        }
        p2.Right = false;

    }

    if(e.keyCode == 77){
        p2.Fast = false;
    }
}