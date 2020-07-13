import BaseComponent from '../BaseComponent';

export default class Form extends BaseComponent {
  constructor(form, dependency, options) {
    super(form);

    this._form = form;
    this._activeFormClass = options.activeFormClass;
    this._inputList = this._form.querySelectorAll(`.${options.inputClass}`);
    this._submitButton = this._form.querySelector(`.${options.buttonClass}`);
    this._validator = options.validator;
    this._inputPrefix = options.inputPrefix;
    this._request = options.request;
    this._popup = options.parentPopup;
    this._dependency = dependency;
  }

  render() {
    this._validator.run();
    this._buttonSubmitListener('addEventListener');
  }

  show = () => {
    this.domElement.classList.add(this._activeFormClass);
  }

  hide = () => {
    this.domElement.classList.remove(this._activeFormClass);
  }

  _buttonSubmitListener = (action) => {
    this._submitButton[action]('click', () => {
      console.log(action);
      this._sendRequest();
    });
  }

  _getInputValues() {
    return [...this._inputList].reduce((acc, current) => ({
      ...acc,
      [`${current.id.replace(this._inputPrefix, '')}`]: current.value,
    }), {});
  }

  _resetForm() {
    [...this._inputList].forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });

    this._validator.reset();
  }

  async _sendRequest() {
    console.log('_sendRequest');
    try {
      const data = await this._request(this._getInputValues());

      console.log(data);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this._resetForm();
      this._dependency.render();
      this._popup.hide();
    }
  }
}
