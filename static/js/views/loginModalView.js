/**
* Created by tlakatlekutl on 02.04.17.
*/

import ModalView from './modalView';
import UserModel from '../models/userModel';
import Router from '../modules/router/router';
import template from '../templates/login.pug';

const userModel = new UserModel();
const router = new Router();

export default class LoginModal extends ModalView {
  constructor() {
    super('Login', template);
  }
  render() {
    super.render();
    this.errorField = document.querySelector('.danger');
    document.querySelector('.login-submit-button').addEventListener('click', (event) => {
      if (this.isValid()) {
        event.preventDefault();
        userModel.login(this.getFormData())
          .then(() => {
            router.go('/');
            this.destruct();
          })
          .catch(() => { this.showError(); });
      }
    });
    this.onClose(() => router.go('/'));
  }

  show() {
    if (!userModel.isAuthorised()) {
      super.show();
      this.hideError();
    } else {
      router.go('/');
    }
  }
  showError() {
    this.errorField.style.display = 'block';
  }
  hideError() {
    this.errorField.style.display = 'none';
  }
  isValid() {
    this.nickname = document.querySelector('.login-nickname-input').value;
    this.password = document.querySelector('.login-password-input').value;
    if (this.nickname === '') {
      return false;
    }
    if (this.password === '') {
      return false;
    }
    return true;
  }
  getFormData() {
    return {
      login: this.nickname,
      password: this.password,
    };
  }
}

