/**
* Created by tlakatlekutl on 27.03.17.
*/

import BaseView from './baseView';
import UserModel from '../models/userModel';
import Router from '../modules/router/router';
import template from '../templates/mainWindow.pug';


import EvenEmitter, {START_SINGLE_GAME, START_MULTI_GAME} from '../modules/eventEmitter/eventEmitter';

const ee = new EvenEmitter();

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
    document.querySelector('.btn-left').addEventListener('click', () => { ee.emit(START_SINGLE_GAME) });
    document.querySelector('.btn-right').addEventListener('click', () => {
      if (userModel.isAuthorised()) {
        ee.emit(START_MULTI_GAME);
      } else {
        alert('Вы должны быть авторизированы');
      }
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

