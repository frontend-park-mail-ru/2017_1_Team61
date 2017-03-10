/**
 * Created by sergey on 05.03.17.
 */

/* global LoginForm:true, SignUpForm:true*/
'use strict';
// if (whomi()) {
//     alert('login');
// } else{
//     alert('not login');
// }

const loginForm = new LoginForm();
loginForm.render();

const signUpForm = new SignUpForm();
signUpForm.render();

const login_page = document.getElementsByClassName('login_page')[0];
const sign_up_page = document.getElementsByClassName('sign_up_page')[0];
const main_page = document.getElementById('main_page');
const profile_page = document.getElementById('profile_page');
const rating_page = document.getElementById('rating_page');
const achievements_page = document.getElementById('achievements_page');
const game_page = document.getElementById('game_page');
const about_page = document.getElementById('about_page');

login_page.hidden = true;
sign_up_page.hidden = true;
profile_page.hidden = true;
rating_page.hidden = true;
main_page.hidden = true;
achievements_page.hidden = true;
game_page.hidden = true;
about_page.hidden = true;

const api = new API();
api.getUser()
    .then(response=> {
    if (response.status == 200) {
    main_page.hidden = false;
    response.json()
        .then(json => {
        const name = document.getElementsByClassName('nickname__name')[0];
    const email = document.getElementsByClassName('e-mail__name')[0];

    name.innerHTML = json.login;
    email.innerHTML = json.email;

    let logoutButton = document.querySelector('#logout');

    logoutButton.onclick = (event => {
            event.preventDefault();

    const api = new API();
    api.logout();
});
    // const loginPage = document.querySelector('.user-info');
    // loginPage.appendChild(loginButton);
    // console.log('aaaaaaaaaaaa');
});
} else {
    throw new Error('Error getting user data');
}
})
.catch(error => {
    console.error(error);
});
} else if (response.status == 403) {
    login_page.hidden = false;
}
})

loginForm.onsubmit = function () {
    login_page.hidden = true;
    main_page.hidden = false;
    whomi();
};

signUpForm.onsubmit = function () {
    sign_up_page.hidden = true;
    main_page.hidden = false;
    whomi();
};

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
};

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

// return_on_main_game.onclick = function () {
//     game_page.hidden = true;
//     main_page.hidden = false;
// };

return_on_main_about.onclick = function () {
    about_page.hidden = true;
    main_page.hidden = false;
};

