
function InitRace() {
    //pos and orientation vars
    p1Pos = [240, 650];
    p2Pos = [240, 590];
    p1Angle = 0;
    p2Angle = 0;
    //movement vars
    p1rightPressed = false;
    p1leftPressed = false;
    p1upPressed = false;
    p1downPressed = false;
    p1CanGo = [true, true];          //variable for if space in front and behind is clear    [front clear, back clear]
    p1TimePressed = 0;          //variable for rotation acceleration to increase aim potential
    p1drift = false;
    p1InDrift = false;
    p1Speed = 0;
    p1Alive = true;
    

    p2rightPressed = false;
    p2leftPressed = false;
    p2upPressed = false;
    p2downPressed = false;
    p2CanGo = [true, true];         //variable for if space in front and behind is clear    [front clear, back clear]
    p2TimePressed = 0;
    p2drift = false;
    p2InDrift = false
    p2Speed = 0;
    p2Alive = true;

    //other vars
    explosion = new Image(500, 292);
    explosion.src = 'Assets\\explosionSpriteSheet.png';

    //setting vars
    p1rotateSpeed = 1;
    p1movementSpeed = 8;
    p2rotateSpeed = 1;
    p2movementSpeed = 8;
    collumn1 = 0;
    row1 = 0;
    display1 = true;
    collumn2 = 0;
    row2 = 0;
    display2 = true;
    lightColors = ["white", "white", "white"];

    lapTrackerVar = [[0, 0, 0, 0],[0, 0, 0, 0]];       //[[player 1], [player 2]]      [player 1] = [laps, times crossed checker flag, times passed point 1, times passed point 2]
    numLaps = 2;

    STOP = false;
    potato = true;

    startRace();
    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//function for when user presses down key
function keyDownHandler_race(e){		//handles all keys when pressed down
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
        p1InDrift = true;
        
     }
     if(e.key =="v"){
        p2drift = true;
     }
}//end of function keyDownHandler()

//function to respond to when the arrow keys are up
function keyUpHandler_race(e){		//handles all keys when unpressed
	if(e.key == "ArrowRight"){
		p1rightPressed = false;
        p1TimePressed = 0;
        if(!p1drift){
            p1InDrift = false;
            
        }
	}//end of if stm
    else if(e.key == "ArrowLeft"){
        p1leftPressed = false;
        p1TimePressed = 0;
        if(!p1drift){
            p1InDrift = false;
            
        }
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
        
        
     }
     if(e.key =="v"){
        p2drift = false;
     }
}//end of function keyUpHandler()

function drawPlayers(p1Position, p2Position) {

    if(potato){
        //explosion image is 500 pixels wide, times 5 frames; 292 pixels height, times 3 frames

        if(p1Alive){
            //wmove canvas to match player one rotation, draw, then revert
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
        }
        else{
            if(display1){
                ctx.drawImage(explosion, 100*collumn1, 96*row1, 100, 98, p1Position[0] - 50, p1Position[1] - 50, 100, 100);
            }
            if(collumn1 < 4){
                collumn1++;
            }
            else{
                collumn1 = 0;
                if(row1 < 2){
                    row1++;
                }
            }
            if(collumn1 == 4 && row1 == 2){
                display1 = false;
                potato = false;
                sleep(500);
                gameOver();
            }
        }
        
        if(p2Alive && potato){
            //move canvas to match player two rotation, draw, then revert
            console.log("draw green");
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
        else if (potato){
            if(display2){
                ctx.drawImage(explosion, 100*collumn2, 96*row2, 100, 98, p2Position[0] - 50, p2Position[1] - 50, 100, 100);
            }
            if(collumn2 < 4){
                collumn2++;
            }
            else{
                collumn2 = 0;
                if(row2 < 2){
                    row2++;
                }
            }
            if(collumn2 == 4 && row2 == 2){
                display2 = false;
                potato = false;
                sleep(500);
                gameOver();
            }
        
        }
    }
}
function deltaPlayer(){
    
    if((p1CanGo[0] && p1Speed > 0) || (p1CanGo[1] && p1Speed < 0)){
        if(!p1InDrift){
            p1Pos[0]+= (Math.cos(p1Angle*TO_RADIANS)*p1Speed);
            p1Pos[1]+= (Math.sin(p1Angle*TO_RADIANS)*p1Speed);
        }
        else{
            p1Pos[0]+= (Math.cos(p1DriftAngle*TO_RADIANS)*p1Speed);
            p1Pos[1]+= (Math.sin(p1DriftAngle*TO_RADIANS)*p1Speed);
            p1DriftAngle = (p1DriftAngle*0.85) + (p1Angle*0.15);
        }
        
    }
    
    if((p2CanGo[0] && p2Speed > 0) || (p2CanGo[1] && p2Speed < 0)){
        if(!p2InDrift){
            p2Pos[0]+= (Math.cos(p2Angle*TO_RADIANS)*p2Speed);
            p2Pos[1]+= (Math.sin(p2Angle*TO_RADIANS)*p2Speed);
        }
        else{
            p2Pos[0]+= (Math.cos(p2DriftAngle*TO_RADIANS)*p2Speed);
            p2Pos[1]+= (Math.sin(p2DriftAngle*TO_RADIANS)*p2Speed);
            p2DriftAngle = (p2DriftAngle*0.85) + (p2Angle*0.15);
        }
        
    }

    if(p1upPressed && p1CanGo[0]){
        if(p1Speed < p1movementSpeed){
            p1Speed += 0.2;
        }
    }
    if(p1downPressed && p1CanGo[1]){
        if(p1Speed > -(p1movementSpeed/2)){
            p1Speed -= 0.2;
        }
    }
    if(p1rightPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.05;
        }
        p1Angle+=p1rotateSpeed*p1TimePressed;
    }
    if(p1leftPressed){
        if(p1TimePressed < 2){
            p1TimePressed+=0.05;
        }
        p1Angle-=p1rotateSpeed*p1TimePressed;
    }
    if(p2upPressed && p2CanGo[0]){
        if(p2Speed < p2movementSpeed){
            p2Speed += 0.2;
        }
    }
    if(p2downPressed && p2CanGo[1]){
        if(p2Speed > -(p2movementSpeed/2)){
            p2Speed -= 0.2;
        }
    }
    if(p2rightPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.05;
        }
        p2Angle+=p2rotateSpeed*p2TimePressed;
    }
    if(p2leftPressed){
        if(p2TimePressed < 2){
            p2TimePressed+=0.05;
        }
        p2Angle-=p2rotateSpeed*p2TimePressed;
    }

    if(!p1upPressed && !p1downPressed){
        if(p1Speed > 0.3 && p1Speed != 0){
            p1Speed -= 0.05;
        }
        else if(p1Speed < -0.3 && p1Speed != 0){
            p1Speed+=0.05;
        }
        else{
            p1Speed = 0;
        }
    }
    if(!p2upPressed && !p2downPressed){
        if(p2Speed > 0.3 && p2Speed != 0){
            p2Speed -= 0.05;
        }
        else if(p2Speed < -0.3 && p2Speed != 0){
            p2Speed+=0.05;
        }
        else{
            p2Speed = 0;
        }
    }
    if(p1drift){
        p1rotateSpeed = 2.5;
    }
    else{
        p1rotateSpeed = 1;
    }
    if(p2drift){
        p2rotateSpeed = 2.5;
    }
    else{
        p2rotateSpeed = 1;
    }
}

function drawTrack(){
    //about to be some very laborious code
    //main grass color
    ctx.fillStyle = '#96be25';
    ctx.fillRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);

    //road layout ahhh
    ctx.fillStyle = '#8a9395';
    ctx.fillRect(30, 540, 1300, 180);
    ctx.fillRect(1200, 40, 180, 600);
    ctx.fillRect(900, 30, 300, 180);
    ctx.fillRect(850, 40, 180, 400);
    ctx.fillRect(450, 300, 500, 180);
    ctx.fillRect(20, 40, 200, 500);
    ctx.fillRect(30, 30, 380, 180);
    ctx.fillRect(300, 50, 200, 400);
    ctx.fillRect(220, 490, 50, 50);
    ctx.fillRect(1150, 490, 50, 50);
    ctx.fillRect(800, 260, 50, 50);
    ctx.fillRect(500, 260, 50, 50);
    for(i = 0; i < 44; i+=2){
        ctx.fillStyle = "red";
        ctx.fillRect(270 + i*20, 520, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(290 + i*20, 520, 20, 20);
    }
    for(i = 0; i < 24; i+=2){
        ctx.fillStyle = "red";
        ctx.fillRect(470 + i*20, 480, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(490 + i*20, 480, 20, 20);
    }
    for(i = 0; i < 12; i+=2){
        ctx.fillStyle = "red";
        ctx.fillRect(280, 210 + i*20, 20, 20);
        ctx.fillRect(200, 210 + i*20, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(280, 230 + i*20, 20, 20);
        ctx.fillRect(200, 230 + i*20, 20, 20);
    }
    for(i = 0; i < 12; i+=2){
        ctx.fillStyle = "red";
        ctx.fillRect(1030, 210 + i*20, 20, 20);
        ctx.fillRect(1190, 210 + i*20, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(1030, 230 + i*20, 20, 20);
        ctx.fillRect(1190, 230 + i*20, 20, 20);
    }
    for(i=0; i<8; i+=2){
        ctx.fillStyle = "white";
        ctx.fillRect(1050 + i*20, 210, 20, 20);
        ctx.fillStyle = "red";
        ctx.fillRect(1070 + i*20, 210, 20, 20);
        
    }
    for(i=0; i<8; i+=2){
        ctx.fillStyle = "red";
        ctx.fillRect(280 + i*20, 450, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(300 + i*20, 450, 20, 20);
        
    }
    ctx.fillStyle = "white";
    ctx.fillRect(260, 495, 20, 30);
    ctx.fillRect(220, 210, 20, 20);
    ctx.fillRect(260, 210, 20, 20);
    ctx.fillRect(1190, 470, 20, 20);
    ctx.fillRect(1150, 485, 20, 20);
    ctx.fillRect(950, 440, 20, 20);
    ctx.fillRect(990, 440, 20, 20);
    ctx.fillRect(450, 465, 20, 20);
    ctx.fillRect(220, 470, 20, 20);
    ctx.fillStyle = "red";
    ctx.fillRect(240, 210, 20, 20);
    ctx.fillRect(1140, 500, 20, 20);
    ctx.fillRect(1190, 450, 20, 20);
    ctx.fillRect(1170, 475, 20, 20);
    ctx.fillRect(1010, 435, 20, 20);
    ctx.fillRect(970, 440, 20, 20);
    ctx.fillRect(942, 460, 20, 20);
    ctx.fillRect(440, 450, 20, 20);
    ctx.fillRect(210, 450, 20, 20);
    ctx.fillRect(240, 490, 30, 20);
    
    for(i = 0; i < 10; i++){
        ctx.fillStyle = "black";
        ctx.fillRect(300, 540 + i*40, 20, 20);
        ctx.fillRect(320, 560 + i*40, 20, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(300, 560 + i*40, 20, 20);
        ctx.fillRect(320, 540 + i*40, 20, 20);
    }

}


function collisionDetect(){
    //player 1 border, so tank doesn't go off screen; forwards direction
    
    nextPosF1 = [p1Pos[0] + Math.cos(p1Angle*TO_RADIANS)*p1movementSpeed, p1Pos[1] + Math.sin(p1Angle*TO_RADIANS)*p1movementSpeed];
    //Use two squares? ahhhh prolly doesnt matter anyway
    
    if(nextPosF1[0] + (20+Math.cos(p1Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosF1[0] - (20-Math.cos(p1Angle*TO_RADIANS)) < 0 || nextPosF1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosF1[1] - (20-Math.sin(p1Angle*TO_RADIANS)) < 0){
        p1CanGo[0] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosF1[0] + (20+Math.cos(p1Angle*TO_RADIANS)) > 280 && nextPosF1[0] - (20-Math.cos(p1Angle*TO_RADIANS)) < 1130 && nextPosF1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 475 && nextPosF1[1] - (20-Math.sin(p1Angle*TO_RADIANS)) < 520){
        p1CanGo[0] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosF1[0] + (20+Math.cos(p1Angle*TO_RADIANS)) > 1040 && nextPosF1[0] - (20-Math.cos(p1Angle*TO_RADIANS)) < 1190 && nextPosF1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 220 && nextPosF1[1] - (20-Math.sin(p1Angle*TO_RADIANS)) < 470){
        p1CanGo[0] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosF1[0] + (20+Math.cos(p1Angle*TO_RADIANS)) > 220 && nextPosF1[0] - (20-Math.cos(p1Angle*TO_RADIANS)) < 270 && nextPosF1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 230 && nextPosF1[1] - (20-Math.sin(p1Angle*TO_RADIANS)) < 465){
        p1CanGo[0] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    //slowdown
    else if(nextPosF1[0] + (20+Math.cos(p1Angle*TO_RADIANS)) > 500 && nextPosF1[0] - (20-Math.cos(p1Angle*TO_RADIANS)) < 830 && nextPosF1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 0 && nextPosF1[1] - (20-Math.sin(p1Angle*TO_RADIANS)) < 260){
        if(p1Speed > 4){
            p1Speed -= 0.5;
        }
    }
    else{
        p1CanGo[0] = true;
    }
    //backwards player 1
    nextPosB1 = [p1Pos[0] - Math.cos(p1Angle*TO_RADIANS)*p1movementSpeed, p1Pos[1] - Math.sin(p1Angle*TO_RADIANS)*p1movementSpeed];
    if(nextPosB1[0] + (17+Math.cos(p1Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosB1[0] - (17-Math.cos(p1Angle*TO_RADIANS)) < 0 || nextPosB1[1] + (17+Math.sin(p1Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosB1[1] - (17-Math.sin(p1Angle*TO_RADIANS)) < 0){
        p1CanGo[1] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosB1[0] + (17+Math.cos(p1Angle*TO_RADIANS)) > 280 && nextPosB1[0] - (17-Math.cos(p1Angle*TO_RADIANS)) < 1130 && nextPosB1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 475 && nextPosB1[1] - (17-Math.sin(p1Angle*TO_RADIANS)) < 520){
        p1CanGo[1] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosB1[0] + (17+Math.cos(p1Angle*TO_RADIANS)) > 1040 && nextPosB1[0] - (17-Math.cos(p1Angle*TO_RADIANS)) < 1190 && nextPosB1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 220 && nextPosB1[1] - (17-Math.sin(p1Angle*TO_RADIANS)) < 470){
        p1CanGo[1] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else if(nextPosB1[0] + (17+Math.cos(p1Angle*TO_RADIANS)) > 220 && nextPosB1[0] - (17-Math.cos(p1Angle*TO_RADIANS)) < 270 && nextPosB1[1] + (20+Math.sin(p1Angle*TO_RADIANS)) > 230 && nextPosB1[1] - (17-Math.sin(p1Angle*TO_RADIANS)) < 465){
        p1CanGo[1] = false;
        if(Math.abs(p1Speed> 7.5)){
            p1Alive = Math.random() < 0.6;
            p1Speed = 0;
        }
    }
    else{
        p1CanGo[1] = true;
    }

    //player 2 forward
    nextPosF2 = [p2Pos[0] + Math.cos(p2Angle*TO_RADIANS)*p2movementSpeed, p2Pos[1] + Math.sin(p2Angle*TO_RADIANS)*p2movementSpeed];
    if(nextPosF2[0] + (25+Math.cos(p2Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosF2[0] - (25-Math.cos(p2Angle*TO_RADIANS)) < 0 || nextPosF2[1] + (25+Math.sin(p2Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosF2[1] - (25-Math.sin(p2Angle*TO_RADIANS)) < 0){
        p2CanGo[0] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosF2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 280 && nextPosF2[0] - (20-Math.cos(p2Angle*TO_RADIANS)) < 1130 && nextPosF2[1] + (20+Math.sin(p2Angle*TO_RADIANS)) > 475 && nextPosF2[1] - (20-Math.sin(p2Angle*TO_RADIANS)) < 520){
        p2CanGo[0] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosF2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 1040 && nextPosF2[0] - (20-Math.cos(p2Angle*TO_RADIANS)) < 1190 && nextPosF2[1] + (20+Math.sin(p2Angle*TO_RADIANS)) > 220 && nextPosF2[1] - (20-Math.sin(p2Angle*TO_RADIANS)) < 470){
        p2CanGo[0] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosF2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 220 && nextPosF2[0] - (20-Math.cos(p2Angle*TO_RADIANS)) < 270 && nextPosF2[1] + (20+Math.sin(p2Angle*TO_RADIANS)) > 230 && nextPosF2[1] - (20-Math.sin(p2Angle*TO_RADIANS)) < 465){
        p2CanGo[0] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosF2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 500 && nextPosF2[0] - (20-Math.cos(p2Angle*TO_RADIANS)) < 830 && nextPosF2[1] + (20+Math.sin(p2Angle*TO_RADIANS)) > 0 && nextPosF2[1] - (20-Math.sin(p2Angle*TO_RADIANS)) < 260){
        if(p2Speed > 4){
            p2Speed -= 0.5;
        }
    }
    else{
        p2CanGo[0] = true;
    }
    //backwards player 2
    nextPosB2 = [p2Pos[0] - Math.cos(p2Angle*TO_RADIANS)*p2movementSpeed, p2Pos[1] - Math.sin(p2Angle*TO_RADIANS)*p2movementSpeed];
    if(nextPosB2[0] + (17+Math.cos(p2Angle*TO_RADIANS)) > gameScreen.clientWidth || nextPosB2[0] - (17-Math.cos(p2Angle*TO_RADIANS)) < 0 || nextPosB2[1] + (17+Math.sin(p2Angle*TO_RADIANS)) > gameScreen.clientHeight || nextPosB2[1] - (17-Math.sin(p2Angle*TO_RADIANS)) < 0){
        p2CanGo[1] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosB2[0] + (17+Math.cos(p2Angle*TO_RADIANS)) > 280 && nextPosB2[0] - (17-Math.cos(p2Angle*TO_RADIANS)) < 1130 && nextPosB2[1] + (17+Math.sin(p2Angle*TO_RADIANS)) > 475 && nextPosB2[1] - (17-Math.sin(p2Angle*TO_RADIANS)) < 520){
        p2CanGo[1] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosB2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 1040 && nextPosB2[0] - (17-Math.cos(p2Angle*TO_RADIANS)) < 1190 && nextPosB2[1] + (17+Math.sin(p2Angle*TO_RADIANS)) > 220 && nextPosB2[1] - (17-Math.sin(p2Angle*TO_RADIANS)) < 470){
        p2CanGo[1] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else if(nextPosB2[0] + (20+Math.cos(p2Angle*TO_RADIANS)) > 220 && nextPosB2[0] - (17-Math.cos(p2Angle*TO_RADIANS)) < 270 && nextPosB2[1] + (17+Math.sin(p2Angle*TO_RADIANS)) > 230 && nextPosB2[1] - (17-Math.sin(p2Angle*TO_RADIANS)) < 465){
        p2CanGo[1] = false;
        if(Math.abs(p2Speed> 7.5)){
            p2Alive = Math.random() < 0.6;
            p2Speed = 0;
        }
    }
    else{
        p2CanGo[1] = true;
        
    }

}

function lapTracker(){
    //player 1
    if(p1Pos[0] > 300 && p1Pos[0] < 340 && p1Pos[1] > 540 && p1Pos[1] < gameScreen.clientHeight){
        lapTrackerVar[0][1]++;
        
    }
    //prevents from going backwards
    else if(p1Pos[0] > 1100 && p1Pos[0] < 1140 && p1Pos[1] > 0 && p1Pos[1] < 210 && lapTrackerVar[0][1] >= 1 && lapTrackerVar[0][3] == 0){
        lapTrackerVar[0][2]++;
        
    }
    else if(p1Pos[0] > 220 && p1Pos[0] < 260 && p1Pos[1] > 0 && p1Pos[1] < 210 && lapTrackerVar[0][1] >= 1 && lapTrackerVar[0][2] >= 1){
        lapTrackerVar[0][3]++;
        
    }
    if(lapTrackerVar[0][1] >= 1 && lapTrackerVar[0][2] >= 1 && lapTrackerVar[0][3] >= 1 && p1Pos[0] > 300 && p1Pos[0] < 340){
        lapTrackerVar[0][0]++;
        lapTrackerVar[0][1] = 0;
        lapTrackerVar[0][2] = 0;
        lapTrackerVar[0][3] = 0;
        console.log("player 1 lap " + lapTrackerVar[0][0]);
    }
    //player 2
    if(p2Pos[0] > 300 && p2Pos[0] < 340 && p2Pos[1] > 540 && p2Pos[1] < gameScreen.clientHeight){
        lapTrackerVar[1][1]++;
        
    }
    //prevents from going backwards
    else if(p2Pos[0] > 1100 && p2Pos[0] < 1140 && p2Pos[1] > 0 && p2Pos[1] < 210 && lapTrackerVar[1][1] >= 1 && lapTrackerVar[1][3] == 0){
        lapTrackerVar[1][2]++;
        
    }
    else if(p2Pos[0] > 220 && p2Pos[0] < 260 && p2Pos[1] > 0 && p2Pos[1] < 210 && lapTrackerVar[1][1] >= 1 && lapTrackerVar[1][2] >= 1){
        lapTrackerVar[1][3]++;
        
    }
    if(lapTrackerVar[1][1] >= 1 && lapTrackerVar[1][2] >= 1 && lapTrackerVar[1][3] >= 1 && p2Pos[0] > 300 && p2Pos[0] < 340){
        lapTrackerVar[1][0]++;
        lapTrackerVar[1][1] = 0;
        lapTrackerVar[1][2] = 0;
        lapTrackerVar[1][3] = 0;
        console.log("player 2 lap " + lapTrackerVar[1][0]);
    }

}

function drawCountdown(){
    if(potato){
        ctx.strokeStyle = "black"
        ctx.lineWidth = 6;
        ctx.fillStyle = lightColors[0];
        ctx.beginPath()
        ctx.arc(600, 50, 30, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = lightColors[1];
        ctx.beginPath()
        ctx.arc(670, 50, 30, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = lightColors[2];
        ctx.beginPath()
        ctx.arc(740, 50, 30, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.font = "30px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("GREEN LAPS LEFT: " + (numLaps-lapTrackerVar[1][0]), 50, 25);
        ctx.fillStyle = "red";
        ctx.fillText("RED LAPS LEFT: " + (numLaps-lapTrackerVar[0][0]), 1080, 25);
    }
    
    
}

function doLights(){
    
    if(lightColors[0] != "red" && lightColors[0] != "#0FFF50"){
        console.log("3");
        lightColors[0] = "red";
    }
    else if(lightColors[1] != "red" && lightColors[1] != "#0FFF50"){
        console.log("2");
        lightColors[1] = "red"
    }
    else if(lightColors[2] != "red" && lightColors[2] != "#0FFF50"){
        console.log("1");
        lightColors[2] = "red"
    }
    else{
        lightColors[0] = "#0FFF50";
        lightColors[1] = "#0FFF50";
        lightColors[2] = "#0FFF50";
    }
    drawCountdown();
    
}



function startRace(){
    drawTrack();
    drawPlayers(p1Pos, p2Pos);
    drawCountdown();
    setTimeout(() => {doLights();}, 1000);
    
    setTimeout(() => {doLights();}, 2000);

    setTimeout(() => {doLights();}, 3000);

    setTimeout(() => {doLights();}, 4000);
    
    setTimeout(() => {gameLoop();}, 4000);
}

function gameOver(){
    ctx.font = "60px Arial";
    
    if(lapTrackerVar[0][0] == numLaps){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        ctx.fillStyle = "red";
        ctx.fillText("RED WINS!", 500, 300);
    }
    else if (lapTrackerVar[1][0] == numLaps){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        ctx.fillStyle = "green";
        ctx.fillText("GREEN WINS!", 500, 300);
    }
    else if(!p1Alive && p2Alive){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        ctx.fillStyle = "red";
        ctx.fillText("RED SUCKS AT DRIVING!", 340, 280);
        ctx.fillStyle = "green";
        ctx.fillText("GREEN WINS!", 500, 350);
          
        
    }
    else if(!p2Alive && p1Alive){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        ctx.fillStyle = "green";
        ctx.fillText("GREEN SUCKS AT DRIVING!", 260, 280);
        ctx.fillStyle = "red";
        ctx.fillText("RED WINS!", 500, 350);
    }
    else{
        ctx.fillStyle = "black";
        ctx.fillText("2 losers?", 500, 350);
    }
    setTimeout(STOP = true, 1000);

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


function GameLoopRace() {

    if(potato){
        ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
        drawTrack();
        collisionDetect();
        deltaPlayer();
        drawPlayers(p1Pos, p2Pos);
        drawCountdown();
        lapTracker();
        
        if(numLaps-lapTrackerVar[0][0] == 0 || numLaps-lapTrackerVar[1][0] == 0){
            ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
            p1CanGo[0] = false;
            p1CanGo[1] = false;
            p2CanGo[0] = false;
            p2CanGo[1] = false;
            gameOver();
        }
    }
    else{
        STOP = True;
        return;
    }
    
}

