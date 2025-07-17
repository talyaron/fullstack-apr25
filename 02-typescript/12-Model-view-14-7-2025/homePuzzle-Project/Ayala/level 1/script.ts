// data 
interface Ball {

    x: number;
    y: number;
}

const ball: Ball = {

    x: 50,
    y: 50
};

// view functions

function htmlBall(ball: Ball): string {
    return `<div id="ball" style="left: ${ball.x}px; top:${ball.y}px;"></div>`;
}

function renderBall(ball: Ball): void {
    try {
        debugger
        const ballElement = document.getElementById("ballRoot");
        if (!ballElement) throw new Error("Ball element not found");

        ballElement.innerHTML = htmlBall(ball);

    } catch (error) {
        console.error("Error rendering ball:", error);

    }
}

renderBall(ball);

// controller functions
function hendlePressingKey(event: KeyboardEvent): void {

    console.log("Key pressed:", event.key);

    //model
    getNewBallPosition(event);

    //view
    renderBall(ball);
}

//model functions
function getNewBallPosition(event: KeyboardEvent): void {
    const step = 20; // pixels to move
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