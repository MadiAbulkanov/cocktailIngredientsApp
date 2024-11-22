document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".btn-outline-success");
  const btnPrimary = document.querySelectorAll("#btn-inf");

  const inputForm = document.querySelector(".form-control");

  const colorOverlay = document.querySelector(".color-overlay");
  const modalInformation = document.querySelector(".modal-information");
  const btnClose = document.querySelector(".btn-close");

  async function modalWindow() {
    const inputValue = inputForm.value.trim();

    if (inputValue !== '') {
        cocktailInfoBySearch();
        popupModal(); 
    }
  };

  async function cocktailInfoBySearch() {
    const ingredients = document.querySelector(".ingredients");
    const modalText = document.querySelector(".modal-text");
    const category = document.querySelector(".category");
    const type = document.querySelector(".type");
    const glass = document.querySelector(".glass");

    ingredients.innerHTML = "";
    modalText.textContent = "";

    const inputValue = inputForm.value;
    const cotailInfoUrl = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    const respons = await cotailInfoUrl.json();
    const drinksArray = respons.drinks[0];
    const instruction = drinksArray.strInstructions;
    modalText.textContent = instruction;
    category.textContent = drinksArray.strCategory;
    type.textContent = drinksArray.strAlcoholic;
    glass.textContent = drinksArray.strGlass;

    for (let key in drinksArray) {
        if (key.startsWith("strIngredient") && drinksArray[key] !== null) {
            const drinks = drinksArray[key];
            const measureKey = key.replace("strIngredient", "strMeasure");
            const measure = drinksArray[measureKey];

            const ingredient = document.createElement("li");
            ingredient.className = "ingredient";
            ingredient.innerHTML = `<img src="https://www.thecocktaildb.com/images/ingredients/${drinks}-Small.png" alt="" /><p>${drinks}</p><span>(${measure})</span>`;
            ingredients.appendChild(ingredient);  
        }
    }
  };

  async function coctailInfo(event) {
    const ingredients = document.querySelector(".ingredients");
    const modalText = document.querySelector('.modal-text');
    const category = document.querySelector(".category");
    const type = document.querySelector(".type");
    const glass = document.querySelector(".glass");

    ingredients.innerHTML = "";
    modalText.textContent = "";

    const parentElement = event.target.parentElement;
    const firstChild = parentElement.firstElementChild;
    const cardTitle = firstChild.textContent
  
    const cotailInfoUrl = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cardTitle}`);
    const respons = await cotailInfoUrl.json();
    const drinksArray = respons.drinks[0];
    const instruction = drinksArray.strInstructions;
    modalText.textContent = instruction;
    category.textContent = drinksArray.strCategory;
    type.textContent = drinksArray.strAlcoholic;
    glass.textContent = drinksArray.strGlass;

    for (let key in drinksArray) {
        if (key.startsWith("strIngredient") && drinksArray[key] !== null) {
            const drinks = drinksArray[key];
            const measureKey = key.replace("strIngredient", "strMeasure");
            const measure = drinksArray[measureKey];

            const ingredient = document.createElement("li");
            ingredient.className = "ingredient";
            ingredient.innerHTML = `<img src="https://www.thecocktaildb.com/images/ingredients/${drinks}-Small.png" alt=""/><p>${drinks}</p><span>(${measure})</span>`;
            ingredients.appendChild(ingredient);
        }
    }
    popupModal();
  };

  function popupModal() {
    colorOverlay.style.display = "block";
    modalInformation.style.display = "block";
  };

  function hidingModal() {
    colorOverlay.style.display = "none";
    modalInformation.style.display = "none";
  };

  searchButton.addEventListener("click", modalWindow);
  btnClose.addEventListener("click", hidingModal);

  btnPrimary.forEach((button) => {
    button.addEventListener("click", coctailInfo);
  });
});