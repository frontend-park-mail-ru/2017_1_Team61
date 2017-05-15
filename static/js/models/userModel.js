/**
* Created by tlakatlekutl on 07.03.17.
*/

import API from '../modules/api/api';

const api = new API();

export default class UserModel {

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
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          resolve(json);
        })
        .catch((err) => {
          console.log(err);
          resolve();
        });
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
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          done(json);
        })
        .catch((json) => {
          console.log(json);
          error(json);
        });
    });
  }
  signup(data) {
    return new Promise((done, error) => {
      api.signup(data)
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
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.changeRating = 0;
          done(json);
        })
        .catch((errorPromise) => {
          return errorPromise;
        })
        .then((json)=> {
          // console.log(json);
          error(json);
        });
    });
  }
}
