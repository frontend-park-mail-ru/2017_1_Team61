/**
 * Created by tlakatlekutl on 07.03.17.
 */

/* global API:true*/

(function userModelFunc() {
  const api = new API();
  class UserModel {

    constructor() {
      if (UserModel.instance) {
        return UserModel.instance;
      }
      this.user = { isAuthorised: false };

      UserModel.instance = this;
    }

    isAuthorised() {
      return this.user.isAuthorised;
    }
    getData() {
      return this.user;
    }
    logout() {
      return new Promise((resolve) => {
        api.logout()
          .then(() => {
            this.user.isAuthorised = false;
            resolve();
          });
      });
    }

    getUserStatus() {
      return new Promise((resolve) => {
        api.getUser()
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 403) {
              this.user.isAuthorised = false;
            }
            throw new Error('User not authorized');
          })
          .then((json) => {
            this.user.isAuthorised = true;
            this.user.nickname = json.login;
            this.user.email = json.email;
            resolve(json);
          });
          // .catch((err) => {
          //   resolve();
          // });
      });
    }
    login(data) {
      return new Promise((done, error) => {
        api.login(data)
          .then(response => new Promise((resolve, reject) => {
            if (response.status === 200) {
              resolve(response.json());
            } else {
              reject(response.json());
            }
          }))
          .then((json) => {
            this.user.isAuthorised = true;
            this.user.nickname = json.login;
            this.user.email = json.email;
            done(json);
          })
          .catch((json) => {
            console.log(json);
            error(json);
          });
      });
    }
  }

  window.UserModel = UserModel;
}());
