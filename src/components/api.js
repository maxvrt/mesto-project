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
// Добавление карточки
export function delCardById(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {method: 'DELETE', headers: config.headers})
}

// ответ и ошибка
export function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
export function catchError(err) {
  console.log('Ошибка. Запрос не выполнен: ', err);
}
