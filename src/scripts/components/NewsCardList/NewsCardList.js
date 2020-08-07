export default class NewsCardList {
  _clickCounter = 1;

  _newsLength = 6;

  constructor(options) {
    this.rootSection = document.querySelector(`${options.rootSection}`);
    this.cardList = options.cardList || [];
    this.cleanRootSection = options.cleanRootSection.bind(this);
    this.showMoreButton = document.querySelector(`${options.showMoreButton}`);
    this._showMoreNews('addEventListener');
  }

  render() {
    this.cleanRootSection(this.rootSection);
    this._setMarkup();
  }

  _setMarkup() {
    const newsBlock = this.cardList.slice(0, this._newsLength * this._clickCounter);

    if (newsBlock.length === this.cardList.length) {
      this.showMoreButton.style.display = 'none';
      this._showMoreNews('removeEventListener');
    }

    newsBlock.forEach((card) => {
      this.rootSection.appendChild(card.render());
    });
  }

  _showMoreNews = (action) => {
    this.showMoreButton[action]('click', () => {
      this._clickCounter += 1;

      this.render();
    });
  }
}
