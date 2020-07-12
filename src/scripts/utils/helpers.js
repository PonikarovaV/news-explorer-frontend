import validator from 'validator';

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
