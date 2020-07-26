import { showSnackbarWithError } from '../utils/helpers';

export default class MainApi {
  static baseUrl = 'https://api.mygeneralnews.tk'

  static simpleHeader = {
    'Content-Type': 'application/json',
  }

  static preflightHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  static checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }

    response.json()
      .then((error) => {
        throw new Error(error.message);
      })
      .catch(showSnackbarWithError);

    return Promise.reject(new Error(response.status));
  }

  static signup(options) {
    const { name, email, password } = options;

    return fetch(`${MainApi.baseUrl}/signup`, {
      method: 'POST',
      headers: MainApi.simpleHeader,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }

  static signin(options) {
    const { email, password } = options;

    return fetch(`${MainApi.baseUrl}/signin`, {
      method: 'POST',
      headers: MainApi.simpleHeader,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }

  static getUserData(token) {
    return fetch(`${MainApi.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }

  static getArticles() {
    return fetch(`${MainApi.baseUrl}/articles`, {
      headers: MainApi.preflightHeader,
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }

  static saveAtricle(options) {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = options;

    return fetch(`${MainApi.baseUrl}/articles`, {
      method: 'POST',
      headers: MainApi.preflightHeader,
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }

  static deleteArticle(articleId) {
    return fetch(`${MainApi.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: MainApi.preflightHeader,
    })
      .then(MainApi.checkResponse)
      .catch(showSnackbarWithError);
  }
}
