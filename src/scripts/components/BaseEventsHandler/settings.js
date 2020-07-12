import {
  signinForm,
  signupFormInstance,
  signinFormInstance,
} from '../Form';

import { popup, popupInstance } from '../Popup';

export const screenPopupCloseButton = popup.querySelector('.close-icon_type_screen');
export const mobilePopupCloseButton = popup.querySelector('.close-icon_type_mobile');

export const mobileMenu = document.querySelector('.mobile-menu');
export const mobileHeaderMenuIcon = document.querySelector('.header__menu-icon');
export const closeMobileMenuIcon = mobileMenu.querySelector('.close-icon_type_mobile');
export const logoutScreenButton = document.querySelector('#button-logout-screen');
export const loginScreenButton = document.querySelector('#button-login-screen');

export const buttonsEventList = [
  {
    button: mobileHeaderMenuIcon,
    action: 'click',
    effect: () => {
      mobileMenu.classList.remove('mobile-menu_invisible');
    },
  },
  {
    button: closeMobileMenuIcon,
    action: 'click',
    effect: () => {
      mobileMenu.classList.add('mobile-menu_invisible');
    },
  },
  {
    button: loginScreenButton,
    action: 'click',
    effect: () => {
      popupInstance.show();
      signupFormInstance.show();
    },
  },
  {
    button: screenPopupCloseButton,
    action: 'click',
    effect: () => {
      popupInstance.hide();
      signupFormInstance.hide();
    },
  },
  {
    button: mobilePopupCloseButton,
    action: 'click',
    effect: () => {
      popupInstance.hide();
      signinForm.classList.remove('form_active');
    },
  },
  {
    button: document.querySelector('#button-login-mobile'),
    action: 'click',
    effect: () => {
      this.target.show();
    },
  },
  {
    button: document.querySelector('#button-logout-mobile'),
    target: null,
    action: 'click',
    effect: () => {
      console.log('button-logout-mobile');
    },
  },
  {
    button: document.querySelector('.search__button'),
    target: null,
    action: 'click',
    effect: () => {
      console.log('search__button');
    },
  },
];

export const buttonsLazyEventList = [
  {
    id: 'button-logout-screen',
    action: 'click',
    effect: () => {
      console.log('button-logout-screen');
      popupInstance.show();
      signinFormInstance.show();
    },
  },
];
