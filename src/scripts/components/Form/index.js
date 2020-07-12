import Validation from '../../validation/Validation';
import Form from './Form';
import MainApi from '../../api/MainApi';

export const signinForm = document.querySelector('#form-signin');
export const signupForm = document.querySelector('#form-signup');

const signinFormValidationOptions = {
  form: signinForm,
  inputClass: 'form__input',
  buttonClass: 'form__button',
  invalidInputClass: 'form__input_invalid',
};

const signupFormValidationOptions = {
  form: signupForm,
  inputClass: 'form__input',
  buttonClass: 'form__button',
  invalidInputClass: 'form__input_invalid',
};

const signinFormOptions = {
  activeFormClass: 'form_active',
  inputPrefix: 'signin-',
  inputClass: 'form__input',
  buttonClass: 'form__button',
  validator: new Validation(signinFormValidationOptions),
  request: MainApi.signin,
};

const signupFormOptions = {
  activeFormClass: 'form_active',
  inputPrefix: 'signup-',
  inputClass: 'form__input',
  buttonClass: 'form__button',
  validator: new Validation(signupFormValidationOptions),
  request: MainApi.signup,
};

export const signinFormInstance = new Form(signinForm, signinFormOptions);
export const signupFormInstance = new Form(signupForm, signupFormOptions);
