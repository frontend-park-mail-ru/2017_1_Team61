/**
* Created by tlakatlekutl on 24.03.17.
*/

import UserModel from '../../models/userModel';

const userModel = new UserModel();

export default class Router {
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
  updateRoute(url, view) {
    const i = this.routes.findIndex(route => route.re.test(url))
    console.log(i);
    // debugger;
    if (i !== -1) {
      this.routes[i].view = view;
    } else {
      throw new Error(`Cant delete route ${name}`);
    }
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
      // alert(url);
      if (/mp$/.test(url)) {
        this.go('/');
        return;
      }
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

  deleteRoute(url) {
    const i = this.routes.findIndex(route => route.re.test(url));
    if (i !== -1) {
      if (i !== -1) {
        this.routes.splice(i, 1);
      } else {
        throw new Error(`Cant delete no route ${url}`);
      }
    }
    return this;
  }


  start() {
    return new Promise((resolve) => {
      userModel.getUserStatus()
        .then(() => {
          // setInterval(() => { this.checkUrlChanging(); }, 50);
          resolve();
        });
    })
    ;
  }
  checkUrlChanging() {
    const url = window.location.href;
    if (url !== this.currentUrl) {
      console.log('url changed!');
      this.navigate(url);
      this.currentUrl = url;
    }
  }

}

