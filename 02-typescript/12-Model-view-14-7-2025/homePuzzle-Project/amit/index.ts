// Data Base:

type Snake = {
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,

};

type Board = {
    blockSize: number
    rows: number
    columns: number
};


const board: Board = {
    blockSize: 25,
    rows: 20,
    columns: 20,
};
let snake: Snake = {
    x: board.blockSize * 5,
    y: board.blockSize * 5,
    velocityX: 0,
    velocityY: 0,
};

let gameInterval: number;

window.onload = () => {
    try {
        const canvas = document.getElementById("board") as HTMLCanvasElement | null;
        if (!canvas) throw new Error("Canvas not found!");

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2D context not available");

        initControls();
        gameInterval = setInterval(() => update(ctx), 100);

    } catch (error) {
        console.error("Error initializing game", error);
    }
};

function renderBaord(ctx: CanvasRenderingContext2D, snake: Snake): void {
    try {
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "green";
        ctx.fillRect(snake.x, snake.y, board.blockSize, board.blockSize);

    } catch (error) {
        console.error("Error, Please check your code!", error);
    }
}


function update(ctx: CanvasRenderingContext2D): void {
    try {
        snake.x += snake.velocityX * board.blockSize;
        snake.y += snake.velocityY * board.blockSize;

        if (
            snake.x < 0 ||
            snake.y < 0 ||
            snake.x >= board.columns * board.blockSize ||
            snake.y >= board.rows * board.blockSize
        ) {
            console.warn("Snake hit the wall - Game Over!")
            showGameOver();

            clearInterval(gameInterval);
            return;
        }

        renderBaord(ctx, snake);

    } catch (error) {
        console.error("Error, Please check your code!", error);
    }
}


function changeDirection(event: KeyboardEvent): void {
    try {
        switch (event.code) {
            case "ArrowUp":
                if (snake.velocityY !== 1) {
                    snake.velocityX = 0
                    snake.velocityY = -1
                }
                break;
            case "ArrowDown":
                if (snake.velocityY !== -1) {
                    snake.velocityX = 0
                    snake.velocityY = 1
                }
                break;
            case "ArrowLeft":
                if (snake.velocityX !== 1) {
                    snake.velocityX = -1
                    snake.velocityY = 0
                }
                break;
            case "ArrowRight":
                if (snake.velocityX !== -1) {
                    snake.velocityX = 1
                    snake.velocityY = 0
                }
                break;
            default:
                console.log(`Key ${event.code} is not a direction key`);
                break;
        }
    } catch (error) {
        console.error("Error, Please check your code!", error);
    }
}

function showGameOver(): void {
    try {
        const gameOver = document.getElementById("game-over");
        if (!gameOver) throw new Error("game-over not found");

        gameOver.style.display = "block";
    } catch (error) {
        console.error("Error, Please check your code!", error);
    }

}


function resetGame(): void {
    try {
        snake.x = board.blockSize * 5;
        snake.y = board.blockSize * 5;
        snake.velocityX = 0;
        snake.velocityY = 0;

        const gameOver = document.getElementById("game-over");
        if (!gameOver) throw new Error("game-over not found");

        gameOver.style.display = "none";

        const canvas = document.getElementById("board") as HTMLCanvasElement | null;
        if (!canvas) throw new Error("Canvas not found!");

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2D context not available");

        gameInterval = setInterval(() => update(ctx), 100);

        console.log("Game Reset");

    } catch (error) {
        console.error("Error, Please check your code!", error);
    }
}


function initControls(): void {
    try {
        document.addEventListener("keydown", changeDirection);
    } catch (error) {
        console.error("Error initializing controls", error);
    }
}

