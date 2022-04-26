import { photosGrid } from './constants.js';
import { createCard } from './card.js';

export default class Section{
  constructor ({cardListData, renderer}, selector){ //,userId, delCardById
    this._renderedItems = cardListData;
    this._renderer = renderer;
    console.log(selector);
    console.log(document);
    //todo разобраться с ошибкой - селектор selector определяется как объект
    this._container = document.querySelector('.photos-grid');
    console.log(cardListData);
  }
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }
  // вставка карточки в сетку
  setItem(element) {
    // data.forEach((item) => {
    //   photosGrid.append(createCard(item['link'], item['name'], item['likes'], item['_id'], item['owner']._id, userId, delCardById));
    // });
    this._container.append(element);
  }
}
