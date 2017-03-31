/**
 * Created by sergey on 05.03.17.
 */

/* global LoginForm:true, SignUpForm:true*/
/* global  LeaderBoard:true, API:true*/
/* global  showUser*/
/* global  return_on_main_achievements:true, return_on_main_about:true*/
/* global  game:true, profile:true, about:true, return_on_main_profile:true*/
/* global  sign_up:true, back_login:true,  rating:true, achievement:true*/
/* eslint no-console: ["error", {allow: ["log", "error"]}]*/


const loginForm = new LoginForm();
loginForm.render();

const signUpForm = new SignUpForm();
signUpForm.render();


const login_page = document.getElementsByClassName('login_page')[0];
const sign_up_page = document.getElementsByClassName('sign_up_page')[0];
const main_page = document.getElementById('main_page');
const profile_page = document.getElementById('profile_page');
let rating_page;
const achievements_page = document.getElementById('achievements_page');
const game_page = document.getElementById('game_page');
const about_page = document.getElementById('about_page');

login_page.hidden = true;
sign_up_page.hidden = true;
profile_page.hidden = true;

main_page.hidden = true;
achievements_page.hidden = true;
game_page.hidden = true;
about_page.hidden = true;

const api = new API();
api.getLeaderBoard()
    .then(response => response.json())
    .then((json) => {
      const lb = new LeaderBoard(json);
      lb.render();
      rating_page = document.getElementById('rating_page');
      rating_page.hidden = true;
      document.querySelector('#return_on_main_rating').onclick = function () {
        rating_page.hidden = true;
        main_page.hidden = false;
      };
    })
    .catch((error) => {
      console.error(error);
    });


showUser();

loginForm.onsubmit = function () {
  login_page.hidden = true;
  main_page.hidden = false;
  showUser();
};

signUpForm.onsubmit = function () {
  sign_up_page.hidden = true;
  main_page.hidden = false;
  showUser();
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


return_on_main_achievements.onclick = function () {
  achievements_page.hidden = true;
  main_page.hidden = false;
};


return_on_main_about.onclick = function () {
  about_page.hidden = true;
  main_page.hidden = false;
};

