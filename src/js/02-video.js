import Player from '@vimeo/player';
import { throttle } from 'lodash';

const STORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveTime, 1000));

function saveTime(data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
};

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
