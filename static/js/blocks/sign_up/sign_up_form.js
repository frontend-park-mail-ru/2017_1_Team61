/**
 * Created by sergey on 09.03.17.
 */

(function () {
    'use strict';

    class SignUpForm {

        constructor() {
            this.drawFunc = window.sign_up_tmpl;
        }

        render() {
            let parent = document.createElement('div');
            parent.class = 'sign_up_page';
            parent.innerHTML = this.drawFunc()|| 'error';
            document.body.appendChild(parent);
        }
    }

    window.SignUpForm = SignUpForm;
})();