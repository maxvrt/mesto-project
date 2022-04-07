import { photosGrid } from './constants.js';
import { createCard } from './card.js';

export function renderCard(data, userId) {
  data.forEach((item) => {
    photosGrid.append(createCard(item['link'], item['name'], item['likes'], item['_id'], item['owner'], userId));
  });
}
