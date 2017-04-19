/**
 * Created by tlakatlekutl on 27.03.17.
 */
import BaseView from './baseView';
import template from '../templates/mp.pug';

export default class MpGameView extends BaseView {
  constructor() {
    super(['multiplayer-game-view'], template);
    this.render();
    this.addEventListeners();
  }
  addEventListeners() {
    const x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => { x.innerHTML = 'left'; });
    document.querySelector('.goright').addEventListener('click', () => { x.innerHTML = 'right'; });
  }
}

