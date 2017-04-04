/**
 * Created by tlakatlekutl on 04.04.17.
 */

/* global ModalView:true, aboutTemplate */
/* global Router:true */


(function aboutModalWindowFunc() {
  const router = new Router();
  class AboutModalView extends ModalView {
    constructor() {
      super('About', aboutTemplate);
      super.onClose(() => { router.go('/'); });
    }
  }
  this.AboutModalView = AboutModalView;
}());
