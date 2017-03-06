/**
 * Created by tlakatlekutl on 02.03.17.
 */

;(function () {
    'use strict';

    const api = new API();
     api.get('/user', r => {api.RespJSON(r, data =>{

            const name = document.getElementsByClassName('nickname__name')[0];
            const email = document.getElementsByClassName('e-mail__name')[0];

            name.innerHTML = data.login;
            email.innerHTML = data.email;

            let loginButton = document.createElement('button');
            loginButton.textContent = 'logout';
            loginButton.onclick = ( event => {
                event.preventDefault();

                const api = new API();
                api.post('/logout', null, null);


            });

            const loginPage = document.querySelector('.user-info');

            loginPage.appendChild(loginButton);


     })});

})();