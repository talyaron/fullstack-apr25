// Data
interface User {
  name: string;
}

interface Theme {
  color: string;
}

// State
const user: User = { name: "" };
const theme: Theme = { color: "#ffffff" };

// Controller: Name Input
function handleNameChange(ev: Event): void {
  const input = ev.target as HTMLInputElement;
  user.name = input.value;
  renderNameCard(user);
}

// Controller: Color Picker
function handleColorChange(ev: Event): void {
  const input = ev.target as HTMLInputElement;
  theme.color = input.value;
  applyThemeColor(theme);
  renderColorDisplay(theme);
}

// View: HTML for name
function htmlNameCard(user: User): string {
  return `<div class="name-card">Hello, ${user.name || "..."}</div>`;
}

// View: Render name card
function renderNameCard(user: User): void {
  const root = document.getElementById("name-card");
  if (root) root.innerHTML = htmlNameCard(user);
}

// View: Apply theme color to body
function applyThemeColor(theme: Theme): void {
  document.body.style.backgroundColor = theme.color;
}

// View: Show selected color code
function renderColorDisplay(theme: Theme): void {
  const display = document.getElementById("color-display");
  if (display) display.textContent = `Theme Color: ${theme.color}`;
}

// Event listeners setup
document.getElementById("name-input")?.addEventListener("input", handleNameChange);
document.getElementById("color-picker")?.addEventListener("input", handleColorChange);
