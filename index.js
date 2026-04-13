//regex para validar el password, el username, el email y el telefono
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/;
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,15}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^[0-9]{6,10}$/;


// selectors
const countrySelect = document.querySelector("#countryC");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneCode = document.querySelector("#phoneC");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit-btn");

//validaciones
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countryValidation = false;

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

//funcion para habilitar/deshabilitar el boton submit
const checkForm = () => {
    // "&&" sirve para verificar que todas las validaciones sean true, si alguna es false, el boton se deshabilita
    if (usernameValidation && emailValidation && phoneValidation && passwordValidation && confirmPasswordValidation && countryValidation) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
};

//removing the country code from the select options
// "..." sirve para convertir el HTMLCollection en un array, para poder usar el metodo forEach y modificar cada opcion del select
[...countrySelect.options].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

//username validation
//se le agrega "checkForm" a cada evento para verificar si el formulario esta completo y habilitar el boton de submit
usernameInput.addEventListener("input", e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(e, usernameValidation, usernameInput);
    checkForm();
});
//email validation
emailInput.addEventListener("input", e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(e, emailValidation, emailInput);
    checkForm();
});
//phone validation
countrySelect.addEventListener("change", e => {
    const optionSelected = [...e.target.children].find(option => option.selected);
    if (optionSelected.value) {
        countryValidation = true;
        phoneCode.innerHTML = `+${optionSelected.value}`;
        phoneCode.classList.add("correct");
        countrySelect.classList.add("correct");
    } else {
        countryValidation = false;
        phoneCode.innerHTML = "";
        countrySelect.classList.remove("correct");
    }
    checkForm();
});
//phone validation
phoneInput.addEventListener("input", e => {
    phoneValidation = PHONE_REGEX.test(e.target.value);
    validation(e, phoneValidation, phoneInput);
    checkForm();
});
//password validation
passwordInput.addEventListener("input", e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    validation(e, passwordValidation, passwordInput);
    // Revalidate confirm password if it has value
    if (confirmPasswordInput.value) {
        confirmPasswordValidation = passwordInput.value === confirmPasswordInput.value;
        const fakeEvent = { target: confirmPasswordInput };
        validation(fakeEvent, confirmPasswordValidation, confirmPasswordInput);
    }
    checkForm();
});
//confirm password validation
confirmPasswordInput.addEventListener("input", e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation(e, confirmPasswordValidation, confirmPasswordInput);
    checkForm();
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
