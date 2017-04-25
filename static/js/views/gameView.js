/**
* Created by tlakatlekutl on 04.04.17.
*/

import Router from '../modules/router/router';
import BaseView from './baseView';
import template from '../templates/gameTemplate.pug';

import Game from '../modules/game/play';

const router = new Router();

export default class GameView extends BaseView {
  constructor() {
    super(['game-window-container'], template);
    this.alreadyInDOM = false;
  }
  render() {
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concede');
    });
    this.game = new Game('single');
    this.game.gameProcess();
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    const game = document.querySelector('canvas');
    game.hidden = false;
    this.node.hidden = false;
  }
  hide() {
    if (this.alreadyInDOM) {
      // super.destruct();
      const game = document.querySelector('canvas');
      game.hidden = true;
    }
    super.hide();
  }

}

