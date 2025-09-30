const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");
const recipeContainer = document.getElementById("recipe-container");

async function loadRecipe() {
  if (!mealId) return;
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    const meal = data.meals[0];

    recipeContainer.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join("")}
      </ul>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      <button id="saveRecipeBtn">💾 Save Recipe</button>
    `;

    document.getElementById("saveRecipeBtn").addEventListener("click", () => {
      saveRecipe(meal);
    });
  } catch (err) {
    recipeContainer.innerHTML = "<p>Error loading recipe.</p>";
    console.error(err);
  }
}

function getIngredients(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
}

function saveRecipe(meal) {
  let saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (!saved.find(item => item.idMeal === meal.idMeal)) {
    saved.push({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb
    });
    localStorage.setItem("savedRecipes", JSON.stringify(saved));
    alert("✅ Recipe saved!");

    // update count immediately
    updateSavedCount();
  } else {
    alert("⚠️ Already saved!");
  }
}

function updateSavedCount() {
  const count = JSON.parse(localStorage.getItem("savedRecipes")).length;
  // If index.html is open, update its counter
  if (window.opener && window.opener.document.getElementById("savedCount")) {
    window.opener.document.getElementById("savedCount").textContent = count;
  }
}

loadRecipe();
