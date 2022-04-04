import {openModal, fillModalImg} from './modal.js'
import {imgPopup, template} from './constants.js'

// Лайк
function addLike(heartButton) {
  heartButton.addEventListener('click',  () => {
    heartButton.classList.toggle('photos-grid__heart_active');
  });
}
// Удаление карточки
function delCard(delButton) {
  delButton.addEventListener('click',  () => {
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
function createCard(imgCard, nameCard) {
  const newCard = template.querySelector('.photos-grid__item').cloneNode(true);
  const heartButton = newCard.querySelector('.photos-grid__heart');
  const delButton = newCard.querySelector('.photos-grid__delete');
  const cardImg = newCard.querySelector('.photos-grid__img');
  cardImg.setAttribute('src', imgCard);
  cardImg.setAttribute('alt', nameCard);
  newCard.querySelector('.photos-grid__city').textContent = nameCard;
  // Лайк
  addLike(heartButton);
  // Удаление
  delCard(delButton);
  // Открытие картинки
  openImg(cardImg)
  return newCard;
}

export {createCard};
