/**
 * Created by tlakatlekutl on 02.03.17.
 */

// ;(function () {
//     'use strict';
//     const form = document.getElementsByClassName("input-form")[0];
//
//     console.log(form);
//
//     form.addEventListener('submit', function (event) {
//         event.preventDefault();
//         // console.log(form.elements[0].value);
//         // const data = new FormData(form);
//         const data = {
//             'email': form.elements[0].value,
//             'password': form.elements[2].value,
//             'login': form.elements[4].value
//         };
//         console.log(JSON.stringify(data));
//
//         // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//         //
//         const  xhr = new XMLHttpRequest();
//
//         xhr.open('POST', 'http://fastball-backend.herokuapp.com/api/signup', true);
//         xhr.setRequestHeader("Content-Type", "application/json");
//
//         xhr.onload = function() {
//             alert( this.responseText );
//         };
//
//         xhr.onerror = function() {
//             alert( 'Ошибка ' + this.status );
//         };
//
//         xhr.send(JSON.stringify(data));
//     });
//
//
//     // console.log(form.elements.item(0).valueOf());
// })();

//  function signup() {
//         event.preventDefault();
//         //console.log(this);
//          //const data = new FormData(form);
//         const form = document.getElementsByClassName("input-form")[0];
//         const data = {
//             'email': form.elements[0].value,
//             'password': form.elements[2].value,
//             'login': form.elements[4].value
//         };
//         console.log(JSON.stringify(data));
//
//         // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//         //
//         const  xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;
//
//         xhr.open('POST', 'https://fastball-backend.herokuapp.com/api/signup', true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//
//         xhr.onload = function() {
//             window.location.replace('/profile.html');
//             // console.log(this.message);
//         };
//
//         xhr.onerror = function() {
//             alert( 'Ошибка ' + this.status );
//         };
//
//         xhr.send(JSON.stringify(data));
//        // return false;
// }

function signup() {
    event.preventDefault();
    //console.log(this);
    //const data = new FormData(form);
    const form = document.getElementsByClassName("input-form")[0];
    const data = {
        'email': form.elements[0].value,
        'password': form.elements[2].value,
        'login': form.elements[4].value
    };
    console.log(JSON.stringify(data));

    // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    //

    const api = new API();

    api.post('/signup', data, response => {
        if (response.status == 200)
            window.location.replace('/profile.html');
    });
}

function login() {
    event.preventDefault();
    //console.log(this);
    //const data = new FormData(form);
    const form = document.getElementsByClassName("input-form")[0];
    const data = {
        'login': form.elements[0].value,
        'password': form.elements[1].value
    };
    console.log(JSON.stringify(data));

    const api = new API();

    api.post('/login', data, response => {
        if (response.status ==200)
            window.location.replace('/profile.html');
    });

    // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    //
    // const  xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    //
    // xhr.open('POST', 'https://fastball-backend.herokuapp.com/api/login', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    //
    // xhr.onload = function() {
    //     if (xhr.status ==200 ) {
    //         window.location.replace('/profile.html');
    //     } else {
    //         console.log('error');
    //     }
    //
    // };
    //
    // xhr.onerror = function() {
    //     alert( 'Ошибка ' + this.status );
    // };
    //
    // xhr.send(JSON.stringify(data));
    // // return false;
}


