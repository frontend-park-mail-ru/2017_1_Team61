/**
 * Created by tlakatlekutl on 27.03.17.
 */

// import Router from '../modules/router/router';
import BaseView from './baseView';
import template from '../templates/mp.pug';
import GameModel from '../models/gameModel';
import Game from '../modules/game/play';
import UserModel from '../models/userModel';
import EvenEmitter, { GAME_PAUSE, VICTORY, DEFEAT } from '../modules/eventEmitter/eventEmitter';

const ee = new EvenEmitter();
const us = new UserModel();

export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    this.gm = new GameModel();

    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.time = (new Date()).getTime();
      this.game.setStateGame(message.content, this.time);
    });
    ee.on('com.aerohockey.mechanics.requests.StartGame$Request', (message) => {
      this.game.setOpponent(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.ServerDetailSnap', (message) => {
      this.game.setChangeGame(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.GameOverSnap', (message) => {
      this.state = JSON.parse(message.content);
      console.log(this.state);
      this.game.stop();
      if (this.state.changeRating > 0) {
        us.getData().changeRating = this.state.changeRating;
        ee.emit(VICTORY);
      } else {
        us.getData().changeRating = this.state.changeRating;
        ee.emit(DEFEAT);
      }
    });
  }

  render() {
    super.render();
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      ee.emit(GAME_PAUSE, this.game);
    });
    this.gm.findOpponent();
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new Game('multi');
      this.game.gameProcess();
    }
    this.node.hidden = false;
  }
  hide() {
    console.log('multi game hide');
    this.destruct();
  }
  destruct() {
    const root = document.querySelector('main');
    const gamePage = document.querySelector('.multiplayer-game-view');
    root.removeChild(gamePage);
    const game = document.querySelector('canvas');
    const body = document.querySelector('body');
    body.removeChild(game);
    this.alreadyInDOM = false;
    this.gm.exit();
    delete this.game;
  }

}

