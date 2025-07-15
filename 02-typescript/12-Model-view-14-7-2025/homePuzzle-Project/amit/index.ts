// Data Base:

type Snake = {
    x: number,
    y: number,
};

type Board = {
    blockSize: number
    rows: number
    columns: number
};

const newSnake: Snake = {
    x: 50,
    y: 50,
};

const newBoard: Board = {
    blockSize: 25,
    rows: 20,
    columns: 20,
};

let snakeX: number = newBoard.blockSize * 5;
let snakeY: number = newBoard.blockSize * 5;

let velocityX = 0
let velocityY = 0



function renderBaord() {
    try {
        const boardGame = document.getElementById("board") as HTMLCanvasElement | null;
        if (!boardGame) throw new Error("Board element not found!");

        const context = boardGame.getContext("2d");
        if(!context) throw new Error("2D context not available");

        context.clearRect(0,0, boardGame.width, boardGame.height);
        
        context.fillStyle = "green";
        context.fillRect(snakeX, snakeY, newBoard.blockSize, newBoard.blockSize);

    } catch (error) {
        console.error("Oops, Something went wrong", error);
    }
}

window.onload = () => {
    renderBaord();
};



function resetButton(): void {
    try {
        const buttonClicked = document.getElementById("reset");
        if (!buttonClicked) throw new Error("Reset button not found");
        
        buttonClicked.onclick = resetGame;
        
    } catch (error) {
        console.error("Oops, Something went wrong!", error);
    }
}



function placeFood() { }

function resetGame() {
    console.log("Game reset")
}