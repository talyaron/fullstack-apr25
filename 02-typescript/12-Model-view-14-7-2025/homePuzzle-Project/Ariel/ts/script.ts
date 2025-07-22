// data
interface bombGametool {
  img: string
  x: number
  y: number
  isExploded: boolean;
}

const bomb: bombGametool = {
  img: "./img/1570429632bomb.png",
  x: 45, 
  y: 40,
  isExploded: false
}



// view functions
function htmlCreator(bomb: bombGametool): string {
  return `<img src=" ${bomb.img}" class="bomb" style="right: ${bomb.x}vw; top: ${bomb.y}vh;" alt="Game tool">`
}

function renderBombGameTool(bomb: bombGametool):void {
  const rootBomb = document.getElementById("root-bomb")

  try {
    if(!rootBomb) throw new Error("BombElement not found!");

    rootBomb.innerHTML = htmlCreator(bomb)
  }
  catch (e) {console.error(e);}
}

renderBombGameTool(bomb)



// controller functions
function handleKeyDown(event: KeyboardEvent): void {
  console.log(`key pressed: ${event.key}`);

  getNewBombPosition(event) //model update
  renderBombGameTool(bomb) // view update
}

function getNewBombPosition(event: KeyboardEvent):void {
  const stepY = 5
  const stepX = 2.5

  switch(event.key){
    case "ArrowUp":
      bomb.y -= stepY
      break;

    case "ArrowDown":
      bomb.y += stepY;
      break;
  
    case "ArrowLeft":
      bomb.x += stepX;
      break;
    
    case "ArrowRight":
      bomb.x -= stepX;
      break;

    default:
      console.log("Invalid key pressed");
  }
}

function handleMouseClick(event: MouseEvent): void {
  console.log(`mouse button pressed: ${event.button}`)
  
  if (event.button === 0) {
    if (!bomb.isExploded) {
      bomb.isExploded = true
      bomb.img = "./img/893566-middle.png" 
      console.log("explode!")

      setTimeout(() => {
        bomb.img = "./img/1570429632bomb.png"
        bomb.isExploded = false
        console.log("The bomb is back in 2s")
        renderBombGameTool(bomb)
      }, 2000)
    } else {
      bomb.isExploded = false
      bomb.img = "./../img/1570429632bomb.png"
      console.log("not explode!")
    }
    
    renderBombGameTool(bomb)
  }
}

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('mousedown', handleMouseClick)