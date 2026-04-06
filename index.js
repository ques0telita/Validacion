//regex
//regex para validar el password, el username, el email y el telefono
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^[0-9]{6,16}$/;


// selectors
const countrySelect = document.querySelector("#countryC");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneCode = document.querySelector("#phoneC");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const form = document.querySelector("#form");

//validaciones
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;

//funcion
//esta funcion se encarga de validar los inputs, recibe el evento, la validacion y el elemento a validar
const validation = (e, validation, element) => {
    //se obtiene el elemento que contiene el mensaje de error
    const informationElement = e.target.parentElement.children[1];
    //si es correcto, se le da un borde verde al input y se oculta el mensaje de error
    if (validation) {
        element.classList.add("correct");
        element.classList.remove("incorrect");
        informationElement.classList.remove("show-information");
    //si no es correcto, se muestra el mensaje de error y se le da un borde rojo al input
    } else {
        element.classList.add("incorrect");
        element.classList.remove("correct");
        informationElement.classList.add("show-information");
    }
};
//removing the country code from the select options
[...countrySelect.options].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

//event listeners
//username validation
usernameInput.addEventListener("input", e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(e, usernameValidation, usernameInput);
});
//email validation
emailInput.addEventListener("input", e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(e, emailValidation, emailInput);
});
//phone validation
countrySelect.addEventListener("change", e => {
    const optionSelected = [...e.target.children].find(option => option.selected);
    phoneCode.innerHTML = `+${optionSelected.value}`;
    phoneCode.classList.add("correct");
    countrySelect.classList.add("correct");
});
//phone validation
phoneInput.addEventListener("input", e => {
    phoneValidation = PHONE_REGEX.test(e.target.value);
    validation(e, phoneValidation, phoneInput);
});
//password validation
passwordInput.addEventListener("input", e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    validation(e, passwordValidation, passwordInput);
});
//confirm password validation
confirmPasswordInput.addEventListener("input", e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation(e, confirmPasswordValidation, confirmPasswordInput);
});

//submit event
//cuando se envia el formulario, se evita que se recargue la pagina y se muestra en consola un objeto con los datos del usuario
form.addEventListener("submit", e => {
    e.preventDefault();
    //se crea un objeto con los datos del usuario
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        phone: `${phoneCode.innerHTML}${phoneInput.value}`,
        password: passwordInput.value
    };
    //aqui se podria hacer una peticion a un servidor para guardar el usuario, pero por ahora solo se muestra en consola
    console.log(user);
});