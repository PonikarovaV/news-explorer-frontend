export default class HeaderNavigation {
  _authState = false;

  constructor(options) {
    this.rootSection = document.querySelector(`.${options.rootSectionClass}`);
    this.rootSectionClassList = options.rootSectionClassList;
    this.navigationItemList = options.navigationItemList;
    this.loginButton = options.loginButton;
    this.logoutButton = options.logoutButton;
    this.getAuthState = options.getAuthState;
    this.cleanRootSection = options.cleanRootSection;
    this.observerConfig = options.observerConfig;
    this.observer = options.observer;
  }

  render() {
    this.cleanRootSection(this.rootSection);
    this.setMarkup();
  }

  setMarkup() {
    const template = `${this.getItems()} ${this.getButton()}`;

    this.rootSection.insertAdjacentHTML(
      'beforeend',
      template,
    );
  }

  getItems() {
    return this.navigationItemList.map((item) => (
      item.needAuthorization
        ? this.getAuthState() && (
          `<li class="${item.itemClassList.join(' ')}">
            <a class="${item.linkClassList.join(' ')}" href="${item.href}">${item.linkText}</a>
          </li>`
        )
        : `<li class="${item.itemClassList.join(' ')}">
            <a class="${item.linkClassList.join(' ')}" href="${item.href}">${item.linkText}</a>
          </li>`
    )).join(' ');
  }

  getButton() {
    return this.getAuthState()
      ? `<li class="${this.logoutButton.itemClassList.join(' ')}">
          <button id="${this.logoutButton.buttonId}" class="${this.logoutButton.buttonClassList.join(' ')}">${this.logoutButton.buttonInnerContent}</button>
        </li>`
      : `<li class="${this.loginButton.itemClassList.join(' ')}">
          <button id="${this.loginButton.buttonId}" class="${this.loginButton.buttonClassList.join(' ')}">${this.loginButton.buttonInnerContent}</button>
        </li>`;
  }
}
