import BaseComponent from '../BaseComponent';

export default class Form extends BaseComponent {
  constructor(form, options) {
    super(form);

    this._form = form;
    this._activeFormClass = options.activeFormClass;
    this._inputList = this._form.querySelectorAll(`.${options.inputClass}`);
    this._submitButton = this._form.querySelector(`.${options.buttonClass}`);
    this._validator = options.validator;
    this._inputPrefix = options.inputPrefix;
    this._request = options.request;
  }

  render() {
    this._validator.run();
    this.buttonSubmitListener('addEventListener');
  }

  show = () => {
    this.domElement.classList.add(this._activeFormClass);
  }

  hide = () => {
    this.domElement.classList.remove(this._activeFormClass);
  }

  buttonSubmitListener = (action) => {
    this._submitButton[action]('click', () => {
      this.sendRequest();
    });
  }

  getInputValues() {
    return [...this._inputList].reduce((acc, current) => ({
      ...acc,
      [`${current.id.replace(this._inputPrefix, '')}`]: current.value,
    }), {});
  }

  resetForm() {
    [...this._inputList].forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });

    this._validator.reset();
  }

  async sendRequest() {
    try {
      const data = await this._request(this.getInputValues());

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.resetForm();
    }
  }
}
