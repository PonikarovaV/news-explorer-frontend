import validator from 'validator';
import { VALIDATION_REGEXP_PATTERNS } from '../constants/regexp-patterns';
import { FORM_ERRORS } from '../constants/errors';

export default class Validation {
  _currentInput = null;

  _currentInputId = null;

  _currentInputType = null;

  _currentInputValue = null;

  _inputState = false;

  _formState = {};

  _error = null;

  constructor(options) {
    this.form = options.form;
    this.inputList = this.form.querySelectorAll(`.${options.inputClass}`);
    this.button = this.form.querySelector(`.${options.buttonClass}`);
  }

  run() {
    this._formListener('addEventListener');
  }

  reset() {
    this._formListener('removeEventListener');
    this._resetErrorText();
  }

  _formListener(action) {
    [...this.inputList].forEach((input) => {
      input[action]('input', (event) => {
        this._currentInput = event.target;
        this._currentInputId = event.target.id;
        this._currentInputValue = event.target.value;
        this._currentInputType = event.target.type;
        this._error = document.querySelector(`#error-${this._currentInputId}`);

        this._checkInputState();
        this._switchButton(this._checkFormState());
      });
    });
  }

  _checkInputState() {
    this._inputState = this._validateInput();
    this._formState[this._currentInputId] = this._inputState;

    if (!this._inputState) {
      this._switchError();
    } else {
      this._resetErrorText();
    }
  }

  _checkFormState() {
    const inputListStates = Object.values(this._formState);

    if (inputListStates.length === this.inputList.length) {
      return inputListStates.every((value) => value);
    }

    return false;
  }

  _validateInput() {
    switch (this._currentInputType) {
      case 'email':
        return validator.isEmail(this._currentInputValue);
      case 'password':
        return VALIDATION_REGEXP_PATTERNS.isPassword.test(this._currentInputValue);
      case 'name':
        return VALIDATION_REGEXP_PATTERNS.isName.test(this._currentInputValue);
      default:
        return false;
    }
  }

  _resetErrorText() {
    this._error.textContent = '';
  }

  _switchError() {
    switch (this._currentInputType) {
      case 'email':
        this._error.textContent = FORM_ERRORS.notValidEmail;
        break;
      case 'password':
        this._error.textContent = FORM_ERRORS.notValidPassword;
        break;
      case 'name':
        this._error.textContent = FORM_ERRORS.notValidName;
        break;
      default:
        this._error.textContent = FORM_ERRORS.defaultError;
        break;
    }
  }

  _switchButton(status) {
    if (status) {
      this.button.classList.remove('form__button_inactive');
      this.button.classList.add('form__button_active');
      this.button.removeAttribute('disabled', true);
    } else {
      this.button.classList.remove('form__button_active');
      this.button.classList.add('form__button_inactive');
      this.button.setAttribute('disabled', true);
    }
  }
}
