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
    }
    show() {
      if (userModel.isAuthorised()) {
        if (!this.alreadyInDOM) {
          this.alreadyInDOM = true;
          this.render({ user: userModel.getData() });
        }
        this.bodyModal.innerHTML = this.drawFunc({ user: userModel.getData() });
        this.modal.style.display = 'block';
      } else {
        router.go('/');
      }
    }

  }
  this.ProfileModalView = ProfileModalView;
}());
