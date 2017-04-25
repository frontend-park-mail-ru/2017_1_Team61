/**
 * Created by sergey on 25.04.17.
 */

import css from '../../css/concede.css';

import ModalView from './modalView';
import Router from '../modules/router/router';
import template from '../templates/concede.pug';

const router = new Router();

export default class ConcedeModal extends ModalView {
  constructor() {
    super('Выход', template);
  }
  render() {
    super.render();
    document.querySelector('.choose__yes').addEventListener('click', () => {
      router.go('/');
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      this.hide();
    });
  }
}