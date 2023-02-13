export const BASE_URL = 'https://api.foxhound.nomoredomains.rocks';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
		}),
	});
	return checkResponse(res);
};
export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	return checkResponse(res);
};

export const updateUserInfo = async (name, email) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
		body: JSON.stringify({
			name: name,
			email: email,
		}),
	});
	return checkResponse(res);
};

export const getUserInfo = async () => {
  const res = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	});
	return checkResponse(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return checkResponse(res);
};