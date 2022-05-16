export default class Section{
  constructor ({renderer}, selector){
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(items) {
    items.forEach(cardItem => this._renderer(cardItem))
  }
  // вставка карточки в сетку
  setItem(element) {
    this._container.append(element);
  }
  setItemOne(element) {
    this._container.prepend(element)
  }
}
