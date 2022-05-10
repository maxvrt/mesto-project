export default class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  getUser() {
    return fetch(`${this._url}/users/me`, {headers: this._headers}).then(res => this._getResponse(res));
  }
  getCards() {
    return fetch(`${this._url}/cards`, {headers: this._headers}).then(res => this._getResponse(res));
  }
  patchUser(userName, userDesc) {
    return fetch(`${this._url}/users/me`, {method: 'PATCH', headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDesc
      })
    }).then(res => this._getResponse(res))
  }
  postCard(cardImg, cardName) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardImg,
      })
    }).then(res => this._getResponse(res))
  }

  delCardById(id) {
    return fetch(`${this._url}/cards/${id}`, {method: 'DELETE', headers: this._headers}).then(res => this._getResponse(res))
  }

  toggleLikeCardById(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers}).then(res => this._getResponse(res))
    } else {
      return fetch(`${this._url}/cards/likes/${id}`, {method: 'PUT', headers: this._headers}).then(res => this._getResponse(res))
    }
  }
  
  // delLikeCardById(id) {
  //   return fetch(`${this._url}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers}).then(res => this._getResponse(res))
  // }
  patchAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {method: 'PATCH', headers: this._headers,
      body: JSON.stringify({avatar: userAvatar})
    })
    //.then(res => this._getResponse(res))
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}: ${res}`);
  }
  catchError(err) {
    console.log('Ошибка. Запрос не выполнен (класс): ', err);
  }
}
