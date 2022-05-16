export default class Section{
  constructor ({cardData, renderer}, selector){
    this._renderedItems = cardData;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(items) {
    // if (Array.isArray(items)){
    //   console.log('обрабатываем массив карточек');
    //   // Основной метод рендера куда передается карточка, внутри _renderer вызывается setItem
    //   items.forEach(cardItem => this._renderer(cardItem))
    // } else {
    //   this._renderer(items)
    // }
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
