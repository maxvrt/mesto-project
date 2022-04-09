import { openModal, fillModalImg } from './modal.js'
import { imgPopup, template } from './constants.js'
import { getResponse, catchError, delLikeCardById, likeCardById } from './api.js';

// Лайк
function addLike(likeElement, likesCount) {
  likeElement.textContent = likesCount;
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
//Создание карточки - передача функции delCardById по параметру _в месте вызова_
function createCard(imgCard, nameCard, likes = [], cardId, ownerId = 1, userId = 1, delCardById) {
  const newCard = template.querySelector('.photos-grid__item').cloneNode(true);
  const heartButton = newCard.querySelector('.photos-grid__heart');
  const delButton = newCard.querySelector('.photos-grid__delete');
  const cardImg = newCard.querySelector('.photos-grid__img');
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
    newCard.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
  }
  // Лайк
  const likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
  heartButton.addEventListener('click',  () => {
    heartButton.classList.toggle('photos-grid__heart_active');
    if (heartButton.classList.contains('photos-grid__heart_active')){
      likeCardById(cardId).then(res => getResponse(res)).then((data) => {
        addLike(likeElement, data.likes.length);
      }).catch(err => catchError(err));
    } else {
      delLikeCardById(cardId).then(res => getResponse(res)).then((data) => {
        addLike(likeElement, data.likes.length);
      }).catch(err => catchError(err));
    }
  });
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
