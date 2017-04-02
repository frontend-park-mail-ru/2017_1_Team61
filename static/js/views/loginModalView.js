/**
 * Created by tlakatlekutl on 02.04.17.
 */
/* global ModalView:true, loginTemplate */


(function loginModalWindowFunc() {
  class LoginModal extends ModalView {
    constructor() {
      super('Login', loginTemplate);
      this.errorField = document.querySelector('.danger');
    }
    showError() {
      this.errorFIeld.style.display = 'block';
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
    getData() {
      return {
        login: this.nickname,
        password: this.password,
      };
    }
  }
  this.LoginModal = LoginModal;
}());

