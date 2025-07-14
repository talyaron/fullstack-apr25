window.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#my-btn");
  if (button instanceof HTMLButtonElement) {
    button.textContent = "Press me!";
    button.style.backgroundColor = "yellow";
    console.log("Button text changed to:", button.textContent);
  } else {
    console.log("Button not found");
  }
});
