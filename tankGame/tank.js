var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');

const TO_RADIANS = Math.PI / 180;

function init() {
    //pos and orientation vars
    p1Pos = [500, 300];
    p2Pos = [200, 300];
    p1Angle = 0;
    p2Angle = 0;
    //movement vars
    p1rightPressed = false;
    p1leftPressed = false;
    p1upPressed = false;
    p1downPressed = false;
    p1shotFired = false;
    p1Reload = 0;
    p2rightPressed = false;
    p2leftPressed = false;
    p2upPressed = false;
    p2downPressed = false;
    p2shotFired = false;
    p2Reload = 0;
    //setting vars
    rotateSpeed = 4;
    movementSpeed = 3;
    reloadSpeed = 3;         //in seconds
    //bulletVars
    bulletSpeed = 4;
    bullets = [];
    numBullets = 10;
    p1BulletsLeft = numBullets;
    p2BulletsLeft = numBullets;
    


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

     //shooting
     if(e.key =="m"){
        p1shotFired = true;
     }
     if(e.key =="v"){
        p2shotFired = true;
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

function drawPlayers(p1Position, p2Position) {

    //move canvas to match player one rotation, draw, then revert
    ctx.translate(p1Position[0] + Math.cos(p1Angle*TO_RADIANS), p1Position[1] - Math.sin(p1Angle*TO_RADIANS));
    ctx.rotate(p1Angle * TO_RADIANS);

    ctx.fillStyle = 'red';
    ctx.fillRect(-25, -25, 50, 50);
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

    ctx.fillStyle = 'green';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 360);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fillRect(15, -3, 40, 6);
    ctx.rotate(-p2Angle * TO_RADIANS);
    ctx.translate(-p2Position[0] - Math.cos(p2Angle*TO_RADIANS), -p2Position[1] + Math.sin(p2Angle*TO_RADIANS));
}
function deltaPlayer(){
    if(p1upPressed){
        p1Pos[0]+= (Math.cos(p1Angle*TO_RADIANS)*movementSpeed);
        p1Pos[1]+= (Math.sin(p1Angle*TO_RADIANS)*movementSpeed);
    }
    if(p1downPressed){
        p1Pos[0]-= (Math.cos(p1Angle*TO_RADIANS)*movementSpeed);
        p1Pos[1]-= (Math.sin(p1Angle*TO_RADIANS)*movementSpeed);
    }
    if(p1rightPressed){
        p1Angle+=rotateSpeed;
    }
    if(p1leftPressed){
        p1Angle-=rotateSpeed;
    }
    if(p2upPressed){
        p2Pos[0]+= (Math.cos(p2Angle*TO_RADIANS)*movementSpeed);
        p2Pos[1]+= (Math.sin(p2Angle*TO_RADIANS)*movementSpeed);
    }
    if(p2downPressed){
        p2Pos[0]-= (Math.cos(p2Angle*TO_RADIANS)*movementSpeed);
        p2Pos[1]-= (Math.sin(p2Angle*TO_RADIANS)*movementSpeed);
    }
    if(p2rightPressed){
        p2Angle+=rotateSpeed;
    }
    if(p2leftPressed){
        p2Angle-=rotateSpeed;
    }
    
}

function bulletHander(){
    if(p1shotFired && p1BulletsLeft > 0){
        bullets.push([p1Pos[0], p1Pos[1], p1Angle]);
        p1BulletsLeft--;
        p1shotFired=false;
    }
    if(p2shotFired && p2BulletsLeft > 0){
        bullets.push([p2Pos[0], p2Pos[1], p2Angle]);
        p2BulletsLeft--;
        p2shotFired=false;
    }

    for (let i = 0; i < bullets.length; i++){
        moveBullet(bullets[i])
        drawBullet(bullets[i][0], bullets[i][1]);
        if(bullets[i][0] > gameScreen.clientWidth || bullets[i][0] < 0 || bullets[i][1] > gameScreen.clientHeight || bullets[i][1] < 0){
            if(bullets.length == 1){
                bullets = [];
            }
            else{
                bullets = bullets.slice(0, i).concat(bullets.slice(i+1));
            }
            
        }
    }

}

function moveBullet(bullet){
    bullet[0]+= (Math.cos(bullet[2]*TO_RADIANS)*bulletSpeed);
    bullet[1]+= (Math.sin(bullet[2]*TO_RADIANS)*bulletSpeed);
}

function drawBullet(bullX, bullY){
    ctx.fillStyle = "grey";
    ctx.fillRect(bullX, bullY, 5, 5);
}

function reload(){
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

function drawGUI(){
    ctx.font = "20px Arial";
    
    ctx.fillStyle= 'green';
    ctx.fillRect(10, 20, 20, 20);
    ctx.fillStyle= 'red';
    ctx.fillRect(gameScreen.clientWidth - 20 - 10, 20, 20, 20);
    for (let i = 0; i < p2BulletsLeft; i++){
        ctx.fillStyle = 'gray';
        ctx.fillRect(20 * i + 40, 22.5, 10, 15);
    }
    for (let i = 0; i < p1BulletsLeft; i++){
        ctx.fillStyle = 'gray';
        ctx.fillRect(gameScreen.clientWidth - (20 * i) - 50, 22.5, 10, 15);
    }
    
}

function gameLoop() {
    ctx.clearRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
    deltaPlayer();
    bulletHander();
    drawPlayers(p1Pos, p2Pos);
    drawGUI();
    requestAnimationFrame(gameLoop);
}

init();

window.onload = setInterval(reload, 1000);