import {dataMusic} from './tracks.js';
import {creeateAddBtn} from './create.js'
export const musicController =() => {
    const pauseBtn = document.querySelector('.player__icon_pause');
    const audio = new Audio();
    const stopBtn = document.querySelector('.player__controller_stop');
    const player = document.querySelector('.player');
    const tracksCard = document.getElementsByClassName('track');
    const cardContainer = document.querySelector('.card__container');

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

    const playMusic = e => {
        e.preventDefault();
        const trackActive = e.currentTarget;
        if(trackActive.matches('.track_active')) {
            playerPause();
        }else {
            const id = trackActive.dataset.trackId;
            const track = dataMusic.find((item) => id === item.id);

            audio.src = track.mp3;
            audio.play();
            player.classList.add('player_active');

            for(let i = 0;i < tracksCard.length; i++ ) {
            tracksCard[i].classList.remove('track_active');
            }
        trackActive.classList.add('track_active');
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

    const addHandlerTrack = ()=> {
        for(let i = 0;i < tracksCard.length; i++ ) {
            tracksCard[i].addEventListener('click',  playMusic);
        }
    }

    pauseBtn.addEventListener('click', playerPause);

    stopBtn.addEventListener('click', stopMusic);



    const  addBtn = creeateAddBtn();
    const checkCount = (i = 1) => {
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

    addHandlerTrack();
    checkCount();
}