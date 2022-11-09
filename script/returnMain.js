import {dataMusic} from './tracks.js'


export const returnToMain = (renderCatalog , checkCount , addHandlerTrack) => {

    const createReturnBtn = () => {
        const btn = document.createElement('button');
        btn.classList.add('header__return');
        btn.innerHTML =
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="white"/>
        </svg>
        <span>На главную</span>`
        return btn;
    }
    const headerContainer = document.querySelector('.header__container');
    const headerHeart = document.querySelector('.header__heart');
    headerHeart.style.display = 'none';
    headerContainer.append(createReturnBtn());

}