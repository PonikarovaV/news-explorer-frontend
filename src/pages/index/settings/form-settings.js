import Validation from '../../../scripts/validation';
import { MainApi } from '../../../scripts/api';
import Popup from '../../../scripts/components/Popup';

import { showSnackbarWithError } from '../../../scripts/utils/helpers';

import { signinFormValidationOptions, signupFormValidationOptions } from './form-validation-settings';

export const signinFormOptions = {
  form: '#form-signin',
  activeFormClass: 'form_active',
  inputPrefix: 'signin-',
  inputIdentifier: '.form__input',
  buttonIdentifier: '.form__button',
  parentPopup: new Popup(document.querySelector('.popup')),
  validator: new Validation(signinFormValidationOptions),
  request: MainApi.signin,
  getUserData: MainApi.getUserData,
  showSnackbarWithError,
};

export const signupFormOptions = {
  form: '#form-signup',
  activeFormClass: 'form_active',
  inputPrefix: 'signup-',
  inputIdentifier: '.form__input',
  buttonIdentifier: '.form__button',
  serverErrorField: '#server-error',
  successMessagePopup: '.success-message',
  successMessageActiveClass: 'success-message_visible',
  parentPopup: new Popup(document.querySelector('.popup')),
  validator: new Validation(signupFormValidationOptions),
  request: MainApi.signup,
  getUserData: MainApi.getUserData,
  showSnackbarWithError,
};
