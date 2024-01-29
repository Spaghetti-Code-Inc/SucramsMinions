var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');


function init() {
    //Player 1 vars
    p1PosX = 500;
    p1PosY = 500;
    p1width = 50;
    p1Color = 'red';
    p1Sprite = new Image(p1width, p1width);
    p1Sprite.src = 'Assets\\redGuy2.png';
    p1leftPressed = false;
    p1rightPressed = false;
    //jump vars
    p1jumpPressed = false;
    p1jumping = false;
    p1jumpVelocity = 0;
    p1jumpPower = -3;	
    p1deltaY = 0;
    //speed and base speed must equal each other at first
    p1Velocity = 0;
    p1TopSpeed = 18;
    p1Coins = 0;

    //player 2 vars
    p2PosX = 200;
    p2PosY = 500;
    p2width = 50;
    p2Color = 'green';
    p2Sprite = new Image(p2width, p2width);
    p2Sprite.src = 'Assets\\greenGuy2.png';
    p2leftPressed = false;
    p2rightPressed = false;
    //jump vars
    p2jumpPressed = false;
    p2jumping = false;
    p2jumpVelocity = 0;
    p2jumpPower = -3;	
    p2deltaY = 0;

    p2Velocity = 0;
    p2TopSpeed = 18;
    p2Coins = 0;

    //scene vars
    floorY = 550;
    background = new Image(p1width, p1width);
    background.src = 'Assets\\monalisa.jpg';
    //world physics vars
    drag = 0.2;
    acceleration = 0.08;
    jumpPower = -6;						//variable to set jump power for player
    gravityConstant = 0.2;				//variable to set gravity force
    gravityPower = 10;					//variable to set gravity power
    particleAccelerator = false;

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
    //covers right movement
    if(p1rightPressed && !p1leftPressed){
        //sets p1 current velocty to non-zero number to later multiply by acceleration factor
        if(p1Velocity < 1.5 && p1Velocity > -1.5){
            p1Velocity = 1.5;
        }
        //accelerates cube
        else if (p1Velocity < p1TopSpeed){
            if(p1Velocity > 0){
                p1Velocity *= 1+acceleration;
            }
            else{
                p1Velocity*= 1-acceleration;
            }
        }
        //ensures speed cap is maintained
        if (p1Velocity > p1TopSpeed){
            p1Velocity = p1TopSpeed;
        }
    }

    //adds velocity if ensured player wont move off screen
    if(p1PosX + p1width < gameScreen.width && p1Velocity > 0){
        //sets player one position to edge if adding the velocity would have moved it over the border, bounce
        if(gameScreen.width - p1width < p1PosX + p1Velocity){
            p1PosX = gameScreen.width - p1width;
            p1Velocity *= -1;
        }
        else{
            p1PosX += p1Velocity;
        }
    }

    //covers left movement
    if(!p1rightPressed && p1leftPressed){
        //sets p1 current velocty to non-zero number to later multiply by acceleration factor
        if(p1Velocity < 1.5 && p1Velocity > -1.5){
            p1Velocity = -1.5;
        }
        //accelerates cube
        else if (p1Velocity > p1TopSpeed * -1){
            if(p1Velocity < 0){
                p1Velocity *= 1+acceleration;
            }
            else {
                p1Velocity *= 1-acceleration;
            }
        } 
    }
    //adds velocity if ensured player wont move off screen
    if(p1PosX > 0 && p1Velocity < 0){
        //sets player one position to edge if adding the velocity would have moved it over the border
        if(0 > p1PosX + p1Velocity){
            p1PosX = 0;
            p1Velocity = p1Velocity * -1;
        }
        else{
            p1PosX += p1Velocity;
        }
        
    }

    //ensures speed cap is maintained
    if (p1Velocity > p1TopSpeed){
        p1Velocity = p1TopSpeed;
    }
    if (p1Velocity < p1TopSpeed * -1){
        p1Velocity = p1TopSpeed * -1;
    }

    //make player stop if nothing is pressed
    if(!p1rightPressed && !p1leftPressed){
        if(Math.abs(p1Velocity) > 0.2){
            p1Velocity *= 1-acceleration;
        }
        else{
            p1Velocity = 0;
        }
        
    }

    
    ///player two movement
    //covers right movement
    if(p2rightPressed && !p2leftPressed){
        //sets p1 current velocty to non-zero number to later multiply by acceleration factor
        if(p2Velocity < 1.5 && p2Velocity > -1.5){
            p2Velocity = 1.5;
        }
        //accelerates cube
        else if (p2Velocity < p2TopSpeed){
            if(p2Velocity > 0){
                p2Velocity *= 1+acceleration;
            }
            else{
                p2Velocity*= 1-acceleration;
            }
        }
        //ensures speed cap is maintained
        if (p2Velocity > p2TopSpeed){
            p2Velocity = p2TopSpeed;
        }
    }

    //adds velocity if ensured player wont move off screen
    if(p2PosX + p2width < gameScreen.width && p2Velocity > 0){
        //sets player one position to edge if adding the velocity would have moved it over the border, bounce
        if(gameScreen.width - p2width < p2PosX + p2Velocity){
            p2PosX = gameScreen.width - p2width;
            p2Velocity *= -1;
        }
        else{
            p2PosX += p2Velocity;
        }
    }

    //covers left movement
    if(!p2rightPressed && p2leftPressed){
        //sets p1 current velocty to non-zero number to later multiply by acceleration factor
        if(p2Velocity < 1.5 && p2Velocity > -1.5){
            p2Velocity = -1.5;
        }
        //accelerates cube
        else if (p2Velocity > p2TopSpeed * -1){
            if(p2Velocity < 0){
                p2Velocity *= 1+acceleration;
            }
            else {
                p2Velocity *= 1-acceleration;
            }
        } 
    }
    //adds velocity if ensured player wont move off screen
    if(p2PosX > 0 && p2Velocity < 0){
        //sets player one position to edge if adding the velocity would have moved it over the border
        if(0 > p2PosX + p2Velocity){
            p2PosX = 0;
            p2Velocity = p2Velocity * -1;
        }
        else{
            p2PosX += p2Velocity;
        }
        
    }

    //ensures speed cap is maintained
    if (p2Velocity > p2TopSpeed){
        p2Velocity = p2TopSpeed;
    }
    if (p2Velocity < p2TopSpeed * -1){
        p2Velocity = p2TopSpeed * -1;
    }

    //make player stop if nothing is pressed
    if(!p2rightPressed && !p2leftPressed){
        if(Math.abs(p2Velocity) > 0.2){
            p2Velocity *= 1-acceleration;
        }
        else{
            p2Velocity = 0;
        }
        
    }
    checkCoinCollision();
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
            //generateCoins();
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
    ctx.strokeRect(Number(coinX), Number(coinY), 30, 30);
    ctx.fillStyle = "yellow";
    ctx.fillRect(Number(coinX), Number(coinY), 30, 30);
    
    
}

function generateCoins() {
    
    coins[0] = [];
    coins[0][0] = Math.random()*(gameScreen.width - 40);
    coins[0][1] = Math.random()*(gameScreen.height-80 - 100) + 70;
    
}


function drawPlayer (posX, posY, width, color) {
    if(color == 'red'){
        ctx.drawImage(p1Sprite, posX, posY, width, width);
    }
    if(color == 'green'){
        ctx.drawImage(p2Sprite, posX, posY, width, width);
    }
    
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, gameScreen.width, gameScreen.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 550, 1200, 50)
    ctx.font = "20px Arial";wd
    ctx.fillText("Green: " + p2Coins, 10, 50);
    ctx.fillText("Red: " + p1Coins, 900, 50);
}

function checkCoinCollision() {
    if((p1PosX > coins[0][0] && p1PosX < coins[0][0] + 30) || (p1PosX + p1width > coins[0][0] && p1PosX + p1width < coins[0][0] + 30)){
        if((p1PosY > coins[0][1] && p1PosY < coins[0][1] + 30) || (p1PosY + p1width > coins[0][1] && p1PosY + p1width < coins[0][1] + 30)){
            generateCoins();
            p1Coins++;
        }
    }
    if((p2PosX > coins[0][0] && p2PosX < coins[0][0] + 30) || (p2PosX + p2width > coins[0][0] && p2PosX + p2width < coins[0][0] + 30)){
        if((p2PosY >  coins[0][1] && p2PosY < coins[0][1] + 30) || (p2PosY + p2width > coins[0][1] && p2PosY + p2width < coins[0][1] + 30)){
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