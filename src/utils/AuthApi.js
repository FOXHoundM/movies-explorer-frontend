export const BASE_URL = 'https://api.foxhound.nomoredomains.rocks'

const request = (url, options) => {
	return fetch(url, options).then(getRequestData())
}

const getRequestData = () => {
	return (res) => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}. Причина: ${res.statusText}`)
	}
}

export const register = async ({name, email, password}) => {
	try {
		const res = await request(`${BASE_URL}/signup`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({name, email, password})
		})
		return res
	} catch (err) {
		return console.error(err)
	}
}

export const authorize = async (email, password) => {
	try {
		const res = await request(`${BASE_URL}/signin`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		})
		return res
	} catch (err) {
		return console.error(err)
	}
}

export const checkToken = async (JWT) => {
	try {
		const res = await request(`${BASE_URL}/users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${JWT}`
			}
		})
		return res
	} catch (err) {
		return console.error(err)
	}
}
