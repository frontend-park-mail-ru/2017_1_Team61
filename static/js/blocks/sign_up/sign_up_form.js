/**
 * Created by sergey on 09.03.17.
 */

(function () {
  class SignUpForm {

    constructor() {
      this.drawFunc = window.sign_up_tmpl;
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
      parent.class = 'sign_up_page';
      parent.innerHTML = this.drawFunc() || 'error';
      document.body.appendChild(parent);
    }

    _initElems() {
      this.e_mailField = document.querySelector('.sign_up_page .input-block__e-mail');
      this.e_mailFieldRep = document.querySelector('.sign_up_page .repeat-block__e-mail');
      this.passwordField = document.querySelector('.sign_up_page .input-block__password');
      this.passwordFieldRep = document.querySelector('.sign_up_page .repeat-block__password');
      this.loginField = document.querySelector('.sign_up_page .input-block__nickname');
      this.submitButton = document.querySelector('.sign_up_page .button-submit-account button');
    }
    _addEvents() {
      this.submitButton.addEventListener('click', (event) => { this._sign_up(event); });
    }

    _validate() {
      if (this.e_mailField.value !== '' || this.e_mailFieldRep.value !== '' ||
                this.passwordField.value !== '' || this.passwordFieldRep.value !== '' ||
                this.loginField.value !== '') {
        if (this.e_mailField.value === this.e_mailFieldRep.value &&
                    this.passwordField.value === this.passwordFieldRep.value) {
          return;
        }
      }
      throw new Error('No VALID FORM!!!!!!!');
    }

    _signUp(event) {
      event.preventDefault();
      try {
        console.log();
        this._validate();

        const data = {
          email: this.e_mailField.value,
          password: this.passwordField.value,
          login: this.loginField.value,
        };
        console.log(JSON.stringify(data));

        const api = new API();

        api.signup(data)
                    .then((response) => {
                      if (response.status == 200) { this._onsubmitFunc(); }
                    });
      } catch (error) {
        console.log('hello from catch');
        console.error(error);
      }
    }
    }

  window.SignUpForm = SignUpForm;
}());
