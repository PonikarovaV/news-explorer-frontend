export default class HeaderNavigation {
  _authState = false;

  _user = JSON.parse(localStorage.getItem('user'));

  constructor(options) {
    this._rootSection = document.querySelector(`.${options.rootSectionClass}`);
    this._navigationItemList = options.navigationItemList;
    this._loginButton = options.loginButton;
    this._logoutButton = options.logoutButton;
    this._getAuthState = options.getAuthState;
    this._cleanRootSection = options.cleanRootSection;
  }

  render() {
    this._cleanRootSection(this._rootSection);
    this._setMarkup();
  }

  _setMarkup() {
    const template = `${this._getItems()} ${this._getButton()}`;

    this._rootSection.insertAdjacentHTML(
      'beforeend',
      template,
    );
  }

  _getItems() {
    return this._navigationItemList.map((item) => (
      item.needAuthorization
        ? this._getAuthState() && (
          `<li class="${item.itemClassList.join(' ')}">
            <a class="${item.linkClassList.join(' ')}" href="${item.href}">${item.linkText}</a>
          </li>`
        )
        : `<li class="${item.itemClassList.join(' ')}">
            <a class="${item.linkClassList.join(' ')}" href="${item.href}">${item.linkText}</a>
          </li>`
    )).join(' ');
  }

  _getButton() {
    return this._getAuthState()
      ? `<li class="${this._logoutButton.itemClassList.join(' ')}">
          <button id="${this._logoutButton.buttonId}" class="${this._logoutButton.buttonClassList.join(' ')}">${this._user.name ?? ''}&nbsp;${this._logoutButton.buttonInnerContent}</button>
        </li>`
      : `<li class="${this._loginButton.itemClassList.join(' ')}">
          <button id="${this._loginButton.buttonId}" class="${this._loginButton.buttonClassList.join(' ')}">${this._loginButton.buttonInnerContent}</button>
        </li>`;
  }
}
