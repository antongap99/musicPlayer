export const playerBarController =(audio) => {
    const plyerProgressInput = document.querySelector('.player_progress-input');
    const playerTimePassed = document.querySelector('.player__time-passed');
    const playerTimeTotal = document.querySelector('.player__time-total');


    const updateTime = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progress = (currentTime/duration) * 1000;
        plyerProgressInput.value = progress ? progress : 0;


        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';



        const minutesDuration = Math.floor(duration / 60) || '0';
        const secondsDuration = Math.floor(duration % 60) || '0';

        playerTimePassed.textContent
        =`${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed }`;
        playerTimeTotal.textContent
        =`${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`;
    }

    audio.addEventListener('timeupdate', updateTime);

    plyerProgressInput.addEventListener('change', () => {
        const progress =  plyerProgressInput.value
        audio.currentTime = (progress / 1000) * audio.duration;
    })

}