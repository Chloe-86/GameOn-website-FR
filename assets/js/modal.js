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
const modalBody = document.querySelector(".modal-body");
const modalContent = document.querySelector('.content')
const checkboxConditions = document.querySelector(
  "#checkboxConditions small"
);

let checkbox1 = document.querySelector("#checkbox1");
let checkbox2 = document.querySelector("#checkbox2");

// ouvrir la modale
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

// (function () {
//   // https://dashboard.emailjs.com/admin/account
//   emailjs.init({
//     publicKey: "ZqvGsjFlc7K5CsUYk",
//   });
// })();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Les inputs des champs
  const firstName = document.querySelector("#first").value.trim();
  const lastName = document.querySelector("#last").value.trim();
  const emailValue = document.querySelector("#email").value.trim();
  const birthdayValue = document.querySelector("#birthday").value.trim();
  const locationChecked = document.querySelector('input[name="location"]:checked');
  const quantityValue = parseInt(
    document.querySelector("#quantity").value.trim(),
    10
  );

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
    birthdayValue = birthdayValue === "" || birthdayValue > "2008-01-01";
    return !birthdayValue;
  }

  // Verifier la quantite
  function validateQuantity(quantityValue) {
    return !isNaN(quantityValue);
  }

  //valider la checkbox
  function validateCheckbox(checkbox1) {
    return checkbox1.checked;
  }
    //valider la checkbox
  function validateNewsLetter(checkbox2) {
      return checkbox2.checked;
    }

  let checkedValue = null;
  if (locationChecked) {
    checkedValue = document.querySelector(
      'input[name="location"]:checked'
    ).value;
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

  const isValidateLocation = isValid(locationChecked, validateLocation, locationSmall);

  const isValidateChecked = isValid(
    checkbox1,
    validateCheckbox,
    checkboxConditions
  );

  const isValidateCheckedNewsletter = isValid(
    checkbox2,
    validateNewsLetter,
    checkboxConditions
  );

  // Si tous les champs sont valides, soumettre le formulaire
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isValidateQuantity &&
    isValidateBirthday &&
    isValidateLocation &&
    isValidateChecked 
  ) {
    console.log(
      `nom: ${firstName}, prenom: ${lastName}, email: ${emailValue}, date de naissance ${birthdayValue}, Nombre de tournois: ${quantityValue}, ville du tournoi : ${checkedValue}, veux la newsletter: ${isValidateCheckedNewsletter}`
    );

    // emailjs.sendForm("service_b3jgc3s", "template_x58rjci", this).then(
    //   () => {
    //     console.log("SUCCESS!");
    //   },
    //   (error) => {
    //     console.log("FAILED...", error);
    //   }
    // );

    // //cacher la modale de formulaire
    modalBody.style.display = "none";
   
    // //afficher la modale de remerciement
    modalContent.classList.add('active');
    modalFinish.style.display = "block";
    form.reset();
  }

  document
    .querySelector("body > main > div.bground > div > div.modalFinish > input")
    .addEventListener("click", () => {
      modalFinish.style.display = "none";
      modalBody.style.display = "block";
      modalContent.classList.remove('active');
    });
});


