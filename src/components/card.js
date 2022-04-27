import { openModal, fillModalImg } from './modal.js'
import { imgPopup, template } from './constants.js'
import { getResponse, catchError, delLikeCardById, likeCardById } from './api.js';

// в конструкторе данные типа текста, изображения и селектор темплейта,
// в getElement копирование темплейта и его возврат
// в generate вставка данных в темплейт и возврат элемента с данными
export class Card{
  constructor(data, userId = 1, selector) {
    this._imgCard = data.link;
    this._nameCard = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._selector = selector;
    this._isUserLike = false;
    // кнопка лайка
    //this._likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
  }
  // создание карточки
  generate() {
    this._element = this._getElement();
    //const heartButton = this._element.querySelector('.photos-grid__heart');
    const delButton = this._element.querySelector('.photos-grid__delete');
    this._cardImg = this._element.querySelector('.photos-grid__img');
    if (this._userId !== '0' && this._userId === this._ownerId) {
      delButton.classList.remove('photos-grid__delete_hide');
    }
    this._cardImg.setAttribute('src', this._imgCard);
    this._cardImg.setAttribute('alt', this._nameCard);
    this._element.querySelector('.photos-grid__city').textContent = this._nameCard;
    // количество лайков
    this._element.querySelector('.photos-grid__heart-counter').textContent = this._likes.length;

    // this._element.querySelector('.message__avatar').src = this._image;
  	// this._element.querySelector('.message__paragraph').textContent = this._text;

  	return this._element;
  }
  getImg() {
    return this._cardImg;
  }
  getId() {
    return this._cardId;
  }
  // клонирование темплейта
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.photos-grid__item').cloneNode(true);
    //const template = document.querySelector('#card-template').content;
    return cardElement;
  }
  // проверка лайкал ли юзер
  checkUserLike() {
    console.log(this._userId);
    if (this._userId !== 1 && this._likes.length > 0){
      return this._likes.some(element => { return element._id === this._userId; });
    }
  }
  // Лайк
  addLike(likeElement, likesCount) {
    likeElement.textContent = likesCount;
  }
  // Удаление карточки
  delCard(delButton) {
    const listItem = delButton.closest("div");
    listItem.remove();
  }
}




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
