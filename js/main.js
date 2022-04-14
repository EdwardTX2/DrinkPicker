//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

const select = document.querySelector('.drinks')

function getFetch(){
  const choice = document.querySelector('input').value
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        drinksArray = data.drinks
        for (let i=0; i < drinksArray.length; i++) {
          const option = document.createElement('option')
          option.value = drinksArray[i].strDrink
          option.innerText = drinksArray[i].strDrink
          select.appendChild(option)
        }
      })
}

select.addEventListener('change', event => {
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`
  console.log(event.target.value)
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data.drinks[0])
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('.instructions').innerText = data.drinks[0].strInstructions
      strIngredients = ""

      let index = 1
      while (data.drinks[0]["strIngredient" + index]) {
        let measure = data.drinks[0]["strMeasure" + index];
        let ingredient = data.drinks[0]["strIngredient" + index];
        let measureIngredient = measure ? measure + " " + ingredient : ingredient
        if (strIngredients == "") {
          strIngredients = measureIngredient
        } else {
          strIngredients += ", " + measureIngredient
        }
        index++
      }
      document.querySelector('.ingredients').innerText = strIngredients
    })
})