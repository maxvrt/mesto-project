export default class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  getUser() {
    return fetch(`${this._url}/users/me`, {headers: this._headers}).then(res => getResponse(res));
  }
  getCards() {
    //console.log(`${this._url}/cards ${this._headers. authorization}`);
    return fetch(`${this._url}/cards`, {headers: this._headers}).then(res => getResponse(res));
  }
  patchUser(userName, userDesc) {
    return fetch(`${this._url}/users/me`, {method: 'PATCH', headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDesc
      })
    }).then(res => getResponse(res))
  }
  postCard(cardImg, cardName) {
    return fetch(`${this._url}/cards`, {method: 'POST', headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardImg
      }).then(res => this._getResponse(res))
    })
  }
  //todo передается по параметру в карточку
  delCardById(id) {
    return fetch(`${this._url}/cards/${id}`, {method: 'DELETE', headers: this._headers}).then(res => this._getResponse(res))
  }
  //todo
  likeCardById(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {method: 'PUT', headers: this._headers}).then(res => this._getResponse(res))
  }
  delLikeCardById(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers}).then(res => this._getResponse(res))
  }
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





const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '22ea861c-3f58-49dd-8e52-eb0909a1b5c2',
    'Content-Type': 'application/json'
  }
}

// Получение данных user
export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
}
// Получение данных cards
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
}
// Редактирование профиля
export function patchUser(userName, userDesc) {
  return fetch(`${config.baseUrl}/users/me`, {method: 'PATCH', headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDesc
    })
  })
}
// Добавление карточки
export function postCard(cardImg, cardName) {
  return fetch(`${config.baseUrl}/cards`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardImg
    })
  })
}
// Удаление карточки
export function delCardById(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {method: 'DELETE', headers: config.headers})
}
// Лайк карточки
export function likeCardById(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {method: 'PUT', headers: config.headers})
}
// Снятие лайка
export function delLikeCardById(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {method: 'DELETE', headers: config.headers})
}
// Аватар
export function patchAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {method: 'PATCH', headers: config.headers,
  body: JSON.stringify({avatar: userAvatar})
})
}

// ответ и ошибка
export function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}: ${res}`);
}
export function catchError(err) {
  console.log('Ошибка. Запрос не выполнен: ', err);
} 


