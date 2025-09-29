
const getAllRecipes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/recipe/get/all-recipes");
    const recipes = await res.json();
    displayRecipes(recipes); // כאן מצייר על המסך
    attachDeleteHandlers(); // Attach delete handlers after rendering
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

getAllRecipes(); // רק מפעיל, לא console.log

const recipesDiv = document.getElementById("recipes") as HTMLDivElement;
function displayRecipes(recipes: any) {
  if (recipesDiv) {
    recipesDiv.innerHTML = recipes
      .map(
        (recipe: any) => `
      <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4 recipe-cards">
    <div class="recipe-card">
    <button class="btn btn-primary" id="editBtn">Edit</button>
    <button class="btn btn-danger deleteBtn" data-id="${recipe._id}">Delete</button>     <div class="card">
      <img src="..." class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${recipe.title}</h5>
        <h6 class="card-title">${recipe.description}</h6>

      <p class="card-text">${recipe.instructions}</p>
      <h6>Ingredients:</h6>
      <ul>
        ${recipe.ingredients
          .map(
            (ing: any) => `
          <li>${ing.quantity} ${ing.unit} - ${ing.name}</li>
        `
          )
          .join("")}
      </ul>
     </div>
    </div>
  </div>
   </div>
  </div>


        `
      )
      .join("");
  }
}



function attachDeleteHandlers() {
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = (e.target as HTMLElement).getAttribute("data-id");
      if (id) {
        await fetch(`http://localhost:3000/api/recipe/delete/delete-recipe/${id}`, {
          method: "DELETE",
        });
        getAllRecipes(); // רענון הרשימה אחרי מחיקה
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getAllRecipes();
});
