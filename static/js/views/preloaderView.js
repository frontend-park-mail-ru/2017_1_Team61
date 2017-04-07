/**
 * Created by tlakatlekutl on 31.03.17.
 */
/* global BaseView:true */

(function preLoaderFunc() {
  class PreloaderView {
    constructor() {
      this.node = document.querySelector('.preloader-page');
      this.onLoad = new Event('onUserStatusLoad');
      this.node.addEventListener('onUserStatusLoad', this.hide);
    }
    hide() {
      this.hidden = true;
    }
    dispatchLoadCompleted() {
      this.node.dispatchEvent(this.onLoad);
    }
  }
  this.PreloaderView = PreloaderView;
}());
