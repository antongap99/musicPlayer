export const volumeController = (audio) => {
   const muteBtn = document.querySelector('.player__icon_mute');
   const playerVolumeInput = document.querySelector('.player__volume-input');
   audio.volume = localStorage.getItem('volume') || 1;
   playerVolumeInput.value =  audio.volume * 100;
   muteBtn.addEventListener('click', () => {
    if(audio.volume){
        localStorage.setItem('volume', audio.volume)
        audio.volume = 0;
        playerVolumeInput.value = 0;
        muteBtn.classList.add('player__icon_mute-off');
    } else {
        muteBtn.classList.remove('player__icon_mute-off');
        audio.volume = localStorage.getItem('volume');
        playerVolumeInput.value =audio.volume * 100;
    }
   });

   playerVolumeInput.addEventListener('input', () => {
    const value = playerVolumeInput.value;
    audio.volume  = value / 100;
   })
}