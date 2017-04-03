/**
 * Created by tlakatlekutl on 31.03.17.
 */
/* global API:true, PreloaderView, getUserStatus, MainView */
/* global Router:true, Page404View:true, paths:true */
/* global LoginModal:true, UserModel:true */

(function mainFunc() {
  // views
  const preloaderView = new PreloaderView();
  const mainView = new MainView();
  const p404 = new Page404View();
  const loginModalView = new LoginModal();

  // init router
  const router = new Router();
  router.addRoute(/\/$/, mainView)
    .addRoute(/login$/, loginModalView)
    .set404(p404);

  // global user profile
  const userModel = new UserModel();

  loginModalView.render();

  router.start()
    .then(() => {
      console.log(userModel.getData());
      mainView.render();
      router.go(window.location.href);
      preloaderView.dispatchLoadCompleted();
    });


  // getUserStatus()
  //   .then((user) => {
  //     if (user.login) {
  //       window.UserProfile.nickname = user.login;
  //       UserProfile.authorised = true;
  //     }
  //
  //     mainView.render(UserProfile);
  //
  //     if (UserProfile.authorised) {
  //       paths.addPathToProfileLink(() => { router.go('/profile'); });
  //       paths.addPathToLogoutLink(() => {
  //         api.logout();
  //         UserProfile = { authorised: false };
  //         mainView.setContent(UserProfile);
  //       });
  //     } else {
  //       paths.addPathToLoginLink(() => { router.go('/login'); });
  //       paths.addPathToSignupLink(() => { router.go('/signup'); });
  //
  //       loginModalView.render().onClose(() => { router.go('/'); });
  //
  //       paths.addPathToSubmitLoginForm((event) => {
  //         event.preventDefault();
  //         if (loginModalView.isValid()) {
  //           api.login(loginModalView.getData())
  //             .then(response => new Promise((resolve) => {
  //               if (response.status === 200) {
  //                 resolve(response.json());
  //               } else {
  //                 loginModalView.showError();
  //               }
  //             }))
  //             .then((json) => {
  //               UserProfile = json;
  //               if (json.login) {
  //                 UserProfile.nickname = json.login;
  //                 UserProfile.authorised = true;
  //               }
  //               router.go('/');
  //               mainView.setContent(UserProfile);
  //               paths.addPathToSinglePlayButton(() => { router.go('/game'); });
  //               paths.addPathToMultiPlayButton(() => { router.go('/game'); });
  //               paths.addPathToHelpLink(() => { router.go('/about'); });
  //               paths.addPathToLeaderBoardButton(() => { router.go('/leaderboard'); });
  //               paths.addPathToProfileLink(() => { router.go('/profile'); });
  //               paths.addPathToLogoutLink(() => {
  //                 api.logout();
  //                 UserProfile = { authorised: false };
  //                 mainView.setContent(UserProfile);
  //                 paths.addPathToSignupLink(() => { router.go('/signup'); });
  //                 paths.addPathToLoginLink(() => { router.go('/login'); });
  //                 paths.addPathToSinglePlayButton(() => { router.go('/game'); });
  //                 paths.addPathToMultiPlayButton(() => { router.go('/game'); });
  //                 paths.addPathToHelpLink(() => { router.go('/about'); });
  //                 paths.addPathToLeaderBoardButton(() => { router.go('/leaderboard'); });
  //               });
  //             });
  //         }
  //       });
  //     }
  //
  //     preloaderView.dispatchLoadCompleted();
  //     router.start();
  //   });
}());
