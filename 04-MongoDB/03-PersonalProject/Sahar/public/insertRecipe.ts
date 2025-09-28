interface User {
    _id: string;
    name: string;
    password: string;
    role: string;
}
interface Recipe {
    _id: string;
    title: string;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: string;
    imageUrl?: string;
    user: string; // user name
}

const form = document.getElementById("recipeForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const instructionsInput = document.getElementById("instructions") as HTMLTextAreaElement;
const imageUrlInput = document.getElementById("imageUrl") as HTMLInputElement;
const ingredientNameInput = document.getElementById("ingredientName") as HTMLInputElement;
const ingredientQuantityInput = document.getElementById("ingredientQuantity") as HTMLInputElement;
const ingredientUnitSelect = document.getElementById("ingredientUnit") as HTMLSelectElement;
// const recipesDiv = document.getElementById("recipes") as HTMLDivElement;
const addIngredientButton = document.getElementById("addIngredient") as HTMLButtonElement;

let ingredientList: { name: string; quantity: number; unit: string }[] = [];

addIngredientButton.addEventListener("click", () => {
  const ingredient = {
    name: ingredientNameInput.value,
    quantity: Number(ingredientQuantityInput.value),
    unit: ingredientUnitSelect.value
  };
  ingredientList.push(ingredient);

  ingredientNameInput.value = "";
  ingredientQuantityInput.value = "";
  ingredientUnitSelect.value = "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRecipe = {
    title: titleInput.value,
    description: descriptionInput.value,
    instructions: instructionsInput.value,
    imageUrl: imageUrlInput.value,
    user: "sahar",
    ingredients: ingredientList
  };

  try {
    const res = await fetch("http://localhost:3000/api/recipe/post/create-recipe", {
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
    recipesDiv.innerHTML += `
      <div>
        <h3>${savedRecipe.title}</h3>
        <p>${savedRecipe.description}</p>
        <small>${savedRecipe.instructions}</small>
      </div>
    `;
    
    form.reset();
    ingredientList = [];
  } catch (error) {
    console.error(error);
  }
});