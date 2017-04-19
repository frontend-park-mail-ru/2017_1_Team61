/**
 * Created by tlakatlekutl on 27.03.17.
 */
import BaseView from './baseView';
import template from '../templates/mp.pug';

const ws = new WebSocket('ws://62.109.3.208:8082/game');
ws.onopen = () => {
  console.log('Соединение установлено');
  ws.send(JSON.stringify({
    type: 'com.aerohockey.mechanics.requests.JoinGame$Request',
    content: '{}',
  }));
};
ws.onclose = (event) => { console.log(`socket close ${event.code}`); };


export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    this.render();
    this.addEventListeners();
    this.addWebsocket();
  }
  addEventListeners() {
    this.x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => {
      ws.send('left');
    });
    document.querySelector('.goright').addEventListener('click', () => {
      ws.send('right');
    });
  }
  addWebsocket() {
    ws.onmessage = (event) => {
      console.log(event.data);
      this.x.innerHTML = event.data;
    };
  }
}

