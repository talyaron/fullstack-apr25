//Interfaces
interface Ball {
    img: string;
    x: number;
    y: number;
}

interface Snake {
    balls: Ball[];
}

interface Food {
    img: string;
    x: number;
    y: number;
}

interface GameState {
    snake: Snake;
    food: Food;
    score: number;
}

// Game state
const gameState: GameState = {
    snake: {
        balls: [
            {
                img: "./ball.webp",
                x: 50,
                y: 50
            }
        ]
    },
    food: {
        img: "./ball.webp", 
        x: 20,
        y: 30
    },
    score: 0
};

// View functions
function htmlBall(ball: Ball, isFood: boolean = false): string {
    let className: string;
    if (isFood) {
    className = "ball food";
} else {
    className = "ball snake";
}
    return `<img src="${ball.img}" class="${className}" style="left: ${ball.x}vw; top: ${ball.y}vh;">`;
}

function renderSnake(snake: Snake): void {
    try {
        const ballElement = document.getElementById("rootBall");
        if (!ballElement) throw new Error("Ball element not found");
        
        let html = "";
        snake.balls.forEach(ball => {
            html += htmlBall(ball, false);
        });
        
        ballElement.innerHTML = html;
    } catch (error) {
        console.error("Error rendering snake:", error);
    }
}

function renderFood(food: Food): void {
    try {
        const ballElement = document.getElementById("rootBall");
        if (!ballElement) throw new Error("Ball element not found");
        
        ballElement.innerHTML += htmlBall(food, true);
    } catch (error) {
        console.error("Error rendering food:", error);
    }
}

function renderGame(): void {
    renderSnake(gameState.snake);
    renderFood(gameState.food);
    console.log("Score: " + gameState.score + ", Snake length: " + gameState.snake.balls.length);
}

// Model functions
function getNewBallPosition(event: KeyboardEvent): void {
    const step = 5;
    const head = gameState.snake.balls[0];//הכדור הראשון של הנחש
    
    const previousPositions = gameState.snake.balls.map(ball => ({x: ball.x, y: ball.y}));//עבור על כל כדור וצור עותק
    
    switch (event.key) {
        case "ArrowUp":
            head.y -= step;
            break;
        case "ArrowDown":
            head.y += step;
            break;
        case "ArrowLeft":
            head.x -= step;
            break;
        case "ArrowRight":
            head.x += step;
            break;
        default:
            console.log("Invalid key pressed");
            return;
    }
    
    
    for (let i = 1; i < gameState.snake.balls.length; i++) {
        gameState.snake.balls[i].x = previousPositions[i - 1].x;
        gameState.snake.balls[i].y = previousPositions[i - 1].y;
    }
}

function checkFoodCollision(): boolean {
   const head = gameState.snake.balls[0];//לוקח את הכדור הראשון
    const distance = Math.sqrt(
       Math.pow(head.x - gameState.food.x, 2) + 
    Math.pow(head.y - gameState.food.y, 2)
    );
    
    return distance < 8;//אם המרחק קטן מ- 8 אז הנחש נגע באוכל
}

function eatFood(): void {//מוסיפה כדור כאשר בנחשאוכל הכדור
    const lastBall = gameState.snake.balls[gameState.snake.balls.length - 1];
    const newBall: Ball = {
        img: "./ball.webp",
        x: lastBall.x,
        y: lastBall.y
     };
    
    gameState.snake.balls.push(newBall);
    gameState.score += 1;
    
    generateNewFood();
}

function generateNewFood(): void {//יוצרת אוכל חדש במקום אקראי
    gameState.food.x = Math.floor(Math.random() * 90) + 5;
    gameState.food.y = Math.floor(Math.random() * 90) + 5;
    
    const tooClose = gameState.snake.balls.some(ball => //בודק שהאוכל לא על הנחש
        Math.abs(ball.x - gameState.food.x) < 10 && 
        Math.abs(ball.y - gameState.food.y) < 10
    );
    
    if (tooClose) {
        generateNewFood(); 
    }
}

// Controller functions
function handleKeyDown(event: KeyboardEvent): void {
    console.log("Key pressed:", event.key);
    
    
    getNewBallPosition(event);
    
    
    if (checkFoodCollision()) {
        eatFood();
    }
    
    
    renderGame();
}


renderGame();