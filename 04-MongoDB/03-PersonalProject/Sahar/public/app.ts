interface User {
    _id: string;
    name: string;
    password: string;
    role: string;
}
interface Recipe {
    _id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    imageUrl?: string;
    createdBy: string; // user ID
}

// script.ts
const form = document.getElementById("recipeForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const instructionsInput = document.getElementById("instructions") as HTMLTextAreaElement;
const recipesDiv = document.getElementById("recipes") as HTMLDivElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRecipe = {
    title: titleInput.value,
    description: descriptionInput.value,
    instructions: instructionsInput.value,
    // בהמשך תוסיף גם ingredients
  };

  try {
    const res = await fetch("http://localhost:3000/api/recipe/get/all-recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    if (!res.ok) {
      throw new Error("Failed to save recipe");
    }

    const savedRecipe = await res.json();
    console.log("Saved:", savedRecipe);

    // הצגה על המסך
    const recipeElement = document.createElement("div");
    recipeElement.innerHTML = `<h3>${savedRecipe.title}</h3><p>${savedRecipe.description}</p>`;
    recipesDiv.appendChild(recipeElement);

    form.reset();
  } catch (error) {
    console.error(error);
  }
});