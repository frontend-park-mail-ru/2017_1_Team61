/**
 * Created by sergey on 25.04.17.
 */

import '../../css/concede.css';

import ModalView from './modalView';
import template from '../templates/concede.pug';
import EvenEmitter, {DESTROY_GAME} from '../modules/eventEmitter/eventEmitter';

const ee = new EvenEmitter();

export default class ConcedeModal extends ModalView {
  constructor(game) {
    super('Выход', template);
    this.game = game;
  }
  render() {
    this.alreadyInDOM = true;
    this.generateBase();
    this.bodyModal.innerHTML = this.drawFunc();
    this.parent.appendChild(this.modal);
    document.querySelector('.choose__yes').addEventListener('click', () => {
      this.destruct();
      ee.emit(DESTROY_GAME);
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      this.game.resume();
      this.destruct();
    });
    this.close.addEventListener('click', () => { this.game.resume(); this.destruct(); });
    this.show();
  }
}