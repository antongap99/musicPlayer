import {musicController} from './musicControl.js'
import {renderController} from './render.js'


const init = () => {
    renderController();
    musicController();

}

init();