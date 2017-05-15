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
import ConcedeModal from './views/concedeModalView';
import ConcedeMpModal from './views/concedeMpModalView';
import VictoryModal from './views/victoryModalView';
import DefeatModal from './views/defeatModalView';

// views
const preloaderView = new PreloaderView();
const mainView = new MainView();
const p404 = new Page404View();
const loginModalView = new LoginModal();
const signupModalView = new SignupModal();
const leaderBoardModal = new LeaderBoardModal();
const profileModalView = new ProfileModalView();
const aboutModalView = new AboutModalView();
const gameView = new GameView();
const concedeModalView = new ConcedeModal();
const concedeMpModalView = new ConcedeMpModal();
const victoryModalView = new VictoryModal();
const defeatModalView = new DefeatModal();

// init router
const router = new Router();
router.addRoute(/\/$/, mainView)
  .addRoute(/login$/, loginModalView)
  .addRoute(/signup$/, signupModalView)
  .addRoute(/leaderboard$/, leaderBoardModal)
  .addRoute(/profile$/, profileModalView)
  .addRoute(/about$/, aboutModalView)
  .addRoute(/game$/, gameView)
  .addRoute(/concede$/, concedeModalView)
  .addRoute(/concedemp$/, concedeMpModalView)
  .addRoute(/victory$/, victoryModalView)
  .addRoute(/defeat$/, defeatModalView)
  .set404(p404);

// global user profile
const userModel = new UserModel();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('static/js/sw.js')
//     .then( (registration) => {
//       console.log('ServiceWorker registration', registration);
//     })
//     .catch((err) => {
//       console.log('Registration failed with ', err);
//     });
// }


leaderBoardModal.render();
aboutModalView.render();

router.start()
  .then(() => {
    console.log(userModel.getData());
    mainView.render();
    router.go(window.location.href);
    preloaderView.dispatchLoadCompleted();
  });
