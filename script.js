const statusDisplay = document.querySelector('.game--status');

// Boolean to keep track if the game is still ongoing
let gameActive = true;

// String to represent the current player ('X' or 'O')
let currentPlayer = "X";

// Array representing the game board. Empty strings represent empty cells
let gameState = ["", "", "", "", "", "", "", "", ""];

// Function to generate the winning message
const winningMessage = () => `Player ${currentPlayer} has won!`;

// Function to generate the draw message
const drawMessage = () => `Game ended in a draw!`;

// Function to generate the message for current player's turn
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Set the initial status display to show whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();

// Array of arrays representing all possible winning combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Function to handle a cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update the game state with the current player's mark
    gameState[clickedCellIndex] = currentPlayer;
    // Update the cell's content in the UI
    clickedCell.innerHTML = currentPlayer;
}

// Function to switch the current player
function handlePlayerChange() {
    // Switch the current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // Update the status display to show whose turn it is
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to check if the game has been won or drawn
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // Check for a draw
    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    // Get the clicked cell
    const clickedCell = clickedCellEvent.target;
    // Get the index of the clicked cell
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // If the cell is already played or the game is not active, do nothing
    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    // Handle the played cell
    handleCellPlayed(clickedCell, clickedCellIndex);
    // Check if the game has been won or drawn
    handleResultValidation();
}

// Function to restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add click event listeners to all cells
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// Add click event listener to the restart button
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);