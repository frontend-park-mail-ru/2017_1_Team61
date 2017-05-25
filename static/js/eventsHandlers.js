/**
 * Created by tlakatlekutl on 23.05.17.
 */

import LoginModal from './views/loginModalView';
import SignupModal from './views/signupModalVew';

import EvenEmitter,
{
  START_USER_UNAUTHORISED,
  START_USER_AUTHORISED,
  GAME_PAUSE,
  TEST_EVENT,
  DESTROY_GAME,
  START_SINGLE_GAME,
  START_MULTI_GAME,
  VICTORY,
  DEFEAT,
  LOGINED,
  LOGOUTED,
}
  from './modules/eventEmitter/eventEmitter';

import UserModel from './models/userModel';
import Router from './modules/router/router';

import ProfileModalView from './views/profileModalView';
import ConcedeModal from './views/concedeModalView';
import VictoryModal from './views/victoryModalView';
import DefeatModal from './views/defeatModalView';
import MpView from './views/mpGameView';

const router = new Router();
const ee = new EvenEmitter();
const userModel = new UserModel();

ee.on(VICTORY, () => {
  console.log(VICTORY);
  const victoryModal = new VictoryModal();
  victoryModal.render();
  victoryModal.show();
  userModel.getUserStatus();
});

ee.on(DEFEAT, () => {
  console.log(DEFEAT);
  const defeatModal = new DefeatModal();
  defeatModal.render();
  defeatModal.show();
  userModel.getUserStatus();
});

ee.on(START_SINGLE_GAME, () => {
  console.log(START_SINGLE_GAME);
  router.go('/game');
});

ee.on(START_MULTI_GAME, () => {
  console.log(START_MULTI_GAME);
  this.mpView = new MpView();
  router.addRoute(/mp/, this.mpView);
  router.go('/mp');
});

ee.on(GAME_PAUSE, (game) => {
  console.log(GAME_PAUSE);
  const concedeModalView = new ConcedeModal(game);
  concedeModalView.render();
});

ee.on(LOGOUTED, () => {
  console.log(LOGOUTED);
  const loginModalView = new LoginModal();
  const signupModalView = new SignupModal();

  router
    .addRoute(/login$/, loginModalView)
    .addRoute(/signup$/, signupModalView);
  router.deleteRoute('/profile');
  // userModel.getUserStatus();
});
ee.on(LOGINED, () => {
  console.log(LOGINED);
  const profileModalView = new ProfileModalView();
  router.addRoute(/profile$/, profileModalView);
  router
    .deleteRoute('/login')
    .deleteRoute('/signup');
  // userModel.getUserStatus();
});


ee.on(DESTROY_GAME, () => {
  console.log(DESTROY_GAME);
  router.go('/');
});

ee.on(TEST_EVENT, () => {
  console.log(TEST_EVENT);
});

ee.on(START_USER_UNAUTHORISED, () => {
  console.log(START_USER_UNAUTHORISED);
  const loginModalView = new LoginModal();
  const signupModalView = new SignupModal();

  router
  .addRoute(/login$/, loginModalView)
  .addRoute(/signup$/, signupModalView);
  ee.off(START_USER_AUTHORISED);
});

ee.on(START_USER_AUTHORISED, () => {
  console.log(START_USER_AUTHORISED);
  const profileModalView = new ProfileModalView();
  router.addRoute(/profile$/, profileModalView);
  ee.off(START_USER_UNAUTHORISED);
});
