class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  async getAllMovies() {
    const res = await fetch(`${this._url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return this.checkError(res);
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;