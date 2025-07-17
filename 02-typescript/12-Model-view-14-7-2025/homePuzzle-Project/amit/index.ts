// MODEL

type Snake = {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
};

type Board = {
    blockSize: number;
    rows: number;
    columns: number;
};

type Food = {
    x: number;
    y: number;
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

const food: Food = {
    x: Math.floor(Math.random() * board.columns) * board.blockSize,
    y: Math.floor(Math.random() * board.rows) * board.blockSize,
};

let snakeBody: { x: number; y: number }[] = [];
let score: number = 0;
let gameInterval: number;


// CONTROLLER

function update(ctx: CanvasRenderingContext2D): void {
    try {
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x;
            snakeBody[i].y = snakeBody[i - 1].y;
        }
        if (snakeBody.length > 0) {
            snakeBody[0].x = snake.x;
            snakeBody[0].y = snake.y;
        }

        snake.x += snake.velocityX * board.blockSize;
        snake.y += snake.velocityY * board.blockSize;

        if (
            snake.x < 0 ||
            snake.y < 0 ||
            snake.x >= board.columns * board.blockSize ||
            snake.y >= board.rows * board.blockSize
        ) {
            showGameOver();
            clearInterval(gameInterval);
            return;
        }

        if (snake.x === food.x && snake.y === food.y) {
            snakeBody.push({ x: snake.x, y: snake.y });
            score++;
            updateScoreDisplay();
            placeNewFood();
        }

        renderBoard(ctx);

    } catch (error) {
        console.error("Error, Please check your code!", error);
    }
}

function changeDirection(event: KeyboardEvent): void {
    try {
        switch (event.code) {
            case "ArrowUp":
                if (snake.velocityY !== 1) {
                    snake.velocityX = 0;
                    snake.velocityY = -1;
                }
                break;
            case "ArrowDown":
                if (snake.velocityY !== -1) {
                    snake.velocityX = 0;
                    snake.velocityY = 1;
                }
                break;
            case "ArrowLeft":
                if (snake.velocityX !== 1) {
                    snake.velocityX = -1;
                    snake.velocityY = 0;
                }
                break;
            case "ArrowRight":
                if (snake.velocityX !== -1) {
                    snake.velocityX = 1;
                    snake.velocityY = 0;
                }
                break;
        }
    } catch (error) {
        console.error("Error changing direction", error);
    }
}

function resetGame(): void {
    try {
        snake = {
            x: board.blockSize * 5,
            y: board.blockSize * 5,
            velocityX: 0,
            velocityY: 0,
        };
        snakeBody = [];
        score = 0;
        updateScoreDisplay();
        placeNewFood();

        const gameOver = document.getElementById("game-over");
        if (!gameOver) throw new Error("game-over not found");
        gameOver.style.display = "none";

        const canvas = document.getElementById("board") as HTMLCanvasElement;
        if (!canvas) throw new Error("Canvas not found!");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2D context not available");

        clearInterval(gameInterval);
        gameInterval = setInterval(() => update(ctx), 100);

    } catch (error) {
        console.error("Error resetting game", error);
    }
}


// VIEW

function renderBoard(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, 500, 500);
    renderFood(ctx);

    for (const part of snakeBody) {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x, part.y, board.blockSize, board.blockSize);
    }

    ctx.fillStyle = "darkgreen";
    ctx.fillRect(snake.x, snake.y, board.blockSize, board.blockSize);
}

function renderFood(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, board.blockSize, board.blockSize);
}

function updateScoreDisplay(): void {
    const scoreElement = document.getElementById("score");
    if (!scoreElement) throw new Error("score element not found");
    scoreElement.textContent = score.toString();
}

function showGameOver(): void {
    const gameOver = document.getElementById("game-over");
    if (!gameOver) throw new Error("game-over not found");
    gameOver.style.display = "block";
}


// INITIALIZE

function placeNewFood(): void {
    food.x = Math.floor(Math.random() * board.columns) * board.blockSize;
    food.y = Math.floor(Math.random() * board.rows) * board.blockSize;
}

function initControls(): void {
    document.addEventListener("keydown", changeDirection);
}

window.onload = () => {
    const canvas = document.getElementById("board") as HTMLCanvasElement;
    if (!canvas) throw new Error("Canvas not found!");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");

    initControls();
    gameInterval = setInterval(() => update(ctx), 100);
};
