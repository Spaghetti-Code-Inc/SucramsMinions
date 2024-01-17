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
    p1jumpPower = -3;	
    p1deltaY = 0;
    //speed and base speed must equal each other at first
    p1Speed = 18;
    p1BaseSpeed = 18;
    p1Coins = 0;

    //player 2 vars
    p2PosX = 200;
    p2PosY = 500;
    p2width = 50;
    p2Color = 'green';
    p2leftPressed = false;
    p2rightPressed = false;
    //jump vars
    p2jumpPressed = false;
    p2jumping = false;
    p2jumpVelocity = 0;
    p2jumpPower = -3;	
    p2deltaY = 0;

    p2Speed = 18;
    p2BaseSpeed = 18;
    p2Coins = 0;

    //scene vars
    floorY = 550;
    //world physics vars
    drag = 0.2;
    acceleration = 0.02;
    jumpPower = -6;						//variable to set jump power for player
    gravityConstant = 0.2;				//variable to set gravity force
    gravityPower = 10;					//variable to set gravity power

    coins = [];

    generateCoins();

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
	if (p1jumpPressed&& !p1jumping) {
		p1jumping = true;
		p1jumpVelocity = p1jumpPower;
	}
	if (p1jumping) {
        console.log("p1jump");
		p1deltaY = p1jumpVelocity;
        if(p1deltaY > 10 && p1PosY > 490){
            console.log("p1landed");
            p1jumping = false;
            p1jumpPressed = false;
            p1jumpVelocity = 0;
            p1jumpPower = -3;	
            p1deltaY = 0;
            generateCoins();
        }
        else{
            p1PosY += p1deltaY - 10;
        }
	}

    if (p2jumpPressed && !p2jumping) {
		p2jumping = true;
		p2jumpVelocity = p2jumpPower;
	}
	if (p2jumping) {
        console.log("p2jump");
		p2deltaY = p2jumpVelocity;
        if(p2deltaY > 10 && p2PosY > 490){
            console.log("p2landed");
            p2jumping = false;
            p2jumpPressed = false;
            p2jumpVelocity = 0;
            p2jumpPower = -3;	
            p2deltaY = 0;
            generateCoins();
        }
        else{
            p2PosY += p2deltaY - 10;
        }
	}

}

function doGravity() {
	
	if (p1jumping == true) {
		p1jumpVelocity+= gravityConstant;

	}
	else {
		gravityPower = gravityPower + gravityConstant;
		if (p1PosY == 500+p1width) {
			gravityPower = 0;
		}
		else if(p1PosY<=350){
			p1PosY += gravityPower;
		}
	}

    if (p2jumping == true) {
		p2jumpVelocity+= gravityConstant;

	}
	else {
		gravityPower = gravityPower + gravityConstant;
		if (p2PosY == 500+p2width) {
			gravityPower = 0;
		}
		else if(p2PosY<=350){
			p2PosY += gravityPower;
		}
	}
}


function drawCoin(coinX, coinY){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(Number(coinX), Number(coinY), 10, 0, 360);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    
}

function generateCoins() {
    
    coins[0] = [];
    coins[0][0] = Math.random()*(gameScreen.width - 20)+20;
    coins[0][1] = (Math.random()*(gameScreen.height-80 - 100)) + 100;
    
}


function drawPlayer (posX, posY, width, color) {
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, width, width);
}

function drawBackground() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 550, 1200, 50)
    ctx.font = "20px Arial";
    ctx.fillText("Green: " + p2Coins, 10, 50);
    ctx.fillText("Red: " + p1Coins, 900, 50);
}

function checkCoinCollision() {
    if((p1PosX>coins[0][0] - 10 && p1PosX < coins[0][0] + 30) || (p1PosX+p1width>coins[0][0]- 10 && p1PosX + p1width < coins[0][0] + 30)){
        if((p1PosY>coins[0][1]- 10 && p1PosY < coins[0][1] + 30) || (p1PosY+p1width>coins[0][1] - 10&& p1PosY + p1width < coins[0][1] + 30)){
            generateCoins();
            p1Coins++;
        }
    }
    if((p2PosX>coins[0][0] - 10 && p2PosX < coins[0][0] + 30) || (p2PosX+p2width>coins[0][0]- 10 && p2PosX + p2width < coins[0][0] + 30)){
        if((p2PosY>coins[0][1]- 10 && p2PosY < coins[0][1] + 30) || (p2PosY+p2width>coins[0][1] - 10&& p2PosY + p2width < coins[0][1] + 30)){
            generateCoins();
            p2Coins++;
        }
    }
}


function gameLoop() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    drawBackground();
    updatePlayerPos();
    checkCoinCollision();
    checkJump();
    doGravity();
    drawCoin(coins[0][0], coins[0][1]);
    drawPlayer(p1PosX, p1PosY, p1width, p1Color);
    drawPlayer(p2PosX, p2PosY, p2width, p2Color);
    requestAnimationFrame(gameLoop);
}


init();