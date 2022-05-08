// в конструкторе данные типа текста, изображения и селектор темплейта,
// в getElement копирование темплейта и его возврат
// в generate вставка данных в темплейт и возврат элемента с данными
export class Card{
  constructor(data, userId = 1, selector) {
    this._imgCard = data.link;
    console.log();
    this._nameCard = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    if (data.owner) this._ownerId = data.owner._id;
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
    if (this._likes)
    this._element.querySelector('.photos-grid__heart-counter').textContent = this._likes.length;
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
