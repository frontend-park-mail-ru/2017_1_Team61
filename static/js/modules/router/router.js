/**
 * Created by tlakatlekutl on 24.03.17.
 */


(function routerFunc() {
  class Router {
    // singleton class Router
    constructor() {
      if (Router.instance) {
        return Router.instance;
      }

      this.root = '/';
      this.routes = [];
      this.history = window.history;
      Router.instance = this;
    }

    addRoute(re, handler) {
      if (typeof handler !== 'function') {
        throw new TypeError('handler is not a function');
      }
      this.routes.push({ re, handler });
      return this;
    }

    checkPathExists(url) {
      this.routes.findIndex(pattern => pattern.test(url));
      return this;
    }

    navigate(url) {
      this.routes.findIndex(pattern => pattern.test(url));
      return this;
    }

  }
  window.Router = Router;
}());
