export default class Form {
  constructor(options) {
    this._form = document.querySelector(`${options.form}`);
    this._activeFormClass = options.activeFormClass;
    this._inputList = this._form.querySelectorAll(options.inputIdentifier);
    this._submitButton = this._form.querySelector(options.buttonIdentifie);
    this._validator = options.validator;
    this._inputPrefix = options.inputPrefix;
    this._request = options.request;

    this._showSnackbarWithError = options.showSnackbarWithError;
  }

  render() {
    this._validator.run();

    this.formListener('addEventListener');
  }

  reset() {
    this._form.reset();
    this._validator.reset();
    this.formListener('removeEventListener');
  }

  show = () => {
    this._form.classList.add(this._activeFormClass);
  }

  hide = () => {
    this._form.classList.remove(this._activeFormClass);
  }

  formListener = (action) => {
    this._form[action]('submit', (event) => {
      event.preventDefault();

      this.sendRequest();
    });
  }

  getInputValues() {
    return [...this._inputList].reduce((acc, current) => ({
      ...acc,
      [`${current.id.replace(this._inputPrefix, '')}`]: current.value,
    }), {});
  }
}
