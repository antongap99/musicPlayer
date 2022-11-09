
import {createCard} from './create.js'
export const renderController = (data) => {
    const cardContainer = document.querySelector('.card__container');
    if(!data.length){
        const p = document.createElement('p');
        p.textContent = ''
        cardContainer.append(p);
        return;
    }
    const renderCatalog = (dataList) => {
        let playList = [...dataList]
        cardContainer.textContent  = '';
        const listCards = playList.map(createCard);
        cardContainer.append(...listCards);
    const headerHeart = document.getElementsByClassName('header__heart')[0]
    const returnMain =  document.querySelector('.header__return');
    if(returnMain) {
        headerHeart.style.display = '';
        returnMain.remove();
    }
    }
    renderCatalog(data);
    return renderCatalog;
}