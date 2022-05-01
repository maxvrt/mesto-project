import { photosGrid } from './constants.js';
import { createCard } from './card.js';

export default class Section{
  constructor ({cardListData, renderer}, selector){
    this._renderedItems = cardListData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    //! Основной метод рендера куда передается карточка
    this._renderedItems.forEach(cardItem => this._renderer(cardItem))
  }
  // вставка карточки в сетку
  setItem(element) {
    this._container.append(element);
  }
}
