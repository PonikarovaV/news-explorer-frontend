import { showSnackbarWithError } from '../utils/helpers';

export default class NewsApi {
  static baseUrl = 'https://praktikum.tk/news/v2/';

  static apiKey = 'ea536e26e0ac49129e146fbe24cbc2ff';

  static simpleHeader = {
    'Content-Type': 'application/json',
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

  static getNews(query) {
    return fetch(`${NewsApi.baseUrl}everything?q=${query}&apiKey=${NewsApi.apiKey}`, {
      headers: NewsApi.simpleHeader,
    })
      .then(NewsApi.checkResponse)
      .catch(showSnackbarWithError);
  }
}
