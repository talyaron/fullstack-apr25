// ====== Type definitions ======
interface ApiResponse {
  error?: string;
  message?: string;
}

// ====== DOM references ======
const board = document.getElementById('board') as HTMLDivElement;
const keyboard = document.getElementById('keyboard') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const successDiv = document.getElementById('success') as HTMLDivElement;

// ====== Constants ======
const ROWS = 6;
const COLS = 5;
let SECRET = "PLANT";

let currentRow = 0;
let currentCol = 0;
let isGameOver = false;

// ====== Fetch random word ======
async function getRandomWord(): Promise<void> {
  try {
    const res = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await res.json();
    if (Array.isArray(data) && data[0]) {
      SECRET = data[0].toUpperCase();
      console.log("🔤 New word:", SECRET);
    }
  } catch (err) {
    console.warn("⚠️ Failed to fetch word. Using default.");
  }
}

// ====== Build board ======
function createBoard(): void {
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    board.appendChild(tile);
  }
}

// ====== Build keyboard ======
const keyRows = ["QWERTYUIOP", "ASDFGHJKL", "ENTERZXCVBNM⌫"];

function createKeyboard(): void {
  keyRows.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('k-row');

    for (const key of row) {
      const keyBtn = document.createElement('button');
      keyBtn.classList.add('key');
      if (key === "ENTER") keyBtn.classList.add('wide');
      if (key === "⌫") keyBtn.classList.add('icon');
      keyBtn.textContent = key;
      keyBtn.addEventListener('click', () => handleKeyInput(key));
      rowDiv.appendChild(keyBtn);
    }
    keyboard.appendChild(rowDiv);
  });
}

// ====== Helpers ======
function getRowTiles(row: number): HTMLElement[] {
  const start = row * COLS;
  return Array.from(board.children).slice(start, start + COLS) as HTMLElement[];
}

function showMessage(msg: string, color = "red"): void {
  errorDiv.textContent = msg;
  errorDiv.style.display = "block";
  errorDiv.style.color = color;
  setTimeout(() => (errorDiv.style.display = "none"), 2000);
}

function resetGame(): void {
  Array.from(board.children).forEach((tile) => {
    const el = tile as HTMLElement;
    el.textContent = "";
    el.style.backgroundColor = "#fff";
    el.style.color = "#000";
  });

  currentRow = 0;
  currentCol = 0;
  isGameOver = false;
  successDiv.style.display = "none";
  errorDiv.style.display = "none";

  getRandomWord(); // new random word every time
}

// ====== Main logic ======
function handleKeyInput(key: string): void {
  if (isGameOver) return;

  if (key === "ENTER") {
    if (currentCol < COLS) {
      showMessage("Not enough letters!");
      return;
    }
    checkGuess();
    return;
  }

  if (key === "⌫") {
    if (currentCol > 0) {
      currentCol--;
      const tiles = getRowTiles(currentRow);
      tiles[currentCol].textContent = "";
    }
    return;
  }

  if (/^[A-Z]$/.test(key)) {
    if (currentCol < COLS) {
      const tiles = getRowTiles(currentRow);
      tiles[currentCol].textContent = key.toUpperCase();
      currentCol++;
    }
  }
}

// ====== Check guess ======
function checkGuess(): void {
  const tiles = getRowTiles(currentRow);
  const guess = tiles.map((t) => t.textContent || "").join("");

  if (guess.length < COLS) {
    showMessage("Not enough letters!");
    return;
  }

  const secretArr = SECRET.split("");
  const guessArr = guess.split("");
  const colorArr: string[] = Array(COLS).fill("gray");

  // Green (correct letter & place)
  for (let i = 0; i < COLS; i++) {
    if (guessArr[i] === secretArr[i]) {
      colorArr[i] = "green";
      secretArr[i] = "_";
      guessArr[i] = "*";
    }
  }

  // Yellow (letter exists elsewhere)
  for (let i = 0; i < COLS; i++) {
    if (colorArr[i] === "gray" && secretArr.includes(guessArr[i])) {
      colorArr[i] = "gold";
      secretArr[secretArr.indexOf(guessArr[i])] = "_";
    }
  }

  // Apply colors
  tiles.forEach((tile, i) => {
    tile.style.backgroundColor =
      colorArr[i] === "green"
        ? "#6aaa64"
        : colorArr[i] === "gold"
        ? "#c9b458"
        : "#787c7e";
    tile.style.color = "white";
    tile.style.transition = "background-color 0.3s ease";
  });

  // Game result
  if (guess === SECRET) {
    successDiv.textContent = `🎉 Correct! The word was ${SECRET}`;
    successDiv.style.display = "block";
    isGameOver = true;
    setTimeout(resetGame, 3000);
  } else if (currentRow === ROWS - 1) {
    errorDiv.textContent = `❌ Wrong! The word was ${SECRET}. Try again!`;
    errorDiv.style.display = "block";
    isGameOver = true;
    setTimeout(resetGame, 3000);
  } else {
    currentRow++;
    currentCol = 0;
  }
}

// ====== Physical keyboard support ======
window.addEventListener("keydown", (e: KeyboardEvent) => {
  const key = e.key.toUpperCase();

  if (["ENTER", "BACKSPACE"].includes(key)) e.preventDefault();

  if (key === "BACKSPACE") handleKeyInput("⌫");
  else if (key === "ENTER") handleKeyInput("ENTER");
  else if (/^[A-Z]$/.test(key)) handleKeyInput(key);
});

// ====== Start game ======
document.addEventListener("DOMContentLoaded", async () => {
  await getRandomWord();
  createBoard();
  createKeyboard();
});
