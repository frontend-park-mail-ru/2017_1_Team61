/**
 * Created by tlakatlekutl on 31.03.17.
 */
/* global API:true, PreloaderView, getUserStatus, MainView */
/* global Router:true, Page404View:true, paths:true */
/* global LoginModal:true, UserModel:true */
/* global SignupModal:true */
/* global LeaderBoardModal:true */

(function mainFunc() {
  // views
  const preloaderView = new PreloaderView();
  const mainView = new MainView();
  const p404 = new Page404View();
  const loginModalView = new LoginModal();
  const signupModalView = new SignupModal();
  const leaderBoardModal = new LeaderBoardModal();

  // init router
  const router = new Router();
  router.addRoute(/\/$/, mainView)
    .addRoute(/login$/, loginModalView)
    .addRoute(/signup$/, signupModalView)
    .addRoute(/leaderboard$/, leaderBoardModal)
    .set404(p404);

  // global user profile
  const userModel = new UserModel();

  loginModalView.render();
  signupModalView.render();
  leaderBoardModal.render();

  router.start()
    .then(() => {
      console.log(userModel.getData());
      mainView.render();
      router.go(window.location.href);
      preloaderView.dispatchLoadCompleted();
    });
}());
