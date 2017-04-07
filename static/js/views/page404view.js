/**
 * Created by tlakatlekutl on 27.03.17.
 */
/* global BaseView:true */


(function p404WindowFunc() {
  class Page404View extends BaseView {
    constructor() {
      super(['page404-container'], () => '<h1> Not Found </h1>');
      this.render();
    }
  }
  this.Page404View = Page404View;
}());
