const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const HEIGHT = 700;
const WIDTH = 1400;

var STOP;

var intervalID;
var intervalStop;

var p1, p2;
// Pong variables
var ball;
// Snake variables
var ds, dds;
var food, foodWidth, foodUp;


const gameIDs = [0, 1, 2, 3, 4, 5]; // 0: Pong, 1: Snake, 2: Tank, 3: Race, 4: Hockey, 5: Coin Jump
var currentGame = [...gameIDs];
var previousGame = -1;

function shuffleGames() {
    for (let i = currentGame.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [currentGame[i], currentGame[j]] = [currentGame[j], currentGame[i]];
    }
}

function getNextGame() {
    let availableGames = currentGame.filter(game => game !== previousGame);
    return availableGames[Math.floor(Math.random() * availableGames.length)];
}

function MotherLoop() {
    shuffleGames();
    intervalStop = setInterval(CheckStop, 16.66);

    PlayNext(getNextGame()); 
}

function PlayNext(gameID) {
    previousGame = gameID;

    // Start the selected game
    if (gameID === 0) {
        InitPong();
        intervalID = setInterval(GameLoopPong, 16.66);
        document.addEventListener("keydown", keyDownHandler_pong);
        document.addEventListener("keyup", keyUpHandler_pong);
    } else if (gameID === 1) {
        InitSnake();
        intervalID = setInterval(GameLoopSnake, 16.66);
        document.addEventListener("keydown", keyDownHandler_snake);
        document.addEventListener("keyup", keyUpHandler_snake);
    } else if (gameID === 2) {
        InitTank();
        intervalID = setInterval(GameLoopTank, 16.66);
        addEventListener("keydown", keyDownHandler_tank);
        addEventListener("keyup", keyUpHandler_tank);
    } else if (gameID === 3) {
        InitRace();
        intervalID = setInterval(GameLoopRace, 16.6);
        addEventListener("keydown", keyDownHandler_race);
        addEventListener("keyup", keyUpHandler_race);
    } else if (gameID === 4) {
        InitHockey();
        intervalID = setInterval(GameLoopHockey, 16.6);
        addEventListener("keydown", keyDownHandler_hockey);
        addEventListener("keyup", keyUpHandler_hockey);
    } else if (gameID === 5) {
        InitCoinjump();
        intervalID = setInterval(GameLoopCoinjump, 16.6);
        addEventListener("keydown", keyDownHandler_coinjump);
        addEventListener("keyup", keyUpHandler_coinjump);
    }
}

function CheckStop() {
    if (STOP) {
        clearInterval(intervalID);
        STOP = false;
        setTimeout(() => { PlayNext(getNextGame()); }, 1000); // delay for smooth transition
    }
}

InitMenu();
