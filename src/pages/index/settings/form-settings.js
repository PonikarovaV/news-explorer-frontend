import Validation from '../../../scripts/validation';
import MainApi from '../../../scripts/api';
import Popup from '../../../scripts/components/Popup';

import { signinFormValidationOptions, signupFormValidationOptions } from './form-validation-settings';

export const signinFormOptions = {
  activeFormClass: 'form_active',
  inputPrefix: 'signin-',
  inputIdentifier: '.form__input',
  buttonIdentifier: '.form__button',
  parentPopup: new Popup(document.querySelector('.popup')),
  validator: new Validation(signinFormValidationOptions),
  request: MainApi.signin,
  getUserRequest: MainApi.getUserMe,
};

export const signupFormOptions = {
  activeFormClass: 'form_active',
  inputPrefix: 'signup-',
  inputIdentifier: '.form__input',
  buttonIdentifier: '.form__button',
  parentPopup: new Popup(document.querySelector('.popup')),
  validator: new Validation(signupFormValidationOptions),
  request: MainApi.signup,
  getUserRequest: MainApi.getUserMe,
};
