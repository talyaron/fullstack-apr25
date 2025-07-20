// Data structures
const fruitArray: Array<string> = ["apple.png", "bannana.png", "pear.png", "strewberry.png", "watermelon.png"]

interface Snake {
    img: string;
    x: number;
    y: number;
}
interface Fruit {
    img: string;
    x: number;
    y: number;
}

const defult: Snake = {
    img: "./img/snake/alive/left.png",
    x: (6 * 50),
    y: (3 * 50)
};
const snake: Snake[] = [{ ...defult }]

const fruit: Fruit = {
    img: `./img/fruits/${fruitArray[randomNum()]}`,
    x: (Math.floor(Math.random() * 13)) * 50,
    y: (Math.floor(Math.random() * 8)) * 50
}


// Game state
let direction = '';
let gameInterval: number | null = null;
let score = 0;
let gameRunning = false;


//view functions
function htmlFruit(fruit: Fruit): string {
    return `
    <img src="${fruit.img}"
   class="fruit" 
    style="left:${fruit.x}px; top:${fruit.y}px;">
    `

}
function renderFruit(): void {
    try {
        const fruitOnBoard = document.getElementById("fruitRoot")
        if (!fruitOnBoard) throw new Error("fruitRoot element not found");
        fruit.img = `./img/fruits/${fruitArray[randomNum()]}`;
        fruit.x = (Math.floor(Math.random() * 13)) * 50;
        fruit.y = (Math.floor(Math.random() * 8)) * 50;
        if (fruitOnBoard instanceof HTMLDivElement) fruitOnBoard.innerHTML = htmlFruit(fruit)


    } catch (error) {
        console.error(error);
    }

}

function htmlSnake(snake: Snake): string {
    return `
    <img src="${snake.img}"
   class="snake" 
    style="left:${snake.x}px; top:${snake.y}px;">
    `

}
function renderSnake(snake: Snake): void {
    try {
        const snakeOnBoard = document.getElementById("snakeRoot")
        if (!snakeOnBoard) throw new Error("snakeRoot element not found");
        if (snakeOnBoard instanceof HTMLDivElement) snakeOnBoard.innerHTML = htmlSnake(snake)

    } catch (error) {
        console.error(error);
    }

}
function renderAllSnake(): void {
    try {
        const snakeOnBoard = document.getElementById("snakeRoot");
        if (!snakeOnBoard) throw new Error("snakeRoot element not found");

        let snakeHTML = '';
        for (let i = 0; i < snake.length; i++) {
            snakeHTML += htmlSnake(snake[i]);
        }

        if (snakeOnBoard instanceof HTMLDivElement) {
            snakeOnBoard.innerHTML = snakeHTML;
        }
    } catch (error) {
        console.error(error);
    }
}
function updateScore() {
    try {
        const scoreElement = document.getElementById("score");
        if (!scoreElement) throw new Error("score element not found");
        scoreElement.textContent = score.toString()
    } catch (error) {
        console.error(error);
    }

}


//control
function handleKey(event: KeyboardEvent) {
    if (!gameRunning) return;

    console.log("Key pressed:", event.key);

    // Prevent reverse direction
    const newDirection = getDirectionFromKey(event.key);
    if (newDirection && !isReverseDirection(newDirection, direction)) {
        direction = newDirection;
        updateSnakeImage();
    }
}

function getDirectionFromKey(key) {
    switch (key) {
        case "ArrowUp": return 'up';
        case "ArrowDown": return 'down';
        case "ArrowLeft": return 'left';
        case "ArrowRight": return 'right';
        default: return null;
    }
}

function isReverseDirection(newDir, currentDir) {
    const opposites = {
        'up': 'down',
        'down': 'up',
        'left': 'right',
        'right': 'left'
    };
    return opposites[newDir] === currentDir;
}


//model

function updateSnakeImage() {
    switch (direction) {
        case 'up':
            snake[0].img = "./img/snake/alive/up.png";
            break;
        case 'down':
            snake[0].img = "./img/snake/alive/down.png";
            break;
        case 'left':
            snake[0].img = "./img/snake/alive/left.png";
            break;
        case 'right':
            snake[0].img = "./img/snake/alive/right.png";
            break;
    }
}
function eatFruit() {
    if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
        score += 10;
        updateScore();
        renderFruit();
        // Add new segment at the tail
        const tail = snake[snake.length - 1];
        snake.push({
            img: "./img/snake/body.png",
            x: tail.x,
            y: tail.y
        });
        return true;
    }
    return false;
} function moveSnake(): void {
    if (!direction || !gameRunning) return;
    const step = 50;
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    switch (direction) {
        case "up":
            snake[0].y -= step;
            break;
        case "down":
            snake[0].y += step;
            break;
        case "left":
            snake[0].x -= step;
            break;
        case "right":
            snake[0].x += step;
            break;
        default:
            console.log("Invalid key pressed");
    }

    // Check for collisions
    if (checkCollision()) {
        gameOver();
        return;
    }

    // Check if fruit is eaten
    eatFruit();

    // Update snake image and render
    updateSnakeImage();
    renderAllSnake();
}

function checkCollision() {
    // Check wall collision (board is 13x8 grid with 50px cells)
    if (snake[0].x < 0 || snake[0].x >= 650 || snake[0].y < 0 || snake[0].y >= 400) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    gameRunning = false;

    renderAllSnake()
    try {
        const playElement = document.getElementById("play");
        if (!playElement) throw new Error("play element not found");
        playElement.textContent = "Restart"
        snake[0].img = "./img/snake/dead.png";
        const gameOver = document.getElementById("over");
        if (!gameOver) throw new Error("over element not found");
        gameOver.style.display = "flex"
        gameOver.innerHTML = `
    <div class="over__title">Game Over</div>
        <div >points: ${score}</div>
        `

    } catch (error) {
        console.error(error);
    }

}

function startGameLoop() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(moveSnake, 200); // Move every 200ms
}

function handlePlay(event) {
    // Reset game state
    snake[0].img = defult.img;
    snake[0].x = defult.x;
    snake[0].y = defult.y;
    snake.length = 1;
    direction = '';
    score = 0;
    gameRunning = true;
    try {
        const gameOver = document.getElementById("over");
        if (!gameOver) throw new Error("over element not found");
        gameOver.style.display = "none"

    } catch (error) {
        console.error(error);
    }

    // Clear any existing interval
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // Update UI
    updateScore();
    renderAllSnake()
    renderFruit();

    // Start the game loop
    startGameLoop();
}
document.addEventListener('DOMContentLoaded', function () {
    renderAllSnake();
    renderFruit();
    updateScore();

    // Add keyboard event listener
    document.addEventListener('keydown', handleKey);
});
function randomNum(): number {
    return Math.floor(Math.random() * 5)
}



renderSnake(snake[0])
renderFruit()