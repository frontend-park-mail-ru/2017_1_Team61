/**
 * Created by tlakatlekutl on 02.04.17.
 */
/* global modalView:true, loginTemplate */


(function loginModalWindowFunc() {
  class LoginModal extends modalView {
    constructor() {
      super('Login', loginTemplate);
    }
  }
  this.LoginModal = LoginModal;
}());

