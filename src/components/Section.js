export default class Section{
  constructor ({cardData, renderer}, selector){
    this._renderedItems = cardData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    if (Array.isArray(this._renderedItems)){
      console.log('обрабатываем массив карточек');
      // Основной метод рендера куда передается карточка, внутри _renderer вызывается setItem
      this._renderedItems.forEach(cardItem => this._renderer(cardItem))
    } else {
      this._renderer(this._renderedItems)
    }
  }
  // вставка карточки в сетку
  setItem(element, justOne) {
    if (justOne) this._container.prepend(element)
    else this._container.append(element);
  }
  // setItemAll(element) {
  //   this._container.append(element);
  // }
  // create({cardData, renderer}, selector) {
  //   this._renderedItems = cardData;
  //   this._renderer = renderer;
  //   this._container = document.querySelector(selector);
  // }

}
