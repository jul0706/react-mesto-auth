export class Api {
	constructor(url, token) {
		this._url = url;
		this._token = token;
	}

	_checkResolve(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getDataServer(configUrl) {
		//метод получения информации с сервера
		return fetch(`${this._url}${configUrl}`, {
			// вернули запрос
			method: 'GET',
			headers: {
				authorization: this._token
			}
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	editUserInfo(data, configUrl) {
		// метод изменения информации о пользователе
		return fetch(`${this._url}${configUrl}`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	addCard(data, configUrl) {
		//метод добавленя карточки пользователем
		return fetch(`${this._url}${configUrl}`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	deleteCard(id, configUrl) {
		return fetch(`${this._url}${configUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token
			}
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	likeCard(id, configUrl, method) {
		return fetch(`${this._url}${configUrl}/${id}/likes`, {
			// вернули запрос
			method: method,
			headers: {
				authorization: this._token
			}
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}

	changeAvatar(data, configUrl) {
		//изменение аватара пользователя
		return fetch(`${this._url}${configUrl}`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: data.avatar
			})
		}).then(res => {
			//проверили ответ
			return this._checkResolve(res);
		});
	}
}

const api = new Api(
	'https://mesto.nomoreparties.co/v1/cohort-62/',
	'ad81bbad-9a90-4f3d-8a69-b0152768bbd9'
);
export default api;
