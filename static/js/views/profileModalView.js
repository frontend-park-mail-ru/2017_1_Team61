/**
 * Created by tlakatlekutl on 04.04.17.
 */

/* global ModalView:true, profileTemplate */
/* global UserModel:true, Router:true*/


(function profileModalWindowFunc() {
  const userModel = new UserModel();
  const router = new Router();

  class ProfileModalView extends ModalView {
    constructor() {
      super('Profile', profileTemplate);
      super.onClose(() => { router.go('/'); });
    }
    show() {
      if (userModel.isAuthorised()) {
        super.show({ user: userModel.getData() });
      } else {
        router.go('/');
      }
    }

  }
  this.ProfileModalView = ProfileModalView;
}());
