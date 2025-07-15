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
        if (!context) throw new Error("2D context not available");

        context.clearRect(0, 0, boardGame.width, boardGame.height);

        context.fillStyle = "green";
        context.fillRect(snakeX, snakeY, newBoard.blockSize, newBoard.blockSize);

    } catch (error) {
        console.error("Oops, Something went wrong", error);
    }
}


function update(): void {
    try {
        snakeX += velocityX * newBoard.blockSize;
        snakeY += velocityY * newBoard.blockSize;


        renderBaord();

    } catch (error) {
        console.error("Oops, Somthing went wrong!", error);
    }
}

function initControls(): void {
    try {
        document.addEventListener("keydown", changeDirection);
    } catch (error) {
        console.error("Error initializing controls", error);
    }
}

function changeDirection(event: KeyboardEvent): void {
    try {
        switch (event.code) {
            case "ArrowUp":
                if (velocityY !== 1) {
                    velocityX = 0
                    velocityY = -1
                }
                break;
            case "ArrowDown":
                if (velocityY !== -1) {
                    velocityX = 0
                    velocityY = 1
                }
                break;
            case "ArrowLeft":
                if (velocityX !== 1) {
                    velocityX = -1
                    velocityY = 0
                }
                break;
            case "ArrowRight":
                if (velocityX !== -1) {
                    velocityX = 1
                    velocityY = 0
                }
                break;
            default:
                console.log(`Key ${event.code} is not a direction key`);
                break;
        }
    } catch (error) {
        console.error("Oops, Something went wrong!", error);
    }
}



function resetButton(): void {
    try {
        const buttonClicked = document.getElementById("reset");
        if (!buttonClicked) throw new Error("Reset button not found");

        buttonClicked.onclick = resetGame;

    } catch (error) {
        console.error("Oops, Something went wrong!", error);
    }
}



window.onload = () => {
    initControls();
    setInterval(update, 100);
};


function placeFood() { }

function resetGame() {
    console.log("Game reset")
}