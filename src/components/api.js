const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '22ea861c-3f58-49dd-8e52-eb0909a1b5c2',
    'Content-Type': 'application/json'
  }
}

// GET user
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    console.log(data.name + "Пользователь111111111");
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}
