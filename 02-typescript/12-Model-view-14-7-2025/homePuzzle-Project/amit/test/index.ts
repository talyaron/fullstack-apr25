type Point = { x: number; y: number };

const boardSize = 20;
let snake: Point[] = [{ x: 5, y: 5 }];
let direction: Point = { x: 0, y: 0 };
let nextDirection: Point = { x: 0, y: 0 };
let food: Point = { x: 10, y: 10 };
let score = 0;
let interval: number;

function createBoard() {
    const board = document.getElementById("board")!;
    board.innerHTML = "";
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function renderBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.className = "cell");

    for (const part of snake) {
        const index = part.y * boardSize + part.x;
        cells[index]?.classList.add("snake");
    }

    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex]?.classList.add("food");
}

function moveSnake() {
    direction = nextDirection;
    if (direction.x === 0 && direction.y === 0) return;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (
        head.x < 0 || head.y < 0 ||
        head.x >= boardSize || head.y >= boardSize ||
        snake.some(p => p.x === head.x && p.y === head.y)
    ) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score")!.textContent = score.toString();
        placeFood();
    } else {
        snake.pop();
    }

    renderBoard();
}

function placeFood() {
    do {
        food = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        };
    } while (snake.some(p => p.x === food.x && p.y === food.y));
}

function endGame() {
    clearInterval(interval);
    document.getElementById("game-over")!.style.display = "block";
}

function resetGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
    nextDirection = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score")!.textContent = score.toString();
    document.getElementById("game-over")!.style.display = "none";
    placeFood();
    renderBoard();
    clearInterval(interval);
    interval = setInterval(moveSnake, 150);
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp": if (direction.y !== 1) nextDirection = { x: 0, y: -1 }; break;
        case "ArrowDown": if (direction.y !== -1) nextDirection = { x: 0, y: 1 }; break;
        case "ArrowLeft": if (direction.x !== 1) nextDirection = { x: -1, y: 0 }; break;
        case "ArrowRight": if (direction.x !== -1) nextDirection = { x: 1, y: 0 }; break;
    }
});

function setDirection(x: number, y: number) {
    if (direction.x !== -x && direction.y !== -y) {
        nextDirection = { x, y };
    }
}

window.onload = () => {
    createBoard();
    renderBoard();
    interval = setInterval(moveSnake, 150);
};
