/**
 * Created by tlakatlekutl on 31.03.17.
 */
/* global API:true, PreloaderView, getUserStatus, MainView */
/* global Router:true, Page404View:true, paths:true */
/* global LoginModal:true */

(function mainFunc() {
  // views
  const preloaderView = new PreloaderView();
  const mainView = new MainView();
  const p404 = new Page404View();
  const loginModalView = new LoginModal()

  const api = new API();

  // init router
  const router = new Router();
  router.addRoute(/\/$/, mainView)
    .addRoute(/login$/, loginModalView)
    .set404(p404);

  // global user profile
  let UserProfile;

  getUserStatus()
    .then((user) => {
      UserProfile = user;
      if (user.login) {
        UserProfile.nickname = user.login;
        UserProfile.authorised = true;
      }

      mainView.render(UserProfile);
      paths.addPathToSinglePlayButton(() => { router.go('/game'); });
      paths.addPathToMultiPlayButton(() => { router.go('/game'); });
      paths.addPathToHelpLink(() => { router.go('/about'); });
      paths.addPathToLeaderBoardButton(() => { router.go('/leaderboard'); });

      if (UserProfile.authorised) {
        paths.addPathToProfileLink(() => { router.go('/profile'); });
        paths.addPathToLogoutLink(() => {
          api.logout();
          UserProfile = { authorised: false };
          mainView.setContent(UserProfile);
        });
      } else {
        paths.addPathToLoginLink(() => { router.go('/login'); });
        paths.addPathToSignupLink(() => { router.go('/signup'); });

        loginModalView.render().onClose(() => { router.go('/'); });

        paths.addPathToSubmitLoginForm((event) => {
          event.preventDefault();
          if (loginModalView.isValid()) {
            api.login(loginModalView.getData())
              .then((response) => {
                return new Promise((resolve)=>{
                  if (response.status === 200) {
                    resolve(response.json());
                } else {
                    loginModalView.showError();
                }});
              })
              .then((json)=> {
                UserProfile = json;
                if (json.login) {
                  UserProfile.nickname = json.login;
                  UserProfile.authorised = true;
                }
                router.go('/');
                mainView.setContent(UserProfile);
                paths.addPathToProfileLink(() => { router.go('/profile'); });
                paths.addPathToLogoutLink(() => {
                  api.logout();
                  UserProfile = { authorised: false };
                  mainView.setContent(UserProfile);
                  paths.addPathToSignupLink(() => { router.go('/signup'); });
                  paths.addPathToLoginLink(() => { router.go('/login'); });
                });
              });
          }
        });
      }

      preloaderView.dispatchLoadCompleted();
      router.start();
    });
}());
