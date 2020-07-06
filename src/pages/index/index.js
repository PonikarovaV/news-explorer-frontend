import './index.css';
import Validation from '../../scripts/validation/Validation';
import Form from '../../scripts/components/Form';
import { SIGNIN_FORM_ERRORS } from '../../scripts/constants/errors';

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
const signinForm = document.querySelector('#form-signin');

const signinFormValidationOptions = {
  form: signinForm,
  inputClass: 'form__input',
  buttonClass: 'form__button',
  errors: SIGNIN_FORM_ERRORS,
};

const signinFormInstance = new Form({
  form: signinForm,
  buttonClass: 'form__button',
  validator: new Validation(signinFormValidationOptions),
});

// const signinValidation = new Validation({
//   form: signinForm,
//   inputClass: 'form__input',
//   buttonClass: 'form__button',
//   errors: SIGNIN_FORM_ERRORS,
// });

signinFormInstance.render();

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

// const getAuthState = () => localStorage.getItem('token') || null;

// const getHeadSectionMarkup = (auth) => (
//   `<div class="wrapper head-section head-section_type_base">
//     <a class="logo logo_theme_light" href="./index.html">NewsExplorer</a>
//     <ul class="navigation navigation_place_header">
//       <li class="navigation__item navigation__item_place_header navigation__item_border_light">
//         <a class="navigation__link navigation__link_theme_light" href="./index.html">Главная</a>
//       </li>
//       ${auth
//     ? (
//       `<li class="navigation__item navigation__item_place_header">
//         <a class="navigation__link navigation__link_theme_light" href="./articles.html">Сохраненные статьи</a>
//       </li>
//       <li class="navigation__item navigation__item_place_header">
//         <button id="button-logout-mobile" class="button button__text button_border_light button_type_mobile-main-action">Грета&nbsp;
//           <img class="button__icon" src="<%=require('../../images/icons/logout-white.svg') %>" alt="Кнопка выхода из профиля">
//         </button>
//       </li>`
//     )
//     : (
//       `<li class="navigation__item navigation__item_place_header">
//         <button id="button-login-screen" class="button button__text button_type_screen-main-action button_border_light">Авторизоваться</button>
//       </li>`
//     )}
//     </ul>
//     <img class="header__menu-icon" src="<%=require('../../images/icons/menu-icon-white.svg')%>" alt="Menu icon">
//   </div>`
// );

// console.log(getHeadSectionMarkup(getAuthState()));
