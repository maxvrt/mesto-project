// в конструкторе данные типа текста, изображения и селектор темплейта,
// в getElement копирование темплейта и его возврат
// в generate вставка данных в темплейт и возврат элемента с данными
export class Card{
  constructor(data, userId = 1, selector) {
    //console.log('data2', data.link);
    if (data) this.imgCard = data.link;
    this._nameCard = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    if (data.owner) this._ownerId = data.owner._id;
    this._userId = userId;
    this._selector = selector;
    this._isUserLike = false;
    this._element = '';
    this._heartButton = '';
    this._delButton = '';
    this._cardImg = '';
    this._likeElement = '';
    this.isLiked = false;
    this._elementHeartCounter = '';
    // кнопка лайка
    //this._likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
  }

  create({delCallback, likeCallback, imgCallback}) {
    //const card = new Card(data, userId, selector);
    //const cardElement = this.generate();
    // const cardImg = card.getImg();
    // const cardId = card.getId();
    // const cardElement = card.generate();
    this._setEventListeners({delCallback:delCallback, likeCallback:likeCallback, imgCallback:imgCallback});
    //return this;
  }
  // создание карточки
  generate() {
    this._element = this._getElement();
    this._heartButton = this._element.querySelector('.photos-grid__heart');
    this._delButton = this._element.querySelector('.photos-grid__delete');
    this._cardImg = this._element.querySelector('.photos-grid__img');
    this._elementHeartCounter = this._element.querySelector('.photos-grid__heart-counter');
    // если лайк установлен и будет удаляться
    if (this._heartButton.classList.contains('photos-grid__heart_active')){
      this.isLiked = true
    }
    if (this._userId !== '0' && this._userId === this._ownerId) {
      this._delButton.classList.remove('photos-grid__delete_hide');
    }
    //есть ли лайк пользователя
    if(this.checkUserLike()) this._element.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
    this._cardImg.setAttribute('src', this.imgCard);
    this._cardImg.setAttribute('alt', this._nameCard);
    this._element.querySelector('.photos-grid__city').textContent = this._nameCard;

    // количество лайков
    if (this._likes)
    this._element.querySelector('.photos-grid__heart-counter').textContent = this._likes.length;
  	return this._element;
  }

  _setEventListeners({delCallback, likeCallback, imgCallback}) {
    this._delButton.addEventListener('click',  () => {
      delCallback().then(() => {
        this.delCard(this._delButton);
      }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err);});
    });

    this._heartButton.addEventListener('click',  () => {
      this._heartButton.classList.toggle('photos-grid__heart_active');
      console.log('есть лайк -'+ this.isLiked);
      // перед запросом проверяем лайки
      this.isLiked = this.checkUserLike();
      likeCallback().then((data) => {
        this.addCount(this._elementHeartCounter, data.likes.length);
      }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err);});
    });

    this._cardImg.addEventListener('click',  () => {
      imgCallback();
    });
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
    if (this._userId !== 1 && this._likes.length > 0){
      return this._likes.some(element => { return element._id === this._userId; });
    }
  }
  // Лайк
  addCount(likeElement, likesCount) {
    likeElement.textContent = likesCount;
  }
  // Удаление карточки
  delCard() {
    // const listItem = delButton.closest("div");
    // listItem.remove();
    this._element.remove();
  }
}
