/**
 * Created by tlakatlekutl on 27.03.17.
 */
import BaseView from './baseView';
import template from '../templates/mp.pug';
import GameModel from '../models/gameModel';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';
import Game from '../modules/game/play';

const gm = new GameModel();
const ee = new EvenEmitter();

export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    this.render();
    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.x.innerHTML = message;
    });
    ee.on('print', (message) => {
      this.x.innerHTML = message;
    });
    ee.on('alert', (msg) => { alert(msg); });
    this.game = new Game('multi');
    this.game.gameProcess();
  }
  render() {
    super.render();
    this.addEventListeners();
  }
  addEventListeners() {
    this.x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => {
      gm.findOpponent();
			// ee.off('alert');
    });
    document.querySelector('.goright').addEventListener('click', () => {
      ee.emit('alert', 'OLOLOLO');
    });
  }

}

