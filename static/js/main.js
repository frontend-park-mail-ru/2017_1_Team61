/**
 * Created by sergey on 05.03.17.
 */
'use strict';

(function () {
    const login_page = document.getElementById('login_page');
    const sign_up_page = document.getElementById('sign_up_page');
    const main_page = document.getElementById('main_page');
    const profile_page = document.getElementById('profile_page');
    const rating_page = document.getElementById('rating_page');
    const achievements_page = document.getElementById('achievements_page');
    const game_page = document.getElementById('game_page');
    const about_page = document.getElementById('about_page');

    sign_up_page.hidden = true;
    main_page.hidden = true;
    profile_page.hidden = true;
    rating_page.hidden = true;
    achievements_page.hidden = true;
    game_page.hidden = true;
    about_page.hidden = true;

    let loginForm = new Form({
        el: document.createElement('div'),
        data: {
            title: 'Login',
            fields: [
                {
                    name: 'email',
                    type: 'email'
                },
                {
                    name: 'password',
                    type: 'password'
                }
            ],
            controls: [
                {
                    text: 'Авторизация',
                    attrs: {
                        type: 'submit'
                    }
                }
            ]
        }
    });
    //
    // let SignUpForm = new Form({
    //     el: document.createElement('div'),
    //     data: {
    //         title: 'SignUp',
    //         fields: [
    //             {
    //                 name: 'email',
    //                 type: 'email'
    //             },
    //             {
    //                 name: 'email_repeat',
    //                 type: 'email'
    //             },
    //             {
    //                 name: 'password',
    //                 type: 'password'
    //             },
    //             {
    //                 name: 'password_repeat',
    //                 type: 'password'
    //             },
    //             {
    //                 name: 'nickname',
    //                 type: 'text'
    //             }
    //         ],
    //         controls: [
    //             {
    //                 text: 'Регистрация',
    //                 attrs: {
    //                     type: 'submit'
    //                 }
    //             }
    //         ]
    //     }
    // });
    //
    // loginForm.on('submit', event => {
    //     event.preventDefault();
    //
    //     login_page.hidden = true;
    //     main_page.hidden = false;
    // });
    //
    // SignUpForm.on('submit', event => {
    //     event.preventDefault();
    //
    //     sign_up_page.hidden = true;
    //     main_page.hidden = false;
    // });

    // login_page.appendChild(loginForm.el);
    // sign_up_page.appendChild(SignUpForm.el);

    sign_up.onclick = function () {
        login_page.hidden = true;
        sign_up_page.hidden = false;
    };

    back_login.onclick = function () {
        sign_up_page.hidden = true;
        login_page.hidden = false;
    };

    rating.onclick = function () {
        main_page.hidden = true;
        rating_page.hidden = false;
    };

    achievement.onclick = function () {
        main_page.hidden = true;
        achievements_page.hidden = false;
    };

    game.onclick = function () {
        main_page.hidden = true;
        game_page.hidden = false;
    };

    profile.onclick = function () {
        main_page.hidden = true;
        profile_page.hidden = false;
    };

    about.onclick = function () {
        main_page.hidden = true;
        about_page.hidden = false;
    }

    return_on_main_profile.onclick = function () {
        profile_page.hidden = true;
        main_page.hidden = false;
    };

    return_on_main_rating.onclick = function () {
        rating_page.hidden = true;
        main_page.hidden = false;
    };

    return_on_main_achievements.onclick = function () {
        achievements_page.hidden = true;
        main_page.hidden = false;
    };

    return_on_main_game.onclick = function () {
        game_page.hidden = true;
        main_page.hidden = false;
    };

    return_on_main_about.onclick = function () {
        about_page.hidden = true;
        main_page.hidden = false;
    };

})();

//
// // Получаем ссылки на элементы страницы
// const sign_up_page = document.getElementById('sign_up_page');
// const login_page = document.getElementById('login_page');
// const main_page = document.getElementById('main_page');
// const profile_page = document.getElementById('profile_page');
// const rating_page = document.getElementById('rating_page');
// const achievements_page = document.getElementById('achievements_page');
// const game_page = document.getElementById('game_page');
// const about_page = document.getElementById('about_page');
//
// // Скрываем страницы
// sign_up_page.hidden = true;
// main_page.hidden = true;
// profile_page.hidden = true;
// rating_page.hidden = true;
// achievements_page.hidden = true;
// game_page.hidden = true;
// about_page.hidden = true;
//
// function signup() {
//     event.preventDefault();
//     //console.log(this);
//     //const data = new FormData(form);
//     const form = document.getElementsByClassName("input-form")[0];
//     const data = {
//         'email': form.elements[0].value,
//         'password': form.elements[2].value,
//         'login': form.elements[4].value
//     };
//     console.log(JSON.stringify(data));
//
//     // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//     //
//     const  xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//
//     xhr.open('POST', 'http://fastball-backend.herokuapp.com/api/signup', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     xhr.onload = function() {
//         sign_up_page.hidden = true;
//         main_page.hidden = false;
//     };
//
//     xhr.onerror = function() {
//         alert( 'Ошибка ' + this.status );
//     };
//
//     xhr.send(JSON.stringify(data));
//     // return false;
// }
//
// function login() {
//     event.preventDefault();
//     //console.log(this);
//     //const data = new FormData(form);
//     const form = document.getElementsByClassName("input-form")[0];
//     const data = {
//         'login': form.elements[0].value,
//         'password': form.elements[1].value
//     };
//     console.log(JSON.stringify(data));
//
//     // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//     //
//     const  xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//
//     xhr.open('POST', 'http://fastball-backend.herokuapp.com/api/login', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     xhr.onload = function() {
//         login_page.hidden = true;
//         main_page.hidden = false;
//     };
//
//     xhr.onerror = function() {
//         alert( 'Ошибка ' + this.status );
//     };
//
//     xhr.send(JSON.stringify(data));
//     // return false;
// }
//
// ;(function () {
//     'use strict';
//     const  xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//
//     xhr.open('GET', 'http://fastball-backend.herokuapp.com/api/user', true);
//     //xhr.setRequestHeader('Content-Type', 'application/json');
//
//     xhr.onload = function() {
//         const data = JSON.parse(this.responseText);
//
//         if (xhr.status == 200) {
//             const name = document.getElementsByClassName('nickname__name')[0];
//             const email = document.getElementsByClassName('e-mail__name')[0];
//
//             name.innerHTML = data['login'];
//             email.innerHTML = data['email'];
//             console.log(data);
//         } else {
//             console.log(data['error']);
//         }
//
//     };
//
//     xhr.onerror = function() {
//         alert( 'Ошибка ' + this.status );
//
//     };
//
//     xhr.send();
// })();

