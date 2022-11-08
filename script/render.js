import {dataMusic} from './tracks.js';
import {createCard} from './create.js'
export const renderController = () => {
    const cardContainer = document.querySelector('.card__container');
    const renderCatalog = (dataList) => {
        cardContainer.textContent  = '';
        const listCards = dataList.map(createCard);
        cardContainer.append(...listCards);
    }
    renderCatalog(dataMusic);
}