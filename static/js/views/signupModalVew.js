/**
 * Created by tlakatlekutl on 03.04.17.
 */

/* global ModalView:true, signupTemplate */
/* global UserModel:true, Router:true*/


(function signupModalWindowFunc() {
  const userModel = new UserModel();
  const router = new Router();

  class SignupModal extends ModalView {
    constructor() {
      super('Signup', signupTemplate);
      super.onClose(() => { router.go('/'); });
    }
    render() {
      super.render();
      this.errorField = document.querySelector('.danger-signup');
      document.querySelector('.signup-submit-button').addEventListener('click', (event) => {
        event.preventDefault();
        if (this.isValid()) {
          this.errorField.style.display = 'none';
          userModel.signup(this.getFormData())
            .then(() => { router.go('/'); })
            .catch((error) => { this.showError(error.error); });
        }
      });
    }
    showError(errorText) {
      this.errorField.innerHTML = errorText;
      this.errorField.style.display = 'block';
    }
    isValid() {
      this.nickname = document.querySelector('.signup-nickname-input').value;
      this.password = document.querySelector('.signup-password-input').value;
      this.repeatPassword = document.querySelector('.signup-password-repeat').value;
      this.email = document.querySelector('.signup-email-input').value;

      if (this.nickname === '') {
        this.showError('Имя не может быть пустым');
        return false;
      }
      if (this.password === '') {
        this.showError('Пароль не может быть пустым');
        return false;
      }
      if (this.repeatPassword === '') {
        this.showError('Повторите пароль');
        return false;
      }
      if (this.password !== this.repeatPassword) {
        this.showError('Пароли не совпадают');
        return false;
      }
      if (this.email === '') {
        this.showError('Email не может быть пустым');
        return false;
      }
      return true;
    }
    getFormData() {
      return {
        login: this.nickname,
        password: this.password,
        email: this.email,
      };
    }
  }
  this.SignupModal = SignupModal;
}());

