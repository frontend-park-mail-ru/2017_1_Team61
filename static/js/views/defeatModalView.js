/**
 * Created by sergey on 01.05.17.
 */

import css from '../../css/defeat.css';

import ModalView from './modalView';
import Router from '../modules/router/router';
import template from '../templates/defeat.pug';
import EvenEmitter from '../modules/eventEmitter/eventEmitter';
import UserModel from '../models/userModel';

const router = new Router();
const ee = new EvenEmitter();
const us = new UserModel();

export default class DefeatModal extends ModalView {
  constructor() {
    super('Завершение игры', template);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.defeat-modal .change');
    this.changeRating.innerHTML = us.getData().rating - us.getData().newRating;
    this.newRating = document.querySelector('.defeat-modal .rating_score');
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