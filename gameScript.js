var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');
console.log("HI");
var backgroundImage = new Image();	

function init() {
    update();
}

function drawBackground() {
    console.log("drawBackground");
    ctx.fillStyle = "black";
	ctx.fillRect(0, 0, gameScreen.clientWidth, gameScreen.clientHeight);
}

function drawButton() {
    ctx.fillStyle = '#eeaa00';
    ctx.fillRect((gameScreen.width/2) - 100, 100, 200, 75);
    ctx.fillStyle = '#001122';
    ctx.textAlign = 'center';
    ctx.font = '25px arial';
    ctx.fillText('Start Game', (gameScreen.width/2), 145, 200);
}

function update() {

    drawBackground();
    drawButton();
    requestAnimationFrame(update);
}


init();
