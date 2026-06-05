const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const pvpBtn = document.getElementById("pvpBtn");
const cpuBtn = document.getElementById("cpuBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let gameMode = "";

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Player vs Player
pvpBtn.addEventListener("click", () => {
    gameMode = "pvp";
    resetGame();
    statusText.textContent = "Player X Turn";
    gameActive = true;
});

// Player vs Computer
cpuBtn.addEventListener("click", () => {
    gameMode = "cpu";
    resetGame();
    statusText.textContent = "Your Turn (X)";
    gameActive = true;
});

// Cell Click
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    if(checkWinner()){
        statusText.textContent = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if(board.every(cell => cell !== "")){
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    if(gameMode === "pvp"){

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer} Turn`;

    } else if(gameMode === "cpu"){

        currentPlayer = "O";
        statusText.textContent = "Computer Turn";

        setTimeout(computerMove, 500);
    }
}

// Computer Move
function computerMove(){

    let emptyCells = [];

    board.forEach((value, index) => {
        if(value === ""){
            emptyCells.push(index);
        }
    });

    if(emptyCells.length === 0 || !gameActive){
        return;
    }

    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    if(checkWinner()){
        statusText.textContent = "Computer Wins! 🤖";
        gameActive = false;
        return;
    }

    if(board.every(cell => cell !== "")){
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
}

// Winner Check
function checkWinner(){

    return winPatterns.some(pattern => {

        const [a,b,c] = pattern;

        return (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        );

    });
}

// Restart
restartBtn.addEventListener("click", resetGame);

function resetGame(){

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    gameActive = true;

    if(gameMode === "pvp"){
        statusText.textContent = "Player X Turn";
    }
    else if(gameMode === "cpu"){
        statusText.textContent = "Your Turn (X)";
    }
    else{
        statusText.textContent = "Choose a Game Mode";
        gameActive = false;
    }
}