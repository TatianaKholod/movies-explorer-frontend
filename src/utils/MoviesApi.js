import {BASE_URL} from "./Auth.js";

class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.credentials = options.credentials;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(urlEndPoint, options) {
    return fetch(this.baseUrl + urlEndPoint, options).then(this._checkResponse);
  }

  getSavedMovies() {
    return this._request('/movies', {
      headers: this.headers,
      credentials: this.credentials,
    });
  }
  deleteSavedMovie(movieId) {
    return this._request(`/${movieId}`, {
      method: 'DELETE',
      credentials: this.credentials,
      headers: this.headers,
    });
  }

  addSavedMovie(movieObj) {
    return this._request('/movies/', {
      method: 'POST',
      credentials: this.credentials,
      headers: this.headers,
      body: JSON.stringify(movieObj),
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BASE_URL,
  credentials: 'include', // теперь куки посылаются вместе с запросом
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
