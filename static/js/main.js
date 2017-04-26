/**
 * Created by tlakatlekutl on 31.03.17.
 */

import css from '../css/index.css';

import UserModel from './models/userModel';
import Router from './modules/router/router';

import PreloaderView from './views/preloaderView';
import MainView from './views/mainWindowView';
import LoginModal from './views/loginModalView';
import SignupModal from './views/signupModalVew';
import LeaderBoardModal from './views/leaderBoardModalView';
import ProfileModalView from './views/profileModalView';
import AboutModalView from './views/aboutModalVIew';
import GameView from './views/gameView';
import Page404View from './views/page404view';
import MpView from './views/mpGameView';
import ConcedeModal from './views/concedeModalView';
import ConcedeMpModal from './views/concedeMpModalView';

// views
const preloaderView = new PreloaderView();
const mainView = new MainView();
const p404 = new Page404View();
const loginModalView = new LoginModal();
const signupModalView = new SignupModal();
const leaderBoardModal = new LeaderBoardModal();
const profileModalView = new ProfileModalView();
const aboutModalView = new AboutModalView();
const mpView = new MpView();
const gameView = new GameView();
const concedeModalView = new ConcedeModal();
const concedeMpModalView = new ConcedeMpModal();

// init router
const router = new Router();
router.addRoute(/\/$/, mainView)
  .addRoute(/login$/, loginModalView)
  .addRoute(/signup$/, signupModalView)
  .addRoute(/leaderboard$/, leaderBoardModal)
  .addRoute(/profile$/, profileModalView)
  .addRoute(/about$/, aboutModalView)
  .addRoute(/mp/, mpView)
  .addRoute(/game$/, gameView)
  .addRoute(/concede$/, concedeModalView)
  .addRoute(/concedemp$/, concedeMpModalView)
  .set404(p404);

// global user profile
const userModel = new UserModel();

leaderBoardModal.render();
aboutModalView.render();

router.start()
  .then(() => {
    console.log(userModel.getData());
    mainView.render();
    router.go(window.location.href);
    preloaderView.dispatchLoadCompleted();
  });
