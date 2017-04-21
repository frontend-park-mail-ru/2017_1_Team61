/**
 * Created by tlakatlekutl on 04.04.17.
 */


import ModalView from './modalView';
import UserModel from '../models/userModel';
import Router from '../modules/router/router';
import template from '../templates/profile.pug';

const userModel = new UserModel();
const router = new Router();

export default class ProfileModalView extends ModalView {
  constructor() {
    super('Profile', template);
  }
  show() {
    if (userModel.isAuthorised()) {
      if (!this.alreadyInDOM) {
        this.alreadyInDOM = true;
        this.render({ user: userModel.getData() });
      }
      this.bodyModal.innerHTML = this.drawFunc({ user: userModel.getData() });
      this.modal.style.display = 'block';
    } else {
      router.go('/');
    }
  }

}

