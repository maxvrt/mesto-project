import { openModal, fillModalImg } from './modal.js'
import { imgPopup, template } from './constants.js'
import { delCardById, getResponse, catchError } from './api.js';

// Лайк
function addLike(heartButton) {
  heartButton.addEventListener('click',  () => {
    heartButton.classList.toggle('photos-grid__heart_active');
  });
}
// Удаление карточки
function delCard(delButton, cardId) {
  delButton.addEventListener('click',  () => {
    delCardById(cardId).then(res => getResponse(res)).then((data) => console.log(data+" 11111ОТВЕТ ФУНКЦИИ УДАЛЕНИЯ")).catch(err => catchError(err));
    const listItem = delButton.closest("div");
    listItem.remove();
  });
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
// Создание карточки
function createCard(imgCard, nameCard, likes, cardId, owner, userId) {
  const newCard = template.querySelector('.photos-grid__item').cloneNode(true);
  const heartButton = newCard.querySelector('.photos-grid__heart');
  const delButton = newCard.querySelector('.photos-grid__delete');
  const cardImg = newCard.querySelector('.photos-grid__img');
  if (userId !== '0' && userId === owner._id) {
    delButton.classList.remove('photos-grid__delete_hide');
  }
  cardImg.setAttribute('src', imgCard);
  cardImg.setAttribute('alt', nameCard);
  newCard.querySelector('.photos-grid__city').textContent = nameCard;
  newCard.querySelector('.photos-grid__heart-counter').textContent = likes.length;

  // Лайк
  addLike(heartButton);
  // Удаление
  delCard(delButton, cardId);
  // Открытие картинки
  openImg(cardImg)
  return newCard;
}

export {createCard};
