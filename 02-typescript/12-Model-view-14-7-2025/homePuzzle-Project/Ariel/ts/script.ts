// data -> rearrange all data
interface bombGametool {
  img: string
  x: number
  y: number
}

const bomb: bombGametool = {
  img: "./../img/1570429632bomb.png",
  x: 45,
  y: 40
}
//
//
//
// view functions -> show to where it need it (to the player)

// create img tag and used to change thee code every time (the player will play and press any arrow button(from control lines), then what he will did execute every press but actually change next lines!)
function renderBomb(bomb: bombGametool): string {
  return `<img src=" ${bomb.img}" class="bomb" style="right: ${bomb.x}vw; top: ${bomb.y}vh;" alt="">`
}

// bridge btw type script all situations and put them on the html file
function renderBombGameTool(bomb: bombGametool):void {
  const rootBomb = document.getElementById("root-bomb")

  try {
    if(!rootBomb) throw new Error("BombElement not found!");

    rootBomb.innerHTML = renderBomb(bomb)
  }
  catch (e) {console.error(e);}
}

renderBombGameTool(bomb)

//
//
//
// controller functions
function handleKeyDown(event: KeyboardEvent): void {
  console.log(`key pressed: ${event.key}`);

  getNewBombPosition(event) //model(getting data - which key was pressed)

  renderBombGameTool(bomb) // view (push to th player what we recieved from his event clicks while hndaleKeyDown start all the wheel here(ts functions))
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

function handleMouseClick(press: MouseEvent) {
  console.log(`key pressed: ${press.button}`);
  

}

