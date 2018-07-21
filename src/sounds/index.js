import click from './click.mp3'
import ping from './ping.mp3'

const clickAudio = new Audio(click);
const pingAudio = new Audio(ping);

let clicksInterval = null;

export const playPing = () => {
  pingAudio.play();
}

export const stopClicks = (interval) => {
  if(clicksInterval){
    clearInterval(clicksInterval);
    clicksInterval = null;
  }
}

export const playClicks = (interval) => {
  stopClicks();
  clicksInterval = setInterval(() => clickAudio.play(), interval);
}