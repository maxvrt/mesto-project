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
  
  photosGridPlace.append(photosGridCity, likeButton);
  photosGridItem.append(imgElement, photosGridPlace); 
  photosGrid.prepend(photosGridItem); 

  closeOpenModal(placePopup);
}
placeFormElement.addEventListener('submit', formCardSubmitHandler);

// Лайк карточки
const photosGridHeart = document.querySelector('.photos-grid');
photosGridHeart.addEventListener('click',  evt => {
  const heartButton = evt.target;
  if (heartButton.className.includes('photos-grid__heart link')){
    heartButton.classList.toggle('photos-grid__heart_active');
  }  
}); 