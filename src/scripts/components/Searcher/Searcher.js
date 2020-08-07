import NewsApi from '../../api/NewsApi';
import { showSnackbarWithError } from '../../utils/helpers';

export default class Searcher {
  _regExp = /[а-яёА-ЯЁa-zA-Z0-9\s]+/gm;

  constructor(options) {
    this._searchField = document.querySelector(`${options.searchField}`);
    this._notFoundSection = document.querySelector(`${options.notFoundSection}`);
    this._notFoundMessageSection = this._notFoundSection.querySelector(`${options.notFoundMessageSection}`);
  }

  _getInputValue() {
    return this._searchField.value.trim().replace(/\s+/g, ' ');
  }

  sendRequest = async () => {
    try {
      const query = this._getInputValue();
      const isValidQuery = this._regExp.test(query);

      if (!isValidQuery) {
        showSnackbarWithError('Некорректный поисковый запрос. Допустимые символы: а-я, a-z (в верхнем и нижнем регистре), 0-9, пробелы.');

        return;
      }

      const { articles } = await NewsApi.getNews(query);

      if (!articles.length) {
        throw new Error(`К сожалению, по вашему запросу "${query}" ничего не найдено.`);
      }

      const articlesWithKeywords = articles.reduce((prev, cur) => ([
        ...prev,
        {
          ...cur,
          keyword: query,
        },
      ]), []);

      localStorage.setItem('articles', JSON.stringify(articlesWithKeywords));
    } catch (error) {
      showSnackbarWithError(error);
      this._notFoundMessageSection.textContent = `${error.message}`;
    }
  }
}
