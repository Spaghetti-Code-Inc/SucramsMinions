const TO_RADIANS = Math.PI / 180;
const TO_DEGREES = 180 / Math.PI;
function InitTank() {
    //pos and orientation vars
    p1Pos = [1200, 325];
    p2Pos = [200, 325];
    p1Angle = 180;
    p2Angle = 0;
    //movement vars
    p1rightPressed = false;
    p1leftPressed = false;
    p1upPressed = false;
    p1downPressed = false;
    p1shotFired = false;
    p1Reload = 0;
    p1Alive = true;
    p1CanGo = [true, true];          //variable for if space in front and behind is clear    [front clear, back clear]
    p1TimePressed = 0;          //variable for rotation acceleration to increase aim potential
    p2rightPressed = false;
    p2leftPressed = false;
    p2upPressed = false;
    p2downPressed = false;
    p2shotFired = false;
    p2Reload = 0;
    p2Alive = true;
    p2CanGo = [true, true];         //variable for if space in front and behind is clear    [front clear, back clear]
    p2TimePressed = 0;
    //setting vars
    rotateSpeed = 3;
    movementSpeed = 3;
    reloadSpeed = 3;         //in seconds
    //bulletVars
    bulletSpeed = 5;
    bullets = [];
    numBullets = 10;
    p1BulletsLeft = 5;
    p2BulletsLeft = 5;
    numBulletBounces = 1;

    //TODO NEED TO CLEAR THIS INTERVAL WHEN THE GAME IS OVER
    window.onload = setInterval(reload_tank, 1000);
    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//function for when user presses down key
function keyDownHandler_tank(e){		//handles all keys when pressed down
	if(e.key == "ArrowRight"){
		p1rightPressed = true;
	}//end of if stm
    else if(e.key == "ArrowLeft"){
            p1leftPressed = true;
    }//end of else if stm

    if(e.key == "d"){
		p2rightPressed = true;
	}//end of if stm
    else if(e.key == "a"){
        p2leftPressed = true;
    }//end of else if stm
	
	
	if (e.key == "ArrowUp") {
       p1upPressed = true;
	}//end of else if stm

	if (e.key =="w") {
        p2upPressed = true;
    }

    if (e.key == "ArrowDown") {
        p1downPressed = true;
     }//end of else if stm
 
     if (e.key =="s") {
         p2downPressed = true;
     }

     //shooting
     if(e.key =="m"){
        p1shotFired = true;
     }
     if(e.key =="v"){
        p2shotFired = true;
     }
}//end of function keyDownHandler()

//function to respond to when the arrow keys are up
function keyUpHandler_tank(e){		//handles all keys when unpressed
	if(e.key == "ArrowRight"){
		p1rightPressed = false;
        p1TimePressed = 0;
	}//end of if stm
    else if(e.key == "ArrowLeft"){
            p1leftPressed = false;
            p1TimePressed = 0;
    }//end of else if stm

    if(e.key == "d"){
		p2rightPressed = false;
        p2TimePressed = 0;
	}//end of if stm
    else if(e.key == "a"){
        p2leftPressed = false;
        p2TimePressed = 0;
    }//end of else if stm
	
	
	if (e.key == "ArrowUp") {
       p1upPressed = false;
	}//end of else if stm
	if (e.key =="w") {
        p2upPressed = false;
    }
    if (e.key == "ArrowDown") {
        p1downPressed = false;
     }//end of else if stm
 
     if (e.key =="s") {
         p2downPressed = false;
     }
}//end of function keyUpHandler()

function drawPlayers_tank(p1Position, p2Position) {

    //move canvas to match player one rotation, draw, then revert
    ctx.translate(p1Position[0] + Math.cos(p1Angle*TO_RADIANS), p1Position[1] - Math.sin(p1Angle*TO_RADIANS));
    ctx.rotate(p1Angle * TO_RADIANS);

    ctx.lineWidth = 2;
    ctx.fillStyle = ' #DC143C';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.strokeRect(-25, -25, 50, 50);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 360);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fillRect(15, -3, 40, 6);

    ctx.rotate(-p1Angle * TO_RADIANS);
    ctx.translate(-p1Position[0] - Math.cos(p1Angle*TO_RADIANS), -p1Position[1] + Math.sin(p1Angle*TO_RADIANS));

    //move canvas to match player two rotation, draw, then revert
    ctx.translate(p2Position[0] + Math.cos(p2Angle*TO_RADIANS), p2Position[1] - Math.sin(p2Angle*TO_RADIANS));
    ctx.rotate(p2Angle * TO_RADIANS);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgb(18, 196, 66)';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.strokeRect(-25, -25, 50, 50);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 360);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fillRect(15, -3, 40, 6);
    ctx.rotate(-p2Angle * TO_RADIANS);
    ctx.translate(-p2Position[0] - Math.cos(p2Angle*TO_RADIANS), -p2Position[1] + Math.sin(p2Angle*TO_RADIANS));
}
function deltaPlayer_tank(){
    if(p1upPressed && p1CanGo[0]){
        p1Pos[0]+= (Math.cos(p1Angle*TO_RADIANS)*movementSpeed);
        p1Pos[1]+= (Math.sin(p1Angle*TO_RADIANS)*movementSpeed);
    }
    if(p1downPressed && p1CanGo[1]){
        p1Pos[0]-= (Math.cos(p1Angle*TO_RADIANS)*movementSpeed);
        p1Pos[1]-= (Math.sin(p1Angle*TO_RADIANS)*movementSpeed);
    }
    if(p1rightPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.04;
        }
        p1Angle+=rotateSpeed*p1TimePressed;
    }
    if(p1leftPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.04;
        }
        p1Angle-=rotateSpeed*p1TimePressed;
    }
    if(p2upPressed && p2CanGo[0]){
        p2Pos[0]+= (Math.cos(p2Angle*TO_RADIANS)*movementSpeed);
        p2Pos[1]+= (Math.sin(p2Angle*TO_RADIANS)*movementSpeed);
    }
    if(p2downPressed && p2CanGo[1]){
        p2Pos[0]-= (Math.cos(p2Angle*TO_RADIANS)*movementSpeed);
        p2Pos[1]-= (Math.sin(p2Angle*TO_RADIANS)*movementSpeed);
    }
    if(p2rightPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.04;
        }
        p2Angle+=rotateSpeed*p2TimePressed;
    }
    if(p2leftPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.04;
        }
        p2Angle-=rotateSpeed*p2TimePressed;
    }
}

function bulletHander_tank(){
    if(p1shotFired && p1BulletsLeft > 0){
        bullets.push([p1Pos[0] + 45 * Math.cos(p1Angle*TO_RADIANS), p1Pos[1] + 45 * Math.sin(p1Angle*TO_RADIANS), p1Angle, numBulletBounces]);
        p1BulletsLeft--;
        p1shotFired=false;
    }
    if(p2shotFired && p2BulletsLeft > 0){
        bullets.push([p2Pos[0] + 45 * Math.cos(p2Angle*TO_RADIANS), p2Pos[1] + 45 * Math.sin(p2Angle*TO_RADIANS), p2Angle, numBulletBounces]);
        p2BulletsLeft--;
        p2shotFired=false;
    }

    for (let i = 0; i < bullets.length; i++){
        moveBullet_tank(bullets[i])
        drawBullet_tank(bullets[i][0], bullets[i][1], bullets[i][3]);
        if(bullets[i][0] > gameScreen.clientWidth || bullets[i][0] < 0 || bullets[i][1] > gameScreen.clientHeight || bullets[i][1] < 0){
            if(bullets[i][3] > 0){
                if(bullets[i][0] > gameScreen.clientWidth){
                    bullets[i][2] = 180 - bullets[i][2];
                    console.log("bounce left");
                }
                else if(bullets[i][0] < 0){
                    bullets[i][2] = 180 - bullets[i][2];
                    console.log("bounce right");
                }
                else if(bullets[i][1] > gameScreen.clientHeight){
                    bullets[i][2] = 360 - bullets[i][2];
                    console.log("bounce up");
                }
                else if(bullets[i][1] < 0){
                    bullets[i][2] = 360 - bullets[i][2];
                    console.log("bounce down");
                }
                bullets[i][3]--;
            }
            else{
                if(bullets.length == 1){
                    bullets = [];
                }
                else{
                    bullets = bullets.slice(0, i).concat(bullets.slice(i+1));
                }
            }
        }
    }

}

function moveBullet_tank(bullet){
    bullet[0]+= (Math.cos(bullet[2]*TO_RADIANS)*bulletSpeed);
    bullet[1]+= (Math.sin(bullet[2]*TO_RADIANS)*bulletSpeed);
}

function drawBullet_tank(bullX, bullY, numBounces){
    if(numBounces >= 1){
        ctx.fillStyle = "#E5E4E2";
    }
    else{
        ctx.fillStyle = "grey";
    }
    ctx.fillRect(bullX, bullY, 5, 5);
}

function reload_tank(){
    if(p1BulletsLeft < numBullets){
        p1Reload++;
    }
    if(p1Reload == reloadSpeed){
        p1BulletsLeft++;
        p1Reload = 0;
    }
    if(p2BulletsLeft < numBullets){
        p2Reload++;
    }
    if(p2Reload == reloadSpeed){
        p2BulletsLeft++;
        p2Reload = 0;
    }
}

function collisionDetect_tank(){
    //player 1 border, so tank doesn't go off screen; forwards direction
    nextPosF1 = [p1Pos[0] + Math.cos(p1Angle*TO_RADIANS)*movementSpeed, p1Pos[1] + Math.sin(p1Angle*TO_RADIANS)*movementSpeed];
    if(nextPosF1[0] + (25+Math.cos(p1Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosF1[0] - (25-Math.cos(p1Angle*TO_RADIANS)) < 0 || nextPosF1[1] + (25+Math.sin(p1Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosF1[1] - (25-Math.sin(p1Angle*TO_RADIANS)) < 0){
        p1CanGo[0] = false;
    }
    else{
        p1CanGo[0] = true;
    }
    //backwards player 1
    nextPosB1 = [p1Pos[0] - Math.cos(p1Angle*TO_RADIANS)*movementSpeed, p1Pos[1] - Math.sin(p1Angle*TO_RADIANS)*movementSpeed];
    if(nextPosB1[0] + (25+Math.cos(p1Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosB1[0] - (25-Math.cos(p1Angle*TO_RADIANS)) < 0 || nextPosB1[1] + (25+Math.sin(p1Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosB1[1] - (25-Math.sin(p1Angle*TO_RADIANS)) < 0){
        p1CanGo[1] = false;
    }
    else{
        p1CanGo[1] = true;
    }

    //player 2 border, so tank doesn't go off screen
    nextPosF2 = [p2Pos[0] + Math.cos(p2Angle*TO_RADIANS)*movementSpeed, p2Pos[1] + Math.sin(p2Angle*TO_RADIANS)*movementSpeed];
    if(nextPosF2[0] + (25+Math.cos(p2Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosF2[0] - (25-Math.cos(p2Angle*TO_RADIANS)) < 0 || nextPosF2[1] + (25+Math.sin(p2Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosF2[1] - (25-Math.sin(p2Angle*TO_RADIANS)) < 0){
        p2CanGo[0] = false;
    }
    else{
        p2CanGo[0] = true;
    }
    //backwards player 2
    nextPosB2 = [p2Pos[0] - Math.cos(p2Angle*TO_RADIANS)*movementSpeed, p2Pos[1] - Math.sin(p2Angle*TO_RADIANS)*movementSpeed];
    if(nextPosB2[0] + (25+Math.cos(p2Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosB2[0] - (25-Math.cos(p2Angle*TO_RADIANS)) < 0 || nextPosB2[1] + (25+Math.sin(p2Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosB2[1] - (25-Math.sin(p2Angle*TO_RADIANS)) < 0){
        p2CanGo[1] = false;
    }
    else{
        p2CanGo[1] = true;
    }

    //bullet collision detection
    for (let i = 0; i < bullets.length; i++){
        //player one
        if(bullets[i][0] > p1Pos[0] - (25+Math.cos(p1Angle*TO_RADIANS)) && bullets[i][0] < p1Pos[0] + (25+Math.cos(p1Angle*TO_RADIANS))){
            if(bullets[i][1] > p1Pos[1] -  (25+Math.sin(p1Angle*TO_RADIANS)) && bullets[i][1] < p1Pos[1] +  (25+Math.sin(p1Angle*TO_RADIANS))){
                p1Alive = false;

                removeEventListener("keydown", keyDownHandler_tank);
                removeEventListener("keyup", keyUpHandler_tank); 

                STOP = true;
                console.log("red hit");
            }
        }
        //player two
        if(bullets[i][0] > p2Pos[0] - (25+Math.cos(p2Angle*TO_RADIANS)) && bullets[i][0] < p2Pos[0] + (25+Math.cos(p2Angle*TO_RADIANS))){
            if(bullets[i][1] > p2Pos[1] -  (25+Math.sin(p2Angle*TO_RADIANS)) && bullets[i][1] < p2Pos[1] +  (25+Math.sin(p2Angle*TO_RADIANS))){
                p2Alive = false;

                removeEventListener("keydown", keyDownHandler_tank);
                removeEventListener("keyup", keyUpHandler_tank); 

                STOP = true;
                console.log("green hit");
            }
        }
    }
}

function drawGUI_tank(){
    ctx.font = "20px Arial";
    
    ctx.fillStyle= 'rgba(15, 255, 79, 0.74)';
    ctx.fillRect(10, 20, 20, 20);
    ctx.fillStyle= 'rgba(220, 20, 60, 0.75)';
    ctx.fillRect(gameScreen.clientWidth - 20 - 10, 20, 20, 20);
    for (let i = 0; i < p2BulletsLeft; i++){
        ctx.fillStyle = 'rgba(136, 136, 136, 0.5)';
        ctx.fillRect(20 * i + 40, 22.5, 10, 15);
    }
    for (let i = 0; i < p1BulletsLeft; i++){
        ctx.fillStyle = 'rgba(136, 136, 136, 0.5)';
        ctx.fillRect(gameScreen.clientWidth - (20 * i) - 50, 22.5, 10, 15);
    }

    if(!p1Alive){
        ctx.font = "50px Arial";
        ctx.fillText("Red Hit", 400, 300);
    }
    if(!p2Alive){
        ctx.font = "50px Arial";
        ctx.fillText("Green Hit", 400, 300);
    }
}

function goToEndScreen_tank(){
    ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
    if(!p1Alive && p2Alive){
        ctx.font = "50px Arial";
        ctx.fillText("Red Hit", 400, 300);
    }
    else if(!p2Alive && p1Alive){
        ctx.font = "50px Arial";
        ctx.fillText("Green Hit", 400, 300);
    }
    else{
        ctx.font = "50px Arial";
        ctx.fillText("Draw", 400, 300);
    }
}

function drawBackground(){
    ctx.fillStyle = "#28282B";
    ctx.fillRect(0, 0, gameScreen.clientWidth, gameScreen.height);
}

function gameLoop() {
    if(p1Alive && p2Alive){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        drawBackground();
        collisionDetect();
        deltaPlayer();
        bulletHander();
        drawPlayers(p1Pos, p2Pos);
        drawGUI();
        requestAnimationFrame(gameLoop);
    }
    else{
        goToEndScreen();
    }
}

init();
InitTank();
window.onload = setInterval(reload_tank, 1000);
function GameLoopTank() {
    if(STOP) return;
    ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
    drawBackground();
    collisionDetect_tank();
    deltaPlayer_tank();
    bulletHander_tank();
    drawPlayers_tank(p1Pos, p2Pos);
    drawGUI_tank();
}
