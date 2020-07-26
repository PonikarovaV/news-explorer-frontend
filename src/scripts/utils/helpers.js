import validator from 'validator';

import NewsCard from '../components/NewsCard/NewsCard';
import NewsCardList from '../components/NewsCardList/NewsCardList';

/**
 * Проверяет наличие токена в localstorage
 * @param none
 * @returns {boolean} - возращает true, если токен есть и он валиден, false - если нет
 */
export const getAuthState = () => localStorage.getItem('token') && validator.isJWT(localStorage.getItem('token'));

/**
 * Очищает корневую секцию от потомков
 * @param {HTMLElement} - корневая секция
 * @returns {void} - ничего не возвращает
 */
export const cleanRootSection = (rootSection) => {
  if (!rootSection) {
    return;
  }

  while (rootSection.firstChild) {
    rootSection.removeChild(rootSection.firstChild);
  }
};

/**
 * Показывает снэкбар с ошибкой и закрывает его после 5 секунд
 * @param {string} - ошибка
 * @returns {void} - ничего не возвращает
 */
export const showSnackbarWithError = (error) => {
  const snackbar = document.querySelector('.snackbar');
  const messageField = snackbar.querySelector('.snackbar__message');

  snackbar.classList.add('snackbar_visible');
  messageField.textContent = `${error}`;

  setTimeout(() => {
    snackbar.classList.remove('snackbar_visible');
    messageField.textContent = '';
  }, 5000);
};

/**
 * Устанавливает состояние блока "Результаты поиска" (возможные ключи: startSearch, notFound, newsListSuccess, newsListReject, endSearch).
 * Дефолтное состояние - все секции в состоянии invisible, localStorage очищен
 * @param {string} - ключ состояния
 * @returns {void} - ничего не возвращает
 */
export const setNewsListSectionState = (key) => {
  const isLoadingSection = document.querySelector('#is-loading');
  const notFoundSection = document.querySelector('#not-found');
  const newsListSection = document.querySelector('.news');

  switch (key) {
    case 'startSearch':
      localStorage.removeItem('articles');
      newsListSection.classList.add('news_invisible');
      isLoadingSection.classList.add('request-info_visible');
      break;

    case 'notFound':
      isLoadingSection.classList.remove('request-info_visible');
      notFoundSection.classList.add('request-info_visible');
      break;

    case 'newsListSuccess':
      newsListSection.classList.remove('news_invisible');
      break;

    case 'newsListReject':
      newsListSection.classList.add('news_invisible');
      break;

    case 'endSearch':
      isLoadingSection.classList.remove('request-info_visible');
      break;

    default:
      localStorage.removeItem('articles');
      newsListSection.classList.add('news_invisible');
      notFoundSection.classList.remove('request-info_visible');
      isLoadingSection.classList.remove('request-info_visible');
      break;
  }
};

/**
 * Отрисовка карточек с новостями.
 * @param {string} - дата
 * @returns {string} - возвращает отформатированную дату
 */
export const getDate = (time) => {
  const date = new Date(time);
  const day = date.toLocaleDateString('ru', { day: '2-digit', month: 'long' });
  const year = date.getFullYear().toString();

  return `${day}, ${year}`;
};

/**
 * Отрисовка карточек с новостями.
 * @param {Array} - массив карточек
 * @returns {void} - ничего не возвращает
 */
export const setNewsList = (articles, savedArticles) => {
  const cardList = articles.map((article) => new NewsCard({
    rootSection: {
      tag: 'section',
      class: 'card',
    },
    article,
    getAuthState,
    getDate,
    showSnackbarWithError,
    savedArticles,
  }));

  const newsCardList = new NewsCardList({
    rootSection: '.news__cards',
    showMoreButton: '.button_type_show-more',
    cleanRootSection,
    cardList,
  });

  newsCardList.render();
};
