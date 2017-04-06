/**
 * Created by tlakatlekutl on 02.04.17.
 */
/* global ModalView:true, loginTemplate */
/* global UserModel:true, Router:true*/


(function loginModalWindowFunc() {
  const userModel = new UserModel();
  const router = new Router();

  class LoginModal extends ModalView {
    constructor() {
      super('Login', loginTemplate);
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
  this.LoginModal = LoginModal;
}());

