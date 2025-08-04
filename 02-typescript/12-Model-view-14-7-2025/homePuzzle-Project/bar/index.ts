const ball = document.getElementById('ball');
let ballX = 100;
let ballY = 100;
const moveStep = 10;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

//Movment
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            ballY = Math.max(0, ballY - moveStep);
            break;
            case 'ArrowDown':
                ballY = Math.min(screenHeight - 80, ballY + moveStep);
            break;
            case 'ArrowLeft':
                ballX = Math.max(0, ballX - moveStep);
            break;
            case 'ArrowRight':
                ballX = Math.min(screenWidth - 80, ballX + moveStep);
                break;
    }
    updateBallposition();
});

function updateBallposition() {
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
}

const moveStep = 10;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Movement
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      ballY = Math.max(0, ballY - moveStep);
      break;
    case 'ArrowDown':
      ballY = Math.min(screenHeight - 80, ballY + moveStep);
      break;
    case 'ArrowLeft':
      ballX = Math.max(0, ballX - moveStep);
      break;
    case 'ArrowRight':
      ballX = Math.min(screenWidth - 80, ballX + moveStep);
      break;
  }
  updateBallPosition();
});

function updateBallPosition() {
  ball.style.top = ballY + 'px';
  ball.style.left = ballX + 'px';
}

// Explosion on click
ball.addEventListener('click', () => {
  ball.src = 'explosion.png'; // Change to explosion image
  setTimeout(() => {
    ball.style.display = 'none';
    setTimeout(() => {
      // Reposition ball at random spot
      ballX = Math.floor(Math.random() * (screenWidth - 80));
      ballY = Math.floor(Math.random() * (screenHeight - 80));
      updateBallPosition();

      ball.src = 'ball.png.jpeg'; // Reset back to ball image
      ball.style.display = 'block';
    }, 2000);
  }, 200);
});
