import { openModal, fillModalImg } from './modal.js'
import { imgPopup, template } from './constants.js'
import { delCardById, getResponse, catchError, delLikeCardById, likeCardById } from './api.js';

// Лайк
function addLike(heartButton, cardId) {
  const likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
  heartButton.addEventListener('click',  () => {
    heartButton.classList.toggle('photos-grid__heart_active');
    if (heartButton.classList.contains('photos-grid__heart_active')){
      console.log('номер карточки - ' + cardId);
      likeCardById(cardId).then(res => getResponse(res)).then((data) => {
        likeElement.textContent = data.likes.length;
      }).catch(err => catchError(err));
    } else {
      delLikeCardById(cardId).then(res => getResponse(res)).then((data) => {
        likeElement.textContent = data.likes.length;
      }).catch(err => catchError(err));
    }
  });
}
// Удаление карточки
function delCard(delButton) {
  const listItem = delButton.closest("div");
  listItem.remove();
}
// Открытие картинки
function openImg(cardImg) {
  cardImg.addEventListener('click', () => {
    const imgSrc = cardImg.getAttribute('src');
    const imgAlt = cardImg.getAttribute('alt');
    fillModalImg(imgSrc, imgAlt);
    openModal(imgPopup);
});
}
//todo Создание карточки - передача функции delCardById по параметру, надо её передать в месте вызова
function createCard(imgCard, nameCard, likes = [], cardId, ownerId = 1, userId = 1, delCardById) {
  const newCard = template.querySelector('.photos-grid__item').cloneNode(true);
  const heartButton = newCard.querySelector('.photos-grid__heart');
  const delButton = newCard.querySelector('.photos-grid__delete');
  const cardImg = newCard.querySelector('.photos-grid__img');
  console.log(userId);
  if (userId !== '0' && userId === ownerId) {
    delButton.classList.remove('photos-grid__delete_hide');
  }
  cardImg.setAttribute('src', imgCard);
  cardImg.setAttribute('alt', nameCard);
  newCard.querySelector('.photos-grid__city').textContent = nameCard;
  // количество лайков
  newCard.querySelector('.photos-grid__heart-counter').textContent = likes.length;
  // окрашивание лайка
  if (checkLikes(likes, userId)) {
    console.log('Есть лайк');
    newCard.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
  }
  // Лайк
  addLike(heartButton, cardId);
  // Удаление карточки
  delButton.addEventListener('click',  () => {
    delCardById(cardId).then(res => getResponse(res)).then(() => {
      delCard(delButton);
    }).catch(err => catchError(err));
  });
  // Открытие картинки
  openImg(cardImg)
  return newCard;
}

function checkLikes(likes, userId) {
  if (userId !== 1 && likes.length > 0){
    return likes.some(element => { return element._id === userId; });
  }
}

export {createCard};
