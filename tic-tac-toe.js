// Create gameboard as array inside of gameboard object
const Gameboard = (function() {
    const board = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];

    const boardWin = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        
        // Diagonal
        [0, 4, 8],
        [6, 4, 2]
    ];

    let winnerID = 0;

    return {
        // Returns gameboard array.
        getGameboard() {
            return board;
        },

        // Resets gameboard array.
        resetGameboard() {
            board.fill(0);
            winnerID = 0;
        },

        // Updates gameboard array given an index and value
        updateGameboard(index, value) {
            if (index < 0 || index >= board.length) {
                console.error("Error! Index is invalid, cannot updateGameboard!");
                return;
            }

            board[index] = value;
        },

        // Checks if there is a winner
        hasWinner() {
            // Check for winner by comparing indices of the array to the win conditions.
            for (let i = 0; i < boardWin.length; i++) {
                if (board[boardWin[i][0]] !== 0 && 
                    board[boardWin[i][0]] === board[boardWin[i][1]] && 
                    board[boardWin[i][1]] === board[boardWin[i][2]]) {
                    
                    winnerID = board[boardWin[i][0]];
                    return true;
                }
            }

            return false;
        },

        // Gets the ID of the person who won (0 = none, 1 = playerOne, 2 = playerTwo).
        getWinnerID() {
            return winnerID;
        },

        // Returns null if invalid index, false if index is occupied, true if unoccupied.
        isOccupied(index) {
            if (index < 0 || index >= board.length) {
                console.error("Error! Index is invalid, cannot updateGameboard!");
                return null;
            }

            if (board[index] === 0) {
                return false;
            }

            return true;
        },

        // Returns true if grid is empty, false otherwise.
        isEmpty() {
            return board.every((square) => square === 0);
        }
    };
})();

const Game = function() {
    const playerOne = 1;
    const playerTwo = 2;
    let playerTurn = 1;

    // Listen for any pressed squares.
    const squareHeading = querySelectorAll(".square-heading");
    squareHeading.forEach(heading => {
        heading.addEventListener("click", () => {
            // Get the id of the square and only get the square number.
            let idName = heading.id;
            idName.replace("square-heading-","");

            // Check if square has already been pressed.
            if (isOccupied(Number(idName))) {
                return;
            }

            // Update Gameboard with the proper square that is pressed.
            Gameboard.updateGameboard(Number(idName), playerTurn);
            
            // Increment or decrement playerTurn.
            playerTurn === 1? playerTurn++ : playerTurn--;
        });
    });
}


const butStart = document.querySelector(".button-start");
const butReset = document.querySelector(".button-reset");

let gameInProgress = 0;

butStart.addEventListener("click", () => {
    if (gameInProgress !== 0) {
        Game();
        gameInProgress = 1;
    }
});

butReset.addEventListener("click", () => {
    Gameboard.resetGameboard();
    gameInProgress = 0;
});