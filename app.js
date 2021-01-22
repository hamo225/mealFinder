const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

// Search Meal and Fetch from API

function searchMeal(e) {
  // prevent default behaviour - prevent submit of form
  e.preventDefault();

  //  Clear single Meal
  single_mealEl.innerHTML = '';

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
  //  hit the end point

  // loop through them and then putput in the dom
}

// Event listeners
submit.addEventListener('submit', searchMeal);
