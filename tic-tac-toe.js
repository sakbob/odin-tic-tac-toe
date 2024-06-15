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
        
        // Diagonals
        [0, 4, 8],
        [6, 4, 2]
    ];

    let winnerID = 0;

    return {
        getGameboard() {
            return board;
        },

        resetGameboard() {
            board.fill(0);
            winnerID = 0;
        },

        updateGameboard(index, value) {
            if (index < 0 || index >= board.length) {
                console.error("Error! Index is invalid, cannot updateGameboard!");
                return;
            }

            board[index] = value;
        },

        hasWinner() {
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

        getWinnerID() {
            return winnerID;
        },

        isOccupied(index) {
            if (index < 0 || index >= board.length) {
                console.error("Error! Index is invalid, cannot check occupancy!");
                return null;
            }
            return board[index] !== 0;
        },

        isEmpty() {
            return board.every((square) => square === 0);
        }
    };
})();

const Game = (function() {
    let playerTurn = 1;
    let counter = 1;
    let gameInProgress = false;

    const gameText = document.querySelector(".text-heading");

    function updateGameText(text) {
        gameText.textContent = text;
    }

    function handleSquareClick(event) {
        if (!gameInProgress) {
            return;
        }

        const h1 = event.target.querySelector("h1");
        let idName = h1.id.replace("square-heading-", "");

        if (Gameboard.isOccupied(Number(idName))) {
            return;
        }

        Gameboard.updateGameboard(Number(idName), playerTurn);
        h1.textContent = playerTurn === 1 ? "X" : "O";
        updateGameText(`Player ${playerTurn === 1 ? 2 : 1}'s turn`);

        if (Gameboard.hasWinner()) {
            updateGameText(`Player ${Gameboard.getWinnerID()} has won!`);
            gameInProgress = false;
            return;
        }

        counter++;
        if (counter === 10) {
            updateGameText("It's a Tie!");
            gameInProgress = false;
            return;
        }

        playerTurn = playerTurn === 1 ? 2 : 1;
    }

    function startGame() {
        resetGame();
        playerTurn = 1;
        counter = 1;
        gameInProgress = true;
        updateGameText("Player 1's turn");
    }

    function resetGame() {
        Gameboard.resetGameboard();
        gameInProgress = false;

        document.querySelectorAll(".square-heading").forEach(heading => {
            heading.textContent = "";
        });

        updateGameText("Click Start!");
    }

    document.querySelector(".square-container").addEventListener("click", event => {
        if (event.target.closest(".square")) {
            handleSquareClick(event);
        }
    });

    document.querySelector(".button-start").addEventListener("click", startGame);
    document.querySelector(".button-reset").addEventListener("click", resetGame);

    return {
        startGame,
        resetGame
    };
})();

// Initial state
document.querySelector(".text-heading").textContent = "Welcome to the Game!";