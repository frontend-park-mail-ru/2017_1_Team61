/**
 * Created by sergey on 09.03.17.
 */

/* eslint no-console: ["error", {allow: ["log", "error"]}]*/
/* global API:true, signup */

(function loginForm() {
  class LoginForm {

    constructor() {
      this.drawFunc = window.login_tmpl;
    }

    render() {
      this._innerHtml();
      this._initElems();
      this._addEvents();
    }

    set onsubmit(value) {
      this._onsubmitFunc = value;
    }

    _innerHtml() {
      const parent = document.createElement('div');
      parent.class = 'login_page';
      parent.innerHTML = this.drawFunc() || 'error';
      document.body.appendChild(parent);
    }

    _initElems() {
      this.loginField = document.querySelector('.input-block__e-mail');
      this.passwordField = document.querySelector('.input-block__password');
      this.submitButton = document.querySelector('.button-submit > button');
    }
    _addEvents() {
      this.submitButton.addEventListener('click', (event) => { this._login(event); });
    }

    _validate() {
      if (this.loginField.value !== '' || this.passwordField.value !== '') { return; }
      throw new Error('No VALID FORM!!!!!!!');
    }

    _login(event) {
      event.preventDefault();
      try {
        this._validate();

        const data = {
          login: this.loginField.value,
          password: this.passwordField.value,
        };

        const api = new API();

        api.login(data)
                    .then((response) => {
                      if (response.status === 200) { this._onsubmitFunc(); }
                    });
      } catch (error) {
        console.log('hello from catch');
        console.error(error);
      }
    }
    _renderError(error) { // TODO it doesnt work
      const errorf = document.querySelector('.login_page_error');
      if (!errorf) {
        this.errorField = document.createElement('div');
        this.errorField.class = 'login_page_error';
      }
      errorf.innerHTML = error.message;
    }

    }

  window.LoginForm = LoginForm;
  signup();
}());
