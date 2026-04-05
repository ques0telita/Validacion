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
const validation = (e, validation, element) => {
    const informationElement = e.target.parentElement.children[1];
    if (validation) {
        element.classList.add("correct");
        element.classList.remove("incorrect");
        informationElement.classList.remove("show-information");
    } else {
        element.classList.add("incorrect");
        element.classList.remove("correct");
        informationElement.classList.add("show-information");
    }
};

[...countrySelect.options].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

usernameInput.addEventListener("input", e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(e, usernameValidation, usernameInput);
});

emailInput.addEventListener("input", e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(e, emailValidation, emailInput);
});

countrySelect.addEventListener("change", e => {
    const optionSelected = [...e.target.children].find(option => option.selected);
    phoneCode.innerHTML = `+${optionSelected.value}`;
    phoneCode.classList.add("correct");
    countrySelect.classList.add("correct");
});

phoneInput.addEventListener("input", e => {
    phoneValidation = PHONE_REGEX.test(e.target.value);
    validation(e, phoneValidation, phoneInput);
});

passwordInput.addEventListener("input", e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    validation(e, passwordValidation, passwordInput);
});

confirmPasswordInput.addEventListener("input", e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation(e, confirmPasswordValidation, confirmPasswordInput);
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        phone: `${phoneCode.innerHTML}${phoneInput.value}`,
        password: passwordInput.value
    };
    console.log(user);
});