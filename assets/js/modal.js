function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements statique
const modalbg = document.querySelector(".bground");
const modalFinish = document.querySelector(".modalFinish");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("form");
const btnClose = document.querySelector(".btn-close");
const modalBtnClose = document.querySelectorAll(".close, .btn-close");
const modalBody = document.querySelector(".modal-body");
const modalContent = document.querySelector(".content");

//DOM Elements dynamique
let checkbox1 = document.querySelector("#checkbox1");
let checkbox2 = document.querySelector("#checkbox2");

// Les spans des erreurs des champs
const spanFirst = document.querySelector("#nickName span");
const spanLast = document.querySelector("#name span");
const emailSpan = document.querySelector("#checkEmail span");
const birthDaySpan = document.querySelector("#checkBirthday span");
const quantitySpan = document.querySelector("#checkQuantity span");
const checkboxConditions = document.querySelector("#checkboxConditions small");
const locationSmall = document.querySelector("#locations small");

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

/**
 * Vérifie la validité d'une valeur en utilisant une fonction de validation donnée,
 * et affiche un message d'erreur si la valeur n'est pas valide.
 *
 * @param {any} value La valeur à valider.
 * @param {function(any): boolean} validationFunction La fonction de validation qui prend la valeur en entrée et retourne true si la valeur est valide, sinon false.
 *
 * @param {HTMLElement} errorSpan L'élément HTML où afficher le message d'erreur.
 * @returns {boolean} true si la valeur est valide selon la fonction de validation, sinon false.
 */
function isValid(value, validationFunction, errorSpan) {
  const isValid = validationFunction(value); // Appelle la fonction de validation directement
  errorSpan.style.display = isValid ? "none" : "block"; // Affiche l'erreur si isValid est false, sinon cache l'erreur
  return isValid; // Retourne directement isValid
}

//fonction d'appel pour envoyer le formulaire via un service
// (function () {
//   // https://dashboard.emailjs.com/admin/account
//   emailjs.init({
//     publicKey: "Iuls7pytJ_w8KylVe",
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
  const quantityValue = parseInt(document.querySelector("#quantity").value.trim(), 10);

  // Fonctions de validation pour chaque champ

  /**
   * Vérifie si un nom est valide (prénom ou nom de famille).
   *
   * @param {string} name - Le nom ou prenom à valider.
   * @returns {boolean} true si le nom est valide (contient uniquement des lettres et a au moins 2 caractères), sinon false.
   */
  function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name) && name.length >= 2;
  }

  /**
   * Vérifie si une adresse email est valide en utilisant une expression régulière.
   *
   * @param {string} email - L'adresse email à valider.
   * @returns {boolean} true si l'adresse email est valide, sinon false.
   */
  function validateEmail(email) {
    /**
     * Explication de l'expression régulière emailRegex :
     *
     * ^                   : Début de la chaîne. La correspondance doit commencer depuis le début de la chaîne.
     * [a-zA-Z0-9._-]+     : Correspond à une ou plusieurs occurrences de lettres majuscules ou minuscules,
     *                       chiffres, ainsi que les caractères spéciaux ._-. Ce groupe représente la partie locale de l'adresse e-mail.
     * @                   : Le caractère "@" est littéralement présent dans une adresse e-mail valide.
     * [a-zA-Z0-9.-]+      : Correspond à une ou plusieurs occurrences de lettres majuscules ou minuscules, chiffres,
     *                       ainsi que les caractères spéciaux .-. Ce groupe représente le domaine de l'adresse e-mail.
     * \.                  : Le caractère "." est littéralement présent et il est échappé avec un backslash (\) car il a une signification spéciale en regex.
     * [a-zA-Z]{2,}        : Correspond à deux lettres ou plus (minuscules ou majuscules). Cela représente le domaine de premier niveau (TLD) comme .com, .org, .net.
     * $                   : Fin de la chaîne. La correspondance doit se terminer à la fin de la chaîne.
     */
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Valide une date de naissance en vérifiant si elle est antérieure ou égale à un age avant la date d' aujourd'hui.
   *
   * @param {string} birthdayValue La chaîne représentant la date de naissance au format valide pour l'objet Date. Doit être non vide pour être considérée comme valide.
   *
   * @returns {boolean} true si la date de naissance est valide (l'age est au moins de 14 ans), sinon false.
   */
  function validateBirthday(birthdayValue) {
    let age = 14;

    // Si la date de naissance n'est pas fournie, elle n'est pas valide
    if (birthdayValue === "") {
      return false;
    }

    // Convertir la chaîne de date en objet Date
    const birthdayDate = new Date(birthdayValue);

    // Calculer la date a partir de l 'age valide
    const today = new Date();
    today.setFullYear(today.getFullYear() - age);

    // Comparer maintenant à l'age
    return birthdayDate <= today;
  }

  /**
   * Valide une quantité en vérifiant si elle est un nombre valide et non égale à zéro.
   *
   * @param {number} quantityValue La valeur à valider comme quantité.
   * @returns {boolean} true si la quantité est un nombre valide et différente de zéro, sinon false.
   */
  function validateQuantity(quantityValue) {
    return !isNaN(quantityValue) && quantityValue !== 0;
  }

  /**
   * Valide une case à cocher en vérifiant si elle est cochée.
   *
   * @param {HTMLInputElement} checkbox L'élément de case à cocher à valider.
   * @returns {boolean} true si la case à cocher est cochée, sinon false.
   */
  function validateCheckbox(checkbox) {
    return checkbox.checked;
  }

  let checkedValue = null;
  //// Vérifie s'il y a un élément radio "location" sélectionné et retourne sa valeur
  if (locationChecked) {
    checkedValue = document.querySelector('input[name="location"]:checked').value;
  }

  /**
   * Valide la sélection d'une localisation en vérifiant si une option est sélectionnée.
   *
   * @param {any} checked La valeur à valider, qui est évaluée pour la présence d'une sélection de localisation.
   * @returns {boolean} true si une localisation est sélectionnée, sinon false.
   */
  function validateLocation(checked) {
    return checked !== null;
  }

  // Valider chaque champ et afficher les erreurs si nécessaire
  const isFirstNameValid = isValid(firstName, validateName, spanFirst);
  const isLastNameValid = isValid(lastName, validateName, spanLast);
  const isEmailValid = isValid(emailValue, validateEmail, emailSpan);
  const isValidateQuantity = isValid(quantityValue, validateQuantity, quantitySpan);
  const isValidateBirthday = isValid(birthdayValue, validateBirthday, birthDaySpan);
  const isValidateLocation = isValid(locationChecked, validateLocation, locationSmall);
  const isValidateChecked = isValid(checkbox1, validateCheckbox, checkboxConditions);
  const isNewsletterChecked = validateCheckbox(checkbox2);

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
      `nom: ${firstName}, prenom: ${lastName}, email: ${emailValue}, date de naissance ${birthdayValue}, Nombre de tournois: ${quantityValue}, ville du tournoi : ${checkedValue}, veux la newsletter: ${isNewsletterChecked}`
    );

    // emailjs.sendForm("service_0w0t0pc", "template_x58rjci", this).then(
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
    modalContent.classList.add("active");
    modalFinish.style.display = "block";
    form.reset();
  }

  document
    .querySelector("body > main > div.bground > div > div.modalFinish > input")
    .addEventListener("click", () => {
      modalFinish.style.display = "none";
      modalBody.style.display = "block";
      modalContent.classList.remove("active");
    });
});
