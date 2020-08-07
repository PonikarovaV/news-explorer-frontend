export default class GreetSection {
  _user = JSON.parse(localStorage.getItem('user'));

  constructor(options) {
    this._rootSection = document.querySelector(`${options.rootSection}`);
    this._titleField = this._rootSection.querySelector(`${options.titleField}`);
    this._subtitleField = this._rootSection.querySelector(`${options.subtitleField}`);
    this._articles = options.articles;
    this._cleanRootSection = options.cleanRootSection;
    this._wordDeclination = options.wordDeclination;
  }

  render() {
    this._setMarkup();
  }

  _setMarkup() {
    this._titleField.textContent = this._setTitle();

    this._cleanRootSection(this._subtitleField);

    this._subtitleField.insertAdjacentHTML(
      'beforeend',
      this._setSubtitleTitle(),
    );
  }

  _setTitle() {
    const articlesCount = this._articles.length || 'нет';

    const saveWordDeclination = this._articles.length
      ? this._wordDeclination(this._articles.length, [' сохраненная', ' сохраненные', ' сохраненных'])
      : 'сохраненных';

    const articleWordDeclination = this._articles.length
      ? this._wordDeclination(this._articles.length, ['статья', 'статьи', 'статей'])
      : 'статей';

    return `${this._user.name}, у Вас ${articlesCount} ${saveWordDeclination} ${articleWordDeclination}`;
  }

  _getKeywords() {
    const keywordsCounter = this._articles.reduce((prev, cur) => ({
      ...prev,
      [cur.keyword]: prev[cur.keyword] ? prev[cur.keyword] + 1 : 1,
    }), {});

    const sortKeywords = Object.keys(keywordsCounter).sort((a, b) => keywordsCounter[b] - keywordsCounter[a]);

    return sortKeywords;
  }

  _setSubtitleTitle() {
    const keywords = this._getKeywords();

    if (!keywords.length) {
      return '';
    }

    const shortString = keywords.reduce((prevWord, curWord, index, array) => {
      if (array.length === 1) {
        return `<b>${curWord}</b>`;
      }

      if (index === array.length - 1) {
        return `${prevWord} и <b>${curWord}</b>`;
      }

      return `${prevWord}${prevWord && curWord ? ',' : ''} <strong>${curWord}</strong>`;
    }, '');

    return keywords.length < 4
      ? `По ключевым словам: ${shortString}`
      : `По ключевым словам: <strong>${keywords[0]}</strong>, <strong>${keywords[1]}</strong> и <b>${keywords.length - 2}</b> другим`;
  }
}
