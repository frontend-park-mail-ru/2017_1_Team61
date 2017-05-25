/**
 * Created by tlakatlekutl on 31.03.17.
 */

import '../css/index.css';

import './eventsHandlers';


import UserModel from './models/userModel';
import Router from './modules/router/router';

import PreloaderView from './views/preloaderView';
import MainView from './views/mainWindowView';
import LeaderBoardModal from './views/leaderBoardModalView';
import AboutModalView from './views/aboutModalVIew';
import GameView from './views/gameView';
import Page404View from './views/page404view';

import EvenEmitter,
{ START_USER_UNAUTHORISED,
  START_USER_AUTHORISED }
  from './modules/eventEmitter/eventEmitter';

const ee = new EvenEmitter();

// views
const preloaderView = new PreloaderView();
const mainView = new MainView();
const p404 = new Page404View();
const leaderBoardModal = new LeaderBoardModal();
const aboutModalView = new AboutModalView();
const gameView = new GameView();

// init router
const router = new Router();
router.addRoute(/\/$/, mainView)
  .addRoute(/leaderboard$/, leaderBoardModal)
  .addRoute(/about$/, aboutModalView)
  .addRoute(/game$/, gameView)
  .set404(p404);

// global user profile
const userModel = new UserModel();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js')
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
    if (userModel.isAuthorised()) {
      ee.emit(START_USER_AUTHORISED);
    } else {
      ee.emit(START_USER_UNAUTHORISED);
    }
    mainView.render();
    router.go(window.location.href);
    preloaderView.dispatchLoadCompleted();
  });
