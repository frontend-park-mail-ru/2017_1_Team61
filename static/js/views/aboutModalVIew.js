/**
 * Created by tlakatlekutl on 04.04.17.
 */

/* global ModalView:true, aboutTemplate */


(function aboutModalWindowFunc() {
  class AboutModalView extends ModalView {
    constructor() {
      super('About', aboutTemplate);
    }
  }
  this.AboutModalView = AboutModalView;
}());
