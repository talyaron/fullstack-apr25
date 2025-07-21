interface Snake {
    x: number;
    y: number;
}
interface Fruit {
    x: number;
    y: number;
}
const snake: Array<Snake> = [{ x: (25 * 10), y: (25 * 10) }]
const fruit: Fruit = {
    x: (Math.floor(Math.random() * 20)) * 25,
    y: (Math.floor(Math.random() * 20)) * 25
}

let score = 0

//view
function snakeHtml(snake): string {
    return `<div
    class="snake" 
    style="left:${snake.x}px; top:${snake.y}px;"></div>
    `
}
function fruitHtml(fruit): string {
    return `<div
    class="fruit" 
    style="left:${fruit.x}px;
    top:${fruit.y}px;
    background:${getRandomColor()};"></div>
    `
}

function scoreHtml(score): string {
    return `<div
    class="score">points: ${score}</div>
    `
}

function renderSnake(snake: Snake): void {
    try {
        const snakeOnBoard = document.querySelector("#snakeRoot")
        if (!snakeOnBoard) throw new Error("snakeRoot element not found");
        if (snakeOnBoard instanceof HTMLDivElement) {
            snakeOnBoard.innerHTML = snakeHtml(snake)
        }
    } catch (error) {
        console.error(error);
    }

}

function renderFruit(): void {
    try {
        const fruitOnBoard = document.getElementById("fruitRoot")
        if (!fruitOnBoard) throw new Error("fruitRoot element not found");
        fruit.x = (Math.floor(Math.random() * 20)) * 25;
        fruit.y = (Math.floor(Math.random() * 20)) * 25;
        if (fruitOnBoard instanceof HTMLDivElement) {
            fruitOnBoard.innerHTML = fruitHtml(fruit)
        }
    } catch (error) {
        console.error(error);
    }

}

function renderScore(score): void {
    try {
        const scoreOnBoard = document.querySelector("#scoreRoot")
        if (!scoreOnBoard) throw new Error("scoreRoot element not found");
        if (scoreOnBoard instanceof HTMLDivElement) {
            scoreOnBoard.innerHTML = scoreHtml(score)
        }
    } catch (error) {
        console.error(error);
    }

}
renderScore(score)
renderFruit()
renderSnake(snake[0])
function moveSnake(event): void {
    const step = 25
    switch (event.key) {
        case "ArrowUp":
            snake[0].y -= step;
            break;
        case "ArrowDown":
            snake[0].y += step;
            break;
        case "ArrowLeft":
            snake[0].x -= step;
            break;
        case "ArrowRight":
            snake[0].x += step;
            break;
        default:
            console.log("Invalid key pressed");
    }
    renderSnake(snake[0])

    if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
        renderFruit()
        score += 10;
        const position = snake.length - 1
        const snakeBody: Snake = {
            x: snake[position].x,
            y: snake[position].y
        };
        snake.push(snakeBody);
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
        renderScore(score)
    }
}

//model
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
