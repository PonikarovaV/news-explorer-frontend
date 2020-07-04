import './index.css';

// код просто для удобства проверки верстки
const openMenuIcon = document.querySelector('.header__menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenuIcon = mobileMenu.querySelector('.close-icon_type_mobile');
const loginButton = document.querySelector('#button-login-screen');
const popupSignin = document.querySelector('#popup-signin');
const popupSignup = document.querySelector('#popup-signup');
const closeSigninButton = popupSignin.querySelector('.close-icon_type_screen');
const closeSignupButton = popupSignup.querySelector('.close-icon_type_screen');
const closeMobileSigninIcon = popupSignin.querySelector('.close-icon_type_mobile');
const closeMobileSignupIcon = popupSignup.querySelector('.close-icon_type_mobile');
const redirectSignupLink = popupSignin.querySelector('.form__redirect-link');
const redirectSigninLink = popupSignup.querySelector('.form__redirect-link');
const closePopupScreenButton = popupSignin.querySelector('.close-icon_type_screen');

openMenuIcon.addEventListener('click', () => {
  mobileMenu.classList.remove('mobile-menu_invisible');
});

closeMobileMenuIcon.addEventListener('click', () => {
  mobileMenu.classList.add('mobile-menu_invisible');
});

loginButton.addEventListener('click', () => {
  mobileMenu.classList.add('mobile-menu_invisible');
  popupSignin.classList.remove('popup_invisible');
});

closeSigninButton.addEventListener('click', () => {
  popupSignin.classList.add('popup_invisible');
});

closeSignupButton.addEventListener('click', () => {
  popupSignup.classList.add('popup_invisible');
});

closeMobileSigninIcon.addEventListener('click', () => {
  popupSignin.classList.add('popup_invisible');
});

closeMobileSignupIcon.addEventListener('click', () => {
  popupSignup.classList.add('popup_invisible');
});

closePopupScreenButton.addEventListener('click', () => {
  popupSignin.classList.add('popup_invisible');
});

redirectSignupLink.addEventListener('click', () => {
  popupSignin.classList.add('popup_invisible');
  popupSignup.classList.remove('popup_invisible');
});

redirectSigninLink.addEventListener('click', () => {
  popupSignin.classList.remove('popup_invisible');
  popupSignup.classList.add('popup_invisible');
});
