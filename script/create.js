import {API_URL} from './const.js';
export const createCard = (data) => {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'catalog__item track';
    card.dataset.trackId = data.id;

    card.insertAdjacentHTML('afterbegin', `
    <div class="track__img-wrap">
        <img class="track__poster" src="${API_URL}${data.poster}" alt=${data.track} ${data.artist}">
    </div>
    <div class="track__info">
        <p class="track__info_title">${data.track}</p>
        <p class="track__info_author">${data.artist}</p>
    </div>
    `)

    return card;
}

export const creeateAddBtn = () => {
    const btn  = document.createElement('button');
    btn.classList.add('card__btn-add');
    btn.insertAdjacentHTML('afterbegin', `<span>Увидеть все</span>
    <svg width="24" height="24" viewbox="0 0 24 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
    </svg>`)
    return btn;
}

