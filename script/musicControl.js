import {creeateAddBtn} from './create.js'
import {favoriteList} from './storage.js'
import {returnToMain} from './returnMain.js';
import {API_URL} from './const.js'

export const musicController =(audio, renderCatalog, dataMusic) => {
    if(!dataMusic.length) {
        return;
    }
    const pauseBtn = document.querySelector('.player__icon_pause');
    const likeBtn = document.querySelector('.player__controller_like')
    const prevBtn = document.querySelector('.player__controller_prev')
    const nextBtn = document.querySelector('.player__controller_next')
    const stopBtn = document.querySelector('.player__controller_stop');
    const player = document.querySelector('.player');
    const tracksCard = document.getElementsByClassName('track');
    const cardContainer = document.querySelector('.card__container');

    let data = [];

    const playerPause = () => {
        const trackActive = document.querySelector('.track_active')
        if(audio.paused){
            audio.play();
            pauseBtn.classList.remove('player__controller_play');
            trackActive.classList.remove('track_pause');
        } else {
            audio.pause();
            pauseBtn.classList.add('player__controller_play');
            trackActive.classList.add('track_pause');
        }
    }

    const stopMusic = (e) => {

        for(let i = 0;i < tracksCard.length; i++ ) {
            if(tracksCard[i].matches('.track_active')){
                tracksCard[i].classList.remove('track_active');
            }
        }
        audio.pause();
        player.classList.remove('player_active');
    }

    const playMusic = e => {
        e.preventDefault();
        let playList = [];

        if(data.length){
            playList = [...data];
            if(!playList.length){
                return;
            }
        } else {
            playList= [...dataMusic];
        }

        const trackActive = e.currentTarget;

        if(trackActive.matches('.track_active')) {
            trackActive.classList.remove('track_pause');
            playerPause();
            return;
        }else {


            const favoriteList = localStorage.getItem('favorite')
            ? JSON.parse(localStorage.getItem('favorite'))
            : [];



            const id = trackActive.dataset.trackId;
            let i = 0;
            const track = playList.find((item, index) => {
                i = index;
                return id == item.id;
            });

            audio.src = `${API_URL}${track.mp3}`
            audio.play();
            player.classList.add('player_active');

            const prevTrackIndex = i === 0 ? playList.length - 1 : i - 1;
            const nextTrackIndex = i + 1 === playList.length ? 0 : i + 1;

            prevBtn.dataset.trackId = playList[prevTrackIndex].id
            nextBtn.dataset.trackId = playList[nextTrackIndex].id
            likeBtn.dataset.trackId = id;

            const index = favoriteList.indexOf(id);

            if(index !== -1) {
                likeBtn.classList.add('player__icon_like-active');
            } else {
                likeBtn.classList.remove('player__icon_like-active');
            }

            for(let i = 0;i < tracksCard.length; i++ ) {
                if(id === tracksCard[i].dataset.trackId){
                    tracksCard[i].classList.add('track_active');
                } else {
                    tracksCard[i].classList.remove('track_active');
                }
            }
        }
    }



    const addHandlerTrack = ()=> {
        if(!tracksCard.length){
            return;
        }
        for(let i = 0;i < tracksCard.length; i++ ) {
            tracksCard[i].addEventListener('click',  playMusic);
        }
    }

    pauseBtn.addEventListener('click', playerPause);

    stopBtn.addEventListener('click', stopMusic);



    const  addBtn = creeateAddBtn();
    const checkCount = (i = 1) => {
        if(!tracksCard.length){
            return;
        }
        if(cardContainer.clientHeight > tracksCard[0].clientHeight * 3.2) {
            tracksCard[tracksCard.length - i].style.display = 'none';
            checkCount(i + 1);
        } else if (i !== 1) {
            cardContainer.append(addBtn);
        }
    }

    addBtn.addEventListener('click', () => {
        [...tracksCard].forEach((trackCard) => {
            trackCard.style.display = '';
            addBtn.remove();
        })
    })

    nextBtn.addEventListener('click', playMusic);
    prevBtn.addEventListener('click', playMusic);


    audio.addEventListener('ended', () => {
        nextBtn.dispatchEvent(new Event('click', {bubbles: true}))
    })


    addHandlerTrack();
    checkCount();

    const favoriteBtn = document.querySelector('.header__heart');

    favoriteBtn.addEventListener('click', () => {
         data = dataMusic.filter((item) => {
        return favoriteList.includes(item.id);
        });
        renderCatalog(data);
        checkCount();
        console.log([...tracksCard]);
        addHandlerTrack();
        returnToMain(renderCatalog, addHandlerTrack, checkCount);
        stopMusic();
        const returnMain =  document.querySelector('.header__return');
        if(returnMain) {
            const renderMain = () => {
                renderCatalog(dataMusic);
                checkCount();
                addHandlerTrack();
                data = [...dataMusic];
                stopMusic();
            }
            const headerLogo = document.getElementsByClassName('header__logo')[0];
            headerLogo.style.cursor = 'pointer';
            headerLogo.addEventListener('click', renderMain);
            returnMain.addEventListener('click', renderMain);

        }
    })


    return {checkCount, addHandlerTrack};
}