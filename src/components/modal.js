function renderButtonLoading(isLoading, popup) {
  const button = popup.querySelector('.form__button')
  if(isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export {renderButtonLoading};
