import validator from 'validator';
import { VALIDATION_REGEXP_PATTERNS } from '../constants/regexp-patterns';
import { FORM_ERRORS } from '../constants/errors';

export default class Validation {
  _currentInput = null;

  _currentInputId = null;

  _currentInputType = null;

  _currentInputValue = null;

  _inputState = false;

  _formState = null;

  _error = null;

  constructor(options) {
    this._form = options.form;
    this._inputList = this._form.querySelectorAll(`.${options.inputClass}`);
    this._button = this._form.querySelector(`.${options.buttonClass}`);
    this._invalidInputClass = options.invalidInputClass;

    this._formState = [...this._inputList].reduce((acc, current) => ({
      ...acc,
      [current.id]: false,
    }), {});
  }

  run() {
    this._formListener('addEventListener');
  }

  reset() {
    this._formListener('removeEventListener');
    this._switchOffError();
    this._switchButton(false);
  }

  _formListener(action) {
    [...this._inputList].forEach((input) => {
      input[action]('input', (event) => {
        this._setValues(event.target);
        this._checkInputState();
        this._switchButton(this._checkFormState());
      });
    });
  }

  _setValues(input) {
    this._currentInput = input;
    this._currentInputId = input.id;
    this._currentInputValue = input.value;
    this._currentInputType = input.type;
    this._error = document.querySelector(`#error-${this._currentInputId}`);
  }

  _checkInputState() {
    this._inputState = this._validateInput();
    this._formState[this._currentInputId] = this._inputState;

    if (!this._inputState) {
      this._switchOnError();
    } else {
      this._switchOffError();
    }
  }

  _checkFormState() {
    return Object.values(this._formState).every((value) => value);
  }

  _validateInput() {
    switch (this._currentInputType) {
      case 'email':
        return validator.isEmail(this._currentInputValue);
      case 'password':
        return VALIDATION_REGEXP_PATTERNS.isPassword.test(this._currentInputValue);
      case 'text':
        return VALIDATION_REGEXP_PATTERNS.isName.test(this._currentInputValue);
      default:
        return false;
    }
  }

  _switchOffError() {
    this._error.textContent = '';
    this._currentInput.classList.remove(this._invalidInputClass);
  }

  _switchOnError() {
    this._currentInput.classList.add(this._invalidInputClass);

    switch (this._currentInputType) {
      case 'email':
        this._error.textContent = FORM_ERRORS.notValidEmail;
        break;
      case 'password':
        this._error.textContent = FORM_ERRORS.notValidPassword;
        break;
      case 'text':
        this._error.textContent = FORM_ERRORS.notValidName;
        break;
      default:
        this._error.textContent = FORM_ERRORS.defaultError;
        break;
    }
  }

  _switchButton(status) {
    if (status) {
      this._button.classList.remove('form__button_inactive');
      this._button.classList.add('form__button_active');
      this._button.removeAttribute('disabled', true);
    } else {
      this._button.classList.remove('form__button_active');
      this._button.classList.add('form__button_inactive');
      this._button.setAttribute('disabled', true);
    }
  }
}
