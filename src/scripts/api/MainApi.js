export default class MainApi {
  static signup(options) {
    const { name, email, password } = options;

    return fetch('https://api.mygeneralnews.tk/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(res.status));
      })
      .catch((error) => console.log(error));
  }

  static signin(options) {
    const { email, password } = options;

    return fetch('https://api.mygeneralnews.tk/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(res.status));
      })
      .catch((error) => console.log(error));
  }
}
