import { openModal, fillModalImg } from './modal.js'
import { imgPopup, template } from './constants.js'

// в конструкторе данные типа текста, изображения и селектор темплейта,
// в getElement копирование темплейта и его возврат
// в generate вставка данных в темплейт и возврат элемента с данными
export default class Card{
  constructor({data}, userId = 1, selector) {
    this._imgCard = data.link;
    this._nameCard = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._selector = selector;
    // кнопка лайка
    //this._likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
  }

  // создание карточки
  generate() {
    this._element = this._getElement();
    // const heartButton = this._element.querySelector('.photos-grid__heart');
    // const delButton = this._element.querySelector('.photos-grid__delete');
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

  // окрашивание лайка
  // isUserLike = checkLikes(likes, userId)
  setColorLike(isUserLike){
    if (isUserLike) {
      newCard.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
    }
  }
  // проверка лайкал ли юзер
  checkLikes() {
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
  // Установка слушателя открытия картинки (вызывался прямо в файле карточки)
  // openImg(cardImg) {
  //   cardImg.addEventListener('click', () => {
  //     const imgSrc = cardImg.getAttribute('src');
  //     const imgAlt = cardImg.getAttribute('alt');
  //     fillModalImg(imgSrc, imgAlt);
  //     openModal(imgPopup);
  //   });
  // }
  // Удаление карточки
  // setEventDeleteCard(){
  //   delButton.addEventListener('click',  () => {
  //     // метод api для удаления карточки вынести в index
  //     delCardById(cardId).then(res => getResponse(res)).then(() => {
  //       delCard(delButton);
  //     }).catch(err => catchError(err));
  //   });
  // }

  // Лайк
  // setEventLikeCard(){
  //   heartButton.addEventListener('click',  () => {
  //     heartButton.classList.toggle('photos-grid__heart_active');
  //     if (heartButton.classList.contains('photos-grid__heart_active')){
  //       likeCardById(cardId).then(res => getResponse(res)).then((data) => {
  //         addLike(this._likeElement, data.likes.length);
  //       }).catch(err => catchError(err));
  //     } else {
  //       delLikeCardById(cardId).then(res => getResponse(res)).then((data) => {
  //         addLike(this._likeElement, data.likes.length);
  //       }).catch(err => catchError(err));
  //     }
  //   });
  // }
}
