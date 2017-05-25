/**
* Created by tlakatlekutl on 04.04.17.
*/

import BaseView from './baseView';
import template2 from '../templates/gameTemplate.pug';
import EvenEmitter, {GAME_PAUSE} from '../modules/eventEmitter/eventEmitter';

import Game from '../modules/game/play';

// const router = new Router();
const ee = new EvenEmitter();

export default class GameView extends BaseView {
  constructor() {

    if (GameView.instance) {
      return GameView.instance;
    }

    super(['game-window-container'], template2);
    this.alreadyInDOM = false;

    GameView.instance = this;
  }
  render() {
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      ee.emit(GAME_PAUSE, this.game);
    });
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new Game('single');
      this.game.gameProcess();
    }
    this.node.hidden = false;
  }

  hide() {
    console.log('single game hide');
    this.destruct();
  }

  destruct() {
    const root = document.querySelector('main');
    const gamePage = document.querySelector('.game-window-container');
    root.removeChild(gamePage);
    const game = document.querySelector('canvas');
    const body = document.querySelector('body');
    body.removeChild(game);
    this.alreadyInDOM = false;
    delete this.game;
  }

}

