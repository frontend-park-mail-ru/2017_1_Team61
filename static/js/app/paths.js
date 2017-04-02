/**
 * Created by tlakatlekutl on 31.03.17.
 */

(function pathsFunc() {
  window.paths = {};

  window.paths.addPathToSinglePlayButton = (func) => {
    document.querySelector('.btn-left').addEventListener('click', func);
  };

  window.paths.addPathToMultiPlayButton = (func) => {
    document.querySelector('.btn-right').addEventListener('click', func);
  };
  window.paths.addPathToHelpLink = (func) => {
    document.querySelector('.footer-help-link').addEventListener('click', func);
  };
  window.paths.addPathToLeaderBoardButton = (func) => {
    document.querySelector('.leaderboard-button').addEventListener('click', func);
  };
  window.paths.addPathToProfileLink = (func) => {
    document.querySelector('.profile-link').addEventListener('click', func);
  };
  window.paths.addPathToLogoutLink = (func) => {
    document.querySelector('.logout-link').addEventListener('click', func);
  };
  window.paths.addPathToLoginLink = (func) => {
    document.querySelector('.login-link').addEventListener('click', func);
  };
  window.paths.addPathToSignupLink = (func) => {
    document.querySelector('.signup-link').addEventListener('click', func);
  };
  window.paths.addPathToSubmitLoginForm = (func) => {
    document.querySelector('.login-submit-button').addEventListener('click', func);
  };


}());
