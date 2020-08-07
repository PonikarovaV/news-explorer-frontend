import Form from '../Form';

export default class SigninForm extends Form {
  constructor(options, signinFormOptions) {
    super(options);

    this._headerScreen = signinFormOptions.headerScreenNavigation;
    this._headerMobile = signinFormOptions.headerMobileNavigation;
    this._newsLoader = signinFormOptions.newsLoader;
    this._getUserData = options.getUserData;
    this._popup = options.parentPopup;
  }

  sendRequest = async () => {
    try {
      const { token } = await this._request(this.getInputValues());

      if (!token) {
        throw new Error('Не удалось авторизоваться.');
      }

      localStorage.setItem('token', token);

      const { data: user } = await this._getUserData(token);

      if (!user) {
        throw new Error('Не удалось получить данные пользователя.');
      }

      localStorage.setItem('user', JSON.stringify(user));

      this._headerScreen.render();
      this._headerMobile.render();
      this._newsLoader();
    } catch (error) {
      this._showSnackbarWithError(error);
    } finally {
      this.reset();
      this._popup.hide();
    }
  }
}
