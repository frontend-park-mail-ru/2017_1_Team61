/**
 * Created by sergey on 09.03.17.
 */

/* global API:true */

(function () {
    'use strict';

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
            let parent = document.createElement('div');
            parent.class = 'login_page';
            parent.innerHTML = this.drawFunc()|| 'error';
            document.body.appendChild(parent);
        }

        _initElems() {
            this.loginField = document.querySelector('.input-block__e-mail');
            this.passwordField = document.querySelector('.input-block__password');
            this.submitButton = document.querySelector('.button-submit > button');
        }
        _addEvents() {
            this.submitButton.addEventListener('click', (event)=>{this._login(event);});
            // this.submitButton.addEventListener('click', this._login.bind(this));
        }

        _validate() {
            if (this.loginField.value!='' || this.passwordField.value!='')
                return;
            throw new Error('No VALID FORM!!!!!!!');
        }

        _login(event) {
            event.preventDefault();
            try {
                console.log();
                this._validate();

                const data = {
                    'login': this.loginField.value,
                    'password': this.passwordField.value
                };
                console.log(JSON.stringify(data));

                const api = new API();

                api.login(data)
                    .then(response => {
                        if (response.status == 200)
                            this._onsubmitFunc();
                    });
            } catch (error) {
                console.log('hello from catch');
                console.error(error);
            }
        }

    }

    window.LoginForm = LoginForm;
})();