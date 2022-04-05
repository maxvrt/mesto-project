import {imgDescElement, imgElement, profileName, profileDesc, nameInput, jobInput, profilePopup, imgInput, placeInput, placePopup, photosGrid} from './constants.js';
import { createCard } from './card.js';

// Функции открытия и закрытия модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', evt => {closeModalEsc(evt);});
}
function closeModal(popup) {
  popup.classList.remove('popup_opened');

}
function closeModalOverlay(evt, popup) {
  if (evt.target.classList.contains('popup_opened') && !evt.target.classList.contains('popup__popup-box')){
    closeModal(popup);
  }
}

function closeModalEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popup){
    document.removeEventListener('keydown', evt => {closeModalEsc(evt)});
    closeModal(popup);
  }
}
function disableButton(buttonElement) {
  console.log(buttonElement+" - 1111111111111");
  buttonElement.classList.add('form__button_inactive');
  buttonElement.classList.remove('link');
  buttonElement.setAttribute('disabled', '');
}

// Добавление карточки
function addCardFromForm(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.querySelector('.form__button');
  photosGrid.prepend(createCard(imgInput.value, placeInput.value));
  disableButton(buttonElement);
  imgInput.value = '';
  placeInput.value = '';
  closeModal(placePopup);
}

// Функция заполнения модального окна картинки
function fillModalImg(imgValue, altValue) {
  imgElement.setAttribute('src', imgValue);
  imgElement.setAttribute('alt', altValue);
  imgDescElement.textContent = altValue;
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  console.log();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileDesc.textContent = jobValue;
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  closeModal(profilePopup);
}

export {fillModalImg, openModal, closeModal, closeModalEsc, closeModalOverlay, handleFormProfileSubmit, addCardFromForm};
