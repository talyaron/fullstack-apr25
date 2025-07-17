// Data structures
const fruitArray: Array<string> = ["apple.png", "bannana.png", "pear.png", "strewberry.png", "watermelon.png"]

interface Snake {
    img: string;
    x: number;
    y: number;
}
const snake: Snake = {
    img: "./img/snake/alive/left.png",
    x: 0,
    y: 0
};
const defult: Snake = {
    img: "./img/snake/alive/left.png",
    x: (6 * 50),
    y: (3 * 50)
};
interface Fruit {
    img: string;
    x: number;
    y: number;
}

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
        const fruit: Fruit = {
            img: `./img/fruits/${fruitArray[randomNum()]}`,
            x: (Math.floor(Math.random() * 13)) * 50,
            y: (Math.floor(Math.random() * 8)) * 50
        }
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
renderSnake(snake)
renderFruit()

//control
function handelKey(event: KeyboardEvent): void {

    console.log("Key pressed:", event.key);

    //model
    direction(event);

    //view
    renderSnake(snake)
}


//model
function direction(event: KeyboardEvent): void {
    const step = 50;
    switch (event.key) {
        case "ArrowUp":
            snake.y -= step;

            break;
        case "ArrowDown":
            snake.y += step;
            break;
        case "ArrowLeft":
            snake.x -= step;
            break;
        case "ArrowRight":
            snake.x += step;
            break;
        default:
            console.log("Invalid key pressed");
    }

}

function handlePlay(event) {
    snake.img = defult.img;
    snake.x = defult.x;
    snake.y = defult.y;

}
// function rotate(event: KeyboardEvent): void {
//     try {
//         const rotateImg = document.getElementById("snakeRoot");
//         if (!rotateImg) throw new Error("snakeRoot element not found");
//   switch (event.key) {
//         case "ArrowUp":
//             snake.y -= step;

//             break;
//         case "ArrowDown":
//             snake.y += step;
//             break;
//         case "ArrowLeft":
//             snake.x -= step;
//             break;
//         case "ArrowRight":
//             snake.x += step;
//             break;
//         default:
//             console.log("Invalid key pressed");
//     }
//         if (rotateImg instanceof HTMLDivElement) rotateImg.style.rotate = deg
//     } catch (error) {
//         console.error(error);
//     }
// }
function randomNum(): number {
    return Math.floor(Math.random() * 5)
}