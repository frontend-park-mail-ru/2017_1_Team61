/**
 * Created by tlakatlekutl on 27.03.17.
 */

import Router from '../modules/router/router';
import BaseView from './baseView';
import template from '../templates/mp.pug';
import GameModel from '../models/gameModel';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';
import Game from '../modules/game/play';
import UserModel from '../models/userModel';

const gm = new GameModel();
const ee = new EvenEmitter();
const router = new Router();
const us = new UserModel();

export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    // this.render();
    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setStateGame(message.content);
    });
    ee.on('com.aerohockey.mechanics.requests.StartGame$Request', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setOpponent(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.GameOverSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.state = JSON.parse(message.content);
      console.log(this.state.newRating);
      this.game.stop();
      if(this.state.newRating > us.getData().rating) {
        us.getData().newRating = this.state.newRating;
        router.go('/victory');
      } else {
        us.getData().newRating = this.state.newRating;
        router.go('/defeat');
      }
    });
    ee.on('print', (message) => {
      this.x.innerHTML = message;
    });
    ee.on('alert', (msg) => { alert(msg); });
    this.alreadyInDOM = false;
  }
  render() {
    super.render();
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    this.addEventListeners();
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concedemp');
    });
    ee.on('destroyGame', ()=> {
      delete this.game;
      const game = document.querySelector('canvas');
      document.body.removeChild(game);
    });
    gm.findOpponent();
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
  addEventListeners() {
    this.x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => {
      gm.findOpponent();
    });
    document.querySelector('.goright').addEventListener('click', () => {
      ee.emit('alert', 'OLOLOLO');
    });
  }

}

