/**
 * Created by sergey on 01.05.17.
 */

import '../../css/victory.css';

import ModalView from './modalView';
import template from '../templates/victory.pug';
import UserModel from '../models/userModel';
import EvenEmitter, {DESTROY_GAME} from '../modules/eventEmitter/eventEmitter';

const us = new UserModel();
const ee = new EvenEmitter();

export default class VictoryModal extends ModalView {
  constructor() {
    super('Завершение игры', template);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.victory-modal .change');
    this.changeRating.innerHTML = us.getData().changeRating;
    this.newRating = document.querySelector('.victory-modal .rating_score');
    this.newRating.innerHTML = us.getData().rating + us.getData().changeRating;
    this.onClose(() => {
      this.destruct();
      ee.emit(DESTROY_GAME);
    });
  }
  // onClose(func) {
  //   this.close.addEventListener('click', func);
  //   this.close.addEventListener('click', () => {
  //     this.modal.style.display = 'none';
  //   });
  //   return this;
  // }
}