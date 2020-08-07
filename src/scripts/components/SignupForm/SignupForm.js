import Form from '../Form';

export default class SignupForm extends Form {
  constructor(options, successPopup) {
    super(options);

    this._successMessagePopup = successPopup;
    this._successMessageActiveClass = options.successMessageActiveClass;
    this._serverErrorField = this._form.querySelector(`${options.serverErrorField}`);
  }

  showSuccessMessage = () => {
    this._form.classList.remove(this._activeFormClass);
    this._successMessagePopup.classList.add(this._successMessageActiveClass);
  }

  sendRequest = async () => {
    try {
      const data = await this._request(this.getInputValues());

      if (!data) {
        throw new Error('Такой пользователь уже существует.');
      }

      this.showSuccessMessage();
    } catch (error) {
      if (this._serverErrorField) {
        this._serverErrorField.textContent = `${error.message}`;
      }

      this._showSnackbarWithError(error);
    } finally {
      this.reset();
    }
  }
}
