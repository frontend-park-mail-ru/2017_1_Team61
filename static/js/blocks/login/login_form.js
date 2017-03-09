/**
 * Created by sergey on 09.03.17.
 */

(function () {
    'use strict';

    class LoginForm {

        constructor() {
            this.drawFunc = window.login_tmpl;
        }

        render() {
            let parent = document.createElement('div');
            parent.class = 'login_page';
            parent.innerHTML = this.drawFunc()|| 'error';
            document.body.appendChild(parent);
        }
    }

    window.LoginForm = LoginForm;
})();