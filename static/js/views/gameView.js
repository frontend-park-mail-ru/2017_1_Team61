/**
* Created by tlakatlekutl on 04.04.17.
*/

import Router from '../modules/router/router';
import BaseView from './baseView';
import template2 from '../templates/gameTemplate.pug';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';

import Game from '../modules/game/play';

const router = new Router();
const ee = new EvenEmitter();

export default class GameView extends BaseView {
  constructor() {
    super(['game-window-container'], template2);
    this.alreadyInDOM = false;
  }
  render() {
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concede');
    });
    ee.on('destroyGame', ()=> {
      delete this.game;
      const game = document.querySelector('canvas');
      document.body.removeChild(game);
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
    // const game = document.querySelector('canvas');
    // game.hidden = false;
    this.node.hidden = false;
  }
  hide() {
    if (this.alreadyInDOM) {
      // super.destruct();
      // const game = document.querySelector('canvas');
      // game.hidden = true;
    }
    super.hide();
  }

}

