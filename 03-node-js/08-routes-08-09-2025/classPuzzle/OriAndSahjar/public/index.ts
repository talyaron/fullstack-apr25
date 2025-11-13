document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm") as HTMLFormElement | null;

  form?.addEventListener("submit", (event) => {
    event.preventDefault(); // מונע את רענון הדף
    console.log("Form submitted!");
  });
});