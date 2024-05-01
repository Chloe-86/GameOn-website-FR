function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalFinish = document.querySelector(".modalFinish");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("form");
const btnClose = document.querySelector(".btn-close");
const modalBtnClose = document.querySelectorAll(".close, .btn-close");
const modalBody = document.querySelector('.modal-body');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function isValid(value, validationFunction, errorSpan) {
  const isValidValue = validationFunction(value);
  const isValid = isValidValue === true; // Si la fonction de validation retourne explicitement true, considérons que la valeur est valide
  if (!isValid) {
    errorSpan.style.display = "block"; // Affichage du bloc d'erreur si la validation échoue
  } else {
    errorSpan.style.display = "none"; // Cachage du bloc d'erreur si la validation réussit
  }
  return isValid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Les inputs des champs
  const firstName = document.querySelector("#first").value.trim();
  const lastName = document.querySelector("#last").value.trim();
  const emailValue = document.querySelector("#email").value.trim();
  const birthdayValue = document.querySelector("#birthday").value.trim();
  const quantityValue = parseInt(
    document.querySelector("#quantity").value.trim(),
    10
  );
  let isCheckboxChecked = document.querySelector("#checkbox1");

  // Les spans des erreurs des champs
  const spanFirst = document.querySelector("#nickName span");
  const spanLast = document.querySelector("#name span");
  const emailSpan = document.querySelector("#checkEmail span");
  const birthDaySpan = document.querySelector("#checkBirthday span");
  const quantitySpan = document.querySelector("#checkQuantity span");
  const checkboxConditions = document.querySelector(
    "#checkboxConditions small"
  );
  const locationSmall = document.querySelector("#locations small");



  
  // Fonctions de validation pour chaque champ

  // Verifier le prenom
  function validateFirstName(firstName) {
    return firstName.length >= 2;
  }
  // Verifier le nom
  function validateLastName(lastName) {
    return lastName.length >= 2;
  }

  // Verifier  l'e-mail
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Verifier l'anniversaire
  function validateBirthday(birthdayValue) {
    birthdayValue = birthdayValue === "";
    return !birthdayValue;
  }

  // Verifier la quantite
  function validateQuantity(quantityValue) {
    return !isNaN(quantityValue);
  }

  //valider la checkbox
  function validateCheckbox(isCheckboxChecked) {
    isCheckboxChecked = isCheckboxChecked.checked;
    return isCheckboxChecked;
  }

  //Verifier pour les locations
  // let valeurs = [];
  // for (let i = 1; i <= 6; i++) {
  //   valeurs.push(document.getElementById(`location${i}`).checked);
  
  //   console.log(document.getElementById(`location${i}`).value)
  // }
  const checked = document.querySelector('input[name="location"]:checked');

  let checkedValue = null;
  if(checked){
    checkedValue = document.querySelector('input[name="location"]:checked').value;
  }


  function validateLocation(checked) {
    return checked !== null;
  }

  // Valider chaque champ et afficher les erreurs si nécessaire
  const isFirstNameValid = isValid(firstName, validateFirstName, spanFirst);
  const isLastNameValid = isValid(lastName, validateLastName, spanLast);
  const isEmailValid = isValid(emailValue, validateEmail, emailSpan);
  const isValidateQuantity = isValid(
    quantityValue,
    validateQuantity,
    quantitySpan
  );
  const isValidateBirthday = isValid(
    birthdayValue,
    validateBirthday,
    birthDaySpan
  );
  const isValidateChecked = isValid(
    isCheckboxChecked,
    validateCheckbox,
    checkboxConditions
   );
  const isValidateLocation = isValid(
    checked,
    validateLocation,
    locationSmall
  );
  
  console.log(`nom: ${firstName}, prenom: ${lastName}, email: ${emailValue}, date de naissance ${birthdayValue}, Nombre de tournois: ${quantityValue}, ville du tournoi : ${checkedValue}`)
  
  // Si tous les champs sont valides, soumettre le formulaire
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isValidateQuantity &&
    isValidateBirthday &&
    isValidateChecked &&
    isValidateLocation
  ) {
  
    // event.preventDefault();

    // //cacher la modale de formulaire
    modalBody.style.display = "none";

    // //afficher la modale de remerciement
    modalFinish.style.display = "block";
    form.reset();
  }

  document.querySelector('body > main > div.bground > div > div.modalFinish > input').addEventListener('click', ()=>{
    modalFinish.style.display = "none";
    modalBody.style.display = "block";
  })
});
