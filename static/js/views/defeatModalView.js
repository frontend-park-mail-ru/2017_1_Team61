/**
 * Created by sergey on 01.05.17.
 */

import '../../css/defeat.css';

import ModalView from './modalView';
import template from '../templates/defeat.pug';
import UserModel from '../models/userModel';
import EvenEmitter, {DESTROY_GAME} from '../modules/eventEmitter/eventEmitter';

const ee = new EvenEmitter();
const us = new UserModel();

export default class DefeatModal extends ModalView {
  constructor() {
    super('Завершение игры', template);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.defeat-modal .change');
    this.changeRating.innerHTML = us.getData().changeRating;
    this.newRating = document.querySelector('.defeat-modal .rating_score');
    this.newRating.innerHTML = us.getData().rating + us.getData().changeRating;
    this.onClose(() => {
      this.destruct();
      ee.emit(DESTROY_GAME);
    });
  }

}