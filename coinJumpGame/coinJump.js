var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');


function init() {
    //Player 1 vars
    p1PosX = 500;
    p1PosY = 500;
    p1width = 50;
    p1Color = 'red';
    p1leftPressed = false;
    p1rightPressed = false;
    //jump vars
    p1jumpPressed = false;
    p1jumping = false;
    p1jumpVelocity = 0;
    p1jumpPower = -6;	
    p1deltaY = 0;
    //speed and base speed must equal each other at first
    p1Speed = 15;
    p1BaseSpeed = 15;

    //player 2 vars
    p2PosX = 200;
    p2PosY = 500;
    p2width = 50;
    p2Color = 'green';
    p2leftPressed = false;
    p2rightPressed = false;
    p2jumpPressed = false;
    p2jumping = false;
    p2Speed = 15;
    p2BaseSpeed = 15
    //scene vars
    floorY = 550;
    //world physics vars
    drag = 0.2;
    acceleration = 0.02;
    jumpPower = -6;						//variable to set jump power for player
    gravityConstant = 0.2;				//variable to set gravity force
    gravityPower = 10;					//variable to set gravity power

    
    gameLoop();
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//function for when user presses down key
function keyDownHandler(e){		//handles all keys when pressed down
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
       p1jumpPressed = true;
	}//end of else if stm

	if (e.key =="w") {
        p2jumpPressed = true;
    }
}//end of function keyDownHandler()

//function to respond to when the arrow keys are up
function keyUpHandler(e){		//handles all keys when unpressed
	if(e.key == "ArrowRight"){
		p1rightPressed = false;
	}//end of if stm
    else if(e.key == "ArrowLeft"){
            p1leftPressed = false;
    }//end of else if stm

    if(e.key == "d"){
		p2rightPressed = false;
	}//end of if stm
    else if(e.key == "a"){
        p2leftPressed = false;
    }//end of else if stm
	
	
	if (e.key == "ArrowUp") {
       p1jumpPressed = false;
	}//end of else if stm

	if (e.key =="w") {
        p2jumpPressed = false;
    }
}//end of function keyUpHandler()


function updatePlayerPos () {
    //player one movement

    //horizontal movement
    if(p1rightPressed && !p1leftPressed){
        if(p1PosX > gameScreen.width - p1width - 3){
            p1Speed = p1BaseSpeed;
        }
        else if(p1Speed < p1BaseSpeed * 2){
            p1Speed *= (1+acceleration);
        }
    }
    if(p1leftPressed && !p1rightPressed){
        if(p1PosX < 3){
            p1Speed = p1BaseSpeed;
        }
        else if(p1Speed > 0){
            p1Speed *= (1-acceleration);
        }
    }
    if(p1Speed < p1BaseSpeed && p1PosX < 1){
        p1Speed = p1BaseSpeed;
    }
    if(p1Speed > p1BaseSpeed && p1PosX > gameScreen.width - p1width - 1){
        p1Speed = p1BaseSpeed;
    }
    else{
        p1PosX+= (p1Speed - p1BaseSpeed);
    }
    if(!p1leftPressed && !p1rightPressed && p1Speed>p1BaseSpeed+0.3){
        p1Speed-=drag;
    }
    if(!p1leftPressed && !p1rightPressed && p1Speed<p1BaseSpeed-0.3){
        p1Speed+=drag;
    }
    if(!p1leftPressed && !p1rightPressed && p1Speed <= (p1BaseSpeed+0.3) && p1Speed >= (p1BaseSpeed-0.3)){
        p1Speed = p1BaseSpeed;
    }
    //player two movement

    //horizontal movement
    if(p2rightPressed && !p2leftPressed){
        if(p2PosX > gameScreen.width - p2width - 3){
            p2Speed = p2BaseSpeed;
        }
        else if(p2Speed < p2BaseSpeed * 2){
            p2Speed *= (1+acceleration);
        }
    }
    if(p2leftPressed && !p2rightPressed){
        if(p2PosX < 3){
            p2Speed = p2BaseSpeed;
        }
        else if(p2Speed > 0){
            p2Speed *= (1-acceleration);
        }
    }
    if(p2Speed < p2BaseSpeed && p2PosX < 1){
        p2Speed = p2BaseSpeed;
    }
    if(p2Speed > p2BaseSpeed && p2PosX > gameScreen.width - p2width - 1){
        p2Speed = p2BaseSpeed;
    }
    else{
        p2PosX+= (p2Speed - p2BaseSpeed);
    }
    if(!p2leftPressed && !p2rightPressed && p2Speed>p2BaseSpeed+0.3){
        p2Speed-=drag;
    }
    if(!p2leftPressed && !p2rightPressed && p2Speed<p2BaseSpeed-0.3){
        p2Speed+=drag;
    }
    if(!p2leftPressed && !p2rightPressed && p2Speed <= (p2BaseSpeed+0.3) && p2Speed >= (p2BaseSpeed-0.3)){
        p2Speed = p2BaseSpeed;
    }
    
}

function checkJump() {
	if (p1jumpPressed == true && p1jumping == false) {
		p1jumpingTrue = true;
		jumpVelocity = jumpPower;
	}
	if (jumpingTrue == true) {
		p1deltaY = p1jumpVelocity;
		p1PosY += p1deltaY;

	}

    if (p2jumpPressed == true && p2jumping == false) {
		p2jumpingTrue = true;
		p2jumpVelocity = jumpPower;
	}
	if (jumpingTrue == true) {
		p2deltaY = jumpVelocity;
		p2PosYY += p2deltaY;
    }
}

function doGravity() {
	
	if (p1jumping == true) {
		p1jumpVelocity+= gravityConstant;

	}
	else {
		gravityPower = gravityPower + gravityConstant;
		if (userY == 500+p1width) {
			gravityPower = 0;
		}
		else if(p1PosYY<=350){
			userY = userY + gravityPower;
		}
	}
}



function drawPlayer (posX, posY, width, color) {
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, width, width);
}

function drawBackground() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 550, 1200, 50)
}



function gameLoop() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    drawBackground();
    updatePlayerPos();

    drawPlayer(p1PosX, p1PosY, p1width, p1Color);
    drawPlayer(p2PosX, p2PosY, p2width, p2Color);
    requestAnimationFrame(gameLoop);
}

init();