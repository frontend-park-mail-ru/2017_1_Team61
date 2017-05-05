/**
 * Created by sergey on 01.05.17.
 */

import css from '../../css/victory.css';

import ModalView from './modalView';
import Router from '../modules/router/router';
import template from '../templates/victory.pug';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';
import UserModel from '../models/userModel';

const router = new Router();
const ee = new EvenEmitter();
const us = new UserModel();

export default class VictoryModal extends ModalView {
  constructor() {
    super('Завершение игры', template);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.victory-modal .change');
    this.changeRating.innerHTML = us.getData().newRating - us.getData().rating;
    this.newRating = document.querySelector('.victory-modal .rating_score');
    this.newRating.innerHTML = us.getData().newRating;
    // document.querySelector('.choose__yes').addEventListener('click', () => {
    //   ee.emit('destroyGame');
    //   router.go('/');
    // });
    // document.querySelector('.choose__no').addEventListener('click', () => {
    //   router.go('/game');
    // });
    this.onClose(() => {
      ee.emit('destroyGame');
      router.go('/');
    });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}