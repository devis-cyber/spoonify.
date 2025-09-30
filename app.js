const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const mealContainer = document.getElementById("meal-container");
const savedContainer = document.getElementById("saved-container");
const savedCount = document.getElementById("savedCount");

// ===== DISPLAY RANDOM MEALS =====
async function loadRandomMeals(count = 12) {
  mealContainer.innerHTML = "<p>Loading meals...</p>";
  try {
    const requests = Array.from({ length: count }, () =>
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(res => res.json())
    );
    const results = await Promise.all(requests);

    mealContainer.innerHTML = "";
    results.forEach(data => {
      if (data.meals) displayMeal(data.meals[0], mealContainer);
    });
  } catch (err) {
    mealContainer.innerHTML = "<p>Error loading meals.</p>";
    console.error(err);
  }
}

// ===== DISPLAY A MEAL CARD =====
function displayMeal(meal, container) {
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("meal");
  mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="meal-body">
      <h3>${meal.strMeal}</h3>
      <a href="recipe.html?id=${meal.idMeal}">View Recipe</a>
    </div>
  `;
  container.appendChild(mealDiv);
}

// ===== SEARCH MEALS =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  mealContainer.innerHTML = "<p>Searching...</p>";

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    mealContainer.innerHTML = "";

    if (data.meals) {
      data.meals.forEach(meal => displayMeal(meal, mealContainer));
    } else {
      mealContainer.innerHTML = "<p>No meals found.</p>";
    }
  } catch (err) {
    mealContainer.innerHTML = "<p>Error searching meals.</p>";
    console.error(err);
  }
});

// ===== LOAD SAVED RECIPES =====
function loadSavedRecipes() {
  const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  savedContainer.innerHTML = "";
  savedCount.textContent = saved.length;

  if (saved.length === 0) {
    savedContainer.innerHTML = "<p>No saved recipes yet.</p>";
    return;
  }

  saved.forEach(meal => displayMeal(meal, savedContainer));
}

// ===== INIT =====
loadRandomMeals();
loadSavedRecipes();
