import {musicController} from './musicControl.js';
import {renderController} from './render.js';
import {playerBarController} from './playerTimer.js';
import {storageController} from './storage.js';
import {volumeController} from './volume.js';
import {API_URL} from './const.js';
import {searchController} from './searchTrack.js';

const init = async () => {
    const audio = new Audio();
    let data = []
    try {
        data =  await fetch(`${API_URL}api/music`).then((data) => {
            return data.json();
        });
        console.log(data);
    } catch (error) {
        console.log('включить апи');
    }
    console.log(data);
    const renderCatalog =  renderController(data);
    const {checkCount, addHandlerTrack} = musicController(audio, renderCatalog, data);
    playerBarController(audio);
    storageController(renderCatalog , checkCount , addHandlerTrack);
    volumeController(audio);
    searchController(renderCatalog, checkCount);
}

init();