const ball = document.getElementById('ball');
let ballX = 100;
let ballY = 100;
const moveStep = 15;
let isExploded = false;

function getScreenDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// Update ball position on screen
function updateBallPosition() {
  ball.style.top = ballY + 'px';
  ball.style.left = ballX + 'px';
}

//Movment
document.addEventListener('keydown', (e) => {
  // dont move if ball is exploded
  if (isExploded) return;

  const screen = getScreenDimensions();
  const ballSize = 80;
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

// Handle ball explosion on click
ball?.addEventListener('click', () => {
  if (isExploded) return; //  Prevent multiple clicks during explosion

  isExploded = true;

  //Change to explosion image/effect
   ball.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzgiIGZpbGw9IiNGRjY5MDAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMjgiIGZpbGw9IiNGRkE1MDAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMTgiIGZpbGw9IiNGRkREMDAiLz4KPHBhdGggZD0iTTQwIDEwTDQ1IDI1TDYwIDIwTDUwIDM1TDY1IDQ1TDUwIDQ1TDYwIDYwTDQ1IDU1TDQwIDcwTDM1IDU1TDIwIDYwTDMwIDQ1TDE1IDM1TDMwIDM1TDIwIDIwTDM1IDI1TDQwIDEwWiIgZmlsbD0iI0ZGRkYwMCIvPgo8L3N2Zz4K";
   ball.classList.add('explosion');

   //show explosion for 300ms, then hide for 2 seconds
   setTimeout(() => {
    ball.classList.add('hidden');

    //After 2 sec, reappears at ramdom position 
    setTimeout(() => {
      //generate random position
      const screen = getScreenDimensions();
      const ballSize = 80;

      ballX = Math.floor(Math.random() * (screen.width - ballSize));
      ballY = Math.floor(Math.random() * (screen.height - ballSize));

      // Reset ball appearance and position
      ball.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxwYXRoIGQ9Ik0yMCAyMEw2MCA2ME0yMCA2MEw2MCAyMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiLz4KPHN2Zz4K";
       ball.classList.remove('explosion', 'hidden');
       updateBallPosition();

        isExploded = false;
          }, 2000);
        }, 300);
    });

    window.addEventListener('resize', () => {
      const screen = getScreenDimensions();
      const ballSize = 80;

      //Ensure ball stays within bounds after resize 
       ballX = Math.min(ballX, screen.width - ballSize);
      ballY = Math.min(ballY, screen.height - ballSize);
       updateBallPosition();
    });

     // Initialize ball position
        updateBallPosition();

        // Prevent context menu on right click
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Add some keyboard shortcuts info
        document.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                const instructions = document.getElementById('instructions');
                instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
            }
        });
        
        console.log('Soccer Ball Game loaded! Press H to toggle instructions.');
