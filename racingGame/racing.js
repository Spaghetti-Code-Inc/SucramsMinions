var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');

const TO_RADIANS = Math.PI / 180;
const TO_DEGREES = 180 / Math.PI;
function init() {
    //pos and orientation vars
    p1Pos = [800, 300];
    p2Pos = [200, 300];
    p1Angle = 180;
    p2Angle = 0;
    //movement vars
    p1rightPressed = false;
    p1leftPressed = false;
    p1upPressed = false;
    p1downPressed = false;
    p1CanGo = [true, true];          //variable for if space in front and behind is clear    [front clear, back clear]
    p1TimePressed = 0;          //variable for rotation acceleration to increase aim potential
    p1drift = false;
    p1Speed = 0;

    p2rightPressed = false;
    p2leftPressed = false;
    p2upPressed = false;
    p2downPressed = false;
    p2CanGo = [true, true];         //variable for if space in front and behind is clear    [front clear, back clear]
    p2TimePressed = 0;
    p2drift = false;
    p2Speed = 0;
    //setting vars
    rotateSpeed = 3;
    movementSpeed = 8;
    


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

     //drifting
     if(e.key =="m"){
        p1DriftAngle = p1Angle;
        p1drift = true;
     }
     if(e.key =="v"){
        p2drift = true;
     }
}//end of function keyDownHandler()

//function to respond to when the arrow keys are up
function keyUpHandler(e){		//handles all keys when unpressed
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

     //drifting
     if(e.key =="m"){
        p1drift = false;
        p1Speed *=0.2;
     }
     if(e.key =="v"){
        p2drift = false;
     }
}//end of function keyUpHandler()

function drawPlayers(p1Position, p2Position) {

    //move canvas to match player one rotation, draw, then revert
    ctx.translate(p1Position[0] + Math.cos(p1Angle*TO_RADIANS), p1Position[1] - Math.sin(p1Angle*TO_RADIANS));
    ctx.rotate(p1Angle * TO_RADIANS);

    ctx.fillStyle = 'red';
    ctx.fillRect(-20, -15, 40, 30);
    ctx.fillRect(20, -10, 30, 20);
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 360);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    
    //wheels
    ctx.fillStyle = 'black';
    ctx.fillRect(30, -15, 15, 5);
    ctx.fillRect(30, 10, 15, 5);
    ctx.fillRect(-15, -20, 15, 5);
    ctx.fillRect(-15, 15, 15, 5);

    ctx.rotate(-p1Angle * TO_RADIANS);
    ctx.translate(-p1Position[0] - Math.cos(p1Angle*TO_RADIANS), -p1Position[1] + Math.sin(p1Angle*TO_RADIANS));

    //move canvas to match player two rotation, draw, then revert
    ctx.translate(p2Position[0] + Math.cos(p2Angle*TO_RADIANS), p2Position[1] - Math.sin(p2Angle*TO_RADIANS));
    ctx.rotate(p2Angle * TO_RADIANS);

    ctx.fillStyle = 'green';
    ctx.fillRect(-20, -15, 40, 30);
    ctx.fillRect(20, -10, 30, 20);
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 360);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.fillRect(30, -15, 15, 5);
    ctx.fillRect(30, 10, 15, 5);
    ctx.fillRect(-15, -20, 15, 5);
    ctx.fillRect(-15, 15, 15, 5);

    ctx.rotate(-p2Angle * TO_RADIANS);
    ctx.translate(-p2Position[0] - Math.cos(p2Angle*TO_RADIANS), -p2Position[1] + Math.sin(p2Angle*TO_RADIANS));
}
function deltaPlayer(){
    if((p1CanGo[0] && p1Speed > 0) || (p1CanGo[1] && p1Speed < 0)){
        if(!p1drift){
            p1Pos[0]+= (Math.cos(p1Angle*TO_RADIANS)*p1Speed);
            p1Pos[1]+= (Math.sin(p1Angle*TO_RADIANS)*p1Speed);
        }
        else{
            p1Pos[0]+= (Math.cos(p1DriftAngle*TO_RADIANS)*p1Speed);
            p1Pos[1]+= (Math.sin(p1DriftAngle*TO_RADIANS)*p1Speed);
            
        }
        
    }
    
    if((p2CanGo[0] && p2Speed > 0) || (p2CanGo[1] && p2Speed < 0)){
        p2Pos[0]+= (Math.cos(p2Angle*TO_RADIANS)*p2Speed);
        p2Pos[1]+= (Math.sin(p2Angle*TO_RADIANS)*p2Speed);
    }

    if(p1upPressed && p1CanGo[0]){
        if(p1Speed < movementSpeed){
            p1Speed += 0.2;
        }
    }
    if(p1downPressed && p1CanGo[1]){
        if(p1Speed > -movementSpeed){
            p1Speed -= 0.2;
        }
    }
    if(p1rightPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.2;
        }
        p1Angle+=rotateSpeed*p1TimePressed;
    }
    if(p1leftPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.2;
        }
        p1Angle-=rotateSpeed*p1TimePressed;
    }
    if(p2upPressed && p2CanGo[0]){
        if(p2Speed < movementSpeed){
            p2Speed += 0.2;
        }
    }
    if(p2downPressed && p2CanGo[1]){
        if(p2Speed > -movementSpeed){
            p2Speed -= 0.2;
        }
    }
    if(p2rightPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.2;
        }
        p2Angle+=rotateSpeed*p2TimePressed;
    }
    if(p2leftPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.2;
        }
        p2Angle-=rotateSpeed*p2TimePressed;
    }

    if(!p1upPressed && !p1downPressed){
        if(p1Speed > 0.5 && p1Speed != 0){
            p1Speed -= 0.2;
        }
        else if(p1Speed < -0.5 && p1Speed != 0){
            p1Speed+=0.2;
        }
        else{
            p1Speed = 0;
        }
    }
    if(!p2upPressed && !p2downPressed){
        if(p2Speed > 0.5 && p2Speed != 0){
            p2Speed -= 0.2;
        }
        else if(p2Speed < -0.5 && p2Speed != 0){
            p2Speed+=0.2;
        }
        else{
            p2Speed = 0;
        }
    }
    if(p1drift){
        rotateSpeed = 2;
    }
    else{
        rotateSpeed = 3;
    }
}



function collisionDetect(){
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

}

function drawGUI(){
    ctx.font = "20px Arial";
    
    
}



function gameLoop() {
    
    ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
    collisionDetect();
    deltaPlayer();
    drawPlayers(p1Pos, p2Pos);
    drawGUI();
    requestAnimationFrame(gameLoop);
    
}

init();

