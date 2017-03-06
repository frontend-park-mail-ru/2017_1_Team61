/**
 * Created by tlakatlekutl on 02.03.17.
 */

;(function () {
    'use strict';


    // xhr.open('GET', 'https://fastball-backend.herokuapp.com/api/user', true);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    const api = new API();
     api.get('/user', r => {api.RespJSON(r, data =>{
            // const data = JSON.parse(this.responseText);

         // console.log(r);

            const name = document.getElementsByClassName('nickname__name')[0];
            const email = document.getElementsByClassName('e-mail__name')[0];

            name.innerHTML = data.login;
            email.innerHTML = data.email;
            console.log(data);

            let loginButton = document.createElement('button');
            loginButton.textContent = 'logout';
            loginButton.onclick = ( event => {
                event.preventDefault();
                console.log('click!');



                const api = new API();
                api.post('/logout', null, null);


            });

            const loginPage = document.querySelector('.user-info');
            console.log(loginPage);
            loginPage.appendChild(loginButton);


     })});

})();