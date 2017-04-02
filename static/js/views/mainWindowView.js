/**
 * Created by tlakatlekutl on 27.03.17.
 */
/* global BaseView:true */


(function mainWindowFunc() {
  class MainView extends BaseView {
    constructor() {
      super(['main-vindow-container'], window.mainWindowTemplate);
    }
  }
  this.MainView = MainView;
}());
