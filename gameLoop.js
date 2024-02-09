var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext('2d');
console.log("HI");
var backgroundImage = new Image();	

class Button {
    //looks
    text = String;
    fillColor = String;
    textColor = String;

    //position
    posX = Number;
    posY = Number;

    //size
    width = Number;
    height = Number;

    constructor(text, fillColor, textColor) {
        this.text = text;
        this.fillColor = fillColor;
        this.textColor = textColor;
      }

      setPosition(x, y){
        this.x = x;
        this.y = y;
      }

      setSize(width, height){
        this.width = width;
        this.height = height;
      }

      draw(ctx) {
        // draw the button body
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // draw the button text
        ctx.fillStyle = this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '25px arial';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
      }

      inBounds(mouseX, mouseY) {
        return !(mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height);
      }

      onClick(location){
        console.log(location);
      }

}



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
    startGame = new Button('Start Game', '#eeaa00', '#001122');
    startGame.setPosition(gameScreen.width / 2 - 100, 150);
    startGame.setSize(200, 75);
    startGame.draw(ctx);
    requestAnimationFrame(update);
}


init();
