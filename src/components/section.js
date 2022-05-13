export default class Section{
  constructor (){
    // this._renderedItems = cardData;
    // this._renderer = renderer;
    // this._container = document.querySelector(selector);
  }
  renderItems() {
    if (Array.isArray(this._renderedItems)){
      // Основной метод рендера куда передается карточка, внутри _renderer вызывается setItem
      this._renderedItems.forEach(cardItem => this._renderer(cardItem))
    } else {
      this._renderer(this._renderedItems)
    }
  }
  // вставка карточки в сетку
  setItem(element) {
    this._container.prepend(element);
  }
  setItemAll(element) {
    this._container.append(element);
  }
  create({cardData, renderer}, selector) {
    this._renderedItems = cardData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

}
