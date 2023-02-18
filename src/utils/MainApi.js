class MainApi {
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

  async getSavedMovies() {
    const res = await fetch(`${this._url}/movies`, {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`
			},
		});
		return this.checkError(res);
  }

  async addMovie(movie) {
    const res = await fetch(`${this._url}/movies`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: `https://api.nomoreparties.co${movie.image.url}`,
				trailerLink: movie.trailerLink,
				thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
				movieId: movie.id.toString(),
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			}),
		});
		return this.checkError(res);
  }

  async deleteMovie(id) {
    const res = await fetch(`${this._url}/movies/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`
			},
		});
		return this.checkError(res);
  }


}

const mainApi = new MainApi({
  url: 'https://api.movies.explorer.nomorepartiesxyz.ru',
});

export default mainApi;