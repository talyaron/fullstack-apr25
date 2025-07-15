const board = 0;

const blockSize = 25

const snakeX = blockSize * 5
const snakeY = blockSize * 5

const rows = 20
const columns = 20



function renderBaord() {
    try {
        const boardGame = document.getElementById("board");
        if(!boardGame) throw new Error;

        board

    } catch {

    }
}

function placeFood() {}

function resetGame() {
    console.log("Game reset")
}


function resetButton(): void {
    try {
        const buttonClicked = document.getElementById("reset");
        if(!buttonClicked) throw new Error("Reset button not found");

        buttonClicked.onclick = resetGame; 

    } catch (error) {
        console.error("Oops, Something went wrong!", error);
    }
}