/**
* Created by tlakatlekutl on 27.03.17.
*/

import BaseView from './baseView';
import UserModel from '../models/userModel';
import Router from '../modules/router/router';
import template from '../templates/mainWindow.pug';
import MpView from './mpGameView';

const router = new Router();
const userModel = new UserModel();

export default class MainView extends BaseView {
  constructor() {
    super(['main-vindow-container'], template);
  }
  render() {
    this.data = {
      authorised: userModel.isAuthorised(),
      nickname: userModel.getData().nickname,
    };
    super.render({ user: this.data });
    this.addListeners();
  }
  show() {
    if (this.data.authorised !== userModel.isAuthorised()) {
      this.data = {
        authorised: userModel.isAuthorised(),
        nickname: userModel.getData().nickname,
      };
      this.setContent({ user: this.data });
      this.addListeners();
    }
    super.show();
  }
  addListeners() {
    document.querySelector('.btn-left').addEventListener('click', () => { router.go('/game'); });
    document.querySelector('.btn-right').addEventListener('click', () => {
      this.mpView = new MpView();
      router.addRoute(/mp/, this.mpView);
      router.go('/mp');
    });
    document.querySelector('.leaderboard-button').addEventListener('click', () => { router.go('/leaderboard'); });
    document.querySelector('.footer-help-link').addEventListener('click', () => { router.go('/about'); });

    if (this.data.authorised) {
      document.querySelector('.profile-link').addEventListener('click', () => {
        router.go('/profile');
      });
      document.querySelector('.logout-link').addEventListener('click', () => {
        userModel.logout()
          .then(() => {
            // debugger;
            this.show();
          });
      });
    } else {
      document.querySelector('.login-link').addEventListener('click', () => {
        router.go('/login');
      });
      document.querySelector('.signup-link').addEventListener('click', () => {
        router.go('/signup');
      });
    }
  }
}

