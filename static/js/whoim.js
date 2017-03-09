/**
 * Created by tlakatlekutl on 02.03.17.
 */

/*eslint no-console: ["error", {allow: ["log", "error"]}]*/
/*global API:true */

(function () {
    'use strict';

    const api = new API();

    api.getUser()
        .then(response => {
            if (response.status == 200) {
                response.json()
                   .then(json => {
                       const name = document.getElementsByClassName('nickname__name')[0];
                       const email = document.getElementsByClassName('e-mail__name')[0];

                       name.innerHTML = json.login;
                       email.innerHTML = json.email;

                       let loginButton = document.createElement('button');
                       loginButton.textContent = 'logout';

                       loginButton.onclick = (event => {
                           event.preventDefault();

                           const api = new API();
                           api.logout();
                       });
                       const loginPage = document.querySelector('.user-info');
                       loginPage.appendChild(loginButton);
                   });
            } else {
                throw new Error('Error getting user data');
            }
        })
        .catch(error => {
            console.error(error);
        });
})();