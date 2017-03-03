/**
 * Created by tlakatlekutl on 02.03.17.
 */

;(function () {
    'use strict';
    const  xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open('GET', 'http://fastball-backend.herokuapp.com/api/user', true);
    //xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        const data = JSON.parse(this.responseText);

        if (xhr.status == 200) {
            const name = document.getElementsByClassName('nickname__name')[0];
            const email = document.getElementsByClassName('e-mail__name')[0];

            name.innerHTML = data['login'];
            email.innerHTML = data['email'];
            console.log(data);
        } else {
            console.log(data['error']);
        }

    };

    xhr.onerror = function() {
        alert( 'Ошибка ' + this.status );

    };

    xhr.send();
})();