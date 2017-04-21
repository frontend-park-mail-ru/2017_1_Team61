/**
 * Created by tlakatlekutl on 27.03.17.
 */
import BaseView from './baseView';


export default class Page404View extends BaseView {
  constructor() {
    super(['page404-container'], () => '<h1> Not Found </h1>');
    this.render();
  }
}

