export default class Form {
  constructor(form, dependency, options) {
    this._form = form;
    this._activeFormClass = options.activeFormClass;
    this._inputList = this._form.querySelectorAll(options.inputIdentifier);
    this._submitButton = this._form.querySelector(options.buttonIdentifie);
    this._validator = options.validator;
    this._inputPrefix = options.inputPrefix;
    this._request = options.request;
    this._getUserRequest = options.getUserRequest;
    this._popup = options.parentPopup;
    this._dependency = dependency;

    this._buttonIdentifier = options.buttonIdentifier;
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

  sendRequest = async () => {
    try {
      const data = await this._request(this.getInputValues());

      if (data?.token) {
        localStorage.setItem('token', data.token);
        // const user = await this._getUserRequest();
        // console.log(user);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.reset();
      this._dependency.render();
      this._popup.hide();
    }
  }
}
