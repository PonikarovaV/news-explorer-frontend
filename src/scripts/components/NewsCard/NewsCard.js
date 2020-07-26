export default class NewsCard {
  constructor(options) {
    this._rootSectionTag = options.rootSection.tag;
    this._rootSectionClass = options.rootSection.class;
    this._title = options.article.title;
    this._description = options.article.description;
    this._time = options.article.publishedAt;
    this._source = options.article.source.name;
    this._urlToImage = options.article.urlToImage
      || 'https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';
    this._url = options.article.url;

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

    return this._isArticleSaved() ? 'Удалить из избранного' : 'Добавить в избранное';
  }

  _getTemplate() {
    return `
        <div class="card__image" ${this._isArticleSaved() ? `id="${this._isArticleSaved()._id}"` : ''} data-link="${this._urlToImage}" style="background-image: url('${this._urlToImage}')">
          <button class="card__button${this._getAuthState() ? ' card__button_active' : ''}${this._isArticleSaved() ? ' card__button_saved' : ''}" disabled="${!this._getAuthState()}">
            <svg class="checked-icon" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="checked-icon__rect" width="40" height="40" rx="8" fill="#fff"/>
              <path class="checked-icon__path" d="M19.382 23.714L14 27.943V12h12v15.942l-5.382-4.228-.618-.486-.618.486z" stroke="#B6BCBF" stroke-width="2"/>
            </svg>
          </button>
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
