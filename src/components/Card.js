// в конструкторе данные типа текста, изображения и селектор темплейта,
// в getElement копирование темплейта и его возврат
// в generate вставка данных в темплейт и возврат элемента с данными
export class Card{
  constructor(data, userId = 1, selector, {delCallback, likeCallback, imgCallback}) {
    //console.log('data2', data.link);
    if (data) this.imgCard = data.link;
    this._nameCard = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    if (data.owner) this._ownerId = data.owner._id;
    this._userId = userId;
    this._selector = selector;
    this._element = '';
    this._heartButton = '';
    this._delButton = '';
    this.cardImg = '';
    this._likeElement = '';
    this.isLiked = false;
    this._elementHeartCounter = '';
    this._delCallback = delCallback;
    console.log(delCallback + ' функция колбэка удаления');
    this._likeCallback = likeCallback;
    this._imgCallback = imgCallback;
    //this._setEventListeners({delCallback:delCallback, likeCallback:likeCallback, imgCallback:imgCallback});
  }

  // create({delCallback, likeCallback, imgCallback}) {
  //  this._setEventListeners({delCallback:delCallback, likeCallback:likeCallback, imgCallback:imgCallback});
  // }

  // создание карточки
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this._heartButton = this._element.querySelector('.photos-grid__heart');
    this._delButton = this._element.querySelector('.photos-grid__delete');
    this.cardImg = this._element.querySelector('.photos-grid__img');
    this._elementHeartCounter = this._element.querySelector('.photos-grid__heart-counter');
    // если лайк установлен и будет удаляться
    if (this._userId !== '0' && this._userId === this._ownerId) {
      this._delButton.classList.remove('photos-grid__delete_hide');
    }
    //есть ли лайк пользователя
    if(this.checkUserLike()) {
      this._element.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
      this.isLiked = true;
    }
    this.cardImg.setAttribute('src', this.imgCard);
    this.cardImg.setAttribute('alt', this._nameCard);
    this._element.querySelector('.photos-grid__city').textContent = this._nameCard;
    // количество лайков
    if (this._likes) this._element.querySelector('.photos-grid__heart-counter').textContent = this._likes.length;

  	return this._element;
  }

  _setEventListeners() { //{delCallback, likeCallback, imgCallback}
    this._element.querySelector('.photos-grid__delete').addEventListener('click',  () => {
      this._delCallback();
      // delCallback().then(() => {
      //   this.delCard(this._delButton);
      // }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err);});
    });
    this._element.querySelector('.photos-grid__heart').addEventListener('click',  () => {
      this._likeCallback();
      // console.log('есть лайк -'+ this.isLiked);
      // if (checkUserLike())
      // likeCallback().then((data) => {
      //   console.log(data.likes.length);
      //   this.toggleLike(data.likes.length);
      // }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err);});
    });

    this._element.querySelector('.photos-grid__img').addEventListener('click',  () => {
      this._imgCallback();
      //imgCallback();
    });
  }

  getImg() {
    return this.cardImg;
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
  checkUserLike(data = this) {
    if (this._userId !== 1 && this._likes.length > 0){
      return data._likes.some(element => { return element._id === this._userId; });
    }
  }
  // Лайк
  toggleLike(data) {
    if (data.likes.length>0) {
      console.log(data.likes + 'Внутри card1');
      this.isLiked = data.likes.some(element => { return element._id === this._userId; });
      this._elementHeartCounter.textContent = data.likes.length;
    } else {
      this._elementHeartCounter.textContent = '0';
      this.isLiked = false;
    }
    this._heartButton.classList.toggle('photos-grid__heart_active');
  }
  // Удаление карточки
  delCard() {
    // const listItem = delButton.closest("div");
    // listItem.remove();
    this._element.remove();
  }
}
