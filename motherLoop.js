const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const HEIGHT = 600;
const WIDTH = 1000;

var STOP;

var intervalID;
var intervalStop;

// Players / Multiple Games' Variables
var p1; var p2;
// Pong variables
var ball;
// Snake variables
var ds; var dds;
var food; var foodWidth; var foodUp;

// Has game id, -1 means next game up
//0 is pong, 1 is snake game, 2 is tank game
currentGame = [2, 2, 2]
game = 0;

function MotherLoop(){
    // Always keep track of STOP which is when to switch to the next game
    intervalStop = setInterval(CheckStop, 16.66)

    // Turn off all event listeners
    removeEventListener("keydown", keyDownHandler);
    removeEventListener("keyup", keyUpHandler);

    //////////////////////////////////////// PONG

    // Start up game 1
    PlayNext(currentGame[game]);
}

function PlayNext(currentGame){
    // Pong
    if(currentGame == 0){
        InitPong();
        // Start game loop
        intervalID = setInterval(GameLoopPong, 16.66)
        // Start keypresses
        document.addEventListener("keydown", keyDownHandler_pong, false);
        document.addEventListener("keyup", keyUpHandler_pong, false);
    }
    
    // Snake
    else if(currentGame == 1){
        InitSnake();
        
        intervalID = setInterval(GameLoopSnake, 16.66);
        document.addEventListener("keydown", keyDownHandler_snake);
        document.addEventListener("keyup", keyUpHandler_snake);
    }

    // Tank
    else if(currentGame == 2){
        InitTank();

        intervalID = setInterval(GameLoopTank, 16.66);
        addEventListener("keydown", keyDownHandler_tank);
        addEventListener("keyup", keyUpHandler_tank);
    }
}

function CheckStop(){
    if(STOP){
        game++;
        clearInterval(intervalID);
        
        STOP = false;
        setTimeout(() => {PlayNext(currentGame[game])}, 1000)
    }
}

MotherLoop();