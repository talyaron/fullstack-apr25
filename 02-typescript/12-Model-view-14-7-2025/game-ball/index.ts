// data 
interface Ball {
    img: string;
    x: number;
    y: number;
}

const ball: Ball = {
    img: "./ball.webp",
    x: 50,
    y: 50
};

// view functions

function htmlBall(ball: Ball): string {
    return `<img src="${ball.img}" class="ball" style="left: ${ball.x}vw; top: ${ball.y}vh;">`;
}

function renderBall(ball: Ball): void {
    try {
        const ballElement = document.getElementById("rootBall");
        if (!ballElement) throw new Error("Ball element not found");

        ballElement.innerHTML = htmlBall(ball);

    } catch (error) {
        console.error("Error rendering ball:", error);

    }
}

renderBall(ball);

// controller functions
function handleKeyDown(event: KeyboardEvent): void {
   
    console.log("Key pressed:", event.key);

    //model
    getNewBallPosition(event);

    //view
    renderBall(ball);
}

//model functions
function getNewBallPosition(event: KeyboardEvent): void {
    const step = 5; // pixels to move
    switch (event.key) {
        case "ArrowUp":
            ball.y -= step;
            break;
        case "ArrowDown":
            ball.y += step;
            break;
        case "ArrowLeft":
            ball.x -= step;
            break;
        case "ArrowRight":
            ball.x += step;
            break;
        default:
            console.log("Invalid key pressed");
    }
}