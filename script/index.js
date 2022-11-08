
const pauseBtn = document.querySelector('.player__icon_pause');
const trackCard = document.getElementsByClassName('track')
const audio = new Audio();
const stopBtn = document.querySelector('.player__controller_stop');
const player = document.querySelector('.player');



const playMusic = e => {
    const trackActive = e.currentTarget;
    if(trackActive.matches('.track_active')) {
        audio.pause();
        trackActive.classList.remove('track_active');
        pauseBtn.classList.add('player__controller_play');
    }else {
        audio.src = `audio/${trackActive.dataset.track}`;
        audio.play();
        player.classList.add('player_active');
        pauseBtn.classList.remove('player__controller_play');
   
        for(let i = 0;i < trackCard.length; i++ ) {
           trackCard[i].classList.remove('track_active');
        }
       trackActive.classList.add('track_active');
    }  
}

const stopMusic = (e) => {
    for(let i = 0;i < trackCard.length; i++ ) {
        if(trackCard[i].matches('.track_active')){
            trackCard[i].classList.remove('track_active');
        }
     }
     console.log(e.currentTarget);
     audio.pause();
     player.classList.remove('player_active');
}


for(let i = 0;i < trackCard.length; i++ ) {
    trackCard[i].addEventListener('click',  playMusic);
}


pauseBtn.addEventListener('click', () => {
    if(audio.paused){
        audio.play();
        pauseBtn.classList.remove('player__controller_play');
    } else {
        audio.pause();
        pauseBtn.classList.add('player__controller_play');
    }
})  

 stopBtn.addEventListener('click', stopMusic)