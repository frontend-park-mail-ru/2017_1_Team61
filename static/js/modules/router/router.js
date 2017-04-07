/**
 * Created by tlakatlekutl on 24.03.17.
 */
/* global UserModel:true */

(function routerFunc() {
  const userModel = new UserModel();
  class Router {
    // singleton class Router
    constructor() {
      if (Router.instance) {
        return Router.instance;
      }
      // this.root = '/';
      this.routes = [];
      this.history = window.history;
      this.goto404 = () => { console.error('page not found'); };
      Router.instance = this;
    }

    addRoute(re, view) {
      if (typeof view !== 'object') {
        throw new TypeError('handler is not a view');
      }
      this.routes.push({ re, view });
      return this;
    }

    checkPathExists(url) {
      return this.routes.findIndex(route => route.re.test(url));
    }

    navigate(url) {
      const i = this.checkPathExists(url);
      // debugger;
      if (i !== -1) {
        if (this.routes[i].view.isModal) {
          if (!this.currentView) {
            this.routes[0].view.show();
          }
          this.currentView = this.routes[i].view;
        } else {
          if (this.currentView) {
            this.currentView.hide();
          }
          this.currentView = this.routes[i].view;
        }
      } else {
        if (this.currentView) {
          this.currentView.hide();
        }
        this.currentView = this.goto404;
      }
      this.currentView.show();
    }

    go(url) {
      this.history.pushState(null, '', url);
      this.navigate(url);
      this.currentUrl = url;
      return this;
    }

    set404(view) {
      this.goto404 = view;
      return this;
    }

    start() {
      return new Promise((resolve) => {
        userModel.getUserStatus()
          .then(() => {
            setInterval(() => { this.checkUrlChanging(); }, 50);
            resolve();
          });
      })
      ;
    }
    checkUrlChanging() {
      const url = window.location.href;
      if (url !== this.currentUrl) {
        this.navigate(url);
        this.currentUrl = url;
      }
    }

  }
  window.Router = Router;
}());
