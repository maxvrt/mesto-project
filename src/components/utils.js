import { imgDescElement, imgElement,} from './constants'
import { Card } from './card.js';

export function createCard(cardItem, userId, selector, imgPopupObj) {
  console.log('data ', {cardItem});
  const card = new Card(cardItem, userId, selector);
  const cardImg = card.getImg();
  const cardId = card.getId();
  // Слушатели в виде колбэков передаются после создания карточки
  card.create({
    delCallback: () => {
      return api.delCardById(cardId)
    },
    likeCallback: () => {
      return api.toggleLikeCardById(cardId, card.isLiked)
    },
    imgCallback: () => {
      console.log(cardImg);
      imgPopupObj.open(imgElement, imgDescElement, cardImg.getAttribute('src'), cardImg.getAttribute('alt'));
    }
  });
  return card;
}
