const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');
const randomOnPageLoad = document.getElementById('randomOnPageLoad');
const reset = document.getElementById('reset');

fetch(`https://www.themealdb.com/api/json/v1/1/random.php
  `)
  .then((res) => res.json())
  .then((data) => {
    const meal = data.meals[0];
    addMealToDom(meal);
    randomOnPageLoad.innerHTML = `<h2>You might like this:</h2>`;
  });

// Search Meal and Fetch from API
function searchMeal(e) {
  // prevent default behaviour - prevent submit of form
  e.preventDefault();

  //  Clear single Meal
  single_mealEl.innerHTML = '';
  randomOnPageLoad.innerHTML = '';

  // Get Search input term
  const term = search.value;

  // With all forms need validation - check for empty input
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) //will return promise
      .then((res) => res.json()) //capture promise with .then() and gives response we need to format to JSON - returns another promise
      .then((data) => {
        //capture promise and gives us the data
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Results for "${term}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Search "${term}" does not exist:</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map((meal) => {
              return `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
              </div>
              </div>`;
            })
            .join(''); // need to join and convert to string after mapped over the data
        }
      });

    //   Clear Search text
    search.value = '';
  } else {
    alert(`please enter search term`);
  }
}

// FUNCTIONS

// Add meal to DOM
function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);

  single_mealEl.innerHTML = `
  <div class="single-meal">
  
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}


  </div>

  <div class="main">
  
  <p>Instructions: ${meal.strInstructions}</p>
  <h2> Ingredients</h2>
  <ul>
  ${ingredients
    .map((ing) => {
      return `<li>${ing}</li>`;
    })
    .join('')}
  
  </ul>
  ${meal.strSource ? `<p>Source: ${meal.strSource}</p>` : ''}
  ${meal.strYoutube ? `<p>Video: ${meal.strYoutube}</p>` : ''}
  </div>
  </div>`;
}
// Fetch Meal info by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
      console.log(meal);
    });
}
// Random Meal Fetch
function getRandomMeal(meal) {
  //   clear meals and headings
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  randomOnPageLoad.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php
  `)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}
// Fetch Categories
function getCategories(meal) {
  const categories = [];

  fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
// Fetch Filter by Categories
function filterByCategory(e) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
  `)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

// EVENT LISTENERS
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', (e) => {
  e.preventDefault();
  // run through each item in .meals element, if item has a classlist then will return only the item with a class list of "meal-info"
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains(`meal-info`);
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
reset.addEventListener('click', () => {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  single_mealEl.innerHTML = '';
  randomOnPageLoad.innerHTML = '';
});

// get categories and put them into a list
// loop through the categores data and create the html template

// select the item you want
// option to filter by category
