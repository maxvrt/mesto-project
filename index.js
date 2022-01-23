// Вывод карточек
const names = document.querySelectorAll('.photos-grid__city');
names.forEach((item, index) => {
  item.textContent = initialCards[index]['name'];
});
const imgs = document.querySelectorAll('.photos-grid__img');
imgs.forEach((item, index) => {
  item.setAttribute('src', initialCards[index]['link']);
  item.setAttribute('alt', initialCards[index]['name']);
});


// Функция открытия-закрытия модального окна
function closeOpenModal(popup) { 
  popup.classList.toggle('popup_opened');
}

// Профиль
const closeProfileModalButton = document.querySelector('.popup__close.popup_profile');
const openProfileModalButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_profile');
closeProfileModalButton.addEventListener('click', () => {closeOpenModal(profilePopup)}); 
openProfileModalButton.addEventListener('click', () => {closeOpenModal(profilePopup)});

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');
const profileFormElement = document.querySelector('.form_profile');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_desc');
function formProfileSubmitHandler (evt) {
  evt.preventDefault();   
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;  
  profileName.textContent = nameValue;
  profileDesc.textContent = jobValue;
  document.querySelector('.form__item_el_name').value = profileName.textContent;
  document.querySelector('.form__item_el_desc').value = profileDesc.textContent;
  closeOpenModal(profilePopup);
}
profileFormElement.addEventListener('submit', formProfileSubmitHandler);

// Карточка
const closePlaceModalButton = document.querySelector('.popup__close.popup_place');
const openPlaceModalButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
closePlaceModalButton.addEventListener('click', () => {closeOpenModal(placePopup)}); 
openPlaceModalButton.addEventListener('click', () => {closeOpenModal(placePopup)});

const placeFormElement = document.querySelector('.form_place');
const placeInput = document.querySelector('.form__item_el_place');
const imgInput = document.querySelector('.form__item_el_img-place');
const photosGrid = document.querySelector('.photos-grid');
// Форма добавления карточки
function formCardSubmitHandler (evt) {
  evt.preventDefault();   
  const placeValue = placeInput.value;
  const imgValue = imgInput.value;    
  const photosGridItem = document.createElement('div');
  photosGridItem.classList.add('photos-grid__item');
  
  const imgElement = document.createElement('img');
  imgElement.classList.add('photos-grid__img');
  imgElement.setAttribute('src', imgValue);

  const photosGridPlace = document.createElement('div');
  photosGridPlace.classList.add('photos-grid__place');
  
  const photosGridCity = document.createElement('h2');
  photosGridCity.classList.add('photos-grid__city');
  photosGridCity.textContent = placeValue; 
 
  const likeButton = document.createElement('button');
  likeButton.classList.add('photos-grid__heart');
  likeButton.classList.add('link');
  
  const delButton = document.createElement('button');
  delButton.classList.add('photos-grid__delete');
  delButton.classList.add('link');

  photosGridPlace.append(photosGridCity, likeButton);
  photosGridItem.append(imgElement, photosGridPlace, delButton); 
  photosGrid.prepend(photosGridItem); 

  closeOpenModal(placePopup);
}
placeFormElement.addEventListener('submit', formCardSubmitHandler);

// Лайк карточки
photosGrid.addEventListener('click',  evt => {
  const heartButton = evt.target;
  if (heartButton.className.includes('photos-grid__heart link')){
    heartButton.classList.toggle('photos-grid__heart_active');
  }  
}); 
// Удаление карточки
photosGrid.addEventListener('click',  evt => {
  const delButton = evt.target;
  if (delButton.className.includes('photos-grid__delete link')){
    const listItem = delButton.closest("div");
    listItem.remove(); 
  }  
}); 

// Модальное окно картинки
const imgModalButtonClose = document.querySelector('.popup__close.popup_img');
const imgPopup = document.querySelector('.popup_img');
// Функция заполнения модального окна
function fillModalImg(imgValue, altValue, popup) {     
  const popupBox = popup.firstElementChild;
  const imgElement = popupBox.querySelector('.popup__photo');
  const descElement = popupBox.querySelector('.popup__desc');
  imgElement.setAttribute('src', imgValue);
  imgElement.setAttribute('alt', altValue);
  descElement.textContent = altValue;
}
// Открытие-закрытие модального окна
imgModalButtonClose.addEventListener('click', () => { closeOpenModal(imgPopup) }); 
photosGrid.addEventListener('click',  evt => {
  const imgGrid = evt.target;
  if (imgGrid.className.includes('photos-grid__img')){
    const imgSrc = imgGrid.getAttribute('src');
    const imgAlt = imgGrid.getAttribute('alt');
    fillModalImg(imgSrc, imgAlt, imgPopup);
    closeOpenModal(imgPopup);
  }  
}); 