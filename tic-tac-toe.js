// Create gameboard as array inside of gameboard object
const Gameboard = (function() {
    const gameboard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    return {
        getGameboard() {
            return gameboard;
        },

        resetGameboard() {
            gameboard.fill("");
        },

        updateGameboard(index, value) {
            if (index < 0 || index >= gameboard.length) {
                console.log("Error! Index is invalid, cannot updateGameboard!");
            }

            gameboard[index] = value;
        }
    };
})();