


// ====== Type definitions ======
interface ApiResponse {
  error?: string;
  message?: string;
}

interface UserData {
  userId: string;
  amountOfGames: number;
  amountOfVictories: number;
}

// ====== DOM references ======
const board = document.getElementById('board') as HTMLDivElement;
const keyboard = document.getElementById('keyboard') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const newGameBoard = document.getElementById("newGameWrapper") as HTMLDivElement
const successDiv = document.getElementById('success') as HTMLDivElement;

// ====== Constants ======
const ROWS = 6;
const COLS = 5;
let SECRET = "PLANT";
//===== Game state ======
let currentRow = 0;
let currentCol = 0;
let isGameOver = false;

// ====== User Data API Functions ======
async function getUserData(): Promise<UserData | null> {
  try {
    const response = await fetch(`/data/get-user-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get user data');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch user data:", err);
    return null;
  }
}

async function reportGameResult(won: boolean): Promise<void> {
  try {
    await fetch("/data/report-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ won }),
    });

    localStorage.setItem("lb-refresh", String(Date.now()));
  } catch (error) {
    console.error("Failed to report game result:", error);
  }
}


async function updateUserData(amountOfGames: number, amountOfVictories: number): Promise<UserData | null> {
  try {
    const response = await fetch("http://localhost:3000/data/update-data", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amountOfGames,
        amountOfVictories
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user data');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to update user data:", err);
    return null;
  }
}

// ====== Fetch random word ======
async function getRandomWord(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/words/get-random-word", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get random word');
    }

    const data = await response.json();
    const newword = data[0].word.toUpperCase();
    SECRET = newword;
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
const keyRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM⌫"];

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

// ====== Update keyboard colors ======
function updateKeyboardColors(guess: string, colorArr: string[]): void {
  const guessArr = guess.split("");

  guessArr.forEach((letter, index) => {
    const keyButton = Array.from(keyboard.querySelectorAll('.key')).find(
      (btn) => btn.textContent === letter
    ) as HTMLButtonElement;

    if (!keyButton) return;

    const currentColor = keyButton.style.backgroundColor;
    const newColor = colorArr[index];

    // Priority: green > gold > dark gray (wrong letter)
    // Don't downgrade a green key to gold or gray
    if (currentColor === 'rgb(106, 170, 100)') return; // Already green
    if (currentColor === 'rgb(201, 180, 88)' && newColor === 'gray') return; // Don't downgrade gold to gray

    if (newColor === 'green') {
      keyButton.style.backgroundColor = '#6aaa64';
      keyButton.style.color = 'white';
    } else if (newColor === 'gold') {
      keyButton.style.backgroundColor = '#c9b458';
      keyButton.style.color = 'white';
    } else if (newColor === 'gray') {
      // Dark gray for wrong letters (not in word at all)
      keyButton.style.backgroundColor = '#3a3a3c';
      keyButton.style.color = 'white';
    }
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

async function resetGame(): Promise<void> {
  // clear board color from previous game
  Array.from(board.children).forEach((tile) => {
    const el = tile as HTMLElement;
    el.textContent = "";
    el.style.backgroundColor = "";
    el.style.color = "";
    el.style.borderColor = ""; // ✅ Clear border color
    el.style.animation = ""; // Clear animation
    el.style.removeProperty('background-color');
    el.style.removeProperty('color');
    el.style.removeProperty('border-color');
  });

  // Reset keyboard colors completely
  Array.from(keyboard.querySelectorAll('.key')).forEach((key) => {
    const btn = key as HTMLButtonElement;
    btn.style.backgroundColor = '';
    btn.style.color = '';
    btn.style.removeProperty('background-color');
    btn.style.removeProperty('color');
  });

  currentRow = 0;
  currentCol = 0;
  isGameOver = false;
  successDiv.style.display = "none";
  errorDiv.style.display = "none";
  newGameBoard.style.display = "none";
  await getRandomWord(); // Fetch new random word
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
async function checkGuess(): Promise<void> {
  const tiles = getRowTiles(currentRow);
  const guess = tiles.map((t) => t.textContent || "").join("");

  if (guess.length < COLS) {
    showMessage("Not enough letters!");
    return;
  }
  // ✅ Check if word exists in database
  const wordExists = await checkIfWordExists(guess.toUpperCase());
  if (!wordExists) {
    return; // Stop here if word doesn't exist
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

  // Apply colors to tiles with flip animation
  tiles.forEach((tile, i) => {
    setTimeout(() => {
      // Start flip animation
      tile.style.animation = "flip 0.6s ease";

      // Change color halfway through flip (at 0.3s)
      setTimeout(() => {
        tile.style.backgroundColor =
          colorArr[i] === "green"
            ? "#6aaa64"
            : colorArr[i] === "gold"
              ? "#c9b458"
              : "#787c7e";
        tile.style.color = "white";
        tile.style.borderColor = colorArr[i] === "green" ? "#6aaa64" : colorArr[i] === "gold" ? "#c9b458" : "#787c7e";
      }, 300); // Halfway through the 600ms flip

    }, i * 200); // Stagger each tile by 200ms
  });

  // Calculate total animation time (last tile starts + flip duration)
  const totalAnimationTime = (COLS - 1) * 200 + 600;

  // Update keyboard colors after all tiles finish flipping
  setTimeout(() => {
    updateKeyboardColors(guess, colorArr);
  }, totalAnimationTime);

  // Game result - check after all animations complete
  setTimeout(async () => {
    const isWin = guess === SECRET;
    const isGameEnd = isWin || currentRow === ROWS - 1;

    if (isGameEnd) {
      await reportGameResult(isWin);
    }

    if (isWin) {
      // successDiv.textContent =
      // successDiv.style.display = "block";
      isGameOver = true;
      newGame(`🎉 Correct! The word was ${SECRET}`);
    } else if (currentRow === ROWS - 1) {
      // errorDiv.textContent = `❌ Wrong! The word was ${SECRET}. Try again!`;
      // errorDiv.style.display = "block";
      isGameOver = true;
      newGame(`❌ Wrong! The word was ${SECRET}. Try again!`);
    } else {
      currentRow++;
      currentCol = 0;
    }
  }, totalAnimationTime);
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
  // Get userId from localStorage or session

  await getRandomWord();
  createBoard();
  createKeyboard();

  // ====== Give Up button ======
  const giveUpBtn = document.getElementById("giveUpBtn");
  if (giveUpBtn) {
    giveUpBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      isGameOver = true;
      await reportGameResult(false);
      newGame(`💡 You gave up! The word was ${SECRET}.`);
    });
  }

  // ====== Logout button ======
  const logoutLink = document.querySelector('.link a[href="login.html"]') as HTMLAnchorElement | null;
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      // redirect
      window.location.href = "../index.html";
    });
  }
});
function newGame(message: string): void {
  try {

    newGameBoard.style.display = "flex"
    newGameBoard.innerHTML = newGameHtml(message)

  } catch (error) {
    console.error("error in new game function:", error)
  }
}
function newGameHtml(mamessage: string): string {
  return `
    <div class="end-game-box">
    <div class="end-game-box_message">${mamessage}
    </div>
    <button class="end-game-box_button"  onclick="resetGame()">NEW GAME</button>
  </div>
`
}
async function checkIfWordExists(word: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:3000/words/check-if-exist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    });
    const { exist } = await response.json();

    if (!exist) {
      wordDoesNotExist();
      return false;
    }
    return true;

  } catch (error) {
    console.error('Error checking if word exists:', error);
    throw error;
  }
}
function wordDoesNotExist(): void {
  // Get current row tiles
  const tiles = getRowTiles(currentRow);

  // Show error message
  errorDiv.textContent = "Word not in list!";
  errorDiv.style.display = "block";
  errorDiv.style.color = "#ff6b6b";

  // Add shake animation to current row
  tiles.forEach((tile) => {
    tile.style.animation = "shake 0.25s ease";
  });

  // Remove animation after it completes
  setTimeout(() => {
    tiles.forEach((tile) => {
      tile.style.animation = "";
    });
  }, 500);

  // Hide error message after 2 seconds
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 2000);
}

