export default class NewsCard {
  constructor(options) {
    this._pageKey = options.pageKey;
    this._rootSectionTag = options.rootSection.tag;
    this._rootSectionClass = options.rootSection.class;
    this._title = options.article.title;
    this._description = options.article.description;
    this._time = options.article.publishedAt;
    this._source = options.article.source;
    this._urlToImage = options.article.urlToImage;
    this._url = options.article.url;
    this._keywordList = options.article.keyword.split(' ');

    this._getAuthState = options.getAuthState;
    this._getDate = options.getDate;
    this._savedArticles = options.savedArticles;
  }

  render() {
    return this._createTemplate();
  }

  _createTemplate() {
    const rootSection = document.createElement(`${this._rootSectionTag}`);
    rootSection.classList.add(`${this._rootSectionClass}`);

    rootSection.insertAdjacentHTML(
      'beforeend',
      this._getTemplate(),
    );

    return rootSection;
  }

  _isArticleSaved() {
    return this._savedArticles.find((article) => article.link === this._url);
  }

  _setTooltipTitle() {
    if (!this._getAuthState()) {
      return 'Войдите, чтобы сохранять статьи';
    }

    if (this._pageKey === 'articles') {
      return 'Удалить из сохраненных';
    }

    return this._isArticleSaved() ? 'Удалить из сохраненных' : 'Добавить в избранное';
  }

  _setCardIcons() {
    if (this._pageKey === 'index') {
      return `
          <button class="card__button${this._getAuthState() ? ' card__button_active' : ''}${this._isArticleSaved() ? ' card__button_saved' : ''}" disabled="${!this._getAuthState()}">
            <svg class="checked-icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="checked-icon__rect" width="40" height="40" rx="8" fill="#fff"/>
              <path class="checked-icon__path" d="M19.382 23.714L14 27.943V12h12v15.942l-5.382-4.228-.618-.486-.618.486z" stroke="#B6BCBF" stroke-width="2"/>
            </svg>
          </button>
      `;
    }

    if (this._pageKey === 'articles') {
      return `
          <div class="label">
            <p class="label__text">${this._keywordList[0]}</p>
          </div>
          <button class="card__button${this._getAuthState() ? ' card__button_active' : ''}${this._isArticleSaved() ? ' card__button_saved' : ''}">
            <svg class="trash-icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="trash-icon__rect" width="40" height="40" rx="8" fill="#fff"/>
              <path class="trash-icon__path" fill-rule="evenodd" clip-rule="evenodd" d="M23 11h-6v2h-6v2h18v-2h-6v-2zm-10 6v11a2 2 0 002 2h10a2 2 0 002-2V17h-2v11H15V17h-2zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2z" fill="#B6BCBF"/>
            </svg>
          </button>
      `;
    }

    return '';
  }

  _getTemplate() {
    return `
        <div class="card__image" ${this._isArticleSaved() ? `id="${this._isArticleSaved()._id}"` : ''} data-link="${this._urlToImage}" style="background-image: url('${this._urlToImage}')">
          ${this._setCardIcons()}
          <div class="tooltip">
            <p class="tooltip__text">${this._setTooltipTitle()}</p>
          </div>
        </div>
        <article class="card__bottom">
            <p class="card__date">${this._getDate(this._time)}</p>
          <div class="card__main">
            <a class="card__link" href="${this._url}" target="_blank"><h2 class="card__title">${this._title}</h2></a>
            <p class="card__text">${this._description}</p>
          </div>
          <address class="card__source">${this._source}</address>
        </article>
    `;
  }
}
