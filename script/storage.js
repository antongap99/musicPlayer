import {dataMusic} from './tracks.js';

export const favoriteList = localStorage.getItem('favorite')
    ? JSON.parse(localStorage.getItem('favorite'))
    : [];

export const storageController =(renderCatalog, checkCount, addHandlerTrack) => {

    const likeBtn = document.querySelector('.player__controller_like')

    likeBtn.addEventListener('click', () => {
    const index = favoriteList.indexOf(likeBtn.dataset.trackId)

    if(index === -1) {
        favoriteList.push(likeBtn.dataset.trackId);
        likeBtn.classList.add('player__icon_like-active');

    } else {
        favoriteList.splice(index, 1);
        likeBtn.classList.remove('player__icon_like-active');
    }

    localStorage.setItem('favorite', JSON.stringify(favoriteList));

})
}


