const getAllRecipes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/recipe/get/all-recipes");
    const recipes = await res.json();
    displayRecipes(recipes); // כאן מצייר על המסך
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
       
<div class="row row-cols-1 row-cols-md-2 g-4">

          <div class="col">
     <div class="card">
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


        `
      )
      .join("");
  }
}

console.log(getAllRecipes());
