// Создание и вывод карточек
const photosGrid = document.querySelector('.photos-grid');
const template = document.querySelector('#card-template').content;
// Профиль 
const profileModalCloseButton = document.querySelector('.popup__close.popup_profile');
const profileModalOpenButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');
const profileFormElement = document.querySelector('.form_profile');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_desc');
// Окно добавления карточки
const placeModalCloseButton = document.querySelector('.popup__close.popup_place');
const placeModalOpenButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
const placeFormElement = document.querySelector('.form_place');
const placeInput = document.querySelector('.form__item_el_place');
const imgInput = document.querySelector('.form__item_el_img-place');
// Модальное окно картинки
const imgModalButtonClose = document.querySelector('.popup__close.popup_img');
const imgPopup = document.querySelector('.popup_img');
const imgPopupBox = imgPopup.querySelector('.popup__img-box');
const imgElement = imgPopup.querySelector('.popup__photo');
const imgDescElement = imgPopup.querySelector('.popup__desc');


function createCard(imgCard, nameCard) { 
  const newCard = template.querySelector('.photos-grid__item').cloneNode(true);
  const heartButton = newCard.querySelector('.photos-grid__heart');
  const delButton = newCard.querySelector('.photos-grid__delete');
  const cardImg = newCard.querySelector('.photos-grid__img');
  cardImg.setAttribute('src', imgCard);
  cardImg.setAttribute('alt', nameCard);
  newCard.querySelector('.photos-grid__city').textContent = nameCard;  
  // Лайк
  heartButton.addEventListener('click',  () => {    
    heartButton.classList.toggle('photos-grid__heart_active');    
  }); 
  // Удаление
  delButton.addEventListener('click',  () => {    
    const listItem = delButton.closest("div");
    listItem.remove();   
  }); 
  // Модальное окно
  cardImg.addEventListener('click', () => {
      const imgSrc = cardImg.getAttribute('src');
      const imgAlt = cardImg.getAttribute('alt');
      fillModalImg(imgSrc, imgAlt);
      openModal(imgPopup);
  }); 
  return newCard;
}
initialCards.forEach((item) => {
  photosGrid.append(createCard(item['link'],item['name']));
});

// Функции открытия-закрытия модального окна
function openModal(popup) { 
  popup.classList.add('popup_opened');
}
function closeModal(popup) { 
  popup.classList.remove('popup_opened');
}

// Профиль
profileModalCloseButton.addEventListener('click', () => {closeModal(profilePopup)}); 
profileModalOpenButton.addEventListener('click', () => {openModal(profilePopup)});
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;  
  profileName.textContent = nameValue;
  profileDesc.textContent = jobValue;
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleFormProfileSubmit);

// Окно добавления карточки
placeModalCloseButton.addEventListener('click', () => {closeModal(placePopup)}); 
placeModalOpenButton.addEventListener('click', () => {openModal(placePopup)});
function addCardFromForm(evt) {
  evt.preventDefault();   
  photosGrid.prepend(createCard(imgInput.value, placeInput.value)); 
  closeModal(placePopup);
}
placeFormElement.addEventListener('submit', addCardFromForm);

// Функция заполнения модального окна картинки
function fillModalImg(imgValue, altValue) {     
  imgElement.setAttribute('src', imgValue);
  imgElement.setAttribute('alt', altValue);
  imgDescElement.textContent = altValue;
}
// Открытие-закрытие модального окна картинки
imgModalButtonClose.addEventListener('click', () => { closeModal(imgPopup) }); 